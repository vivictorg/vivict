import  React, {Component} from 'react';
import cx from 'classnames';
import './index.css';


class SplitView extends Component {
    constructor(props) {
        super(props);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        console.log('Split view constructor');

        this.state = {
            splitPercent: 0,
            dragStart: null,
            dragging: false
        };

        this.setSplitViewContainerRef = splitViewContainer => {
            this.splitViewContainer = splitViewContainer;

        };

        this.setSplitViewClipperRef = splitViewClipper => {
            this.splitViewClipper = splitViewClipper;
        };
    }

    componentDidMount() {
        this.splitViewContainer.addEventListener("mousemove", this.mouseMove, {passive: true});
        this.splitViewContainer.addEventListener("mousedown", this.mouseDown);
        document.addEventListener("mouseup", this.mouseUp);
    }

    componentWillUnmount() {
        document.removeEventListener("mouseup", this.mouseUp);
        this.splitViewContainer.removeEventListener("mousedown", this.mouseDown);
        this.splitViewContainer.removeEventListener("mousemove", this.mouseMove, {passive: true});
    }

    mouseUp(e) {
        if (this.state.dragging) {
            this.ignoreNextClick = true;
        }
        this.setState({dragStart: null, dragging: false});
    }

    onClick(e) {
        if (this.ignoreNextClick) {
            this.ignoreNextClick = false;
        } else {
            this.props.onClick(e);
        }
    }

    mouseDown(e) {
        this.setState({dragStart: {x: e.clientX, y: e.clientY}});
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.tracking && !prevProps.tracking) {
            this.setSplitPosition(this.state.splitPercent);
        }
    }

    mouseMove(e) {
        if (this.state.dragStart) {
            this.setState({dragging: true});
            this.props.onDrag(e.movementX, e.movementY);
        } else {
            this.trackLocation(e);
        }
    }

    trackLocation(e) {
        if (!this.splitViewContainer) {
            return;
        }
        const rect = this.splitViewContainer.getBoundingClientRect();
        const position = ((e.pageX - rect.left) / this.splitViewContainer.offsetWidth)*100;
        if (position <= 100) {
            this.setState({splitPercent: position});
            if (this.props.tracking) {
                this.setSplitPosition(position);
            }
        }
    }

    setSplitPosition(position) {
        this.splitViewClipper.style.width = position+"%";
    }

    focus() {
        this.splitViewContainer.focus();
    }

    render() {
        return (
            <div className={cx('split-view-container', {'dragging': this.state.dragging})} ref={(ref) => this.setSplitViewContainerRef(ref)}
            tabIndex="-1"
            onClick={(e) => this.onClick(e) }>
                <div className={cx("split-view-clipper", {"show-border": this.props.splitBorderVisible})} ref={(ref) => this.setSplitViewClipperRef(ref)}>
                    {this.props.leftSideContent}
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default SplitView;
