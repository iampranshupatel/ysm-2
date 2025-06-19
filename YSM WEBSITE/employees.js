// employees.js

document.addEventListener('DOMContentLoaded', () => {
  // ——— Auth check & header setup ———
  const userData = sessionStorage.getItem('ysmUser');
  if (!userData) {
    return window.location.replace('login.html');
  }
  const { username, role } = JSON.parse(userData);
  document.getElementById('greeting').textContent =
    `Welcome, ${username} (${role.toUpperCase()})`;
  document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('ysmUser');
    window.location.replace('login.html');
  });

  // ——— Demo employees data ———
  const employees = [
    { id:1,  name:'David Patel',  role:'Analyst',      dept:'Finance',         startDate:'2023-09-01' },
    { id:2,  name:'Emily Wong',   role:'Developer',    dept:'IT',              startDate:'2024-02-15' },
    { id:3,  name:'Frank Müller', role:'Coordinator',  dept:'HR',              startDate:'2022-11-20' },
    { id:4,  name:'Grace Chen',   role:'Designer',     dept:'Marketing',       startDate:'2025-01-10' },
    { id:5,  name:'Hassan Ali',   role:'Support',      dept:'Customer Service',startDate:'2024-07-05' },
    { id:6,  name:'Irene Kim',    role:'Manager',      dept:'Operations',      startDate:'2023-03-12' },
    { id:7,  name:'John Doe',     role:'Intern',       dept:'IT',              startDate:'2025-05-01' },
    { id:8,  name:'Sarah Lee',    role:'Analyst',      dept:'Marketing',       startDate:'2022-08-22' },
    { id:9,  name:'Michael Brown',role:'Developer',    dept:'Finance',         startDate:'2024-11-30' },
    { id:10, name:'Priya Singh',  role:'Coordinator',  dept:'Support Services',startDate:'2023-12-05' }
  ];

  const tbody = document.querySelector('#employeeTable tbody');
  const searchInput = document.getElementById('searchInput');

  // ——— Render function ———
  function renderList(list) {
    tbody.innerHTML = '';
    if (list.length === 0) {
      tbody.innerHTML = `
        <tr><td class="no-data" colspan="4">
          No employees match your search.
        </td></tr>`;
      return;
    }
    list.forEach(emp => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${emp.name}</td>
        <td>${emp.role}</td>
        <td>${emp.dept}</td>
        <td>${emp.startDate}</td>`;
      tbody.appendChild(tr);
    });
  }

  // ——— Initial render ———
  renderList(employees);

  // ——— Filter on search ———
  searchInput.addEventListener('input', () => {
    const term = searchInput.value.trim().toLowerCase();
    const filtered = employees.filter(e =>
      e.name.toLowerCase().includes(term) ||
      e.role.toLowerCase().includes(term) ||
      e.dept.toLowerCase().includes(term)
    );
    renderList(filtered);
  });
});
