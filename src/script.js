var mpb = {};

mpb.mouseEventRefresh;
mpb.mouseDown = false;

mpb.init = function( options ){
    this._media = options.media;
    this._bar = options.bar;
    this._text = options.text;
    mpb.initPlayer(this._media);
    mpb.setUpProgressBar();
}

mpb.initPlayer = function() {
    this._media.addEventListener('timeupdate', mpb.updateProgress, false);
    this._media.addEventListener('timeupdate', mpb.updateTimeCount, false);
    this._media.addEventListener('loadedmetadata', function(){
        mpb.updateTimeCount();
        mpb.addClickEvents();
    }, false);
    this.updateTimeCount(this._media);
}

mpb.setUpProgressBar = function(){
    var text = document.createElement('span');
    text.textContent = this._text;
    this._bar.style.position = "relative";
    this._bar.style.zIndex = 1;
    
    var progress = document.createElement('div');
    progress.id = "progress";
    progress.style.width = "0%";
    progress.style.position = "absolute";
    progress.style.top = 0;
    progress.style.zIndex = -1;
    
    this._bar.style.webkitUserSelect = "none";
    this._bar.style.userSelect = "none";
    this._bar.appendChild ( text );
    this._bar.appendChild( progress );
}

mpb.updateProgress = function() {
    mpb.updateTimeCount();
    var value = 0;
    if (audio.currentTime > 0) {
        value = Math.floor((100 / audio.duration) * audio.currentTime);
    }
    mpb._bar.childNodes[2].style.width = value + "%";
}

mpb.updateTimeCount = function(){
    var el = document.getElementById('testdiv');
    var currTime = Math.floor( mpb._media.currentTime );
    var totalTime = Math.floor( mpb._media.duration );
    el.innerHTML = currTime + "/" + totalTime;
}


mpb.timeFromCursorPosition = function(element, event, duration){
    var dimensions = element.getBoundingClientRect();
    var pixelsOfBar = event.clientX - dimensions.left;
    var percentToSecs = pixelsOfBar / dimensions.width;
    return percentToSecs * duration;
}

mpb.setProgressBar = function(event){
    mpb._media;
    mpb._media.currentTime = mpb.timeFromCursorPosition(
        mpb._bar,
        event,
        audio.duration
    );
    mpb.updateProgress();
    
}

mpb.addClickEvents = function(){
    bar.addEventListener("mousedown", function(ev) {
        mpb.mouseDown = true;
        mpb.setProgressBar(ev);
    });
    bar.addEventListener("mouseup", function() {
        clearInterval(mpb.mouseEventRefresh);
        mpb.mouseDown = false;
    });
    bar.addEventListener("mousemove", function(e) {
        if ( mpb.mouseDown === true ) {
            mpb.mouseEventRefresh = setInterval( mpb.setProgressBar(e) , 1000 );   
        }
    }); 
}

