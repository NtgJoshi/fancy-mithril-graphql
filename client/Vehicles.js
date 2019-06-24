const m = require('mithril');

const Vehicles = {};

Vehicles.state = {
    vehicles: [],
};

Vehicles.view = () => {

    const vehiclesList = Vehicles.state.vehicles.map(film => (
        m('div',
            [
                m('p', [ 'Name: ', film.name ]),
                m('p', [ 'Model: ', film.model ]),
            ]
        )
    ));

    return m('div', [
        m('h1', 'Vehicles: '),
        m('div',
            Vehicles.state.vehicles.length === 0 ? 'Loading ...' : vehiclesList
        ),
    ]);
};

Vehicles.oninit = () => {
    m.request({
        method: 'GET',
        url: 'https://swapi.co/api/vehicles/',
    })
        .then((data) => {
            Vehicles.state.vehicles = data.results;
            m.redraw();
        });
};

module.exports = Vehicles;
