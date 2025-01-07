// $('#input-subscription').on('change', function (e) {
//     var element = this;

//     $('.subscription').addClass('d-none');

//     $('#subscription-description-' + $(element).val()).removeClass('d-none');
// });

// $('#form-product').on('submit', function (e) {
//     e.preventDefault();

//     $.ajax({
//         url: 'index.php?route=checkout/cart|add&language=vi-vn',
//         type: 'post',
//         data: $('#form-product').serialize(),
//         dataType: 'json',
//         contentType: 'application/x-www-form-urlencoded',
//         cache: false,
//         processData: false,
//         beforeSend: function () {
//             $('#button-cart').prop('disabled', true).addClass('loading');
//         },
//         complete: function () {
//             $('#button-cart').prop('disabled', false).removeClass('loading');
//         },
//         success: function (json) {
//             $('#form-product').find('.is-invalid').removeClass('is-invalid');
//             $('#form-product').find('.invalid-feedback').removeClass('d-block');

//             if (json['error']) {
//                 for (key in json['error']) {
//                     $('#input-' + key.replaceAll('_', '-')).addClass('is-invalid').find('.form-control, .form-select, .form-check-input, .form-check-label').addClass('is-invalid');
//                     $('#error-' + key.replaceAll('_', '-')).html(json['error'][key]).addClass('d-block');
//                 }
//             }

//             if (json['success']) {
//                 $('#alert').prepend('<div class="alert alert-success alert-dismissible"><i class="fa-solid fa-circle-check"></i> ' + json['success'] + ' <button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>');

//                 $('#header-cart').load('https://www.flowercorner.vn/index.php?route=common/cart|info');

//                 setTimeout(function () {
//                     window.location = 'https://www.flowercorner.vn/?route=checkout/checkout';
//                 }, 500);

//             }
//         },
//         error: function (xhr, ajaxOptions, thrownError) {
//             console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
//         }
//     });
// });

// $(document).ready(function () {
//     $('.magnific-popup').magnificPopup({
//         type: 'image',
//         delegate: 'a',
//         gallery: {
//             enabled: true
//         }
//     });
// });

// $('#dat-nhanh').click(function () {
//     $('#quickOrder').modal('show');
// });
// $('#quickOrderForm').on('submit', function (e) {
//     e.preventDefault();
//     var product = $('#product-name-model').val().trim();
//     var sender = $('#sender').val().trim();
//     var senderphone = $('#senderphone').val().trim();
//     var recaptcha = '';

//     var invalid = product.length <= 0 || sender.length < 3 || senderphone.length < 8;

//     if (invalid) {
//         alert('Vui lòng điền đầy đủ thông tin!');
//         return false;
//     }

//     if (isNaN(senderphone)) {
//         alert('Số điện thoại không hợp lệ!');
//         return false;
//     }

//     if (grecaptcha && grecaptcha.getResponse().length !== 0) {
//         recaptcha = grecaptcha.getResponse();
//     } else {
//         alert('Vui lòng hoàn thành reCaptcha!');
//         return false;
//     }

//     $.ajax({
//         url: '/dathoa/dathoanhanh.php',
//         method: 'POST',
//         data: {
//             product: product,
//             sender: sender,
//             senderphone: senderphone,
//             recaptcha: recaptcha
//         },
//         success: function (data) {
//             grecaptcha.reset();
//             if (data.success) {
//                 $('#quickOrder').modal('hide');
//                 window.location = "https://www.flowercorner.vn/?route=checkout/success&amp;quick=true"
//             } else {
//                 alert(data.message);
//             }
//         },
//         error: function () {
//             alert('Không thể đặt hoa, vui lòng liện hệ qua facebook hoặc điện thoại!');
//         }
//     });
// });