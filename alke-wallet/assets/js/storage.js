(function (window) {
  'use strict';

  let STORAGE_KEY = 'alkeWalletState';

  let initialState = {
    session: null,
    users: [
      {
        id: 1,
        name: 'Usuario',
        email: 'Usuario@gmail.com',
        password: '1234',
        balance: 2124350,
        contacts: [
          { id: 1, name: 'Francisco', email: 'Francisco@gmail.com' },
          { id: 2, name: 'Camila', email: 'camila@gmail.com' },
          { id: 3, name: 'Ricardo', email: 'Ricardo@gmail.com' }
        ],
        transactions: [
          {
            id: 1,
            type: 'deposit',
            description: 'Deposito inicial',
            amount: 2124350,
            createdAt: new Date().toISOString()
          }
        ]
      }
    ]
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function loadState() {
    let savedState = localStorage.getItem(STORAGE_KEY);

    if (!savedState) {
      saveState(initialState);
      return clone(initialState);
    }

    try {
      return JSON.parse(savedState);
    } catch (error) {
      saveState(initialState);
      return clone(initialState);
    }
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function getCurrentUser(state) {
    let appState = state || loadState();

    if (!appState.session) {
      return null;
    }

    return appState.users.find(function (user) {
      return user.id === appState.session.userId;
    }) || null;
  }

  function updateCurrentUser(callback) {
    let state = loadState();
    let user = getCurrentUser(state);

    if (!user) {
      return null;
    }

    callback(user, state);
    saveState(state);
    return user;
  }

  function createTransaction(user, transaction) {
    let transactions = user.transactions || [];
    let nextId = transactions.length ? Math.max.apply(null, transactions.map(function (item) {
      return item.id;
    })) + 1 : 1;

    transactions.unshift({
      id: nextId,
      type: transaction.type,
      description: transaction.description,
      amount: transaction.amount,
      contactName: transaction.contactName || '',
      contactEmail: transaction.contactEmail || '',
      createdAt: new Date().toISOString()
    });

    user.transactions = transactions;
  }

  window.AlkeStorage = {
    loadState: loadState,
    saveState: saveState,
    getCurrentUser: getCurrentUser,
    updateCurrentUser: updateCurrentUser,
    createTransaction: createTransaction
  };
})(window);
