const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const records = [
  {
    reader: 'Alice Johnson',
    book: 'Dune',
    category: 'Sci-Fi',
    issued: '2026-03-01',
    expectedReturn: '2026-03-15',
    returned: '2026-03-14',
    penalty: '$0',
    phone: '+1 (555) 014-8821',
    status: 'On time'
  },
  {
    reader: 'Marcus Lee',
    book: 'The Iliad',
    category: 'Mythology',
    issued: '2026-02-20',
    expectedReturn: '2026-03-06',
    returned: '2026-03-10',
    penalty: '$8',
    phone: '+1 (555) 995-1142',
    status: 'Late return'
  },
  {
    reader: 'Nora Green',
    book: 'Hamlet',
    category: 'Drama',
    issued: '2026-03-09',
    expectedReturn: '2026-03-23',
    returned: '2026-03-22',
    penalty: '$0',
    phone: '+1 (555) 122-8977',
    status: 'On time'
  }
];

const staffCodes = {
  staff: 'staff2026',
  clerk: 'clerk2026'
};

const loginForm = document.getElementById('staff-login-form');
const authMessage = document.getElementById('auth-message');
const recordsPanel = document.getElementById('records-panel');
const authPanel = document.getElementById('auth-panel');
const recordsTbody = document.getElementById('records-tbody');
const logoutBtn = document.getElementById('logout-btn');

function renderRecords() {
  if (!recordsTbody) return;

  recordsTbody.innerHTML = '';
  records.forEach((entry) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${entry.reader}</td>
      <td>${entry.book}</td>
      <td>${entry.category}</td>
      <td>${entry.issued}</td>
      <td>${entry.expectedReturn}</td>
      <td>${entry.returned}</td>
      <td>${entry.penalty}</td>
      <td>${entry.phone}</td>
      <td class="${entry.status === 'Late return' ? 'late' : 'on-time'}">${entry.status}</td>
    `;
    recordsTbody.appendChild(tr);
  });
}

function showRecords(role) {
  if (authPanel) authPanel.classList.add('hidden');
  if (recordsPanel) recordsPanel.classList.remove('hidden');
  sessionStorage.setItem('library_admin_role', role);
  renderRecords();
}

if (loginForm) {
  const activeRole = sessionStorage.getItem('library_admin_role');
  if (activeRole && staffCodes[activeRole]) {
    showRecords(activeRole);
  }

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const roleInput = document.getElementById('staff-role');
    const passcodeInput = document.getElementById('staff-passcode');
    const role = roleInput?.value;
    const passcode = passcodeInput?.value.trim();

    const valid = role && staffCodes[role] && passcode === staffCodes[role];
    if (!valid) {
      if (authMessage) {
        authMessage.textContent = 'Access denied: invalid role or passcode.';
        authMessage.className = 'auth-message error';
      }
      return;
    }

    if (authMessage) {
      authMessage.textContent = `Access granted for ${role}.`;
      authMessage.className = 'auth-message success';
    }

    showRecords(role);
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('library_admin_role');
    window.location.reload();
  });
}
