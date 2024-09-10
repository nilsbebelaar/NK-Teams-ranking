var header = document.getElementById('header');
var params = new URLSearchParams(window.location.search);
if (params.has('size')) {
    if (params.get('size') === 'small') {
        $('div.main').addClass('sizeSmall')
    }
    if (params.get('size') === 'medium') {
        $('div.main').addClass('sizeMedium')
    }
}
var wide = params.has('wideLayout')
if (wide) {
    $('div.main').addClass('wideLayout')
}

function updateSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    if (wide) {
        document.getElementById('chart').setAttribute('width', pageWidth - header.offsetWidth);
        document.getElementById('chart').setAttribute('height', pageHeight);
    } else {
        document.getElementById('chart').setAttribute('width', pageWidth);
        document.getElementById('chart').setAttribute('height', pageHeight - header.offsetHeight);
    }
}

window.onload = updateSize;
window.onresize = updateSize;