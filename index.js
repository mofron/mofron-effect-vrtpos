/**
 * @file mofron-effect-vrtpos/index.js
 * @author simpart
 */

/**
 * @class VrtPos
 * @brief Vertical Position effect class
 */
mofron.effect.VrtPos = class extends mofron.Effect {
    
    constructor (po) {
        try {
            super();
            this.name('VrtPos');
            this.prmMap('type');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    enable (cmp) {
        try {
            if ('center' === this.type()) {
                if (true === mofron.func.isInclude(cmp, 'Text')) {
                    if ((null !== cmp.target().parent()) && ('flex' === cmp.target().parent().style('display'))) {
                        cmp.target().parent().style({
                            'align-items' : 'center'
                        });
                    } else {
                        cmp.style({
                            'margin-top'    : 'auto',
                            'margin-bottom' : 'auto',
                        });
                    }
                } else {
                    cmp.style({
                        'position' : 'relative',
                        'top'      : '50%'     ,
                        '-webkit-transform' : 'translateY(-50%)',
                        'transform'         : 'translateY(-50%)'
                    });
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    disable (tgt) {
        try {
            if ('center' === this.type()) {
                if (true === mofron.func.isInclude(cmp, 'Text')) {
                    if ((null !== cmp.parent()) && ('flex' === cmp.style('display'))) {
                        cmp.style({
                            'align-items' : null
                        });
                    } else {
                        cmp.style({
                            'margin-top'    : null,
                            'margin-bottom' : null,
                        });
                    }
                } else {
                    cmp.style({
                        'position' : null,
                        'top'      : null     ,
                        '-webkit-transform' : null,
                        'transform'         : null
                    });
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    type (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_type) ? 'center' : this.m_type;
            }
            /* setter */
            if ('string' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            if ( ('left'   !== prm) &&
                 ('center' !== prm) &&
                 ('right'  !== prm) ) {
                throw new Error('invalid parameter');
            }
            this.m_type = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.effect.VrtPos;
/* end of file */
