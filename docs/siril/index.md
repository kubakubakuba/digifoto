---
outline: deep
---

# Zpracování DSO v Sirilu

## Úvod
Máme nafocené fotky deep-sky objektu a kalibrační snímky. Co s nimi udělat, abychom dostali krásnou fotku, kterou můžeme publikovat nebo vytisknout Tento návod vám ukáže, jak na to, pomocí programu **Siril**. 
V první části návodu, věnované **preprocessingu**, se naučíme, jak z nafocených fotek deep-sky objektu v RAWu dostat složenou fotku. 
V druhé části návodu vysvětlím, jak Siril ovládat, a k čemu slouží nejdůležitější funkce, které máme k dispozici.
V třetí části návodu, věnované **processingu**, se naučíme, jak tuto složenou fotku dobře zpracovat, odstranit z ní vady, a dostat ven detaily a barvy, abychom ji poté mohli exportovat do grafického programu (GIMP nebo Photoshop), kde provedeme finální úpravy - **postprocessing**.
Tento návod vychází z oficiálních návodů [1](https://siril.org/tutorials/) a také z oficiální dokumentace [2](https://siril.readthedocs.io/en/stable/). Podle zkušeností z mé několikaleté praxe doplním a vysvětlím zásadní pojmy a postupy, a upozorním na možné problémy. Některé pojmy budou záměrně zjednodušeny a vynechány pro jednoduchost a stručnost.
Na závěr je nutné zmínit, že **při editování záleží na pořadí procesů**. Pokud bychom je aplikovali v jiném pořadí, nebudou tak efektivní, v některých případech dokonce napáchají víc škody než užitku. Proto je vhodné podle návodu (ať už tohoto nebo např. i toho oficálního) postupovat opravdu krok za krokem, minimálně do chvíle, než provedmee hlavní transformaci histogramu.
Hodně štěstí při editování vašich fotek!

*Gibbon*
	
:::warning Technická poznámka
Tento návod je psán podle stavu ke dni 11.06.2026. Aktuální verze Sirilu je v1.4.3. Vzhledem k tomu, že Siril prodělává v současné době dynamický vývoj, a hodně věcí je v něm doplňováno a měněno, tak se mohou některé detaily později měnit. Základy ale zůstávají (až na malou reorganizaci seznamu procesů) naštěstí téměř stejné. Oficiální tutoriál na stránkách Sirilu [1](https://siril.org/tutorials/), který byl vytvořen pro v0.99.x, je stále platný.
:::

### Začínáme
Jdeme tedy na věc. Než začnete, ujistěte se ,že máme k dispozici následující: fotky ve formátu RAW (pokud jste fotili s foťákem) nebo FITS (pokud jste fotili s barevnou kamerou):
	- Nejméně 20 lightů (samotné fotky objektu) - ideálně 100 a více (čím víc, tím líp!)
	- 20 darků (víc neuškodí)
	- 20 biasů (víc neuškodí)
	- 20 flatů (víc neuškodí)
	- Dark Flaty není se Sirilem třeba fotit.
	- Minimálně 150 GB, lépe 200GB-300GB místa na disku - Siril totiž "zaseká" hodně místa během preprocessingu (po jeho skončení lze opět smazat)
	- ![](/img/siril/6a2d98e0dc28bfd16931ceb906935fd8.avif)

### Režim vývojáře (jen na Windows) a režim spánku
Na Windows musíme poprvé udělat ještě jeden krok navíc. Půjdeme do nastavení Windows a zapneme si režim vývojáře. Stačí to udělat jen jednou, poprvé. Windows bude dál fungovat normálně poté, co to zapneme.
![](/img/siril/9ad4771b4e77a8be568692ccfdad7f09.avif)
Následně také musíme počítač připojit do sítě, pokud jsme tak již neučinili. Siril totiž velmi rychle vypotřebuje baterii, protože skládání a zpracování je výpočetně náročné, Vypneme režim spánku při napájení ze sítě, aby se během skládání počítač neuspal.
![](/img/siril/d26371dedde42298027f7fc4a5e84d8a.avif)

### Cvičná data
Pro tento tutoriál použijeme moje data ze S.A.J.R.I.ho z Expy 2025 na galaxii IC 342. [3] Tato data jsou ideální příklad na vyzkoušení si skládání. Níže uvádím jejich základní parametry:
	Objekt: Spirální galaxie IC 342 (souhvězdí Žirafy)
	Souřadnice: RA: 03h 46min 49s, Dec: +68° 05' 01''
	Teleskop: S.A.J.R.I.
	Ohnisko: 650mm
	Clonové číslo: f/7.0
	Místo pozorování: Sutiny
	Datum pozorování: 19.8.2025
	Exp. čas: 17100s (57x300s)
	Teplota kamery: -5°C
	Lighty: 60
	Darky: 30
	Flaty: 19
	Biasy: 30
	Velikost surových dat: 6.7GB
	Velikost po složení: 43,3GB 
Tato data jsem vybral kvůli jejich poměrně malé velikosti a snadnému zpracování. Neobsahují totiž nějaké závažnější vady, jako např. silný a komplexní gradient a color cast, extrémní šum,  a objekt je jasný, dobře definovaný a zabírá jen malou část záběru. Tyto složitější případy budou předmětem dalších dílů návodu.

### Uložení fotek
Fotky musíme po přetažení z SD karty nebo disku, kde je máme uložené, uspořádat určitým způsobem, aby je automatický skript Sirilu zpracoval a nedošlo k chybě. Ve složce, do které překopírujeme všechny RAWy, vytvoříme 4 podsložky: light, darks, biases, flats. Je nutné je pojmenovat přesně takto, tj. vše malým! Do těchto 4 podložek naše fotky roztřídíme. Na Linuxu je postup zcela stejný.
![](/img/siril/4ae8cff725de9454cfa27204b6fc5967.avif)
Složky s roztřízenými fotkami

## Preprocessing
### Jak to funguje?
Tento krok je klíčový - Siril zpracuje naše lighty a kalibrační snímky (tj. darky, biasy a flaty), zkonvertuje je na FITSy (pokud jde o RAWy z foťáku), opraví lighty pomocí kalibračních snímků a následně je složí, čímž se zprůměruje šum a objekt vynikne, viz [4](https://omega.swpelc.eu/expa/digi/Od%20fotonu%20po%20pixel.pdf). Výsledkem je pak 1 složená fotka, kterou zpracujeme v další části.

### OSC Preprocessing skript
#### První kroky v Sirilu
Otevřeme Siril v 1.4.3. Tohle uvidíme po otevření.
![](/img/siril/7533d9024e5045c3a2908ad9e95d2eae.avif)

#### Nastavení home directory
Klikneme na modrou ikonu domečku a nastavíme domovskou složku, tj. složku ve které jsou naše 4 podsložky s fotkami.
![](/img/siril/90fc228fc37ccb7e01fd964ffe21bca5.avif)
Ikona domečku vlevo nahoře

Rozklikneme a v stromu složek označíme složku, ve které máme podsložky. Pak klikneme na Open.
![](/img/siril/741231f344c721a28597b75a82cf2a95.avif)
Nyní už budeme mít nastavenou správnou cestu k našim fotkám.
![](/img/siril/4da0daaaf9bea40c4e2fee43d5539f4b.avif)

#### Spuštění skriptu
Nejprve zavřeme všechny běžící programy, které nám na počítači právě běží. Ovlivňovaly by totiž výkon skriptů, a dlouhý běh preprocessingového skriptu by se tím zbytečně zpomalil.
A nyní už konečně spustíme samotný skript.
Klikneme na Scripts vlevo nahoře, a pak klikneme na OSC_Preprocessing. (Já tam mám custom skripty, vám se zobrazí cca 6 základních.) Tím se skript spustí. Poprvé se může objevit hláška ve smyslu, že skripty dávají horší výsledky. Prostě ji odklikneme a ignorujeme.
![](/img/siril/b06868af7b760569296200ccdfd4882e.avif)
Rozkliknutí nabídky skriptů
![](/img/siril/0afec66cc4c7a8c422c525bfa0e07274.avif)
Stav po spuštěni skriptu

#### Běh skriptu OSC_Preprocessing
Vpravo na konzoli se nám začnou vypisovat různé věci. Od této chvíle nemusíme nic dělat, vše proběhne automaticky. Dokud se neobjeví tmavě červená chyba znamenající selhání, tak je vše v pořádku. A teď už zbývá jen čekat...
![](/img/siril/b9aa7eb70cf940abaceb8532867deb43.avif)
Hlášky po spuštění

### Jak dlouho čekat?
Preprocessing obvykle trvá něco mezi 1 a 5 hodinami, v závislosti na počítači, počtu fotek, a jejich velikosti (ta je úměrná počtu megapixelů snímače). Proces je naštěstí plně automatický a nevyžaduje pozornost, než doběhne. Proto můžete mezitím zajít poslechnout si přednášku nebo do Gaybaru.
Až se vrátíte zpátky, tak budete mít plný disk průbežných FITSů (vznikají konverzí, zpracováním a zarovnáním našich dat) a jednu složenou fotku  - **result** , se kterou budeme dál pracovat.
![](/img/siril/506ba32cd6c75d5a6411239122871eea.avif)
Složená fotka po načetní do Sirilu

## Ovládání Sirilu
Než přejdeme k processingu, tak nejprve vysvětlím základní ovládání Sirilu, aby bylo nadále jasné, jak s naší fotkou pracovat a jak celý program ovládat.
### Otevření složené fotky v Sirilu
Opět otevřeme Siril v1.4.3. Po otevření klikneme vlevo nahoře na Open. Objeví se okno se systémem souborů v naší domvoské složce. Klikneme na soubor **result_XXXXs.fit** (kde XXXX je celkový exp. čas složené fotky) a poté vpravo dole na Open, čímž otevřeme naši složenou fotku.![](/img/siril/e56e13c4f1df96a8b9e2197bb5919a38.avif)
Po otevření uvidíme na pracovní ploše téměř kompletně černou fotku. V této fázi je to ale správně, naše data jsou totiž zatím lineární.
![](/img/siril/85c2dc592438247aa21aeee580e9f4ca.avif)
### Zobrazovací režimy
Dole vlevo máme dva modré posuvníky, nastavené na 65535 a 0, a nastavení zobrazovacího režimu (Display mode), které je momentálně na Linear. Toto defaultní nastavení je jediné, které nám zobrazí fotku tak, jak skutečně vypadá! Všechna ostatní nastavení slouží proto, abychom lépe viděli, s čím pracujeme.
![](/img/siril/ffff8e15e273689e3b9e028c166a3733.avif)
Změníme tedy zobrazovací režim na AutoStretch. Modré posuvníky necháme tak, jak jsou.
![](/img/siril/0b1fada41f4ca0faa0344cc61c4071b7.avif)
Nyní konečně vidíme, jak náš objekt na složené fotce vypadá. 
![](/img/siril/0cfb258bb171dc464a271a8082796a7c.avif)
Na první pohled je to sice pěkné, je tu ale však spoustu vad (např. gradienty, nevyvážené barvy, artefakty ze skládání na kraji, nevýrazné detaily), které postupně odstraníme, čímž naši fotku výrazně zlepšíme. 
### Ovládání pracovní plochy
Nyní se naučíme, jak pracovat s fotkou, kterou máme načtenou a vidíme ji na pracovní ploše v levé části.
### Myš, výběr a zoomování
Když vezmeme myš a dáme ji na pracovní plochu, objeví se nám malý křížek. Točením prostředního kolečka myši fotku zoomujeme, zoomuje se nám místo kde máme křížek umístěný myší. Když podržíme levé tlačítko myši a potáhneme, tak vybereme oblast fotky.
![](/img/siril/d104abfc5828c4f65e63e5010f4b64ed.avif)
Náš výběr můžeme snadno měnit. Pokud dáme myš na okraj,  tak můžeme výběr zvětšovat/zmenšovat horizontálně (myš na svislém okraji výběru), vertikálně (myš na vodorovném okraji výběru), a diagonálně (myš v rohu výběru), a to tak, že opět podržíme levé tlačítko myši. Když klikneme doprostřed výběru, můžeme celé okno výběru posunout libovolným směrem.
![](/img/siril/18004e246a0d7f4d20f6299d24b02230.avif)
Zde vidíme jednotlivé možnosti zvětšení/zmenšení, a za který okraj vzít.
Pokud klikneme pravým tlačítkem, tak se nám zobrazí nabídka podrobností, kterou můžeme dál rozbalit. V této nabídce jsou důležité 3 položky
**Selection** - Umožňuje upřesnit výběr, k dispozici jsou typické  poměry stran používané ve fotografii a videu, např. 3:2, 1:1 nebo 16:9, a pevný poměr stran. 
![](/img/siril/0747dfcbfefa11bc76984492a7b36490.avif)
**Crop** - Tato možnost je velmi důležitá. Pokud na ni klikneme, tak fotka bude oříznuta na naši aktuální selekci.
![](/img/siril/cbdceac20188b8d6ba4094459341dc76.avif)
Fotka po oříznutí.
**ROI (Region Of Interest)** - Vyberme oblast, kterou chceme editovat. Veškeré procesy se pak aplikují jen na tuto oblast. Po vybrání je oblast zvýrazněna červeně. Druhá možnost pak slouží ke zrušení vybrané oblasti. Po zrušení ROI oblasti se úpravy zase aplikují na celou fotku.
![](/img/siril/a39322b47a725a5ac30ef903fb8adb8d.avif)
Vidíme, že po nastavení ROI je selekce orámovaná červeně, ne žlutě. Pro zajímavost tedy např. apikujeme Median Filter.
Nyní, když otevřeme proceduru, tak nám selekce zezelená, a v proceduře se objeví nové tlačítko ROI Preview, které nám danou úpravu aplikuje jen na vybranou oblast. Apply vedle toho dělá to, co předtím - tj. provede úpravu na celé fotce.
![](/img/siril/e9ba32662b46f3a52fb60aca893ae1b2.avif)
Situace s aktivním oknem procedury při vybraném ROI
![](/img/siril/91d559b839f20cb04dc76c25192d2523.avif)
Po Apply to ROI vidíme náhled - proces Median Filter (rozmazání) byl proveden na zkušební selekci.
ROI editování slouží hlavně pro vyzkoušení procedur, které jsou pomalé a méně spolehlivé, jako např. dekonovluce. Místo jejich výpočtu pro celou fotku se výpočet o řády rychleji provede na malém výřezu, kde zhodnotíme, jestli jsme spokojeni. Pokud ano, tak  Pokud ne, tak zkusíme znovu a ušetříme čas počítáním úpravy jen pro malý segment. Pokud okno procesu zavřeme, tak úpravy pomocí Apply to ROI se neuloží a celá fotka se vrátí do normálu




### Ikonky
Vpravo dole a vpravo nahoře máme několik ikonek, které nám slouží k ovládání naší fotky, kterou máme v Sirilu na pracovní ploše. Na následujícím obrázku jsem zvýraznil ty nejdůležitější, které budeme nejvíc potřebovat. Každou barvou je zvýrazněna jedna důležitá sekce ikonek, které spolu nějak souvisí.
![](/img/siril/ff212666ff353f0afb56afbe6a99d6a8.avif)
**Bílá sekce: Open a Home** - Velmi důležitá tlačítka, která jsme už použili v preprocessingu. Open otevře fotku (viz preprocessing), šipka vedle umožňuje otevřít nedávné. Modré tlačítko domečku je Home -  nastavuje domovskou složku, ve které pracujeme (viz preprocessing).
**Žlutá sekce: Undo a Redo** - **UNDO - šipka doleva je nejdůležitější tlačítko v celém Sirilu.** Vrátí zpět poslední proces. Při podržení myší se zobrazí, jaký proces cheme vrátit zpět. 
Vedle je **REDO** - šipka doprava - pokud se rozmyslíme a proces chceme přeci jen nakonec provést. Dá se klikat undo/redo střídavě pro srovnání, pokud si nejsme jistí jestli je výsledek procesu dobrý.
POZOR! Procesy spuštěné pomocí příkazu v konzoli pomocí Undo vrátit nelze! V tomto případě Undo vrátí fotku do stavu před posledním procesem, který nebyl proveden příkazem v konzoli.
**Tyrkysová sekce: Save** - Další dvě velmi důležitá tlačítka. **Save** uloží úpravy na naší fotce, fotka je uložena pod stejným názvem a původní verze je přepsána. Lepší je proto použít tlačítko šipky dolů velde - dalo vy se nazvat třeba **Save As** - které nám umožní soubor přejmenovat a příp. i změnit typ (třeba z FITS na TIFF nebo naopak). 
Doporučuji používat Save As a dělat si několik kopií, zvlášť ze začátku.
**Oranžová sekce - Zoom a 1:1** - Tlačítka této sekce slouží k zoomování fotky na pracovní ploše.
![](/img/siril/16c010b944b53a4cbcb18d43520b61c8.avif)
Výchozí stav před zoomováním. 
**Minus** - Zoom Out - oddaluje fotku na prac. ploše.
![](/img/siril/5a9dd67a3747b694ae632ca8ff4c61ad.avif)
Odzoomovaná fotka po použití minusu.
**Plus**-Zoom In - přibližuje fotku na pracovní ploše
![](/img/siril/fe38d04ddf52b5fd2d4248ef1cbefdd9.avif)
Přizoomovaná fotka po použití plusu.
**Fit To Screen** - nastaví fotku na takové zvětšení, aby se celá právě vešla na pracovní plochu.
**1** - nastaví fotku na zvětšení 1:1, tj. 100%. U velkých fotek (což je většina) tato funkce zvětšuje hodně.
![](/img/siril/676ae2389ec8f282d873903e8b51f09f.avif)
**Zelená sekce: Rotace a mirror** - Tlačítka této sekce slouží k otáčení a zrcadlení celé fotky. Pro názornost (aby šly lépe poznat strany) jsem dočasně nahrál na pracovní plochu železniční fotku z Dlouhé Třebové.
![](/img/siril/90dc03375be0fe5043a848fdd0458a4d.avif)
Výchozí stav
**Rotate Left** - Otočí celou fotku o 90 st. doleva.
![](/img/siril/5ffbfbe8989b0b5c34d2cbee4c96902b.avif)
**Rotate Right** - Otočí celou fotku o 90 st. doprava.
![](/img/siril/f5f74701195adf965e61dc11ccd08468.avif)
**Horizontal mirror** - Zrcadlí fotku podle horizontální osy souměrnosti.
![](/img/siril/d77b86bfbae659612fcda8c0ae460830.avif)
**Vertical mirror** - Zrcadlí fotku podle vertikální osy souměrnosti.
![](/img/siril/89f311ead62d9e798bb5cfe1e6c4a204.avif)

**Červená sekce: Colormap** -  Mění zobrazení naší fotky - buď na negativ (levá černobílá hvězdička), nebo na duhovou colormapu (pravá barevná hvězdička). Ani jedno nevypadá hezky, ale může nám to poskytnout užitečné informace o fotce. Např. na negativu můžeme mnohem snáze vidět, kam až sahají slabá vnější ramena galaxie, což na pozitivu není zcela zřejmé. Lze dokonce zapnout oboje zároveň, duhová colormapa je pak obráceně. Není nutné je používat často, obvykle jen tehdy, když dostáváme z fotky slabé detaily nebo kontrolujeme gradienty.
POZOR! Stejně jako AutoStretch Viewer Mode je to jen změna zobrazení, naše fotka se reálně nemění!
Zde srovnání všech 4 možností:
![](/img/siril/42bfe2cdeecd9d7534039a5cae7b0d03.avif)
Klasický pozitiv - naše původní fotka (AutoStretch zobr. režim)
![](/img/siril/85999cd8ebe61ebfd2260e2fba59faff.avif)
Negativ - Zde jdou krásně vidět slabá vnější ramena galaxie.
![](/img/siril/c48dcb247a933a6b079e271882ca8322.avif)
Duhová colormapa - Na galaxii sice nevidíme téměř nic, ale vlevo nahoře a dole máme krásně zvýrazněn gradient.
![](/img/siril/b9e2094f1da860b4868e3a6928f2f5ee.avif)
Negativ duhové colormapy - Podobné jako duhová colormapa, ale tentokrát vidíme opačný konec gradientu vpravo nahoře a dole.
**Magentová sekce: Sequence**  - Zde máme jediné tlačítko, které nám zobrazí sníky, které máme nahrané, pokud aktuálně pracujeme se sekvencí.
## Processing
### Jak to funguje? 
V této části vezmeme naši složenou fotku - **result**, kterou postupně upravíme do téměř finální podoby. Nejprve odstraníme nežádoucí efekty  - artefakty a gradienty, a pak srovnáme barvy. Vylepšíme snímek pomocí dekonvoluce, a transformujeme histogram. Po finálních úpravách pak téměř dokončený snímek exportujeme do Photoshopu nebo GIMPu.

### Nahrání
Nejprve nahrajeme na pracovní plochu fotku, kterou jsme získali po dokončení preprocessingu. Poté nastavíme zobrazovací režim na AutoStretch.
![](/img/siril/aeab84268970c78030b21de0d51d0d94.avif)
### Výběr a crop
Prvním krokem je naši fotku oříznout. Je to nutné, protože skládáním a zarovnáním kalibrovaných lightů vzniknou artefakty a gradienty, které je třeba odstranit.
### Výběr
Vybereme (postup viz výše) oblast fotky tak, aby byla co největší, ale zároveň neobsahovala žádné gradienty a artefakty na kraji. Výběr by také neměl nic výraného "uříznout" napůl.
POZOR! V tuto chvíli nevybíráme jen malou oblast podle uměleckého záměru, jak chceme fotku prezentovat, to provádíme až na konci celého zpracování!
![](/img/siril/85b413b5dbf4a74bd7cca913be88e6ca.avif)
Detail pravého horního rohu složené fotky, kde vidíme artefakty za skládání a směr gradientu ve fotce.
![](/img/siril/68ec25d0047fcc6c629663fa9edb28ab.avif)
Takto NE! Oblast je příliš malá, pokud teď ořízneme příliš, později to nelze vzít zpět!
![](/img/siril/bfd6b9f61906d78fc2a084d594b55b7d.avif)
Téměř správně, ale zde jsme uřízli hvězdu. Musíme tedy výběr ještě upravit.
![](/img/siril/96c0de0b67fc2e2c333a83d8167e17a2.avif)
Správně provedený výběr oblasti po malé změně oproti předchozímu případu.
### Crop
Po správném provedení výběru fotku ořízneme. Máme 2 možnosti, jak to udělat: buď přes menu rozkliknuté na prac. ploše (viz výše), nebo napíšeme do konzole příkaz:
~~~siril
crop
~~~
![](/img/siril/212f1a80ba702945a67ef67a0ba5d696.avif)
Dáme ENTER, čímž ho provedeme. Tím je fotka oříznuta, automaticky se nám nafituje na pracovní plochu.
![](/img/siril/6e6127c3d675e251a743a83633d77b7e.avif)
### Background Extraction
Nyní se zbavíme gradientu na pozadí naší fotky.
Otevřeme proces pomocí **Image Processing -> Background Extraction**.
![](/img/siril/ced11bb36588e6994a0dfcd8b174df4d.avif)
Po otevření okna procesu klikneme na **Generate**, čímž se nám zobrazí červené čtverečky - vzorky na fotce.
![](/img/siril/53ee0aa754beed15dca941376ac1aa60.avif)
Automatika však neudělá přesnou práci, pro dobrý výsledek musíme vzorky trochu sami upravit. Levým kliknutím myši na dané místo vzorek přidáme, pravým kliknutím vzorek odebereme. Cílem je rovnoměrné rozložení zorků na obrázku, zároveň by ale žádní vzorky neměly být na našem objektu ani jiných výrazných prvcích  - např. jasných hvězdách. 
![](/img/siril/bfec618c611e26447235046ec313d417.avif)
Stav po odebrání vzorků z naší galaxie a jasných hvězd.

Nyní klikneme na **Compute Background.** Tím se napočítá gradient podle našich vzorků, a následně se odečte. 
![](/img/siril/9558614fecd892881600daa8948ab555.avif)
Stav po Compute Background - gradient je pryč.
Pokud jsme s výsledkem spokojeni, tak klikneme na Apply, čímž se úpravy uloží. Nesmíme na to zapomenout!
![](/img/siril/51d6cae4e789e92b01df8b083e5337f0.avif)
Stav po dokončení Background Extraction
### Color Calibration
Nyní musíme srovnat barvy naší fotky. K tomu použijeme proces zvaný nepřekvapivě Color Calibration. Otevřeme **Image Processing -> Color Calibration**. 
![](/img/siril/8c8c1688bc939386d3f44fdda8804b53.avif)
Po rozkliknutí zvolíme první možnosti **Color Calibration...**
![](/img/siril/5a12b889defd0019755fbd41a82e7de3.avif)
Po otevření okna procesu musíme postupně učnit dva výběry, nejprve výběr pro **Background reference** a pak pro **White reference**.
Pro **Background reference** si vybereme malý obdélník pozadí, tj. obdélníkovou oblast mimo náš objekt, ve které nejsou žádné hvězdy. Snažíme se vybrat co největší, ale pár pixelů stačí. Jakmile to máme, klikneme na **Use current selection** v oknu procesu.
![](/img/siril/fa2d31e3dd3f5e092a473a0c741be7cc.avif)
Pro **White reference** si najdeme průměrnou, středně jasnou hvězdu, tj. ne jednou z nejjasnějších, ale ani ne úplně malou a nevýraznou, která má "průměrnou barvu" - tj. většina ostatních hvězd na fotce má podobnou barvu. Nevhodná je také hvězda, která splývá s další, tj. chceme samostatnou hvězdu.
![](/img/siril/6bfabacb06fe93d9a1f8499f56252fc0.avif)
Zeleně zakroužkované hvězdy jsou vhodní kandidáti na výběr pro **White reference**, červeně zakroužkované jsou nevhodné - důvod je uveden.
Výběr přes zvolenou hvězdu umístíme tak, abychom ji vybrali "napůl" - tzn. nevybíráme jen jasný střed, což je málo, ale ani celý disk hvězdy, což je moc.
![](/img/siril/8cbe084e7092e87ebe2915ac90675fc2.avif)
Příliš velký výběr - bereme i okolí hvězdy.
![](/img/siril/99ade1e91c4649d70151736a968721f6.avif)
Příliš malý výběr (obdélník výběru zdůrazněn) - bereme jen jasný střed.
![](/img/siril/b0d8625036772634200db861cdce9a96.avif)
Ideální výběr - hvězda je vybrána "napůl".
Opět klikneme na **Use background selection**, tentokrát dole.
![](/img/siril/5d4172e9e95d001457488152e5c68d94.avif)
Nakonec klikneme na **Apply**, čímž se podle našich výběrů vypočítá korekce a barvy se srovnají.
![](/img/siril/ab0c91d0961efd15229eda4a5f6f6e39.avif)
Stav po provedení Color Calibration.
Nyní je dobrá chvíle si uložit pracovní verzi fotky (viz výše). Vraování, že *"Viewer mode is not linear"* odklikneme.
![](/img/siril/e9f31e8b57902c042e8c7f51458821ba.avif)
### Dekonvoluce
**Dekonvoluce** je matematická metoda zpracování obrazu, která se snaží zpětně odstranit rozmazání způsobené optikou dalekohledu, atmosférickým seeingem a dalšími vlivy, které rozptylují světlo bodového zdroje (například hvězdy) do širší skvrny místo ostrého bodu. Tento rozptyl se popisuje pomocí tzv. **PSF (point spread function)** – funkce, která říká, jak se bod světla "rozmázl" na snímku. 
**Dekonvoluční algoritmy** se snaží tento proces matematicky obrátit a stáhnout rozmazané detaily zpět do ostřejší podoby, čímž zvýrazní jemné struktury v galaxiích, mlhovinách nebo hvězdných shlucích. 
Je důležité používat dekonvoluci opatrně a na dostatečně kvalitních datech s dobrým poměrem signálu k šumu – jinak hrozí vznik nepřirozených artefaktů, např. "ringing" kolem hvězd nebo zesílení šumu.
Jak již bylo zmíněno výše, dekonvoluce je poměrně složitá a náročná, a často se nám nepovede na první pokus. Z tohoto důvodu jsme pracovní verzi fotky před tímto procesem uložili.

Nyní k dekonvoluci v Sirilu. Otevřeme **Image Processing -> Filters -> Deconvolution**.
![](/img/siril/a1df4008cbafaeced1c86dc48b7b9334.avif)
![](/img/siril/8988833006868c979f2536f4b09be426.avif)
Otevře se nám poměrně složité okno tohoto procesu. Provedení dekonvoluce v Sirilu má celkem 4 kroky.
**Generování PSF** - Nejrpve musíme nechat Siril vypočítat malou pomocnou fotku, tzv. PSF. Ta popisuje rozmazání hvězd. Měla by tedy mít podobný tvar a velikost jako hvězdy na našem snímku. 
POZOR - Počítání PSF může pěknou chvíli, třeba i minutu nebo dvě trvat, je to ale v pořádku.
PSF zkusíme nejprve vypočítat pomocí defaultní možnosti tj. **Blind deconvolution pomocí l0 Descent**. Pokud tímto způsobem dostaneme nevyhovující PSF tak použijeme druhou možnost, tj. **PSF from stars.**
![](/img/siril/84d5f342dcc3b4546760413a183e17aa.avif)
Generování PSF - naše fotka ukázka, kde metoda 1 nefunguje, tj. použijeme metodu 2 - PSF from stars.
![](/img/siril/27ea8b96dd590d6617c8d4a6ebc92feb.avif)
Tentokrát už dostáváme "rozumnou" PSF, která naší fotce odpovídá.

Po získání PSF si ji můžeme (ale není to nezbytně nutné) uložit na později - např. abychom ji nemuseli počítat znovu kdyby Siril crashnul během dekonvoluce. To uděláme pomocí tlačítka šipky dolů (červeně označeno), PSF se uloží jako TIF fotka o straně pár desítek pixelů. Pomocí tlačítka (zeleně) nad tím lze pak fotku při dalším pokusu načíst a tím tuto PSF můžeme znova použít.
![](/img/siril/f9e566770fcc8e4d909e60925c977d5f.avif)

Konečně můžeme spustit dekonvoluci samotnou. Použijeme defaultní **Richardson-Lucy metodu**. Ostatní 2 metody, tj. **Split Bregman** a **Wiener filter**, fungují na planety a Slunce, ale bohužel ne na DSO, tj. pro tento návod nebudou užitečné. 
Parametry necháme defaultní, klikneme na **Apply**, čímž spustíme dekonvoluci samotnou a necháme běžet. Obvykle to zabere několik minut.
![](/img/siril/ea8060a70398ea40940e188c143d7401.avif)


![](/img/siril/c5bf66db2ec9ecd79314f08afb96620f.avif)
Detail hvězd před provedením dekonvoluce, pro srovnání.

Po několika minutách obdržíme výsledek. Opět nám naše vzorová fotka slouží jako dobrá ukázka problémů, které můžou nastat. V tomto případě se totiž objevil **ringing** kolem hvězd.
![](/img/siril/2a7778f34dd5931914bab128b8be86da.avif)
Naštěstí to má řešení - dáme **Undo**, PSF ponecháme na **Previous PSF** (ta nám v paměti zůstane). Následně **snížíme **Step size na 0.0001 a snížíme počet iterací**, např. na 7. Pak dekonvoluci znovu spustíme.
![](/img/siril/ef0bd4b69e7ca1080f87d8df553dc8c6.avif)
![](/img/siril/5511cd347a6e42de8059468eca251443.avif)
V tomto případě už nám dekonvoluce dala pěkný výsledek, můžeme tedy pokračovat dál k poslednímu kroku, kterým je **Histogram Transformation**.

### Histogram Transformation
Zbývá nám poslední krok, abychom dokončili processing fotky. Musíme stretchnout její histogram. Připomíním, že celou dobu jsme jen pracoval s hezkým náhledem pomocí zobrazovacího režimu AutoStretch. Přepneme tedy zpět na Linear a posuneme modré posuvníky na 65535 a 0, abychom viděli, jak fotka skutečně vypadá.
![](/img/siril/b0684838937734b67088a2c9a1ba899f.avif)
Na první pohled byla všechna ta práce marná, a nic jsme neudělali. Naše fotka pořád vypadá jako "tma v tunelu". Nyní to tedy vyřešíme stretchnutím fotky. K tomu nám Siril nabízí 5 možností: pomocí **příkazu autostretch**, pomocí **Generalized Hyperbolic Transform (GHT)**, pomocí **Histogram Transformation**, které používá Midtone Transfer Function - funguje stejně jako Levels v GIMPu/Photshopu. a pomocí **Curves**, tj. křivek. Poslední je stará metoda **Asinh Transofrmation**, která už je dnes překonaná.
V tomto tutoriálu použijeme **Histogram Transformation**, což je nejjednodušší.
Otevřeme tedy **Image Processing -> Stretches -> Histogram Transformation**.
![](/img/siril/3315d26e35b4ee20cfb9fbf96730153c.avif)
![](/img/siril/83a698f4e192b28edc92ececdc878c60.avif)
Po otevření okna procesu klikneme na **symbol S-křivky** dole, čímž se provede automatický stretch, ekvivalentní tomu, co nám ukazoval stejnojmenný zobrazovací režim. Výsledek se nám zobrazí jako preview. Zkontrolujeme, že hodnota clipnutých pixelů je méně než 1%. Pokud ano (většinou to tak bude), je vše v pořádku. Pokud ne, je fotka problematická a měli bychom stretch provést manuálně. Pokud jsme spokojení s výsledkem, klikneme na **Apply**, čímž se změny uloží, pak klikneme na **Close**.
![](/img/siril/40740e724fc504b803062663e38bf647.avif)
### Uložení a export fotky
Finální verzi fotky si raději uložíme pod novým názvem jako FITS. 
PAbychom mohli provést **post-processing**, tj. finální doladění, např. ve Photoshopu nebo GIMPu, tak musíme naši fotku vyexportovat jako **TIFF** (koncovka .tif/.tiff). Zde je potřeba dávat pozor! Defaultní nastavení totiž nefunguje! Nejprve klasicky klikneme na **tlačítko šipky** vedle tlačítka **Save**. Poté v okně klineme vpravo dole na **Supported Image Files**, v rozkliknuté nabídce na **TIFF FIles** a nakonec na **Save**. **A nyní to nejdůležitejší!  V OKNĚ NAHOŘE MUSÍ BÝT STANDARD TIFF!!! ASTRO-TIFF  (defaultní možnost) totiž nic jiného než Siril neumí přečíst!**. Poté můžeme ještě nastivt bitvou hloubku na **16-bit unsigned integer** kvůli kompatibilitě se Starnetem++. Následně klikneme na **Save**. 

![](/img/siril/aad931a2e084b79ae9c853b6c7696489.avif)
![](/img/siril/c02f29089a9aba1c64ac9026d2783ceb.avif)
![](/img/siril/fe8d6dfabcfe7e4f86123818631a3013.avif)

Tím je processing naší fotky hotov! Nyní fotku buď prohlásíme za hotovou, nebo odhvězdíme pomocí Starnet++, následně nahrajeme odhvězděnou fotku např. do GIMPu nebo Photshopu, otevřeme fotku hvězd jako vrstvu, a doladíme dle libosti. Zde už není přesný postup záleží na vaších umšleckých preferencích a konrétním objektu a kompozici.
![](/img/siril/dd8b2e4d9c61b04b0da4b64a9843fb18.avif)
Finální výsledek po processingu



## Bibliografie
[1] Siril, Tutorials. https://siril.org/tutorials/ (accessed 11 June 2026).


[2] Siril. Welcome to Siril’s documentation! https://siril.readthedocs.io/en/stable/ (accessed 11 June 2026).

[3] Flajšar, J. Raw FITS astrophotos of IC 342 (2025). Version 1.0. Sutiny, 2025. (accessed 11 June 2026).
Veleba, J. Raw FITS astrophotos of M31 (2025). Version 1.0. Unpublished raw data, available from the authors upon reasonable request. [offline server: Expa (192.168.0.2 (Samba 4.17.12-Debian))] 

[4] Veleba, J. Od fotonu po pixel. https://omega.swpelc.eu/expa/digi/Od%20fotonu%20po%20pixel.pdf (accessed 11 June 2026).
