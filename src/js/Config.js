
var Config = {
    graphs: {
        students: { munuText: 'Students', defaultGraphModule: require('./BundleGraph'), sourceUrl: 'demo.json'} ,
        lectures: { munuText: 'Lectures', defaultGraphModule: require('./BundleGraph'), sourceUrl: 'demo2.json'} ,
        nodeConnections: { munuText: '', defaultGraphModule: require('./RadialTree'), sourceUrl: 'demo3.json'}
    },
    studentsSourceUrl: "demo.json",
    lecturesSourceUrl: "demo.json"
};

module.exports = Config;