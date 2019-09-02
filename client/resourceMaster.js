const m = require('mithril');
const Loader = require('./common/Loader');
const Carousel = require('./common/Carousel');

const ResourceMaster = {};

ResourceMaster.view = (vnode) => {
  return m('div', [
    m('h1', vnode.attrs.resourceName),
    m('div',
      vnode.state.data.length === 0 ?
        m(Loader):
        m(Carousel, {
          id: vnode.attrs.resourcePath,
          items: vnode.state.data.map(resource => (
            {
              label: resource[vnode.attrs.fields[0]],
            }
          ))
        })
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
