function draw_bars(data) {

    var svg = d3.select("svg"),
        margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleLinear().rangeRound([0, width]),
        y = d3.scaleBand().rangeRound([0, height]).padding(0.1);



    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var selectedData = data[category]; // Change to data["Vrouwen"] for women's data

    x.domain([0, 100]);    //d3.max(selectedData, function (d) { return +d.width; })]); // Parse points to numbers
    y.domain(selectedData.map(function (d) { return d.team; }));

    g.selectAll(".bar")
        .data(selectedData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("y", function (d) { return y(d.team); })
        .attr("x", 0)
        .attr("height", y.bandwidth())
        .attr("width", function (d) { return x(+d.width); }) // Parse points to numbers
        .attr("fill", function (d) { return d.team in colors ? colors[d.team]["bar"] : '#000'; });

    g.selectAll(".bar-label-team")
        .data(selectedData)
        .enter().append("text")
        .attr("class", "bar-label-team")
        .attr("x", 10) //function (d) { return x(+d.points) - 0; }) // Adjust position for label
        .attr("y", function (d) { return y(d.team) + y.bandwidth() / 2 + 12; }) // Adjust position for label
        .attr("fill", function (d) { return d.team in colors ? colors[d.team]["text"] : '#fff'; })
        .text(function (d) { return d.team; }); // Display points inside the bar

    g.selectAll(".bar-label-points")
        .data(selectedData)
        .enter().append("text")
        .attr("class", "bar-label-points")
        .attr("x", function (d) { return x(+d.width) - 15; }) // Adjust position for label
        .attr("y", function (d) { return y(d.team) + y.bandwidth() / 2 + 12; }) // Adjust position for label
        .attr("fill", function (d) { return d.team in colors ? colors[d.team]["text"] : '#fff'; })
        .text(function (d) { return d.points; }); // Display points inside the bar

};