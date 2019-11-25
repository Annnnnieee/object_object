

var svg = d3.select("svg"),
    margin = {left: 30, right: 30, top: 30, bottom: 30 },
    width = +svg.attr("width"),
    height = +svg.attr("height");
svg.attr("class", "graph-svg-component");

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));



/*
change this to load data from a file
d3.json("miserables.json", function(error, graph) {
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
                { "id": "class b", "cohesion": .50 },
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
};

var commits = repo.timeline.map(function (coms) {return coms.commit;}).reverse();
var maxIdx = commits.length-1;

drawGraph(repo.timeline[0]);
var slider = d3
    .sliderRight()
    .min(0)
    .max(maxIdx)
    .step(1)
    .width(0)
    .height(height*0.7)
    .tickFormat(function(d,i){return commits[i]})
    .ticks(commits.length)
    .default(maxIdx)
    .handle(
        d3.symbol()
            .type(d3.symbolCircle)
            .size(100)
    )
    .fill("#ffffff")
    .on('onchange', val => {
        drawGraph(repo.timeline[maxIdx - val])
    });

svg
    .append("g")
    .attr("class", "timeline")
    .attr("transform", "translate("+ margin.left + ","+ 3*margin.top + ")")
    .call(slider);

// ==========================================
// call this draw graph method with an object from the timeline containing the links and nodes
//==========================================

// drawGraph(repo.timeline[0]);
// ===========================================

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



function drawGraph(graph) {
    svg.selectAll(".links").remove();
    svg.selectAll(".nodes").remove();

    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter()
        .append("line");

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 10) // could represent size based on the node.
        .style("fill", function (n) {
            return d3.interpolateBlues(n.cohesion);
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("title")
        .text(function (d) { return d.id; });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links)
        .distance(function (l) {
            return 150;
        });



    function ticked() {
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });

        node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });
    }

}