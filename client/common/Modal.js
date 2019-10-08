/*
 * this component displays a modal
 * props:
 *      open:       bool
 *      title:      component / string
 *      footer:     component / string
 *      children:   array of/or single mithril components
 *      onHide:     func
 */

const m = require('mithril');

const Modal = {};

Modal.view = vnode => {
    return m(`section.modal.fade${vnode.attrs.open ? '.show' : ''}`,
        vnode.attrs.open && { style: { display: 'block', paddingRight: '15px' } },
        m('section.modal-dialog.modal-lg',
            m('section.modal-content',
                [
                    vnode.attrs.title &&
                        m('section.modal-header', [
                            m('section.modal-title', vnode.attrs.title),
                            vnode.attrs.onHide && m('button.close',
                                { onclick: vnode.attrs.onHide },
                                m('span',
                                    m.trust('&times;')
                                )
                            )
                        ]),
                    vnode.attrs.children &&
                        m('section.modal-body',  vnode.attrs.children),
                    vnode.attrs.footer &&
                        m('section.modal-footer', vnode.attrs.footer),
                ]
            )
        )
    );
};

module.exports = Modal;
