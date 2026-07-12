# Základy v PixInsight

Jako obecné doporučení co se týče používání a učení se PixInsight můžu doporučit především jednu věc, a to **čtěte**. Pokud kurzorem najedete na libovolnou ikonku, tlačítko, menu či jiné nastavení nebo text, ve většině případů na vás vyskočí tooltip, neboli popisek, ve kterém si můžete krásně přečíst častokrát i ve slušném technickém detailu co dané tlačítko dělá, popř. jak nějaký parametr nastavit.

Současně bych zmínil, že spousta věcí lze udělat vícero způsoby, typicky pak pro svižnost práce já rád používám různé klávesové zkratky a zjednodušení.

## Fotky

Dvojklikem levého tlačítka myši na plochu PixInsight se otevře správce souborů, kde si můžeme otevřít jednu či více fotek. Každá fotka vyskočí jako "okno" na ploše. Alternativně si fotku\*y můžete načíst pomocí `File > Open...`, nebo pomocí klávesové zkratky `Ctrl + O`.

![](/img/master_pixi/zaklady/ss1.avif)

Můžete si všimnout, že jedna fotka vždy bude mít místo šedého okraje okraj modrý. Znamená to, že je poslední zvolená, a když budeme např. aplikovat nějaký proces, aplikuje se právě na ni, popř. pokud dáme krok zpět, posuneme se v historii této zvolené fotky.

Okno, ve kterém se fotka nachází, má po stranách různá užitečná tlačítka a informace. Na horní liště je nalevo její název *(Identifier)*, a napravo její název *na disku*. Nalevo vedle názvu je také zmíněno zda je fotka barevná *(RGB)* nebo černobílá *(Gray)* a aktuální úroveň zoomu daná v poměru pixel displeje na pixel fotky (1:5 např. znamená, že v 1 pixelu displeje je zobrazeno 5x5 pixelů fotky).

![](/img/master_pixi/zaklady/ss2.avif)

Vlevo dole jsou čtyři tlačítka, které mění velikost okna, ve kterém se fotka nachází. Nejvíce budete používat dvě prostřední. Třetí shora vám nastaví standardní velikost okna, současně tlačítko můžete používat jako "reset" zoomu. Druhé shora nastaví velikost okna maximální, co se vleze na plochu. To doporučuji používat, když pracujete s jednou hlavní fotkou.

![](/img/master_pixi/zaklady/ss3.avif)

Vlevo nahoře je tlačítko zavřít fotku, pokud byla změněna a neuložena, vyskočí na vás okno upozorňující o tom. Fotku taky můžete minimalizovat do ikonky (druhé tlačítko zleva). V levém horním rohu je taky vidět název fotky, za který když chytnete a přetáhnete ho na plochu, fotka se vám zkopíruje.

![](/img/master_pixi/zaklady/ss4.avif)

Když máte jednu fotku zvolenou, můžete z ní jednoduše extrahovat její *Luminance kanál* tlačítkem na horní liště. *Luminance* kanál je v podstatě černobílá verze fotky. Pokud máte zvolenou barevnou fotku, můžete také tlačítkem vedle extrahovat jednotlivé R, G, B kanály.

![](/img/master_pixi/zaklady/ss10.avif)

Napravo od těchto tlačítek je dropdown menu, ve kterém si můžete zvolit a zobrazit libovolný kanál v různých barevných prostorech, např.: RGB, Lab, HSV.

![](/img/master_pixi/zaklady/ss11.avif)

Máte-li na ploše dvě fotky, které chcete porovnávat, např. abyste viděli efekt nějakého procesu, fotky dejte přes sebe. Na jednu z nich klikněte pravým tlačítkem a zvolte `Synchronize...`, ze seznamu vyberte druhou fotku.

![](/img/master_pixi/zaklady/ss30.avif)

Pokud na jedné fotce budete zoomovat a pohybovat se pomocí `Space + Left Click`, stejný pohled se díky synchronizaci zobrazí i na druhé fotce. Pomocí `Ctrl + Page Down` (klávesa `Page Down` je na některých menších klávesnicích schovaná pod klávesou `Arrow Down` nebo na numerické klávesnici pod `2`) se bude měnit fokus mezi posledními dvěma zvolenými fotkami. Takto můžete jednoduše porovnávat dvě fotky (stejných rozměrů).

