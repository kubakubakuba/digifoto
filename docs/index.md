---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Digifoto"
  text: 
  tagline: "Návody pro zpracování astrofotografií"

features:
  - title: Základy
    icon: 📷
    details: Základy používání fotoaparátu
    link: /zaklady/

  - title: Focení krajinek
    icon:
      src: /img/sequatorlogo.webp
    details: Focení a zpracování krajinářské astrofotografie.
    link: /krajinky/

  - title: N.I.N.A.
    icon:
      src: /img/ninalogo.png
    details: Návody na focení deepsky objektů pomocí programu N.I.N.A.
    link: /nina/

  - title: Planetární astrofoto
    icon: 🪐
    details: Návody pro zpracování planetární astrofotografie
    link: /planety/
    
  - title: Zpracování fotek v PixInsightu
    icon: 
      src: /img/pixilogo.png
    details: Základní návody pro zpracování fotek v PixInsightu
    link: /pixinsight/
    
  - title: Master PixInsight
    icon: 
      src: /img/masterpixi.webp
    details: Pokročilejší návody pro zpracování fotek v PixInsightu
    link: /master_pixinsight/nastaveni/

  - title: Zpracování fotek v Sirilu
    icon:
      src: /img/Siril.svg
    details: Návody pro zpracování fotek v Sirilu
    link: /siril/

  - title: GraXpert
    icon:
      src: /img/graxpert.jpg
    details: Odšumění, dekonvoluce a odstranění gradientů pomocí GraXpertu
    link: /graxpert/

#  - title: Seti Astro's Suite
#    icon:
#      src: /img/astrosuite.png
#    details: Zpracování fotek pomocí nástrojů od Seti Astro
#    link: /seti/

  - title: Úpravy fotek v PS
    icon:
      src: /img/pslogo.svg
    details: Návody pro úpravy fotek v Adobe Photoshop
    link: /photoshop/

  - title: Úpravy fotek v LrC
    icon:
      src: /img/Adobe_Photoshop_Lightroom_Classic_CC_icon.svg
    details: Návody pro rychlé úpravy fotek v Adobe LIghtroom Classic
    link: /lightroom/

  - title: Linux
    icon:
      src: /img/Tux.svg
    details: Instalace software na Linuxu a jejich FOSS alternativy
    link: /linux/

---

<script setup>
import WorkshopsList from './.vitepress/theme/components/WorkshopsList.vue'
</script>

<WorkshopsList />
