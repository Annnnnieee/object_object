

var svg = d3.select("svg"),
    margin = { left: 30, right: 30, top: 30, bottom: 30 },
    width = +svg.attr("width"),
    height = +svg.attr("height");
svg.attr("class", "graph-svg-component");


var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id; }))
    .force("charge", d3.forceManyBody()
    .strength(-20)
    .distanceMax(200))
   
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


var repo = {"path":"./intern-only-dojo","timeline":[{"commit":"7c851ce","datetime":"2016-08-25T15:01:41.000Z","nodes":[{"id":"CallbackQueue","cohesion":1.5},{"id":"DateObject","cohesion":0.16},{"id":"Evented","cohesion":1},{"id":"Observable","cohesion":0.67},{"id":"Promise","cohesion":0.26},{"id":"Deferred","cohesion":1},{"id":"Registry","cohesion":0.83},{"id":"Scheduler","cohesion":0},{"id":"TestObservable","cohesion":1},{"id":"TestAccessorObservable","cohesion":1},{"id":"MyPromise","cohesion":0.33},{"id":"AssertionError","cohesion":0},{"id":"BrowserStackTunnel","cohesion":0},{"id":"NullTunnel","cohesion":1},{"id":"SauceLabsTunnel","cohesion":0},{"id":"TestingBotTunnel","cohesion":0},{"id":"Tunnel","cohesion":0},{"id":"Evented","cohesion":1},{"id":"CallbackQueue","cohesion":0},{"id":"DateObject","cohesion":0},{"id":"Promise","cohesion":0},{"id":"Deferred","cohesion":0},{"id":"Registry","cohesion":0},{"id":"Scheduler","cohesion":0},{"id":"Observable","cohesion":0},{"id":"ObservableProperty","cohesion":0},{"id":"ObservableArray","cohesion":0},{"id":"Suite","cohesion":0},{"id":"Test","cohesion":0},{"id":"Command","cohesion":0},{"id":"Element","cohesion":0},{"id":"Server","cohesion":0},{"id":"Session","cohesion":0},{"id":"EventEmitter","cohesion":1},{"id":"Agent","cohesion":0},{"id":"Worker","cohesion":0},{"id":"Readable","cohesion":0},{"id":"Writable","cohesion":0},{"id":"Duplex","cohesion":0},{"id":"Transform","cohesion":0},{"id":"PassThrough","cohesion":1},{"id":"AssertionError","cohesion":0},{"id":"Domain","cohesion":1}],"links":[{"source":"TestObservable","target":"Observable"},{"source":"TestAccessorObservable","target":"Observable"},{"source":"MyPromise","target":"Promise"},{"source":"BrowserStackTunnel","target":"Tunnel"},{"source":"NullTunnel","target":"Tunnel"},{"source":"SauceLabsTunnel","target":"Tunnel"},{"source":"TestingBotTunnel","target":"Tunnel"},{"source":"ObservableProperty","target":"Observable"},{"source":"Worker","target":"EventEmitter"},{"source":"Readable","target":"EventEmitter"},{"source":"Writable","target":"EventEmitter"},{"source":"Duplex","target":"Readable"},{"source":"Transform","target":"EventEmitter"},{"source":"PassThrough","target":"Transform"},{"source":"Domain","target":"EventEmitter"}]}]};

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
        .attr("transform", "translate(1100, 60)");

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
        .attr("transform", "translate(40,10)")
        .call(yAxis).append("text")
        .attr("color", "black")
        .attr("transform", "rotate(-90)")
        .attr("y", 30)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("c o h e s i o n");
}