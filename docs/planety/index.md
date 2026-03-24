---
outline: deep
---

# Planetární Astrofoto

***Autor předpokládá, že jste četli "[Od fotonu po pixel](/zaklady/odfpp/)"***

## Úvod a srovnání

Focení planet, měsíce nebo slunce se liší od focení deepsky objektů snad
vším, možná jediná shoda je, že fotíme nebeský objekt. Pojďme si srovnat
některé důležité parametry pro focení deepsky objektu a planety:

| | <Inline style="width: 10vw; display: block; margin: auto;">/img/planety/image13.webp</Inline><br>*Jupiter* | <Inline style="width: 15vw; display: block; margin: auto;">/img/planety/image8.webp</Inline><br>*NGC 7000* |
|---|---|---|
| Ohnisko | 2800mm | 350mm |
| Světelnost | f11 | f4 |
| Rozlišení | 1.3MP | 16MP |
| Velikost pixelu | 2.9 µm | 6.8 µm |
| Počet snímků | 2000 | 100 |
| Délka expozice | 0.8ms | 5 min |
| Gain | 250 | 0 |
| Celková doba snímání | 4 min | 8 h |
| Záznamový SW | SharpCap, FireCapture, ASICap | SGP, Maxim DL, NINA, APT |
| SW pro zpracování | PIPP, Autostakkert, Registax, imppg, (Pixinsight, Photoshop) | Pixinsight, Siril, Photoshop |

*Údaje v tabulce jsou pouze ilustrační*

Jak vidíte, v parametrech ani nelze najít shodu. Místo plošně velkých a
slabých objektů fotíme malé a jasné. Navíc vzhledem ke zvětšení
teleskopu a drobnosti jejich detailů se velmi výrazně projevují
atmosférické jevy.

## Sestava

Nároky na pevnost montáže nejsou nijak výrazné, zároveň můžeme
paralaktickou montáž nahradit azimutální, protože nám nějaká závažná
rotace pole nehrozí. Je třeba nepodcenit pevný stativ, pracujeme s
delším ohniskem a veškeré vibrace se tedy násobí. U paralaktické montáže
nemusíme nijak zvlášť řešit ustavení, protože doba snímání je natolik
krátká, že můžeme nepřesnosti korigovat ovladačem.

U teleskopu nevadí, pokud má clonové číslo f8 a více. Čím delší ohnisko,
tím lépe, ale také to má limit. Použití barlow čočky je vítané pokud je
dostatečně kvalitní a pokud nám ohnisko nezvětší moc, respektive příliš
nezvedne clonové číslo. Pokud máme teleskop 127/1500 a přidáme k němu
barlow 5x, ohnisko 7500mm je super, ale f60 nám optiku zpomalí na tolik,
že jednotlivé expozice budou muset být až moc dlouhé, tím víc bude
škodit atmosféra a také za stejný časový úsek pořídíme méně fotek, což
zhorší poměr šumu k signálu. Když se vrátíme k ohnisku, v určitý moment
jeho prodlužování pomocí barlow čočky přestane dávat smysl, protože
objekty začnou být sice větší, ale detailů nepřibude.

Planetární kamery bývají menší a levnější, jednak kvůli absenci chlazení
a jednak, protože často využívají menší senzor s nižším rozlišením.
Pokud fotíte planetu, která má rozměry 150\*150 pixelů, nepotřebujete
16MP senzor, protože většina senzoru by stejně zůstala neosvícena.
Mnohem větší důraz je kladen na nízký šum při vysokém gainu, protože
jednotlivé snímky mají délku v jednotkách milisekund, někdy i méně,
takže je třeba gain nastavit dostatečně vysoko. Také mají občas záměrně
vynechaný IR cut filtr na vstupním sklíčku, aby je bylo možné použít na
focení v infračervené oblasti. Důležitou vlastností je také USB 3.0,
které zajišťuje rychlý přenos dat a umožňuje kamerám dosáhnout 200 fps a
více.

## Postup focení

Jak je psáno výše, není třeba se nijak zvlášť trápit s ustavením, či
centrováním v případě azimutální montáže na objekt. Spíše jde o zvýšení
komfortu, že nemusíte objekt tak moc hlídat a počet zásahů ovladačem do
chodu montáže je nižší.

V ručce montáže vybereme objekt, který chceme sledovat a najedeme na něj. Ideálně
fotíme objekt, když je na obloze co nejvýše, abychom minimalizovali
rušení atmosférou. Lze použít i ADC korektor, ale čím výš, tím líp.

