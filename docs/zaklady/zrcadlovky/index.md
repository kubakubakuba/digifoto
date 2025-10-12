---
outline: deep
---

# Základy focení se zrcadlovkami

## Typy foťáků

**Zrcadlovky**

* Světlo objektivu odráží zrcadlo do hledáčku, při fotce se zrcadlo vyklopí nahoru, odkryje se senzor a pořídí se fotka  
* Výhoda je, že hledáček funguje i při vypnutém foťáku a tím, že je vše fyzické, nežere to baterii  
* Nevýhoda je, že vždy vidím jen to, co objektiv, takže občas musím ladit nastavení po pořízení fotky, kdy si ji prohlédnu a zjistím, že je třeba moc tmavá

**Bezzrcadlovky**

* Z názvu vypovídá, že chybí zrcadlo, díky tomu je tělo mnohem menší  
* Výhodou je, že díky elektronickému hledáčku už při nastavování expozice, ISO a clony vidím, jak bude fotka vypadat a pořídím ji na první dobrou  
* Nevýhoda je, že menší tělo má menší baterku a elektronický hledáček žere vždy baterku

## Typy objektivů

**Pevné (prime lens)**

* Mají pevné ohnisko, od cca $8\text{mm}$ (extrémně široké a rybí oka) po cca $1500\text{mm}$ (tkzv. teleobjektivy)  
* Výhodou je, že se v nich optické členy nehýbou, díky tomu bývá jejich kresba lepší  
* Nevýhoda je, že pokud chci něco přiblížit, musím k tomu prostě přijít blíž

**Zoom**

* Mají rozsah ohniska, které pokrývají, běžně $10-35\text{mm}$, $24-105\text{mm}$ atd. zase až po telata $300-500\text{mm}$  
* Výhodou je, že jsou mnohem univerzálnější  
* Nevýhodou je, že občas mají horší kresbu, většina také nemá pevnou clonu, to znamená, že nejnižší clona např. $f/3.5$ pro objektiv $24-105\text{mm}$ platí pouze pro $24\text{mm}$ a při $105\text{mm}$ už je nejnižší nastavitelná clona $f/5.6$, takže mi prakticky zoomem tmavne fotke a zvyšuje se hloubka pole

**Elektronické**

* Mají automatické ostření, některé mají i pohyblivé členy pro stabilizaci obrazu  
* Se zrcadlovkou komunikují pomocí spojů na bajonetu, takže zrcadlovka nastavuje clonu a provádí ostření sama, současně vše ukládá do metadat fotky, takže lightroom a ostatní programy vědí s jakými parametry byla fotka pořízena

**Manuální**

* Nemají žádnou elektroniku, člověk ostří ručně a také ručně nastavuje clonu  
* Výhodou je, že objektivy jsou většinou levnější, denní focení je s nimi náročnější kvůli ostření (v hledáčku člověk dokonalou ostrost mnohdy nepozná), ale na noční focení to nevadí, takže jde o skvělé řešení poměr cena / výkon pro astrofoto

### Bajonety

* Každý výrobce používá trochu jiný závit objektivu a má jinak rozmístěné elektronické kontakty, takže je třeba kupovat objektivy, které jsou s daným tělem foťáku kompatibilní, Canon EF, RF, Nikon F a Z atd.

## Základní pojmy

**Clona (aperture)**

* Tvořená lamelami v objektivu  
* Rozšiřuje a zužuje paprsek světla dopadající na senzor, tím omezuje množství světla  
* Se změnou clony se mění hloubka plochy ostrosti, čím vyšší clona, tím vyšší hloubka ostrosti  
* Běžně se setkáváme s clonami  $f/2$ - $f/16$
* Čím nižší clona, tím vyšší nároky na kresbu objektivu, na “plnou díru” (nejnižší clona) většina objektivů ukazuje některé vady

**ISO**

* Citlivost senzoru na světlo  
* Čím vyšší ISO, tím citlivější senzor je, ale s násobením světelného signálu se násobí i šum  
* Běžné rozsahy jsou od 100 po desítky až stovky tisíc

**Uzávěrka (shutter speed)**

* Fyzický člen na senzoru, který zakrývá senzor po pořízení fotky, rychlost uzávěrky určuje na jakou dobu se senzor odkryje a sbírá světlo  
* Čím delší doba uzávěrky, tím více světla se nahromadí, není třeba tak vysoké ISO a tím fotka tolik nešumí, ale může být rozmazaná kvůli pohybu foťáku nebo objektu

<Inline style="width: 80%; display: block; margin: auto;">/img/zrcadlovky/photography-shutter-speed-aperture-iso-cheat-sheet-chart-fotoblog-hamburg-daniel-peters-11.webp</Inline>

:::info Okénko o expoziční hodnotě
Všechna nastavení dohromady (Clona + ISO + Rychlost užávěrky) mění výslednou světelnost fotografie. S tím souvisí koncept expoziční hodnoty (EV), která je definovaná jako:
$\text{EV} = \log_2 \frac{N^2}{t} = 2\log_2 N - \log_2 t$, kdy $N$ je hodnota clony ($f$-číslo) a $t$ je expoziční čas v sekundách.

