(function (window, $) {
  'use strict';

  $(function () {
    $('#loginForm').on('submit', function (event) {
      event.preventDefault();

      let email = $('#email').val().trim().toLowerCase();
      let password = $('#password').val().trim();
      let state = window.AlkeStorage.loadState();
      let user = state.users.find(function (item) {
        return item.email.toLowerCase() === email && item.password === password;
      });

      if (!email || !password) {
        window.AlkeApp.showMessage('#loginMessage', 'Ingresa tu email y contraseña.', 'danger');
        return;
      }

      if (!user) {
        window.AlkeApp.showMessage('#loginMessage', 'Credenciales invalidas. Usa Usuario@gmail.com / 1234.', 'danger');
        return;
      }

      state.session = { userId: user.id, loggedAt: new Date().toISOString() };
      window.AlkeStorage.saveState(state);
      window.location.href = 'menu.html';
    });
  });
})(window, jQuery);
