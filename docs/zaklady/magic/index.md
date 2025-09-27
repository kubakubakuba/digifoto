---
outline: deep
---

# Magic lantern

Magic lantern je open-source firmware pro DSLR fotoaparáty Canon, který přináší pokročilé funkce a možnosti, které nejsou v základu dostupné ve standardním firmware samotného fotoaparátu. My ho budeme používat pro nastavení expozičního času delšího než $30$ sekund a pro automatické snímání.

## Instalace

Stáhněte si verzi určeného pro typ vaší zrcadlovky [ZDE](https://builds.magiclantern.fm/) (pozor například na rozdílné verze pro 6D MkI a MkII), pozor také na potřebnou verzi originálního Canon firmware (například právě pro 6D je to verze 1.1.6).

![](/img/magic/dl.jpg)

Stažený zip vyextrahujete do root složky SD karty fotoaparátu a kartu vložte zpět.

![](/img/magic/copy.jpg)

V nastavení fotoaparátu přejděte do menu a klikněte na firmware version a update.

<Inline style="width: 49%">/img/magic/fwversion.jpg</Inline> <Inline style="width: 49%">/img/magic/update.jpg</Inline>

Pokud by se aktuální verze firmware neshodovala s vyžadovanou, stáhněte si správnou verzi [ZDE](https://eoscard.pel.hu/), pro 6d tedy stáhněte soubor [eos6d-v116-win.zip](https://pel.hu/down/eos6d-v116-win.zip)

![Canon FW download](/img/magic/fwdl.jpg)

ten stejně jako magic rozzipujte na SD kartu fotoaparátu (předtím ji smažte). A ve stejném menu fotoaparátu proveďte upgrade / downgrade firmware. Zrcadlovka se restartuje, možná bude nutné vyjmout baterii, pokud vám to napíše.

Zde je tabulka přímých odkazů na stažení magic lantern a požadovaného firmware pro často používané typy zrcadlovek:

 **Model** | **MagicLantern** | **Firmware** 
:---------:|:----------------:|:------------:
EOS 6D | [magiclantern.2025-06-20.6D.116.zip](https://builds.magiclantern.fm/builds/dev/magiclantern.2025-06-20.6D.116.zip) | [eos6d-v116-win.zip](https://pel.hu/down/eos6d-v116-win.zip)
EOS 100D | [magiclantern.2025-06-20.100D.101.zip](https://builds.magiclantern.fm/builds/dev/magiclantern.2025-06-20.100D.101.zip) | [v101-sl1-100d-x7-win.zip](https://pel.hu/down/v101-sl1-100d-x7-win.zip)
EOS 600D | [magiclantern.2025-06-20.600D.102.zip](https://builds.magiclantern.fm/builds/dev/magiclantern.2025-06-20.600D.102.zip) | [eos600d-v102.zip](https://pel.hu/down/eos600d-v102.zip)

Po úspěšné instalaci se vám zobrazí tato zpráva

![](/img/magic/new-installer.png)

zrcadlovku stačí restartovat, pro odinstalaci magic lantern, počkejte než časovač dosáhne nuly.

## Ovládání magic lantern

Do menu magic lantern se dostanete po zmáčknutí tlačítka koše (na různých typech canonů je lokace úplně jinde :smile:).

### Intervalometr

Nejdůležitější obrazovka v magic lantern pro nás bude obrazovka **Shoot** s ikonkou <Inline style="width: 5%">/img/magic/fotoico.jpg</Inline>,
zde budeme využívat nastavení **Intervalometer** a **Bulb timer**.

![menu intervalometr](/img/magic/intervalometer.jpg)

Pohyb v menu je šipkami, zapnutí funkce (zelená) je pomocí tlačítka *ok*, změna nastavení jednotlivých funkcí je pomocí tlačítka *Q* (nebo *Av* na 100D).

Nastavení bulb timer nastavíme na dobu naší požadované expozice, například *1 min 30 s*. Magic lantern tak za nás bude *držet* spoušt po dobu *90 s*, jelikož maximální podporovaná doba expozice, mimo bulb mode, je 30 s.

Pro toto nastavení je zrcadlovku nutné přepnout do bulb režimu (pootočíme kolečko módu na režim B - na 6D, nebo přetočíme dobu expozice z 30" na B - např na 100D / 600D).

Intervalometr je pak nastavení ve kterém si nastavíme jak často spustit expozici (s tím je spojeno jak dlouho čekat mezi expozicemi), případně kolik expozic celkem pořídit. Hodnotu tedy nastavíme na

$\tau + \Delta, \text{where}\ \tau\ \text{is the exposure time}, \Delta\in\{ 1, 2, \dots, \sim5\}\ s,$

neboli zjednodušeně řešeno (ano, ta rovnice tam je jenom proto, že jsem chtěl tu chtěl zkusit $\LaTeX$), nastavte intervalometr na trochu delší čas než expoziční, při *90 s*, třeba 93 nebo 95. Foťák si tak trochu odpočine mezi expozicemi.

V menu lze nastavit možnost počátku focení na on exit, focení tedy začne po opuštění menu magic lantern.

Intervalometr lze pozastavit navštívením galerie, obnovení pak proběhne naštívením menu přes koš, a jeho vypnutí.

<Inline style="width: 49%">/img/magic/intervalometer_settings.jpg</Inline> <Inline style="width: 49%">/img/magic/bulb_timer.jpg</Inline>

### Focení blesků

S magic lantern je i jednodušší focení blesků, je v něm totiž nastavení *Motion detect*

<Inline style="width: 49%">/img/magic/motion_detect.jpg</Inline> <Inline style="width: 49%">/img/magic/motion_detect_settings.jpg</Inline>

kde za vás magic bude mačkat spoušť pokud detekuje změnu expozice (nastavení *Expo. change*), je ale nutno vyladit trigger level, který určuje jak moc velká změna vyvolá stisknutí spouště.