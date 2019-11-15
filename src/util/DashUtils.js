import {parse} from "mpd-parser";

export async function parseDashManifest(url) {
    const response = await fetch(url);
    const manifestText = await response.text();
    console.log("RAW DASH MANIFEST:" + manifestText);
    const manifest = parse(manifestText);
    console.log("DASH MANIFEST:\n" + JSON.stringify(manifest));

    const variants = manifest.playlists.map( (playlist, i) => {
        return {
            url: null,
            index: i,
            bandwidth: playlist.attributes.BANDWIDTH,
            ...playlist.attributes.RESOLUTION,
        };
    });
    return {
        mainUrl: url,
        variants,
        selectedVariant: 0
    };
}

export function isDashManifest(url) {
    if (!url) return false;
    return url.split('?')[0].endsWith('.mpd');
}
