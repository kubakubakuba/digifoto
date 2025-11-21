---
outline: deep
---

# Od fotonu po pixel

V noci bylo jasno a tak jsme vesele fotili, přes den jsme si fotky zpracovali a teď máme pěkný obrázek mlhoviny, jak se to ale stalo a co za tím vším stojí? Pojďme si trochu rozvést některé pojmy a názorně si ukázat, jak se z fotonu dělá pixel.

<Inline style="width: 50%; display: block; margin: auto;">/img/odfotonupopixel/image9.webp</Inline>

<center><small>Mlhovina Srpek v Labuti pořízená přes H-alpha a Oiii filtr na monochromatickou, chlazenou kameru</small></center>

<hr />

*Dovolím si malou předmluvu, ve většině případů jde o velice složitá zařízení a procesy, v rámci porozumění konceptu není nutné rozvádět je do velké hloubky, proto bude plno informací hodně zjednodušeno, tím může dojít k nepřesným informacím, ale pro pochopení stále relevantních.*

Kapitoly:
[[toc]]

## Obrazový snímač

<Inline style="width: 50%; display: block; margin: auto;">/img/odfotonupopixel/image14.webp</Inline>


<center><small>Příklad barevného snímače, který používají digitální zrcadlovky</small></center>

Zjednodušeně jde o zařízení, které se stará o zachycení fotonů a jejich převedení na elektrický signál, jeho násobení a částečné zpracování. Samotné zařízení je monochromatické, takže rozlišuje pouze intenzitu signálu, který je z analogového elektrického signálu převeden na digitální a uložen v bitech, které se interpretují jako odstíny šedi.

Skládá se z jednotlivých fotocitlivých bodů na polovodičové bázi uspořádaných v mřížce, kterým říkáme pixely. Celkový počet pixelů určuje rozlišení senzoru a uvádí se v megapixelech. V dnešní době rozlišujeme dva hlavní typy senzorů CCD a CMOS.

### Bitová hloubka

Jak už víme, informace o intenzitách signálu se do jednotlivých pixelů ukládají v bitech. Množství kolik bitů je jeden pixel schopný uložit označujeme jako bitovou hloubku (případně barevnou).

<Inline style="width: 80%; display: block; margin: auto;">/img/odfotonupopixel/image2.webp</Inline>

<center><small>Reprezentace počtu odstínů šedi podle bitové hloubky</small></center>

Počet odstínů, které je jednotlivý pixel schopen rozlišit odpovídá dvojce umocněné na počet bitů. Například 8bitové senzory jejichž pixely jsou schopny rozlišit 2^8^ = 256 odstínů šedi.

Pokud máme informace o intenzitách tří základních barev: červené, zelené a modré, můžeme jejich poměry mezi sebou násobit a získat tak barevný obraz.

<Inline style="width: 70%; display: block; margin: auto;">/img/odfotonupopixel/image11.webp</Inline>

<center><small>Počet dosažitelných barev odpovídající různým bitovým hloubkám</small></center>

### Kvantová účinnost

"***Q**uantum **e**fficiency*" je vlastnost obrazového snímače, která určuje procento fotonů, které budou po dopadu na snímač převedeny na elektrický signál, prakticky jde tedy o citlivost snímače. Pro různé vlnové délky se liší, proto se u barevných kamer uvádí ve třech křivkách oproti jedné u mono kamer.

<Inline style="width: 80%; display: block; margin: auto;">/img/odfotonupopixel/image7.webp</Inline>

<center><small>Kvantová účinnost pro senzor Sony IMX485, z grafu lze vyčíst, že nejvyšší účinnost je okolo 85 % v zelené části spektra</small></center>

### Bayerova maska

Jak ten barevný obraz ovšem získat? Snímač musí nějakým způsobem zjistit poměry intenzit mezi jednotlivými barvami. Toho se docílí tak, že se před snímač umístí Bayerova maska (CFA - color filter array), jde o mřížku se střídajícími se barvami RGB. Nejhojněji používané uspořádání je RGGB do čtverce. Zelená je zastoupena dvakrát, protože z fyziologického hlediska je lidské oko nejcitlivější právě na zelenou barvu, tu je tedy potřeba reprodukovat co nejpřesněji (V dnešní době už existují i CMY matice, které zlepšují kvantovou účinnost snímače, ale vyskytují se velmi vzácně).

