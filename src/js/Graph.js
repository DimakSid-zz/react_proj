var Menu = require('./Menu');
var Config = require('./Config');

var Graph = React.createClass({
    getInitialState: function(){
        return {
            selectedGraph: 0,
            graphParams: {},
            history: [
                {
                    selectedGraph: 0, graphParams: {}
                }
            ]
        }
    },
    changeGraphType: function(selectedGraph, graphParams){
        var history = this.state.history;
        history.push({selectedGraph: this.state.selectedGraph, graphParams: this.state.graphParams});
        this.setState({
            selectedGraph: selectedGraph,
            graphParams: graphParams,
            history: history
        });
    },
    getBack: function(){
        var history = this.state.history;
        if (history.length > 1) {
            var lastGraph = history.pop();
            this.setState({
                selectedGraph: lastGraph.selectedGraph,
                graphParams: lastGraph.graphParams,
                history: history
            });
        }
    },
    render: function(){
        var d3 = require("d3");

        var menuLinks = [];
        Object.keys(Config.graphs).map(function(graphName, index) {
            if (Config.graphs[graphName].munuText != "")
                menuLinks[index] = Config.graphs[graphName].munuText;
        });

        var graphComponent = null;
        var graphName = Object.keys(Config.graphs)[this.state.selectedGraph];
        var graphConfig = Config.graphs[ Object.keys(Config.graphs)[this.state.selectedGraph] ];
        var graph = graphConfig.defaultGraphModule;

        switch (graphName){
            case 'nodeConnections':
                if (this.state.graphParams.userID) {
                    graphComponent = React.createElement(graph, {
                        sourceUrl: graphConfig.sourceUrl.concat(this.state.graphParams.userID),
                        changeGraphType: this.changeGraphType
                    });
                }
                break;
            default:
               graphComponent = React.createElement(graph, { sourceUrl: graphConfig.sourceUrl, changeGraphType: this.changeGraphType});
                break;
        }

        return (
            React.createElement("div", null,
                React.createElement("div", {className: "sideMenu"}, " ", React.createElement(Menu, {items:  menuLinks, changeGraphType: this.changeGraphType}), " "),
                React.createElement("div", {className: "graphSide"},
                    React.createElement("button", {className: "navButton", onClick: this.getBack}, "Go Back"),
                    React.createElement("div", {className: "mainGraph"}, " ", graphComponent, " ")
                )
            )

           /* <div>
                <div className="sideMenu"> <Menu items={ ['Students', 'Lecturers'] } changeGraphType={this.changeGraphType} /> </div>
                <div className="mainGraph">
                    {switch (this.props.selectedGraph){case "Students": <BundleGraph /> ; break;}}
                </div>
            </div>*/
        )
    }
});

module.exports = Graph;