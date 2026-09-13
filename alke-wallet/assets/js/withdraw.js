(function (window, $) {
  'use strict';

  $(function () {
    window.AlkeApp.requireAuth();

    $('#withdrawForm').on('submit', function (event) {
      event.preventDefault();

      let amount = Number($('#withdrawAmount').val());
      let currentUser = window.AlkeStorage.getCurrentUser();

      if (!amount || amount <= 0) {
        window.AlkeApp.showMessage('#withdrawMessage', 'Ingresa un monto mayor a cero.', 'danger');
        return;
      }

      if (amount > currentUser.balance) {
        window.AlkeApp.showMessage('#withdrawMessage', 'Saldo insuficiente para realizar el retiro.', 'danger');
        return;
      }

      window.AlkeStorage.updateCurrentUser(function (user) {
        user.balance -= amount;

        window.AlkeStorage.createTransaction(user, {
          type: 'withdraw',
          description: 'Retiro de fondos',
          amount: -amount
        });
      });

      window.AlkeApp.showMessage('#withdrawMessage', 'Retiro registrado correctamente.', 'success');
      $('#withdrawAmount').val('');
      window.AlkeApp.renderBalance();
    });
  });
})(window, jQuery);