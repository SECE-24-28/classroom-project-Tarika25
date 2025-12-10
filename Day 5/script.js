document.addEventListener('DOMContentLoaded', () => {
  function showError(elId, message) {
    const p = document.getElementById(elId);
    if (p) p.textContent = message;
  }

  function clearError(elId) {
    const p = document.getElementById(elId);
    if (p) p.textContent = '';
  }

  
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      const username = document.getElementById('username');
      const password = document.getElementById('password');

      clearError('userError');
      clearError('passError');

      if (!username || username.value.trim().length < 3) {
        showError('userError', 'Please enter a username (at least 3 characters).');
        ok = false;
      }

      if (!password || password.value.length < 6) {
        showError('passError', 'Password must be at least 6 characters.');
        ok = false;
      }
      if(username==="admin@gmail.com" && password==="1234"){
            alert("Login sucessful!");
            window.location.href="home.html";
      }

      if (ok) {
        
        alert('Login successful (demo).');
        loginForm.reset();
        window.location.href = 'index.html';
      }
    });
  }

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const password = document.getElementById('password');

      clearError('nameError');
      clearError('emailError');
      clearError('passError');

      if (!name || name.value.trim().length === 0) {
        showError('nameError', 'Please enter your name.');
        ok = false;
      }

      if (!email || !emailRe.test(email.value)) {
        showError('emailError', 'Please enter a valid email.');
        ok = false;
      }

      if (!password || password.value.length < 6) {
        showError('passError', 'Password must be at least 6 characters.');
        ok = false;
      }

      if (ok) {
        // Replace this with real signup call
        alert('Sign up successful (demo). You can now log in.');
        signupForm.reset();
        window.location.href = 'login.html';
      }
    });
  }
});
