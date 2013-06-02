function linkifyTweet(e) {
    return e.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&?!\-\/]))?)/gi, '<a href="$1">$1</a>').replace(/(^|\s)#(\w+)/g, '$1<a href="http://search.twitter.com/search?q=$2">#$2</a>').replace(/(^|\s)@(\w+)/g, '$1<a href="http://twitter.com/$2">@$2</a>')
}

function relativeTime(e) {
    var t = parseDate(e),
        n = arguments.length > 1 ? arguments[1] : new Date,
        r = parseInt((n.getTime() - t) / 1e3);
    return r < 60 ? "less than a minute ago" : r < 120 ? "about a minute ago" : r < 2700 ? parseInt(r / 60).toString() + " minutes ago" : r < 5400 ? "about an hour ago" : r < 86400 ? "about " + parseInt(r / 3600).toString() + " hours ago" : r < 172800 ? "1 day ago" : parseInt(r / 86400).toString() + " days ago"
}

function parseDate(e) {
    var t = e.split(" "),
        n, r;
    return /\+0000/.test(t[5]) ? (n = t[3], r = t[4]) : (n = t[5], r = t[3]), new Date(Date.parse(t[1] + " " + t[2] + ", " + n + " " + r + " UTC"))
}(function (e, t) {
        var n = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        e.fn.imagesLoaded = function (r) {
            function i() {
                var t = e(h),
                    n = e(p);
                u && (p.length ? u.reject(f, t, n) : u.resolve(f)), e.isFunction(r) && r.call(o, f, t, n)
            }

            function s(t, r) {
                t.src === n || -1 !== e.inArray(t, l) || (l.push(t), r ? p.push(t) : h.push(t), e.data(t, "imagesLoaded", {
                            isBroken: r,
                            src: t.src
                        }), a && u.notifyWith(e(t), [r, f, e(h), e(p)]), f.length === l.length && (setTimeout(i), f.unbind(".imagesLoaded")))
            }
            var o = this,
                u = e.isFunction(e.Deferred) ? e.Deferred() : 0,
                a = e.isFunction(u.notify),
                f = o.find("img").add(o.filter("img")),
                l = [],
                h = [],
                p = [];
            return f.length ? f.bind("load.imagesLoaded error.imagesLoaded", function (e) {
                    s(e.target, "error" === e.type)
                }).each(function (r, i) {
                    var o = i.src,
                        u = e.data(i, "imagesLoaded");
                    if (u && u.src === o) s(i, u.isBroken);
                    else if (i.complete && i.naturalWidth !== t) s(i, 0 === i.naturalWidth || 0 === i.naturalHeight);
                    else if (i.readyState || i.complete) i.src = n, i.src = o
                }) : i(), u ? u.promise(o) : o
        }
    })(jQuery),
