

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
console.log(commits.length);

var sliderSimple = d3
    .sliderRight()
    .min(0)
    .max(commits.length-1)
    .step(1)
    .width(parseInt(d3.select('body').style("width"))-80)
    .tickFormat(function(d,i){return commits[i]})
    .ticks(commits.length)
    .default(0)
    .handle(
        d3.symbol()
            .type(d3.symbolCircle)
            .size(50)
    )
    .fill("#ffffff")
    .on('onchange', val => {
        console.log("VAL: " + val);
        drawGraph(repo.timeline[val])
    });

var gSimple = d3
    .select('div#slider-simple')
    .append('svg')
    .attr('width', 50)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(50,0)');

gSimple.call(sliderSimple);

// //scale
// var timeline = d3.scalePoint()
//     .domain(commits.reverse())
//     .range([height-2*margin.bottom, 2*margin.top]);
//
// // axis
// var slider = svg
//     .append("g")
//     .attr("class", "timeline")
//     .attr("transform", "translate(50,0)")
//     .call(d3.axisRight(timeline));
//
// // actual slider
// slider.append("line")
//     .attr("y1", timeline.range()[0])
//     .attr("y2", timeline.range()[1])
//     .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
//         .attr("class", "track-overlay")
//     .call(d3.drag()
//         .on("start.interrupt", function() { slider.interrupt(); })
//         .on("start drag", function(d,i) {
//             // TRYING TO FIGURE OUT WHICH POSITION ON THE TIMELINE THE USER DRAGGED TO
//             var yPos = d3.event.y;
//             console.log("Dragged at " + yPos);
//             //console.log(imageScale.invert(xPos));
//             console.log("range 0:" + timeline.range()[0]);
//             console.log("range 1:" + timeline.range()[1]);
//             var length = timeline.range()[0]-timeline.range()[1];
//             var tickSize = length/(commits.length-1);
//             console.log("length: " + length);
//             console.log("tick size: " + tickSize);
//
//             var tick;
//             for(tick = 0; yPos > timeline.range[1]+(tick*tickSize); tick++) {
//                 console.log(timeline.range[1]+tick*tickSize);
//             }
//
//             console.log("tick="+tick);
//             console.log("Stopped at " + timeline.domain().reverse()[tick]);
//
//
//             var inverseScale = d3.scalePoint()
//                 .domain(timeline.range)
//                 .range(timeline.domain);
//
//             console.log("INVERSE SCALE: " + inverseScale(d3.event.y));
//
//             moveHandleDrawGraph(tick)
//         })
//     );
//
// // handle
// var handle = slider
//     .insert("circle", ".track-overlay")
//     .attr("class", "handle")
//     // .attr("cy", timeline(commits.reverse()[0]))
//     // .attr("cx", 0)
//     .attr("r", 6);
//
// function moveHandleDrawGraph(commitNum) {
//     handle.attr("cy", timeline(commits.reverse()[commitNum]));
//     drawGraph(repo.timeline[commitNum]);
// }

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