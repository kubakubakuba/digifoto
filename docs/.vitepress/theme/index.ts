import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'
import 'uno.css'
import './style.css'
import Inline from './components/Inline.vue'
import PhotoCompare from './components/PhotoCompare.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('Inline', Inline)
    app.component('PhotoCompare', PhotoCompare)
  }
}