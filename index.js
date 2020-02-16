/**
 * @file mofron-effect-vrtpos/index.js
 * @brief vertical position effect for mofron component
 *        the component is positioned specified parameter that is 'center' or 'top' and 'bottom'.
 * @license MIT
 */
require('mofron-util-transform');
const comutl = mofron.util.common;
const cmputl = mofron.util.component;

module.exports = class extends mofron.class.Effect {
    /**
     * initialize vertical position effect
     *
     * @param (mixed) type parameter
     *                key-value: effect config
     * @param offset parameter
     * @short type,offset
     * @type private
     */
    constructor (prm) {
        try {
            super();
            this.name("VrtPos");
            this.shortForm("type","offset");
            /* init config */
            this.confmng().add("type", { type: "string", select: ["top", "center", "bottom"], init: "center" });
            this.confmng().add("offset", { type: "size" });
            /* set config */
	    if (undefined !== prm) {
                this.config(prm);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * effet contents
     * 
     * @param (mofron.class.Component) effect target component
     * @type private
     */
    contents (cmp) {
        try {
            if (true === comutl.isinc(cmp,"Text")) {
                this.txtpos(cmp);
		return;
	    } else if ( ("absolute" === cmp.style("position")) ||
	                ("relative" === cmp.style("position")) ||
			("fixed" === cmp.style("position")) ) {
                this.toppos(cmp);
	    } else if ("flex" === cmp.childDom().parent().style("display")) {
                this.mgnpos(cmp);
	    } else {
	        cmp.style({ "position" : "relative" }, { passive: true });
                this.toppos(cmp);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set text component position
     * 
     * @param (mofron.class.Component) effect target component
     * @type private
     */
    txtpos (cmp) {
        try {
	    let off = this.offset();
	    let pnt = cmp.childDom().parent();
	    if ( (null !== pnt) &&
	         ('flex' === pnt.style('display')) ||
		 ('grid' === pnt.style('display')) ) {
		if ("center" === this.type()) {
		    pnt.style({ "align-items" : "center" });
                } else if ("bottom" === this.type()) {
                    pnt.style({ "align-items" : "flex-end" });
		}
		if (null !== off) {
                    cmp.style({ "position" : "relative" }, { passive: true });
		    cmp.style({ "top" : off });
		}
            } else {
                cmp.style({ "position" : "relative" }, { passive: true });
                this.toppos(cmp);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /**
     * set position by top value
     * 
     * @param (mofron.class.Component) effect target component
     * @type private
     */
    toppos (cmp) {
        try {
	    let off = this.offset();
            if ("center" === this.type()) {
                cmp.style({ "top" : "50%" });
                cmputl.translate(cmp, undefined, "-50%");
                if (null !== off) {
                    cmp.style({ "margin-top" : off });
		}
	    } else if ("top" === this.type()) {
                cmp.style({ "top" : (null !== off) ? off : "0rem" });
	    } else {
                cmp.style({ "bottom" : (null !== off) ? off : "0rem" });
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * set position by margin value
     * 
     * @param (mofron.class.Component) effect target component
     * @type private
     */
    mgnpos (cmp) {
        try {
            let off = this.offset();
            if ("center" === this.type()) {
                cmp.style({
                    "margin-top"    : "auto",
		    "margin-bottom" : "auto"
                });
		if (null !== off) {
                    cmp.style({ "position" : "relative" }, { passive: true });
                    cmp.style({ "top" : off });
                }
            } else if ("top" === this.type()) {
                cmp.style({
                    "margin-top"    : (null !== off) ? off : "0rem",
                    "margin-bottom" : "auto"
                }); 
	    } else {
                cmp.style({
                    "margin-top"    : "auto",
		    "margin-bottom" : (null !== off) ? off : "0rem"
	        });
            }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * position type setter/getter
     *
     * @param (string) position type (center,top,bottom)
     *                 undefined: call as getter
     * @return (string) position type
     * @type parameter
     */
    type (prm) {
        try {
	    return this.confmng("type", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * offset size setter/getter
     *
     * @param (string(size)) offset size
     *                       undefined: call as getter
     * @return (mofron.class.Size) offset size
     * @type parameter
     */
    offset (prm) {
        try {
	    return this.confmng("offset", prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
