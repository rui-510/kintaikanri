function login() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginContainer = document.getElementById('loginContainer');
    const appContainer = document.getElementById('appContainer');

    // 仮のユーザー認証。実際にはサーバーサイドで行うべきです。
    if (usernameInput.value === 'user' && passwordInput.value === 'password') {
        loginContainer.style.display = 'none';
        appContainer.style.display = 'block';
    } else {
        alert('ユーザーIDまたはパスワードが正しくありません。');
    }
}