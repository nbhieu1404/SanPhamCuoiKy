// Hàm kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
    const tenTaiKhoanDangNhap = localStorage.getItem('edtTaiKhoan');
    if (tenTaiKhoanDangNhap) {
        // Nếu đã đăng nhập, thay thế nội dung của thẻ li có nội dung là Tài khoản
        const userAccountLi = document.getElementById('tenTaiKhoan');
        if (userAccountLi) {
            userAccountLi.textContent = tenTaiKhoanDangNhap;
            console.log(userAccountLi.textContent = tenTaiKhoanDangNhap)
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra trạng thái đăng nhập khi tải trang
    checkLoginStatus();
});

