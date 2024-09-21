var header = document.getElementById('header');
const params = new URLSearchParams(window.location.search);
if (params.has('size')) {
    if (params.get('size') === 'small') {
        $('body').addClass('sizeSmall')
    }
    if (params.get('size') === 'medium') {
        $('body').addClass('sizeMedium')
    }
    if (params.get('size') === '1080p') {
        $('body').addClass('size1080p')
    }
}
var wide = params.has('wideLayout')
if (wide) {
    $('body').addClass('wideLayout')
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
updateSize();

$(document).ready(function () {
    window.onload = updateSize;
    window.onresize = updateSize;
});