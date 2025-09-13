---
title: Zpracování fotek v PixInsight
outline: deep
---

Návod na zpracování fotek v Pixinsight.

Některé termíny jsou záměrně vynechány nebo je jejich vysvětlení zjednodušené v zájmu porozumění začátečníků. Dále předpokládám, že čtenář byl seznámen s UI Pixinsight vedoucím astrofoto skupiny a zvládá základní operace.

Byla pěkná noc a nafotili jste si nějaký pěkný objekt, po focení jste nafotili Biasy, potom dali fotit Darky a šli spát. Teď je potřeba ještě nafotit zbytek kalibračních fotek, ať máme co nejlépe zkalibrovaná data, protože čím méně práce nám zůstane na zpracování, tím lépe, navíc ne vždy se dá špatná kalibrace zachránit při zpracování. Pokud jsou špatná data, sebelepší zpracování nám nepomůže.

## **1.Kalibrační snímky a jak je fotit**

<u>Bias</u> – Kalibrační snímek, který odstraňuje vyčítací šum. Pořizujeme jej při stejné teplotě senzoru, tedy hned po dokončení focení a to tak, že zakryjeme teleskop, ISO necháme stejné a rychlost uzávěrky nastavíme na nejvyšší možnou. Minimální počet snímků je 20, ale doporučuji 50 – 100.

<u>Dark</u> – Kalibrační snímek, který odstraňuje temný proud, což není technicky šum, ale nechtěný signál s předvídatelným rozmístěním. Také závisí na teplotě senzoru, takže zakryjeme teleskop a nastavení používáme totožné s tím, které bylo použito pro focení objektu. Pokud je čas, je dobré mít kolem 50 Darků (Pokud je během více nocí stejná teplota, lze použít stejné darky, popřípadě vybudovat knihovnu darků se stejnou teplotou, teplota se dá vyčíst z exifu a je dobré mít všechny darky v rozmezí 5°C).

<u>Flat</u> – Stejně jako předchozí kalibrační snímky i Flat napravuje vadu, v tomto případě však nejde o vadu senzoru jak u Biasu a Darku, ale o vadu optiky. Nejčastější vadou bývá vinětace, ale také smítka prachu jak přímo na senzoru, tak i na zrcadlech nebo čočkách. Flaty lze dělat na mnoho způsobů, ale nejlepším je takzvaný Sky flat. Tyto snímky fotíme se stejným zaostřením jako focený objekt s foťákem ve stejné konfiguraci (to znamená že s ním ve výtahu ani neotáčíme). Fotit lze při soumraku nebo svítání (je třeba mít vypnutou montáž, aby sigma clip vyházel hvězdy). Se stoupající rychlostí optiky stoupají i nároky na přesnost flatu, ale pokud se pohybujeme do f4, lze fotit "od oka" tak, že namíříme teleskop do zenitu, snížíme ISO na co nejnižší a fotíme, aby byl histogram v první třetině zleva. Stačí 20-30 snímků, teplota senzoru nás nyní nezajímá.

<u>Dark Flat</u> – Tento snímek slouží o odstranění temného proudu z Flatů, pokud bychom tyto snímky nenafotili, zanesli bychom do našich fotek temný proud, které ho jsme se před chvíli zbavili. Pro nafocení jednoduše zakryjeme teleskop po nafocení Flatů, nastavení ponecháme a nafotíme opět kolem 50 darků. Teplota senzoru by měla být stejná jako u Flatů.

Teď si nejspíš klepete na čelo a říkáte si mám z noci 30 fotek a ty jsi mě teď donutil nafotit dalších 150. Má to svůj smysl a my si v dalších krocích ukážeme jak s tím velkým množstím fotek naložit.

## **2. Kalibrace v Batch Preprocessing Skriptu**

V Pixinsightu existuje mnoho nastavení a způsobů jak kalibrovat snímky hezky krok po kroku, ale obzvláště pro začátečníky to může být velice matoucí a složitá série kroků. Naštěstí máme takzvaný BPP. Pokud si rozkliknete nabídku Skripts a dále Batch Processing, naleznete tam právě BPP. Díky tomuto šikovnému skriptu můžeme vynechat složité vysvětlování co s čím zkalibrovat a jen jednoduše naházet vše co máme sem a skript se nám o to už postará.

