import { defineConfig } from 'vitepress'
import markdownItMathjax3 from 'markdown-it-mathjax3'
import markdownItFootnote from 'markdown-it-footnote'
import UnoCSS from 'unocss/vite'
import unoConfig from '../../unocss.config.ts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  vite: {
    plugins: [
      UnoCSS(unoConfig)
    ],
  },
  title: "Digifoto",
  description: "Návody pro zpracování astrofotografií",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Domů', link: '/' },
      { text: 'Astronomická expedice', link: 'https://astronomickaexpedice.cz' }
    ],

    sidebar: [
      {
        text: 'Základy',
        items: [
          { text: 'Astronomické vybavení', link: '/zaklady/vybaveni' },
          { text: 'Ovládání zrcadlovky', link: '/zaklady/zrcadlovky' },
          { text: 'Magic lantern', link: '/zaklady/magic' }
        ]
      },
      {
        text: 'Krajinky',
        link: '/krajinky/'
      },
      {
        text: 'S.A.J.R.I.',
        link: '/sajri/'
      },
      {
        text: 'N.I.N.A.',
        link: '/nina/'
      },
      {
        text: 'PixInsight',
        items: [
          { text: 'Nový návod', link: '/pixinsight/'},
          { text: 'Originální návod', link: '/pixinsight/orig/' }
        ]
      },
      {
        text: 'Siril',
        link: '/siril/'
      },
      {
        text: 'GraXpert',
        link: '/graxpert/'
      },
      {
        text: 'Seti Astro\'s Suite',
        link: '/seti/'
      },
      {
        text: 'Úpravy fotek v PS',
        link: '/photoshop/'
      },
      {
        text: 'Planetární astrofoto',
        link: '/planety/'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kubakubakuba/digifoto' }
    ],

    editLink: {
        pattern: 'https://github.com/kubakubakuba/digifoto/edit/main/:path'
    },

    search: {
        provider: 'local'
    },
  },
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark'
    },
    config: (md) => {
      md.use(markdownItMathjax3);
      md.use(markdownItFootnote)
    }
  },
})