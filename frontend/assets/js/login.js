const passwordToggle = document.querySelector('.fa-eye');

passwordToggle.addEventListener('click', () => {
  const passwordInput = document.querySelector('#password');
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
});

function login() {
  const userInput = document.querySelector('#username');
  const userLabel = document.querySelector('#userLabel');
  const passwordInput = document.querySelector('#password');
  const passwordLabel = document.querySelector('#passwordLabel');
  const errorMessage = document.querySelector('#msg-error');
  
  let userList = JSON.parse(localStorage.getItem('userList') || '[]');
  let authenticatedUser = { name: null, user: null, password: null };

  userList.forEach((item) => {
    if (userInput.value === item.username && passwordInput.value === item.password) {
      authenticatedUser = {
        name: item.name,
        user: item.username,
        password: item.password
      };
    }
  });

  if (userInput.value === authenticatedUser.user && passwordInput.value === authenticatedUser.password) {
    const token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2);
    localStorage.setItem('token', token);
    localStorage.setItem('loggedUser', JSON.stringify(authenticatedUser));
    
    window.location.href = '../index.html'; 
  } else {
    userLabel.style.color = 'red';
    userInput.style.borderColor = 'red';
    passwordLabel.style.color = 'red';
    passwordInput.style.borderColor = 'red';
    errorMessage.style.display = 'block';
    errorMessage.innerHTML = 'Usuário ou senha incorretos';
    userInput.focus();
  }
}