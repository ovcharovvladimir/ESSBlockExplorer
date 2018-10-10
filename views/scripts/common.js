(() => {
  const localUrl = 'http://localhost:3000'

  const Ether = 10e+17;

  class Dropdown {
    constructor (dropdown) {
      this.dropdowns = document.querySelectorAll(dropdown)
      this.TOGGLE_OPEN = 'is-open'
      this.ACTIVE_CLASS = 'is-active'
    }

    removeAllOpen (elems) {
      const _this = this

      elems.forEach(function (e) {
        e.classList.remove(_this.TOGGLE_OPEN)
      })
    }

    addOpen (el) {
      el.classList.add(this.TOGGLE_OPEN)
    }

    addActive (el) {
      el.classList.add(this.ACTIVE_CLASS)
    }

    removeOpen (el) {
      el.classList.remove(this.TOGGLE_OPEN)
    }

    removeActive (el) {
      el.classList.remove(this.ACTIVE_CLASS)
    }

    init () {
      const _this = this

      _this.dropdowns.forEach(function (e) {
        const dropdown = e

        e.addEventListener('click', function () {
          if (!dropdown.classList.contains(_this.TOGGLE_OPEN)) {
            _this.removeAllOpen(_this.dropdowns)
            _this.addOpen(dropdown)
            _this.addActive(dropdown.querySelector('.dropdown__toggle'))
          } else {
            _this.removeOpen(dropdown)
            _this.removeActive(dropdown.querySelector('.dropdown__toggle'))
          }
        })
      })

      window.addEventListener('click', function (e) {
        if (e.target.closest('.dropdown')) {
          return
        } else {
          _this.removeAllOpen(_this.dropdowns)
        }
      })
    }
  }

  class Modal {
    constructor(modal) {
      this.modal = document.querySelectorAll(modal)
      this.modalLinks = document.querySelectorAll('[data-modal]')
      this.mainWrapper = document.querySelector('.main-wrapper')
      this.IS_OPEN = 'is-open'
      this.IS_BLURED = 'is-blured'
      this.DATA_MODAL = 'data-modal'
      this.DATA_PARAM = 'data-param'
      this.CLOSE_CLASS= '.modal__close'
      this.BACKDROP_CLASS= '.modal__backdrop'
    }

    getClose (e) {
      return e.querySelector(this.CLOSE_CLASS)
    }

    getBackdrop (e) {
      return e.querySelector(this.BACKDROP_CLASS)
    }

    getDataModal (e) {
      return e.getAttribute(this.DATA_MODAL)
    }

    getDataParam(e) {
      return e.getAttribute(this.DATA_PARAM)
    }

    addOpen (e) {
      e.classList.add(this.IS_OPEN)
      this.mainWrapper.classList.add(this.IS_BLURED)
    }

    removeOpen (e) {
      e.classList.remove(this.IS_OPEN)
      this.mainWrapper.classList.remove(this.IS_BLURED)
    }

    _checkIfDoubleValue (value) {
      if (value < 10) {
        return '0' + String(value)
      }
      return value
    }

    _dateFormat (timestamp) {
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
      return new Function('return `' + template + '`').call(dateObject)
    }

    _formatAmount(amount) {

      return Math.abs((amount / Ether).toFixed(6)) + " ESS";
    }

    getSingleTransaction (hash, id) {
      console.log(hash)
      const self = this
      $.ajax({
        type: "GET",
        url: localUrl + '/tx/' + hash,
        success: function (data) {
          const transactionContent = document.getElementById('singleTransactionContent')

          transactionContent.innerHTML = 
            '<div>' +
              '<div class="modal__info-row">' +
                '<div class="modal__info-title">Hash</div>' +
                '<div>' + data.hash + '</div>' +
              '</div>' +
              '<div class="modal__info-row">' +
                '<div class="modal__info-title">Block hash</div>' +
                '<div>' + data.blockHash + '</div>' +
              '</div>' +
              '<div class="modal__info-row">' +
                '<div class="modal__info-title">From</div>' +
                '<div>' + data.from + '</div>' +
              '</div>' +
              '<div class="modal__info-row">' +
                '<div class="modal__info-title">To</div>' +
                '<div>' + data.to + '</div>' +
              '</div>' +
            '</div>' +
            '<div class="modal__info-table">' +
              '<div class="modal__info-table-row">' +
                '<div class="modal__info-table-td">' +
                  '<div class="modal__info-title">Amount</div>' +
                  '<div>' + self._formatAmount(data.value) + '</div>' +
                '</div>' +
                '<div class="modal__info-table-td">' +
                  '<div class="modal__info-title">Gas Limit</div>' +
                  '<div>' + data.gas + '</div>' +
                '</div>' +
                '<div class="modal__info-table-td">' +
                  '<div class="modal__info-title">Gas Price</div>' +
                  '<div>' + self._formatAmount(data.gasPrice) + '</div>' +
                '</div>' +
                '<div class="modal__info-table-td">' +
                  '<div class="modal__info-title">Block Number</div>' +
                  '<div>' + data.blockNumber + '</div>' +
                '</div>' +
              '</div>' +
              '<div class="modal__info-table-row">' +
                '<div class="modal__info-table-td">' +
                  '<div class="modal__info-title">Nonce</div>' +
                  '<div>' + data.nonce + '</div>' +
                '</div>' +
                '<div class="modal__info-table-td">' +
                  '<div class="modal__info-title">Gas Used</div>' +
                  '<div>' + data.gasUsed + '</div>' +
                '</div>' +
                '<div class="modal__info-table-td">' +
                  '<div class="modal__info-title">Fee</div>' +
                  '<div>0 ETH</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div>' +
              '<div class="modal__info-row">' +
                '<div class="modal__info-title">Data</div>' +
                '<div>' + data.input + '</div>' +
              '</div>' +
            '</div>'

          const modal = document.querySelector(`#${id}`)

          self.addOpen(modal)
        }
      })
    }

    getSingleBlock (blockNumber, id) {
      const self = this
      $.ajax({
        type: "GET",
        url: localUrl + '/block/' + blockNumber,
        success: function (data) {
          const blockContent = document.getElementById('singleBlockContent')
          const blockTitle = document.getElementById('singleBlockTitle')

          blockTitle.innerHTML = 'Block ' + data.number
          blockContent.innerHTML = 
            '<div>' +
              '<div class="modal__info-row">' +
                '<div class="modal__info-title">Hash</div>' +
                '<div>' + data.hash + '</div>' +
              '</div>' +
              '<div class="modal__info-row">' +
                '<div class="modal__info-title">Parent hash</div>' +
                '<div>' + data.parentHash + '</div>' +
              '</div>' +
              '<div class="modal__info-row">' +
                '<div class="modal__info-title">Miner</div>' +
                '<div>' + data.miner + '</div>' +
              '</div>' +
            '</div>' +
            '<div class="modal__info-table">' +
              '<div class="modal__info-table-row">' +
                '<div class="modal__info-table-td">' +
                  '<div class="modal__info-title">Gas Limit</div>' +
                  '<div>' + data.gasLimit.toLocaleString('ua') + '</div>' +
                '</div>' +
                '<div class="modal__info-table-td">' +
                  '<div class="modal__info-title">Difficulty</div>' +
                  '<div>' + data.difficulty.toLocaleString('ua') + '</div>' +
                '</div>' +
                '<div class="modal__info-table-td">' +
                  '<div class="modal__info-title">Size</div>' +
                  '<div>' + data.size + '</div>' +
                '</div>' +
                '<div class="modal__info-table-td">' +
                  '<div class="modal__info-title">Uncles</div>' +
                  '<div>' + data.uncles.length + '</div>' +
                '</div>' +
              '</div>' +
              '<div class="modal__info-table-row">' +
                '<div class="modal__info-table-td">' +
                  '<div class="modal__info-title">Gas Used</div>' +
                  '<div>' + data.gasUsed + '</div>' +
                '</div>' +
                '<div class="modal__info-table-td">' +
                  '<div class="modal__info-title">Total Difficulty</div>' +
                  '<div>' + data.totalDifficulty + '</div>' +
                '</div>' +
                '<div class="modal__info-table-td">' +
                  '<div class="modal__info-title">Transactions</div>' +
                  '<div>' + data.transactions.length + '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div>' +
              '<div class="modal__info-row">' +
                '<div class="modal__info-title">Timestamp</div>' +
                '<div>' + self._dateFormat(data.timestamp) + ' (2 hours ago)</div>' +
              '</div>' +
            '</div>' +
            '<div class="modal__btn-group">' +
              '<button class="btn btn--secondary" id="get-previous-block">PREVIOUS</button>' +
              '<button class="btn btn--secondary" id="get-next-block">NEXT</button>' +
            '</div>'

          const previousBlockButton = document.getElementById('get-previous-block')
          const nextBlockButton = document.getElementById('get-next-block')

          previousBlockButton.addEventListener('click', function () {
            self.getSingleBlock(blockNumber - 1, id)
          })
          nextBlockButton.addEventListener('click', function () {
            self.getSingleBlock(blockNumber + 1, id)
          })

          const modal = document.querySelector(`#${id}`)

          self.addOpen(modal)
        }
      })
    }

    openModal () {
      const _this = this

      this.modalLinks.forEach(function (e) {
        e.addEventListener('click', function () {
          const id = _this.getDataModal(e)
          let types = id.split('-')
          const param = _this.getDataParam(e)
          if (types[0] === 'block') {
            _this.getSingleBlock(param, id)
          } else if (types[0] === 'transaction') {
            _this.getSingleTransaction(param, id)
          }
        })
      })
    }

    closeModal () {
      const _this = this

      this.modal.forEach(function (e) {
        _this.getClose(e).addEventListener('click', function () {
          _this.removeOpen(e)
        })
        _this.getBackdrop(e).addEventListener('click', function () {
          _this.removeOpen(e)
        })
      })
    }

    init () {
      this.openModal()
      this.closeModal()
    }
  }

  class ToggleSearch {
    constructor(btn, form) {
      this.btn = document.querySelector(btn)
      this.form = document.querySelector(form)
      this.input = this.form.querySelector('input')
      this.IS_OPEN = 'is-open'
    }

    init () {
      const _this = this
      this.btn.addEventListener('click', function () {
        _this.form.classList.toggle(_this.IS_OPEN)
        _this.input.focus()
      })
    }
  }

  if (document.querySelector('.dropdown')) {
    const dropdown = new Dropdown('.dropdown')
    dropdown.init()
  }
  if (document.querySelector('.modal')) {
    const modal = new Modal('.modal')
    modal.init()
  }
  if (document.querySelector('.js-search-form')) {
    const toggleSearch = new ToggleSearch('.js-search-btn', '.js-search-form')
    toggleSearch.init()
  }
})();
