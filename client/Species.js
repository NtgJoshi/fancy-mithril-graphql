const m = require('mithril');

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
    const loader = m(".spinner-border.text-primary[role='status']",
        m("span.sr-only",
            "Loading..."
        )
    );
    return (
        m('div', [
            m('h1', 'Species:'),
            m('div', [
                Species.state.species.length === 0 ? loader :
                    Species.state.species.map(specie => m('p', specie.name))
            ]),
        ])
    )
};

module.exports = Species;
