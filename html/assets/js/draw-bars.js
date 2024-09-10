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

    var svg = d3.select("svg"),
        margin = { top: 5, right: 10, bottom: 5, left: 10 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleLinear().rangeRound([0, width]),
        y = d3.scaleBand().rangeRound([0, height]).padding(0.1);



    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
        .attr("fill", function (d) { return d.team in colors ? colors[d.team]["bar"] : '#000'; });

    g.selectAll(".bar-label-team")
        .data(data)
        .enter().append("text")
        .attr("class", "bar-label-team")
        .attr("x", team_x) //function (d) { return x(+d.points) - 0; }) // Adjust position for label
        .attr("y", function (d) { return y(d.team) + y.bandwidth() / 2 + team_y; }) // Adjust position for label
        .attr("fill", function (d) { return d.team in colors ? colors[d.team]["text"] : '#fff'; })
        .text(function (d) { return d.team; }); // Display points inside the bar

    g.selectAll(".bar-label-points")
        .data(data)
        .enter().append("text")
        .attr("class", "bar-label-points")
        .attr("x", function (d) { return x(+d.width) + points_x; }) // Adjust position for label
        .attr("y", function (d) { return y(d.team) + y.bandwidth() / 2 + points_y; }) // Adjust position for label
        .attr("fill", function (d) { return d.team in colors ? colors[d.team]["text"] : '#fff'; })
        .text(function (d) { return d.points; }); // Display points inside the bar

};