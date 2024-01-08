document.addEventListener('DOMContentLoaded', function () {
  // フォームのsubmitイベントを拾って処理を行う
  document.getElementById('attendanceForm').addEventListener('submit', function (event) {
    event.preventDefault();  // デフォルトのフォーム送信を防ぐ
    submitAttendance();
  });

  function submitAttendance() {
    // フォームの値を取得
    const userName = document.getElementById('userName').value;
    const date = document.getElementById('attendanceDate').value;
    const type = document.getElementById('attendanceType').value;
    const time = document.getElementById('attendanceTime').value;

    // データをサーバーに送信
    fetch('/attendances', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, date, time, type }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        // サーバーからの応答を処理
        console.log(data);
        fetchAndDisplayAttendanceData();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function fetchAndDisplayAttendanceData() {
    fetch('/attendances')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('attendanceBody');
        // テーブルの内容をクリア
        tableBody.innerHTML = '';

        // 取得したデータをテーブルに追加
        data.forEach(entry => {
          const row = document.createElement('tr');
          const userNameCell = document.createElement('td'); // 新しく追加
          const dateCell = document.createElement('td');
          const typeCell = document.createElement('td');
          const timeCell = document.createElement('td');

          userNameCell.textContent = entry.userName; // 新しく追加
          dateCell.textContent = entry.date;
          typeCell.textContent = entry.type;
          timeCell.textContent = entry.time;

          row.appendChild(userNameCell); // 新しく追加
          row.appendChild(dateCell);
          row.appendChild(typeCell);
          row.appendChild(timeCell);

          tableBody.appendChild(row);
        });
      })
      .catch(error => {
        console.error('Error fetching attendance data:', error);
      });
  }
});
