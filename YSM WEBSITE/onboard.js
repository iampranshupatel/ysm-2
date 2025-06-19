// onboard.js

document.addEventListener('DOMContentLoaded', () => {
  // ——— Auth check & header setup ———
  const userData = sessionStorage.getItem('ysmUser');
  if (!userData) {
    return window.location.replace('login.html');
  }
  const { username, role } = JSON.parse(userData);
  document.getElementById('greeting').textContent = `Welcome, ${username} (${role.toUpperCase()})`;
  document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('ysmUser');
    window.location.replace('login.html');
  });

  // ——— Demo data ———
  const pendingRequests = [
    { id: 1, name: 'Alice Johnson',    role: 'Analyst',          dept: 'Finance',              requestedOn: '2025-06-16' },
    { id: 2, name: 'Bob Singh',        role: 'Developer',        dept: 'IT',                   requestedOn: '2025-06-17' },
    { id: 3, name: 'Clara Lee',        role: 'Coordinator',      dept: 'HR',                   requestedOn: '2025-06-18' },
    { id: 4, name: 'Derek O’Connor',   role: 'Volunteer',        dept: 'Community Outreach',   requestedOn: '2025-06-14' },
    { id: 5, name: 'Emily Thorne',     role: 'Student Placement',dept: 'Support Services',     requestedOn: '2025-06-15' }
  ];

  const tableBody = document.querySelector('#onboardTable tbody');
  if (!tableBody) {
    console.error('Could not find #onboardTable tbody');
    return;
  }

  // ——— Render function ———
  function renderTable() {
    console.log('Rendering', pendingRequests.length, 'rows');
    tableBody.innerHTML = '';

    if (pendingRequests.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td class="no-data" colspan="5">
            No pending onboard requests.
          </td>
        </tr>`;
      return;
    }

    pendingRequests.forEach(req => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${req.name}</td>
        <td>${req.role}</td>
        <td>${req.dept}</td>
        <td>${req.requestedOn}</td>
        <td>
          <button class="btn-action btn-approve" data-id="${req.id}">Approve</button>
          <button class="btn-action btn-reject"  data-id="${req.id}">Reject</button>
        </td>`;
      tableBody.appendChild(tr);
    });

    // wire up the buttons
    tableBody.querySelectorAll('.btn-approve').forEach(btn =>
      btn.addEventListener('click', () => handleRequest(btn.dataset.id, true))
    );
    tableBody.querySelectorAll('.btn-reject').forEach(btn =>
      btn.addEventListener('click', () => handleRequest(btn.dataset.id, false))
    );
  }

  function handleRequest(id, approved) {
    const idx = pendingRequests.findIndex(r => r.id == id);
    if (idx < 0) return;
    const { name } = pendingRequests[idx];
    alert(`${approved ? 'Approved' : 'Rejected'} onboarding for ${name}.`);
    pendingRequests.splice(idx, 1);
    renderTable();
  }

  // ——— Kick it off ———
  renderTable();
});