Alternativou je použití procesu *Blink*.

Chcete-li rychle fotku otočit o 90°, 180° či ji zrcadlit, můžete tak pomocí `Image > Geometry`.

![](/img/master_pixi/zaklady/ss34.avif)

Podržíte-li levé tlačítko na fotce, zobrazí se malý náhled s odečtem pixelových hodnot na dané pozici v *x*, *y* souřadnicích s počátkem v levém horním rohu.

![](/img/master_pixi/zaklady/ss36.avif)

Na dolní liště PixInsight nalezneme pár užitečných informací o fotce. Na levé straně máme opět výčet z pozice kurzoru, na pravé straně pak rozměry fotky, počet kanálů, číselný formát (např. `i8` znamená 8-bitový integer, `f32` je 32-bitový floating point, apod.) a velikost fotky na disku.  

![](/img/master_pixi/zaklady/ss37.avif)

## Procesy

Na úplně horní liště najdete hlavní navigaci v PixInsight, tak jak jsem zvyklí z jiných programů. V záložce `Process > All Processes` naleznete všechny dostupné *procesy* v PixInsight. Proces je kus kódu, algoritmus, co provádí určitou operaci na fotce nebo více fotkách. Jsou hlavní způsob, jak fotky v PixInsight upravujeme. Příklady procesů co budeme používat jsou: `HistogramTransformation`, neboli úrovně, `ColorCalibration`, což kalibruje barvy ve stacknuté fotce, nebo třeba `Resample`, které mění rozlišení fotky.

V okně každého procesu naleznete v levém dolním rohu kombinaci čtyř tlačítek: trojúhelník, čtverec, prázdné a plné kolečko.

![](/img/master_pixi/zaklady/ss5.avif)

Tlačítko trojúhelník má dvě různá použití. Nastavíme-li v procesu nějaké parametry, např. v `HistogramTransformation` nějaký stretch, tak trojúhelník můžeme přetáhnout a pustit na libovolnou fotku, která je otevřená na ploše. Trojúhelník musíte pustit vždy na *vnitřek* okna dané fotky. Pokud trojúhelník hodíte na plochu PixInsight, vytvoří se vám nová *ikonka*.

Stisknutím tlačítka čtverce vám aplikuje daný proces na *poslední zvolenou fotku*, neboli aktivní fotku. Pokud pracujete s více fotkami na ploše, může se vám tedy stát, že proces omylem aplikujete na fotku jinou, než jste chtěli. Proto je častokrát lepší používat trojúhelník.

U některých procesů můžete najít tlačítko prázdného kolečka, které vám vytvoří *živý náhled*, který vyskočí v novém, speciálním okně.

![](/img/master_pixi/zaklady/ss6.avif)

Velikost okna živého náhledu můžete měnit, fotka se v něm bude automaticky maximalizovat. V pravém dolním rohu lze změnit kvalitu živého náhledu ze `Smooth` na `Maximum`, čímž se náhled zostří.

![](/img/master_pixi/zaklady/ss7.avif)

Na levé liště jsou tlačítka `R`, `G`, `B`, kterými můžete měnit zobrazovaný kanál.

![](/img/master_pixi/zaklady/ss8.avif)

Tlačítko prázdného kolečka vlevo dole okna procesu se vyplní oranžovou, když je živý náhled aktivní. Současně můžete na tlačítko klikat a tím přepínat mezi před a po aplikaci procesu, díky čemuž můžete pozorovat změny. Živý náhled zavřete křížkem. Jelikož se jedná pouze o náhled, proces se na fotku neaplikuje a musíte ho aplikovat sami buďto trojúhelníkem nebo čtvercem.

Některé procesy, typicky ty, které pracují s více fotkami, fungují v *glabálním měřítku*, a mají tedy tlačítko plného kolečka. Jedním takovým procesem je např. `ImageIntegration`, nebo třeba `ChannelCombination`. Takové procesy totiž neaplikujeme přímo na jednu fotku, ale spouštíme nějakou rutinu na více fotkách, výsledkem pak je typicky nová fotka; charakterově jsou tudíž více skripty než procesy.

