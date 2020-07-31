// https://ironchef-team21.googlecode.com/git-history/75856e07bb89645d0e56820d6e79f8219a06bfb7/ironchef_team21/src/ImagePHash.java
//
// Code modified from https://github.com/naptha/phash.js
//
// Christopher Kennedy 2020 July (C) Crunchyroll chris@crunchyroll.com

export function pHash(videoElement){
    var size = 32,
        smallerSize = 8;

    var width = videoElement.videoWidth;
    var height = videoElement.videoHeight;
    // check if we got a video frame
    if (width <= 0 || height <= 0) {
        return;
    }
    var canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(videoElement, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
    var im = ctx.getImageData(0, 0, canvas.width, canvas.height);

    document.body.appendChild(canvas)

    /* 2. Reduce color.
     * The image is reduced to a grayscale just to further simplify
     * the number of computations.
     */

    var vals = new Float64Array(size * size);
    for(var i = 0; i < size; i++){
        for(var j = 0; j < size; j++){
            var base = 4 * (size * i + j);
            vals[size * i + j] = 0.299 * im.data[base] +
                0.587 * im.data[base + 1] +
                0.114 * im.data[base + 2];
        }
    }

    /* 3. Compute the DCT.
     * The DCT separates the image into a collection of frequencies
     * and scalars. While JPEG uses an 8x8 DCT, this algorithm uses
     * a 32x32 DCT.
     */

    function applyDCT2(N, f){
        // initialize coefficients
        var c = new Float64Array(N);
        for(var i = 1; i < N; i++) c[i] = 1;
        c[0] = 1 / Math.sqrt(2);

        // output goes here
        var F = new Float64Array(N * N);

        // construct a lookup table, because it's O(n^4)
        var entries = (2 * N) * (N - 1);
        var COS = new Float64Array(entries);
        for(var x = 0; x < entries; x++)
            COS[x] = Math.cos(x / (2 * N) * Math.PI);

        // the core loop inside a loop inside a loop...
        for(var u = 0; u < N; u++){
            for(var v = 0; v < N; v++){
                var sum = 0;
                for(var y = 0; y < N; y++){
                    for(var j = 0; j < N; j++){
                        sum += COS[(2 * y + 1) * u]
                            * COS[(2 * j + 1) * v]
                            * f[N * y + j];
                    }
                }
                sum *= ((c[u] * c[v])/4);
                F[N * u + v] = sum;
            }
        }
        return F
    }

    var dctVals = applyDCT2(size, vals);

    // for(var x = 0; x < size; x++){
    //     for(var y = 0; y < size; y++){
    //         ctx.fillStyle = (dctVals[size * x + y] > 0) ? 'white' : 'black';
    //         ctx.fillRect(x, y, 1, 1)
    //     }
    // }
    /* 4. Reduce the DCT.
     * This is the magic step. While the DCT is 32x32, just keep the
     * top-left 8x8. Those represent the lowest frequencies in the
     * picture.
     */

    vals = []
    for(var x = 1; x <= smallerSize; x++){
        for(var y = 1; y <= smallerSize; y++){
            vals.push(dctVals[size * x + y])
        }
    }

    /* 5. Compute the average value.
     * Like the Average Hash, compute the mean DCT value (using only
     * the 8x8 DCT low-frequency values and excluding the first term
     * since the DC coefficient can be significantly different from
     * the other values and will throw off the average).
     */

    var median = vals.slice(0).sort(function(a, b){
        return a - b
    })[Math.floor(vals.length / 2)];

    /* 6. Further reduce the DCT.
     * This is the magic step. Set the 64 hash bits to 0 or 1
     * depending on whether each of the 64 DCT values is above or
     * below the average value. The result doesn't tell us the
     * actual low frequencies; it just tells us the very-rough
     * relative scale of the frequencies to the mean. The result
     * will not vary as long as the overall structure of the image
     * remains the same; this can survive gamma and color histogram
     * adjustments without a problem.
     */

    return vals.map(function(e){
        return e > median ? '1' : '0';
    }).join('');
}


export function hammingDistance(a, b) {
    var dist = 0;
    for(var i = 0; i < a.length; i++)
        if(a[i] !== b[i]) dist++;
    return dist;
}
