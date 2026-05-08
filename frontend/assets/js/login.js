let btnViewPass = document.querySelector('.fa-eye');
if(btnViewPass) {
    btnViewPass.addEventListener('click', () => {
        let inputPassword = document.getElementById('password');
        if(inputPassword.getAttribute('type') == 'password') {
            inputPassword.setAttribute('type', 'text');
            btnViewPass.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            inputPassword.setAttribute('type', 'password');
            btnViewPass.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });
}

function login() {
    let usernameInput = document.getElementById('username').value;
    let passwordInput = document.getElementById('password').value;
    let msgError = document.getElementById('msg-error');

    msgError.style.display = 'none';

    if (usernameInput.length < 1 || passwordInput.length < 1) {
        msgError.innerHTML = "Por favor, preencha usuário e senha.";
        msgError.style.display = 'block';
        return;
    }

    let userList = JSON.parse(sessionStorage.getItem("userList") || "[]");

    let validUser = userList.find(user => user.username === usernameInput && user.password === passwordInput);

    if (validUser) {
        sessionStorage.setItem("currentUser", validUser.username); 
        window.location.href = "../index.html"; 
    } else {
        msgError.innerHTML = "Usuário ou senha incorretos.";
        msgError.style.display = 'block';
    }}