Začneme tak, že postupně nahrajeme jednotlivé sady snímků do patřičných záložek. Dvojklikem na Light snímek ze středu sady vybereme vzor pro registraci ostatních fotek. Dále vybereme Output directory, tedy složku, kam má Pixi exportovat soubory. Zkontrolujte si, že nemáte zašktlou volbu Generate drizzle data, proces by trval ještě mnohem déle a měli byste o složku dat navíc, která jsou pro naše účely zbytečná.

![](/img/pixi/output-000.jpg)

*BPP připravený ke spuštění.*

Před spuštěním můžeme využít funkce Diagnostics, která vše zkontroluje a veškeré problémy vypíše. Dále se je třeba ujistit, že je zaškrtnuté políčko CFA (color fixed array) tedy, že jsou snímky barevné, pořízené přes bayerovu matici. Optimalizaci Darků vypneme a pokud chcete vidět, co Pixinsight vyházel (šum a satelity), zaškrtněte Generate rejection maps, Export calibration files se hodí pokud máte dostatek darků a chcete používat Master dark, flat, bias na více fotek. Potom už jen stačí stisknout tlačítko run a dát si pauzu na kafe, u slabších počítačů můžete jít dospat probdělou noc.

Když konečně přestane PC hučet jak šílené, ve dříve vybrané složce naleznete kalibrační master fotky, kalibrační složky a také složenou a zkalibrovanou fotku. Složku calibration můžete smazat, zbytečně zabírá místo. Složku registration si můžete nechat pokud chcete hledat planetky, k tomu slouží funkce Blink o které si napíšeme pozdeji, pokud nic hledat nechcete, taky ji smažte.

Nyní si otevřeme naši složenou fotku, pravděpodobně uvidíte pouze pár hvězd, jinak bude černá. Musíme ji totiž nejprve "strečnout". To lze udělat několika způsoby, buď v horní liště

napravo kliknete na radioaktivní ikonku <Inline>/img/pixi/output-001.jpg</Inline> nebo jednodušeji **CTRL+A**, streč zrušítě **CTRL+F12**. Dalším způsobem jak strečnout fotku je pomocí <u>Screen transfer function</u>.

![](/img/pixi/output-002.jpg)

## **Screen transfer function**

Toto je první proces, který použijete při zpracování. Když jste si strečli fotku, pravděpodobně jste se lekli toho jak oranžová nebo zelená fotka je. To je způsobené debayerovacím procesem, který při kalibraci fotek rozhodil intenzity jednotlivých kanálů. Nyní, když se fotka strečne, převažující kanál se projeví tak, že fotka vypadá utopená v jedné barvě. To lze jednoduše napravit zakliknutím tlačítka "Unlink channels".

![](/img/pixi/output-003.jpg)

To způsobí, že bude každý kanál strečován individuálně. Když nyní klikneme na tlačítko radiace nebo zmáčkneme **CTRL+A**, fotka by měla vypadat o poznání lépe.

![](/img/pixi/output-004.jpg)

*Po rozpojení RGB kanálů už fotka vypadá lépe.*

# **Dynamic crop**

Po složení jsou okraje fotky většinou hodně škaredé, protože se objekt mírně pohybuje buď nepřesným chodem montáže (to není úplně žádané) a nebo ditheringem (ten je naopak žádaný). Pomocí tohoto procesu fotku jednoduše ořízneme a tím se škaredých okrajů zbavíme.

![](/img/pixi/output-005.jpg)

## **ABE / DBE**

Když už vás okraje nebijí do očí, nejspíš si začínáte všímat, že v pozadí jsou různé přechody nebo fleky. Na odstranění těchto neduh slouží dva procesy.

## **Automatic Background Extraction**

Tento proces lze použít pokud máte rovnoměrně osvícenou fotku s mlhovinou, která neobsahuje žádné složitější přechody. Jednoduše rozklikněte Target image correction a vyberte substraction. Po aplikaci na fotku se otevřou dvě nová okna, první s fotkou bez pozadí a druhé s modelem extrahovaného pozadí. Tato metoda je rychlá a jednoduchá, ale ne vždy použitelná, protože má tendenci dělat kolem jasnějších objektů tmavá kola nebo neodstranit přechody úplně.

## **Dynamic Background Extraction**

Tento process používám mnohem radši a přesto, že to je velká otrava a časově náročnější úkon, výsledky jsou mnohem přesnější a uživatel má mnohem větší kontrolu nad tím, co se děje.

