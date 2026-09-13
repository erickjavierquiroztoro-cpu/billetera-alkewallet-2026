(function (window, $) {
  'use strict';

  let selectedContactId = null;

  function normalize(value) {
    return value.toLowerCase().trim();
  }

  function renderContacts(contacts) {
    let $list = $('#contactsList');
    $list.empty();

    if (!contacts.length) {
      $list.append('<li class="list-group-item text-muted">No se encontraron contactos.</li>');
      return;
    }

    contacts.forEach(function (contact) {
      let isSelected = contact.id === selectedContactId;
      let itemClass = isSelected ? ' list-group-item-primary' : '';
      let $item = $(
        '<button type="button" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center' + itemClass + '">' +
          '<span><strong></strong><br><small></small></span>' +
          '<span class="badge badge-primary">Elegir</span>' +
        '</button>'
      );

      $item.find('strong').text(contact.name);
      $item.find('small').text(contact.email);
      $item.on('click', function () {
        selectedContactId = contact.id;
        $('#selectedContact').text(contact.name + ' (' + contact.email + ')');
        renderContacts(window.AlkeStorage.getCurrentUser().contacts);
      });

      $list.append($item);
    });
  }

  function getSelectedContact(user) {
    return user.contacts.find(function (contact) {
      return contact.id === selectedContactId;
    }) || null;
  }

  $(function () {
    let user = window.AlkeApp.requireAuth();

    if (!user) {
      return;
    }

    renderContacts(user.contacts);

    $('#search').on('input', function () {
      let term = normalize($(this).val());
      let currentUser = window.AlkeStorage.getCurrentUser();
      let filteredContacts = currentUser.contacts.filter(function (contact) {
        return normalize(contact.name).indexOf(term) !== -1 || normalize(contact.email).indexOf(term) !== -1;
      });

      renderContacts(filteredContacts);
    });

    $('#contactForm').on('submit', function (event) {
      event.preventDefault();

      let name = $('#contactName').val().trim();
      let email = $('#contactEmail').val().trim().toLowerCase();
      let savedContact = null;
      let duplicateContact = false;

      if (!name || !email) {
        window.AlkeApp.showMessage('#sendMessage', 'Completa nombre y email del contacto.', 'danger');
        return;
      }

      window.AlkeStorage.updateCurrentUser(function (currentUser) {
        let exists = currentUser.contacts.some(function (contact) {
          return contact.email.toLowerCase() === email;
        });

        if (exists) {
          duplicateContact = true;
          return;
        }

        let nextId = currentUser.contacts.length ? Math.max.apply(null, currentUser.contacts.map(function (contact) {
          return contact.id;
        })) + 1 : 1;

        savedContact = { id: nextId, name: name, email: email };
        currentUser.contacts.push(savedContact);
        selectedContactId = nextId;
      });

      if (duplicateContact) {
        window.AlkeApp.showMessage('#sendMessage', 'Ese contacto ya existe.', 'danger');
        return;
      }

      $('#contactName, #contactEmail').val('');
      $('#newContact').collapse('hide');
      renderContacts(window.AlkeStorage.getCurrentUser().contacts);
      $('#selectedContact').text(savedContact.name + ' (' + savedContact.email + ')');
      window.AlkeApp.showMessage('#sendMessage', 'Contacto guardado correctamente.', 'success');
    });

    $('#transferForm').on('submit', function (event) {
      event.preventDefault();

      let amount = Number($('#transferAmount').val());
      let currentUser = window.AlkeStorage.getCurrentUser();
      let contact = getSelectedContact(currentUser);

      if (!contact) {
        window.AlkeApp.showMessage('#sendMessage', 'Selecciona un contacto para transferir.', 'danger');
        return;
      }

      if (!amount || amount <= 0) {
        window.AlkeApp.showMessage('#sendMessage', 'Ingresa un monto mayor a cero.', 'danger');
        return;
      }

      if (amount > currentUser.balance) {
        window.AlkeApp.showMessage('#sendMessage', 'Saldo insuficiente para esta transferencia.', 'danger');
        return;
      }

      window.AlkeStorage.updateCurrentUser(function (updatedUser) {
        updatedUser.balance -= amount;
        window.AlkeStorage.createTransaction(updatedUser, {
          type: 'transfer',
          description: 'Envio a ' + contact.name,
          amount: -amount,
          contactName: contact.name,
          contactEmail: contact.email
        });
      });

      $('#transferAmount').val('');
      window.AlkeApp.renderBalance();
      window.AlkeApp.showMessage('#sendMessage', 'Transferencia enviada correctamente.', 'success');
    });
  });
})(window, jQuery);
