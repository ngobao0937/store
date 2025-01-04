document.addEventListener("DOMContentLoaded", function () {
    const schemaScript = document.createElement("script");
    schemaScript.type = "application/ld+json";
    schemaScript.text = JSON.stringify({
        "@context": "http://schema.org",
        "@type": "Organization",
        "url": "https://www.flowercorner.vn/",
        "logo": "https://www.flowercorner.vn/image/catalog/1_dienhoa/app/shop-hoa-tuoi-flowercorner-logo.png",
        "potentialAction": {
            "@type": "SearchAction",
            // "target": "https://www.flowercorner.vn/index.php?route=product/search&search={search_term_string}",
            "query-input": "required name=search_term_string"
        },
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": "1900 633 045",
                "contactType": "Customer Service"
            },
            {
                "@type": "ContactPoint",
                "telephone": "0918491941",
                "contactType": "Sales"
            },
            {
                "@type": "ContactPoint",
                "telephone": "0865160360",
                "contactType": "Sales"
            }
        ],
        "sameAs": [
            "https://www.facebook.com/flowercorner.vn/",
            "https://twitter.com/FlowerCorner3",
            "https://www.instagram.com/flowercorner.vn/",
            "https://plus.google.com/b/115903467275389262973/",
            "https://www.youtube.com/c/flowercorner",
            "https://flowercornervn.tumblr.com/",
            "https://soundcloud.com/flower-corner",
            "https://www.reddit.com/user/flowercornervn",
            "https://www.linkedin.com/company/flowercorner",
            "https://www.pinterest.com/flowercornervn/",
            "https://about.me/flowercorner"
        ]
    });
    document.head.appendChild(schemaScript);
});
