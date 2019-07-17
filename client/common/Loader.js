const m = require('mithril');

const Loader = {};

Loader.view = () => m(".spinner-border.text-primary[role='status']",
    m("span.sr-only",
        "Loading..."
    )
);

module.exports = Loader;
