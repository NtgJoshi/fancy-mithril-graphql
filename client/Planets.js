const m = require('mithril');
const Planets = {};

const url = "https://swapi.co/api/planets/";



Planets.state = {

};

const renderPlanets = () => {
    const renderedPlanets = Planets.state.data.results.map(entry => {
        return (
            m("div", [
                m("p", entry.name),
                m("p", entry.terrain)
            ])
        )
    });
    return m("div", [
        m("h2", `Total planets: #${Planets.state.data.count}`),
        m("div", renderedPlanets)
    ]);
};

Planets.view = () => {
    return m('div', [
        m('h1', 'Planets:'),
        m('div',
            Planets.state.data ? renderPlanets() : "Request in Progress..."
        )
    ]);
};

Planets.oninit = () => {
    m.request({
        method: "GET",
        url: url,
    })
    .then(function(data) {
        console.log(data);
        Planets.state.data = data;
        m.redraw();
    });
};

module.exports = Planets;
