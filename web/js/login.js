// Login simulado. Será substituído pela chamada a POST /auth/login da API.
const form = document.getElementById('login-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = form.email.value.trim();
  const password = form.password.value;
  document.getElementById('email-error').textContent = email ? '' : 'Indique o seu email.';
  document.getElementById('password-error').textContent = password ? '' : 'Indique a sua palavra-passe.';
  if (!email || !password) return;
  sessionStorage.setItem('session', JSON.stringify({ email, role: 'admin' }));
  window.location.href = 'cursos.html';
});