::: warning Slunce
U Slunce je
občas potřeba jej prvně povolit v nastavení.
:::

V počítači spustíme záznamový software a připojíme kameru, měl by se nám
objevit živý náhled na objekt. Ostřit můžeme pomocí bahtinovy masky,
softwaru nebo od oka tak, že si zobrazený náhled zvětšíme třeba na 200%.
Nyní nastavíme co nejkratší expozici a přidáme gain do takové míry, že
je objekt hezky vidět, není přesaturovaný, ale není ani příliš ničen
šuměním vysokého gainu. Pokud moc šumí, ubereme gain a protáhneme
expozici.

Buď manuálně nebo pomocí softwaru nafotíme podle objektu 1 - 30K snímků
(pozor, video může mít i stovky GB!). A v podstatě máme hotovo, můžeme
samozřejmě mozaikovat nebo v případě mono kamery fotit jednotlivé rgb
filtry, ale nic dalšího nás skrz focení nečeká.

:::warning Slunce
Výjimkou je Slunce, kdy před začátkem focení v případě SharpCap nebo po
focení u jiného SW nafotíme flaty. Výhodou SharpCapu je, že flat odečítá
v reálném čase (Capture \> Capture flat).
:::

## Zpracování

Dostáváme se k části, kde budeme postupovat podle mojí workflow, ostatní
návody se mohou lišit. Fotky poskládáme v Autostakkertu a doostřování
budeme provádět v Registtaxu, konečnou retuši potom ve Photoshopu.
(Pokud jste video dělali zrcadlovkou, musíte jej převést na
nekomprimované avi nebo pokud máte barevná data slunce a potřebujete je
převést na mono, využijte v obou případech PIPP)

:::warning Slunce
Pro Slunce místo Registaxu použijeme imppg pro dekonvoluci a doostření.
:::

### Autostakkert!

![](/img/planety/image9.webp)

Rozhraní je velice intuitivní, takže nám bude stačit pouze pár
instrukcí.

1)  Otevřeme soubor s videem

    a)  Vybereme zda se jedná o planetu nebo povrch (byť by tam byla
        planeta skoro celá, pokud jen trochu přesahuje, vždy volte
        povrch), u povrchu ještě na fotce najděte pěkné, kontrastní
        místo a pomocí ctrl+klik jej vyberte pro analýzu (zelený
        obdélník)

    b)  Improved tracking je zdlouhavější, ale má lepší výsledky

    c)  Možnost expand vám ve výsledné složenině nechá na okrajích
        artefakty, takže je celkem zbytečné ji používat, proto volím
        cropped (pokud by to byla planeta, crop si volím sám v pravém
        okně nahoře pomocí image size)

    d)  Vzhledem k šumu většinou nejdu pod 4, často se snažím držet mezi
        4-6, dále si ukážeme podle čeho lze číslo odhadnout

2)  Stiskneme tlačítko a čekáme než program video analyzuje, tím se
    zároveň snímky seřadí podle kvality od nejlepšího k nejhoršímu,
    pokud výsledný graf vypadá divně, zkuste změnit nastavení šumu

![](/img/planety/image5.webp)

a)  Uprostřed levého okna se nám zobrazí graf kvality snímků, většinou
    vybírám bod, kde graf protíná 50% horizontálně (v tomto příkladě
    13%), výběr se opět provádí jako ctrl+klik (pokud je nad čarou třeba
    90% snímků, skládám maximálně 1500 u 1,3MP barevné kamery a 500 u
    16MP mono kamery, pokud by jich bylo víc, skládání zabere i 24h,
    podle výkonu pc samozřejmě)

b)  V pravé horní části levého okna si vybereme formát (nechávám TIF),
    můžeme si zvolit počet snímků ke složení nebo jejich procenta, pokud
    vyplníme více polí, například 15, 30 a 50 procent, výsledkem budou 3
    složené snímky z námi vybraných počtů snímků. To je dobré pro
    utvoření představy kolik je třeba snímků pro odstranění šumu nebo
    pokud si nejste jisti, kolik snímků vybrat

c)  Sharpened udělá kopii složeniny, kterou automaticky doostří, ale je
    to automatické a ne moc efektivní

d)  Drizzle můžeme vybrat pokud máme malý snímek a chceme jej zvětšit
    bez výraznější ztráty kvality (1,5x), mohu doporučit například pro
    detaily měsíce s kamerou, která má nízké rozlišení (480x480px atd.)
    opět to velice prodlužuje čas. Pokud máme data z mono kamery, můžeme
    využít resample, kdy se zdvojnásobí rozlišení a ke ztrátě kvality
    nedojde, protože využíváme toho, že světlo dopadlo na stejný pixel
    vždy trochu jinam a lze dopočítat lepší rozlišení, u barevné kamery
    tomu brání Bayerova matice

