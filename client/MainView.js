const m = require('mithril');

// const model = require('./model');

const People = require('./People');
const Planets = require('./Planets');
const Films = require('./Films');
const Vehicles = require('./Vehicles');
const Species = require('./Species');

function render() {
    return [
        m('nav.navbar.navbar-transparent.navbar-color-on-scroll.fixed-top.navbar-expand-lg[color-on-scroll="100"][id="sectionsNav"]',
            m('div.container',
                [
                    m('div.navbar-translate',
                        [
                            m('a.navbar-brand',
                                'SWAPI GraphQL'
                            ),
                            m('button.navbar-toggler[type="button"][data-toggle="collapse"][aria-expanded="false"][aria-label="Toggle navigation"]',
                                [
                                    m('span.sr-only',
                                        'Toggle navigation'
                                    ),
                                    m('span.navbar-toggler-icon'),
                                    m('span.navbar-toggler-icon'),
                                    m('span.navbar-toggler-icon')
                                ]
                            )
                        ]
                    )
                ]
            )
        ),
        m('.page-header.header-filter.clear-filter.purple-filter[data-parallax="true"]',
            {'style':{'background-image':'url("./space_background.png")'}},
            m('div.container',
                m('div.row',
                    m('div.col-md-8.ml-auto.mr-auto',
                        m('div.brand',
                            [
                                m('h1',
                                    'SWAPI GraphQL'
                                ),
                                m('h3',
                                    'A GraphQL implementation of Star Wars API.'
                                )
                            ]
                        )
                    )
                )
            )
        ),
        m('div.main.main-raised',
            [
                m('div.form-group',
                    m(People),
                ),
                m('div.form-group',
                    m(Films),
                ),
                m('div.form-group',
                    m(Vehicles),
                ),
                m('div.form-group',
                    m(Species),
                ),
                m('div.form-group',
                    m(Planets),
                )
            ]
        ),
        m('footer.footer[data-background-color="black"]',
            m('div.container',
            )
        )
    ];
}

module.exports = render;
