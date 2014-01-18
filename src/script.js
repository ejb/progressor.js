var mpb = {};

mpb.mouseEventRefresh = '';
mpb.mouseDown = false;

mpb.init = function( options ){
    this._media = options.media;
    this._bar = options.bar;
    this._text = options.text;
    this._time = options.time;
    mpb.initMedia();
    mpb.initProgressBar();
};

mpb.initMedia = function() {
    this._media.addEventListener('timeupdate', mpb.updateProgress, false);
    this._media.addEventListener('timeupdate', mpb.updateTimeCount, false);
    this._media.addEventListener('loadedmetadata', function(){
        mpb.updateTimeCount();
        mpb.addClickEvents();
    }, false);
    this.updateTimeCount(this._media);
};

mpb.initProgressBar = function(){
    var text = document.createElement('span');
    text.textContent = this._text || "";
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
};

mpb.updateProgress = function() {
    mpb.updateTimeCount();
    var value = 0;
    if (mpb._media.currentTime > 0) {
        value = Math.floor((100 / mpb._media.duration) * mpb._media.currentTime);
    }
    mpb._bar.childNodes[2].style.width = value + "%";
};

mpb.formatTime = function ( time ) {
    var minutes = Math.floor(time / 60);
    var seconds = ("0" + Math.round( time - minutes * 60 ) ).slice(-2);
    return minutes+":"+seconds;    
}

mpb.updateTimeCount = function(){
    if ( this._time ) {
        var currTime = this.formatTime ( mpb._media.currentTime );
        var totalTime = this.formatTime ( mpb._media.duration );
        this._time.innerHTML = currTime + "/" + totalTime;        
    }
};


mpb.timeFromCursorPosition = function(element, event, duration){
    var dimensions = element.getBoundingClientRect();
    var pixelsOfBar = event.clientX - dimensions.left;
    var percentToSecs = pixelsOfBar / dimensions.width;
    return percentToSecs * duration;
};

mpb.setMediaProgress = function(event){
    mpb._media.currentTime = mpb.timeFromCursorPosition(
        mpb._bar,
        event,
        mpb._media.duration
    );
    mpb.updateProgress();
    
};

mpb.addClickEvents = function(){
    this._bar.addEventListener("mousedown", function(ev) {
        mpb.mouseDown = true;
        mpb.setMediaProgress(ev);
    });
    document.addEventListener("mouseup", function() {
        clearInterval(mpb.mouseEventRefresh);
        mpb.mouseDown = false;
    });
    document.addEventListener("mousemove", function(e) {
        if ( mpb.mouseDown === true ) {
            mpb.mouseEventRefresh = setInterval( mpb.setMediaProgress(e) , 1000 );   
        }
    }); 
};

