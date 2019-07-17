const m = require('mithril');
const Loader = require('./common/Loader');
const Carousel = require('./common/Carousel');

const Planets = {};

const url = "https://swapi.co/api/planets/";



Planets.state = {

};

Planets.view = () => {
    return m('div', [
        m('h1', 'Planets'),
        m('div',
            Planets.state.data ?
                m(Carousel, {
                    id: 'planets',
                    items: Planets.state.data.results.map(planet => (
                        {
                            label: planet.name
                        }
                    ))
                }) :
                m(Loader)
        )
    ]);
};

Planets.oninit = () => {
    m.request({
        method: "GET",
        url: url,
    })
    .then(function(data) {
        Planets.state.data = data;
        m.redraw();
    });
};

module.exports = Planets;
