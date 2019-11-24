

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

var commits = repo.timeline.map(function (coms) {return coms.commit;});

//scale
var timeline = d3.scalePoint()
    .domain(commits.reverse())
    .range([height-2*margin.bottom, 2*margin.top]);

// axis
var slider = svg
    .append("g")
    .attr("class", "timeline")
    .attr("transform", "translate(50,0)")
    .call(d3.axisRight(timeline));

// actual slider
slider.append("line")
    .attr("y1", timeline.range()[1])
    .attr("y2", timeline.range()[0])
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .call(d3.drag()
        .on("start.interrupt", function() { slider.interrupt(); })
        .on("start drag", function(d,i) {
            // TRYING TO FIGURE OUT WHICH POSITION ON THE TIMELINE THE USER DRAGGED TO
            var yPos = d3.event.y;
            console.log("Dragged at " + yPos);
            //console.log(imageScale.invert(xPos));
            var leftEdges = timeline.range();
            var width = timeline.rangeBand();
            var j;
            for(j=0; yPos > (leftEdges[j] + width); j++) {}
            console.log("Stopped at " + timeline.domain()[j]);
            moveHandleDrawGraph(timeline.domain()[j])
        })
    );

// handle
var handle = slider
    .insert("circle")
    .attr("class", "handle")
    // .attr("cy", timeline(commits.reverse()[0]))
    // .attr("cx", 0)
    .attr("r", 6);

function moveHandleDrawGraph(commitNum) {
    handle.attr("cy", timeline(commits.reverse()[commitNum]));
    drawGraph(repo.timeline[commitNum]);
}

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