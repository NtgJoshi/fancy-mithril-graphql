const m = require('mithril');

const model = require('./model');

const People = require('./People');

function render() {
  return m('div', [
    m('h1', 'Hello World !!'),
    m('div',
      m(People),
    ),
  ]);
}

module.exports = render;
