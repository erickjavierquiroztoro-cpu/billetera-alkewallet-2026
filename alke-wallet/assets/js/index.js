(function (window, $) {
  'use strict';

  $(function () {
    let hour = new Date().getHours();
    let greeting = 'Bienvenido a Alke Wallet';

    if (hour < 12) {
      greeting = 'Buenos días, bienvenido a Alke Wallet';
    } else if (hour < 20) {
      greeting = 'Buenas tardes, bienvenido a Alke Wallet';
    } else {
      greeting = 'Buenas noches, bienvenido a Alke Wallet';
    }


    function updateClock() {
  let now = new Date();

  let time = now.toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  document.getElementById('clock').textContent = time;
}

updateClock();
setInterval(updateClock, 1000);

    $('.wallet-description').prepend(
      '<h3 class="welcome-message">' + greeting + '</h3>'
    );

    $('.img-article').on('click', function () {
      $('.img-article').removeClass('img-selected');
      $(this).addClass('img-selected');
    });

    $('nav a').on('click', function () {
      $('nav a').removeClass('active-link');
      $(this).addClass('active-link');
    });
  });
})(window, jQuery);