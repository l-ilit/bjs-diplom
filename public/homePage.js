"use strict"
const logoutBtn = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout(response => {
    if (response.success) {
      location.reload() 
    }
}) 
}
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(data);
    }
})
const ratesBoard = new RatesBoard();
const requestExchangeRates = () => {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(data);
        }
    })
}
requestExchangeRates();
setInterval(requestExchangeRates, 60000);
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
          ProfileWidget.showProfile(data);
          moneyManager.setMessage(response.success, "Выполнено успешно");
        } else {
          moneyManager.setMessage(response.success, response.error);
        }
    })
}
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(data);
            moneyManager.setMessage(response.success, "Выполнено успешно");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(data);
            moneyManager.setMessage(response.success, "Выполнено успешно");
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}
const favouritesWidget = new FavouritesWidget();
ApiConnector.getFavourites(response => {
    if (response.success) {
        favouritesWidget.clearTable();
        favouritesWidget.filltable(data);
        moneyManager.updateUsersList(data);
    }
})
favouritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavourites(data, response => {
    if (response.success) {
      favouritesWidget.clearTable();
      favouritesWidget.fillTable(data);
      moneyManager.updateUsersList(data);
      favouritesWidget.setMessage(response.success, "Выполнено успешно");
    } else {
      favouritesWidget.setMessage(response.success, response.error);
    }
  })
}
favouritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavourites(data,response => {
      if (response.success) {
        favouritesWidget.clearTable();
        favouritesWidget.fillTable(data);
        moneyManager.updateUsersList(data);
        favouritesWidget.setMessage(response.success, "Выполнено успешно");
    } else {
      favouritesWidget.setMessage(response.success, response.error);
    }
    })
}