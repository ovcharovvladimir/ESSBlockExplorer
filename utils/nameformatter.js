
function nameFormatter(config) {
  this.conf = config;
  
  this.format = function(address) {
    if (this.conf.names[address]) {
      return this.conf.names[address];
    } else {
      return address;
    }
  },

  this._checkIfDoubleValue = function(value) {
    if (value < 10) {
      return '0' + String(value)
    }
    return value
  },

  this.dateFormat = function(timestamp) {
    const template = '${this.day} ${this.mouth} ${this.year} ${this.hour}:${this.minutes}:${this.seconds}'
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    let date = new Date(timestamp * 1000)
    let dateObject = {}
    dateObject.day = this._checkIfDoubleValue(date.getDate())
    let monthIndex = date.getMonth()
    dateObject.mouth = monthNames[monthIndex]
    dateObject.year = date.getFullYear()
    dateObject.hour = this._checkIfDoubleValue(date.getHours())
    dateObject.minutes = this._checkIfDoubleValue(date.getMinutes())
    dateObject.seconds = this._checkIfDoubleValue(date.getSeconds())
    // eslint-disable-next-line
    return new Function('return `' + template + '`').call(dateObject)
  }
}
module.exports = nameFormatter;