---
title: Instalace PS a LrC na Linuxu
outline: deep
---

# Instalace Adobe Photoshop a Lightroom na Linuxu

Tento návod popisuje jak nainstalovat Photoshop a Lightroom na Linuxu, pomocí aplikace [`WinApps`](https://github.com/winapps-org/winapps). Pokud se vysketne nějaká chyba doporučuji zkonzultovat návod
na [GitHubu](https://github.com/winapps-org/winapps).

Aplikace funguje na principu remote desktopu, kdy na vašem počítači běží v pozadí instance Windows pod dockerem, na kterou se pomocí vzdálené obrazovky připojíte a vykreslíte samotná okna aplikací, které spustíte.
Vše velice pěkně funguje, a chvílemi to ani nevypadá, že by se jednalo o emulaci (samozřejmě někdy to má i své mouchy).

## Instalace Dockeru

Nainstalujte docker engine a docker compose plugin pro vaši distribuci
pomocí návodu na [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/), nebo následovně:

::: code-group

```bash [Arch]
sudo pacman -Syu

sudo pacman -S docker docker-compose

sudo systemctl enable docker.service

sudo systemctl start docker.service

sudo usermod -aG docker $USER

newgrp docker
```

```bash [Debian]
sudo apt-get update

sudo apt-get install ca-certificates curl

sudo install -m 0755 -d /etc/apt/keyrings

sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc

sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo systemctl start docker

sudo groupadd docker

sudo usermod -aG docker $USER

newgrp docker
```

```bash [Ubuntu]
sudo apt-get update

sudo apt-get install ca-certificates curl

sudo install -m 0755 -d /etc/apt/keyrings

sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc

sudo chmod a+r /etc/apt/keyrings/docker.asc

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo systemctl start docker

sudo groupadd docker

sudo usermod -aG docker $USER

newgrp docker
```

```bash [Fedora]
sudo dnf -y install dnf-plugins-core

sudo dnf-3 config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo

sudo dnf install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

sudo systemctl enable --now docker
```

:::


## Instalace Windows

Vytvořte si soubor `compose.yml`, v nějaké vám známé složce, například v `/home/<user>/winapps`, změňte nastavení RAM, CPU cores a velikost disku (fyzická velikost která bude vytvořena ve složce `./data`).

```docker {7-13,23,24}
name: "winapps"
services:
  windows:
    image: ghcr.io/dockur/windows:latest
    container_name: WinApps
    environment:
      VERSION: "10"
      RAM_SIZE: "32G"
      CPU_CORES: "8"
      DISK_SIZE: "64G"
      USERNAME: "expa"
      PASSWORD: "x"
      HOME: "${HOME}/Documents/winapps/"
    ports:
      - "127.0.0.1:8006:8006"
      - "127.0.0.1:3389:3389/tcp"
      - "127.0.0.1:3389:3389/udp"
    cap_add:
      - NET_ADMIN
    stop_grace_period: 120s
    restart: on-failure
    volumes:
      - ./data:/storage
      - ${HOME}/Documents/winapps/:/shared
      - ./oem:/oem
    devices:
      - /dev/kvm
      - /dev/net/tun
    networks:
      win_isolated:
        ipv4_address: 192.168.5.2

networks:
  win_isolated:
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 192.168.5.0/24
```

:::warning Izolace kontejneru od sítě
S tímto nastavením je docker kontejner přístupný na `127.0.0.1:8006` (`localhost:8006`) a `192.168.5.0:8006`. Tento kontejner se nachází v docker síti `win_isolated` kterou lze
odizolovat od přístupu k internetu například následujícím způsobem

Vytvořte soubor systemd service v `/etc/systemd/system/win_isolate.service`

```ini
[Unit]
Description=Internet isolation rules for WinApps
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
ExecStartPre=/bin/bash -c "while ! iptables -nL DOCKER-USER >/dev/null 2>&1; do sleep 1; done"
ExecStart=/usr/bin/iptables -I DOCKER-USER -s 192.168.5.2 -j DROP
ExecStop=/usr/bin/iptables -D DOCKER-USER -s 192.168.5.2 -j DROP
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

a spusťe ji pomocí

```bash
sudo systemctl daemon-reload
sudo systemctl enable win_isolate.service
sudo systemctl start win_isolate.service
```
:::

Samotný docker kontejner spustíte pomocí
```bash
docker compose up

#nebo

docker compose up -d #bez výpisu, lepší nejdříve spustit hodní příkaz
```

Po automatickém stažení windows image se windows nainstaluje a bude dostupný na `localhost:8006`. Do tohoto systému nainstaluje všechny potřebné aplikace, jako je Photoshop a Lightroom, instalační soubory stačí zkopírovat do sdílené složky definované v `compose.yml` (v příkladu je to `Documents/winapps/`).

> [!IMPORTANT] CameraRaw - důležité
Pro Photoshop je nutné nainsalovat starší verzi CameraRaw pluginu, jelikož nová vyžaduje hardwarovou akceleraci, která není podporovaná.
>
>Funkční verzi můžete najít na [https://helpx.adobe.com/camera-raw/kb/camera-raw-plug-in-installer.html](https://helpx.adobe.com/camera-raw/kb/camera-raw-plug-in-installer.html), jedná se o verzi [AdobeCameraRaw_x64_14_5.exe](https://download.adobe.com/pub/adobe/photoshop/cameraraw/win/14.x/AdobeCameraRaw_x64_14_5.exe).
>
>Tento soubor si opět překopírujte do Windowsů a nainstalujte. Ověřte, že vám funguje import jakékoliv RAW fotky a CameraRaw nehlásí žádnou chybu.

### Dark mode

Pokud chcete změnit systémový theme na dark mode (s červeným zabarvením), stačí pustit následující skript

:::details darkmode.ps1
```powershell [darkmode.ps1]
$RegPath = "HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\Accent"


#Accent Color Menu Key
$AccentColorMenuKey = @{
	Key   = 'AccentColorMenu';
	Type  = "DWORD";
	Value = '0xff2311e8'
}

If ($Null -eq (Get-ItemProperty -Path $RegPath -Name $AccentColorMenuKey.Key -ErrorAction SilentlyContinue))
{
	New-ItemProperty -Path $RegPath -Name $AccentColorMenuKey.Key -Value $AccentColorMenuKey.Value -PropertyType $AccentColorMenuKey.Type -Force
}
Else
{
	Set-ItemProperty -Path $RegPath -Name $AccentColorMenuKey.Key -Value $AccentColorMenuKey.Value -Force
}


#Accent Palette Key
$AccentPaletteKey = @{
	Key   = 'AccentPalette';
	Type  = "BINARY";
	Value = 'ff,bd,c2,00,ff,99,a1,00,f0,59,65,00,e8,11,23,00,99,00,0d,00,6e,00,09,00,47,00,06,00,69,79,7e,00'
}
$hexified = $AccentPaletteKey.Value.Split(',') | ForEach-Object { "0x$_" }

If ($Null -eq (Get-ItemProperty -Path $RegPath -Name $AccentPaletteKey.Key -ErrorAction SilentlyContinue))
{
	New-ItemProperty -Path $RegPath -Name $AccentPaletteKey.Key -PropertyType Binary -Value ([byte[]]$hexified)
}
Else
{
	Set-ItemProperty -Path $RegPath -Name $AccentPaletteKey.Key -Value ([byte[]]$hexified) -Force
}


#MotionAccentId_v1.00 Key
$MotionAccentIdKey = @{
	Key   = 'MotionAccentId_v1.00';
	Type  = "DWORD";
	Value = '0x000000db'
}

If ($Null -eq (Get-ItemProperty -Path $RegPath -Name $MotionAccentIdKey.Key -ErrorAction SilentlyContinue))
{
	New-ItemProperty -Path $RegPath -Name $MotionAccentIdKey.Key -Value $MotionAccentIdKey.Value -PropertyType $MotionAccentIdKey.Type -Force
}
Else
{
	Set-ItemProperty -Path $RegPath -Name $MotionAccentIdKey.Key -Value $MotionAccentIdKey.Value -Force
}



#Start Color Menu Key
$StartMenuKey = @{
	Key   = 'StartColorMenu';
	Type  = "DWORD";
	Value = '0xff0d0099'
}

If ($Null -eq (Get-ItemProperty -Path $RegPath -Name $StartMenuKey.Key -ErrorAction SilentlyContinue))
{
	New-ItemProperty -Path $RegPath -Name $StartMenuKey.Key -Value $StartMenuKey.Value -PropertyType $StartMenuKey.Type -Force
}
Else
{
	Set-ItemProperty -Path $RegPath -Name $StartMenuKey.Key -Value $StartMenuKey.Value -Force
}


Stop-Process -ProcessName explorer -Force -ErrorAction SilentlyContinue

Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize" -Name "AppsUseLightTheme" -Value 0
Set-ItemProperty -Path "HKCU:\Software\Microsoft\Windows\CurrentVersion\Themes\Personalize" -Name "SystemUsesLightTheme" -Value 0

Set-ItemProperty -Path "HKCU:\SOFTWARE\Microsoft\Windows\DWM" -Name "ColorPrevalence" -Value 1 -Type DWord

$DWMPath = "HKCU:\Software\Microsoft\Windows\DWM"
Set-ItemProperty -Path $DWMPath -Name "ColorPrevalence" -Value 0 -Force

```
:::

## Instalace dependencí

::: code-group

```bash [Debian/Ubuntu]
sudo apt install -y curl dialog freerdp3-x11 git iproute2 libnotify-bin netcat-openbsd
```

```bash [Fedore/RHEL]
sudo dnf install -y curl dialog freerdp git iproute libnotify nmap-ncat
```

```bash [Arch]
sudo pacman -Syu --needed -y curl dialog freerdp git iproute2 libnotify openbsd-netcat
```

```bash [openSUSE]
sudo zypper install -y curl dialog freerdp git iproute2 libnotify-tools netcat-openbsd
```

```bash [Gentoo]
sudo emerge --ask=n net-misc/curl dev-util/dialog net-misc/freerdp:3 dev-vcs/git sys-apps/iproute2 x11-libs/libnotify net-analyzer/openbsd-netcat
```
:::

Vytvořte [konfigurační soubor](https://github.com/winapps-org/winapps?tab=readme-ov-file#step-3-create-a-winapps-configuration-file) pro WinApps v `~/.config/winapps/winapps.conf`

```bash
RDP_USER="expa"

RDP_PASS="x"

RDP_DOMAIN=""

RDP_IP="127.0.0.1"

VM_NAME="RDPWindows"

WAFLAVOR="docker"

RDP_SCALE="100"

REMOVABLE_MEDIA="/run/media"

RDP_FLAGS="/cert:tofu /sound /microphone +home-drive"

DEBUG="true"

AUTOPAUSE="off"

AUTOPAUSE_TIME="300"

FREERDP_COMMAND=""

PORT_TIMEOUT="5"

RDP_TIMEOUT="30"

APP_SCAN_TIMEOUT="60"

BOOT_TIMEOUT="120"

HIDEF="on"
```

Po té co nainstalujete veškerý software zkuste spustit přímé spojení přes RDP, ne přes prohlížeč:
```bash
xfreerdp3 /u:"expa" /p:"x" /v:127.0.0.1 /cert:tofu

#na fedoře/opensuse to bude, jiné distribude se mohou lišit

xfreerdp /u:"expa" /p:"x" /v:127.0.0.1 /cert:tofu
```

Pokud se vám RDP připojí a otevře se okno, je vše vpořádku.



## Instalace WinApps

Nainstalujte WinApps pomocí

```bash
bash <(curl https://raw.githubusercontent.com/winapps-org/winapps/main/setup.sh)
```

<Inline>/img/winapps/installer.webp</Inline>

Install -> Current User -> Vyberte aplikace které chcete nainstalovat -> Vyberte dodatečné aplikace

Výběr aplikací se provádí mezerníkem, pro další krok enter.

:::info Photoshop 2025
Pokud vám instalátor nenalezne nový Photoshop 2025 (dával jsem na GitHub pull request, ještě není schválen), stačí git stáhnout:
```bash
git clone https://github.com/winapps-org/winapps.git
```

A ve složce `winapps/apps/` zkopírovat složku `photoshop-2024` jako `photoshop-2025`, a v souboru `photoshop-2025/info` změnit všechny zmínky o Photoshopu 2024 na Photoshop 2025.

A pak pustit instalaci pomocí
```bash
./install.sh
```
:::

Pokud vám instalace zahlásí že se nedaří připojit k RDP, někdy je nutné zrestartovat kontejner, a nebo se po přihlášení manuálně odhlásit, a pak pustit instalaci znova.

Po instalaci by už jen mělo stačit pustit program ze seznamu programů a vše by mělo být funkční. Nainstalovali jste Photoshop na Linux! *(i když vlastně vůbec)*