Podle výsledné hodnoty (a podmínek při focení), pak lze určit, jestli bude objekt
přeexponovaný nebo podexponovaný.
Pokud vás zajímá víc, tak si doporučuji přečíst něco o [expozičním trojúhelníku](https://exposure-triangle.com/exposure-value-explained-in-easy-words/), 
:::

**Rozměry senzoru**

* Full frame - vychází z rozměru kinofilmu, tedy $36 \text{mm} \times 24 \text{mm}$ a ohniskové vzdálenosti objektivů se určují podle něj, často jej využívají profesionální fotografové  
* APS-C - jde o menší senzor používaný ve většině těl foťáků, má Crop faktor, což znamená, že si musím násobit ohniskovou vzdálenost objektivu menším senzorem, abych se dobral skutečné vykreslené vzdálenosti na menším senzoru, pro Canon to je $\times 1.6$, pro Nikon a Sony potom $\times 1.5$

<Inline style="width: 49%; display: block; margin: auto;">/img/zrcadlovky/Sensor_sizes_overlaid_inside.svg</Inline>

**Bahtinova maska**
<Inline style="width: 70%; display: block; margin: auto;">/img/zrcadlovky/how-make-bahtinov-mask-7511d1c.webp</Inline>
* Udělátko která nám může pomoct s ostřením objektivu na hvězdy. Když jí dáme před objektiv zobrazí se kříž vzniklý difrakcí světla, a jedná čárka navíc, která se pohybuje s mírou zaostření. Správně zaostřeno máme, když se nám podaří tuto čárku umístit přesně do středu kříže.
<Inline>/img/zrcadlovky/bahtinov-mask-focus-calibration-dwarf-ii.webp</Inline> 
* Generátor bahtinových mask pro 3D tisk [zde](https://skeye.rocks/tools/mask/) a do svg pro tisk [zde](https://satakagi.github.io/tribahtinovWebApps/Bahtinov.html).

## Vady objektivů

**Sférická aberace**

* Vada objektivu, kdy se objekty v rozích zdají být deformované do kruhu, patrnější je to při použití foťáku s full frame senzorem, který vykresluje objektiv až úplně na hranu, pokud objektiv přicloníme, vadu částečně zredukujeme

**Chromatická aberace**

* Barevná vada, kdy se projevuje nemožnost zaostřit všechny barvy na stejné ohnisko na senzoru, moderní objektivy mají korekční členy, ale vždy aspoň malá vzniká, většinou k její redukci pomáhá objektiv přiclonit


## Režimy focení

### Auto (P)

<Inline style="width: 49%">/img/zrcadlovky/auto_mode.jpg</Inline>

* Foťák vše dělá jak uzná za vhodné a fotku podle sebe zpracuje (nevhodné pro jakékoli trochu serióznější focení)

### Aperture Priority (Av)

<Inline style="width: 49%">/img/zrcadlovky/av_mode.jpg</Inline>

* Foťák respektuje nastavenou clonu a ISO a patřičně podle toho mění délku expozice, člověk má o starost méně, ale při nedostatku světla se může expozice protáhnout natolik, že budou fotky rozmazané při focení z ruky

### Shutter Priority (Tv)

<Inline style="width: 49%">/img/zrcadlovky/tv_mode.jpg</Inline>

* Foťák respektuje nastavenou délku expozice a ISO patřičně podle toho mění clonu, není to úplně ideální řešení, protože mezi jednotlivými fotkami se může hodně měnit hloubka ostrosti.  

### Manual (M)

<Inline style="width: 49%">/img/zrcadlovky/manual_mode.jpg</Inline>

* Můžeme si úplně manuálně zvolit jak chceme fotit.

### Bulb (B)

<Inline style="width: 49%">/img/zrcadlovky/bulb_mode.jpg</Inline>

Někdy jako vlastní mód, někdy schován v manuálním módu. Umožňuje dělat delší expozice než meximální v manuálním módu (typicky 30s).

## JPEG nebo RAW?

JPEG ukládá data v komprimovaném souboru (lossy compression), nějaká část dat se tedy ztratí. Výsledkem je ale menší soubor. Namísto toho soubory typu RAW (.CR2, .CR3 u Canonů) nejsou typické fotky, ale čístý tok dat z
foťáku. Bez žádných úprav ani ztrát dat. Chceme tedy v naprosté většině případů používat RAWy.

## Dobrá nastavení pro astrofotografii

Dobré pravidlo pro nastavení fotoaparátu je, že chceme vypnout všechna automatická nastavení a nastavit vše manuálně na předem dané hodnoty, které máme pod kontrolou. To zamezí změnám mezi fotkami, o kterých nemusíme vědět.

**Výstupní typ obrázků nastavte na RAW**

<Inline style="width: 49%">/img/zrcadlovky/raw.jpg</Inline> <Inline style="width: 49%">/img/zrcadlovky/raw_settings.jpg</Inline>

**Vypněte automatické otáčení obrázků**

<Inline style="width: 49%">/img/zrcadlovky/rotate.jpg</Inline>

**Vypněte automatické čistění senzoru**

<Inline style="width: 49%">/img/zrcadlovky/sensorcleaning.jpg</Inline> <Inline style="width: 49%">/img/zrcadlovky/autoclean.jpg</Inline>

Kdyby se senzor automaticky čistil při vypnutí/zapnutí, změnil by tak rozprostření prachu, který jsme schopni z fotek odstranit korekčními snímky. Je tedy dobré toto nastavení vypnout.

### Méně potřebná

**Změňte nastavení picture style (není potřeba nastavovat)**

<Inline style="width: 49%">/img/zrcadlovky/picture_style.jpg</Inline>

Nastavení je dobré dát na neutrální (dá se změnit i přes domovskou obrazovku).

**Změňte nastavení vyvážení bílé (není potřeba nastavovat)**

Není nutně potřeba nastavovat, ale pokud budete mít například modifikovaný foťák se kterým fotíte přes den, může se hodit manuální nastavení vyvážení bílé. Jde to i ignorovat a pak všechno manuálně sladit v Lightroomu.

<Inline style="width: 49%">/img/zrcadlovky/awb.jpg</Inline> <Inline style="width: 49%">/img/zrcadlovky/awb_settings.jpg</Inline>

Nastavení dejte na daylight (teplota 5200K). Auto lighing optimizer na *OFF*.
