const m = require('mithril');

//const model = require('./model');

const People = require('./People');
const Planets = require('./Planets');

function render() {
  return m('div', [
    m('h1', 'Hello World !!'),
    m('div', [
          m(People),
          m(Planets)
      ],
    ),
  ]);
}

module.exports = render;
