const m = require('mithril');
const _ = require('lodash');

const ResourceDetails = {};

ResourceDetails.view = (vnode) => {
    const renderFields = [];
    _.forOwn(vnode.attrs.resource, (value, key) => {

        if (key !== vnode.attrs.identifier) renderFields.push(m('section', [
            m('span', key),
            m('span', ': '),
            m('span', value),
        ]))
    });

    return m(`section.collapse${vnode.attrs.open ? '.show' : ''}`, renderFields);
};

module.exports = ResourceDetails;
