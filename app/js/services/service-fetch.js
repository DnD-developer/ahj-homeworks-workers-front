export default async function requestNews(url) {
	const response = await fetch(url)

	const result = await response.json()

	return result
}
