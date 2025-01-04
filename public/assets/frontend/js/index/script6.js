var $jscomp = {
    scope: {}

    ,
    findInternal: function (a, c, b) {
        a instanceof String && (a = String(a));

        for (var e = a.length, d = 0; d < e; d++) {
            var g = a[d];

            if (c.call(b, g, d, a)) return {
                i: d,
                v: g
            }
        }

        return {
            i: -1,
            v: void 0
        }
    }
}

    ;

$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, c, b) {
    if (b.get || b.set) throw new TypeError("ES3 does not support getters and setters.");
    a != Array.prototype && a != Object.prototype && (a[c] = b.value)
}

    ;

$jscomp.getGlobal = function (a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
}

    ;
$jscomp.global = $jscomp.getGlobal(this);

$jscomp.polyfill = function (a, c, b, e) {
    if (c) {
        b = $jscomp.global;
        a = a.split(".");

        for (e = 0; e < a.length - 1; e++) {
            var d = a[e];

            d in b || (b[d] = {});
            b = b[d]
        }

        a = a[a.length - 1];
        e = b[a];
        c = c(e);

        c != e && null != c && $jscomp.defineProperty(b, a, {
            configurable: !0,
            writable: !0,
            value: c
        })
    }
}

    ;

$jscomp.polyfill("Array.prototype.find", function (a) {
    return a ? a : function (a, b) {
        return $jscomp.findInternal(this, a, b).v
    }
}

    , "es6-impl", "es3");

function getURLVar(a) {
    var c = [],
        b = String(document.location).split("?");

    if (b[1]) {
        b = b[1].split("&");

        for (i = 0; i < b.length; i++) {
            var e = b[i].split("=");
            e[0] && e[1] && (c[e[0]] = e[1])
        }

        return c[a] ? c[a] : ""
    }
}

$(document).ready(function () {
    $(document).on(" mouseenter", "[data-bs-toggle='tooltip']", function () {
        tooltip = bootstrap.Tooltip.getOrCreateInstance(this);
        tooltip.show()

    });
    $(document).on("click", "button", function () {
        $(".tooltip").remove()

    });
    var a = function () {
        $(this).daterangepicker({
            singleDatePicker: !0,
            autoApply: !0,
            autoUpdateInput: !1,
            locale: {
                format: "DD-MM-YYYY"
            }
        }

            ,
            function (a, b) {
                $(this.element).val(a.format("DD-MM-YYYY"))
            })
    }

        ,
        a = function () {
            $(this).daterangepicker({
                singleDatePicker: !0,
                datePicker: !1,
                autoApply: !0,
                autoUpdateInput: !1,
                timePicker: !0,
                timePicker24Hour: !0,
                locale: {
                    format: "HH:mm"
                }
            }

                ,
                function (a, b) {
                    $(this.element).val(a.format("HH:mm"))

                }).on("show.daterangepicker", function (a, b) {
                    b.container.find(".calendar-table").hide()
                })
        }

        ;
    $(document).on("focus", ".time", a);
    a = function () {
        $(".datetime").daterangepicker({
            singleDatePicker: !0,
            autoApply: !0,
            autoUpdateInput: !1,
            timePicker: !0,
            timePicker24Hour: !0,
            locale: {
                format: "DD-MM-YYYY HH:mm"
            }
        }

            ,
            function (a, b) {
                $(this.element).val(a.format("DD-MM-YYYY HH:mm"))
            })
    }

        ;
    $(document).on("focus", ".datetime", a);
    $(document).on("click", "button", function () {
        window.setTimeout(function () { }

            , 7E3)
    })
});

