var progressor = {};

progressor.mouseEventRefresh = '';
progressor.mouseDown = false;

progressor.init = function( options ){
    this._media = options.media;
    this._bar = options.bar;
    this._text = options.text;
    this._time = options.time;
    progressor.initMedia();
    progressor.initProgressBar();
};

progressor.initMedia = function() {
    this._media.addEventListener('timeupdate', progressor.updateProgress, false);
    this._media.addEventListener('timeupdate', progressor.updateTimeCount, false);
    this._media.addEventListener('loadedmetadata', function(){
        progressor.updateTimeCount();
        progressor.addClickEvents();
    }, false);
    this.updateTimeCount(this._media);
};

progressor.initProgressBar = function(){
    var text = document.createElement('span');
    text.textContent = this._text || "";
    this._bar.style.position = "relative";
    this._bar.style.zIndex = 1;
    
    var progress = document.createElement('div');
    progress.id = "progressor-progress";
    progress.style.width = "0%";
    progress.style.position = "absolute";
    progress.style.top = 0;
    progress.style.zIndex = -1;
    
    this._bar.style.webkitUserSelect = "none";
    this._bar.style.userSelect = "none";
    this._bar.appendChild ( text );
    this._bar.appendChild( progress );
};

progressor.updateProgress = function() {
    progressor.updateTimeCount();
    var value = 0;
    if (progressor._media.currentTime > 0) {
        value = Math.floor((100 / progressor._media.duration) * progressor._media.currentTime);
    }
    progressor._bar.childNodes[2].style.width = value + "%";
};

progressor.formatTime = function ( time ) {
    var minutes = Math.floor(time / 60);
    var seconds = ("0" + Math.round( time - minutes * 60 ) ).slice(-2);
    return minutes+":"+seconds;    
}

progressor.updateTimeCount = function(){
    if ( this._time ) {
        var currTime = this.formatTime ( progressor._media.currentTime );
        var totalTime = this.formatTime ( progressor._media.duration );
        this._time.innerHTML = currTime + "/" + totalTime;        
    }
};


progressor.timeFromCursorPosition = function(element, event, duration){
    var dimensions = element.getBoundingClientRect();
    var pixelsOfBar = event.clientX - dimensions.left;
    var percentToSecs = pixelsOfBar / dimensions.width;
    return percentToSecs * duration;
};

progressor.setMediaProgress = function(event){
    progressor._media.currentTime = progressor.timeFromCursorPosition(
        progressor._bar,
        event,
        progressor._media.duration
    );
    progressor.updateProgress();
    
};

progressor.addClickEvents = function(){
    this._bar.addEventListener("mousedown", function(ev) {
        progressor.mouseDown = true;
        progressor.setMediaProgress(ev);
    });
    document.addEventListener("mouseup", function() {
        clearInterval(progressor.mouseEventRefresh);
        progressor.mouseDown = false;
    });
    document.addEventListener("mousemove", function(e) {
        if ( progressor.mouseDown === true ) {
            progressor.mouseEventRefresh = setInterval( progressor.setMediaProgress(e) , 1000 );   
        }
    }); 
};

