var $jscomp = {
    scope: {},
    findInternal: function (a, b, c) {
        a instanceof String && (a = String(a));
        for (var d = a.length, e = 0; e < d; e++) {
            var f = a[e];
            if (b.call(c, f, e, a)) return {
                i: e,
                v: f
            }
        }
        return {
            i: -1,
            v: void 0
        }
    }
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, b, c) {
    if (c.get || c.set) throw new TypeError("ES3 does not support getters and setters.");
    a != Array.prototype && a != Object.prototype && (a[b] = c.value)
};
$jscomp.getGlobal = function (a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (a, b, c, d) {
    if (b) {
        c = $jscomp.global;
        a = a.split(".");
        for (d = 0; d < a.length - 1; d++) {
            var e = a[d];
            e in c || (c[e] = {});
            c = c[e]
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && $jscomp.defineProperty(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
};
$jscomp.polyfill("Array.prototype.find", function (a) {
    return a ? a : function (a, c) {
        return $jscomp.findInternal(this, a, c).v
    }
}, "es6-impl", "es3");
window.v_ts = (new Date).getTime();
var ZAS_IN_ENDPOINT = "https://in.flowercorner.vn/api";
window.mobilecheck = function () {
    var a = !1,
        b = navigator.userAgent || navigator.vendor || window.opera;
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0,
        4))) a = !0;
    return a
};
$(document).ready(function () {
    // if ($("#carousel-banner-home").length) {
    //     var a = mobilecheck() ? "mslider" : "slider";
    //     $.getJSON(ZAS_IN_ENDPOINT + "?cmd=" + a + "&v=" + window.v_ts, function (a) {
    //         if (a.success && a.data && a.data.length) {
    //             for (var c = "", b = 0; b < a.data.length; b++) c += '<div class="carousel-item ' + (0 == b ? "active" : "") + '"> <div class="row justify-content-center"> <div class="col-12 text-center"><a href=""><img src="' + a.CDN_DOMAIN + "/uploads/" + a.data[b].image + '" alt="home slider" width="1355" height="432" class="img-fluid"/></a></div></div></div>';
    //             $("#carousel-banner-home .carousel-inner").html(c);
    //             new bootstrap.Carousel(document.querySelector("#carousel-banner-home"), {
    //                 ride: "carousel",
    //                 interval: 5E3,
    //                 wrap: !0
    //             })
    //         }
    //     })
    // }
    var b = (new Date).getDay() + 1;
    $.getJSON(ZAS_IN_ENDPOINT + "?cmd=popup&v=" + window.v_ts, function (a) {
        if (a.success && a.data && a.data.length)
            for (var c = 0; c < a.data.length; c++)
                if (0 <= a.data[c].activeday.indexOf(b)) {
                    $("#myModalx .modal-body img").prop("src", a.CDN_DOMAIN + "/uploads/" + a.data[c].image);
                    $("#myModalx .modal-body a").prop("href", a.data[c].url);
                    setTimeout(function () {
                        sessionStorage.getItem("popupShowed") ?
                            $("div#myModalx.modal").css("display", "none") : $("#myModalx").modal("show")
                    }, 2E3);
                    break
                }
    });
    $("#myModalx .close").click(function () {
        sessionStorage.setItem("popupShowed", "true")
    });
    $("#myModalx .modal-body a").click(function () {
        sessionStorage.setItem("popupShowed", "true")
    })
});
$(document).ready(function () {
    var a = $("#top").height() + $("header").height() - $(".stk-menu").height();
    $(window).scroll(function () {
        $(this).scrollTop() > a ? 0 < $(window).width() && $(".stk-menu").addClass("header-main-scrolled") : $(".stk-menu").removeClass("header-main-scrolled")
    });
    768 >= screen.width && ($(".mmt-app").addClass("mmt-app--mobile"), $(".mmt-menu__item").addClass("mmt-menu__item--mobile"), $(".mmt-button").addClass("mmt-button--mobile"))
});
var SHIP_REGIONS = !1,
    SHIP_DISTRICTS = !1;

function numberWithCommas(a) {
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

function loadRegionSelect() {
    for (var a = "", b = 0; b < SHIP_REGIONS.length; b++) a += '<option value="' + SHIP_REGIONS[b].id + '">' + SHIP_REGIONS[b].name + "</option>";
    a += '<option value="0">Kh\u00e1c</option>';
    $(".ship-to-region").html(a).trigger("change")
}

function loadDistrictSelect(a) {
    var b = "";
    if (SHIP_DISTRICTS.hasOwnProperty(a))
        for (var c = 0; c < SHIP_DISTRICTS[a].districts.length; c++) b += '<option value="' + SHIP_DISTRICTS[a].districts[c].price + '">' + SHIP_DISTRICTS[a].districts[c].name + "</option>";
    0 == a && (b += '<option value="60000">Kh\u00e1c</option>');
    $(".ship-to-district").html(b).trigger("change")
}

function loadShippingFee() {
    var a = new Date;
    a.getDay();
    var b = a.getTime();
    jQuery.get(ZAS_IN_ENDPOINT + "?cmd=ship_regions&v=" + b, function (a) {
        a.success && a.data && (SHIP_REGIONS = a.data, jQuery.get(ZAS_IN_ENDPOINT + "?cmd=ship_districts&v=" + b, function (a) {
            a.success && a.data && (SHIP_DISTRICTS = a.data, loadRegionSelect())
        }))
    })
}

function loadCoupon() {
    jQuery.getJSON(ZAS_IN_ENDPOINT + "?cmd=coupons&v=" + window.v_ts, function (a) {
        if (a.success && a.data && a.data.length) {
            for (var b = "<strong>Khuy\u1ebfn m\u00e3i: </strong>", c = "", d = 0; d < a.data.length; d++) b += '<div class="coupon-item">' + a.data[d].title + "</div>", c += '<div class="coupon-box-item">\n\t\t\t\t\t\t\t \t\t\t\t\t\t\t\t\t\t\t<div class="cp-code">' + a.data[d].code + '</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="cp-other">\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="cp-title">' +
                a.data[d].title + '</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="cp-description">' + a.data[d].description + '</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="cp-expdate">' + (a.data[d].expdate.length ? "HSD: " + a.data[d].expdate : "") + "</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t </div>";
            $(".coupon_slider").html(b);
            $(".coupon_box_detail").html(c)
        }
    })
}
$(document).ready(function () {
    $('input[name="product_id"]').length && (loadCoupon(), loadShippingFee(), $(document).on("mouseenter", ".coupon-item", function () {
        $(".coupon_box_detail").show()
    }), $(document).on("click", "body", function () {
        $(".coupon_box_detail").hide()
    }), $(document).on("click", ".coupon-item, .coupon_box_detail", function (a) {
        a.stopPropagation()
    }));
    $(".ship-to-region").change(function () {
        var a = $(this).val();
        loadDistrictSelect(a)
    });
    $(".ship-to-district").change(function () {
        var a = $(this).val();
        $(".ship_fee").text(0 <
            a ? numberWithCommas(a) + " \u0111" : "Mi\u1ec5n ph\u00ed!")
    })
});
$(document).ready(function () {
    if ($("#inquirySubmitForm").length) $("#inquirySubmitForm").on("submit", function (a) {
        a.preventDefault();
        a = $("#phone").val().trim();
        var b = $("#occasion").val();
        if (8 > a.length || 11 < a.length || isNaN(a)) return alert("S\u1ed1 \u0111i\u1ec7n tho\u1ea1i kh\u00f4ng h\u1ee3p l\u1ec7!"), !1;
        $('#inquirySubmitForm button[type="submit"]').text("\u0110ANG G\u1eecI...").prop("disabled", !0);
        $.ajax({
            url: "/dathoa/tuvan.php",
            method: "POST",
            data: {
                phone: a,
                occasion: b
            },
            success: function (a) {
                a.success ?
                    ($("#inquirySubmit").modal("hide"), window.location = "https://www.flowercorner.vn/?route=checkout/success&amp;quick=true") : alert(a.message);
                $('#inquirySubmitForm button[type="submit"]').text("G\u1eecI Y\u00caU C\u1ea6U").prop("disabled", !1)
            },
            error: function () {
                alert("G\u1eedi y\u00eau c\u1ea7u kh\u00f4ng th\u00e0nh c\u00f4ng, vui l\u00f2ng li\u1ec7n h\u1ec7 qua facebook ho\u1eb7c hotline!")
            }
        })
    });
    // var a = (new URLSearchParams(window.location.search)).get("route");
    null != a && "checkout" === a.split("index.html")[0] || null !== sessionStorage.getItem("inquirySubmit") ||
        setTimeout(function () {
            $("#inquirySubmit").modal("show");
            sessionStorage.setItem("inquirySubmit", "yes")
        }, 6E4);
    mobilecheck() ? $(".zalolink").prop("href", "https://zalo.me/0918491941") : ($(".phone1link").prop("href", "https://zalo.me/0918491941"), $(".phone1link").find(".mmt-button__label").text("091 849 1941"), $(".phone2link").prop("href", "https://zalo.me/0865160360"), $(".phone2link").find(".mmt-button__label").text("086 516 0360"))
});