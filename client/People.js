const m = require('mithril');
const People = {};

People.state = {

};

People.view = () => {
    return m('div', [
        m('h1', 'Hello World !!'),
        m('h3', 'Result: '),
    ]);
};

People.onInit = () => {
    People.state.counter = 1;
};

module.exports = People;
