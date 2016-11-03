(function (win, doc) {
	var max = 414;

    var setFontSize = function () {
        var myHTML = doc.querySelector("html");
        var myWidth = doc.documentElement.clientWidth > max ? max : doc.documentElement.clientWidth;

        myHTML.style.fontSize = 100 * myWidth / max  + 'px';
    };

    win.onresize = function () {

        setFontSize();

    };
    setFontSize();
    
})(window, document);