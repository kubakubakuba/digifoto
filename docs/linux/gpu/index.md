---
outline: deep
---

# GPU Akcelerace v PixInsight na Arch Linuxu s Blackwell

Návod pro zprovoznění CUDA akcelerace AI nástrojů v PixInsightu (BlurXTerminator, StarXTerminator, NoiseXTerminator) na Arch Linuxu s nVidia RTX 50. série (architektura Blackwell).
Jedná se o izolovanou metodu instalace, která umisťuje všechny legacy závislosti do lokálního adresáře. Tím se vyhneme systémovým konfliktům a zajišťujeme kompatibilitu s novou architekturou Blackwell.

## Předpoklady

Ověřte, že jsou nainstalované základní nVidia ovladače a vývojové nástroje:

```bash
sudo pacman -S nvidia nvidia-utils base-devel
```

Na nějakém místě vytvořte adresář pro uložení knihoven:

```bash
mkdir -p ~/.pi_gpu/cuda/lib64
mkdir -p ~/.pi_gpu/tensorflow
```

## Stažení Tensorflow

PixInsight AI nástroje jsou aktuálně zkompilovány pro TensorFlow 2.15.0 C API. Stáhněte tedy tuto verzi:

```bash
cd ~/Downloads
curl -LO https://storage.googleapis.com/tensorflow/libtensorflow/libtensorflow-gpu-linux-x86_64-2.15.0.tar.gz
tar -C ~/.pi_gpu/tensorflow -xzf libtensorflow-gpu-linux-x86_64-2.15.0.tar.gz
```

## Stažení CUDA a cuDNN

### CUDA 12.8

Blackwell vyžaduje CUDA 12.8 pro správnou JIT kompilaci.

::: warning Poznámka
Oficiální NVIDIA .run instalátor na Archi selže kvůli neshodě verzí libxml2 (verze CUDA je z roku 2023). Musíte extrakci provést na kompatibilním systému (např. Debian/Ubuntu server nebo VM) a poté soubory přenést.
:::

#### Na kompatibilním systému (Debian/Ubuntu):

```bash
#stáhne a extrahuje toolkit do lokálního adresáře
sh cuda_12.8.0_570.86.10_linux.run --silent --toolkit --toolkitpath=$HOME/nvidia_temp --no-opengl-libs

cd $HOME/nvidia_temp
tar -chzf cuda_essential.tar.gz lib64/ nvvm/
```

#### Na host systému:

Překopírujte `cuda_essential.tar.gz` do `~/.pi_gpu/` a extrahujte jej:

```bash
cd ~/.pi_gpu
tar -xzf cuda_essential.tar.gz -C cuda/
```

### cuDNN 8.9.7

```bash
#stáhněte cudnn archiv
curl -LO https://developer.download.nvidia.com/compute/cudnn/redist/cudnn/linux-x86_64/cudnn-linux-x86_64-8.9.7.29_cuda12-archive.tar.xz

#překopírujte knihovny
tar -xf cudnn-linux-x86_64-8.9.7.29_cuda12-archive.tar.xz
cp -P cudnn-linux-x86_64-8.9.7.29_cuda12-archive/lib/* ~/.pi_gpu/cuda/lib64/
```

## Správně nastavení symlinků

TensorFlow 2.15.0 vyžaduje specifické názvy sdílených objektů pro inicializaci:

```bash
cd ~/.pi_gpu/cuda/lib64
ln -sf libcudnn.so.8.9.7 libcudnn.so.8
ln -sf libcudnn_ops_infer.so.8.9.7 libcudnn_ops_infer.so.8
ln -sf libcudnn_cnn_infer.so.8.9.7 libcudnn_cnn_infer.so.8
ln -sf libcudnn_adv_infer.so.8.9.7 libcudnn_adv_infer.so.8
```

## Konfigurace PixInsight.sh

Upravte spouštěcí skript PixInsightu tak, aby prioritizoval knihovny v sandboxu a poskytl cestu JIT kompilátoru.

Přidejte tyto řádky blízko začátku souboru (předefinujte proměnnout LD_LIBRARY_PATH). Odstraňte jakékoli řádky, které vynucují software rendering, např. `LIBGL_ALWAYS_SOFTWARE=1`.

```bash
export XLA_FLAGS="--xla_gpu_cuda_data_dir=$HOME/.pi_gpu/cuda"
export TF_FORCE_GPU_ALLOW_GROWTH="true"

...

LD_LIBRARY_PATH=$HOME/.pi_gpu/cuda/lib64:$HOME/.pi_gpu/tensorflow/lib:$dirname/lib:$dirname
```

## Testování

Spusťte PixInsight z terminálu:

```bash
/opt/PixInsight/bin/PixInsight.sh
```

::: warning První run
Když se poprvé aplikuje AI proces, TensorFlow provede JIT kompilaci pro překlad kódu na architekturu Blackwell. První run BXT tedy bude trvat déle, potom už by každé další spuštění mělo být o hodně rychlejší než na CPU. Případné errory by měly být vidět v konzoli. PixInsight pak jde normálně spouštět i mimo konzoli.
:::
