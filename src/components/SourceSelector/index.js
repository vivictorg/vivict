import React, {Component} from 'react';
import {FiFile, FiGlobe} from "react-icons/fi";
import cx from 'classnames';
import './index.css';
import {isHlsPlaylist, parseHlsManifest} from '../../util/HlsUtils';
import mp4Info from '../../util/Mp4Info';

class SourceSelector extends Component {

    constructor(props) {
        super(props);
        this.stopPropagation = this.stopPropagation.bind(this);
        this.urlInputKeyDown = this.urlInputKeyDown.bind(this);
        this.state = {
            source: this.props.defaultSource,
            showUrlInput: false
        };
    }

    setInputRef(inputRef) {
        this.input = inputRef;
    }

    async loadHlsMetadata(url) {
        const hlsMetadata = await parseHlsManifest(url);
        this.setState({hls: hlsMetadata});
    }

    loadMp4Metadata(url) {
        mp4Info(url)
            .then((mp4Info) => {
                this.setState({mp4Info})
            })
            .catch(e => console.trace(e));
    }

    componentDidMount() {
        this.changeSource(this.state.source);
        console.log('Source selector add event listeners');
        this.input.addEventListener('keydown', this.urlInputKeyDown);
        this.input.addEventListener('keypress', this.stopPropagation);
        this.input.addEventListener('keyup', this.stopPropagation);
    }

    componentWillUnmount() {
        this.input.removeEventListener('keydown', this.urlInputKeyDown);
        this.input.removeEventListener('keypress', this.stopPropagation);
        this.input.removeEventListener('keyup', this.stopPropagation);
    }

    stopPropagation(e) {
        e.stopPropagation();
    }

    urlInputKeyDown(e) {
        e.stopPropagation();
        switch (e.keyCode) {
            case 13:
                this.onUrlSelected(e.target.value);
                break;
            case 27:
                this.hideUrlInput();
                break;
            default:
        }
    }

    onBlur() {
        console.log('onBlur');
        this.setState({showUrlInput: false})
    }

    handleChange(evt) {
        if (evt.target.files) {
            this.props.onChange(evt.target.files[0])
        }
    }

    showUrlInput() {
        this.setState({showUrlInput: true});
    }

    hideUrlInput() {
        this.setState({showUrlInput: false});
    }

    onUrlSelected(url) {
        console.log(`url: ${url}`);
        this.hideUrlInput();
        this.changeSource({
            type: 'url',
            name: url,
            url: url
        })
    }

    onFileSelected(evt) {
        if (evt.target.files && evt.target.files[0]) {
            const file = evt.target.files[0];
            this.changeSource({
                type: 'file',
                name: file.name,
                url: window.URL.createObjectURL(file),
            });
        }
    }

    onVariantSelected(evt) {
        console.log(`variant selected: ${evt.target.value}`);
        const selectedVariant = evt.target.value;
        this.setVariant(selectedVariant);
    }

    setVariant(selectedVariant) {
        this.setState({hls: Object.assign({}, this.state.hls, {selectedVariant})});
        const url = this.state.hls.variants[selectedVariant].url;
        this.props.onChange(Object.assign({}, this.state.source, {url}));
    }

    changeSource(source) {
        const prevSource = this.state.source;
        if (isHlsPlaylist(source.url)) {
            this.setState({source, mp4Info: null});
            this.loadHlsMetadata(source.url)
                .then(() => {
                    this.setVariant(source.variant ? source.variant : 0);
                    if (prevSource.type === 'file' && prevSource.url) {
                        window.URL.revokeObjectURL(prevSource);
                    }
                });
        } else {
            this.setState({source, hls: null});
            this.loadMp4Metadata(source.url);
            this.props.onChange(source);
            if (prevSource.type === 'file' && prevSource.url) {
                window.URL.revokeObjectURL(prevSource);
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.showUrlInput) {
            this.input.focus()
        }
    }

    currentUrl() {
        return this.state.source.type === 'url' ? this.state.source.url : '';
    }

    formatMetadata(bitrate, width, height) {
        return `[${Math.round(bitrate / 1000)}kbit/s ${width}x${height}]`
    }

    renderSelectedSource() {
        if (this.state.showUrlInput) {
            return null;
        }
        let metadataSpan = null;
        if (this.state.hls) {
            const options = this.state.hls.variants.map( (variant, i) => {
               return (<option
                   key={i}
                   value={i}
               >
                   {this.formatMetadata(variant.bandwidth,variant.width, variant.height)}
               </option>);
            });
            metadataSpan = (<select value={this.state.hls.selectedVariant} onChange={(e) => this.onVariantSelected(e)}>{options}</select>);
        } else if (this.state.mp4Info) {
            const videoTrack = this.state.mp4Info.videoTracks[0];
            const bitrate = videoTrack.bitrate;
            const width = videoTrack.video.width;
            const height = videoTrack.video.height;
            metadataSpan = (<span>{this.formatMetadata(bitrate, width, height)}</span>);
        }
        return (<div className="source-metadata">
            <div className="source-name" title={this.state.source.name}>{this.state.source.name}</div>
            <div>{metadataSpan}</div>
        </div>);
    }

    render() {
        return (
            <div className={"source-selector " + this.props.className}>
                <div className="source-buttons">
                    <div title="open URL" className="url-button" >
                        <FiGlobe style={{cursor: 'pointer'}} onClick={() => this.showUrlInput()}/>
                    </div>
                    <label title="open local file" className="source-file-input" onClick={(evt) => {
                        this.hideUrlInput();
                        evt.stopPropagation()
                    }}>
                        <FiFile/>
                        <input type="file" onChange={(evt) => this.onFileSelected(evt) }/>
                    </label>
                </div>

                <input className={cx('url-input',
                    {hidden: !this.state.showUrlInput})}
                       type="text"
                       ref={(ref) => this.setInputRef(ref)}
                       onBlur={() => this.onBlur()}
                       defaultValue={this.currentUrl()}
                />

                {this.renderSelectedSource()}

            </div>
        )
    }
}

export default SourceSelector;