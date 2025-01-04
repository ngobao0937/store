var $jscomp = {
    scope: {},
    findInternal: function (a, c, b) {
        a instanceof String && (a = String(a));
        for (var d = a.length, e = 0; e < d; e++) {
            var f = a[e];
            if (c.call(b, f, e, a)) return {
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
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (a, c, b) {
    if (b.get || b.set) throw new TypeError("ES3 does not support getters and setters.");
    a != Array.prototype && a != Object.prototype && (a[c] = b.value)
};
$jscomp.getGlobal = function (a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function (a, c, b, d) {
    if (c) {
        b = $jscomp.global;
        a = a.split(".");
        for (d = 0; d < a.length - 1; d++) {
            var e = a[d];
            e in b || (b[e] = {});
            b = b[e]
        }
        a = a[a.length - 1];
        d = b[a];
        c = c(d);
        c != d && null != c && $jscomp.defineProperty(b, a, {
            configurable: !0,
            writable: !0,
            value: c
        })
    }
};
$jscomp.polyfill("Array.prototype.find", function (a) {
    return a ? a : function (a, b) {
        return $jscomp.findInternal(this, a, b).v
    }
}, "es6-impl", "es3");
$(document).on("click", "#account-login #form-login button", function () {
    dataLayer.push({
        event: "login"
    })
});
$(document).on("click", "#account-register #form-register button", function () {
    dataLayer.push({
        event: "sign_up"
    })
});
// $("#product-search #input-search").length && $("#product-search #input-search").val().length && dataLayer.push({
//     event: "search",
//     search_term: $("#product-search #input-search").val()
// });
if ($("#product-category").length) {
    for (var products = [], $product_list = $("#product-list > .col"), i = 0; i < $product_list.length; i++) products.push({
        item_id: $($product_list[i]).find('input[name="product_id"]').val(),
        item_name: $($product_list[i]).find(".product-item-title").text(),
        price: Number($($product_list[i]).find(".price-new").text().replace(/\D/g, "")),
        quantity: 9999
    });
    dataLayer.push({
        event: "view_item_list",
        ecommerce: {
            item_list_name: $(".category-title").text(),
            items: products
        }
    })
}
$("#product-info").length && (products = [], products.push({
    item_id: $("#form-product #content").find('input[name="product_id"]').val(),
    item_name: $("#product-info #content").find(".product-name").text(),
    price: Number($("#product-info #content").find(".price-new").text().replace(/\D/g, "")),
    quantity: 9999
}), dataLayer.push({
    event: "view_item",
    ecommerce: {
        currency: "VND",
        value: products[0].price,
        items: products
    }
}));
$(document).on("click", "#button-cart", function () {
    var a = [];
    a.push({
        item_id: $("#form-product #content").find('input[name="product_id"]').val(),
        item_name: $("#product-info #content").find(".product-name").text(),
        price: Number($("#product-info #content").find(".price-new").text().replace(/\D/g, "")),
        quantity: Number($("#input-quantity").val())
    });
    dataLayer.push({
        event: "add_to_cart",
        ecommerce: {
            currency: "VND",
            value: a[0].price,
            items: a
        }
    })
});
if ($("#checkout-cart").length) {
    for (var products = [], total = 0, $product_list = $("#shopping-cart tbody tr"), i = 0; i < $product_list.length; i++) products.push({
        item_id: $($product_list[i]).find(".cart-product-id").val(),
        item_name: $($product_list[i]).find(".cart-item-name").text(),
        price: Number($($product_list[i]).find(".cart-item-price").text().replace(/\D/g, "")),
        quantity: Number($($product_list[i]).find('input[name="quantity"]').val())
    }), total += Number($($product_list[i]).find(".cart-item-price").text().replace(/\D/g,
        "")) * Number($($product_list[i]).find('input[name="quantity"]').val());
    dataLayer.push({
        event: "view_cart",
        ecommerce: {
            currency: "VND",
            value: total,
            items: products
        }
    })
}
if ($("#checkout-checkout").length) {
    products = [];
    $product_list = $("#checkout-confirm tbody tr");
    for (i = 0; i < $product_list.length; i++) products.push({
        item_id: $($product_list[i]).find(".cart-product-id").val(),
        item_name: $($product_list[i]).find(".cart-item-name").text(),
        price: Number($($product_list[i]).find(".cart-item-price").val().replace(/\D/g, "")),
        quantity: Number($($product_list[i]).find(".cart-item-quantity").text())
    });
    dataLayer.push({
        event: "begin_checkout",
        ecommerce: {
            currency: "VND",
            value: Number($("#checkout-confirm .cart-total").val()),
            items: products
        }
    })
}
window.GTMAddShippingInfo = function () {
    for (var a = [], c = $("#checkout-confirm tbody tr"), b = 0; b < c.length; b++) a.push({
        item_id: $(c[b]).find(".cart-product-id").val(),
        item_name: $(c[b]).find(".cart-item-name").text(),
        price: Number($(c[b]).find(".cart-item-price").val().replace(/\D/g, "")),
        quantity: Number($(c[b]).find(".cart-item-quantity").text())
    });
    dataLayer.push({
        event: "add_shipping_info",
        ecommerce: {
            currency: "VND",
            value: Number($("#checkout-confirm .cart-total").val()),
            shipping_tier: "Delivery_Based",
            coupon: $("#form-coupon #input-coupon").val(),
            items: a
        }
    })
};