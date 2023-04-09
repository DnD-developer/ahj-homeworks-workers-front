export default async function requestNews(url) {
	try {
		const response = await fetch(url)

		const result = await response.json()

		return result
	} catch (error) {
		return []
	}
}
