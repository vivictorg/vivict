# VIVICT - Vivict Video Comparison Tool

Easy to use in-browser tool for subjective comparison of the visual quality of different encodings of the same source 
video.

![](docs/screenshot.png?raw=true "vivict screenshot")

## Getting started
Go to [Link to vivict]() . By default, it will open a HLS test stream from containing 
the [Sintel](https://durian.blender.org/) movie in different bitrates.

Play the movie by pressing space.

The screen is split into two pars, with the left and right part displaying the left and right videosource. The split 
position will follow the mouse, so moving the mouse to the left will show more of the right source and vice versa.

## Usage
#### Control movie playback
You can start and pause the movie with **space**, or **k** (pause) and **l** (play). You can step one frame forward or 
backward with **.** and **,**. Pressing **/** or **m** will step several frames forward or backward.

#### Selecting sources
On the top left and right are the source selectors, allowing you to select sources for the left and right video 
respectively. You can either input a URL or open a local file. If the source is a HLS-playlist, you can also select
which video stream you want to view.

#### Controlling the split view
The split will track the mouse, so moving the mouse to the right will make more of the left source visible. You can 
enable/disable the mouse tracking by pressing **t**. To quickly switch between seeing only the left or the right 
video, you can press **\[** and **\]**

#### Zooming and panning
You can zoom in and out by pressing **u** and **i** respectively. You can move the view around with the arrow keys, 
or by
 clicking and dragging. Pressing **0** will reset both zoom and pan.

## Supported codecs and container formats
Depends on the browser. mp4 and h264 should work. HLS is supported through
 [hls.js](https://github.com/video-dev/hls.js/)

## Supported browsers
Vivict has been tested in chrome. Firefox also seems to work.

## Running locally
Vivict can be run locally by checking out the source code and running
```
    npm install
    npm run
```

## Getting involved
Feel free to issue pull requests or file issues. For more details, see [CONTRIBUTING](CONTRIBUTING.md)

## License
Copyright (c) 2019 Sveriges Televison AB.

Vivict is released under the [MIT License](LICENSE).

## Primary Maintainer
Gustav Grusell [https://github.com/grusell/](https://github.com/grusell/)