Jak ABE tak DBE pracují se vzorky fotky, to znamená, že si podle určitých parametrů promítnou na fotku síť vzorků, podle kterých následně vytváří model pozadí. Extrakce pozadí je náročná protože přechody nemají jasné hrany a je tedy těžké je vymodelovat. Pro dobrý model musíme Pixi ukázat, kde se přechody nachází, ale zároveň dát pozor, abychom nevybrali nevhodný vzorek.

Při otevření DBE si rozklikneme nabídky Model parameters, Sample generation a Target image correction a nastavíme parametry podle přiloženého obrázku, velikost vzorku si nastavíte individuálně podle hustoty hvězdného pole nebo pokrytí mlhovinou, je dobré se držet mezi 5 a

30 pixely. Potom začneme manuálně umisťovat vzorky tak, aby neobsahovaly pokud možno žádné hvězdy, v hustém hvězdném poli aspoň žádné jasné a pouze pozadí (čím jasnější je pixel ve vzorku, tím je tmavší, snažte se vyhnout černé barvě ve vzorcích). Pokud umístíme vzorek do místa, které je moc jasné, vzorek zčervená a je třeba zvýšit toleranci, zvýšení se aplikuje až po kliknutí na Resize All.

![](/img/pixi/output-006.jpg)

*Příklad jak by neměl vypadat vzorek pozadí.*

Pro představu můžeme DBE aplikovat na fotku a nechat si pouze zobrazit vygenerovaný model pozadí. Když jsme spokojeni s modelem, který DBE generuje, vybereme Substraction v nabídce Target image correction jako u ABE a aplikujeme na fotku. Jak ABE tak DBE lze během procesu kdykoli aplikovat znova.

![](/img/pixi/output-007.jpg)

*Správný model pozadí neobsahující žádné ostré přechody.*

![](/img/pixi/output-008.jpg)

*Rozmístění vzorku na fotce.*

![](/img/pixi/output-009.jpg)

*Nastavení od kterého se při DBE odpíchnout.*

# **Color calibration**

Konečně naše fotka začíná nějak vypadat. Nyní je čas si srovnat barvy tak, aby odpovídaly skutečnosti. K tomu slouží tento proces Color calibration.

![](/img/pixi/output-010.jpg)

*Výchozí hodnoty pro základní kalibraci barev jsou dostačující.*

Je potřeba Pixi ukázat jak vypadá opravdu tmavý bod a jak světlý. Pro tmavý bod budeme muset vytvořit náhled. Ten jsme ještě nedělali a dělá se buď stiskem **ALT+N** a následně vyberete část fotky, kde chcete náhled vytvořit nebo stiskem ikonky **\_** v horní liště. Do náhledu pro kalibraci barev chceme vybrat pouze pozadí, náhled nemusí být nijak velký, ale také by neměl mít jen pár pixelů. Po vytvoření náhledu pozadí vybereme v okně Color calibration jako Dark reference právě náš náhled. Jako White reference poslouží zbytek naší fotky a tak můžeme nechat pole prázdné, v tom případě použije Pixi celou fotku. Po aplikaci na fotku si lze všimnout, že barvy se srovnaly.

![](/img/pixi/output-011.jpg)

*Náhled pozadí pro barevnou kalibraci, všimněte si, že záměrně neobsahuje žádné hvězdy ani mlhovinu.*

## **Background neutralization**

Dalším krokem je neutralizace pozadí, k té nám poslouží náhled pozadí z předchozího kroku, po aplikaci se toho s fotkou moc nestane, ale je dobré ji dělat, protože "zamkne rgb kanály".

![](/img/pixi/output-012.jpg)

*Výchozí nastavení funguje i pro neutralizaci pozadí.*

## **Deconvolution**

Dekonvoluce slouží k vylepšení ostrosti fotky, odstraněním turbulentních jevů atmosféry při focení. Zjednodušeně ukážeme Pixi více hvězd a ono si je zprůměruje a vypočítá, jak by měla správná hvězda vypadat a podle toho upraví ostrost celé fotky. Tento proces je dobrý sluha, ale špatný pán, často se lze setkat s fotkami, kde uživatelé použili špatných nastavení a v podstatě

