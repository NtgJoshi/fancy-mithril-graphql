const m = require('mithril');
const Loader = require('./common/Loader');
const Carousel = require('./common/Carousel');
const resourceDetails = require('./resourceDetails');

const ResourceMaster = {};

ResourceMaster.view = (vnode) => {
  return m('div', [
      m('button.btn.btn-link',
          {
              onclick: () => vnode.state.open = !vnode.state.open,
          },
          vnode.attrs.resourceName
      ),
    m('div',
      vnode.state.data.length === 0 ?
        m(Loader):
          m('section',
            [
                m(Carousel, {
                  id: vnode.attrs.resourcePath,
                  items: vnode.state.data.map(resource => (
                    {
                        label: resource[vnode.attrs.fields[0]],
                        details: m(resourceDetails, { resource, open: vnode.state.open, identifier: vnode.attrs.fields[0] }),
                    }
                  ))
                }),
            ]
          )
        ),
  ]);
};

ResourceMaster.oninit = (vnode) => {
  vnode.state.data = [];

  m.request({
    method: 'GET',
    url: `http://localhost:4000?query={${vnode.attrs.resourcePath} {${vnode.attrs.fields.join(',')}}}`,
  }).then((result) => {
    vnode.state.data = result.data[vnode.attrs.resourcePath];
    m.redraw();
  });
};

module.exports = ResourceMaster;
