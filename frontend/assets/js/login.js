// Funcionalidade de clicar no olho para ver a senha
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

// Lógica de Login
function login() {
    let usernameInput = document.getElementById('username').value;
    let passwordInput = document.getElementById('password').value;
    let msgError = document.getElementById('msg-error');

    // Reseta a mensagem de erro
    msgError.style.display = 'none';

    // Validação: Mínimo de 1 caractere
    if (usernameInput.length < 1 || passwordInput.length < 1) {
        msgError.innerHTML = "Por favor, preencha usuário e senha.";
        msgError.style.display = 'block';
        return;
    }

    // Puxa a lista de usuários criados lá no register.js
// Puxa a lista usando sessionStorage
    let userList = JSON.parse(sessionStorage.getItem("userList") || "[]");

    let validUser = userList.find(user => user.username === usernameInput && user.password === passwordInput);

    if (validUser) {
        // Salva quem está logado no sessionStorage
        sessionStorage.setItem("currentUser", validUser.username); 
        window.location.href = "../index.html"; 
    } else {
        msgError.innerHTML = "Usuário ou senha incorretos.";
        msgError.style.display = 'block';
    }}