<Inline style="width: 80%; display: block; margin: auto;">/img/odfotonupopixel/image13.webp</Inline>

<center><small>Rozložení Bayerovy masky BGGR na snímači</small></center>

Problém ovšem je, že nyní jen 25% pixelů snímá červenou, 50% zelenou a 25% modrou. To by nám 4x snižovalo rozlišení snímače, naštěstí tu máme Debayering. Jde o matematický proces, kdy se z nekompletních dat dopočítávají data tak, aby výsledek reprezentoval kompletní barevný obraz v co nejpřesnějším podání. Jedna z vlastností RAW formátu je, že fotka neprošla Debayeringem, o ten se stará až software na zpracování, což dává uživateli větší volnost. Jednotlivé metody Debayeringu zde nebudu rozepisovat, protože jich je hodně a většinou tu nejvhodnější volí software automaticky sám, po posouzení fotek.

Principiálně to funguje tak, že zelená informace je díky svému zastoupení kompletní a dopočítává se červená a modrá složka ze čtyř sousedních pixelů, dvou červených a dvou modrých. Na místech s jemnými přechody a stálou barvou to funguje dobře, místa, kde jsou ostré hrany a přechody mohou ovšem obsahovat chyby a uměle vytvořené artefakty, proto je potřeba zapojit ještě korekční algoritmy, které tyto chyby částečně kompenzují.

I přes kompenzaci nelze docílit úplně dokonalého snímku a daní je malá ztráta kontrastu a ostrosti. V dnešní době je to ovšem úplně zanedbatelná ztráta vzhledem k vysokému rozlišení snímačů.

<Inline style="width: 50%; display: block; margin: auto;">/img/odfotonupopixel/image10.webp</Inline>
<center><small>Postup při debayeringu</small></center>

## Šum a jeho kalibrace

Jde o náhodnou proměnlivost jasové nebo barevné informace v signálu, která je většinou způsobena elektronickým šumem. Ten je způsoben náhodným pohybem elektronů v zařízení.

Pro kompenzaci těchto nedostatků pořizujeme kalibrační snímky, které programu ukazují, kde se šum a jiné nedostatky vyskytují. Jde v podstatě o snímky šumu bez signálu.

- Temný proud - Jde o relativně slabý proud, který se vyskytuje na fotocitlivé části snímače a může produkovat falešný signál, s teplotou jeho intenzita roste, proto chladíme kamery, abychom množství toho šumu snížili.

- Dark frames - Používají se ke kompenzaci temného proudu. Jde o snímky pořízené při zakrytém snímači o stejné délce a stejné teplotě.

- Vyčítací šum - Při vyčítání elektronika prochází pixel po pixelu a "sčítá" elektrony → z toho určuje intenzitu každého pixelu, problém ovšem je, že nic není dokonalé a občas se pár elektronů náhodně přidá nebo naopak ubere. Při vysoké saturaci se tyto nepřesnosti ztratí, ale při focené velmi slabých objektů to může být problém. Tento typ šumu se nemění s délkou expozice, protože k němu dochází vždy při vyčítání, které je konstantní, takže čím delší expozice, tím více šum potlačíme.

- Bias snímky - Jde o větší set (50-100) snímků, které se pořizují na maximální rychlost uzávěrky. Zbytek nastavení zůstává stejný včetně teploty pořízení.

<Inline style="width: 80%; display: block; margin: auto;">/img/odfotonupopixel/image4.webp</Inline>

<center><small>Příklad vyčítacího šumu</small></center>

- Fixed pattern noise - Šum, který se objevuje jak při vyčítání, tak při zahřívání senzoru, je ovšem specifický a konstantně se vyskytuje na senzoru, lze jej tedy dobře korigovat pomocí Darků a Biasů.