$(document).ready(function () {
    $("#form-currency .dropdown-item").on("click", function (a) {
        a.preventDefault();
        $("#form-currency input[name='code' ]").val($(this).attr("href"));
        $("#form-currency").submit()

    });
    // $("#search input[name='search' ]").parent().find("button").on("click", function () {
    //     var a = ($("base").attr("href") ? $("base").attr("href") : "/") + "index.php?route=product/search&language=" + $(this).attr("data-lang"),
    //         c = $("header #search input[name='search' ]").val();
    //     c && (a += "&search=" + encodeURIComponent(c));
    //     location = a

    // });
    // $("#search input[name='search' ]").on("keydown", function (a) {
    //     13 == a.keyCode && $("header #search input[name='search' ]").parent().find("button").trigger("click")

    // });
    $("#menu .dropdown-menu").each(function () {
        var a = $("#menu").offset(),
            a = $(this).parent().offset().left + $(this).outerWidth() - (a.left + $("#menu").outerWidth());
        0 < a && $(this).css("margin-left", "-" + (a + 10) + "px")

    });
    $("#button-list").on("click", function () {
        $("#product-list").attr("class", "row row-cols-1 product-list");
        $("#button-grid").removeClass("active");
        $("#button-list").addClass("active");
        localStorage.setItem("display", "list")

    });
    $("#button-grid").on("click", function () {
        $("#product-list").attr("class", "row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-4");
        $("#button-list").removeClass("active");
        $("#button-grid").addClass("active");
        localStorage.setItem("display", "grid")

    });
    "list" == localStorage.getItem("display") ? ($("#product-list").attr("class", "row row-cols-1 product-list"), $("#button-list").addClass("active")) : ($("#product-list").attr("class", "row row-cols-2 row-cols-sm-2 row-cols-md-2 row-cols-lg-4"), $("#button-grid").addClass("active"));
    $("body").on("click", ".modal-link", function (a) {
        a.preventDefault();
        $("#modal-information").remove();
        $.ajax({
            url: $(this).attr("href"),
            dataType: "html",
            success: function (a) {
                $("body").append(a);
                $("#modal-information").modal("show")
            }
        })

    });
    $("#cookie button").on("click", function () {
        var a = this;
        $.ajax({
            url: $(this).val(),
            type: "get",
            dataType: "json",
            beforeSend: function () {
                $(a).button("loading")
            }

            ,
            complete: function () {
                $(a).prop("disabled", !1).removeClass("loading")
            }

            ,
            success: function (a) {
                a.success && $("#cookie").fadeOut(400, function () {
                    $("#cookie").remove()
                })
            }

            ,
            error: function (a, b, e) {
                console.log(e + "\r\n" + a.statusText + "\r\n" + a.responseText)
            }
        })
    })
});

$(document).on("submit", "form[data-oc-toggle='ajax']", function (a) {
    a.preventDefault();
    var c = a.target,
        b = $(c).attr("action"),
        e = void 0 !== a.originalEvent && void 0 !== a.originalEvent.submitter ? a.originalEvent.submitter : "",
        d = $(e).attr("formaction");
    void 0 !== d && (b = d);
    var g = $(c).attr("method");
    void 0 === g && (g = "post");
    var h = $(this).attr("enctype");
    void 0 === h && (h = "application/x-www-form-urlencoded");
    if ("undefined" != typeof CKEDITOR)
        for (instance in CKEDITOR.instances) CKEDITOR.instances[instance].updateElement();
    console.log(a);
    console.log("element " + this);
    console.log(" action " + b);
    console.log(" button " + e);
    console.log(" formaction " + d);
    console.log(" method " + g);
    console.log(" enctype " + h);

    $.ajax({

        url: b,
        type: g,
        data: $(c).serialize(),
        dataType: " json",
        cache: !1,
        contentType: h,
        processData: !1,
        beforeSend: function () {
            $(e).prop("disabled", !0).addClass("loading")
        }

        ,
        complete: function () {
            $(e).prop("disabled", !1).removeClass("loading")
        }

        ,
        success: function (a) {
            $(".alert-dismissible").remove();
            $(c).find(".is-invalid").removeClass("is-invalid");
            $(c).find(".invalid-feedback").removeClass("d-block");
            console.log(a);
            a.redirect && (location = a.redirect.replaceAll("&amp;", "&"));
            "string" == typeof a.error && $("#alert").prepend('<div class="alert alert-danger alert-dismissible"><i class="fa-solid fa-circle-exclamation"></i> ' + a.error + ' <button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>');
            if ("object" == typeof a.error)
                for (key in a.error.warning && $("#alert").prepend('<div class="alert alert-danger alert-dismissible"><i class="fa-solid fa-circle-exclamation"></i> ' + a.error.warning + ' <button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>'), a.error) $("#input-" + key.replaceAll("_", "-")).addClass("is-invalid").find(".form-control, .form-select, .form-check-input, .form-check-label").addClass("is-invalid"), $("#error-" + key.replaceAll("_", "-")).html(a.error[key]).addClass("d-block");

            if (a.success) {
                $("#alert").prepend('<div class="alert alert-success alert-dismissible"><i class="fa-solid fa-circle-exclamation"></i> ' + a.success + ' <button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>');
                var b = $(c).attr("data-oc-load"),
                    d = $(c).attr("data-oc-target"),
                    e = $(c).attr("data-oc-trigger-btn");
                void 0 !== b && void 0 !== d && $(d).load(b);
                void 0 !== e && $(e).trigger("click")
            }

            for (key in a) $(c).find("[name='" + key + "']").val(a[key])
        }

        ,
        error: function (a, b, d) {
            console.log(d + "\r\n" + a.statusText + "\r\n" + a.responseText)
        }
    })
});

