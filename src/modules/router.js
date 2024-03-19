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

    console.log(route);

    this.changeBackground(route)

    fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector('main').innerHTML = html
      })
  }

  changeBackground(route) {
    const body = document.querySelector('body')

    console.log(body);

    let url

    if (route == 'src/pages/home.html' || route == 'src/pages/page-not-found.html') {
      url = 'src/assets/images/mountains-universe-1.png'
    } else if (route == 'src/pages/universe.html') {
      url = 'src/assets/images/mountains-universe-2.png'
    } else if (route == 'src/pages/exploration.html') {
      url = 'src/assets/images/mountains-universe-3.png'
    }

    console.log(url);

    body.style.backgroundImage = `url(${url})`

    console.log(body.style);
  }
}

export default new Router()