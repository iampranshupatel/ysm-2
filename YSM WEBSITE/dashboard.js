// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
  // ——— Auth check & greeting/logout ———
  const userData = sessionStorage.getItem('ysmUser');
  if (!userData) {
    window.location.href = 'login.html';
    return;
  }
  const { role, username } = JSON.parse(userData);
  document.getElementById('greeting').textContent =
    `Welcome, ${username} (${role.toUpperCase()})`;

  document.getElementById('logoutBtn')
    .addEventListener('click', () => {
      sessionStorage.removeItem('ysmUser');
      window.location.href = 'login.html';
    });
});
