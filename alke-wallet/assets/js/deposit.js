(function (window, $) {
  'use strict';

  $(function () {
    window.AlkeApp.requireAuth();

    $('#depositForm').on('submit', function (event) {
      event.preventDefault();

      let amount = Number($('#amount').val());

      if (!amount || amount <= 0) {
        window.AlkeApp.showMessage('#depositMessage', 'Ingresa un monto mayor a cero.', 'danger');
        return;
      }

      window.AlkeStorage.updateCurrentUser(function (user) {
        user.balance += amount;
        window.AlkeStorage.createTransaction(user, {
          type: 'deposit',
          description: 'Deposito realizado',
          amount: amount
        });
      });

      window.AlkeApp.showMessage('#depositMessage', 'Deposito registrado correctamente.', 'success');
      $('#amount').val('');
      window.AlkeApp.renderBalance();
    });
  });
})(window, jQuery);
