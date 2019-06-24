const m = require('mithril');

// const model = require('./model');

const People = require('./People');
const Planets = require('./Planets');
const Films = require('./Films');
const Vehicles = require('./Vehicles');
const Species = require('./Species');

function render() {
  return m('div', [
    m('h1', 'Hello World !!'),
    m('div.container',
      m('div.row',
        [
          m('div.col-md-2.border',
             m(People),
          ),
          m('div.col-md-2.border',
             m(Films),
          ),
          m('div.col-md-2.border',
             m(Vehicles),
          ),
          m('div.col-md-2.border',
             m(Species),
          ),
        ]
      )
    )
  ]);
}

module.exports = render;
