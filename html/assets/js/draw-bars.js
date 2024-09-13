function strp(d) {
    return d.split("_")[0];
};

function draw_bars(data) {

    d3.select('svg').selectAll('*').remove();

    if (params.has('size')) {
        if (params.get('size') === 'small') {
            team_x = 10; team_y = 6; points_x = -15; points_y = 6;
        }
        if (params.get('size') === 'medium') {
            team_x = 10; team_y = 10; points_x = -15; points_y = 11;
        }
    } else {
        team_x = 10; team_y = 12; points_x = -15; points_y = 12;
    }

    if (params.has('wideLayout')) {
        graphMargin = { top: 5, right: 10, bottom: 5, left: 10 }
    } else {
        graphMargin = { top: 10, right: 10, bottom: 5, left: 10 }
    }

    var svg = d3.select("svg"),
        width = +svg.attr("width") - graphMargin.left - graphMargin.right,
        height = +svg.attr("height") - graphMargin.top - graphMargin.bottom;

    var x = d3.scaleLinear().rangeRound([0, width]),
        y = d3.scaleBand().rangeRound([0, height]).padding(0.1);



    var g = svg.append("g")
        .attr("transform", "translate(" + graphMargin.left + "," + graphMargin.top + ")");

    // var selectedData = data[category]; // Change to data["Vrouwen"] for women's data

    x.domain([0, 100]);    //d3.max(selectedData, function (d) { return +d.width; })]); // Parse points to numbers
    y.domain(data.map(function (d) { return d.team; }));

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("y", function (d) { return y(d.team); })
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("width", function (d) { return x(+d.width); }) // Parse points to numbers
        .attr("fill", function (d) { return strp(d.team) in colors ? colors[strp(d.team)]["bar"] : '#000'; });

    g.selectAll(".bar-label-team")
        .data(data)
        .enter().append("text")
        .attr("class", "bar-label-team")
        .attr("x", team_x) //function (d) { return x(+d.points) - 0; }) // Adjust position for label
        .attr("y", function (d) { return y(d.team) + y.bandwidth() / 2 + team_y; }) // Adjust position for label
        .attr("fill", function (d) { return strp(d.team) in colors ? colors[strp(d.team)]["text"] : '#fff'; })
        .text(function (d) { return strp(d.team); }); // Display points inside the bar

    g.selectAll(".bar-label-points")
        .data(data)
        .enter().append("text")
        .attr("class", "bar-label-points")
        .attr("x", function (d) { return x(+d.width) + points_x; }) // Adjust position for label
        .attr("y", function (d) { return y(d.team) + y.bandwidth() / 2 + points_y; }) // Adjust position for label
        .attr("fill", function (d) { return strp(d.team) in colors ? colors[strp(d.team)]["text"] : '#fff'; })
        .text(function (d) { return d.points; }); // Display points inside the bar

};