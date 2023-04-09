import requestNews from "../services/service-fetch"

export default class News {
	constructor(parrentElement) {
		this.parrentElementDomEl = document.querySelector(parrentElement)
		this.url = "https://ahj-homeworks-workers-back.onrender.com"
	}

	init() {
		this.newsDomEl = document.createElement("div")
		this.newsDomEl.classList.add("news")
		this.newsDomEl.innerHTML = `
            <div class="news__header">
                <h2 class="news__title">Новости мира и кино</h2><button class="news__reload">Обновить</button>
            </div>
            <ul class="news__content">
            </ul>
        `

		this.newsListDomEl = this.newsDomEl.querySelector(".news__content")

		this.parrentElementDomEl.appendChild(this.newsDomEl)

		this.renderAllNews()
		this.addEvent()
	}

	async renderAllNews() {
		this.newsListDomEl.innerHTML = ""

		this.newsList = await requestNews(`${this.url}/news`)

		this.newsList.forEach(elem => this.createNewsItem(elem))
	}

	createNewsItem({ img, text, title }) {
		const newsItemDomEl = document.createElement("li")
		newsItemDomEl.classList.add("news__item")
		newsItemDomEl.innerHTML = `
            <h3 class="news__item-title">${title} </h3>
                <div class="news__item-content">
                    <img class="news__item-img" src="${this.url}/${img}" alt="аватар" />
                    <p class="news__item-text">
                        ${text}
                    </p>
                </div>
        `

		this.newsListDomEl.appendChild(newsItemDomEl)
	}

	addEvent() {
		this.newsDomEl.querySelector(".news__reload").addEventListener("click", () => this.renderAllNews())
	}
}
