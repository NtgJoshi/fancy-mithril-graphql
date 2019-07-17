const m = require('mithril');
const Loader = require('./common/Loader');
const Carousel = require('./common/Carousel');

const People = {};
const baseUrl = 'https://swapi.co/api';

People.state = {
    people: [],
};

People.view = () => {
    return m('div', [
        m('h1', 'People'),
        m('div',
          People.state.people.length === 0 ?
              m(Loader):
              m(Carousel, {
                  id: 'people',
                  items: People.state.people.map(person => (
                      {
                          label: person.name
                      }
                  ))
              })
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
