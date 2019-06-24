const m = require('mithril');

const Films = {};

Films.state = {
    films: [],
};

Films.view = () => {

    const filmsList = Films.state.films.map(film => (
        m('div',
            [
                m('p', [ 'Title: ', film.title ]),
                m('p', [ 'Episode: ', film.episode_id ]),
            ]
        )
    ));

    return m('div', [
        m('hr'),
        m('h1', 'Films: '),
        m('div',
            Films.state.films.length === 0 ? 'Loading ...' : filmsList
        ),
        m('hr'),
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