function (e) {
    function t(t) {
        var n = t || window.event,
            r = [].slice.call(arguments, 1),
            i = 0,
            s = !0,
            o = 0,
            u = 0;
        return t = e.event.fix(n), t.type = "mousewheel", n.wheelDelta && (i = n.wheelDelta / 120), n.detail && (i = -n.detail / 3), u = i, n.axis !== undefined && n.axis === n.HORIZONTAL_AXIS && (u = 0, o = -1 * i), n.wheelDeltaY !== undefined && (u = n.wheelDeltaY / 120), n.wheelDeltaX !== undefined && (o = -1 * n.wheelDeltaX / 120), r.unshift(t, i, o, u), (e.event.dispatch || e.event.handle).apply(this, r)
    }
    var n = ["DOMMouseScroll", "mousewheel"];
    if (e.event.fixHooks) for (var r = n.length; r;) e.event.fixHooks[n[--r]] = e.event.mouseHooks;
    e.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener) for (var e = n.length; e;) this.addEventListener(n[--e], t, !1);
            else this.onmousewheel = t
        },
        teardown: function () {
            if (this.removeEventListener) for (var e = n.length; e;) this.removeEventListener(n[--e], t, !1);
            else this.onmousewheel = null
        }
    }, e.fn.extend({
            mousewheel: function (e) {
                return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
            },
            unmousewheel: function (e) {
                return this.unbind("mousewheel", e)
            }
        })
}(jQuery),
function (e) {
    e.address = function () {
        var t = function (t) {
            e(e.address).trigger(e.extend(e.Event(t), function () {
                        for (var t = {}, n = e.address.parameterNames(), r = 0, i = n.length; r < i; r++) t[n[r]] = e.address.parameter(n[r]);
                        return {
                            value: e.address.value(),
                            path: e.address.path(),
                            pathNames: e.address.pathNames(),
                            parameterNames: n,
                            parameters: t,
                            queryString: e.address.queryString()
                        }
                    }.call(e.address)))
        }, n = function () {
                return e().bind.apply(e(e.address), Array.prototype.slice.call(arguments)), e.address
            }, r = function () {
                return U.pushState && _.state !== T
            }, s = function () {
                return ("/" + z.pathname.replace(new RegExp(_.state), "") + z.search + (o() ? "#" + o() : "")).replace(V, "/")
            }, o = function () {
                var e = z.href.indexOf("#");
                return e != -1 ? l(z.href.substr(e + 1), M) : ""
            }, u = function () {
                return r() ? s() : o()
            }, a = function () {
                return "javascript"
            }, f = function (e) {
                return e = e.toString(), (_.strict && e.substr(0, 1) != "/" ? "/" : "") + e
            }, l = function (e, t) {
                return _.crawlable && t ? (e !== "" ? "!" : "") + e : e.replace(/^\!/, "")
            }, h = function (e, t) {
                return parseInt(e.css(t), 10)
            }, p = function (e) {
                for (var t, n, r = 0, i = e.childNodes.length; r < i; r++) {
                    try {
                        "src" in e.childNodes[r] && e.childNodes[r].src && (t = String(e.childNodes[r].src))
                    } catch (s) {}
                    if (n = p(e.childNodes[r])) t = n
                }
                return t
            }, d = function () {
                if (!G) {
                    var e = u();
                    nt != e && (B && P < 7 ? z.reload() : (B && P < 8 && _.history && X(g, 50), nt = e, v(M)))
                }
            }, v = function (e) {
                t(k), t(e ? L : A), X(m, 10)
            }, m = function () {
                if (_.tracker !== "null" && _.tracker !== null) {
                    var t = e.isFunction(_.tracker) ? _.tracker : q[_.tracker],
                        n = (z.pathname + z.search + (e.address && !r() ? e.address.value() : "")).replace(/\/\//, "/").replace(/^\/$/, "");
                    e.isFunction(t) ? t(n) : e.isFunction(q.urchinTracker) ? q.urchinTracker(n) : q.pageTracker !== T && e.isFunction(q.pageTracker._trackPageview) ? q.pageTracker._trackPageview(n) : q._gaq !== T && e.isFunction(q._gaq.push) && q._gaq.push(["_trackPageview", decodeURI(n)])
                }
            }, g = function () {
                var e = a() + ":" + M + ";document.open();document.writeln('<html><head><title>" + R.title.replace("'", "\\'") + "</title><script>var " + N + ' = "' + encodeURIComponent(u()) + (R.domain != z.hostname ? '";document.domain="' + R.domain : "") + "\";</script></head></html>');document.close();";
                P < 7 ? $.src = e : $.contentWindow.location.replace(e)
            }, y = function () {
                if (J && K != -1) {
                    var e, t = J.substr(K + 1).split("&");
                    for (i = 0; i < t.length; i++) e = t[i].split("="), /^(autoUpdate|crawlable|history|strict|wrap)$/.test(e[0]) && (_[e[0]] = isNaN(e[1]) ? /^(true|yes)$/i.test(e[1]) : parseInt(e[1], 10) !== 0), /^(state|tracker)$/.test(e[0]) && (_[e[0]] = e[1]);
                    J = null
                }
                nt = u()
            }, b = function () {
                if (!Y) {
                    Y = O, y();
                    var n = function () {
                        w.call(this), x.call(this)
                    }, i = e("body").ajaxComplete(n);
                    n(), _.wrap && (e("body > *").wrapAll('<div style="padding:' + (h(i, "marginTop") + h(i, "paddingTop")) + "px " + (h(i, "marginRight") + h(i, "paddingRight")) + "px " + (h(i, "marginBottom") + h(i, "paddingBottom")) + "px " + (h(i, "marginLeft") + h(i, "paddingLeft")) + 'px;" />').parent().wrap('<div id="' + N + '" style="height:100%;overflow:auto;position:relative;' + (F && !window.statusbar.visible ? "resize:both;" : "") + '" />'), e("html, body").css({
                                height: "100%",
                                margin: 0,
                                padding: 0,
                                overflow: "hidden"
                            }), F && e('<style type="text/css" />').appendTo("head").text("#" + N + "::-webkit-resizer { background-color: #fff; }")), B && P < 8 && (n = R.getElementsByTagName("frameset")[0], $ = R.createElement((n ? "" : "i") + "frame"), n ? (n.insertAdjacentElement("beforeEnd", $), n[n.cols ? "cols" : "rows"] += ",0", $.noResize = O, $.frameBorder = $.frameSpacing = 0) : ($.style.display = "none", $.style.width = $.style.height = 0, $.tabIndex = -1, R.body.insertAdjacentElement("afterBegin", $)), X(function () {
                                e($).bind("load", function () {
                                        var e = $.contentWindow;
                                        nt = e[N] !== T ? e[N] : "", nt != u() && (v(M), z.hash = l(nt, O))
                                    }), $.contentWindow[N] === T && g()
                            }, 50)), X(function () {
                            t("init"), v(M)
                        }, 1), r() || (B && P > 7 || !B && "on" + C in q ? q.addEventListener ? q.addEventListener(C, d, M) : q.attachEvent && q.attachEvent("on" + C, d) : W(d, 50))
                }
            }, w = function () {
                var t, n = e("a"),
                    r = n.size(),
                    i = -1,
                    s = function () {
                        ++i != r && (t = e(n.get(i)), t.is('[rel*="address:"]') && t.address(), X(s, 1))
                    };
                X(s, 1)
            }, E = function () {
                nt != u() && (nt = u(), v(M))
            }, S = function () {
                q.removeEventListener ? q.removeEventListener(C, d, M) : q.detachEvent && q.detachEvent("on" + C, d)
            }, x = function () {
                if (_.crawlable) {
                    var t = z.pathname.replace(/\/$/, "");
                    e("body").html().indexOf("_escaped_fragment_") != -1 && e('a[href]:not([href^=http]), a[href*="' + document.domain + '"]').each(function () {
                            var n = e(this).attr("href").replace(/^http:/, "").replace(new RegExp(t + "/?$"), "");
                            (n === "" || n.indexOf("_escaped_fragment_") != -1) && e(this).attr("href", "#" + n.replace(/\/(.*)\?_escaped_fragment_=(.*)$/, "!$2"))
                        })
                }
            }, T, N = "jQueryAddress",
            C = "hashchange",
            k = "change",
            L = "internalChange",
            A = "externalChange",
            O = !0,
            M = !1,
            _ = {
                autoUpdate: O,
                crawlable: M,
                history: O,
                strict: O,
                wrap: M
            }, D = e.browser,
            P = parseFloat(e.browser.version),
            H = D.mozilla,
            B = D.msie,
            j = D.opera,
            F = D.webkit || D.safari,
            I = M,
            q = function () {
                try {
                    return top.document !== T ? top : window
                } catch (e) {
                    return window
                }
            }(),
            R = q.document,
            U = q.history,
            z = q.location,
            W = setInterval,
            X = setTimeout,
            V = /\/{2,9}/g;
        D = navigator.userAgent;
        var $, J = p(document),
            K = J ? J.indexOf("?") : -1,
            Q = R.title,
            G = M,
            Y = M,
            Z = O,
            et = O,
            tt = M,
            nt = u();
        if (B) {
            P = parseFloat(D.substr(D.indexOf("MSIE") + 4)), R.documentMode && R.documentMode != P && (P = R.documentMode != 8 ? 7 : 8);
            var rt = R.onpropertychange;
            R.onpropertychange = function () {
                rt && rt.call(R), R.title != Q && R.title.indexOf("#" + u()) != -1 && (R.title = Q)
            }
        }
        if (I = H && P >= 1 || B && P >= 6 || j && P >= 9.5 || F && P >= 523) {
            j && (history.navigationMode = "compatible");
            if (document.readyState == "complete") var it = setInterval(function () {
                        e.address && (b(), clearInterval(it))
                    }, 50);
            else y(), e(b);
            e(window).bind("popstate", E).bind("unload", S)
        } else !I && o() !== "" ? z.replace(z.href.substr(0, z.href.indexOf("#"))) : m();
        return {
            bind: function (e, t, r) {
                return n(e, t, r)
            },
            init: function (e) {
                return n("init", e)
            },
            change: function (e) {
                return n(k, e)
            },
            internalChange: function (e) {
                return n(L, e)
            },
            externalChange: function (e) {
                return n(A, e)
            },
            baseURL: function () {
                var e = z.href;
                return e.indexOf("#") != -1 && (e = e.substr(0, e.indexOf("#"))), /\/$/.test(e) && (e = e.substr(0, e.length - 1)), e
            },
            autoUpdate: function (e) {
                return e !== T ? (_.autoUpdate = e, this) : _.autoUpdate
            },
            crawlable: function (e) {
                return e !== T ? (_.crawlable = e, this) : _.crawlable
            },
            history: function (e) {
                return e !== T ? (_.history = e, this) : _.history
            },
            state: function (e) {
                if (e !== T) {
                    _.state = e;
                    var t = s();
                    return _.state !== T && (U.pushState ? t.substr(0, 3) == "/#/" && z.replace(_.state.replace(/^\/$/, "") + t.substr(2)) : t != "/" && t.replace(/^\/#/, "") != o() && X(function () {
                                z.replace(_.state.replace(/^\/$/, "") + "/#" + t)
                            }, 1)), this
                }
                return _.state
            },
            strict: function (e) {
                return e !== T ? (_.strict = e, this) : _.strict
            },
            tracker: function (e) {
                return e !== T ? (_.tracker = e, this) : _.tracker
            },
            wrap: function (e) {
                return e !== T ? (_.wrap = e, this) : _.wrap
            },
            update: function () {
                return tt = O, this.value(nt), tt = M, this
            },
            title: function (e) {
                return e !== T ? (X(function () {
                            Q = R.title = e, et && $ && $.contentWindow && $.contentWindow.document && ($.contentWindow.document.title = e, et = M), !Z && H && z.replace(z.href.indexOf("#") != -1 ? z.href : z.href + "#"), Z = M
                        }, 50), this) : R.title
            },
            value: function (e) {
                if (e !== T) {
                    e = f(e), e == "/" && (e = "");
                    if (nt == e && !tt) return;
                    Z = O, nt = e;
                    if (_.autoUpdate || tt) v(O), r() ? U[_.history ? "pushState" : "replaceState"]({}, "", _.state.replace(/\/$/, "") + (nt === "" ? "/" : nt)) : (G = O, F ? _.history ? z.hash = "#" + l(nt, O) : z.replace("#" + l(nt, O)) : nt != u() && (_.history ? z.hash = "#" + l(nt, O) : z.replace("#" + l(nt, O))), B && P < 8 && _.history && X(g, 50), F ? X(function () {
                                    G = M
                                }, 1) : G = M);
                    return this
                }
                return I ? f(nt) : null
            },
            path: function (e) {
                if (e !== T) {
                    var t = this.queryString(),
                        n = this.hash();
                    return this.value(e + (t ? "?" + t : "") + (n ? "#" + n : "")), this
                }
                return f(nt).split("#")[0].split("?")[0]
            },
            pathNames: function () {
                var e = this.path(),
                    t = e.replace(V, "/").split("/");
                return (e.substr(0, 1) == "/" || e.length === 0) && t.splice(0, 1), e.substr(e.length - 1, 1) == "/" && t.splice(t.length - 1, 1), t
            },
            queryString: function (e) {
                if (e !== T) {
                    var t = this.hash();
                    return this.value(this.path() + (e ? "?" + e : "") + (t ? "#" + t : "")), this
                }
                return e = nt.split("?"), e.slice(1, e.length).join("?").split("#")[0]
            },
            parameter: function (t, n, r) {
                var i, s;
                if (n !== T) {
                    var o = this.parameterNames();
                    s = [], n = n ? n.toString() : "";
                    for (i = 0; i < o.length; i++) {
                        var u = o[i],
                            a = this.parameter(u);
                        typeof a == "string" && (a = [a]), u == t && (a = n === null || n === "" ? [] : r ? a.concat([n]) : [n]);
                        for (var f = 0; f < a.length; f++) s.push(u + "=" + a[f])
                    }
                    return e.inArray(t, o) == -1 && n !== null && n !== "" && s.push(t + "=" + n), this.queryString(s.join("&")), this
                }
                if (n = this.queryString()) {
                    r = [], s = n.split("&");
                    for (i = 0; i < s.length; i++) n = s[i].split("="), n[0] == t && r.push(n.slice(1).join("="));
                    if (r.length !== 0) return r.length != 1 ? r : r[0]
                }
            },
            parameterNames: function () {
                var t = this.queryString(),
                    n = [];
                if (t && t.indexOf("=") != -1) {
                    t = t.split("&");
                    for (var r = 0; r < t.length; r++) {
                        var i = t[r].split("=")[0];
                        e.inArray(i, n) == -1 && n.push(i)
                    }
                }
                return n
            },
            hash: function (e) {
                return e !== T ? (this.value(nt.split("#")[0] + (e ? "#" + e : "")), this) : (e = nt.split("#"), e.slice(1, e.length).join("#"))
            }
        }
    }(), e.fn.address = function (t) {
        if (!e(this).attr("address")) {
            var n = function (n) {
                if (n.shiftKey || n.ctrlKey || n.metaKey) return !0;
                if (e(this).is("a")) {
                    var r = t ? t.call(this) : /address:/.test(e(this).attr("rel")) ? e(this).attr("rel").split("address:")[1].split(" ")[0] : e.address.state() !== undefined && e.address.state() != "/" ? e(this).attr("href").replace(new RegExp("^(.*" + e.address.state() + "|\\.)"), "") : e(this).attr("href").replace(/^(#\!?|\.)/, "");
                    e.address.value(r), n.preventDefault()
                }
            };
            e(this).click(n).live("click", n).live("submit", function (n) {
                    if (e(this).is("form")) {
                        var r = e(this).attr("action");
                        r = t ? t.call(this) : (r.indexOf("?") != -1 ? r.replace(/&$/, "") : r + "?") + e(this).serialize(), e.address.value(r), n.preventDefault()
                    }
                }).attr("address", !0)
        }
        return this
    }
}(jQuery),
function (e, t, n) {
    t.infinitescroll = function (n, r, i) {
        this.element = t(i), this._create(n, r) || (this.failed = !0)
    }, t.infinitescroll.defaults = {
        loading: {
            finished: n,
            finishedMsg: "<em>Congratulations, you've reached the end of the internet.</em>",
            img: "http://www.infinite-scroll.com/loading.gif",
            msg: null,
            msgText: "<em>Loading the next set of posts...</em>",
            selector: null,
            speed: "fast",
            start: n
        },
        state: {
            isDuringAjax: !1,
            isInvalidPage: !1,
            isDestroyed: !1,
            isDone: !1,
            isPaused: !1,
            currPage: 1
        },
        callback: n,
        debug: !1,
        behavior: n,
        binder: t(e),
        nextSelector: "div.navigation a:first",
        navSelector: "div.navigation",
        contentSelector: null,
        extraScrollPx: 150,
        itemSelector: "div.post",
        animate: !1,
        pathParse: n,
        dataType: "html",
        appendCallback: !0,
        bufferPx: 40,
        errorCallback: function () {},
        infid: 0,
        pixelsFromNavToBottom: n,
        path: n
    }, t.infinitescroll.prototype = {
        _binding: function (t) {
            var r = this,
                i = r.options;
            i.v = "2.0b2.111027";
            if ( !! i.behavior && this["_binding_" + i.behavior] !== n) {
                this["_binding_" + i.behavior].call(this);
                return
            }
            if (t !== "bind" && t !== "unbind") return this._debug("Binding value  " + t + " not valid"), !1;
            t == "unbind" ? this.options.binder.unbind("smartscroll.infscr." + r.options.infid) : this.options.binder[t]("smartscroll.infscr." + r.options.infid, function () {
                    r.scroll()
                }), this._debug("Binding", t)
        },
        _create: function (r, i) {
            var s = t.extend(!0, {}, t.infinitescroll.defaults, r);
            if (!this._validate(r)) return !1;
            this.options = s;
            var o = t(s.nextSelector).attr("href");
            return o ? (s.path = this._determinepath(o), s.contentSelector = s.contentSelector || this.element, s.loading.selector = s.loading.selector || s.contentSelector, s.loading.msg = t('<div id="infscr-loading"><img alt="Loading..." src="' + s.loading.img + '" /><div>' + s.loading.msgText + "</div></div>"), (new Image).src = s.loading.img, s.pixelsFromNavToBottom = t(document).height() - t(s.navSelector).offset().top, s.loading.start = s.loading.start || function () {
                    t(s.navSelector).hide(), s.loading.msg.appendTo(s.loading.selector).show(s.loading.speed, function () {
                            beginAjax(s)
                        })
                }, s.loading.finished = s.loading.finished || function () {
                    s.loading.msg.fadeOut("normal")
                }, s.callback = function (e, r) { !! s.behavior && e["_callback_" + s.behavior] !== n && e["_callback_" + s.behavior].call(t(s.contentSelector)[0], r), i && i.call(t(s.contentSelector)[0], r, s)
                }, this._setup(), !0) : (this._debug("Navigation selector not found"), !1)
        },
        _debug: function () {
            if (this.options && this.options.debug) return e.console && console.log.call(console, arguments)
        },
        _determinepath: function (t) {
            var r = this.options;
            if (!r.behavior || this["_determinepath_" + r.behavior] === n) {
                if (!r.pathParse) {
                    if (t.match(/^(.*?)\b2\b(.*?$)/)) t = t.match(/^(.*?)\b2\b(.*?$)/).slice(1);
                    else if (t.match(/^(.*?)2(.*?$)/)) {
                        if (t.match(/^(.*?page=)2(\/.*|$)/)) return t = t.match(/^(.*?page=)2(\/.*|$)/).slice(1), t;
                        t = t.match(/^(.*?)2(.*?$)/).slice(1)
                    } else {
                        if (t.match(/^(.*?page=)1(\/.*|$)/)) return t = t.match(/^(.*?page=)1(\/.*|$)/).slice(1), t;
                        this._debug("Sorry, we couldn't parse your Next (Previous Posts) URL. Verify your the css selector points to the correct A tag. If you still get this error: yell, scream, and kindly ask for help at infinite-scroll.com."), r.state.isInvalidPage = !0
                    }
                    return this._debug("determinePath", t), t
                }
                return this._debug("pathParse manual"), r.pathParse(t, this.options.state.currPage + 1)
            }
            this["_determinepath_" + r.behavior].call(this, t);
            return
        },
        _error: function (t) {
            var r = this.options;
            if ( !! r.behavior && this["_error_" + r.behavior] !== n) {
                this["_error_" + r.behavior].call(this, t);
                return
            }
            t !== "destroy" && t !== "end" && (t = "unknown"), this._debug("Error", t), t == "end" && this._showdonemsg(), r.state.isDone = !0, r.state.currPage = 1, r.state.isPaused = !1, this._binding("unbind")
        },
        _loadcallback: function (i, s) {
            var o = this.options,
                u = this.options.callback,
                a = o.state.isDone ? "done" : o.appendCallback ? "append" : "no-append",
                f;
            if ( !! o.behavior && this["_loadcallback_" + o.behavior] !== n) {
                this["_loadcallback_" + o.behavior].call(this, i, s);
                return
            }
            switch (a) {
            case "done":
                return this._showdonemsg(), !1;
            case "no-append":
                o.dataType == "html" && (s = "<div>" + s + "</div>", s = t(s).find(o.itemSelector));
                break;
            case "append":
                var l = i.children();
                if (l.length == 0) return this._error("end");
                f = document.createDocumentFragment();
                while (i[0].firstChild) f.appendChild(i[0].firstChild);
                this._debug("contentSelector", t(o.contentSelector)[0]), t(o.contentSelector)[0].appendChild(f), s = l.get()
            }
            o.loading.finished.call(t(o.contentSelector)[0], o);
            if (o.animate) {
                var c = t(e).scrollTop() + t("#infscr-loading").height() + o.extraScrollPx + "px";
                t("html,body").animate({
                        scrollTop: c
                    }, 800, function () {
                        o.state.isDuringAjax = !1
                    })
            }
            o.animate || (o.state.isDuringAjax = !1), u(this, s)
        },
        _nearbottom: function () {
            var i = this.options,
                s = 0 + t(document).height() - i.binder.scrollTop() - t(e).height();
            return !i.behavior || this["_nearbottom_" + i.behavior] === n ? (this._debug("math:", s, i.pixelsFromNavToBottom), s - i.bufferPx < i.pixelsFromNavToBottom) : this["_nearbottom_" + i.behavior].call(this)
        },
        _pausing: function (t) {
            var r = this.options;
            if (!r.behavior || this["_pausing_" + r.behavior] === n) {
                t !== "pause" && t !== "resume" && t !== null && this._debug("Invalid argument. Toggling pause value instead"), t = !t || t != "pause" && t != "resume" ? "toggle" : t;
                switch (t) {
                case "pause":
                    r.state.isPaused = !0;
                    break;
                case "resume":
                    r.state.isPaused = !1;
                    break;
                case "toggle":
                    r.state.isPaused = !r.state.isPaused
                }
                return this._debug("Paused", r.state.isPaused), !1
            }
            this["_pausing_" + r.behavior].call(this, t);
            return
        },
        _setup: function () {
            var t = this.options;
            if (!t.behavior || this["_setup_" + t.behavior] === n) return this._binding("bind"), !1;
            this["_setup_" + t.behavior].call(this);
            return
        },
        _showdonemsg: function () {
            var r = this.options;
            if ( !! r.behavior && this["_showdonemsg_" + r.behavior] !== n) {
                this["_showdonemsg_" + r.behavior].call(this);
                return
            }
            r.loading.msg.find("img").hide().parent().find("div").html(r.loading.finishedMsg).animate({
                    opacity: 1
                }, 2e3, function () {
                    t(this).parent().fadeOut("normal")
                }), r.errorCallback.call(t(r.contentSelector)[0], "done")
        },
        _validate: function (n) {
            for (var r in n) if (r.indexOf && r.indexOf("Selector") > -1 && t(n[r]).length === 0) return this._debug("Your " + r + " found no elements."), !1;
            return !0
        },
        bind: function () {
            this._binding("bind")
        },
        destroy: function () {
            return this.options.state.isDestroyed = !0, this._error("destroy")
        },
        pause: function () {
            this._pausing("pause")
        },
        resume: function () {
            this._pausing("resume")
        },
        retrieve: function (r) {
            var i = this,
                s = i.options,
                o = s.path,
                u, a, f, l, c, r = r || null,
                h = r ? r : s.state.currPage;
            beginAjax = function (n) {
                n.state.currPage++, i._debug("heading into ajax", o), u = t(n.contentSelector).is("table") ? t("<tbody/>") : t("<div/>"), f = o.join(n.state.currPage), l = n.dataType == "html" || n.dataType == "json" ? n.dataType : "html+callback", n.appendCallback && n.dataType == "html" && (l += "+callback");
                switch (l) {
                case "html+callback":
                    i._debug("Using HTML via .load() method"), u.load(f + " " + n.itemSelector, null, function (t) {
                            i._loadcallback(u, t)
                        });
                    break;
                case "html":
                case "json":
                    i._debug("Using " + l.toUpperCase() + " via $.ajax() method"), t.ajax({
                            url: f,
                            dataType: n.dataType,
                            complete: function (t, n) {
                                c = typeof t.isResolved != "undefined" ? t.isResolved() : n === "success" || n === "notmodified", c ? i._loadcallback(u, t.responseText) : i._error("end")
                            }
                        })
                }
            };
            if ( !! s.behavior && this["retrieve_" + s.behavior] !== n) {
                this["retrieve_" + s.behavior].call(this, r);
                return
            }
            if (s.state.isDestroyed) return this._debug("Instance is destroyed"), !1;
            s.state.isDuringAjax = !0, s.loading.start.call(t(s.contentSelector)[0], s)
        },
        scroll: function () {
            var t = this.options,
                r = t.state;
            if ( !! t.behavior && this["scroll_" + t.behavior] !== n) {
                this["scroll_" + t.behavior].call(this);
                return
            }
            if (r.isDuringAjax || r.isInvalidPage || r.isDone || r.isDestroyed || r.isPaused) return;
            if (!this._nearbottom()) return;
            this.retrieve()
        },
        toggle: function () {
            this._pausing()
        },
        unbind: function () {
            this._binding("unbind")
        },
        update: function (n) {
            t.isPlainObject(n) && (this.options = t.extend(!0, this.options, n))
        }
    }, t.fn.infinitescroll = function (n, r) {
        var i = typeof n;
        switch (i) {
        case "string":
            var s = Array.prototype.slice.call(arguments, 1);
            this.each(function () {
                    var e = t.data(this, "infinitescroll");
                    if (!e) return !1;
                    if (!t.isFunction(e[n]) || n.charAt(0) === "_") return !1;
                    e[n].apply(e, s)
                });
            break;
        case "object":
            this.each(function () {
                    var e = t.data(this, "infinitescroll");
                    e ? e.update(n) : (e = new t.infinitescroll(n, r, this), e.failed || t.data(this, "infinitescroll", e))
                })
        }
        return this
    };
    var r = t.event,
        i;
    r.special.smartscroll = {
        setup: function () {
            t(this).bind("scroll", r.special.smartscroll.handler)
        },
        teardown: function () {
            t(this).unbind("scroll", r.special.smartscroll.handler)
        },
        handler: function (e, n) {
            var r = this,
                s = arguments;
            e.type = "smartscroll", i && clearTimeout(i), i = setTimeout(function () {
                    t.event.handle.apply(r, s)
                }, n === "execAsap" ? 0 : 100)
        }
    }, t.fn.smartscroll = function (e) {
        return e ? this.bind("smartscroll", e) : this.trigger("smartscroll", ["execAsap"])
    }
}(window, jQuery), $.extend($.infinitescroll.prototype, {
        _setup_twitter: function () {
            var t = this.options,
                n = this;
            $(t.nextSelector).click(function (e) {
                    e.which == 1 && !e.metaKey && !e.shiftKey && (e.preventDefault(), n.retrieve())
                }), n.options.loading.start = function (e) {
                e.loading.msg.appendTo(e.loading.selector).show(e.loading.speed, function () {
                        beginAjax(e)
                    })
            }
        }
    }),
function (e) {
    function n(e) {
        return typeof e == "object" ? e : {
            top: e,
            left: e
        }
    }
    var t = e.scrollTo = function (t, n, r) {
        e(window).scrollTo(t, n, r)
    };
    t.defaults = {
        axis: "xy",
        duration: parseFloat(e.fn.jquery) >= 1.3 ? 0 : 1
    }, t.window = function (t) {
        return e(window)._scrollable()
    }, e.fn._scrollable = function () {
        return this.map(function () {
                var t = this,
                    n = !t.nodeName || e.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"]) != -1;
                if (!n) return t;
                var r = (t.contentWindow || t).document || t.ownerDocument || t;
                return e.browser.safari || r.compatMode == "BackCompat" ? r.body : r.documentElement
            })
    }, e.fn.scrollTo = function (r, i, s) {
        return typeof i == "object" && (s = i, i = 0), typeof s == "function" && (s = {
                onAfter: s
            }), r == "max" && (r = 9e9), s = e.extend({}, t.defaults, s), i = i || s.speed || s.duration, s.queue = s.queue && s.axis.length > 1, s.queue && (i /= 2), s.offset = n(s.offset), s.over = n(s.over), this._scrollable().each(function () {
                function h(e) {
                    u.animate(l, i, s.easing, e && function () {
                            e.call(this, r, s)
                        })
                }
                var o = this,
                    u = e(o),
                    a = r,
                    f, l = {}, c = u.is("html,body");
                switch (typeof a) {
                case "number":
                case "string":
                    if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(a)) {
                        a = n(a);
                        break
                    }
                    a = e(a, this);
                case "object":
                    if (a.is || a.style) f = (a = e(a)).offset()
                }
                e.each(s.axis.split(""), function (e, n) {
                        var r = n == "x" ? "Left" : "Top",
                            i = r.toLowerCase(),
                            p = "scroll" + r,
                            d = o[p],
                            v = t.max(o, n);
                        if (f) l[p] = f[i] + (c ? 0 : d - u.offset()[i]), s.margin && (l[p] -= parseInt(a.css("margin" + r)) || 0, l[p] -= parseInt(a.css("border" + r + "Width")) || 0), l[p] += s.offset[i] || 0, s.over[i] && (l[p] += a[n == "x" ? "width" : "height"]() * s.over[i]);
                        else {
                            var m = a[i];
                            l[p] = m.slice && m.slice(-1) == "%" ? parseFloat(m) / 100 * v : m
                        }
                        /^\d+$/.test(l[p]) && (l[p] = l[p] <= 0 ? 0 : Math.min(l[p], v)), !e && s.queue && (d != l[p] && h(s.onAfterFirst), delete l[p])
                    }), h(s.onAfter)
            }).end()
    }, t.max = function (t, n) {
        var r = n == "x" ? "Width" : "Height",
            i = "scroll" + r;
        if (!e(t).is("html,body")) return t[i] - e(t)[r.toLowerCase()]();
        var s = "client" + r,
            o = t.ownerDocument.documentElement,
            u = t.ownerDocument.body;
        return Math.max(o[i], u[i]) - Math.min(o[s], u[s])
    }
}(jQuery),
function (e) {
    var t = e.serialScroll = function (t) {
        return e(window).serialScroll(t)
    };
    t.defaults = {
        duration: 1e3,
        axis: "x",
        event: "click",
        start: 0,
        step: 1,
        lock: !0,
        cycle: !0,
        constant: !0
    }, e.fn.serialScroll = function (n) {
        return this.each(function () {
                function g(e) {
                    e.data += p, y(e, this)
                }

                function y(e, t) {
                    isNaN(t) || (e.data = t, t = l);
                    var n = e.data,
                        i, o = e.type,
                        u = r.exclude ? S().slice(0, -r.exclude) : S(),
                        a = u.length,
                        c = u[n],
                        h = r.duration;
                    o && e.preventDefault(), d && (E(), m = setTimeout(w, r.interval));
                    if (!c) {
                        i = n < 0 ? 0 : a - 1;
                        if (p != i) n = i;
                        else {
                            if (!r.cycle) return;
                            n = a - i - 1
                        }
                        c = u[n]
                    }
                    if (!c || r.lock && f.is(":animated") || o && r.onBefore && r.onBefore(e, c, f, S(), n) === !1) return;
                    r.stop && f.queue("fx", []).stop(), r.constant && (h = Math.abs(h / s * (p - n))), f.scrollTo(c, h, r).trigger("notify.serialScroll", [n])
                }

                function w() {
                    f.trigger("next.serialScroll")
                }

                function E() {
                    clearTimeout(m)
                }

                function S() {
                    return e(h, l)
                }

                function x(e) {
                    if (!isNaN(e)) return e;
                    var t = S(),
                        n;
                    while ((n = t.index(e)) == -1 && e != l) e = e.parentNode;
                    return n
                }
                var r = e.extend({}, t.defaults, n),
                    i = r.event,
                    s = r.step,
                    o = r.lazy,
                    u = r.target ? this : document,
                    f = e(r.target || this, u),
                    l = f[0],
                    h = r.items,
                    p = r.start,
                    d = r.interval,
                    v = r.navigation,
                    m;
                o || (h = S()), r.force && y({}, p), e(r.prev || [], u).bind(i, -s, g), e(r.next || [], u).bind(i, s, g), l.ssbound || f.bind("prev.serialScroll", -s, g).bind("next.serialScroll", s, g).bind("goto.serialScroll", y), d && f.bind("start.serialScroll", function (e) {
                        d || (E(), d = !0, w())
                    }).bind("stop.serialScroll", function () {
                        E(), d = !1
                    }), f.bind("notify.serialScroll", function (e, t) {
                        var n = x(t);
                        n > -1 && (p = n)
                    }), l.ssbound = !0, r.jump && (o ? f : S()).bind(i, function (e) {
                        y(e, x(e.target))
                    }), v && (v = e(v, u).bind(i, function (e) {
                            e.data = Math.round(S().length / v.length) * v.index(this), y(e, this)
                        }))
            })
    }
}(jQuery),
function (e) {
    function a() {
        var t, n, r = {
                height: s.innerHeight,
                width: s.innerWidth
            };
        if (!r.height) {
            t = i.compatMode;
            if (t || !e.support.boxModel) n = t === "CSS1Compat" ? o : i.body, r = {
                    height: n.clientHeight,
                    width: n.clientWidth
            }
        }
        return r
    }

    function f() {
        return {
            top: s.pageYOffset || o.scrollTop || i.body.scrollTop,
            left: s.pageXOffset || o.scrollLeft || i.body.scrollLeft
        }
    }

    function l() {
        var i = e(),
            s, u = 0;
        e.each(t, function (e, t) {
                var n = t.data.selector,
                    r = t.$element;
                i = i.add(n ? r.find(n) : r)
            }), s = i.length;
        if (s) {
            n = n || a(), r = r || f();
            for (; u < s; u++) {
                if (!e.contains(o, i[u])) continue;
                var l = e(i[u]),
                    c = {
                        height: l.height(),
                        width: l.width()
                    }, h = l.offset(),
                    p = l.data("inview"),
                    d, v, m;
                if (!r || !n) return;
                h.top + c.height > r.top && h.top < r.top + n.height && h.left + c.width > r.left && h.left < r.left + n.width ? (d = r.left > h.left ? "right" : r.left + n.width < h.left + c.width ? "left" : "both", v = r.top > h.top ? "bottom" : r.top + n.height < h.top + c.height ? "top" : "both", m = d + "-" + v, (!p || p !== m) && l.data("inview", m).trigger("inview", [!0, d, v])) : p && l.data("inview", !1).trigger("inview", [!1])
            }
        }
    }
    var t = {}, n, r, i = document,
        s = window,
        o = i.documentElement,
        u = e.expando;
    e.event.special.inview = {
        add: function (n) {
            t[n.guid + "-" + this[u]] = {
                data: n,
                $element: e(this)
            }
        },
        remove: function (e) {
            try {
                delete t[e.guid + "-" + this[u]]
            } catch (n) {}
        }
    }, e(s).bind("scroll resize", function () {
            n = r = null
        }), setInterval(l, 250)
}(jQuery), window.log = function () {
    log.history = log.history || [], log.history.push(arguments);
    if (this.console) {
        var t = arguments,
            n;
        t.callee = t.callee.caller, n = [].slice.call(t), typeof console.log == "object" ? log.apply.call(console.log, console, n) : console.log.apply(console, n)
    }
},
function (e) {
    function t() {}
    for (var n = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","), r; !! (r = n.pop());) e[r] = e[r] || t
}(function () {
        try {
            return console.log(), window.console
        } catch (e) {
            return window.console = {}
        }
    }()),