![](/img/master_pixi/zaklady/ss23.avif)

V každém procesu taky v pravém dolním rohu naleznete tlačítko `Reset`, které nastaví veškeré parametry na ty defaultní, odstraní nahrané fotky, atd.

![](/img/master_pixi/zaklady/ss24.avif)

## Skripty

Jediný technický rozdíl mezi procesy a skripty je, že okno skriptu vám zablokuje interakci s ostatním prostředím PixInsight. Současně většinu skriptů taky nemůžete uložit na plochu ve formě ikonky. Ke skriptům se dostaneme přes horní lištu `Script`. Hlavní skripty, se kterými se setkáme, jsou `WeightedBatchPreprocessing`, `BatchFormatConversion`, `ImageSolver`, `CanonBandingReduction`, `DarkStructureEnhance` a `Repaired HSV Separation`.

![Příklad okna skriptu `WeightedBatchPreprocessing`](/img/master_pixi/zaklady/ss12.avif)

## Ukládání fotek, historie

Po aplikaci procesů se vytváří historie fotky v prostředí PixInsight. Touto historií se můžeme pohybovat o krok zpět pomocí `Ctrl + Z`, kupředu pomocí `Ctrl + Y`. Důležíté je zmínit, že změny provedené na fotce v PixInsight se nepropisují na disk, dokud ji manuálně nepřepíšete pomocí `Ctrl + S` nebo lépe neuložíte jako novou fotku pomocí `Ctrl + Shift + S`. V levém horním rohu můžete také klikat na šipky, když jedna z šipek není modrá, poznáte tak, že jste buďto na konci nebo začátku historie.

![](/img/master_pixi/zaklady/ss13.avif)

## Masky

Masky jsou klíčovou součástí zpracování astrofotek. Pomocí nich ovládáme, jak intenzivně určitou úpravu aplikujeme na jednolivé části fotky. Přesněji, pro daný pixel hodnota pixelu masky nad ním určuje intenzitu aplikace nějakého procesu v rozsahu $0 - 1$, resp. poměr míchání mezi pixelem před a po aplikace daného procesu
$$
\text{maska} * \text{nová} + (1 - \text{maska}) * \text{původní}.
$$

Maska musí být černobílá a musí mít stejné rozlišení jako fotka, na kterou ji chceme aplikovat. Masky typicky tvoříme extrakcí a úpravou *luminance* kanálu dané fotky.

Masku aplikujeme přetáhnutím jejího názvu ("ikonka" na horní straně levé lišty) na levou lištu fotky.

![](/img/master_pixi/zaklady/ss14.avif)

Pokud je fotka maskována, její jméno na levé liště svítí oranžově. Náhled masky můžeme zapínat a vypínat pomocí klávesové zkratky `Ctrl + K`. Maska lze invertovat pomocí klávesové zkratky `Ctrl + Shift + I`. Vše lze alternativně ovládat v záložce na horní liště nebo hlavním menu v `Mask`.

![](/img/master_pixi/zaklady/ss15.avif)

Červené oblasti v náhledu jsou ty maskované, tedy na ně daná úprava působí méně; na ty dobře viditelné působí úprava více. Styl náhledu lze měnit v `Mask > Rendering Mode`, pro oči příjemnější může být mód `Multiply`. Pokud masku upravíme zatímco je aktivní na nějaké fotce, aplikovaná maska se automaticky aktualizuje, a tudíž ji nemusíme znova aplikovat. Masku můžeme vypnout buďto ikonkou na horní liště či přímo v `Mask > Remove Mask`. 

## Náhledy

Pro jednoduší testování toho, co daná úprava na naší fotce provede, slouží náhledy, neboli *previews*. Jelikož jsou některé procesy výpočetně náročné, vyplatí se vybrat pouze malý výřez fotky, na kterém testujeme např. některé parametry daného procesu. Náhled vytvoříme klávesovou zkratkou `Alt + N`, na fotce tahem vytvoříme obdélník. 

