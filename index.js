/**
 * @file mofron-effect-vrtpos/index.js
 * @author simpart
 */
const mf = require('mofron');
/**
 * @class VrtPos
 * @brief Vertical Position effect class
 */
mofron.effect.VrtPos = class extends mofron.Effect {
    
    constructor (po, p2) {
        try {
            super();
            this.name('VrtPos');
            this.prmMap('type', 'offset');
            this.prmOpt(po, p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    enable (cmp) {
        try {
            this.execonts(cmp, true);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    disable (cmp) {
        try {
            this.execonts(cmp, false);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execonts (cmp, flg) {
        try {
            if (true === mofron.func.isInclude(cmp, 'Text')) {
                this.execonts_txt(cmp, flg);
                return;
            }
            if ('center' === this.type()) {
                cmp.style({
                    'position' : (true === flg) ? 'relative' : null,
                    'top'      : (true === flg) ? '50%'      : null,
                    '-webkit-transform' : (true === flg) ? 'translateY(-50%)' : null,
                    'transform'         : (true === flg) ? 'translateY(-50%)' : null
                });
            } else if ('bottom' === this.type()) {
                cmp.style({
                    'position' : (true === flg) ? 'absolute' : null,
                    'bottom'   : (true === flg) ? '0%'       : null
                });
                if ((true === flg) && (null !== this.offset())) {
                    cmp.style({'bottom' : this.offset()});
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    execonts_txt (cmp, flg) {
        try {
            if ('center' === this.type()) {
                if ( (null   !== cmp.target().parent()) &&
                     ('flex' === cmp.target().parent().style('display')) ) {
                    cmp.target().parent().style({
                        'align-items' : (true === flg) ? this.type() : null
                    });
                } else if ( (null   !== cmp.target().parent()) &&
                            ('absolute' === cmp.target().parent().style('position')) ) {
                    cmp.style({
                        'position' : (true === flg) ? 'relative' : null,
                        'top'      : (true === flg) ? '50%' : null,
                        '-webkit-transform' : (true === flg) ? 'translateY(-50%)' : null,
                        'transform'         : (true === flg) ? 'translateY(-50%)' : null
                    });
                    if ((true === flg) && (null !== this.offset())) {
                        cmp.sizeValue(
                            'top',
                            mf.func.sizeSum(cmp.sizeValue('top'), this.offset())
                        );
                    }
                } else {
                    cmp.style({
                        'margin-top'    : (true === flg) ? 'auto' : null,
                        'margin-bottom' : (true === flg) ? 'auto' : null
                    });
                }
            } else if ('bottom' === this.type()) {
                cmp.style({
                    'position' : (true === flg) ? 'absolute' : null,
                    'bottom'   : (true === flg) ? '0%'       : null
                });
                if ((true === flg) && (null !== this.offset())) {
                    cmp.style({'bottom' : this.offset()});
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
            if ( ('top'    !== prm) &&
                 ('center' !== prm) &&
                 ('bottom' !== prm) ) {
                throw new Error('invalid parameter');
            }
            this.m_type = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    offset (prm) {
        try {
            if (undefined === prm) {
                /* getter */
                return (undefined === this.m_offset) ? null : this.m_offset;
            }
            /* setter */
            if ('string' !== typeof prm) {
                throw new Error('invalid parameter');
            }
            this.m_offset = prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.effect.VrtPos;
/* end of file */
