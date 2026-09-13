(function (window, $) {
  'use strict';

  function formatDate(value) {
    return new Intl.DateTimeFormat('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(value));
  }

  $(function () {
    let user = window.AlkeApp.requireAuth();

    if (!user) {
      return;
    }

    let $list = $('#transactionsList');
    $list.empty();

    if (!user.transactions.length) {
      $list.append('<li class="list-group-item text-muted">Todavia no hay movimientos.</li>');
      return;
    }

    user.transactions.forEach(function (transaction) {
      let isIncome = transaction.amount > 0;
      let badgeClass = isIncome ? 'badge-success text-income' : 'badge-danger text-expense';
      let amountText = (isIncome ? '+' : '-') + window.AlkeApp.formatMoney(Math.abs(transaction.amount));
      let $item = $(
        '<li class="list-group-item d-flex justify-content-between align-items-center">' +
          '<span><strong></strong><br><small class="text-muted"></small></span>' +
          '<span class="badge"></span>' +
        '</li>'
      );

      $item.find('strong').text(transaction.description);
      $item.find('small').text(formatDate(transaction.createdAt));
      $item.find('.badge').addClass(badgeClass).text(amountText);
      $list.append($item);
    });
  });
})(window, jQuery);
