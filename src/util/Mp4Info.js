import MP4Box from 'mp4box';

async function fetchUntilDone(url, onData, isDone, chunkSize = 10 * 1024 * 1024) {
    if (url.startsWith("blob:")) {
        const res = await fetch(url);
        const data = await res.arrayBuffer();
        data.fileStart = 0;
        onData(data);
        if (!isDone()) {
            throw Error("Failed to parse mp4Info");
        }
        return;
    }
    let start = 0;
    let end = chunkSize;
    while (!isDone()) {
        const responseData = await fetchRange(url, { start, end });
        const data = responseData.data;
        const totalSize = parseInt(responseData.contentRange.split('/')[1]);
        data.fileStart = start;
        onData(data);
        if (end === totalSize) break;
        start = end;
        end = Math.min(totalSize, start + chunkSize);
        if (data.length < chunkSize) break;
    }
}

async function fetchRange(url, range) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Range': `bytes=${range.start}-${range.end}`
        }
    });
    if (!response.ok) {
        throw Error(`Fetch failed with status: ${response.status}`);
    }
    return {
        data: await response.arrayBuffer(),
        contentLength: response.headers.get('Content-Length'),
        contentRange: response.headers.get('Content-Range')
    }
}

export async function mp4Info(url) {
    console.log(`mp4Info: ${url}`);
    let done = false;
    const mp4boxfile = new MP4Box.createFile();

    const mp4InfoPromise = new Promise((resolve, reject) => {
        mp4boxfile.onError = e => {
            done = true;
            console.log(e);
            reject(e);
        };

        mp4boxfile.onReady = (info) => {
            done = true;
            resolve(info);
        };


        fetchUntilDone(url,
            (data) => {
                mp4boxfile.appendBuffer(data)
            },
            () => done)
            .catch(e => {
                reject(e);
            });

    });

    return mp4InfoPromise
}