si zničili fotku. Dekonvoluce je jedna z mála částí, která se musí bez hlubokých znalostí dělat metodou pokus omyl, ovšem ukážu zde několik záchytných bodů od kterých se odpíchnout.

V rámci příprav na dekonvoluci budeme používat několik procesů a kromě PSF se s nimi setkáme i mimo dekovoluci, nebudu je vysvětlovat znovu a nechám je pouze tady.

### PSF

Jednoduše otevřeme tento proces a začneme klikat na hvězdy. Ne však libovolně, ale volíme takové, které nejsou v saturaci, to lze poznat zrušením streče **CTRL+F12** nebo stisknutím ikonky **\_** pokud je hvězda byť jen trochu vidět, není vhodná pro PSF. Dobré je vybírat hvězdy ve středu pole, kde je menší šance projevení se vad optiky a dobrý počet vybraných hvězd je

kolem 60. Po vybrání stiskněte tlačítko <Inline>/img/pixi/output-013.jpg</Inline> a otevře se vám okno s vaší průměrnou hvězdou. Okno minimalizujte a přesuňte bokem.

![](/img/pixi/output-014.jpg)

*Vybrané hvězdy by měly být samostatné, abychom nezkreslili výsledek jednou šišatou hvězdou.*

### Masky

Masky jsou v Pixi velmi důležitá věc, která se hodí v mnoha procesech. Nyní si ukážeme jak vytvořit tu nejjednodušší, která nám zakryje tmavá místa na kterých se nehodí provádět dekonvoluci, protože bychom v podstatě zaostřovali šum. Masku vytvoříme extrakcí jasové složky z fotky kliknutím na ikonku <Inline>/img/pixi/output-015.jpg</Inline>. Do teď jsme pracovali pouze s lineárními fotkami a streč byl v podstatě pouze náhledem. Masku však musíme strečnout a dostat do nelineární podoby. To provedeme tak, že si otevřeme Histogram Transformation a zároveň Screen Transfer


function. V STF klikneme na ikonku <Inline>/img/pixi/output-016.jpg</Inline> a poté přetáhneme na HT, HT potom bez úprav aplikujeme na naši budoucí masku. Tím ji delinearizujeme (už zůstane permanentně střečlá). Nyní ji jen trochu rozmažeme, aby přechody na masce nebyly tak ostré pomocí Convolution. Jen proces otevřeme a rovnou bez změn nastavení aplikujeme. Nyní můžeme obrázek přetáhnout a aplikovat na naši fotku. Fotka zčervená, čím červenější místo na fotce je, tím více je chráněno maskou, kterou jsme vytvořili.

![](/img/pixi/output-017.jpg)

Operace s maskou jsou následující. Pokud chci masku skrýt, stisknu **CTRL+K**. Pokud chci masku invertovat, stisknu **CTRL+SHIFT+I**. Masku jednoduše odstraním kliknutím na ikonku **\_** .

***Aplikovaná maska*** | ***Invertovaná maska*** | ***Skrytá maska***
:-------------------------:|:-------------------------:|:-------------------------:
![](/img/pixi/output-018.jpg) | ![](/img/pixi/output-019.jpg) | ![](/img/pixi/output-020.jpg)

### Star mask

Maskování hvězd je kapitola sama pro sebe a další položka na seznamu, kterou i profíci dělají metodou pokus omyl. S maskováním hvězd se ještě potkáme při jejich redukci, kde bude maska hrát mnohem důležitější roli, nyní nám postačí zamaskovat ty nejjasnější hvězdy, aby nám v nich dekonvoluce nevytvořila umělé struktury.

Otevřeme si tedy proces Star mask a dáme se do práce.

![](/img/pixi/output-021.jpg)

*Výchozí nastavení pro vytvoření masky pro dekonvoluci.*

Při použití správného nastavení se nám po chvilce otevře maska, která by měla obsahovat pouze pár nejjasnějších a hodně rozmazaných hvězd. Hvězdnou masku nikam neaplikujeme a jen ji minimalizujeme stranou.

![](/img/pixi/output-022.jpg)

*Vygenerovaná maska pro pomoc při dekonvoluci.*

Nyní máme připravené vše pro Dekonvoluci. Model naší průměrné hvězdy, zamaskovaná tmavá místa a masku na jasné hvězdy. Po otevření Dekonvoluce nejprve zvolíme třetí záložku External PSF a vybereme náš model hvězdy. Dále rozklikneme nabídku Deringing, zaškrtneme Local deringing a vybereme naši masku hvězd.

