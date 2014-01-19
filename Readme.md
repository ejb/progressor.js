# progressor.js

This a lightweight JavaScript library that does just one thing: it creates customisable progress bars for HTML5 audio and video elements. It was developed for use in [oTranscribe](http://github.com/oTranscribe/oTranscribe), but can be used by anyone who doesn't need a full-blown player with buttons and so on.

## Demos

Coming soon...

## How to use

1. Download the latest version and include anywhere on the page:

        <script src="path/to/progressor.min.js" type="text/javascript" charset="utf-8"></script>

2. Include your media element (either `audio` or `video`), and a `div` element with a set width:

        <audio preload="auto" controls src="song.mp3"></audio>
        <div id="progressbar"></div>

3. Call `progressor.init()` with options:

        <script>
        progressor.init({
            media : document.getElementsByTagName('audio')[0],
            bar : document.getElementById('progressbar'),
            text : "Cool song",                             // text to go inside progress bar (optional)
            time : document.getElementById('timestamps')    // element to contain live-updating time (optional)
        });
        <script>
            
    Or do it jQuery style:
    
        <script>
        progressor.init({
            media : $('audio'),
            bar : $('#progressbar'),
            text : "Cool song",       // text to go inside progress bar (optional)
            time : $('timestamps')    // element to contain live-updating time (optional)
        });
        <script>    

4. Add a height, width and background to the bar (and the internal progress bar, `#progressor-progress`):

        <style>
        #progressbar {
          width: 1000px;
          height: 20px;
          background: grey;
        }

        #progressor-progress {
          background: black;
        }
        </style>
        
    Don't settle for these ugly default colours; let your imagination run wild! Check out [the demos](#demos) for examples.
