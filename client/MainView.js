const m = require('mithril');

// const model = require('./model');

const People = require('./People');
const Films = require('./Films');

function render() {
  return m('div', [
    m('h1', 'Hello World !!'),
    m('div',
         [
             m(People),
             m(Films),
         ]
    ),
  ]);
}

module.exports = render;
