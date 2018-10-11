
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
  },

  this.countTimeDiff = function (timestamp) {
    const currentTimestamp = Math.floor(new Date().getTime() / 1000)
    let diff = currentTimestamp - timestamp
    let template
    let diffDate = new Date(diff * 1000)
    
    if (diff < 60) {
      template = diffDate.getSeconds() + ' secs'
    } else if (diff >= 60 && diff < 120) {
      template = diffDate.getMinutes() + ' min'
    } else if (diff >= 120 && diff < 3600) {
      template = diffDate.getMinutes() + ' mins'
    } else if (diff >= 3600 && diff < 7200) {
      template = diffDate.getHours() - 2 + ' hour ' + diffDate.getMinutes() + ' mins'  
    } else if (diff >= 7200 && diff < 86400) {
      template = diffDate.getHours() - 2 + ' hours ' + diffDate.getMinutes() + ' mins'
    } else if (diff >= 86400 && diff < 172800) {
      template = diffDate.getDate() + ' day ' + diffDate.getHours() + ' hours'
    } else if (diff >= 172800) {
      template = diffDate.getDate() + ' days ' + diffDate.getHours() + ' hours'
    }

    return template 
  }
}
module.exports = nameFormatter
