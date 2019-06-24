const m = require('mithril');

const Films = {};

Films.state = {
    films: [],
};

Films.view = () => {

    const filmsList = Films.state.films.map(film => (
        m('div.list-group-item',
            [
                m('p', [ 'Title: ', film.title ]),
                m('p', [ 'Episode: ', film.episode_id ]),
            ]
        )
    ));

    const loader = m(".spinner-border.text-primary[role='status']",
        m("span.sr-only",
            "Loading..."
        )
    );

    return m('div', [
        m('hr'),
        m('h1', 'Films: '),
        m('div.list-group',
            Films.state.films.length === 0 ? loader : filmsList
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
