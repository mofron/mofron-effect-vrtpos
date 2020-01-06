/**
 * @file mofron-effect-vrtpos/index.js
 * @brief vertical position effect for mofron component
 *        the component is positioned specified parameter that is 'center' or 'top' and 'bottom'.
 * @license MIT
 */
require('mofron-util-transform');
const comutl = mofron.util.common;


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
    constructor (p1, p2) {
        try {
            super();
            this.name("VrtPos");
            this.shortForm("type","offset");
            
            this.confmng().add("type", { type: "string", select: ["top", "center", "bottom"], init: "center" });
            this.confmng().add("offset", { type: "size" });

	    if (0 < arguments.length) {
                this.config(p1,p2);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * effet contents
     *
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
     * text component position
     * 
     * @param (component) target component
     * @type private
     */
    txtpos (cmp) {
        try {
	    let off = this.offset();
	    if ( (null !== cmp.childDom().parent()) &&
	         ('flex' === cmp.childDom().parent().style('display')) ) {
                let ai = "center";
                if ("center" !== this.type()) {
		    ai = ("top" === this.type()) ? "flex-start" : "flex-end";
		}
                cmp.childDom().parent().style({ "align-items" : ai });
		if (null !== off) {
                    cmp.style({ "position" : "relative" }, { passive: true });
		    cmp.style({ "top" : off.toString() });
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
     * @param (component) target component
     * @type private
     */
    toppos (cmp) {
        try {
	    let off = this.offset();
            if ("center" === this.type()) {
                cmp.style({ "top" : "50%" });
                cmputl.translate(cmp, undefined, "-50%");
                if (null !== off) {
                    cmp.style({ "margin-top" : off.toString() });
		}
	    } else if ("top" === this.type()) {
                cmp.style({ "top" : (null !== off) ? off.toString() : "0rem" });
	    } else {
                cmp.style({ "bottom" : (null !== off) ? off.toString() : "0rem" });
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * set position by margin value
     * 
     * @param (component) target component
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
                    cmp.style({ "top" : off.toString() });
                }
            } else if ("top" === this.type()) {
                cmp.style({
                    "margin-top"    : (null !== off) ? off.toString() : "0rem",
                    "margin-bottom" : "auto"
                }); 
	    } else {
                cmp.style({
                    "margin-top"    : "auto",
		    "margin-bottom" : (null !== off) ? off.toString() : "0rem"
	        });
            }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * position type
     *
     * @param (string) position type (center,top,bottom)
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
     * offset size
     *
     * @param (string) offset size (css value)
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
