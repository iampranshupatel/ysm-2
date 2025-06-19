// offboard.js

// Reuse auth check & greeting/logout
const userInfo = sessionStorage.getItem('ysmUser');
if (!userInfo) {
  window.location.href = 'login.html';
} else {
  const { username, role } = JSON.parse(userInfo);
  document.getElementById('greeting').textContent = `Welcome, ${username} (${role.toUpperCase()})`;
}
document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem('ysmUser');
  window.location.href = 'login.html';
});

// Mock current employees — replace with real API fetch
let employees = [
  { id: 1, name: 'David Patel', role: 'Analyst', dept: 'Finance', startDate: '2023-09-01' },
  { id: 2, name: 'Emily Wong', role: 'Developer', dept: 'IT', startDate: '2024-02-15' },
  { id: 3, name: 'Frank Müller', role: 'Coordinator', dept: 'HR', startDate: '2022-11-20' }
];

const offboardBody = document.querySelector('#offboardTable tbody');

function renderEmployees() {
  offboardBody.innerHTML = '';

  if (employees.length === 0) {
    offboardBody.innerHTML = `<tr><td class="no-data" colspan="5">No current employees.</td></tr>`;
    return;
  }

  employees.forEach(emp => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.role}</td>
      <td>${emp.dept}</td>
      <td>${emp.startDate}</td>
      <td><button class="btn-schedule" data-id="${emp.id}">Schedule Off-board</button></td>
    `;
    offboardBody.appendChild(tr);
  });

  // Attach click handlers
  document.querySelectorAll('.btn-schedule').forEach(btn => {
    btn.addEventListener('click', () => scheduleOffboard(btn.dataset.id));
  });
}

function scheduleOffboard(id) {
  const idx = employees.findIndex(e => e.id == id);
  if (idx === -1) return;

  const { name } = employees[idx];
  const date = prompt(`Enter off-boarding date for ${name} (YYYY-MM-DD):`, '');
  if (!date) {
    alert('Off-boarding cancelled.');
    return;
  }

  // Ideally call backend API to schedule off-boarding here...
  alert(`Off-boarding for ${name} scheduled on ${date}.`);

  // Optionally remove from list:
  employees.splice(idx, 1);
  renderEmployees();
}

// Initial render
renderEmployees();
