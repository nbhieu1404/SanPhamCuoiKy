function dangNhap() {
    var taiKhoan = document.getElementById('edtTaiKhoan').value
    var matKhau = document.getElementById('edtMatKhau').value

    if (taiKhoan === 'admin' && matKhau === '1') {
        window.location.href = 'CauHoiCSS.html';
    } else if(taiKhoan === '' || matKhau === ''){
        alert("Thông tin không được để trống")
    } else{
        alert("Tin tài khoản không chính xác")
    }
}