![](/img/master_pixi/zaklady/ss16.avif)

Tímto se na levé liště fotky vytvoří nová "ikonka", na kterou když klikneme, přesuneme se do náhledu. Proces aplikovaný na náhled nemění samotnou fotku. Současně můžeme aplikovat pouze jeden proces na náhled zaráz, pokud má náhled aplikovaný nějaký proces, aplikací dalšího procesu se náhled přepíše.

Budeme-li klikat na klávesovou zkratku `Ctrl + Shift + Z`, budeme v náhledu přeskakovat mezi fotkou před a po aplikaci daného procesu, což je právě hlavní účel náhledů.

Jako vedlejší účel může sloužit duplikace náhledu v separátní fotku. Stejně tak jak můžeme kopírovat fotku, můžeme kopírovat i náhled (tedy přetáhnutím ikonky názvu na plochu). Můžete tak rychle vytvořit výřez fotky.

![](/img/master_pixi/zaklady/ss17.avif)

Náhledy si pamatují aplikovanou masku. Až jsme spokojeni s vybranými parametry, musíme překliknout zase na ikonku hlavní fotky a proces aplikovat na ni. Pokud vám náhled zavazí či je už k ničemu, můžete ho vymazat pravým kliknutím na ikonku s jeho jménem na levé liště a volbou `Delete`.

## Proces ikonky

Při instalaci jste se již setkali s tzv. *process icons*. V podstatě se jedná o ikonizovanou verzi procesů, které si pamatují námi nastavené parametry. Ikonky používáme, když některé procesy (i třeba se stejnými parametry) opakovaně používáme, popř. chceme si uložit, s jakými parametry jsme na danou fotku proces aplikovali.

Proces ikonku vytvoříme přetáhnutím trojúhelníku levého spodního rohu procesu na plochu PixInsight.

![](/img/master_pixi/zaklady/ss18.avif)

Pravým kliknutím na ikonku\*y ji\*e můžeme
- přejmenovat pomocí `Set Icon Identifier...`;
- uložit pomocí `Save Selected Icons...`;
- pokud máme zvoleno více ikonek, můžeme je zarovnat do sloupce pomocí `Arrange Selected Icons`;
- vymazat pomocí `Delete Selected Icons`.

![](/img/master_pixi/zaklady/ss19.avif)

Pokud máme již někde proces ikonky uložené a chceme je nahrát, klikneme pravým tlačítkem na plochu a zvolíme `Process Icons > Load Process Icons...`.

![](/img/master_pixi/zaklady/ss20.avif)

Je důležité zmínit, že když uložíme proces do ikonky na plochu s určitými parametry, a poté v procesu parametry změníme, proces ikonka se nemění (tedy neaktualizuje). Pokud chceme aktualizovat proces ikonku, musíme přetáhnutím na plochu vytvořit novou, a tu starou vymazat.

## Proces konzole

Pokaždé když spustíme nějaký proces či skript, otevře se nám z boční lišty tzv. *process console*. V ní naleznete výpis toho, co PixInsight zrovna v pozadí dělá. Pokud PixInsight narazí na nějaký problém, vypíše vám do konzole chybovou hlášku, pomocí které jste schopni problém vyřešit.

![](/img/master_pixi/zaklady/ss21.avif)

Typicky po instalaci se proces konzole nachází na levé liště PixInsight, vřele doporučuji si ji přesunout do pravého dolního rohu.

![](/img/master_pixi/zaklady/ss22.avif)

## Screen Transfer Function

Klíčové pro práci s *lineárními* fotkami je proces *Screen Transfer Function*, neboli *STF*. Otevřete-li v PixInsight lineární fotku, bude nejpravděpodobněji z velké části kompletně černá. Celé předzpracování a značná část zpracování astrofotek se odehrává právě v lineárním stavu fotky. Abychom viděli, co se na fotce odehrává, STF automaticky provede na fotce jednoduchou histogram transformaci, která fotku stretchne do nelineárního stavu.

