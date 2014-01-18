var mpb = {};

var refreshIntervalId;
var mDown = false;

mpb.init = function( options ){
    this._media = options.media;
    this._bar = options.bar;
    mpb.initPlayer(this._media);
    mpb.setUpProgressBar();
}

mpb.initPlayer = function(audioPlayer) {
    audioPlayer.addEventListener('timeupdate', updateProgress, false);
    audioPlayer.addEventListener('timeupdate', updateTimeCount, false);
    audioPlayer.addEventListener('loadedmetadata', updateTimeCount, false);
    updateTimeCount(audioPlayer);
    return audioPlayer;
}

mpb.setUpProgressBar = function(){
    var progress = document.createElement('div');
    progress.id = "progress";
    progress.style.width = "0%";
    this._bar.appendChild( progress );
}



function updateProgress() {
    updateTimeCount(audio);
    var value = 0;
    if (audio.currentTime > 0) {
        value = Math.floor((100 / audio.duration) * audio.currentTime);
    }
    progress.style.width = value + "%";
}

function updateTimeCount(){
    var media = audio;
    var el = document.getElementById('testdiv');
    var currTime = Math.floor( media.currentTime );
    var totalTime = Math.floor( media.duration );
    el.innerHTML = currTime + "/" + totalTime;
}

function timeFromCursorPosition(element, event, duration){
    var dimensions = element.getBoundingClientRect();
    var pixelsOfBar = event.clientX - dimensions.left;
    var percentToSecs = pixelsOfBar / dimensions.width;
    return percentToSecs * duration;
}

function setProgressBar(event){
    audio.currentTime = timeFromCursorPosition(
        mpb._bar,event,audio.duration
    );
    updateProgress();
    
}


bar.addEventListener("mousedown", function(ev) {
    mDown = true;
    setProgressBar(ev);
});
bar.addEventListener("mouseup", function() {
    clearInterval(refreshIntervalId);
    mDown = false;
});
bar.addEventListener("mousemove", function(e) {
    if ( mDown === true ) {
        refreshIntervalId = setInterval( setProgressBar(e) , 1000 );   
    }
});