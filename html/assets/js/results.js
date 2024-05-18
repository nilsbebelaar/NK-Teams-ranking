const urlParams = new URLSearchParams(window.location.search);
const year = urlParams.get('year') ?? "2023";
const category = urlParams.get('category') ?? "Mannen";

document.title = 'NK Teams ' + year + ": " + category;

$(document).ready(function () {
    $("#year").html(year);
    $("#category").html(category);
});

function map_range(value, low1, high1, low2, high2) {
    if (low1 == high1) { return low2; }
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

$(document).ready(function () {
    const url = 'https://cors-proxy.nilsb.workers.dev/' + 'https://www.atletiek.nu/competitie/' + year + '/competitiestand/' + category + '%20NK%20Teams/'
    $.get(url, function (response) {
        const html = $(response);

        // Initialize teams object
        var teams = {};

        // Loop through each row in the table
        html.find("table#competitieteams1>tbody>tr").each(function () {
            // Save each column
            var cols = [];
            $(this).find('td').each(function () {
                cols.push($(this).text().trim());
            });

            // Save data to teams
            if (!teams[category]) {
                teams[category] = [];
            }
            teams[category].push({
                'team': cols[1],
                'rank': cols[3],
                'points': parseInt(cols[5])
            });
        });

        var max = 0;
        var min = 100;
        $.each(teams[category], function (i, e) {
            max = Math.max(max, e["points"]);
            min = Math.min(min, e["points"]);
        });

        $.each(teams[category], function (i, e) {
            teams[category][i]["width"] = map_range(e["points"], min, max, 55, 100)
        });

        console.log(teams)
        draw_bars(teams);
    });
});

