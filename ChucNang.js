function dangNhap() {
    var taiKhoan = document.getElementById('edtTaiKhoan').value;
    var matKhau = document.getElementById('edtMatKhau').value;
    var user = localStorage.getItem(taiKhoan);

    if (taiKhoan === 'admin' && matKhau === '1') {
        window.location.href = 'CauHoiCSS.html';
    } else if (taiKhoan === '' || matKhau === '') {
        alert("Thông tin không được để trống");
    } else if (user === null) {
        alert("Tài khoản không tồn tại");
    } else {
        var data = JSON.parse(user);
        if (taiKhoan === data.taiKhoan && matKhau === data.matKhau) {
            window.location.href = 'CauHoiCSS.html';
        } else {
            alert("Sai tên tài khoản hoặc mật khẩu");
        }
    }
}
function dangKy() {
    var taiKhoan = document.getElementById('edtTaiKhoan').value;
    var matKhau = document.getElementById('edtMatKhau').value;
    if (taiKhoan === '' || matKhau === '') {
        alert("Thông tin không được để trống");
    } else {
        var user = {
            taiKhoan: taiKhoan,
            matKhau: matKhau
        };
        var json = JSON.stringify(user);
        localStorage.setItem(taiKhoan, json);
        alert('Đăng ký thành công, mời bạn đăng nhập');
    }
}
function tenTaiKhoan() {
    var taiKhoan = document.getElementById('edtTaiKhoan').value;
    var user = localStorage.getItem(taiKhoan);
    var data = JSON.parse(user);

    if (data) {
        document.getElementById('loggedInUsername').textContent = data.taiKhoan;
    }
}