// Funcionalidade de clicar no olho para ver a senha
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

// Lógica de Cadastro
function register() {
    let name = document.getElementById('name').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm-password').value;
    let msgError = document.getElementById('msg-error');

    // Reseta a mensagem de erro a cada clique
    msgError.style.display = 'none';
    msgError.innerHTML = '';

    // VALIDAÇÕES REDUZIDAS (Apenas impede de enviar vazio)
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

    // SE PASSOU POR TODAS AS VALIDAÇÕES (Sucesso!)
    
    // 1. Puxa a lista de usuários salvos (ou cria uma vazia se não existir)
// 1. Puxa a lista (Agora usando sessionStorage)
    let userList = JSON.parse(sessionStorage.getItem("userList") || "[]");

    let userExists = userList.find(user => user.username === username);
    if (userExists) {
        showError("Esse nome de usuário já está em uso!");
        return;
    }

    // 3. Salva o novo usuário (Agora usando sessionStorage)
    userList.push({ 
        name: name, 
        username: username, 
        password: password 
    });
    sessionStorage.setItem("userList", JSON.stringify(userList));

    // 4. REDIRECIONA DIRETO PARA O LOGIN! 🚀
    window.location.href = "login.html";
}

// Função auxiliar para mostrar erros na caixinha vermelha
function showError(message) {
    let msgError = document.getElementById('msg-error');
    msgError.innerHTML = message;
    msgError.style.display = 'block';
}