e)  Přejděme k pravému oknu, tady si v levém sloupečku vybereme velikost
    vzorku pro skládání, vždy volíme takovou velikost, kdy jedna buňka
    obsahuje dostatek dat, aby počítač poznal, kam ji "přišít" na
    druhou, pokud jsou dvě buňky vedle sebe moc malé a vypadají stejně,
    program nebude vědět, jak je navázat a bude to produkovat artefakty

> ![](/img/planety/image7.webp)

f)  Klikneme na Place AP grid a necháme vygenerovat buňky, klikáním
    můžeme dodělávat další, pokud se nám buňky generují i na pozadí,
    zvýšíme minimal brightness a zkusíme znova, také lze zvolit
    Multi-scale, která udělá více vrstev o různých velikostech vzorku

g)  Klikneme na stack a čekáme

:::warning Slunce
Poznámka pro Slunce, nahoře uprostřed okna je funkce Brightness, tu
můžeme zvýšit abychom viděli protuberance, ty potom naklikáme manuálně a
jas opět vrátíme na 1.
:::

### Registax 6

Ač umí Registax také skládat, jde o starší software a algoritmy jsou už
zastaralé, takže u něj využíváme až jeho doostřovací funkce.

![](/img/planety/image12.webp)

1)  Pomocí Select si otevřeme složenou fotku (vím, že jsem psal, že na
    slunce se Registax nehodí, ale při psaní návodu nemám jiná data k
    dispozici). Vybereme nějaké dobře viditelné místo a klikneme na něj,
    tím se vybere oblast, kde se budou počítat změny, není nijak vidět,
    tak se nebojte, že jste ji nevybrali

2)  Na levé straně máme posuvníky jednotlivých vrstev, začneme od
    jedničky a postupně doostřujeme snímek, agresivitu měníme pomocí
    sharpen a pokud to moc šumí, naklikáme tam i trochu denoise, na
    snímku níže jsem také nahoře uprostřed odškrtl Show full image,
    abych viděl změny co nejlépe. U tohoto nastavení si chce pohrát s
    posuvníky, většinou platí, že každá další vrstva vyžaduje menší
    posunutí, ale postupujte pokus - omyl

![](/img/planety/image2.webp)

1)  Na pravé straně jsou klasické funkce, za zmínku stojí RGB align,
    které se hodí na malé planety, kde se ukáže barevná vada teleskopu,
    tato funkce rozloží fotku na jednotlivé kanály a zarovná je spolu.
    Po kliknutí se vám objeví malý čtvereček, kterým vyberete planetu a
    aplikujete funkci.

2)  Jako poslední oddálíme fotku pomocí Show full image a stiskneme Do
    All, potom ukládáme

![](/img/planety/image1.webp)

### Imppg

Tento program je velice jednoduchý a od Registaxu se liší tím, že k
doostření používá místo vrstev dekonvoluci, v kombinaci s unsharp mask.

![](/img/planety/image4.webp)

1)  Otevřeme si složeno fotku a vybereme si místo, kde budeme zkoušet
    doostření.

![](/img/planety/image10.webp)

1)  Prvně zvolíme hodnotu sigma, v podstatě taháme dokud se detaily
    nezačnou kazit, potom trochu ubereme, u unsharp mask zvedneme
    hodnotu sigma na něco málo víc než je 1 a potom taháme hlavně za
    amount, opět je to tu pokus - omyl, protože velice záleží na
    teleskopu, kameře i podmínkách

2)  Posledním krokem je úprava kontrastu pomocí křivek, klikneme na
    čtvereček, aby se nám změny aplikovaly na celou fotku, potom můžeme
    zavřít dekonvoluci a otevřít křivky

![](/img/planety/image11.webp)

1)  Rád dělám částečný negativ, protože lépe ukazuje detaily, nevýhodou
    je, že studená místa jsou světlejší a teplá naopak tmavší

Posledním krokem je Photoshop, nepíšu ho jako vlastní kapitolu, protože
zde jen aplikuji křivky (nebo cokoli jiného, co umí křivky).

Konkrétně v PS je třeba si fotku ještě přepnout do barevného režimu

![](/img/planety/image3.webp)

Potom si už jen hrajeme s jednotlivými křivkami, přidáme červené,
ubereme modré a ze zelené uděláme slabé esíčko.

![](/img/planety/image6.webp)