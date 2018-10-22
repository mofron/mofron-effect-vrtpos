/**
 * @file mofron-effect-vrtpos/index.js
 * @brief vertical position effect for mofron component
 * @author simpart
 */
const mf = require('mofron');

mofron.effect.VrtPos = class extends mofron.Effect {
    /**
     * initialize vertical position effect
     *
     * @param p1 (object) effect option
     * @param p1 (string) position type
     * @param p2 (string) offset size
     */
    constructor (po, p2) {
        try {
            super();
            this.name('VrtPos');
            this.prmMap(['type', 'offset']);
            this.prmOpt(po, p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    enable (cmp)  {}
    disable (cmp) {}
    
    /**
     * vertical position effect
     *
     * @note private method
     */
    contents (flg, cmp) {
        try {
            if (true === mofron.func.isInclude(cmp, 'Text')) {
                this.contsTxt(cmp, flg);
                return;
            }
            if ('center' === this.type()) {
                cmp.style({
                    'position'          : (true === flg) ? 'relative' : null,
                    'top'               : (true === flg) ? '50%'      : null,
                    '-webkit-transform' : (true === flg) ? 'translateY(-50%)' : null,
                    'transform'         : (true === flg) ? 'translateY(-50%)' : null
                });
            } else if ('bottom' === this.type()) {
                cmp.style({
                    'position' : (true === flg) ? 'absolute' : null,
                    'bottom'   : (true === flg) ? '0%'       : null
                });
                if ((true === flg) && (null !== this.offset())) {
                    cmp.style({ 'bottom' : this.offset() });
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * vertical position effect for text component
     */
    contsTxt (cmp, flg) {
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
                        'position'          : (true === flg) ? 'relative' : null,
                        'top'               : (true === flg) ? '50%' : null,
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
    
    /**
     * position type setter/getter
     *
     * @param p1 (string) position type
     * @param p1 (undefined) call as getter
     * @return (string) position type
     */
    type (prm) {
        try {
            return this.member('type', ['top', 'center', 'bottom'], prm, 'center');
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * offset size setter/getter
     *
     * @param p1 (string) offset size (css value)
     * @param p1 (undefined) call as getter
     * @return (string) offset size (css value)
     */
    offset (prm) {
        try {
            return this.member(
                'offset',
                'string', 
                (undefined !== prm) ? mf.func.getSize(prm).toString() : prm,
                '0rem'
            ); 
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.effect.VrtPos;
/* end of file */
