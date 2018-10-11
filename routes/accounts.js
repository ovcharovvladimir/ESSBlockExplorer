var express = require('express');
var router = express.Router();

var async = require('async');
var Web3 = require('web3');
var request = require('request')

router.get('/:offset?', function(req, res, next) {
  const range = req.query.page

  var config = req.app.get('config');  
  var web3 = new Web3();
  let accountsCount = 0
  web3.setProvider(config.provider);
  
  async.waterfall([
    function(callback) {
      request.get(config.blockexplorerDataUrl + '/accounts?page=' + range, function (err, response, body){
        accountsCount = JSON.parse(body).accountsCount
        callback(err, JSON.parse(body).addresses);
        })
    }, function(allAccounts, callback) {
      let accounts = allAccounts.slice(0, 20)
      var data = [];
      
      if (accounts.length === 0) {
        return callback({name:"NoAccountsFound", message: "Chain contains no accounts."});
      }
      
      var lastAccount = accounts[accounts.length - 1];
      
      async.eachSeries(accounts, function(account, eachCallback) {
        web3.eth.getCode(account, function(err, code) {
          if (err) {
            return eachCallback(err);
          }
          let accountData = {}
          accountData.address = account;
          accountData.type = code.length > 2 ? "Contract" : "Account";
          
          web3.eth.getBalance(account, function(err, balance) {
            if (err) {
              return eachCallback(err);
            }
            accountData.balance = balance;
            data.push(accountData)
            eachCallback();
          });
        });
      }, function(err) {
        callback(err, data, lastAccount);
      });
    }
  ], function(err, accounts, lastAccount) {
    if (err) {
      return next(err);
    }
    res.render("accounts", { accounts: accounts, lastAccount: lastAccount, accountsCount: accountsCount, currentPage: range });
  });
});

module.exports = router;
