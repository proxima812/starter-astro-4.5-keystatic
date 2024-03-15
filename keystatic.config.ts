import { collection, config, fields } from "@keystatic/core"

// https://keystatic.com/docs/github-mode
const isProd = import.meta.env.PROD
const REPO_OWNER = ""
const REPO_NAME = ""

export default config({
	storage: isProd
		? {
				kind: "github",
				repo: `${REPO_OWNER}/${REPO_NAME}`,
		  }
		: { kind: "local" },
	ui: {
		brand: {
			name: "Название",
		},
	},
	collections: {
		posts: collection({
			label: "Посты/Статьи",
			slugField: "title",
			path: "src/content/posts/*",
			entryLayout: "content",
			columns: ["title", "datePublished", "draft"],
			format: { contentField: "content" },
			schema: {
				title: fields.slug({ name: { label: "Заголовок" } }),
				description: fields.text({
					label: "Описание",
					multiline: true,
				}),
				datePublished: fields.datetime({
					defaultValue: { kind: "now" },
					label: "Дата публикации",
				}),
				ogImage: fields.image({
					label: "Изображение",
					directory: "src/assets/images/posts",
					publicPath: "../../assets/images/posts/",
				}),
				content: fields.mdx({
					label: "Контент",
					description: "",
					options: {
						image: {
							directory: "src/assets/images/posts",
							publicPath: "../../assets/images/posts/",
						},
					},
				}),
				tags: fields.multiselect({
					label: "Теги",
					options: [{ label: "Тег", value: "Тег" }],
				}),
				draft: fields.checkbox({
					label: "Черновик",
					defaultValue: false,
					description: "Установите как черновик, чтобы предотвратить его публикацию.",
				}),
			},
		}),
		pages: collection({
			label: "Страницы",
			slugField: "title",
			path: "src/content/pages/*",
			entryLayout: "content",
			columns: ["title", "description", "noIndex"],
			format: { contentField: "content" },
			schema: {
				title: fields.slug({ name: { label: "SEO Заголовок" } }),
				description: fields.text({
					label: "SEO Описание",
					multiline: true,
				}),
				ogImage: fields.image({
					label: "Изображение",
					directory: "src/assets/images/pages",
					publicPath: "../../assets/images/pages/",
				}),
				noIndex: fields.checkbox({
					label: "НЕ Индексировать страницу?",
					defaultValue: false,
				}),
				content: fields.mdx({
					label: "Контент",
					options: {
						image: {
							directory: "src/assets/images/pages",
							publicPath: "../../assets/images/pages/",
						},
					},
				}),
			},
		}),
	},
})
