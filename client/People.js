const m = require('mithril');
const People = {};
const baseUrl = 'https://swapi.co/api';

People.state = {
    people: []
};

People.view = () => {

    const peopleList = People.state.people.map(person => {
        return m('div',
          [
              m('p', person.name),
          ]
        );
    });

    return m('div', [
        m('h1', 'People:'),
        m('div',
          People.state.people.length === 0 ? 'Loading ...' : peopleList
        ),
    ]);
};

People.oninit = () => {
    // making request on example API
    m.request({
        method: 'GET',
        url: `${baseUrl}/people`,
    }).then((data) => {
        People.state.people = data.results;
        m.redraw();
    });
};

module.exports = People;
