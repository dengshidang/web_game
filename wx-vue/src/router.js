import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [


 ]

const router = new Router({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  const store = router.app.$options.store
  store.dispatch('updateBackNumber', { number: 1 })

  if (store.state.isWxInitOk) {
    next()
  } else {
    const interval = setInterval(() => {
      if (store.state.isWxInitOk) {
        clearInterval(interval)
        next()
      }
    }, 500)
  }
})
export default router
