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
          MoneyManager.setMessage("Выполнено успешно");
        } else {
            MoneyManager.setMessage("Ошибка");
        }
    })
}
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(data);
            MoneyManager.setMessage("Выполнено успешно");
        } else {
            MoneyManager.setMessage("Ошибка");
        }
    })
}
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(data);
            MoneyManager.setMessage("Выполнено успешно");
        } else {
            MoneyManager.setMessage("Ошибка");
        }
    })
}
const favouritesWidget = new FavouritesWidget();
ApiConnector.getFavourites(response => {
    if (response.success) {
        favouritesWidget.clearTable();
        favouritesWidget.filltable(data);
        favouritesWidget.updateUsersList(data);
    }
})
favouritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavourites(data, response => {
    if (response.success) {
      favouritesWidget.clearTable();
      favouritesWidget.fillTable(data);
      favouritesWidget.updateUsersList(data);
      favouritesWidget.setMessage("Выполнено успешно");
    } else {
      favouritesWidget.setMessage("Ошибка");
    }
  })
}
favouritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavourites(data,response => {
      if (response.success) {
        favouritesWidget.clearTable();
        favouritesWidget.fillTable(data);
        favouritesWidget.updateUsersList(data);
        favouritesWidget.setMessage("Выполнено успешно");
    } else {
      favouritesWidget.setMessage("Ошибка");
    }
    })
}