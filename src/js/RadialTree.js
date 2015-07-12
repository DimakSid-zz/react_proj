var RadialTree = React.createClass({
    getDefaultProps: function() {
        return {
            sourceUrl: "",
            diameter: 960
        };
    },
    createGraph: function (){
        var d3 = require("d3");

        var diameter = this.props.diameter;

        var tree = d3.layout.tree()
            .size([360, diameter / 2 - 120])
            .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

        var diagonal = d3.svg.diagonal.radial()
            .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

        $(".mainGraph").html("");
        var svg = d3.select(".mainGraph").append("svg")
            .attr("width", diameter)
            .attr("height", diameter - 150)
            .append("g")
            .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

        d3.json(this.props.sourceUrl, function(error, root) {
            if (error) throw error;

            var nodes = tree.nodes(root),
                links = tree.links(nodes);

            var link = svg.selectAll(".link")
                .data(links)
                .enter().append("path")
                .attr("class", "radial_tree_link")
                .attr("d", diagonal);

            var node = svg.selectAll(".node")
                .data(nodes)
                .enter().append("g")
                .attr("class", "radial_tree_node")
                .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

            node.append("circle")
                .attr("r", 4.5);

            node.append("text")
                .attr("dy", ".31em")
                .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
                .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
                .text(function(d) { return d.name; });
        });

        d3.select(self.frameElement).style("height", diameter - 150 + "px");
    },
    componentDidMount: function(){
        this.createGraph();
    },
    render: function(){
        this.createGraph();
        return (
            <div></div>
        )
    }
});

module.exports = RadialTree;