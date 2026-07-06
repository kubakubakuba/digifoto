import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'
import 'uno.css'
import './style.css'
import Inline from './components/Inline.vue'
import PhotoCompare from './components/PhotoCompare.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('Inline', Inline)
    app.component('PhotoCompare', PhotoCompare)
  },
  setup() {
    const route = useRoute()

    const initZoom = () => {
      mediumZoom('.vp-doc img', {
        background: 'var(--vp-c-bg)'
      })
    }

    onMounted(() => {
      initZoom()
    })

    watch(
      () => route.path,
          () => nextTick(() => initZoom())
    )
  }
}
