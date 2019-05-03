# VIVICT - Vivict Video Comparison Tool

An easy to use in-browser tool for subjective comparison of the visual quality of different encodings of the same video source.

![](docs/screenshot.png?raw=true "vivict screenshot")

## Getting started
Go to https://svt.github.io/vivict/ . By default, it will open a HLS test stream from [Sintel](https://durian.blender.org/) video in different bitrates.


## Usage

The screen is split into two parts, with the left and right part displaying the left and right video source. The split position will follow the mouse, so moving the mouse to the left will show more of the right source and vice versa.

#### Selecting sources

On the top left and right are the source selectors, allowing you to select sources for the left and right video 
respectively. You can either input a URL or open a local file. If the source is a HLS-playlist, you can also select which video stream you want to view.

#### Shortcuts for video control

<kbd>l</kbd> Play video
<kbd>k</kbd> Pause video
<kbd>space</kbd> Play/Pause video
<kbd>,</kbd> Step forward 1 frame
<kbd>,</kbd> Step backward 1 frame
<kbd>/</kbd> or <kbd>-</kbd>  Step forward 1 second
<kbd>m</kbd> Step backward 1 second

#### Shortcuts for view control

<kbd>f</kbd> Toggle full screen
<kbd>t</kbd> Toggle split position follows mouse
<kbd>]</kbd> View only left video
<kbd>\[</kbd> View only right video
<kbd><</kbd> Decrease timeshift between videos
<kbd>></kbd> Increase timeshift between videos
<kbd>u</kbd>  Zoom in
<kbd>i</kbd> Zoom out
<kbd>up</kbd> Pan up
<kbd>down</kbd> Pan down
<kbd>right</kbd> Pan right
<kbd>left</kbd> Pan left
<kbd>0</kbd> Reset pan and zoom to default
<kbd>s</kbd> Toggle visibility of split border
<kbd>esc</kbd> Toggle help window

If you think the shortcuts could be better, feel free to suggest a setup!

## Supported codecs and container formats

Depends on the browser. mp4 and h264 should work. HLS is supported through

 [hls.js](https://github.com/video-dev/hls.js/)

## Supported browsers

Vivict has been tested in Chrome. Firefox should also.

## Running locally

Vivict can be run locally by checking out the source code and running

```
    npm install
    npm start

```
Note: you might also need to install a few peer dependencies

## Getting involved

Feel free to issue pull requests or file issues. For more details, see [CONTRIBUTING](CONTRIBUTING.md)

## License

Copyright 2019 Sveriges Televison AB.

Vivict is released under the [MIT License](LICENSE).

## Primary Maintainer

Gustav Grusell [https://github.com/grusell/](https://github.com/grusell/)
