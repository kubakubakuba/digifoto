---
outline: deep
---

# Nighttime Imaging 'N' Astronomy (N.I.N.A)

N.I.N.A je software pro akvizici dat pro astrofotografii který umožňuje připojení mnoha druhů zařízení (ať už dalekohledů, kamer, filtrových kol, focuserů, dew heaterů, montáží, kopulí a dómů, ...).

V tomto návodu se pokusím vysvětlit základní používání tohoto softwaru, abyste ho byli schopni použít k pořizování astrofotografií na robotických sestavách.

Tento návod předpokládá, že máte již nainstalovaný všechen software zmíněný na stránce [S.A.J.R.I.](/sajri/#instalace-sw), ten se může mírně lišit pro jiné sestavy.

Předpřipravené profily lze nalézt [ZDE](http://omega.swpelc.eu/expa/nina/Profiles/), pro jejich instalaci je nutné zkopírovat složku *Profiles* do složky **C:\\Users\\\<USERNAME\>\\AppData\\Local\\NINA\\Profiles**.

## Panel Equipment

V panelu equipment najdete všechno potřebné vybavení, které jste k ovládacímu počítači připojili. Přepínání mezi jednotlivými zařízenímí se dělá pomocí horního drpodownu, kde vždy vyberete které zařizení chcete používat, vypínacím tlačitkem napravo ho pak připojíte / odpojíte.

### Camera panel

Na panelu kamery zapneme/vypneme chlazení dané kamery, případně můžeme změnit její nastavení. Je dobré dát nějaký čas pro zchlazení zahřátí (například 10 minut), aby se nám kamera nezamlžila nebo jí to neuškodilo.

![1](/img/nina/1.avif)

### Focuser panel

Na panelu focuser ho připojíme a můžeme s ním hýbat.

![2](/img/nina/2.avif)

### Rotator panel

Připojíme manuální rotátor, nebo automatický pokud ho na sestavě máme.

![3](/img/nina/3.avif)

### Mount panel

Připojíme montáž (iOptron spustí iOptron commander, skywatcher spustí EQASCOM EQMOD, obojí otevře další vyskakovací okno). Montáž pak jde ovládat buď přímo v nině, nebo v této externí aplikaci.

![4](/img/nina/4.avif)

iOptron commander:

![5](/img/nina/5.avif)

### Guiding

Na panelu guiding připojíme PHD2, vyskočí další okno. V něm nastavíme parametry guidingu (délku jedné expozice), a spustíme looping, vybereme hvězdu a spustíme guiding.

![6](/img/nina/6.avif)

## Panel Imaging

Panel imaging je jeden z hlavních panelů se kterým při pozorování budete interagovat, zobrazuje pořízené expozice, ovládá teleskop a všechno ostatní.

![7](/img/nina/7.avif)


## Panel Framing

Na panelu framing vybereme který objekt chceme fotit, po potvrzení získáme jeho souřadnice. Z vybraného katalogu v pravém horním rohu se nám pak stáhne fotografie (případně z lokálního planet. softw.). Vybereme jaký framing objektu chceme, případně natočíme kameru. Na objekt potom najedeme a přidáme ho do sekvence pro focení.

![8](/img/nina/8.avif)


## Panel Advanced Sequencer

Nejdůležitější z panelů se kterým budeme interagovat. Nastavíme v něm přesné kroky, jak se má dalekohled v průběhu noci chovat, co má fotit, kdy má sám přeostřit a jak dlouho fotit dané expozice s jakým nastavením (i s ditheringem). S tímto panelem se dá velmi vyhrát, je v něm mnoho stavebních bloků, ze kterých lze sestavit plán focení v průběhu noci.

Nastavení a program který jsme vytvořili lze uložit do .json souboru, který lze použít pro focení stejného objektu v průběhu více nocí, uchovává se v něm stav, ve kterém jsme focení ukončili poslední noc.

Z panelu framing lze do tohoto panelu přímo naimportovat framing daného objektu, případně i mozaiky kterou nám tento panel vytvoří.

![9](/img/nina/9.avif)

## Panel Flat Wizard

Na panelu Flat Wizard pořídíme flaty a dark flaty, které nám pomohou s korekcí pořízených fotografií. Automaticky nastaví expozici tak, aby byla v polovině histogramu a pořídí dané množství expozic.

![10](/img/nina/10.avif)
