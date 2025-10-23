const form = document.getElementById('signupForm');
const liveList = document.getElementById('liveList');
let users = JSON.parse(localStorage.getItem('users')) || [];

function renderUsers() {
  liveList.innerHTML = '';
  users.forEach((user, index) => {
    const li = document.createElement('li');
    li.textContent = `${user.name} — ${user.email} `;
    const btn = document.createElement('button');
    btn.textContent = 'Delete';
    btn.onclick = () => {
      users.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(users));
      renderUsers();
    };
    li.appendChild(btn);
    liveList.appendChild(li);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  if (password.length < 6) { alert('Password must be at least 6 characters.'); return; }
  users.push({ name, email });
  localStorage.setItem('users', JSON.stringify(users));
  renderUsers();
  form.reset();
});

renderUsers();
