/**
 * @file mofron-effect-vrtpos/index.js
 * @brief vertical position effect for mofron component
 *        the component is positioned specified parameter that is 'center' or 'top' and 'bottom'.
 * @license MIT
 */
const comutl = mofron.util.common;
const cmputl = mofron.util.component;
const transfm = require("mofron-util-transform");

module.exports = class extends mofron.class.Effect {
    /**
     * initialize vertical position effect
     *
     * @param (mixed) type config parameter
     *                key-value: effect config list
     * @param offset config parameter
     * @short type,offset
     * @type private
     */
    constructor (p1, p2) {
        try {
            super();
            this.modname("VrtPos");
            this.shortForm("position","offset");
	    
            /* init config */
            this.confmng().add("position", { type: "string", select: ["top", "center", "bottom"], init: "center" });
            this.confmng().add("offset", { type: "size" });
            this.confmng().add('style',    { type:'string', init:'auto', select:['auto','margin','transform'] });
            this.confmng().add('target',   { type:'Dom' });
            
            /* set config */
	    this.innerTgt(false);
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
     * @param (mofron.class.Component) effect target component
     * @type private
     */
    contents (cmp) {
        try {
	    let rdom = cmp.rootDom();
            for (let ridx in rdom) {

                if (true === comutl.isinc(cmp,"Text")) {
                    this.txtpos(rdom[ridx]);
		    return;
	        }

                if ("margin" === this.style()) {
                    if (null !== this.target()) {
                        this.mgnpos(this.target());
                        break;
                    }
                    this.mgnpos(rdom[ridx]);
                } else if ("transform" === this.style()) {
                    if (null !== this.target()) {
                        this.toppos(this.target());
                        break;
                    }
                    this.toppos(rdom[ridx]);
                } else {
		    if ( ("absolute" === rdom[ridx].style("position")) ||
	                        ("relative" === rdom[ridx].style("position")) ||
	                        ("fixed" === rdom[ridx].style("position")) ) {
                        this.toppos(rdom[ridx]);
	            } else if ( ("flex" === rdom[ridx].parent().style("display")) ||
		                ("flex" === cmputl.dispbuff(rdom[ridx])) ) {
                        this.mgnpos(rdom[ridx]);
	            } else {
	                rdom[ridx].style({ "position" : "relative" }, { passive: true });
                        this.toppos(rdom[ridx]);
	            }
                    
		    if ("flex" !== rdom[ridx].parent().style("display")) {
                        break;
		    }
                }
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * set text component position
     * 
     * @param (mofron.class.Dom) dom object
     * @type private
     */
    txtpos (dom) {
        try {
	    let off = this.offset();
	    let pnt = dom.parent();
	    if (null !== pnt) {
                let pnt_disp = ("none" === pnt.style("display")) ? cmputl.dispbuff(pnt) : pnt.style("display");
                if (("flex" === pnt_disp) || ('grid' === pnt_disp)) {
		    if ("center" === this.position()) {
		        pnt.style({ "align-items" : "center" });
                    } else if ("bottom" === this.position()) {
                        pnt.style({ "align-items" : "flex-end" });
		    }
		    if (null !== off) {
		        dom.style({ "position" : "relative" }, { passive: true });
		        dom.style({ "top" : off });
		    }
		    return;
		}
            }
	    dom.style({ "position" : "relative" }, { passive: true });
            this.toppos(dom);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    /**
     * set position by top value
     * 
     * @param (mofron.class.Dom) effect target component
     * @type private
     */
    toppos (dom) {
        try {
	    let off = this.offset();
	    if (null === dom.style('position')) {
                dom.style({ 'position':'relative' });
	    }
            if ("center" === this.position()) {
	        dom.style({ "top" : "50%" });
		transfm(dom, undefined, "-50%");
                if (null !== off) {
		    dom.style({ "margin-top" : off });
		}
	    } else if ("top" === this.position()) {
	        dom.style({ "top" : (null !== off) ? off : "0rem" });
	    } else {
	        dom.style({ "bottom" : (null !== off) ? off : "0rem" });
	    }
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
    
    /**
     * set position by margin value
     * 
     * @param (mofron.class.Dom) dom object
     * @type private
     */
    mgnpos (dom) {
        try {
            let off = this.offset();
            if ("center" === this.position()) {
	        dom.style({ "margin-top": "auto", "margin-bottom": "auto" });
		if (null !== off) {
		    dom.style({ "position" : "relative" }, { passive: true });
		    dom.style({ "top" : off });
                }
            } else if ("top" === this.position()) {
	        dom.style({
                    "margin-top"    : (null !== off) ? off : "0rem",
		    "margin-bottom" : "auto"
		});
	    } else {
	        dom.style({
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
    position (prm) {
        try {
	    return this.confmng("position", prm);
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

    style (prm) {
        try {
            return this.confmng('style', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    target (prm) {
        try {
            return this.confmng('target', prm);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
