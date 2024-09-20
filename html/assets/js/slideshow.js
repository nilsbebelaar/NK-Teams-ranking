const urls = [
    '/?title=A-Finale:%20U16%20Vrouwen&size=1080p&id=41387&list=410060',
    '/?title=A-Finale:%20U16%20Mannen&size=1080p&id=41387&list=410061',
    '/?title=A-Finale:%20U14%20Vrouwen&size=1080p&id=41387&list=410062',
    '/?title=A-Finale:%20U14%20Mannen&size=1080p&id=41387&list=410063',
]
const totalUrls = urls.length;
var i = 0;

function addFrame(url, visible) {
    if (visible) {
        $('<iframe src="' + url + '""></iframe>').addClass('active').appendTo('.iframe-holder');
    } else {
        $('<iframe src="' + url + '""></iframe>').addClass('hidden').appendTo('.iframe-holder');
    }
    i = (i + 1) % totalUrls;
}

addFrame(urls[i], true);
addFrame(urls[i], false);

function loop() {
    currentFrame = $('.iframe-holder iframe.active');
    nextFrame = $('.iframe-holder iframe.hidden');

    nextFrame.removeClass('hidden').addClass('active');
    currentFrame.remove();

    addFrame(urls[i], false);
}

setInterval(loop, 20000);