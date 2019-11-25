

var svg = d3.select("svg"),
    margin = { left: 30, right: 30, top: 30, bottom: 30 },
    width = +svg.attr("width"),
    height = +svg.attr("height");
svg.attr("class", "graph-svg-component");



var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id; }))
    .force("charge", d3.forceManyBody().strength(-40))
    .force("center", d3.forceCenter(width / 2, height / 2));

var graph = svg.append("g")
    .attr("class", "graph");

svg.append("text")
    .attr("class", "title")
    .attr("x", (width / 2))
    .attr("y", 50)
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size", "50px")
    .text("Cohesion");


/*
change this to load data from a file
d3.json("output.json", function(error, graph) {
  if (error) throw error;
  // graph construction goes here
}
the graph variable below is just for testing for now
*/
var repo = {
    timeline: [
        {
            commit: "d9aw2a0",
            datetime: "2015-03-25T14:48:00",
            nodes: [
                { "id": "class b", "cohesion": 1 },
                { "id": "class a", "cohesion": .01 },
                { "id": "class c", "cohesion": .44 }
            ],
            links: [
                { "source": "class a", "target": "class b" },
                { "source": "class c", "target": "class b" },
            ]
        },
        {
            commit: "8waf992",
            datetime: "2015-03-25T15:14:39",
            nodes: [
                { "id": "class b", "cohesion": .80 },
                { "id": "class a", "cohesion": .01 },
                { "id": "class c", "cohesion": .32 }
            ],
            links: [
                { "source": "class a", "target": "class b" },
                { "source": "class c", "target": "class b" },
            ]
        },
        {
            commit: "2r5sg00",
            datetime: "2015-03-25T15:14:39",
            nodes: [
                { "id": "class b", "cohesion": .50 },
                { "id": "class a", "cohesion": .10 },
                { "id": "class c", "cohesion": .57 },
                { "id": "class d", "cohesion": .99 }
            ],
            links: [
                { "source": "class a", "target": "class b" },
                { "source": "class c", "target": "class b" },
                { "source": "class d", "target": "class a" },
            ]
        },
        {
            commit: "8ah38aa",
            datetime: "2015-03-27T12:47:55",
            nodes: [
                { "id": "class b", "cohesion": .30 },
                { "id": "class a", "cohesion": .15 },
                { "id": "class c", "cohesion": .48 },
                { "id": "class d", "cohesion": .82 }
            ],
            links: [
                { "source": "class a", "target": "class b" },
                { "source": "class c", "target": "class b" },
                { "source": "class d", "target": "class a" },
                { "source": "class d", "target": "class b" }
            ]
        }

    ]
};

var commits = repo.timeline.map(function (coms) { return new Date(coms.datetime).toLocaleString('en-GB', { timeZone: 'UTC' }, { dateStyle: "short" }, { timeSytle: "short" }) }).reverse();
var maxIdx = commits.length - 1;

// draw the first commit graph when the page loads
drawGraph(repo.timeline[0]);
drawLegend();

// timeline
var slider = d3
    .sliderRight()
    .min(0)
    .max(maxIdx)
    .step(1)
    .width(0)
    .height(height * 0.7)
    .tickFormat(function (d, i) { return commits[i] })
    .ticks(commits.length)
    .default(maxIdx)
    .handle(
        d3.symbol()
            .type(d3.symbolCircle)
            .size(100)
    )
    .on('onchange', val => {
        drawGraph(repo.timeline[maxIdx - val])
    });

svg
    .append("g")
    .attr("class", "timeline")
    .attr("transform", "translate(" + margin.left + "," + 3 * margin.top + ")")
    .call(slider);


simulation.tick()



// draw graph
function drawGraph(graph) {
    svg.selectAll(".links").remove();
    svg.selectAll(".nodes").remove();
    svg.selectAll(".labels").remove();

    // draw links
    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter()
        .append("line");

    // draw nodes
    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 10)
        .style("fill", function (n) {
            return d3.interpolateBlues(n.cohesion);
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    simulation
        .nodes(graph.nodes)
        .on("tick", update);

    simulation.alphaTarget(0.3).restart();


    simulation.force("link")
        .links(graph.links)
        .distance(function (l) {
            return 250;
        });

    var text = svg.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(graph.nodes)
        .enter()
        .append("text");

    var textLabels = text
        .attr("x", function (d) { return d.x; })
        .attr("y", function (d) { return d.y; })
        .text(function (d) { return d.id })
        .attr("font-family", "sans-serif")
        .attr("font-size", "15px")
        .attr("text-anchor", "middle");

    // update elements on mouse drag
    function update() {
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });

        textLabels
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y - 15; })

    }

    // utitlity functions for mouse drag
    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

function drawLegend() {

    // legend
    var legendblock = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(860, 60)");

    var legend = legendblock.append("g")
        .append("svg:linearGradient")
        .attr("id", "gradient")
        .attr("x1", "100%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

    legend.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", d3.interpolateBlues(1));

    legend.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", d3.interpolateBlues(0));

    legendblock.append("rect")
        .attr("width", 30)
        .attr("height", 300)
        .style("fill", "url(#gradient)")
        .attr("transform", "translate(0,10)");

    var y = d3.scaleLinear()
        .range([300, 0])
        .domain([0, 1]);

    var yAxis = d3.axisRight(y);

    legendblock.append("g")
        .attr("class", "legend-label")
        .attr("transform", "translate(41,10)")
        .call(yAxis).append("text")
        .attr("color", "black")
        .attr("transform", "rotate(-90)")
        .attr("y", 30)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("c o h e s i o n");
}