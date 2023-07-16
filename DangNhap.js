function dangNhap() {
    var taiKhoan = document.getElementById('edtTaiKhoan').value
    var matKhau = document.getElementById('edtMatKhau').value
    var user = localStorage.getItem(taiKhoan)
    var data = JSON.parse(user)
    if (taiKhoan === 'admin' && matKhau === '1') {
        window.location.href = 'CauHoiCSS.html';
    } else if (taiKhoan === '' || matKhau === '') {
        alert("Thông tin không được để trống")
    } else if (taiKhoan == data.taiKhoan && matKhau == data.matKhau) {
        window.location.href = 'CauHoiCSS.html';
    }
}
function dangKy() {
    var taiKhoan = document.getElementById('edtTaiKhoan').value
    var matKhau = document.getElementById('edtMatKhau').value
    var user = {
        taiKhoan: taiKhoan,
        matKhau: matKhau
    };
    var json = JSON.stringify(user)
    if (taiKhoan === '' || matKhau === '') {
        alert("Thông tin không được để trống")
    } else {

        localStorage.setItem(taiKhoan, json)
        alert('Đăng ký thành công, mời bạn đăng nhập')
    }

}