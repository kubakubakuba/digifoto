import { defineConfig } from 'vitepress'
import markdownItMathjax3 from 'markdown-it-mathjax3'
import markdownItFootnote from 'markdown-it-footnote'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default defineConfig({
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
        text: 'N.I.N.A.',
        link: '/nina/'
      },
      {
        text: 'Zpracování fotek v PixInsightu',
        link: '/pixinsight/'
      },
      {
        text: 'Zpracování fotek v Sirilu',
        link: '/siril/'
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
    ]
  },
  markdown: {
    config: (md) => {
      md.use(markdownItMathjax3);
      md.use(markdownItFootnote)
    }
  },
})
