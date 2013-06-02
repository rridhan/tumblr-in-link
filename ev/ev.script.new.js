$(function () {
        var p = $(window),
            M = $(window).height(),
            I = $("body"),
            c = $("#page-wrap"),
            A = $("#posts"),
            D = $(".post"),
            T = $("#pagination"),
            g = $("#jump-to-post"),
            f = $("#loading-more-posts"),
            Q = $("#sidebar"),
            R = $("#sidebar-tabs"),
            b = $("#home-tab"),
            j = R.find("li").not("#home-tab"),
            P = Q.find("section"),
            q = A.find("type-photosets"),
            m = I.hasClass("advanced-photosets"),
            L = I.hasClass("page-1"),
            d = $("#permalink"),
            t = undefined,
            E = I.hasClass("permalink-page"),
            v = 840,
            F = 1440,
            e = 1280,
            W = I.hasClass("infinite-scroll"),
            U = 500,
            evA = $("#intestazione"),
            evAX = 100,
            evB = $("#principale"),
            evC = $("#basepagina"),
            H = navigator.userAgent.match(/iPad/i) != null,
            i = (bok.o.twitterID.length > 0);

        function C() {
            if ($("#social-links").children().length == 0) {
                $("#social-links").parent().hide()
            }
        }

        function y() {
            if (bok.o.tagList.length > 0) {
                var Z = bok.o.tagList.split(",");
                var X = Z.length;
                var Y = 0;
                for (Y = 0; Y < X; Y++) {
                    var aa = $.trim(Z[Y]).replace(/ /gi, "-").toLowerCase();
                    $("#tags ul").append($('<li><a href="/tagged/' + encodeURIComponent(aa) + '">' + Z[Y] + "</a></li>"))
                }
            }
        }

        function u() {
            $("#page-wrap").scrollTo("0px", "0px")
        }

        function w() {
            I.css("height", M);            
            var evX = (M - evAX) / 3; // Assegna 100px all'header, dividi il resto dello schermo in terzi.
            var evXX = (evX * 2); // Assegna due terzi all'area immagini
            A.css("height", evXX); 
        	A.css("top", evAX); 
            d.css("height", evXX);
            c.css("height", evXX);
            evA.css("height", evAX);
            evB.css("height", evXX); // Assegna due terzi all'area immagini
            evC.css("height", evX); // Assegna un terzo al piè di pagina.
            if (c.hasClass("index-view") && I.hasClass("index-page")) {
                d.css("top", M)
            }
            var X = (evXX - U) / 2;
            if (evXX > 500) {
                R.css("top", X).fadeTo(200, 1);
                T.css("top", X);
                g.css("top", (X - 40)).fadeTo(200, 1);
                f.css("top", (X - 30))
            }
            P.each(function () {
                    var Y = $(this);
                    Y.imagesLoaded(function () {
                            var aa = Y.outerHeight(),
                                ac = Y.find(".section-wrap"),
                                ab = ac.outerHeight(),
                                Z = (aa - ab) / 3;
                            if (Z > 0) {
                                ac.css("margin-top", Z)
                            }
                            Y.fadeTo(200, 1)
                        })
                })
        }

        function N(X, Y, aa) {
            Y.each(function () {
                    var ad = $(this);
                    if (ad.hasClass("type-photo") || ad.hasClass("type-photoset")) {
                        ad.imagesLoaded(function () {
                                var ai = ad.find("figure").eq(0).width();
                                ad.find("footer:not(.processed)").css("width", ai).show().addClass("processed");
                                if (ad.hasClass("type-photo")) {
                                    var aj = $(this).find(".exif");
                                    var af = aj.find("ul");
                                    var ah = (aj.width() / 2);
                                    var ag = ((aj.height() - af.height()) / 3);
                                    af.css("width", ah).css("margin-top", ag)
                                }
                            })
                    }
                    if (ad.hasClass("type-video")) {
                        if (X || (aa && ad.find(".tumblr_video_container").length > 0)) {
                            var ae = ad.attr("id").replace("post-", "");
                            $.ajax({
                                    url: "/api/read/json?id=" + ae,
                                    dataType: "jsonp",
                                    timeout: 50000,
                                    success: function (ag) {
                                        ad.find("figure").html(ag.posts[0]["video-player-500"] + '<div class="corner-a"></div><div class="corner-b"></div><div class="corner-c"></div><div class="corner-d"></div>');
                                        var af = ad.find("figure").html();
                                        ad.find("figure").data("embed-code", af)
                                    },
                                    complete: function (ag) {
                                        ad.pxu_resize_video(undefined, 500);
                                        var af = ad.find("figure").eq(0).width();
                                        ad.find("footer:not(.processed)").css("width", af).show().addClass("processed")
                                    }
                                })
                        } else {
                            var ab = ad.find("figure").html();
                            ad.find("figure").data("embed-code", ab);
                            var ac = ad.find("figure").eq(0).width();
                            ad.find("footer:not(.processed)").css("width", ac).show().addClass("processed")
                        }
                    }
                    insertShareButtons(ad)
                });
            if (X) {
                FB.XFBML.parse()
            }
            if (E) {
                insertShareButtons($("#content"))
            }
            var Z = (M - U) / 2;
            D.css("margin-top", Z).fadeTo(200, 1)
        }

        function l(X, Y, Z) {
            Z = (Z == undefined) ? false : true;
            X = (X == undefined) ? false : true;
            Y = (Y == undefined) ? $(".post") : Y;
            w();
            N(X, Y, Z);
            if (E) {
                $("#content").each(function () {
                        var ad = $(this).find(".exif");
                        var aa = ad.find("ul");
                        var ac = (ad.width() / 2);
                        var ab = ((ad.height() - aa.height()) / 3);
                        aa.css("width", ac).css("margin-top", ab)
                    })
            }
        }

        function J() {
            $.address.init(function (X) {
                    if (X.value.indexOf("/post/") >= 0) {
                        window.location = X.value
                    }
                    $.address.value("/")
                }).change(function (Y) {
                    if (Y.value == "/" && t) {
                        O()
                    } else {
                        if (Y.value.indexOf("/post/") >= 0 && !t) {
                            var X = $.address.path().match(/[0-9]+/)[0];
                            h(X);
                            $(".exif .value li span").hover(function () {
                                    p_width = $(this).width();
                                    c_width = $(this).parent().width();
                                    if (p_width > c_width) {
                                        p_width = p_width * -1;
                                        $(this).stop().animate({
                                                left: p_width
                                            }, 6500, "linear")
                                    }
                                }, function () {
                                    $(this).stop().animate({
                                            left: 0
                                        }, 500)
                                })
                        } else {
                            if (Y.value.indexOf("/post/") >= 0 && t) {
                                var X = $.address.path().match(/[0-9]+/)[0];
                                h(X, true);
                                $("#posts").scrollTo($("#post-" + X), {
                                        axis: "x"
                                    });
                                $(".exif .value li span").hover(function () {
                                        p_width = $(this).width();
                                        c_width = $(this).parent().width();
                                        if (p_width > c_width) {
                                            p_width = p_width * -1;
                                            $(this).stop().animate({
                                                    left: p_width
                                                }, 6500, "linear")
                                        }
                                    }, function () {
                                        $(this).stop().animate({
                                                left: 0
                                            }, 500)
                                    })
                            }
                        }
                    }
                    return false
                });
            $("#posts").on("click", ".type-photo figure a", function () {
                    $.address.value($(this).find("img").attr("data-permalink").match(/\/post\/[0-9]+\/?(.+)?/i)[0]);
                    return false
                });
            $("#posts").on("click", ".type-photo figure img, .non-advanced img", function () {
                    $.address.value($(this).attr("data-permalink").match(/\/post\/[0-9]+\/?(.+)?/i)[0]);
                    return false
                });
            $("#posts").on("click", "a.permalink", function () {
                    $.address.value($(this).attr("href").match(/\/post\/[0-9]+\/?(.+)?/i)[0]);
                    return false
                });
            $(".index-page #permalink-pagination").on("click", "a.permalink.active", function () {
                    $.address.value($(this).attr("href").match(/\/post\/[0-9]+\/?(.+)?/i)[0]);
                    return false
                });
            $(".index-page #permalink-pagination, .permalink-page #permalink-pagination li a:not(.active)").click(function () {
                    return false
                });
            $("#sidebar").on("click", "#home-tab", function () {
                    if (!E && t) {
                        $.address.value("/");
                        return false
                    } else {
                        window.location = "/"
                    }
                });
            $("#permalink-pagination").on("click", ".post-close", function () {
                    if (!E) {
                        $.address.value("/");
                        return false
                    }
                })
        }

        function h(ap, ad) {
            var am = $("#post-" + ap);
            if (am.length > 0) {
                t = true;
                c.removeClass("index-view").addClass("permalink-view").addClass("is-scrolling");
                var ae = am.attr("data-postType"),
                    Z = am.attr("data-reblog").split("/").pop(),
                    ag = am.html(),
                    ac = am.find("figure").html(),
                    ab = am.find("figure"),
                    an = am.find("figcaption").html(),
                    ah = $("#content"),
                    ak = $("#permalink-pagination");
                if (ad) {
                    ah.children().remove()
                }
                $("#tumblr_controls").remove();
                $('<iframe src="http://assets.tumblr.com/iframe.html?10&src=http%3A%2F%2F' + bok.o.tumblrAccount + ".tumblr.com%2Fpost%2F" + ap + "&pid=" + ap + "&rk=" + Z + "&lang=en_US&name=" + bok.o.tumblrAccount + '" scrolling="no" width="330" height="25" frameborder="0" style="position:absolute; z-index:1337; top:0px; right:0px; border:0px; background-color:transparent; overflow:hidden;" id="tumblr_controls"></iframe>').appendTo("body");
                ah.append(ag).addClass("permalink-" + ae);
                ah.find("footer").removeAttr("style");
                var aj = ah.find(".notes-container");
                var aa = aj.data("notes-url");
                $.ajax({
                        url: aa,
                        success: function (ar) {
                            aj.append(ar)
                        }
                    });
                if (ae == "video") {
                    if (p.width() >= F) {
                        $("#permalink").pxu_resize_video(e, undefined)
                    } else {
                        $("#permalink").pxu_resize_video(v, undefined)
                    }
                }
                if (ae == "photo" || ae == "photoset") {
                    $("#content .photo-wrap").each(function () {
                            $(this).imagesLoaded(function () {
                                    var av = $(this).find(".exif");
                                    var ar = av.find("ul");
                                    var au = (av.width() / 2);
                                    var at = ((av.height() - ar.height()) / 3);
                                    ar.css("width", au).css("margin-top", at)
                                })
                        })
                }
                k(am);
                var X = am.next(".post");
                var ai = am.next(".post").next(".post");
                var al = am.prev(".post");
                var af = $("#pag-next").attr("href");
                var Y = X.attr("data-permalink");
                var ao = ai.attr("data-permalink");
                var aq = al.attr("data-permalink");
                $(".post-next, .post-prev").removeClass("active").attr("href", "/");
                if (X.length > 0) {
                    $(".post-next").addClass("active").attr("href", Y)
                }
                if (al.length > 0) {
                    $(".post-prev").addClass("active").attr("href", aq)
                }
                if (X.length == 0) {
                    if (W) {
                        f.show();
                        $("#posts").infinitescroll("retrieve")
                    } else {
                        $(".post-next").addClass("active").attr("href", af)
                    }
                }
                if (!ad) {
                    $("#jump-to-post, #loading-more-posts").animate({
                            top: "+=20",
                            opacity: 0
                        }, 300);
                    A.animate({
                            top: "+=20",
                            opacity: 0
                        }, 300, function () {
                            b.show();
                            d.animate({
                                    top: ("+=" + (M * -1)),
                                    opacity: 1
                                }, 700, function () {
                                    if (ae == "video") {
                                        $(".type-video figure").each(function () {
                                                $(this).children().remove();
                                                $(this).html($(this).data("embed-code"))
                                            });
                                        $(".type-video").pxu_resize_video(undefined, 500)
                                    }
                                    c.removeClass("is-scrolling")
                                })
                        })
                }
            } else {
                $.address.value("/")
            }
        }

        function O() {
            t = false;
            c.addClass("is-scrolling");
            var X = $("#content");
            var Y = $("#permalink-pagination");
            $("#tumblr_controls").remove();
            $('<iframe src="http://assets.tumblr.com/iframe.html?10&src=http%3A%2F%2F' + bok.o.tumblrAccount + ".tumblr.com%2F&lang=en_US&name=" + bok.o.tumblrAccount + '" scrolling="no" width="330" height="25" frameborder="0" style="position:absolute; z-index:1337; top:0px; right:0px; border:0px; background-color:transparent; overflow:hidden;" id="tumblr_controls"></iframe>').appendTo("body");
            d.animate({
                    top: "-=20"
                }, 200, function () {
                    $(this).animate({
                            top: ("-=" + ((M * -1) - 20)),
                            opacity: 0,
                        }, 400, function () {
                            if (L) {
                                b.hide()
                            }
                            $("#jump-to-post, #loading-more-posts").animate({
                                    top: "-=20",
                                    opacity: 1
                                }, 300);
                            A.animate({
                                    top: "-=20",
                                    opacity: 1
                                }, 300, function () {
                                    X.children().remove();
                                    c.removeClass("permalink-view").addClass("index-view").removeClass("is-scrolling")
                                })
                        })
                })
        }

        function B() {
            $(window).resize(function () {
                    M = $(this).height();
                    l();
                    if (p.width() >= F) {
                        $("#permalink").pxu_resize_video(e, undefined)
                    } else {
                        $("#permalink").pxu_resize_video(v, undefined)
                    }
                })
        }

        function x() {
            $("#pagination").bind("inview", function (aa, Z, Y, ab) {
                    if (!W) {
                        if (Z) {
                            $("#jump-next").fadeOut(100)
                        } else {
                            $("#jump-next").fadeIn(100)
                        }
                    }
                });
            $(".post").bind("inview", function (aa, Z, Y, ab) {
                    if (Z) {
                        if (Y == "both") {
                            $(this).addClass("inview-both");
                            $(this).removeClass("inview-left");
                            $(this).removeClass("inview-right")
                        }
                        if (Y == "left") {
                            $(this).addClass("inview-left");
                            $(this).removeClass("inview-both");
                            $(this).removeClass("inview-right")
                        }
                        if (Y == "right") {
                            $(this).addClass("inview-right");
                            $(this).removeClass("inview-left");
                            $(this).removeClass("inview-both")
                        }
                    } else {
                        $(this).removeClass("inview-both");
                        $(this).removeClass("inview-right");
                        $(this).removeClass("inview-left")
                    }
                });
            var X = function (ab, af) {
                var an = $(".post.inview-both");
                var aj = $(".post.inview-left");
                var ae = $(".post.inview-right");
                var Y = an.length;
                var ak = aj.length;
                var ai = ae.length;
                if (ab == "next") {
                    var ad = null;
                    if (Y > 0 && ai > 0) {
                        ad = an.eq(Y - 1)
                    } else {
                        if (Y == 0 && ai > 0) {
                            ad = ae
                        } else {
                            if (Y >= 0 && ai == 0 && ak > 0) {
                                ad = aj.prev()
                            } else {
                                if (Y > 0 && ai == 0 && ak == 0) {
                                    ad = an.eq(-1)
                                }
                            }
                        }
                    }
                } else {
                    var ad = (ak > 0) ? aj : an.eq(Y - 1);
                    if (an.eq(Y - 1).length == 0) {
                        ad = ae
                    }
                }
                var aa = (ab == "next") ? ad.next(".post") : ad.prev(".post");
                if (aa.next(".post").length == 0 && ab == "next" && !W) {
                    c.addClass("is-scrolling");
                    $("#posts").scrollTo(100000000, 500, {
                            axis: "x",
                            onAfter: function () {
                                c.removeClass("is-scrolling")
                            }
                        });
                    return
                }
                if (aa.length == 0 && ab != "next") {
                    $("#posts").scrollTo(0, 500, {
                            axis: "x"
                        })
                }
                var ah = aa.width();
                var ag = aa.offset().left;
                var am = $("#posts").scrollLeft();
                var Z = $(window).width();
                var al = (ag + ah);
                if (ab == "next") {
                    var ac = (al - Z) + am + af
                } else {
                    var ac = am - (Z - al - af)
                } if (ac < 0) {
                    ac = 0
                }
                c.addClass("is-scrolling");
                $("#posts").scrollTo(ac, 500, {
                        axis: "x",
                        onAfter: function () {
                            c.removeClass("is-scrolling")
                        }
                    });
                return false
            };
            $("#jump-next").click(function () {
                    X("next", 20)
                });
            $("#jump-prev").click(function () {
                    X("prev", 20)
                });
            $(document).keydown(function (Y) {
                    if (!t) {
                        if (Y.keyCode == 74 || Y.keyCode == 37) {
                            $("#jump-prev").addClass("active");
                            X("prev", 20);
                            return false
                        }
                        if (Y.keyCode == 75 || Y.keyCode == 39) {
                            $("#jump-next").addClass("active");
                            X("next", 20);
                            return false
                        }
                    }
                });
            $("#searchForm").keydown(function (Y) {
                    Y.stopPropagation()
                });
            $(document).keyup(function () {
                    $("#jump-next, #jump-prev").removeClass("active")
                })
        }

        function o() {
            if (!H) {
                A.mousewheel(function (Y, Z) {
                        this.scrollLeft -= (Z * 40);
                        Y.preventDefault()
                    })
            }
            var X = true;
            setInterval(function () {
                    X = true
                }, 100);
            setInterval(function () {
                    if (X) {
                        c.removeClass("is-scrolling")
                    }
                }, 200);
            A.scroll(function () {
                    c.addClass("is-scrolling");
                    X = false
                })
        }

        function S() {
            $("#posts").infinitescroll({
                    navSelector: "#pagination",
                    nextSelector: "#pag-next",
                    itemSelector: "#posts .post",
                    behavior: "twitter",
                    errorCallback: function () {
                        $("#infscr-loading").remove();
                        f.hide()
                    }
                }, function (Z) {
                    $("#infscr-loading").remove();
                    f.hide();
                    D = $(".post");
                    q = A.find("type-photosets");
                    A.removeClass("loading");
                    $(Z).addClass("ajaxed");
                    l(true, $(Z));
                    var Y = $(Z).eq(0).attr("data-permalink");
                    $(".post-next").attr("href", Y).addClass("active");
                    $(Z).bind("inview", function (ac, ab, aa, ad) {
                            if (ab) {
                                if (aa == "both") {
                                    $(this).addClass("inview-both");
                                    $(this).removeClass("inview-left");
                                    $(this).removeClass("inview-right")
                                }
                                if (aa == "left") {
                                    $(this).addClass("inview-left");
                                    $(this).removeClass("inview-both");
                                    $(this).removeClass("inview-right")
                                }
                                if (aa == "right") {
                                    $(this).addClass("inview-right");
                                    $(this).removeClass("inview-left");
                                    $(this).removeClass("inview-both")
                                }
                            } else {
                                $(this).removeClass("inview-both");
                                $(this).removeClass("inview-right");
                                $(this).removeClass("inview-left")
                            }
                        })
                });
            var X = 0;
            $("#posts").scroll(function () {
                    X = this.scrollWidth - 100;
                    var Y = ($(this).scrollLeft() + p.width());
                    if (Y >= X && !(A.hasClass("loading")) && T.length > 0) {
                        $(this).addClass("loading");
                        f.show();
                        $("#posts").infinitescroll("retrieve")
                    }
                });
            if (D.length < 4) {
                f.show();
                $("#posts").infinitescroll("retrieve")
            }
        }

        function V() {
            $("#posts").on("click", ".type-photoset .photo-wrap", function () {
                    var Y = $(this),
                        X = Y.find("img"),
                        aa = X.width(),
                        Z = Y.parent();
                    Z.find(".photo-wrap").not($(this)).animate({
                            width: bok.o.photoWrapWidth
                        }, 200).removeClass("open");
                    if (Y.hasClass("open")) {
                        Y.animate({
                                width: bok.o.photoWrapWidth
                            }, 200, false).removeClass("open")
                    } else {
                        Y.animate({
                                width: aa
                            }, 200, false).addClass("open")
                    }
                    return false
                })
        }

        function z() {
            $(".exif .value li span").hover(function () {
                    p_width = $(this).width();
                    c_width = $(this).parent().width();
                    if (p_width > c_width) {
                        p_width = p_width * -1;
                        $(this).stop().animate({
                                left: p_width
                            }, 6500, "linear")
                    }
                }, function () {
                    $(this).stop().animate({
                            left: 0
                        }, 500)
                });
            $(".photo-wrap").live("mouseenter", function () {
                    $(this).find(".icons").stop(true, true).animate({
                            opacity: 1
                        }, 200)
                }).live("mouseleave", function () {
                    $(this).find(".icons").stop(true, true).animate({
                            opacity: 0.3
                        }, 200)
                });
            $("span.info").live("click", function (X) {
                    var Y = $(this).parent().parent().find(".exif");
                    if (Y.hasClass("data-open")) {
                        Y.stop(true, true).fadeOut("fast");
                        Y.removeClass("data-open")
                    } else {
                        Y.addClass("data-open");
                        Y.stop(true, true).fadeIn("fast")
                    }
                    return false
                })
        }

        function s() {
            $(".type-video").pxu_resize_video(undefined, 500)
        }

        function n() {
            if (E) {
                if (p.width() >= F) {
                    $("#permalink").pxu_resize_video(e, undefined)
                } else {
                    $("#permalink").pxu_resize_video(v, undefined)
                }
            }
        }

        function k(X) {
            var Z = X.attr("data-permalink");
            var Y = '<div class="fb-comments" data-href="' + Z + '" data-num-posts="10" data-width="500"></div>';
            var aa = '<h2 class="facebook-comment-count"><fb:comments-count href="' + Z + '"></fb:comments-count> comments</h2>';
            $("#content .facebook-container").append(aa + Y);
            FB.XFBML.parse()
        }

        function a() {
            insertShareButtons = function (aa) {
                var ab = aa.find(".meta .share:not(.loaded)");
                var ac = ab.data("permalink");
                var Z = ab.find(".twitter");
                var Y = ab.find(".facebook");
                if (Z.length > 0) {
                    Z.replaceWith('<div class="social"><a href="http://twitter.com/share" class="twitter-share-button" data-url="' + ac + '" data-text="" data-count="horizontal" data-via="' + bok.o.twitterID + '">Tweet</a></div>');
                    $.ajax({
                            url: "http://platform.twitter.com/widgets.js",
                            dataType: "script",
                            cache: true
                        })
                }
                if (Y.length > 0) {
                    Y.replaceWith('<div class="social"><div class="fb-like" data-href="' + ac + '" data-send="false" data-layout="button_count" data-width="100" data-show-faces="false"></div></div>')
                }
                ab.addClass("loaded")
            };
            var X = $(window).height();
            $(window).resize(function () {
                    X = $(window).height()
                });
            if (X < 760) {
                $(".share-container").css({
                        top: -105
                    })
            }
            $("#page-wrap").on("click", ".share", function () {
                    var Z = $(this),
                        Y = Z.find(".share-container");
                    if (Z.hasClass("open")) {
                        Z.removeClass("open");
                        if (X < 760) {
                            Y.animate({
                                    opacity: 0,
                                    top: -105
                                }, 200, function () {
                                    $(this).css("z-index", -1337)
                                })
                        } else {
                            Y.animate({
                                    opacity: 0,
                                    top: 5
                                }, 200, function () {
                                    $(this).css("z-index", -1337)
                                })
                        }
                    } else {
                        if (X < 760) {
                            $(".share.open .share-container").animate({
                                    opacity: 0,
                                    top: -105
                                }, 200, function () {
                                    $(this).css("z-index", -1337)
                                })
                        } else {
                            $(".share.open .share-container").animate({
                                    opacity: 0,
                                    top: 5
                                }, 200, function () {
                                    $(this).css("z-index", -1337)
                                })
                        }
                        $(".share.open").removeClass("open");
                        Z.addClass("open");
                        if (X < 760) {
                            Y.addClass("going-up").css("z-index", 1337).animate({
                                    opacity: 1,
                                    top: -85
                                })
                        } else {
                            Y.removeClass("going-up").css("z-index", 1337).animate({
                                    opacity: 1,
                                    top: 25
                                }, 200)
                        }
                    }
                    return false
                });
            $(".share-container").click(function () {
                    return false
                });
            $(document).live("click", function (Y) {
                    Y.stopPropagation();
                    $(".share").each(function () {
                            var aa = $(this),
                                Z = aa.find(".share-container");
                            if (aa.hasClass("open")) {
                                aa.removeClass("open");
                                if (X < 760) {
                                    Z.animate({
                                            opacity: 0,
                                            top: -105
                                        }, 200, function () {
                                            $(this).css("z-index", -1337)
                                        })
                                } else {
                                    Z.animate({
                                            opacity: 0,
                                            top: 5
                                        }, 200, function () {
                                            $(this).css("z-index", -1337)
                                        })
                                }
                            }
                        })
                })
        }

        function G() {
            j.click(function () {
                    var Z = $(this);
                    var X = (b.length > 0) ? (Z.index() - 1) : Z.index();
                    var Y = Q.find("section.open");
                    if (Z.hasClass("active")) {
                        Z.removeClass("active");
                        Q.animate({
                                left: -327
                            }, 200, function () {
                                P.css("left", -327)
                            }).removeClass("open");
                        A.animate({
                                paddingLeft: 42
                            }, 200)
                    } else {
                        if (Q.hasClass("open")) {
                            j.removeClass("active");
                            Z.addClass("active");
                            P.css("z-index", 1);
                            P.eq(X).css("z-index", 1000).animate({
                                    left: 0
                                }, 200, function () {
                                    Y.removeClass("open").css("left", -327);
                                    $(this).addClass("open")
                                })
                        } else {
                            A.animate({
                                    paddingLeft: 370
                                }, 200);
                            j.removeClass("active");
                            Z.addClass("active");
                            P.eq(X).css("left", 0).addClass("open");
                            Q.animate({
                                    left: 0
                                }, 200).addClass("open")
                        }
                    }
                })
        }

        function r() {
            function X() {
                $.getJSON("https://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + bok.o.twitterID + "&count=4&callback=?&include_rts=true", function (Y) {
                        var Z = Y;
                        var aa = $("<ul>", {
                                id: "tweets"
                            });
                        $.each(Z, function () {
                                var ad = this.id_str;
                                var ac = linkifyTweet(this.text);
                                var af = relativeTime(this.created_at);
                                var ae = "http://twitter.com/" + bok.o.twitterID + "/status/" + ad;
                                var ab = $("<li>");
                                ab.html('<p class="tweet">' + ac + '</p><span class="tweet-meta"><a class="timestamp" href="' + ae + '" time="' + this.created_at + '" target="_blank">' + af + "</a></span>");
                                ab.appendTo(aa)
                            });
                        $("#twitter").removeClass("loading");
                        $("#tweet-area").html(aa);
                        w();
                        $("#twitter").find(".section-wrap").fadeTo(200, 1)
                    })
            }
            $("#twitter-tab").click(function () {
                    var Y = $(this);
                    if (!Y.hasClass("twitter-loaded")) {
                        X();
                        Y.addClass("twitter-loaded")
                    }
                })
        }(function K() {
                u();
                J();
                a();
                l(undefined, undefined, true);
                B();
                o();
                x();
                z();
                G();
                y();
                C();
                if (i) {
                    r()
                }
                if (!E) {
                    if (m) {
                        V()
                    }
                    s();
                    if (W) {
                        S()
                    }
                }
                if (E) {
                    n()
                }
            })()
    });