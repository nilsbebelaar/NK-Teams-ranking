const urlParams = new URLSearchParams(window.location.search);
const year = urlParams.get('year') ?? "2023";
const category = urlParams.get('category') ?? "Mannen";


$(document).ready(function () {
    $("#year").html(year);
    $("#category").html(category);
});

$(document).ready(function () {
    var url = 'https://cors-proxy.nilsb.workers.dev/' + 'https://www.atletiek.nu/competitie/' + year + '/competitiestand/' + category + '%20NK%20Teams/'
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
            var gender = category;
            if (!teams[gender]) {
                teams[gender] = [];
            }
            teams[gender].push({
                'team': cols[1],
                'rank': cols[3],
                'points': cols[5]
            });
        });
        draw_bars(teams);
    });
});

