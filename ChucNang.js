function dangNhap() {
    var taiKhoan = document.getElementById('edtTaiKhoan').value;
    var matKhau = document.getElementById('edtMatKhau').value;
    var user = localStorage.getItem(taiKhoan);

    if (taiKhoan === 'admin' && matKhau === '1') {
        window.location.href = 'ChonKhoaHoc.html';
    } else if (taiKhoan === '' || matKhau === '') {
        alert("Thông tin không được để trống");
    } else if (user === null) {
        alert("Tài khoản không tồn tại");
    } else {
        var data = JSON.parse(user);
        if (taiKhoan === data.taiKhoan && matKhau === data.matKhau) {
            window.location.href = 'ChonKhoaHoc.html';
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
function clickCSS(){
    window.location.href = 'CauHoiCSS.html';
}
//Lỗi
// function tenTaiKhoan() {
//     var taiKhoan = document.getElementById('edtTaiKhoan').value;
//     var user = localStorage.getItem(taiKhoan);
//     var data = JSON.parse(user);

//     if (data) {
//         document.getElementById('loggedInUsername').textContent = data.taiKhoan;
//     }
// }
function selectOption() {
    var dropdown = document.getElementById('dropdown');
    var selectedValue = dropdown.value;
    var formCauHoi = document.getElementById('formCauHoi');

    switch (selectedValue) {
        case 'option1':
            // Xóa nội dung cũ của formCauHoi (nếu có)
            formCauHoi.innerHTML = '';

            // Tạo form câu hỏi với 4 đáp án và chọn đáp án đúng
            var formHTML = `
                <form>
                    <label>Câu hỏi</label>
                    <input type="text" name="question"><br>
                    <input type="radio" name="correctAnswer" value="answer1">
                    <input type="text" name="answer1">
                    <br>
                    <input type="radio" name="correctAnswer" value="answer2">
                    <input type="text" name="answer2">
                    <br>
                    <input type="radio" name="correctAnswer" value="answer3">
                    <input type="text" name="answer3">
                    <br>
                    <input type="radio" name="correctAnswer" value="answer4">
                    <input type="text" name="answer4">
                    <br><br>
                    <input type="submit" value="Tạo câu hỏi">
                </form>
            `;

            formCauHoi.innerHTML = formHTML;
            break;

        case 'option2':

            formCauHoi.innerHTML = '';

            break;

        case 'option3':
            formCauHoi.innerHTML = '';

            break;

        default:
            formCauHoi.innerHTML = '';

            break;
    }
}