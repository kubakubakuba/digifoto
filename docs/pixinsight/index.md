---
outline: deep
---

# Zpracování fotek v Pixi

## BPP (Batch preprocessing)
![BPP](img/bpppath.jpg)

Otevřeme v script -> Batch Processing -> BatchPreprocessing

![BPP](img/bpp.jpg)

Načteme snímky přes Add Bias, Add Darks, Add Flats, Add Lights, pokud už máme mastery stačí přidat pouze jeden (nutné potom zakliknout use master vpravo)

zaklikněte CFA images pokud jsou obrázky barevné

dvojklikem na jeden light ho nastavíte jako registrační snímek (snímky se zarovnávají na něj)

nastavte output directory

poté už jenom klikněte na Diagnostics a Run, počkejte dlouhou dobu

## Základní věci
Ctrl + A pro strečování fotky, Ctrl + F12 pro odstrečování
globální aplikace přes čtvereček, na jednu fotku přetažením trojúhelníku

## Dynamic crop
![Dynamic crop](img/dynamic_crop.jpg)

Ořízněte okraje fotky (kde jsou chyby po složení), popřípadě opravte kompozici. Aplikace kliknutím na fajfku.

## Screen Transfer Function
![STF](img/stf.jpg)

STF - unlink channels (řetěz) - stretch (radiační ikonka)

## Dynamic background extraction
![DBE](img/dbe_before.jpg)

pro začátek je nutné kliknout na obrázek, umístí se kříž

threshold 4, sample radius podle hustoty hvězd, pokud vysoká tak nižší (dobrá starting value 10, resize all)

rozmístit od okrajů do středu tak, aby byl zachycen gradient, ne málo ane ani ne moc vzorků

vzorek neumisťovat na místa, která se zobrazí jako černá (je tam hvězda)

![black_star](img/black_star.jpg)
tohle ne

v target image correction vybrat subtraction, aplikace trojúhelníčkem, vygeneruje se pozadí a fotka s odečteným pozadím

![DBE after](img/dbe_after.jpg)

## Color calibration
![Color Caliration](img/cc.jpg)

Alt+N - tmavé místo, Alt+N přes celou mlhovinu - white reference

## Photometric color calibration
![PCC](img/pcc.jpg)

Pro kalibraci barev lze použít i photometric color calibration
Pokud jsou metadata o pozici v obrázku (lze vložit přes script -> image analysis -> image solver), stačí kliknout na acquire from image, pokud ne tak vyhledejte objekt který jste fotili přes search coordinates

## Background Neutralizaiton
![BN](img/bn.jpg)

black reference z vybraného samplu v minulém kroku

## Masky
![mask](img/mask_icon.jpg)

Extrahovat jasovou složku nahoře v liště (dobré setnout identifier)

![mask](img/mask.jpg)

## Dekonvoluce
### Dynamic PSF
![PSF](img/psf.jpg)

vytvoříme fotku průměrné hvězdy

vybírat hvězdy které nejsou v úplně saturaci (odsaturovat přes CTRL + F12, ty hvězdy co jsou i po odstrečnutí nevybírat)
poklikat osamocené hvězdy

kliknout na foťáček a objeví se průměrná hvězda

### Curves transformation na masku
![curves on mask](img/curvesmask.jpg)

esovitá křivka tak aby maska byla více kontrastní (***aby zůstala mlhovina, ale černá černou byla*** - JV, 2024)

živý náhled se zobrazí přes prázdné kolečko

![convolution](img/convolution.jpg)
aplikovat konvoluci na masku, základní nastavení (neaplikovat na barevnou)

### Stretch masky
![stretch mask](img/stretchmask.jpg)

ScreenTransferFunction + HistogramTransformation
trojúhelník z STF na dolní lištu histo, pak trojúhelník z histo na masku

maska by měla zbělat (strečuje se strečlé), tedy odstrečněte přes Ctrl + F12

### Přetáhnout zkonvoluvanou masku na obrázek pod jeho název (na levo)
Ctrl+K pro zmizení červené
(pokud potřeba Ctrl+Shift+I pro inverzi)

### Dekonvoluce
![deconvolution](img/deconvolution.jpg)

Alt+N pro menší místo obrázku (přes mlhovinu i pozadí), operace je výpočetně náročná
v záložce ExternalPSF nahrát vygenerovanou hvězdu
počet iterací 50 (pokud míň powerful počítač ubrat)
doporučení pro úvodní čísla pro deringing:
- global dark  - 0.0070
- global light - 0.0003
pokud rozplizlé hvězdy, snížit global dark
pokud černé kroužky kolem, zvýšit global dark
vyzkoušet i na prewiev s velkými hvězdami, pokud ty jsou špatně, nutné udělat extra masku na velké hvězdy

### StarMask
![smask](img/smask.jpg)
vezmeme původní fotku po DBE
- scale 5
- large scale 2
- small scale 2
- compensation 3
- smoothness 16, aggregate, binarize
- shadows 0
- midtones 1/2
- highlights 1
- truncation 1
- limit 1

Poté v dekonvoluci vybrat local support tuto star masku, a aplikovat znovu
Pokud vše ok, aplikovat na celou fotku a dát si kafe

Odebrání masky přes křížek nahoře

## Streč fotky
streč přes STF + Histo Transformation
přetáhnou trojúhelníček z STF na dolní lištu HistogramTransformation, poté trojúhelníček z Histo na obrázek

## SCRN
![SCNR](img/scnr.jpg)

odstranění zelené z fotky

## Zvýšení saturace u mlhoviny
***S***(esovitá) křivka na masku (CurvesTransformation)
aplikovat masku na obrázek
nyní znovu curves transformation, záložka saturace (S), potom klidně i čistě curves na barvy pod kanály R, G, B / RGB / S

## Export
![export](img/export.jpg)

menu file -> save as

do 16-bit TIFF

## Starnet++
![starnet](img/starnet.jpg)

Nyní fotku prohnat Starnet++

## PixelMath
![pixel math](img/pixelmath.jpg)

odečíst starnet fotku od původní - fotka pouze s hvězdami
a - b

## Finální úpravy
otevřít fotku v PS, spojit vrstvy přes Linear Add
(popřípadě poupravit v camera raw, zvýšit saturaci, kontrast apod)