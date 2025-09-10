import DefaultTheme from 'vitepress/theme'
import InlineImg from './components/InlineImg.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('InlineImg', InlineImg)
  }
}