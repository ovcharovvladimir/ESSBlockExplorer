var BigNumber = require('bignumber.js');

var Ether     = new BigNumber(10e+17);

function formatAmount(amount) {
  var ret = new BigNumber(amount.toString());
  
  return Math.abs(ret.dividedBy(Ether).toFixed(6)) + " ESS";
}
module.exports = formatAmount;