Je velmi důležitý zmínit, že STF je pouze ***screen*** transfer function, tedy stretch není fyzicky na fotku aplikován, je pouze pro naše oči v rámci prostředí PixInsight. Pokud uložíme fotku s aplikovaným STF, fotka bude stále v lineárním, nestretchnutém stavu.

Okno procesu STF otevřeme přes `Process > All Processes > ScreenTransferFunction`. Určitě si ale zapamatujte klávesovou zkratku `Ctrl + A` pro aplikování STF. Pomocí `F12` můžete STF zapínat a vypínat. Vše lze ale také provádět přímo v okně procesu STF. Stretch aplikujeme pomocí radiačního tlačítka nalevo.

![](/img/master_pixi/zaklady/ss25.avif)

Na pravé straně poté můžete STF zapínat a vypínat.

![](/img/master_pixi/zaklady/ss26.avif)

Na levé straně naleznete také ikonku řetízku. Zde můžete přepínat mezi tzv. *linked* a *unlinked* stretchem. Pokud tlačítko vypnete, STF se vypočítá *pro každý kanál zvlášť*. Unlinked STF v podstatě budete používat výhradně na syrový integrovaný snímek, který ještě neprošel barevnou kalibrací a odstraněním gradientu. Je důležité avšak dbát na to, abyste unlinked stretch vypli, právě když budete provádět barevnou kalibraci a odstranění gradientu, abyste viděli jak snímek **skutečně** vypadá. 

![](/img/master_pixi/zaklady/ss27.avif)

Pokud je na fotce zapnuté STF, její ikonka jména na levé liště bude zeleně podtržená.

![](/img/master_pixi/zaklady/ss28.avif)

V procesu STF můžete transformaci nastavit i manuálně taháním za šipečky na barevné škále, tak jak jste zvyklí z procesu `HistogramTransformation`, neboli úrovně ve Photoshop.

![](/img/master_pixi/zaklady/ss29.avif)

Stejně tak jako jakýkoli jiný proces si můžete STF uložit do proces ikonky. Stejné STF tak můžete aplikovat na různé fotky, čímž je můžete porovnávat v lineárním stavu. Pracujete-li s živým náhledem libovolného procesu, STF bude aplikované i na živý náhled. 

## Formát XISF

Formát, ve kterém PixInsight ukládá fotky se nazývá *XISF* - *Extensible Image Serialization Format*. V podstatě se jedná o lepší verzi formátu FITS. Umožňuje zapisování do FITS hledáčku, podporuje až 64-bitový floating point formát, zachování informace o barevném prostoru, historie úprav a další vychytávky.

