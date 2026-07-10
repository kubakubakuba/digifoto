# Nastavení PixInsight

Návodem procházejte postupně jak je napsaný, žádné kroky nepřeskakujte, jinak to nebude fungovat.

## Instalace

Z disku si nainstalujte instalačku k vašemu systému (Windows, MacOS, Linux), po instalaci jakákoliv okna zavřete. Soubor `PixinsightLicense` si přetáhněte do:
- Pro Windows: `...\Appdata\Roaming\Pleiades\` (tam se dostanete pomocí napsání %appdata% do systémového vyhledávače).
- Pro MacOS: `Macintosh HD > Users > user > Library > PixInsight`, složka `Library` je skrytá, zobrazíte ji pomocí zkratky `Cmd + Shift + .`.
- Pro Linux: `~/.PixInsight/`

Nyní byste měli být schopní úspěšně spustit PixInsight. Po prvním spuštěním prosím ignorujte upozornění o chybějící Thread Performance Analysis a automatický update, k nim se dostaneme později.

## Dependencies

Na disku najdete složku `PixInsight`, kterou si celou zkopírujte na svůj lokální disk, a to na lokaci, kterou si budete pamatovat, doporučuji přímo `C:\PixInsight\`. Uvnitř složky naleznete:

- Prázdnou složku `SWAP`, kterou PixInsight používá při některých procesech jako dočasnou paměť,
- Složku `Downloads`, do které PixInsight stahuje externí procesy, skripty, a ostatní updaty, které nejsou zahrnuty v instalačce.
- Složku `Gaia` obsahující spektrofotometrická a astrometrická data z družice Gaia, které moderní PixInsight používá pro astrometrii, fotometrii a kalibraci barev.
- Složku `Mars` obsahující referenční soubory pro automatickou korekci gradientu. Více si můžete [přečíst zde](https://pixinsight.com/mars/).
- Složku `Process Icons` se soubory `PreProcessing.xpsm` a `Processing.xpsm`, které budeme používat při zpracování ("ikonky").

## Thread Performance Analysis

Nejprve spustíme analýzu vašeho počítače, aby PixInsight efektivně spouštěl procesy. Předtím ale prosím zavřete veškerá okna, aplikace, cokoliv co vám běží v pozadí na vašem počítači, jelikož potřebujeme maximální výkon. Stejně tak zapojte váš notebook do sítě, a ujistěte se, že ve svém Windows nastavení (Baterie a výkon) je nastaven maximální výkon (a to kdykoliv budete pracovat v PixInsight či jiném náročném softwaru). Poté v PixInsight navigujte do `Process > Thread Perfomance Analysis` a spusťte ji. Proces bude trvat několik minut.

## Global Preferences

Všechno obecné nastavení co se týče PixInsight jako aplikace najdete v `Edit > Global Preferences`. Podobně jako ostatní procesy se i `Global Preferences` musí uložit spuštěním pomocí kolečka v pravém dolním rohu. Nyní budeme měnit několik nastavení, a to:

- Pokud vám nevyhovuje škálování UI, běžte do `Core UI Resources` a vypněte `Automatic UI scaling` a manuálně nastavte `UI scaling factor`, vyšší hodnoty prostředí zvětšují. Kolečkem potvrďte, a PixInsight restartujte. Po změně ostatního nastavení se nemusí aplikace restartovat.
- V `Main Window / Startup` zapněte `Comfirm program termination`.
- V `Directories and Network` přidejme složku pro SWAP soubory - bude tam nějaká defaultní, tu vymažte, a pomocí Add přidejte cestu k vaší PixInsight složce, která by měla být v `C:\PixInsight\SWAP`. Podobně v druhém okně také přidejte složku Downloads: `C:\PixInsight\Downloads`.
- V `Security` zapněte `Allow insecure update repositories`.
- V `Miscellaneous Image Window Settings` zvyšte `Cursor tolerance` např. na 8 px, popř. na hodnotu která vám vyhovuje. Moje osobní preference je také změnit `Wheel direction` na `Forward`, tedy když scrollujete kolečkem na myši od sebe, tak do fotky zoomujete a naopak, podobně pak na touchpadu. Pokud si všimnete, že jste zvyklí naopak, tak si to změňte. Dále si ve stejném okně také zapněte `Use 24-bit Screen Transfer Function LUTs by default`.

## Readout Options

Pokud máte na ploše PixInsight otevřenou fotku, a najedete na ni kurzorem, v dolní liště se zobrazí některé údaje včetně výčtu pixelových hodnot - to co přesně se zobrazí a jak můžete měnit v `Edit > Readout Options`. Tam si především změňte `Normalized real range - resolution:` na `1e-08`. **Uložte pomocí kolečka** vlevo dole.

## Nastavení RAW formátu

Abychom viděli RAW fotky ze zrcadlovek v tom nejvíce "raw" stavu, tedy nedebayernuté, lineární atd; běžte do `View > Explorer Windows > Format Explorer`, kde zvolíte `RAW` formát, poté `Edit Preferences`, klikněte na `Pure Raw` a potvrďte pomocí `OK`.

## Update PixInsight a instalace externích modulů

V `Resources > Updates > Manage Repositories` klikněte `Load` a navigujte do své složky `PixInsight` a vyberte soubor `repositories.txt`, potvrďte pomocí OK. V něm jsou kromě jiného taky zapsány některé externí procesy, které budeme používat, jmenovitě
- StarNet,
- DeepSNR,
- Generalized Hyperbolic Stretch,
- Blink2.

Poté přejděte do `Resources > Update > Check for Updates`, klikněte na `Select All` a `Apply`. Po stažení vypněte PixInsight, kdy na vás vyskočí okno pro potvrzení instalace, tam nechejte zapnuté Restart PixInsight. PixInsight se načte a měl by vám vzkázat, že vše proběhlo v pořádku.

## Načtení ikonek

Pravým kliknutím na plochu PixInsight navigujte na `Process Icons > Load Process Icons`, vyhledejte soubory `Processing.xpsm` a `PreProcessing.xpsm`. Jelikož máte nejspíš jiné rozlišení monitoru než já, tak si ikonky toto pamatují a musíte si je přesunout a znovu uložit. Dole a napravo plochy jsou vidět scroll bars, ujistěte se, že zmizí, tím víte, že jste se dostali do defaultních limitů plochy PixInsight, a současně že jste někde neztratili jednu ikonku. Pokud se vám ikonky nevlezou vertikálně, dejte si je do dvou sloupců. Na ploše na pravé straně taky najdete vertikální linii, která odděluje prostor mezi aktivní pracovní plochou a ikonkama, tu si posuňte tak, aby ikonky zabíraly co nejméně místa. Během toho co jsou zvoleny, pravým kliknutím na ně si je můžete zarovnat pomocí `Arrange Selected Icons > Align Left`. Jak jste spokojeni s umístěním svých ikonek, všechny si je zvolte, pravým kliknutím si je uložte `Save Selected Icons` a přepište si ty původní.

## Nastavení souborů Gaia a MARS

V procesu `Process > Gaia` je v pravém dolním rohu ikonka nářadí, kliknutím na ni vyskočí okno `Gaia Preferences`. Nahoře si zvolte `Data Release: Gaia DR3`, pomocí tlačítka `Select` si zvolte čtyři soubory ve své složce `PixInsight > Gaia`. Stejným způsobem si ty samé soubory nahrajte do `Data Release: Gaia DR3/SP`. Uložte pomocí OK a **aplikujte pomocí kolečka**.

V procesu `Process > Multiscale Gradient Correction` opět klikněte na tlačítko nářadí a přidejte dva soubory databáze MARS umístěné ve vaší složce `PixInsight > Mars`. Zde kolečko klikat nemusíte.

## GPU Akcelerace StarNet a DeepSNR

Následujte přímo oficiální návod na [stránkách StarNet](https://starnetastro.com/documentation/windows-cuda/). Pro mne fungovala druhá metoda přímé instalace knihoven.
