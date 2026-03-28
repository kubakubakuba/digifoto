---
outline: deep
---

Zde je senzam užitečných věcí při psaní tohoto webu.


## Porovnání více fotografií

```vue
<PhotoCompare
	:items="[
		{ src: 'https://pixinsight.com/tutorials/narrowband/19a.jpg', label: 'Original HaGB image', alt: 'Original' },
		{ src: 'https://pixinsight.com/tutorials/narrowband/19b.jpg', label: 'HaRGB image', alt: 'HaRGB' },
		{ src: 'https://pixinsight.com/tutorials/narrowband/19c.jpg', label: 'Color-corrected HaGB image', alt: 'Color-corrected' }
	]"
	:initialIndex="0"
/>
```

<PhotoCompare
	:items="[
		{ src: 'https://pixinsight.com/tutorials/narrowband/19a.jpg', label: 'Original HaGB image', alt: 'Original' },
		{ src: 'https://pixinsight.com/tutorials/narrowband/19b.jpg', label: 'HaRGB image', alt: 'HaRGB' },
		{ src: 'https://pixinsight.com/tutorials/narrowband/19c.jpg', label: 'Color-corrected HaGB image', alt: 'Color-corrected' }
	]"
	:initialIndex="0"
/>

## Inline obrázky

```vue
<Inline>/img/pixi/output-013.webp</Inline>

<Inline style="width: 50%; display: block; margin: auto;">/img/odfotonupopixel/image14.webp</Inline>
```

<Inline>/img/pixi/output-013.webp</Inline>

<Inline style="width: 50%; display: block; margin: auto;">/img/odfotonupopixel/image14.webp</Inline>

## Info boxy

```vue
:::warning Info
Test Test Info
:::

:::info Info
Test Test Info
:::
```

:::warning Info
Test Test Info
:::

:::info Info
Test Test Info
:::