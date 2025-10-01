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
    date: '30. 09. 2025',
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
      youtube: 'https://youtu.be/Vj4buoZ_Nuc',
    },
  },
  {
    name: 'Krajinářská astrofotografie',
    date: 'Listopad 2025',
    sortDate: '2025-11-01',
    summary: 'Focení a zpracování krajinářské astrofotografie.',
    link: '/workshopy/krajinky',
    details: {
      name: 'Krajinářská astrofotografie',
      summary: 'Workshop se zaměřuje na postupy focení, a následné zpracovávání krajinářské astrofotografie.',
      links: [
        { title: 'Skripty a procesy', url: '#' },
        { title: 'Ukázková data', url: '#' },
      ],
      //youtube: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
