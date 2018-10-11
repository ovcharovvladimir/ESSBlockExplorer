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

  class Pagination {
    constructor (group, currentPage) {
      let page = currentPage.split('=')
      if (page[0] === 'page') {
        this.page = page[1]
      }
      this.paginationGroup = document.querySelector(group)
      this.buttons = this.paginationGroup.querySelectorAll('button')
    }

    init () {
      const self = this
      for (let button of this.buttons) {
        if (button.classList.contains('pagination__prev')) {
          button.addEventListener('click', function() {
            let prevPage = self.page - 1
            window.location.search = 'page=' + prevPage
          })
        } else if (button.classList.contains('pagination__next')) {
          button.addEventListener('click', function () {
            let nextPage = Number(self.page) + 1
            window.location.search = 'page=' + nextPage
          })
        }
      }
    }
  }

  if (document.querySelector('.dropdown')) {
    const dropdown = new Dropdown('.dropdown')
    dropdown.init()
  }
  if (document.querySelector('.pagination')) {
    const pagination = new Pagination('.pagination', window.location.search.substring(1))
    pagination.init()
  }
  if (document.querySelector('.js-search-form')) {
    const toggleSearch = new ToggleSearch('.js-search-btn', '.js-search-form')
    toggleSearch.init()
  }

})();
