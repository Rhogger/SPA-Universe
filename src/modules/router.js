class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    const target = event.target || event.srcElement
    const href = target.href

    if (href !== window.location.href) {
      window.history.pushState({}, "", event.target.href)
      this.handle()
    }
  }

  handle() {
    const { pathname } = window.location

    const route = this.routes[pathname] || this.routes['/error-404']

    fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector('main').innerHTML = html
      })
  }
}

export default new Router()