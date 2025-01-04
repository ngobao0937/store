// Định nghĩa giờ, ngày và ngày tháng hiện tại tại Việt Nam
const VN_CURRENT_HOUR = `22`;
const VN_CURRENT_DAY = `2`;
const VN_CURRENT_DATE = `10-12-2024`;

// Khởi tạo Google Tag Manager
(function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
    });
    var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
    f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-PQ6PJ3GS');

// Khởi tạo Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-114815169-1');
