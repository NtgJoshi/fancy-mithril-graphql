const m = require('mithril');

const resourceMaster = require('./resourceMaster');

function render() {
    return m(MainViewComponent);
}

const MainViewComponent = {};

MainViewComponent.view = vnode => {
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
                ),
                m('marquee[direction="right"][behavior="alternate"]',
                  '🛸'
                ),
                m('marquee',
                  '.'
                )
              ]
            )
          )
        )
      )
    ),
    m('div.main.main-raised',
      vnode.state.resourceConfig.map(entry =>
        m('div.mb-4',
          m(resourceMaster, entry),
        )
      )
    ),
    m('footer.footer[data-background-color="black"]',
      m('div.container',
      )
    )
  ];
};

MainViewComponent.oninit = vnode => {
  vnode.state.resourceConfig = [];

  m.request({
    method: 'GET',
    url: `http://localhost:4000?query={all_resources {resourceName, resourcePath, fields, searchField}}`,
  }).then((result) => {
    vnode.state.resourceConfig = result.data.all_resources;
    m.redraw();
  });
};

module.exports = render;
