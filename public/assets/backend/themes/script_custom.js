document.addEventListener("DOMContentLoaded", function () {
    const alertElement = document.querySelector(".alert");
    if (alertElement) {
        alertElement.classList.add("show");
        setTimeout(() => {
        alertElement.classList.remove("show");
        alertElement.style.display = "none";
        }, 4000);
    }

});
document.getElementById('button_submit').addEventListener('click', function(event) {
    var form = document.getElementById('form');

    if (form.checkValidity()) {
        form.submit();
        showLoading();
    } else {
        form.reportValidity();
    }
});
function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}