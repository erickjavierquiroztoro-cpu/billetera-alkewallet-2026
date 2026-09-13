(function (window, $) {
  'use strict';

  function formatMoney(amount) {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(amount);
  }

  function showMessage(selector, message, type) {
    let $target = $(selector);

    if (!$target.length) {
      return;
    }

    $target
      .removeClass('d-none alert-success alert-danger alert-info')
      .addClass('alert-' + type)
      .text(message);
  }

  function requireAuth() {
    let user = window.AlkeStorage.getCurrentUser();

    if (!user) {
      window.location.href = 'login.html';
      return null;
    }

    return user;
  }

  function renderBalance() {
    let user = window.AlkeStorage.getCurrentUser();

    if (user) {
      $('[data-balance]').text(formatMoney(user.balance));
    }
  }

  function bindCommonEvents() {
    $('[data-logout]').on('click', function (event) {
      event.preventDefault();

      let state = window.AlkeStorage.loadState();
      state.session = null;
      window.AlkeStorage.saveState(state);
      window.location.href = 'login.html';
    });
  }

  $(function () {
    bindCommonEvents();
    renderBalance();
  });

  window.AlkeApp = {
    formatMoney: formatMoney,
    showMessage: showMessage,
    requireAuth: requireAuth,
    renderBalance: renderBalance
  };
})(window, jQuery);
