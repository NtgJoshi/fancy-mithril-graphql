const m = require('mithril');
const Loader = require('./common/Loader');
const Carousel = require('./common/Carousel');

const Vehicles = {};

Vehicles.state = {
    vehicles: [],
};

Vehicles.view = () => {
    return m('div', [
        m('h1', 'Vehicles'),
        m('div',
            Vehicles.state.vehicles.length === 0 ?
                m(Loader):
                m(Carousel, {
                    id: 'vehicles',
                    items: Vehicles.state.vehicles.map(vehicle => (
                        {
                            label: vehicle.name
                        }
                    ))
                })
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
