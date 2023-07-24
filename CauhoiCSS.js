function showSelectedOption() {
      var selectBox = document.getElementById("mySelect");
      var selectedOption = selectBox.options[selectBox.selectedIndex].value;
      var table = document.getElementById("myTable");

      // Xóa các dòng hiện tại trong bảng
      while (table.rows.length > 1) {
        table.deleteRow(1);
      }

      // Tạo các dòng mới dựa trên option đã chọn
      if (selectedOption === "option1") {
        var row1 = table.insertRow(1);
        var cell1 = row1.insertCell(0);
        var cell2 = row1.insertCell(1);
        cell1.innerHTML = "Dòng 1";
        cell2.innerHTML = "Nội dung dòng 1";

        var row2 = table.insertRow(2);
        var cell3 = row2.insertCell(0);
        var cell4 = row2.insertCell(1);
        cell3.innerHTML = "Dòng 2";
        cell4.innerHTML = "Nội dung dòng 2";
      } else if (selectedOption === "option2") {
        var row1 = table.insertRow(1);
        var cell1 = row1.insertCell(0);
        var cell2 = row1.insertCell(1);
        cell1.innerHTML = "Dòng A";
        cell2.innerHTML = "Nội dung dòng A";

        var row2 = table.insertRow(2);
        var cell3 = row2.insertCell(0);
        var cell4 = row2.insertCell(1);
        cell3.innerHTML = "Dòng B";
        cell4.innerHTML = "Nội dung dòng B";
      }
    }