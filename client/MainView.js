const m = require('mithril');

// const model = require('./model');
const ResourceDetail = require('./resourceDetail');

const resourceConfig = [
  {resourceName: 'PEOPLE', resourcePath: 'all_people', fields: ['name'] },
  {resourceName: 'PLANETS', resourcePath: 'all_planets', fields: ['name'] },
  {resourceName: 'FILMS', resourcePath: 'all_films', fields: ['title'] },
  {resourceName: 'SPECIES', resourcePath: 'all_species', fields: ['name'] },
  {resourceName: 'VEHICLES', resourcePath: 'all_vehicles', fields: ['name'] },
];

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
          resourceConfig.map(entry =>
            m('div.form-group',
              m(ResourceDetail, entry),
            )
          )
        ),
        m('footer.footer[data-background-color="black"]',
            m('div.container',
            )
        )
    ];
}

module.exports = render;