Dekonvoluce patří k náročnějším procesům, takže její zpracování trvá déle, proto je nejlepší pro experimentování udělat jen malý náhled s oblastí, kterou chceme doostřit.

![](/img/pixi/output-023.jpg)

Dobrý počet iterací začíná na 50, více jak 100 se už moc nevyplatí dělat, protože na výsledek byste čekali půl dne a rozdíl by byl minimální. Pokud se kolem hvězd vytvoří černá kolečka, je potřeba hodnotu Global dark zvýšit. Pokud se naopak hvězdy zvětší a udělají se kolem nich bíle flíčky, je potřeba zmenšit hodnotu Global bright. Pro porovnání změny před a po lze využít klávesové zkratky **CTRL+SHIFT+Z**. Opakovaným tisknutím kláves můžete rychle překlikávat mezi původním obrázkem a provedenou změnou, protože občas nejsou změny moc markantní.

![](/img/pixi/output-024.jpg)

Potom co přijdeme na požadované nastavení můžeme náhled zavřít a dekonvoluci aplikovat na celou fotku. Nyní je dobrý čas na to dát si kafe, protože tento proces nějakou chvíli zabere.

## Arcsinh stretch + Histogram stretch

Až po tento bod byla naše fotka lineární, poměry jasů objektů byly skutečné a data odpovídala skutečnosti, pokud však zrušíme autostreč Ctrl+f12, zjistíme, že fotka je stále úplně tmavá. Nyní nastal čas na skutečný a již nevratný streč. I zde můžeme postupovat několika způsoby.

Histogram Transformation je proces, který jsme si už ukázali a pokud nám jde jen o jednoduché delinearizování fotky, použijeme posuvníky.tak, aby pozadí moc nesvítilo, ale zároveň nebylo úplně černé (začátečníci často schovávají tímto způsobem šum, fotka pak nepůsobí přirozeně, protože i vesmírné pozadí trochu svítí a není nekonečně černé). Streč je lepší provádět v několika krocích, jak postupně roztahujeme histogram, je snazší se trefit posuvníkem tak, kam chceme.

![](/img/pixi/output-025.jpg)

### Arcsinh stretch

Tento proces funguje tak, že zamaskuje při strečování hvězdy, tedy zachová jejich barvu, pokud se podíváme na předchozí výsledek z HT, jasné hvězdy jsou úplně bílé. Neduhou tohoto procesu je, že fotka zůstane úplně nekontrastní. Streč je také lépe dělat na několikrát a to tak, že si otevřeme proces, pustíme si živý náhled a klikneme na Black point, poté pomocí horního

posuvníku začneme fotku strečovat, když dosáhneme požadovaných výsledků, proces aplikujeme přímo na fotku.

Občas nejlepší výsledek nese kombinace těchto dvou strečů, k té je třeba využít Pixelmath na sečtení obou snímků.

![](/img/pixi/output-026.jpg)

## **Pixelmath**

Velice užitečný nástroj zvládající základní matematické operace, ale i složité vzorce. Nám bude nyní stačit úplně primitivní operace sčítání, abychom si ukázali jak Pixelmath funguje.

Pro jednoduchost si pojmenujeme naše v předchozím kroku strečlé fotky "a" a "b". Nyní nám stačí do horního řádku napsat "a+b", už jen musíme zaškrtnout **rescale**, aby se poměry jasů pouze nesečetli a my nezůstali s 2x tak jasnou, přepálenou fotkou.

![](/img/pixi/output-027.jpg)

## **SCNR**

Pokud se zaměříme na barvy vesmíru, rychle si uvědomíme, že v něm prakticky neexistuje zelená barva. O to horší je, když se nám stane, že máme zelené hvězdy. Pro odstranění zelené barvy z fotky existuje velice jednoduchý proces SCNR. Stačí jej otevřít a aplikovat na fotku, zelená zmizí a můžeme jít k dalšímu kroku.

## **GREYcstoration**

Nyní je čas postarat se o šum v pozadí. Asi nejvíc procesů v Pixi slouží k odšumování, každý má svá pozitiva, ale i negativa. Jedním z těch jednodušších je GREYcstoration.

