// login.js

// Grab the form element
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Collect credentials
  const role = document.getElementById('role').value;
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  // (In a real app you'd call your backend here. For demo, we'll just gate by non‐empty fields.)
  if (!role || !username || !password) {
    alert('Please select your role and enter both username & password.');
    return;
  }

  // Save to sessionStorage so our next page knows who’s logged in
  sessionStorage.setItem('ysmUser', JSON.stringify({ role, username }));

  // Redirect to dashboard
  window.location.href = 'dashboard.html';
});
