(() => {
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

    addOpen (e) {
      e.classList.add(this.IS_OPEN)
      this.mainWrapper.classList.add(this.IS_BLURED)
    }

    removeOpen (e) {
      e.classList.remove(this.IS_OPEN)
      this.mainWrapper.classList.remove(this.IS_BLURED)
    }

    openModal () {
      const _this = this

      this.modalLinks.forEach(function (e) {
        e.addEventListener('click', function () {
          const id = _this.getDataModal(e)
          const modal = document.querySelector(`#${id}`)

          _this.addOpen(modal)
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
