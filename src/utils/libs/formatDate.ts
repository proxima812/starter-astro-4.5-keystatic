export function formatDate(dateInput: string, locale: string = "ru-RU"): string {
	// Преобразование исходной строки в объект Date
	const date = new Date(dateInput)

	// Получение часового пояса пользователя
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

	const options: Intl.DateTimeFormatOptions = {
		year: "numeric", // год
		month: "long", // месяц
		day: "numeric", // день
		timeZone, // использование часового пояса пользователя
	}

	// Форматирование даты с учетом локали и часового пояса пользователя
	return date.toLocaleDateString(locale, options)
}
