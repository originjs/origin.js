import '../global.css'
import {
  createRouter,
  createWebHistory,
  onBeforeRouteUpdate,
  onBeforeRouteLeave,
  useRoute,
  useRouter,
} from 'vue-router'
import { createApp, ref, reactive, defineComponent, computed } from 'vue'

// override existing style on dev with shorter times
if (!__CI__) {
  const transitionDuration = '0.5s'
  const styleEl = document.createElement('style')
  styleEl.innerHTML = `
.fade-enter-active,
.fade-leave-active {
  transition: opacity ${transitionDuration} ease;
}
.child-view {
  position: absolute;
  transition: all ${transitionDuration} cubic-bezier(0.55, 0, 0.1, 1);
}
`
  document.head.append(styleEl)
}

const Home = defineComponent({
  template: `
    <div>
      <h2>Home</h2>
    </div>
  `,
})

const logs = ref<string[]>([])

const state = reactive({
  enter: 0,
  update: 0,
  leave: 0,
})

/**
 * creates a component that logs the guards
 * @param name
 */
function createTestComponent(key: string) {
  return defineComponent({
    name: key,
    // mounted() {
    //   console.log('mounted Foo')
    // },
    beforeRouteEnter(to, from, next) {
      state.enter++
      logs.value.push(`${key}: enter ${from.path} - ${to.path}`)
      next(vm => {
        // @ts-expect-error
        vm.enterCallback++
      })
    },
    beforeRouteUpdate(to, from) {
      if (!this || this.key !== key) throw new Error('no this')
      state.update++
      this.selfUpdates++
      logs.value.push(`${key}: update ${from.path} - ${to.path}`)
    },
    beforeRouteLeave(to, from) {
      if (!this || this.key !== key) throw new Error('no this')
      state.leave++
      this.selfLeaves++
      logs.value.push(`${key}: leave ${from.path} - ${to.path}`)
    },

    setup() {
      onBeforeRouteUpdate((to, from) => {
        logs.value.push(`${key}: setup:update ${from.path} - ${to.path}`)
      })
      onBeforeRouteLeave((to, from) => {
        logs.value.push(`${key}: setup:leave ${from.path} - ${to.path}`)
      })
      return {}
    },
    data: () => ({ key, enterCallback: 0, selfUpdates: 0, selfLeaves: 0 }),
    template: `
    <div :id="key">
    {{ key }}
    <p class="enterCbs">{{ enterCallback }}</p>
    <p class="update">{{ selfUpdates }}</p>
    <p class="leave">{{ selfLeaves }}</p>
    </div>
  `,
  })
}

const Foo = createTestComponent('Foo')
const Bar = createTestComponent('Bar')
const One = createTestComponent('One')
const Two = createTestComponent('Two')
const Aux = createTestComponent('Aux')

const webHistory = createWebHistory('/guards-instances')
const router = createRouter({
  history: webHistory,
  routes: [
    { path: '/', component: Home },
    {
      path: '/foo',
      component: Foo,
    },
    {
      path: '/f/:id',
      component: Foo,
    },
    // TODO: test that the onBeforeRouteUpdate isn't kept
    {
      path: '/b/:id',
      component: Bar,
    },
    {
      path: '/named-one',
      components: {
        default: One,
        aux: Aux,
      },
    },
    {
      path: '/named-two',
      components: {
        default: Two,
        aux: Aux,
      },
    },
  ],
})

// preserve existing query
const originalPush = router.push
router.push = to => {
  if (typeof to === 'string') {
    const resolved = router.resolve(to)
    return router.push({
      path: to,
      query: {
        testCase: router.currentRoute.value.query.testCase,
        ...resolved.query,
      },
    })
  } else {
    return originalPush({
      ...to,
      query: {
        testCase: router.currentRoute.value.query.testCase,
        ...to.query,
      },
    })
  }
}

const app = createApp({
  setup() {
    const router = useRouter()
    const route = useRoute()

    const testCase = computed<string>({
      get: () => {
        const { testCase } = route.query
        return !testCase || Array.isArray(testCase) ? '' : testCase
      },
      set(testCase) {
        router.push({ query: { ...route.query, testCase } })
      },
    })

    return { state, logs, testCase }
  },
  template: `
    <h1>Instances</h1>
    <p>Using {{ testCase || 'default' }}</p>
    <button id="test-normal" @click="testCase = ''">Use Normal</button>
    <button id="test-keepalive" @click="testCase = 'keepalive'">Use Keep Alive</button>
    <button id="test-transition" @click="testCase = 'transition'">Use Transition</button>
    <button id="test-keyed" @click="testCase = 'keyed'">Use keyed</button>
    <button id="test-keepalivekeyed" @click="testCase = 'keepalivekeyed'">Use Keep Alive Keyed</button>
    <pre>
route: {{ $route.fullPath }}
enters: {{ state.enter }}
updates: {{ state.update }}
leaves: {{ state.leave }}
    </pre>
    <pre id="logs">{{ logs.join('\\n') }}</pre>
    <button id="resetLogs" @click="logs = []">Reset Logs</button>
    <ul>
      <li><router-link to="/">/</router-link></li>
      <li><router-link to="/foo">/foo</router-link></li>
      <li><router-link to="/f/1">/f/1</router-link></li>
      <li><router-link to="/f/2">/f/2</router-link></li>
      <li><router-link to="/f/2?bar=foo">/f/2?bar=foo</router-link></li>
      <li><router-link to="/f/2?foo=key">/f/2?foo=key</router-link></li>
      <li><router-link to="/f/2?foo=key2">/f/2?foo=key2</router-link></li>
      <li><router-link id="update-query" :to="{ query: { n: (Number($route.query.n) || 0) + 1 }}" v-slot="{ route }">{{ route.fullPath }}</router-link></li>
      <li><router-link to="/named-one">/named-one</router-link></li>
      <li><router-link to="/named-two">/named-two</router-link></li>
    </ul>

    <template v-if="testCase === 'keepalive'">
      <router-view v-slot="{ Component }" >
        <keep-alive>
          <component :is="Component" class="view" />
        </keep-alive>
      </router-view>
    </template>
    <template v-else-if="testCase === 'transition'">
      <router-view v-slot="{ Component }" >
        <transition name="fade" mode="">
          <component :is="Component" class="view" />
        </transition>
      </router-view>
    </template>
    <template v-else-if="testCase === 'keyed'">
      <router-view :key="$route.query.foo || undefined" class="view" />
    </template>
    <template v-else-if="testCase === 'keepalivekeyed'">
      <router-view v-slot="{ Component }" >
        <keep-alive>
          <component :is="Component" :key="$route.query.foo || undefined" class="view" />
        </keep-alive>
      </router-view>
    </template>
    <template v-else>
      <router-view class="view" />
      <router-view class="aux-view" name="aux" />
    </template>
  `,
})

app.use(router)

window.r = router

app.mount('#app')
