# astro starter 4.5 minimal + KeyStatic headless CMS

_стартер буду дорабатывать по мере понимая, чего нужно или чего убрать._

## Пакеты

- astro 4.5
- tailwind (+ @tailwindcss/typography)
- keystatic (core & astro)
- react (astro)
- astro-compress
- astro-meta-tags
- sitemap
- markdoc
- mdx
- rss
- PWA

## [slug].astro страница поста

```astro
# type = article
<MainLayout {...post.data} type>
	<main class="prose mx-auto">
		<Content />
	</main>
</MainLayout>
```

## Необходимые настройки

- в settings.ts

## Если не хочешь manifest в проекте

**Это в /layouts/MainLayout.astro**

```astro
<SEOHead
  noManifest
/>
```

**Также в astro.config.mjs - убираешь vite**

```mjs
	vite: {
		plugins: [
			VitePWA({
				registerType: "autoUpdate",
				manifest,
				workbox: {
					globDirectory: "dist",
					globPatterns: [
						"**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}",
					],
					navigateFallback: null,
				},
			}),
		],
	},
```

## Для создания иконок для PWA из 1024x1024 используй сервис

- [favycon.vercel.app](https://favycon.vercel.app/)

## Content Collection

Если **draft: true**, то НЕ будет в конечном итоге в сборке.

```ts
const posts = defineCollection({
	schema: ({ image }) =>
		z.object({
			title: z.string().default("title"),
			description: z.string().default("description"),
			ogImage: image().describe("Изображение").optional(),
			// "2024-02-21T15:30:00Z"
			// https://armno.in.th/blog/exploring-keystatic/#published-date-field
			datePublished: z.union([z.string().datetime(), z.date()]),
			categories: z.array(z.string()).default(["другое"]),
			tags: z.array(z.string()).default(["прочее"]),
			draft: z.boolean().default(false),
		}),
})
```

## Структура проекта тест

```md
├── README.md
├── astro.config.mjs
├── keystatic.config.ts
├── package-lock.json
├── package.json
├── public
│   ├── default-ogImage.png
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── images
│   │       ├── pages
│   │       │   └── test
│   │       │       └── ogImage.png
│   │       └── posts
│   │           └── zagolovok-testa-posta
│   │               ├── 7c7f04be4e564d2270cb2e1d591e92c7.jpg
│   │               └── ogImage.png
│   ├── components
│   │   ├── Date.astro
│   │   ├── Favicons.astro
│   │   ├── Post.astro
│   │   ├── SEOHead.astro
│   │   └── partials
│   │       ├── Footer.astro
│   │       └── Header.astro
│   ├── content
│   │   ├── config.ts
│   │   ├── pages
│   │   │   └── test.mdx
│   │   └── posts
│   │       └── zagolovok-testa-posta.mdx
│   ├── env.d.ts
│   ├── layouts
│   │   └── MainLayout.astro
│   ├── pages
│   │   ├── [page].astro
│   │   ├── index.astro
│   │   ├── posts
│   │   │   └── [slug].astro
│   │   ├── robots.txt.ts
│   │   ├── rss.xml.js
│   │   └── tags
│   │       └── [tag].astro
│   ├── settings.ts
│   ├── styles
│   │   └── tailwind.css
│   └── utils
│       ├── libs
│       │   └── formatDate.ts
│       └── manifest.ts
├── tailwind.config.mjs
└── tsconfig.json
```
