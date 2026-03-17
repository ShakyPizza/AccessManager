const PASSWORD_HASH = '__PASSWORD_HASH__';

async function sha256(str) {
  const buffer = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('password').value;
  const hash = await sha256(password);
  if (hash === PASSWORD_HASH) {
    localStorage.setItem('authenticated', 'true');
    window.location.href = 'index.html';
  } else {
    document.getElementById('error').textContent = 'Rangt Lykilorð';
  }
});
