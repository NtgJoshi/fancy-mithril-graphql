const m = require('mithril');
const MainView = require('./MainView');

require('fancy-web-components')

m.mount(document.body, { view: MainView });
