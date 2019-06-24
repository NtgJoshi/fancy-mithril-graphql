const m = require('mithril');
const People = {};
const baseUrl = 'http://swapi.co/api';

People.state = {

};

People.view = () => {
    return m('div', [
        m('h1', 'Hello World !!'),
        m('h3', 'Result: '),
        m('ul'),
        People.state.people.map(person => {
            m('li');
            m(JSON.stringify(person));
        }),
    ]);
};

People.oninit = () => {
    // making request on example API
    m.request({
        method: 'GET',
        url: `${baseUrl}/people`,
    }).then((data) => {
        People.state.people = data;
        m.redraw();
    });
};

module.exports = People;
