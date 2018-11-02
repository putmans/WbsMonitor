// Utility functions

// Stackoverflow: https://stackoverflow.com/a/9640417
function hmsToSecondsOnly(str) {
    var p = str.split(':'),
        s = 0, m = 1;

    while (p.length > 0) {
        s += m * parseInt(p.pop(), 10);
        m *= 60;
    }

    return s;
}

// StackOverflow: https://stackoverflow.com/questions/11792726/turn-seconds-into-hms-format-using-jquery
// Modified & added hour zero padding too / Jesse
function secondsTimeSpanToHMS(s) {
    var h = Math.floor(s/3600); //Get whole hours
    s -= h*3600;
    var m = Math.floor(s/60); //Get remaining minutes
    s -= m*60;
    return (h < 10 ? '0'+h : h)+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); // zero padding on minutes and seconds (added hours too / Jesse)
}