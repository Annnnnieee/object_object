

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id; }))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(width / 2, height / 2));


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
            datetime: "2015-03-26T9:52:26",
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
}

svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 50)
        .attr("text-anchor", "middle")  

        .style("font", "50px sans-serif")
        .text("Cohesion");

drawGraph(repo.timeline[0]);

function drawGraph(graph) {

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
        .attr("r", 50) // could represent size based on the node.
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

    simulation.force("link")
        .links(graph.links)
        .distance(function (l) {
            return 250;
        })

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
        .attr("font-size", "20px")
        .attr("fill", "black")
        .attr("text-anchor", "middle");

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
        .attr("stop-color", d3.interpolateBlues(1))

    legend.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", d3.interpolateBlues(0))

    legendblock.append("rect")
        .attr("width", 40)
        .attr("height", 300)
        .style("fill", "url(#gradient)")
        .attr("transform", "translate(0,10)");

    var y = d3.scaleLinear()
        .range([300, 0])
        .domain([0, 1]);

    var yAxis = d3.axisRight(y);

    legendblock.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(41,10)")
        .call(yAxis).append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 30)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("cohesion");

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
            .attr("y", function (d) { return d.y; })

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