- Hot a cold pixely - Při vyčítání může docházet k chybám, obzvláště u snímačů s vysokým rozlišením roste pravděpodobnost, že u některého pixelu dojde k chybě při vyčtení. Tato chyba se může projevit tak, že se pixel vyčte buď jako plně saturovaný (Bílý hot pixel) nebo naopak jako kdyby nezachytil žádný signál (Černý cold pixel). Korekce většinou provádí skládací algoritmus.

- Amp Glow - Označení vzniklo v dobách CCD jako *Amplifier Glow*, ale v dnešní době se tak označuje jakékoli nežádoucí záření elektroniky na desce snímače. Pokud produkuje některý z komponentů světlo, byť slabé, na dlouhých expozicích se může negativně projevit. Naštěstí se stejně projeví i na kalibračních snímcích a lze tedy jednoduše odstranit. Amp Glow je většinou konzistentní a nezávislé na změnách teploty.

<Inline style="width: 80%; display: block; margin: auto;">/img/odfotonupopixel/image8.webp</Inline>

<center><small>Amp glow na Darku mono kamery</small></center>

Celkově lze většinu šumu odstranit pomocí korekčních snímků, ale vždy tam nějaký šum zůstane. Šum roste současně se signálem, ovšem v jiném poměru, takže po určitém čase převážíme šum signálem podle grafu níže.

<Inline style="width: 80%; display: block; margin: auto;">/img/odfotonupopixel/image6.webp</Inline>

<center><small>Při krátké expozici bude převažovat šum, ten ale začne velmi rychle přetlačovat signál, pokud je naše celková expozice dostatečně dlouhá</small></center>

## Filtry

Při focení se využívá velké množství filtrů, stejně tak v astronomii, my si teď popíšeme ty, které se nejčastěji používají při astrofotu, jak planetárním, tak deepsky (UBVR vynechám, ty jsou na fotometrii). Začneme od těch nejzákladnějších.

[Luminance]{.underline} - V zrcadlovkách je tento filtr vestavěný, u monochormatických kamer se používá k získávání jasové složky. Jde o průhledné sklíčko, jehož úkolem je propouštět viditelné světlo a odstínit oba konce viditelného spektra, tedy ultrafialové a infračervené světlo. Speciální použití tento filtr nachází také u solárních etalonů, kde je využíván k odstínění infračervené části záření.

<Inline style="width: 80%; display: block; margin: auto;">/img/odfotonupopixel/image1.webp</Inline>

<center><small>Propustnost Luminance filtru</small></center>

[RGB]{.underline} - Základní fotografické filtry, které se používají samostatně u monochromatických kamer nebo ve formě Bayerovy masky přímo na senzoru. Každý filtr propouští jednu barvu tak, aby se překrývaly a došlo k pokrytí celé viditelné části spektra. U monochromatických kamer se často používá kombinace LRGB, kdy se použije jasová složka tvořící většinu délky expozice a nese detaily a barva se použije pouze k obarvení snímku. Poměr expozic L-RGB může být i 70%-10%-10%-10%.

[CLS]{.underline} - *City light suppression* jak už název napovídá slouží k odstínění světelného znečištění, které v městech z velké části tvoří sodíkové výbojky. Filtr propouští co nejvíce světla a blokuje pouze vlnové délky běžného osvětlení, nevýhodou může být zkreslení skutečných barev vlivem chybějící oranžové a jiných částí spektra. Novým problémem světelného znečištění je používání bílých LED světel, která svítí spojitě a nelze je tedy odfiltrovat.

<Inline style="width: 80%; display: block; margin: auto;">/img/odfotonupopixel/image5.webp</Inline>

<center><small>Příklad propustnosti viditelného světla pro CLS filtr</small></center>

[UHC]{.underline} - *Ultra high contrast* slouží ke zlepšení viditelnosti mlhovin a odstínění světelného znečištění, tyto filtry propouští světlo jen na emisních čarách mlhovin a tím zlepšují jejich viditelnost, ovšem zkreslují barvy více než CLS filtry vis obrázek níže.

<Inline style="width: 80%; display: block; margin: auto;">/img/odfotonupopixel/image3.webp</Inline>

<center><small>Propustnost UHC filtru s vyznačenými emisními čarami mlhovin</small></center>