Protože nechceme přijít o detaily v jasnějších částech, musíme si opět vytvořit masku. Protože už pracujeme se strečlou fotkou, nejde jednoduše extrahovat jasovou složku a znova ji aplikovat. Tím bychom totiž zakryli pouze nejjasnější místa, jenže my chceme ochránit všechny až na ty nejtemnější.

Extrahujeme tedy jasovou složku, ale v Pixelmath ji trochu upravíme. Napíšeme příkaz **\$T\*3** a aplikujeme na fotku. **\$T** je označení target, tedy cíl a jednoduše náš cíl násobíme 3x. (**\$** se píše **ALT+36**). Pozor příkazy v Pixelmath rozlišují malá a velká písmena. Nyní naši masku opět rozmažeme pomocí konvoluce a aplikujeme na fotku.

Posledním krokem je převrácení masky, aby zakrývala jasné části, to provedeme stiskem **CTRL+SHIFT+I**.

Nyní konečně můžeme spustit GreyCstoration, opět je dobre prvně aplikovat redukci šumu na náhled, pro vyladění nastavení, výchozí nastavení většinou funguje dobře, takže se můžeme odpíchnout odtud.

![](/img/pixi/output-028.jpg)

## **Morphological transformation**

Nyní se dostáváme k obtížnému místu, redukce hvězd bývá velice efektivní pro vylepšení fotek, ale zároveň je to místo, kde můžeme celou naši dosavadní snahu zničit špatným zvolením nastavení.

Ukážeme si ten nejjednodušší způsob redukce hvězd a to Morphological selection. Nejprve si vytvoříme masku hvězd, Noise treshold nastavíme na hodnotu okolo 0.45 - 0.55. Dále všechny hodnoty Structure growth snížíme na 0 a Smoothness nastavíme na 4-5. Potom už jen zaškrtneme Contours a vygenerujeme masku. Tu aplikujeme na fotku a otevřeme **MT**. Tady vybereme Morphological selection a hodnotu Selection nastavíme na 0.25, čím nižší od 0.50, tím agresivnější je redukce, naopak hodnoty vyšší než 0.50 hvězdy nafouknou. Structuring element bybereme 7 a klikneme na ikonku diamantu, pak už jen stačí aplikovat na fotku.

![](/img/pixi/output-029.jpg)

Máme hotovo, nyní uložíme fotku jako 16bit tiff a pošleme pro finální doladění do Photoshopu.

<hr />

## Návod na zpracování Komet.

V prvním kroku budeme postupovat jako u klasických fotek a tedy otevřeme BPP, všechny fotky tam nahážeme a jediný rozdíl oproti klasickému postupu je, že vypneme Image integration (jako referenční snímek pro registraci vyberte fotku z prostřed).

Nyní vytvoříme snímek pouze s kometou

To provedeme tak, že otevřeme proces Comet Alignment a rozbalíme záložky Target Frames, Output a Parameters. Do procesu vybereme snímky ze složky Registered, kterou nám vygeneroval BPP. Prostřední snímek vybereme jako referenční (zapamatujte si konkrétní číslo snímku), vybereme složku pro výstup z procesu a v Parametrech otevřeme první a poslední

fotku. Ty musíme strečnout klasicky **CTLR+A** a označit na nich jádro komety, tím Pixi ukážeme, jak se během focení kometa pohybovala přes naše pole. Nyní už jen zbývá spustit proces.

Po doběhnutí procesu budeme mít složku s fotkami zarovnanými na kometu. Ty nyní otevřeme v Image integration. Tam si nastavíme algoritmus Linear Fit Clipping (Pixel Rejection 1) a nastavíme hodnoty Linear fir pro low 4 a high 1 (Pixel Rejection 2), s těmito hodnotami lze trochu hýbat pokud výsledná složenina nevypadá jako kometa bez hvězd.

Po skončení výsledek uložíme a znovu otevřeme Comet Alignment, je čas vytvořit fotku bez komety pouze s hvězdami. Opět nahrajeme zregistrované snímky, které nám vyplivlo BPP, vybereme stejný referenční snímek jako předtím, nastavíme výstupní složku a v záložce Substract vybereme naši uloženou fotku samostatné komety.

Zregistrované fotky opět složíme se stejným nastavením jako fotku komety. Fotky nyní sečteme v PixelMath jako Kometa+Hvezdy a dále postupujeme jako při úpravě klasické fotky.