Standardně budeme používat 32-bitový floating point formát. Pokud chcete pracovat s fotku v jiném programu, musíte ji uložit do jiného formátu, typicky do 16-bitového TIFF. Chcete-li se dozvědět více o formátu XISF, přečtěte si [krátký (mírně slaný) článek na stránkách PixInsight](https://pixinsight.com/xisf/#Why_XISF).

## Kontejnery

V PixInsight máme dva druhy kontejnerů - *ProcessContainer* a *ImageContainer*. Tyto dva objekty nám umožňují aplikovat jeden či více procesů naráz na jednu či více fotek.

*Process Container* se chová jako jeden proces obsahující všechny procesy, které do něj naházíte. Proces kontejner naleznete v `Process > All Processes > ProcessContainer`. Do okna proces kontejneru můžete trojúhelníkem házet jednotlivé procesy, pomocí šipek na spodní straně můžete procesy přeřazovat. Celý proces kontejner lze uložit jako jednu proces ikonku tak, jak jste zvyklí. Celý proces kontejner lze poté aplikovat na fotku, popř. na kontejner fotek, a tím aplikuje jednotlivé procesy v pořadí vámi určeném. Do proces kontejneru dokážete i vložit další proces kontejner, čímž vytvoříte PixInsight verzi *matrjošky*.

![](/img/master_pixi/zaklady/ss38.avif)

*Image Container*, neboli kontejner fotek, vám umožňuje aplikovat jeden proces či i více procesů přes proces kontejner, na ***několik fotek zaráz***. Kontejnery fotek budeme hojně využívat např. při preprocessingu, popř. při tvorbě timelapsů z dalekohledů.

Image Container si otevřete pravým kliknutím na plochu.

![](/img/master_pixi/zaklady/ss39.avif)

V okně Image Container budeme používat pár nastavení. Tlačítkem složky přidáte do kontejneru fotky, na které úpravu chcete aplikovat.

![](/img/master_pixi/zaklady/ss40.avif)

Tlačítkem složky na řádku `Output directory` zvolíte složku, do které se upravené fotky budou ukládat.

![](/img/master_pixi/zaklady/ss41.avif)

Na řádku `Output template` nastavujete pojmenovávání upravených fotek a jejich formát. Změňte si jej na **`&filename;.xisf`** - to znamená, že se použije stejné jméno fotky jako původní, a zajistí se, že formát bude vždy XISF.

![](/img/master_pixi/zaklady/ss42.avif)

Ve chvíli, kdy máte Image Container správně nastaven, trojúhelníkem si jej přetáhněte na plochu k vytvoření ikonky. Aplikací procesu či proces kontejneru na tuto ikonku se vám pak spustí nová rutina, aplikující proces na jednotlivé fotky a zapisující tyto upravené fotky do vámi zvoleného adresáře.

## Projekty

Podobně jako např. v Adobe Photoshop jste schopni uložit celý projekt, tato možnost existuje i v PixInsight. Projekt uložíte kliknutím pravého tlačítka na plochu a zvolením `Project > Save Project...`.

![](/img/master_pixi/zaklady/ss31.avif)

Do projektu si můžete napsat autora, popis projektu, a uložit různé typy objektů. Projekt je schopen zachovat veškeré objekty, co máte na ploše PixInsight, tedy např. fotky, náhledy, proces ikonky, masky, atd.

![](/img/master_pixi/zaklady/ss32.avif)

Osobně bych ale dbal na nějakou údržbu a systém ve vašem zpracování. Pokud si naházíte spoustu různých zmateně pojmenovaných fotek a ikonek na plochu, uložíte si vše do jednoho projektu, tak v tom budete mít nepořádek a nevyznáte se (hlavně třeba po půl roce).

## Pracovní plochy

Na dolní liště PixInsight můžete měnit mezi čtyřmi pracovními plochami, tzv. *workspaces*. Osobně nemám potřebu je používat, ale mohou vám pomoci s organizací projektů.

![](/img/master_pixi/zaklady/ss33.avif)

## Úprava prostředí

Pomocí `View > Tool Bars` můžete měnit zobrazené ikonky nástrojů na spodní a horní liště PixInsight.

![](/img/master_pixi/zaklady/ss35.avif)

Defaultní nastavení je postačující, nicméně doporučuji si výběr změnit tak, jak vám vyhovuje. Pořadí jednotlivých "bloků" ikonek / nástrojů lze měnit tím, že za ikonku chytnete a přetáhnete ji na jinou pozici, a to i třeba z horního okraje na spodní.

## Fix: chybějící Blink2

Pokud vám také sám mizí proces Blink2, nebo jiný externí modul, měli byste být schopni ho vrátit zpět následujícími kroky.

1. Ujistěte se, že máte správně napsaný URL odkaz. Běžte do `Resources > Updates > Manage Repositories`. Tam musíte mít URL odkaz **`https://pixinsight.arcturus.ch/blink2/`**. Potvrďte pomocí OK.

2. Zkontrolujte, že je modul nainstalován. Běžte do `Resources > Updates > Check for Updates`. Pokud se vám bude zobrazovat dostupný modul Blink2, klikněte na `Apply`. Po stažení musíte PixInsight zavřít, spustí se vám instalace, při které se PixInsight restartuje.

3. Zda vám v seznamu procesů stále chybí Blink2, běžte do **`Process > Modules > Install Modules...`**. V okně, co vám vyskočí, zvolte `Search`. Měl by vám v seznamu vyskočit právě nenainstalovaný modul Blink2. Klikněte si na něj, a zvolte `Install`. Nyní by měl proces zůstat i po vypnutí PixInsight / vašeho počítače.

