import {isHlsPlaylist} from "./HlsUtils";
import {isDashManifest} from "./DashUtils";

export function sourceType(url) {
    if (isHlsPlaylist(url)) {
        return 'hls'
    }
    if (isDashManifest(url)) {
        return 'dash';
    }
    return 'url';

}