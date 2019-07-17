const m = require('mithril');
const Loader = require('./common/Loader');
const Carousel = require('./common/Carousel');

const Species = {};
const SWAPI_SERVER_URL = 'https://swapi.co/api';

Species.state = {
    species : [],
};

Species.oninit = () => {
// making request on example API
    m.request({
        method: 'GET',
        url: SWAPI_SERVER_URL + '/species',
    })
        .then((data) => {
            Species.state.species = data.results;
            m.redraw();
        });
};

Species.view = () => {
    return (
        m('div', [
            m('h1', 'Species'),
            m('div', [
                Species.state.species.length === 0 ?
                    m(Loader):
                    m(Carousel, {
                        id: 'species',
                        items: Species.state.species.map(specie => (
                            {
                                label: specie.name
                            }
                        ))
                    })
            ]),
        ])
    )
};

module.exports = Species;