$(document).on("click", "button[data-oc-toggle='upload']", function () {
    var a = this;

    if (!$(a).prop("disabled")) {
        $("#form-upload").remove();
        $("body").prepend('<form enctype="multipart/form-data" id="form-upload" style="display: none;"><input type="file" name="file" value="" /></form>');
        $("#form-upload input[name='file']").trigger("click");

        $("#form-upload input[name='file']").on("change", function (b) {
            this.files[0].size / 1024 > $(a).attr("data-oc-size-max") && (alert($(a).attr("data-oc-size-error")), $(this).val(""))
        });
        "undefined" !== typeof c && clearInterval(c);

        var c = setInterval(function () {
            "" != $("#form-upload input[name='file']").val() && (clearInterval(c), $.ajax({

                url: $(a).attr("data-oc-url"),
                type: "post",
                data: new FormData($("#form-upload")[0]),
                dataType: "json",
                cache: !1,
                contentType: !1,
                processData: !1,
                beforeSend: function () {
                    $(a).prop("disabled", !0).addClass("loading")
                }

                ,
                complete: function () {
                    $(a).prop("disabled", !1).removeClass("loading")
                }

                ,
                success: function (b) {
                    console.log(b);
                    b.error && alert(b.error);
                    b.success && alert(b.success);
                    b.code && $($(a).attr("data-oc-target")).attr("value", b.code)
                }

                ,
                error: function (a, c, d) {
                    console.log(d + "\r\n" + a.statusText + "\r\n" + a.responseText)
                }
            }))
        }

            , 500)
    }
});

var Chain = function () {
    this.start = !1;
    this.data = []
}

    ;

Chain.prototype.attach = function (a) {
    this.data.push(a);
    this.start || this.execute()
}

    ;

Chain.prototype.execute = function () {
    this.data.length ? (this.start = !0, this.data.shift()().done(function () {
        chain.execute()
    })) : this.start = !1
}

    ;
var chain = new Chain;

(function (a) {
    a.fn.autocomplete = function (c) {
        return this.each(function () {
            var b = a(this),
                e = a("#" + b.attr("list"));
            this.timer = null;
            this.items = [];
            a.extend(this, c);

            b.on("focus", function () {
                this.request()
            });

            b.on("input", function (a) {
                this.request();
                (a = b.val()) && this.items[a] && this.select(this.items[a])
            });

            this.request = function () {
                clearTimeout(this.timer);

                this.timer = setTimeout(function (b) {
                    b.source(a(b).val(), a.proxy(b.response, b))
                }

                    , 50, this)
            }

                ;

            this.response = function (a) {

                var b = "",
                    c = {}
                    ,
                    d, f;

                if (a.length) {
                    for (f = 0; f < a.length; f++) this.items[a[f].label] = a[f], a[f].category ? (d = a[f].category, c[d] || (c[d] = []), c[d].push(a[f])) : b += "<option>" + a[f].label + "</option>";
                    for (d in c)
                        for (a = 0; a < c[d].length; a++) b += '<option value="' + c[d][a].label + '">' + d + "</option>"
                }

                e.html(b)
            }
        })
    }
})(window.jQuery);