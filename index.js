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
            this.valType('%');
            this.prmOpt(po, p2);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * vertical position effect
     *
     * @note private method
     */
    contents (cmp) {
        try {
            if (null !== this.contsIndex()) {
                this.contsList(this.contsIndex())(this, cmp);
                return;
            }
            let flg = this.valid();
            if (true === mofron.func.isInclude(cmp, 'Text')) {
                this.contsTxt(cmp, flg);
                return;
            }
            if ('center' === this.type()) {
                if ("relative" === cmp.style("position")) {
                    this.contsList(1)(this, cmp);
                } else if ("absolute" === cmp.style("position")) {
                    this.contsList(2)(this, cmp);
                } else {
                    this.contsList(0)(this, cmp);
                }
            } else {
                if ( ("absolute" === cmp.style("position")) ||
                     ("fixed" === cmp.style("position")) ) {
                    this.contsList(2)(this, cmp);
                } else {
                    this.contsList(0)(this, cmp);
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
                } else if ("none" === cmp.target().parent().style('display')) {
                    //let buf = cmp.target().parent().data(cmp.getId());
                    //if ((null !== buf) && ("flex" === buf.dispBuff)) {
                    //    console.log(buf.dispBuff);
                    //}
                } else if ( (null   !== cmp.target().parent()) &&
                            ('absolute' === cmp.target().parent().style('position')) ) {
                    this.contsList(1)(this, cmp);
                } else if ( ("grid" === cmp.target().parent().style('display')) ||
                            ("inline-grid" === cmp.target().parent().style('display')) ) {
                    this.contsList(0)(this, cmp);
                } else {
                    //console.warn("forced position");
                    //cmp.target().parent().style({ "display" : "grid" });
                    //this.contsList(0)(this, cmp);
                }
            } else {
                if ( ("relative" === cmp.style("position")) ||
                     ("absolute" === cmp.style("position")) ) {
                    this.contsList(2)(this, cmp);
                } else {
                    this.contsList(0)(this, cmp);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    contsIndex (prm) {
        try { return this.member('contsIndex', 'number', prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    contsList (idx) {
        try {
            let conts = [
                (eff, cmp) => {
                    try {
                        if ('center' === eff.type()) {
                            cmp.style({
                                'margin-top': (true === eff.valid()) ? 'auto' : null,
                                'margin-bottom' : (true === eff.valid()) ? 'auto' : null
                            });
                            if (null !== eff.offset()) {
                                cmp.style({ 'position': 'relative', 'top': eff.offset() });
                            }
                        } else if ('top' === eff.type()) {
                            cmp.style({
                                'margin-top': (true === eff.valid()) ? eff.offset() : null,
                                'margin-bottom' : (true === eff.valid()) ? 'auto' : null
                            });
                        } else {
                            cmp.style({
                                'margin-top': (true === eff.valid()) ? 'auto' : null,
                                'margin-bottom' : (true === eff.valid()) ? eff.offset() : null,
                            });
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                (eff, cmp) => {
                    try {
                        if ('center' === eff.type()) {
                            cmp.style({
                                //'position'          : (true === eff.valid()) ? 'relative' : null,
                                'top'               : (true === eff.valid()) ? eff.getValue('50%') : null,
                                '-webkit-transform' : (true === eff.valid()) ? 'translateY(-50%)' : null,
                                'transform'         : (true === eff.valid()) ? 'translateY(-50%)' : null
                            });
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
                (eff, cmp) => {
                    try {
                        let val = (null !== this.offset()) ? this.offset() : '0rem';
                        if ('top' === eff.type()) {
                            cmp.style({
                                //'position' : (true === eff.valid()) ? 'absolute' : null,
                                'top'      : (true === eff.valid()) ? val : null
                            });
                        } else if ('bottom' === eff.type()) {
                            cmp.style({
                                //'position' : (true === eff.valid()) ? 'absolute' : null,
                                'bottom'   : (true === eff.valid()) ? val : null
                            });
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
            ];
            return conts[idx];
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    valid (prm) {
        try { return this.member('valid', 'boolean', prm, true); } catch (e) {
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
                null
            ); 
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    valType (prm) {
        try { return this.member('valType', 'string', prm, 'rem'); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    getValue (prm) {
        try {
            let val = '0' + this.valType();
            if (undefined !== prm) {
                val = mf.func.getSize(prm);
                if (null === val) {
                    throw new Error('invalid paramter');
                }
                this.valType(val.type());
            }

            if (null !== this.offset()) {
                try { return mf.func.sizeSum(val, this.offset()); } catch (e) {
                    return val;
                }
            } else {
                return val;
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.effect.VrtPos;
/* end of file */
