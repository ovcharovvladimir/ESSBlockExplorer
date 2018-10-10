var BigNumber = require('bignumber.js');

var Ether = new BigNumber(10e+17);


function hexToEth(hexValue) {
  var ret = new BigNumber(parseInt(hexValue, 16).toString());
  return Math.abs(ret.dividedBy(Ether).toFixed(18));
}

module.exports = hexToEth;