[H-alpha]{.underline} - V astrofotu nejhojněji používaný filtr, který propouští světlo s vlnovou délkou pouze okolo 656.28 nm. Běžně jsou dostupné filtry s rozsahem mezi 15-3 nm. Čím užší pás propustnosti, tím "čistší" signál máme. Vodík je nejzastoupenějším prvkem ve vesmíru a proto je tento filtr častou pomůckou i pro fotografy používající barevné kamery, kdy se z H-alpha fotky vezme pouze červený kanál a násobí se jím červený kanál barevné fotky.

Zde si dovolím malou poznámku. Ač jsem taky tento filtr používal v kombinaci s modifikovanou zrcadlovkou, jeho použití s barevnou kamerou je velice neefektivní. Fotíme pouze několik procent viditelného světla, tím nám vzniká nárok na velmi dlouhou expozici, barevná kamera má RGB matici, takže z těch několika procent světla projde až k senzoru jen 25 %. Když si k tomu připočteme ještě kvantovou účinnost, která taky není 100% jsme na několika desetinách procenta světla, které použijeme. Takže pro kvalitní H-alpha kanál potřebujeme mnoha-hodinovou expozici + RGB fotku. Mono kamera zvládne mnohdy kvalitnější fotku za kratší čas.

<Inline style="width: 90%; display: block; margin: auto;">/img/odfotonupopixel/image12.webp</Inline>

<center><small>Srovnání použití H-alpha filtru modifikovanou zrcadlovkou a mono kamerou, pro zrcadlovku měl filtr šířku pásma 8nm, pro mono kameru 7nm. Oba snímky byly pořízeny stejnou technikou.</small></center>

- Oiii - Jde o emisní čáru dvakrát ionizovaného kyslíku, který se také často nachází v mlhovinách, ovšem zdaleka ne tak hojně jako vodík. V kombinaci s vodíkem se pro vytvoření barevných fotek používá kombinace HOO, kde se vodíku přiřadí červený kanál a zelený a modrý kyslíku. Tato kombinace poskytuje "relativně" správné barvy odpovídající skutečnosti.

- Sii - Je emisní čarou síry a třetí nejhojněji používaný úzkopásmý filtr. Přidání třetího filtru nám nejen přidává další detaily ve fotce, ale zároveň umožňuje tvořit fotky v takzvaných falešných barvách. Nejznámější kombinací je SHO, nebo-li Hubblova paleta, kdy je síra přiřazená červenému kanálu, vodík zelenému a kyslík modrému. Výsledkem je žluto modrá barevná kombinace, která ač se některým astronomům nelíbí poskytuje mnohem více kontrastu než celočervená ač skutečná barva mlhoviny.

- Multi-band - Trendem posledních let jsou Dual-band nebo Tri-band filtry, které pouští všechny tři výše zmíněné prvky současně. Zamýšlené použití je právě na barevných kamerách a ač to dává větší smysl než samotný H-alpha filtr na barevné kameře, stále vítězí monokamery s jednotlivými filtry.

- Modifikace zrcadlovek - Jak jsem již psal, zrcadlovky mají před senzorem svůj vlastní filtr pro blokování UV/IR, problém je, že většina zrcadlovek ukrajuje až moc velkou část červeného světla a propustnost okolo vlnové délky H-alpha může být i jen pár procent. Řešení je tedy buď sklíčko vyndat nebo nahradit jiným, které propouští více červené.

- Levnější varianta je sklíčko pouze vytáhnout, problém ovšem je, že se změní optická mohutnost před senzorem a ten je potřeba posunout, také může dojít k problémům s ostřením na krátkých ohniscích. V poslední řadě je také potřeba používat UV/IR filtr, který se vsadí buď před senzor nebo na objektiv. Výjimkou je Canon 6D, která má na prachotřesu UV/IR vrstvu a tento filtr nepotřebuje, vše ostatní platí.

- Dražší varianta je koupit nové sklíčko, které nahradí to stávající. Výhodou je zachování funkčnosti zrcadlovky i pro denní focení, fotky mají sice růžový nádech, ale stačí si nastavit vlastní vyvážení bílé a foťák fotí jako předtím.
