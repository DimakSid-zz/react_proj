
var Config = {
    graphs: {
        students: { munuText: 'Students', defaultGraphModule: require('./BundleGraph'), sourceUrl: 'http://localhost:8080/api/students/'} ,
        lectures: { munuText: 'Lectures', defaultGraphModule: require('./BundleGraph'), sourceUrl: 'demo.json'} ,
        nodeConnections: { munuText: '', defaultGraphModule: require('./RadialTree'), sourceUrl: 'http://localhost:8080/api/users/'}
    }
};

module.exports = Config;