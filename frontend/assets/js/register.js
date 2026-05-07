const nameInput = document.querySelector('#name');
const labelName = document.querySelector('#labelName');
let isNameValid = false;

const usernameInput = document.querySelector('#username');
const labelUsername = document.querySelector('#labelUsername');
let isUserValid = false;

const passwordInput = document.querySelector('#password');
const labelPassword = document.querySelector('#labelPassword');
let isPassValid = false;

const confirmPasswordInput = document.querySelector('#confirmPassword');
const labelConfirmPassword = document.querySelector('#labelConfirmPassword');
let isConfirmPassValid = false;

nameInput.addEventListener('keyup', () => {
  if (nameInput.value.length <= 2) {
    labelName.style.color = 'red';
    labelName.innerHTML = 'Nome *Insira no mínimo 3 caracteres';
    nameInput.style.borderColor = 'red';
    isNameValid = false;
  } else {
    labelName.style.color = 'green';
    labelName.innerHTML = 'Nome';
    nameInput.style.borderColor = 'green';
    isNameValid = true;
  }
});

usernameInput.addEventListener('keyup', () => {
  if (usernameInput.value.length <= 4) {
    labelUsername.style.color = 'red';
    labelUsername.innerHTML = 'Usuário *Insira no mínimo 5 caracteres';
    usernameInput.style.borderColor = 'red';
    isUserValid = false;
  } else {
    labelUsername.style.color = 'green';
    labelUsername.innerHTML = 'Usuário';
    usernameInput.style.borderColor = 'green';
    isUserValid = true;
  }
});

function register() {
  const errorMsg = document.querySelector('#msg-error');
  const successMsg = document.querySelector('#msg-success');

  if (isNameValid && isUserValid && isPassValid && isConfirmPassValid) {
    let userList = JSON.parse(localStorage.getItem('userList') || '[]');
    
    userList.push({
      name: nameInput.value,
      username: usernameInput.value,
      password: passwordInput.value
    });
    
    localStorage.setItem('userList', JSON.stringify(userList));
    
    successMsg.style.display = 'block';
    successMsg.innerHTML = '<strong>Cadastrando usuário...</strong>';
    errorMsg.style.display = 'none';
    
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2000);
  } else {
    errorMsg.style.display = 'block';
    errorMsg.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
  }
}