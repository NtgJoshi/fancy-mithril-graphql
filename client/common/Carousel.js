const m = require('mithril');
const _ = require('lodash');

const Carousel = {};

Carousel.view = vnode => {
    const carouselItems = _.chunk(vnode.attrs.items, 3).map((itemGroup, index) =>
        m(`div.carousel-item${index === 0 ? '.active' : ''}`,
            m('div.container',
                m('div.row',
                    itemGroup.map(item =>
                        m('div.col-md-4',
                            m('h4', item.label)
                        )
                    )
                )
            )
        )
    );

    return m('div.card.card-raised.card-carousel.text-center',
        m(`div.carousel.slide[id="carousel-${vnode.attrs.id}"][data-ride="carousel"][data-interval="3000"]`,
            [
                m('div.carousel-inner',
                    carouselItems
                ),
                m(`a.carousel-control-prev[href="#carousel-${vnode.attrs.id}"][role="button"][data-slide="prev"]`,
                    [
                        m('i.material-icons',
                            'keyboard_arrow_left'
                        ),
                        m('span.sr-only',
                            'Previous'
                        )
                    ]
                ),
                m(`a.carousel-control-next[href="#carousel-${vnode.attrs.id}"][role="button"][data-slide="next"]`,
                    [
                        m('i.material-icons',
                            'keyboard_arrow_right'
                        ),
                        m('span.sr-only',
                            'Next'
                        )
                    ]
                )
            ]
        )
    );
};

module.exports = Carousel;
