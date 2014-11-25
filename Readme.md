# progressor.js

A lightweight JavaScript library that creates customisable progress bars for HTML5 `<audio>` and `<video>` elements. It was developed for use in [oTranscribe](http://github.com/oTranscribe/oTranscribe), and is ideal for anyone who wants a scrubbable progress bar but doesn't need a full-blown player.

## Demos

* Basic progress bar for an `<audio>` element: [jsfiddle.net/8dJ46](http://jsfiddle.net/8dJ46/)
* A similar basic bar for a `<video>` element: [jsfiddle.net/5tPRw](http://jsfiddle.net/5tPRw/)
* Progress bar for `<audio>` element with custom style: [jsfiddle.net/L3bfe](http://jsfiddle.net/6GbSK/)
* YouTube-style progress bar that expands on hover: [jsfiddle.net/N6trd](http://jsfiddle.net/N6trd/)

## How to use

1. Download [the latest version](https://raw.github.com/ejb/progressor.js/master/progressor.min.js) and include anywhere on the page:

        <script src="path/to/progressor.min.js" type="text/javascript" charset="utf-8"></script>

2. Include your media element (either `audio` or `video`), and a `div` element with a set width:

        <audio preload="auto" controls src="song.mp3"></audio>
        <div id="progressbar"></div>

3. Call `progressor.init()` with options:

        <script>
        var myProgressBar = new Progressor({
            media : document.getElementsByTagName('audio')[0],
            bar : document.getElementById('progressbar'),
            text : "Cool song",                             // text to go inside progress bar (optional)
            time : document.getElementById('timestamps')    // element to contain live-updating time (optional)
        });
        <script>
            
    Or do it jQuery style:
    
        <script>
        var jqProgressBar = new Progressor({
            media : $('audio')[0],
            bar : $('#progressbar')[0],
            text : "Cool song",          // text to go inside progress bar (optional)
            time : $('timestamps')[0]    // element to contain live-updating time (optional)
        });
        <script>    

4. The bar and its internal progress bar are given CSS classes '.progressor' and '.progressor-progress'. Make sure to add a height, width and background to the bar:

        <style>
        .progressor {
          width: 1000px;
          height: 20px;
          background: grey;
        }

        .progressor-progress {
          background: black;
        }
        </style>
        
    Don't settle for these ugly default colours; let your imagination run wild! Check out [the demos](#demos) for examples.
    
5. No longer need an instance of progressor.js? No problem:

        <script>    
        myProgressBar.remove();
        </script>
    
## Browser support

- ✓ Chrome 32+
- ✓ Safari 7+
- ✓ Internet Explorer 11+
- ✓ Firefox 28+
    
## Changelog

### v0.2.2

- Fixed class name bug

### v0.2.1

- Fixed loss-of-focus bug

### v0.2.0

- Changed API for creating new instance of Progessor
- Multiple instances of Progressor now supported
- Audio is now paused when scrubbing for better performance
- Progressor instances can now be deleted
- Added deprecation message for backwards compatibiliy
- Progress bars must now be styled by class, not id
    
## Development

Pull requests are very welcome. Please develop with `progressor.js` and then compile the minified version by running `grunt`.

## License

MIT, yo.
