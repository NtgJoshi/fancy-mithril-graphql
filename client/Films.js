const m = require('mithril');
const Loader = require('./common/Loader');
const Carousel = require('./common/Carousel');

const Films = {};

Films.state = {
    films: [],
};

Films.view = () => {
    return m('div', [
        m('h1', 'Films'),
        m('div',
            Films.state.films.length === 0 ?
                m(Loader):
                m(Carousel, {
                    id: 'films',
                    items: Films.state.films.map(film => (
                        {
                            label: film.title
                        }
                    ))
                })
        ),
    ]);
};

Films.oninit = () => {
    m.request({
        method: 'GET',
        url: 'https://swapi.co/api/films/',
    })
        .then((data) => {
            Films.state.films = data.results;
            m.redraw();
        });
};

module.exports = Films;
