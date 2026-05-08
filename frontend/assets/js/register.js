let btnViewPass = document.getElementById('viewPassword');
let btnViewConfirmPass = document.getElementById('viewConfirmPassword');

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

if(btnViewConfirmPass) {
    btnViewConfirmPass.addEventListener('click', () => {
        let inputConfirmPassword = document.getElementById('confirm-password');
        if(inputConfirmPassword.getAttribute('type') == 'password') {
            inputConfirmPassword.setAttribute('type', 'text');
            btnViewConfirmPass.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            inputConfirmPassword.setAttribute('type', 'password');
            btnViewConfirmPass.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });
}

function register() {
    let name = document.getElementById('name').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm-password').value;
    let msgError = document.getElementById('msg-error');

    msgError.style.display = 'none';
    msgError.innerHTML = '';

    if (name.length < 1) {
        showError("Por favor, preencha o Nome Completo.");
        return; 
    }

    if (username.length < 1) {
        showError("Por favor, preencha o Usuário.");
        return;
    }

    if (password.length < 1) {
        showError("Por favor, crie uma Senha.");
        return;
    }

    if (password !== confirmPassword) {
        showError("As senhas não conferem.");
        return;
    }

    let userList = JSON.parse(sessionStorage.getItem("userList") || "[]");

    let userExists = userList.find(user => user.username === username);
    if (userExists) {
        showError("Esse nome de usuário já está em uso!");
        return;
    }

    userList.push({ 
        name: name, 
        username: username, 
        password: password 
    });
    sessionStorage.setItem("userList", JSON.stringify(userList));

    window.location.href = "login.html";
}

function showError(message) {
    let msgError = document.getElementById('msg-error');
    msgError.innerHTML = message;
    msgError.style.display = 'block';
}