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

var loggedInUser = localStorage.getItem('loggedInUser');
var editingQuestionIndex = -1;
function addOption() {
    var optionsContainer = document.getElementById('options-container');
    var optionIndex = optionsContainer.getElementsByClassName('option').length;
    var optionDiv = document.createElement('div');
      optionDiv.classList.add('option');
    var checkboxInput = document.createElement('input');
      checkboxInput.type = 'checkbox';
      checkboxInput.name = 'correct-option';
    var textInput = document.createElement('input');
      textInput.type = 'text';
      textInput.name = 'option-text';
      textInput.placeholder = 'Đáp án ' + (optionIndex + 1);
      optionDiv.appendChild(checkboxInput);
      optionDiv.appendChild(textInput);
      optionsContainer.appendChild(optionDiv);
}

function showForm() {
    var selectBox = document.getElementById("question-type");
    var selectedOption = selectBox.options[selectBox.selectedIndex].value;

    var formOption1 = document.getElementById("question-form-1");
    var formOption2 = document.getElementById("question-form-1");
    var formOption3 = document.getElementById("question-form-2");

    formOption1.style.display = "none";
    formOption2.style.display = "none";
    formOption3.style.display = "none";

    if (selectedOption === "single") {
        formOption1.style.display = "block";
    } else if (selectedOption === "double") {
        formOption2.style.display = "block";
    } else if (selectedOption === "word") {
        formOption3.style.display = "block";
    }
}

    var pageLoaded = false; // Biến cờ để kiểm tra xem trang web đã được tải hay chưa

    // Hàm xử lý sự kiện onload
    function setDefault() {
        // Lấy tham chiếu đến select box "question-type"
        var questionTypeSelect = document.getElementById("question-type");

        // Thiết lập giá trị mặc định cho select box là rỗng (không hiển thị bất kỳ nội dung nào)
        questionTypeSelect.value = "";

        // Ẩn các form liên quan đến các loại câu hỏi
        var formOption1 = document.getElementById("question-form-1");
        var formOption2 = document.getElementById("question-form-1");
        var formOption3 = document.getElementById("question-form-2");

        formOption1.style.display = "none";
        formOption2.style.display = "none";
        formOption3.style.display = "none";

        // Hiển thị các câu hỏi từ localStorage lên bảng khi trang web được tải lần đầu
        if (!pageLoaded) {
            showSavedQuestions();
            pageLoaded = true;
        }
    }

    // Hàm xử lý sự kiện submit cho "question-form-1"
    document.getElementById('question-form-1').addEventListener('submit', function(event) {
        event.preventDefault();
        var question = document.getElementById('question').value;
        var questionType = document.getElementById('question-type').value;

        var optionsContainer = document.getElementById('options-container');
        var options = optionsContainer.getElementsByClassName('option');
        var optionList = Array.from(options).map(function(option) {
            var checkboxInput = option.querySelector('input[type="checkbox"]');
            var textInput = option.querySelector('input[type="text"]');

            return {
                text: textInput.value.trim(),
                correct: checkboxInput.checked
            };
        });

        var questionTable = document.getElementById('question-list');
        var newRow = questionTable.insertRow();
        newRow.innerHTML = `
            <td>${question}</td>
            <td>${questionType === 'single' ? 'Một đáp án' : 'Hai đáp án'}</td>
            <td>${optionList.length}</td>
            <td>${optionList.filter(function(option) { return option.correct; }).map(function(option) { return option.text; }).join(', ')}</td>
            <td>${loggedInUser}</td>
            <td>
                <button type="button" onclick="editQuestion(${newRow.rowIndex})">Chỉnh sửa</button>
            </td>
        `;

        document.getElementById('question').value = '';
        document.getElementById('question-type').value = 'single';
        optionsContainer.innerHTML = '';

        // Lưu câu hỏi vào localStorage
        saveQuestionToLocalStorage(question, questionType, optionList);

        // Hiển thị thông báo thành công dưới dạng cửa sổ alert
        alert('Câu hỏi đã được thêm thành công!');
    });

    // Hàm xử lý sự kiện submit cho "question-form-2"
    document.getElementById('question-form-2').addEventListener('submit', function(event) {
        event.preventDefault();
        var question = document.getElementById('question').value;
        var questionType = 'word'; // Loại câu hỏi "Đáp án viết"

        // Định nghĩa một đáp án với nội dung từ text box đáp án
        var option = {
            text: document.getElementById('option-text').value.trim(),
            correct: true // Đáp án viết luôn được coi là đáp án đúng
        };

        // Tạo mảng optionList chứa một đáp án
        var optionList = [option];

        var questionTable = document.getElementById('question-list');
        var newRow = questionTable.insertRow();
        newRow.innerHTML = `
            <td>${question}</td>
            <td>${questionType}</td>
            <td>${optionList.length}</td>
            <td>${optionList.map(function(option) { return option.text; }).join(', ')}</td>
            <td>${loggedInUser}</td>
            <td>
                <button type="button" onclick="editQuestion(${newRow.rowIndex})">Chỉnh sửa</button>
            </td>
        `;

        document.getElementById('question').value = '';
        document.getElementById('option-text').value = ''; // Xóa nội dung text box đáp án

        // Lưu câu hỏi vào localStorage
        saveQuestionToLocalStorage(question, questionType, optionList);

        // Hiển thị thông báo thành công dưới dạng cửa sổ alert
        alert('Câu hỏi đã được thêm thành công!');
    });

    // Hàm lưu câu hỏi vào localStorage
    function saveQuestionToLocalStorage(question, questionType, options) {
        // Kiểm tra xem localStorage đã chứa dữ liệu câu hỏi chưa
        var savedQuestions = localStorage.getItem('questions');
        var questions = savedQuestions ? JSON.parse(savedQuestions) : [];

        // Thêm câu hỏi mới vào danh sách câu hỏi
        questions.push({
            question: question,
            questionType: questionType,
            options: options
        });

        // Lưu lại danh sách câu hỏi vào localStorage
        localStorage.setItem('questions', JSON.stringify(questions));
    }

    // Hàm hiển thị các câu hỏi từ localStorage lên bảng
    function showSavedQuestions() {
        var savedQuestions = localStorage.getItem('questions');
        if (savedQuestions) {
            var questions = JSON.parse(savedQuestions);
            var questionTable = document.getElementById('question-list');

            questions.forEach(function(questionData) {
                var newRow = questionTable.insertRow();
                newRow.innerHTML = `
                    <td>${questionData.question}</td>
                    <td>${questionData.questionType}</td>
                    <td>${questionData.options.length}</td>
                    <td>${questionData.options.map(function(option) { return option.text; }).join(', ')}</td>
                    <td>${loggedInUser}</td>
                    <td>
                        <button type="button" onclick="editQuestion(${newRow.rowIndex})">Chỉnh sửa</button>
                    </td>
                `;

                // Xử lý hiển thị checkbox đáp án đúng vào cột "Đáp án đúng"
                var correctAnswerCell = newRow.cells[3];
                var options = questionData.options;
                var correctAnswers = options.filter(function(option) { return option.correct; });
                var checkboxes = correctAnswerCell.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(function(checkbox) {
                    if (correctAnswers.some(function(answer) { return answer.text === checkbox.nextElementSibling.textContent; })) {
                        checkbox.checked = true;
                    } else {
                        checkbox.checked = false;
                    }
                });
            });
        }
    }

    // Hàm xử lý sự kiện khi người dùng nhấn nút "Chỉnh sửa"
    function editQuestion(index) {
        var questionList = document.getElementById('question-list');
        var row = questionList.rows[index];
        var questionCell = row.cells[0];
        var questionTypeCell = row.cells[1];
        var optionsCell = row.cells[2];
        var correctAnswerCell = row.cells[3];

        var question = questionCell.textContent;
        var questionType = questionTypeCell.textContent === 'Một đáp án' ? 'single' : 'word';
        var options = optionsCell.textContent.split(', ');

        // Hiển thị thông tin của câu hỏi và các đáp án trong form chỉnh sửa
        document.getElementById('question').value = question;
        document.getElementById('question-type').value = questionType;

        var optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';

        if (questionType === 'single') {
            var optionDiv = document.createElement('div');
            optionDiv.classList.add('option');
            var checkboxInput = document.createElement('input');
            checkboxInput.type = 'checkbox';
            checkboxInput.name = 'correct-option';
            checkboxInput.checked = options.includes(correctAnswerCell.textContent);
            var textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.name = 'option-text';
            textInput.value = correctAnswerCell.textContent;
            optionDiv.appendChild(checkboxInput);
            optionDiv.appendChild(textInput);
            optionsContainer.appendChild(optionDiv);
        } else if (questionType === 'word') {
            var textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.name = 'option-text';
            textInput.value = correctAnswerCell.textContent;
            optionsContainer.appendChild(textInput);
        }

        // Lưu chỉ mục của câu hỏi đang được chỉnh sửa vào biến
        editingQuestionIndex = index;
    }

    // Hàm xử lý sự kiện khi người dùng nhấn nút "Lưu lại"
    function saveEditedQuestion() {
        if (editingQuestionIndex === -1) {
            alert('Không có câu hỏi nào được chỉnh sửa.');
            return;
        }

        var questionList = document.getElementById('question-list');
        var row = questionList.rows[editingQuestionIndex];

        var question = document.getElementById('question').value;
        var questionType = document.getElementById('question-type').value;
        var optionsContainer = document.getElementById('options-container');
        var options = optionsContainer.getElementsByClassName('option');
        var optionList = Array.from(options).map(function(option) {
            var checkboxInput = option.querySelector('input[type="checkbox"]');
            var textInput = option.querySelector('input[type="text"]');

            return {
                text: textInput.value.trim(),
                correct: checkboxInput.checked
            };
        });

        row.cells[0].textContent = question;
        row.cells[1].textContent = questionType === 'single' ? 'Một đáp án' : 'Hai đáp án';
        row.cells[2].textContent = optionList.length;
        row.cells[3].textContent = optionList.map(function(option) { return option.text; }).join(', ');

        // Lưu thông tin câu hỏi chỉnh sửa vào localStorage
        saveEditedQuestionToLocalStorage(editingQuestionIndex, question, questionType, optionList);

        // Reset lại form chỉnh sửa
        document.getElementById('question').value = '';
        document.getElementById('question-type').value = 'single';
        optionsContainer.innerHTML = '';
        editingQuestionIndex = -1;

        // Hiển thị thông báo thành công dưới dạng cửa sổ alert
        alert('Câu hỏi đã được chỉnh sửa thành công!');
    }

    // Hàm lưu thông tin câu hỏi chỉnh sửa vào localStorage
    function saveEditedQuestionToLocalStorage(index, question, questionType, options) {
        var savedQuestions = localStorage.getItem('questions');
        if (savedQuestions) {
            var questions = JSON.parse(savedQuestions);
            questions[index] = {
                question: question,
                questionType: questionType,
                options: options
            };
            localStorage.setItem('questions', JSON.stringify(questions));
        }
    }

    // Hàm xử lý sự kiện khi người dùng nhấn nút "Hủy"
    function cancelEdit() {
        // Reset lại form chỉnh sửa
        document.getElementById('question').value = '';
        document.getElementById('question-type').value = 'single';
        var optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        editingQuestionIndex = -1;
    }