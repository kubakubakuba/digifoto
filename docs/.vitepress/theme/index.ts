import DefaultTheme from 'vitepress/theme'
import type { App } from 'vue'
import 'uno.css'
import './style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
  },
}