function (e) {
    e.fn.pxu_resize_video = function (t, n) {
        var r = this,
            i = e(r).find('iframe[src^="http://www.youtube.com"], iframe[src^="http://player.vimeo.com"], embed[src^="http://assets.tumblr.com"]');
        i.each(function () {
                var r;
                t !== undefined ? (r = e(this).height() / e(this).width(), e(this).removeAttr("height").removeAttr("width").width(t).height(t * r)) : (r = e(this).width() / e(this).height(), e(this).removeAttr("height").removeAttr("width").height(n).width(n * r).parent("article").width(n * r))
            });
        var s = e(r).find(".tumblr_video_iframe");
        s.each(function () {
                var r;
                t ? (r = e(this).height() / e(this).width(), e(this).removeAttr("height").removeAttr("width").css({
                            width: t,
                            height: Math.floor(t * r)
                        }), e(this).parent().css({
                            width: t,
                            height: Math.floor(t * r)
                        })) : (r = e(this).width() / e(this).height(), e(this).removeAttr("height").removeAttr("width").css({
                            height: n,
                            width: n * r
                        }).parents("article").find("footer").width(n * r), e(this).parent().css({
                            height: n,
                            width: n * r
                        }))
            })
    }
}(jQuery), $(function () {
        function k() {
            $("#social-links").children().length === 0 && $("#social-links").parent().hide()
        }

        function L() {
            if (bok.o.tagList.length > 0) {
                var e = bok.o.tagList.split(","),
                    t = e.length,
                    n = 0;
                for (n = 0; n < t; n++) {
                    var r = $.trim(e[n]).replace(/ /gi, "-").toLowerCase();
                    $("#tags ul").append($('<li><a href="/tagged/' + encodeURIComponent(r) + '">' + e[n] + "</a></li>"))
                }
            }
        }

        function A() {
            $("#page-wrap").scrollTo("0px", "0px")
        }

        function O() {
            n.css("height", t), i.css("height", t), g.css("height", t), r.css("height", t), r.hasClass("index-view") && n.hasClass("index-page") && g.css("top", t);
            var e = (t - T) / 2;
            t > 500 && (l.css("top", e).fadeTo(200, 1), o.css("top", e), u.css("top", e - 40).fadeTo(200, 1), a.css("top", e - 30)), p.each(function () {
                    var e = $(this);
                    e.imagesLoaded(function () {
                            var t = e.outerHeight(),
                                n = e.find(".section-wrap"),
                                r = n.outerHeight(),
                                i = (t - r) / 2;
                            i > 0 && n.css("margin-top", i), e.fadeTo(200, 1)
                        })
                })
        }

        function M(e, n, r) {
            n.each(function () {
                    var t = $(this);
                    (t.hasClass("type-photo") || t.hasClass("type-photoset")) && t.imagesLoaded(function () {
                            var e = t.find("figure").eq(0).width();
                            t.find("footer:not(.processed)").css("width", e).show().addClass("processed");
                            if (t.hasClass("type-photo")) {
                                var n = $(this).find(".exif"),
                                    r = n.find("ul"),
                                    i = n.width() / 2,
                                    s = (n.height() - r.height()) / 2;
                                r.css("width", i).css("margin-top", s)
                            }
                        });
                    if (t.hasClass("type-video")) {
                        b ? z() : U();
                        if (e || r && t.find(".tumblr_video_container").length > 0) {
                            var n = t.attr("id").replace("post-", "");
                            $.ajax({
                                    url: "/api/read/json?id=" + n,
                                    dataType: "jsonp",
                                    timeout: 5e4,
                                    success: function (e) {
                                        t.find("figure").html(e.posts[0]["video-player-500"] + '<div class="corner-a"></div><div class="corner-b"></div><div class="corner-c"></div><div class="corner-d"></div>');
                                        var n = t.find("figure").html();
                                        t.find("figure").data("embed-code", n)
                                    },
                                    complete: function (e) {
                                        t.pxu_resize_video(undefined, 500);
                                        var n = t.find("figure").eq(0).width();
                                        t.find("footer:not(.processed)").css("width", n).show().addClass("processed")
                                    }
                                })
                        } else {
                            var i = t.find("figure").html();
                            t.find("figure").data("embed-code", i);
                            var s = t.find("figure").eq(0).width();
                            t.find("footer:not(.processed)").css("width", s).show().addClass("processed")
                        }
                    }
                    insertShareButtons(t)
                }), e && FB.XFBML.parse(), b && insertShareButtons($("#content"));
            var i = (t - T) / 2;
            s.css("margin-top", i).fadeTo(200, 1)
        }

        function _(e, t, n) {
            n = n !== undefined, e = e !== undefined, t = t === undefined ? $(".post") : t, O(), M(e, t, n), b && $("#content").each(function () {
                    var e = $(this).find(".exif"),
                        t = e.find("ul"),
                        n = e.width() / 2,
                        r = (e.height() - t.height()) / 2;
                    t.css("width", n).css("margin-top", r)
                })
        }

        function D() {
            $.address.init(function (e) {
                    e.value.indexOf("/post/") >= 0 && (window.location = e.value), $.address.value("/")
                }).change(function (e) {
                    var t;
                    return e.value == "/" && y ? H() : e.value.indexOf("/post/") >= 0 && !y ? (t = $.address.path().match(/[0-9]+/)[0], P(t), $(".exif .value li span").hover(function () {
                                p_width = $(this).width(), c_width = $(this).parent().width(), p_width > c_width && (p_width *= -1, $(this).stop().animate({
                                            left: p_width
                                        }, 6500, "linear"))
                            }, function () {
                                $(this).stop().animate({
                                        left: 0
                                    }, 500)
                            })) : e.value.indexOf("/post/") >= 0 && y && (t = $.address.path().match(/[0-9]+/)[0], P(t, !0), $("#posts").scrollTo($("#post-" + t), {
                                axis: "x"
                            }), $(".exif .value li span").hover(function () {
                                p_width = $(this).width(), c_width = $(this).parent().width(), p_width > c_width && (p_width *= -1, $(this).stop().animate({
                                            left: p_width
                                        }, 6500, "linear"))
                            }, function () {
                                $(this).stop().animate({
                                        left: 0
                                    }, 500)
                            })), !1
                }), $("#posts").on("click", ".type-photo figure a", function () {
                    return $.address.value($(this).find("img").attr("data-permalink").match(/\/post\/[0-9]+\/?(.+)?/i)[0]), !1
                }), $("#posts").on("click", ".type-photo figure img, .non-advanced img", function () {
                    return $.address.value($(this).attr("data-permalink").match(/\/post\/[0-9]+\/?(.+)?/i)[0]), !1
                }), $("#posts").on("click", "a.permalink", function () {
                    return $.address.value($(this).attr("href").match(/\/post\/[0-9]+\/?(.+)?/i)[0]), !1
                }), $(".index-page #permalink-pagination").on("click", "a.permalink.active", function () {
                    return $.address.value($(this).attr("href").match(/\/post\/[0-9]+\/?(.+)?/i)[0]), !1
                }), $(".index-page #permalink-pagination, .permalink-page #permalink-pagination li a:not(.active)").click(function () {
                    return !1
                }), $("#sidebar").on("click", "#home-tab", function () {
                    if (!b && y) return $.address.value("/"), !1;
                    window.location = "/"
                }), $("#permalink-pagination").on("click", ".post-close", function () {
                    if (!b) return $.address.value("/"), !1
                })
        }

        function P(n, s) {
            var o = $("#post-" + n);
            if (o.length > 0) {
                y = !0, r.removeClass("index-view").addClass("permalink-view").addClass("is-scrolling");
                var u = o.attr("data-postType"),
                    a = o.attr("data-reblog").split("/").pop(),
                    f = o.html(),
                    l = o.find("figure").html(),
                    h = o.find("figure"),
                    p = o.find("figcaption").html(),
                    d = $("#content"),
                    v = $("#permalink-pagination");
                s && d.children().remove(), $("#tumblr_controls").remove(), $('<iframe src="http://assets.tumblr.com/iframe.html?10&src=http%3A%2F%2F' + bok.o.tumblrAccount + ".tumblr.com%2Fpost%2F" + n + "&pid=" + n + "&rk=" + a + "&lang=en_US&name=" + bok.o.tumblrAccount + '" scrolling="no" width="330" height="25" frameborder="0" style="position:absolute; z-index:1337; top:0px; right:0px; border:0px; background-color:transparent; overflow:hidden;" id="tumblr_controls"></iframe>').appendTo("body"), d.append(f).addClass("permalink-" + u), d.find("footer").removeAttr("style");
                var m = d.find(".notes-container"),
                    b = m.data("notes-url");
                $.ajax({
                        url: b,
                        success: function (e) {
                            m.append(e)
                        }
                    }), u == "video" && (e.width() >= E ? $("#permalink").pxu_resize_video(S, undefined) : $("#permalink").pxu_resize_video(w, undefined)), (u == "photo" || u == "photoset") && $("#content .photo-wrap").each(function () {
                        $(this).imagesLoaded(function () {
                                var e = $(this).find(".exif"),
                                    t = e.find("ul"),
                                    n = e.width() / 2,
                                    r = (e.height() - t.height()) / 2;
                                t.css("width", n).css("margin-top", r)
                            })
                    }), W(o);
                var T = o.next(".post"),
                    N = o.next(".post").next(".post"),
                    C = o.prev(".post"),
                    k = $("#pag-next").attr("href"),
                    L = T.attr("data-permalink"),
                    A = N.attr("data-permalink"),
                    O = C.attr("data-permalink");
                $(".post-next, .post-prev").removeClass("active").attr("href", "/"), T.length > 0 && $(".post-next").addClass("active").attr("href", L), C.length > 0 && $(".post-prev").addClass("active").attr("href", O), T.length === 0 && (x || $(".post-next").addClass("active").attr("href", k)), s || ($("#jump-to-post, #loading-more-posts").animate({
                            top: "+=20",
                            opacity: 0
                        }, 300), i.animate({
                            top: "+=20",
                            opacity: 0
                        }, 300, function () {
                            c.show(), g.animate({
                                    top: "+=" + t * -1,
                                    opacity: 1
                                }, 700, function () {
                                    u == "video" && ($(".type-video figure").each(function () {
                                                $(this).children().remove(), $(this).html($(this).data("embed-code"))
                                            }), $(".type-video").pxu_resize_video(undefined, 500)), r.removeClass("is-scrolling")
                                })
                        }))
            } else $.address.value("/")
        }

        function H() {
            y = !1, r.addClass("is-scrolling");
            var e = $("#content"),
                n = $("#permalink-pagination");
            $("#tumblr_controls").remove(), $('<iframe src="http://assets.tumblr.com/iframe.html?10&src=http%3A%2F%2F' + bok.o.tumblrAccount + ".tumblr.com%2F&lang=en_US&name=" + bok.o.tumblrAccount + '" scrolling="no" width="330" height="25" frameborder="0" style="position:absolute; z-index:1337; top:0px; right:0px; border:0px; background-color:transparent; overflow:hidden;" id="tumblr_controls"></iframe>').appendTo("body"), g.animate({
                    top: "-=20"
                }, 200, function () {
                    $(this).animate({
                            top: "-=" + (t * -1 - 20),
                            opacity: 0
                        }, 400, function () {
                            m && c.hide(), $("#jump-to-post, #loading-more-posts").animate({
                                    top: "-=20",
                                    opacity: 1
                                }, 300), i.animate({
                                    top: "-=20",
                                    opacity: 1
                                }, 300, function () {
                                    e.children().remove(), r.removeClass("permalink-view").addClass("index-view").removeClass("is-scrolling")
                                })
                        })
                })
        }

        function B() {
            $(window).resize(function () {
                    t = $(this).height(), _(), e.width() >= E ? $("#permalink").pxu_resize_video(S, undefined) : $("#permalink").pxu_resize_video(w, undefined)
                })
        }

        function j() {
            $("#pagination").bind("inview", function (e, t, n, r) {
                    x || (t ? $("#jump-next").fadeOut(100) : $("#jump-next").fadeIn(100))
                }), $(".post").bind("inview", function (e, t, n, r) {
                    t ? (n == "both" && ($(this).addClass("inview-both"), $(this).removeClass("inview-left"), $(this).removeClass("inview-right")), n == "left" && ($(this).addClass("inview-left"), $(this).removeClass("inview-both"), $(this).removeClass("inview-right")), n == "right" && ($(this).addClass("inview-right"), $(this).removeClass("inview-left"), $(this).removeClass("inview-both"))) : ($(this).removeClass("inview-both"), $(this).removeClass("inview-right"), $(this).removeClass("inview-left"))
                });
            var e = function (e, t) {
                var n = $(".post.inview-both"),
                    i = $(".post.inview-left"),
                    s = $(".post.inview-right"),
                    o = n.length,
                    u = i.length,
                    a = s.length,
                    f;
                e == "next" ? (f = null, o > 0 && a > 0 ? f = n.eq(o - 1) : o === 0 && a > 0 ? f = s : o >= 0 && a === 0 && u > 0 ? f = i : o > 0 && a === 0 && u === 0 && (f = n.eq(-1))) : (f = u > 0 ? i : n.eq(o - 1), n.eq(o - 1).length === 0 && (f = s));
                var l = e == "next" ? f.next(".post") : f.prev(".post");
                if (l.next(".post").length === 0 && e == "next" && !x) {
                    r.addClass("is-scrolling"), $("#posts").scrollTo(1e8, 500, {
                            axis: "x",
                            onAfter: function () {
                                r.removeClass("is-scrolling")
                            }
                        });
                    return
                }
                l.length === 0 && e != "next" && $("#posts").scrollTo(0, 500, {
                        axis: "x"
                    });
                var c = l.width(),
                    h = l.offset().left,
                    p = $("#posts").scrollLeft(),
                    d = $(window).width(),
                    v = h + c,
                    m;
                return e == "next" ? m = v - d + p + t : m = p - (d - v - t), m < 0 && (m = 0), r.addClass("is-scrolling"), $("#posts").scrollTo(m, 500, {
                        axis: "x",
                        onAfter: function () {
                            r.removeClass("is-scrolling")
                        }
                    }), !1
            };
            $("#jump-next").click(function () {
                    e("next", 20)
                }), $("#jump-prev").click(function () {
                    e("prev", 20)
                }), $(document).keydown(function (t) {
                    if (!y) {
                        if (t.keyCode == 74 || t.keyCode == 37) return $("#jump-prev").addClass("active"), e("prev", 20), !1;
                        if (t.keyCode == 75 || t.keyCode == 39) return $("#jump-next").addClass("active"), e("next", 20), !1
                    }
                }), $("#searchField").keydown(function (e) {
                    e.stopPropagation(), e.keyCode == 13 && (value = encodeURI($(this).val()), window.location = "/tagged/" + value)
                }), $(document).keyup(function () {
                    $("#jump-next, #jump-prev").removeClass("active")
                })
        }

        function F() {
            N || i.mousewheel(function (e, t) {
                    this.scrollLeft -= t * 40, e.preventDefault()
                });
            var e = !0;
            setInterval(function () {
                    e = !0
                }, 100), setInterval(function () {
                    e && r.removeClass("is-scrolling")
                }, 200), i.scroll(function () {
                    r.addClass("is-scrolling"), e = !1
                })
        }

        function I() {
            $("#posts").infinitescroll({
                    navSelector: "#pagination",
                    nextSelector: "#pag-next",
                    itemSelector: "#posts .post",
                    behavior: "twitter",
                    errorCallback: function () {
                        $("#infscr-loading").remove(), a.hide()
                    }
                }, function (e) {
                    $("#infscr-loading").remove(), a.hide(), s = $(".post"), d = i.find("type-photosets"), i.removeClass("loading"), $(e).addClass("ajaxed"), _(!0, $(e));
                    var t = $(e).eq(0).attr("data-permalink");
                    $(".post-next").attr("href", t).addClass("active"), $(e).bind("inview", function (e, t, n, r) {
                            t ? (n == "both" && ($(this).addClass("inview-both"), $(this).removeClass("inview-left"), $(this).removeClass("inview-right")), n == "left" && ($(this).addClass("inview-left"), $(this).removeClass("inview-both"), $(this).removeClass("inview-right")), n == "right" && ($(this).addClass("inview-right"), $(this).removeClass("inview-left"), $(this).removeClass("inview-both"))) : ($(this).removeClass("inview-both"), $(this).removeClass("inview-right"), $(this).removeClass("inview-left"))
                        })
                });
            var t = 0;
            $("#posts").scroll(function () {
                    t = this.scrollWidth - 100;
                    var n = $(this).scrollLeft() + e.width();
                    n >= t && !i.hasClass("loading") && o.length > 0 && ($(this).addClass("loading"), a.show(), $("#posts").infinitescroll("retrieve"))
                }), s.length < 4 && (a.show(), $("#posts").infinitescroll("retrieve"))
        }

        function q() {
            $("#posts").on("click", ".type-photoset .photo-wrap", function () {
                    var e = $(this),
                        t = e.find("img"),
                        n = t.width(),
                        r = e.parent();
                    return r.find(".photo-wrap").not($(this)).animate({
                            width: bok.o.photoWrapWidth
                        }, 200).removeClass("open"), e.hasClass("open") ? e.animate({
                            width: bok.o.photoWrapWidth
                        }, 200, !1).removeClass("open") : e.animate({
                            width: n
                        }, 200, !1).addClass("open"), !1
                })
        }

        function R() {
            $(".exif .value li span").hover(function () {
                    p_width = $(this).width(), c_width = $(this).parent().width(), p_width > c_width && (p_width *= -1, $(this).stop().animate({
                                left: p_width
                            }, 6500, "linear"))
                }, function () {
                    $(this).stop().animate({
                            left: 0
                        }, 500)
                }), $(".photo-wrap").live("mouseenter", function () {
                    $(this).find(".icons").stop(!0, !0).animate({
                            opacity: 1
                        }, 200)
                }).live("mouseleave", function () {
                    $(this).find(".icons").stop(!0, !0).animate({
                            opacity: .3
                        }, 200)
                }), $("span.info").live("click", function (e) {
                    var t = $(this).parent().parent().find(".exif");
                    return t.hasClass("data-open") ? (t.stop(!0, !0).fadeOut("fast"), t.removeClass("data-open")) : (t.addClass("data-open"), t.stop(!0, !0).fadeIn("fast")), !1
                })
        }

        function U() {
            $(".type-video").pxu_resize_video(undefined, 500)
        }

        function z() {
            b && (e.width() >= E ? $("#permalink").pxu_resize_video(S, undefined) : $("#permalink").pxu_resize_video(w, undefined))
        }

        function W(e) {
            var t = e.attr("data-permalink"),
                n = '<div class="fb-comments" data-href="' + t + '" data-num-posts="10" data-width="500"></div>',
                r = '<h2 class="facebook-comment-count"><fb:comments-count href="' + t + '"></fb:comments-count> comments</h2>';
            $("#content .facebook-container").append(r + n), FB.XFBML.parse()
        }

        function X() {
            insertShareButtons = function (e) {
                var t = e.find(".meta .share:not(.loaded)"),
                    n = t.data("permalink"),
                    r = t.find(".twitter"),
                    i = t.find(".facebook");
                r.length > 0 && (r.replaceWith('<div class="social"><a href="http://twitter.com/share" class="twitter-share-button" data-url="' + n + '" data-text="" data-count="horizontal" data-via="' + bok.o.twitterID + '">Tweet</a></div>'), $.ajax({
                            url: "http://platform.twitter.com/widgets.js",
                            dataType: "script",
                            cache: !0
                        })), i.length > 0 && i.replaceWith('<div class="social"><div class="fb-like" data-href="' + n + '" data-send="false" data-layout="button_count" data-width="100" data-show-faces="false"></div></div>'), t.addClass("loaded")
            };
            var e = $(window).height();
            $(window).resize(function () {
                    e = $(window).height()
                }), e < 760 && $(".share-container").css({
                    top: -105
                }), $("#page-wrap").on("click", ".share", function () {
                    var t = $(this),
                        n = t.find(".share-container");
                    return t.hasClass("open") ? (t.removeClass("open"), e < 760 ? n.animate({
                                opacity: 0,
                                top: -105
                            }, 200, function () {
                                $(this).css("z-index", -1337)
                            }) : n.animate({
                                opacity: 0,
                                top: 5
                            }, 200, function () {
                                $(this).css("z-index", -1337)
                            })) : (e < 760 ? $(".share.open .share-container").animate({
                                opacity: 0,
                                top: -105
                            }, 200, function () {
                                $(this).css("z-index", -1337)
                            }) : $(".share.open .share-container").animate({
                                opacity: 0,
                                top: 5
                            }, 200, function () {
                                $(this).css("z-index", -1337)
                            }), $(".share.open").removeClass("open"), t.addClass("open"), e < 760 ? n.addClass("going-up").css("z-index", 1337).animate({
                                opacity: 1,
                                top: -85
                            }) : n.removeClass("going-up").css("z-index", 1337).animate({
                                opacity: 1,
                                top: 25
                            }, 200)), !1
                }), $(".share-container").click(function () {
                    return !1
                }), $(document).live("click", function (t) {
                    t.stopPropagation(), $(".share").each(function () {
                            var t = $(this),
                                n = t.find(".share-container");
                            t.hasClass("open") && (t.removeClass("open"), e < 760 ? n.animate({
                                        opacity: 0,
                                        top: -105
                                    }, 200, function () {
                                        $(this).css("z-index", -1337)
                                    }) : n.animate({
                                        opacity: 0,
                                        top: 5
                                    }, 200, function () {
                                        $(this).css("z-index", -1337)
                                    }))
                        })
                })
        }

        function V() {
            h.click(function () {
                    var e = $(this),
                        t = c.length > 0 ? e.index() - 1 : e.index(),
                        n = f.find("section.open");
                    e.hasClass("active") ? (e.removeClass("active"), f.animate({
                                left: -327
                            }, 200, function () {
                                p.css("left", -327)
                            }).removeClass("open"), i.animate({
                                paddingLeft: 42
                            }, 200)) : f.hasClass("open") ? (h.removeClass("active"), e.addClass("active"), p.css("z-index", 1), p.eq(t).css("z-index", 1e3).animate({
                                left: 0
                            }, 200, function () {
                                n.removeClass("open").css("left", -327), $(this).addClass("open")
                            })) : (i.animate({
                                paddingLeft: 370
                            }, 200), h.removeClass("active"), e.addClass("active"), p.eq(t).css("left", 0).addClass("open"), f.animate({
                                left: 0
                            }, 200).addClass("open"))
                })
        }

        function J() {
            var e = bok.o.twitterData,
                t = $("<ul>", {
                        id: "tweets"
                    });
            $.each(e, function (e) {
                    if (e < bok.o.twitterPostCount) {
                        var n = this.id_str,
                            r = linkifyTweet(this.text),
                            i = relativeTime(this.created_at),
                            s = "http://twitter.com/" + bok.o.twitterID + "/status/" + n,
                            o = $("<li>");
                        o.html('<p class="tweet">' + r + '</p><span class="tweet-meta"><a class="timestamp" href="' + s + '" time="' + this.created_at + '" target="_blank">' + i + "</a></span>"), o.appendTo(t)
                    }
                }), $("#twitter").removeClass("loading"), $("#tweet-area").html(t), O(), $("#twitter").find(".section-wrap").fadeTo(200, 1)
        }
        var e = $(window),
            t = $(window).height(),
            n = $("body"),
            r = $("#page-wrap"),
            i = $("#posts"),
            s = $(".post"),
            o = $("#pagination"),
            u = $("#jump-to-post"),
            a = $("#loading-more-posts"),
            f = $("#sidebar"),
            l = $("#sidebar-tabs"),
            c = $("#home-tab"),
            h = l.find("li").not("#home-tab"),
            p = f.find("section"),
            d = i.find("type-photosets"),
            v = n.hasClass("advanced-photosets"),
            m = n.hasClass("page-1"),
            g = $("#permalink"),
            y = !1,
            b = n.hasClass("permalink-page"),
            w = 840,
            E = 1440,
            S = 1280,
            x = n.hasClass("infinite-scroll"),
            T = 500,
            N = navigator.userAgent.match(/iPad/i) !== null,
            C = bok.o.twitterID.length > 0;
        (function () {
                A(), D(), X(), _(undefined, undefined, !0), B(), F(), j(), R(), V(), L(), k(), C && J(), b || (v && q(), x && I())
            })()
    });
