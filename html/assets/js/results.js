const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id') ?? "41386";
const list = urlParams.get('list') ?? "408797";
const title = urlParams.get('title') ?? null;

document.title = /*'NK Teams ' + year + ": " + */title;

$(document).ready(function () {
    $("#title").html(title);
});

function map_range(value, low1, high1, low2, high2) {
    if (low1 == high1) { return low2; }
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

$(document).ready(function () {
    const url = 'https://cors-proxy.nilsb.workers.dev/' + 'https://www.atletiek.nu/wedstrijd/teams/' + id
    $.get(url, function (response) {
        const html = $(response);

        // Initialize teams object
        var data = [];

        // Loop through each row in the table
        html.find('#ranglijst' + list + ' table.tablesorter>tbody>tr').each(function () {
            // Save each column
            var cols = [];
            $(this).find('td').each(function () {
                cols.push($(this).text().trim());
            });

            data.push({
                'team': cols[2],
                'rank': cols[0],
                'points': parseInt(cols[5])
            });
        });

        var max = 0;
        var min = 100;
        $.each(data, function (i, e) {
            e["team"] += "_" + i
            max = Math.max(max, e["points"]);
            min = Math.min(min, e["points"]);
        });

        $.each(data, function (i, e) {
            data[i]["width"] = map_range(e["points"], min, max, 65, 100)
        });

        console.log(data);
        var throttledDrawBars = _.throttle(function () { draw_bars(data); /*d3.select('svg').selectAll('*').remove();*/ }, 100);
        setTimeout(function () { draw_bars(data); }, 500);
        $(window).on('resize', throttledDrawBars);
    });
});

