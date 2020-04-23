const m = require('mithril');
const _ = require('lodash');
const Carousel = require('./common/Carousel');
const Modal = require('./common/Modal');
const resourceDetails = require('./resourceDetails');

const getResourceWithHidden = (resource, orderedFields, displayFields) => {
    return _.reduce(orderedFields, (result, value) => {
        if (displayFields.includes(value)) {
            result[value] = resource[value];
        }

        return result;
    }, {});
};

const ResourceMaster = {};

ResourceMaster.view = (vnode) => {
  return m('div', [

    m('div.d-flex.justify-content-between.align-items-center',
        {
            style: {
                borderTop: "1px solid blue",
            },
        },
        [
            m('button.btn.btn-link',
                {
                    onclick: () => vnode.state.open = !vnode.state.open,
                },
                vnode.attrs.resourceName
            ),
          m('space-loader'),
            m('div.d-flex.justify-content-between.align-items-center', [
                m('div.input-group',
                    [
                        m('div.input-group-prepend',
                            m('span.input-group-text',
                                m('i.material-icons',
                                    'search'
                                )
                            )
                        ),
                        m(`input.form-control[type="text"][placeholder="search ${vnode.attrs.searchField}"]`,
                            {
                                onkeydown: event => {
                                    if (event.keyCode === 13) {
                                        console.log('test');

                                        vnode.state.searchTerm = event.target.value;
                                        updateData(vnode);
                                    }
                                },
                            }
                        )
                    ]
                ),
                m('button.btn.btn-link',
                    {
                        onclick: () => vnode.state.settingsOpen = !vnode.state.settingsOpen,
                    },
                    m('i.material-icons',
                        'settings'
                    ),
                ),
            ]),
        ]
    ),
    m('div',
      vnode.state.data.length === 0 ?
        m('space-loader'):
          m('section',
            [
                m(Carousel, {
                  id: vnode.attrs.resourcePath,
                  items: vnode.state.data.map(resource => (
                    {
                        label: resource[vnode.state.titleField],
                        details: m(resourceDetails, {
                            resource: getResourceWithHidden(resource, vnode.state.fieldOrder, vnode.state.displayFields),
                            open: vnode.state.open,
                            identifier: vnode.state.titleField
                        }),
                    }
                  ))
                }),
                m(Modal,
                    {
                        open: vnode.state.settingsOpen,
                        title: `${vnode.attrs.resourceName} Settings`,
                        onHide: () => vnode.state.settingsOpen = !vnode.state.settingsOpen,
                        children:
                            _.reduce(vnode.state.fieldOrder, (result, key) => {
                                result.push(
                                    m('div.d-flex.justify-content-between.align-items-center',
                                        [
                                            m(`div.togglebutton${key === vnode.state.titleField ? '.disabled' : ''}`,
                                                {
                                                    onclick: event => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        if (key !== vnode.state.titleField) {
                                                            vnode.state.displayFields = vnode.state.displayFields.includes(key) ?
                                                                vnode.state.displayFields.filter(item => item !== key) :
                                                                [ ...vnode.state.displayFields, key ];
                                                            updateData(vnode);
                                                        }
                                                    }
                                                },
                                                m('label',
                                                    [
                                                        m('input[type="checkbox"]', {
                                                            checked: vnode.state.displayFields.includes(key) || vnode.state.titleField === key,
                                                        }),
                                                        m('span.toggle'),
                                                        key
                                                    ]
                                                )
                                            ),
                                            m('div.form-check',
                                                {
                                                    onclick: event => {
                                                        event.preventDefault();
                                                        event.stopPropagation();
                                                        vnode.state.titleField = key;
                                                    }
                                                },
                                                m('label.form-check-label',
                                                    [
                                                        m(`input.form-check-input`,
                                                            {
                                                                checked: vnode.state.titleField === key,
                                                                type: 'radio',
                                                            },
                                                        ),
                                                        'is title',
                                                        m('span.circle',
                                                            m('span.check')
                                                        )
                                                    ]
                                                )
                                            )
                                        ]
                                    )
                                );

                                return result;
                            }, []),
                    },
                )
            ]
          )
        ),
  ]);
};

ResourceMaster.oninit = (vnode) => {
  vnode.state.data = [];
  vnode.state.displayFields = vnode.attrs.fields;
  vnode.state.fieldOrder = vnode.attrs.fields;
  vnode.state.settingsOpen = false;
  vnode.state.titleField = vnode.attrs.fields[0];
  vnode.state.searchTerm = '';

  updateData(vnode);
};

const updateData = vnode => {
  vnode.state.data = [];

  m.request({
    method: 'GET',
    url: `http://localhost:4000?query={${vnode.attrs.resourcePath} ${vnode.state.searchTerm.length ? `(${vnode.attrs.searchField}: "${vnode.state.searchTerm}")` : ''} {${vnode.state.displayFields.join(',')}}}`,
  }).then((result) => {
    vnode.state.data = result.data[vnode.attrs.resourcePath];
    m.redraw();
  });
};

module.exports = ResourceMaster;
