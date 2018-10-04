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
        });
      });

      window.addEventListener('click', function (e) {
        if (e.target.closest('.dropdown')) {
          return
        } else {
          _this.removeAllOpen(_this.dropdowns)
        }
      })
    }
  }

  if (document.querySelector('.dropdown')) {
    const dropdown = new Dropdown('.dropdown')
    dropdown.init()
  }
})();
