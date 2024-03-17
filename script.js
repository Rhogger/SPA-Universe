import router from './src/modules/router.js'

router.add('/', 'src/pages/home.html')
router.add('/universe', 'src/pages/universe.html')
router.add('/exploration', 'src/pages/exploration.html')
router.add('/error-404', 'src/pages/page-not-found.html')

router.handle()

window.onpopstate = () => router.handle()
window.route = () => router.handle()
