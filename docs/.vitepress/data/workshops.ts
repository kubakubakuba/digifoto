export interface Workshop {
  name: string;
  date: string;
  sortDate: string;
  summary: string;
  link: string;
  details: {
    name: string;
    summary: string;
    links: { title: string; url: string }[];
    youtube: string;
  };
}

export const workshops: Workshop[] = [
  {
    name: 'Úvod do fotografie',
    date: '30. 09. 2025, 18:00',
    sortDate: '2025-09-30',
    summary: 'Naučíme se úplné základy o focení a lehkém zpracování fotek.',
    link: '/workshopy/intro',
    details: {
      name: 'Úvod do focení',
      summary: `Tento workshop je zaměřen na úplné začátky focení.
- Co jsou to digitální zrcadlovky, a co jsou to objektivy.
- Jak nastavit foťák a co jednotlivá nastavení znamenají. Co je to clona, uzávěrka a ISO.
- Jaké vady objektivy mají a co s nimi můžeme dělat.
- Lehké intro do Lightroomu.`,
      links: [
        { title: 'Základy', url: '/zaklady/zrcadlovky/' },
        { title: 'Lightroom', url: '/lightroom/' },
        { title: 'Výpisky', url: '/pdf/Základy focení.pdf' },
      ],
      youtube: 'https://www.youtube.com/embed/Vj4buoZ_Nuc',
    },
  },
  {
    name: 'Krajinářská astrofotografie',
    date: '11. 11. 2025, 18:00',
    sortDate: '2025-11-11',
    summary: 'Focení a zpracování krajinářské astrofotografie.',
    link: '/workshopy/krajinky',
    details: {
      name: 'Krajinářská astrofotografie',
      summary: `Workshop se zaměřuje na postupy focení, a následné zpracovávání krajinářské astrofotografie.
- Jak vůbec funguje senzor
- Co je senzor
- Bitová hloubka
- Kvantová účinnost
- Bayerova maska
- Šum
- Typy korekčních snímků
- Focení krajinek
- Photoshop
- Sequator`,
      links: [
        { title: 'Krajinky', url: '/krajinky/' },
        { title: 'Od fotonu po pixel', url: '/zaklady/odfpp/'}
      ],
      youtube: 'https://www.youtube.com/embed/mtZitWnGyas',
    },
  },
  {
    name: 'Pokročilejší zpracování astrofotografií',
    date: '22. 12. 2025, 18:00',
    sortDate: '2025-12-22',
    summary: 'Zpracovaní krajinek a typy fotografických sestav.',
    link: '/workshopy/krajinky_zpracovani',
    details: {
      name: 'Hugin, zpracování ve PhotoShopu a typy astrofotografických sestav',
      summary: `Workshop se zaměřuje na focení, zpracovaní fotografií a jejich spojení v programu Hugin. Taktéž si probereme jaké typy astrofotografických sestav existují.`,
      links: [
        { title: 'Hugin', url: 'https://hugin.sourceforge.io/' }
      ],
      youtube: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
  },
  {
    name: 'Planetární astrofoto',
    date: '24. 03. 2026, 19:00',
    sortDate: '2026-03-24',
    summary: 'Focení a zpracování planetární astrofotografie.',
    link: '/workshopy/planety',
    details: {
      name: 'Planetární astrofoto',
      summary: `Focení a zpracování planetární astrofotografie.`,
      links: [
        { title: 'Návod na focení planetárního astofota', url: '/planety/' },

        { title: 'AstroSurface', url: 'https://astrosurface.com/pageuk.html' },
        { title: 'AutoStakkert!', url: 'https://www.autostakkert.com/wp/download/' },
        { title: 'SharpCap', url: 'https://www.sharpcap.co.uk/sharpcap/downloads' },
        { title: 'PIPP', url: 'https://pipp.software.informer.com/' },
        { title: 'ImPPG', url: 'https://greatattractor.github.io/imppg/' }

      ],
      youtube: 'https://www.youtube.com/embed/PFZQnHoSMQ8',
    },
  },
    // {
    //   name: 'Zpracování fotek v PixInsight',
    //   date: 'Listopad 2025',
    //   sortDate: '2025-11-01',
    //   summary: 'Pro pokročilejší fotografy, kteří se chtějí naučit efektivně zpracovávat své snímky v programu PixInsight.',
    //   link: '/workshopy/pixinsight-processing',
    //   details: {
    //     name: 'Zpracování fotek v PixInsight',
    //     summary: 'Workshop se zaměřuje na kompletní workflow zpracování deep-sky objektů v PixInsight, od kalibrace a skládání po finální úpravy.',
    //     links: [
    //       { title: 'Skripty a procesy', url: '#' },
    //       { title: 'Ukázková data', url: '#' },
    //     ],
    //     youtube: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    //   },
    // },
];
