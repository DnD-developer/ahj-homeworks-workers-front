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
		this.connectWorker()
	}

	async renderAllNews() {
		this.renderPopupLoad()
		try {
			this.newsList = await requestNews(`${this.url}/news`)
			this.newsListDomEl.innerHTML = ""
			this.newsList.forEach(elem => this.createNewsItem(elem))
		} catch (error) {
			this.newsList = []
			this.renderPopupError()
		}
	}

	connectWorker() {
		if (navigator.serviceWorker) {
			window.addEventListener("load", async () => {
				try {
					await navigator.serviceWorker.register("../services/service-worker.js", { scope: "./" })
					console.log("Service worker is register!")
				} catch (e) {
					console.log(e)
				}
			})
		}
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

	renderPopupLoad() {
		this.newsListDomEl.innerHTML = ""

		for (let index = 0; index < 3; index += 1) {
			const loadItemDomEl = document.createElement("li")
			loadItemDomEl.classList.add("load-item")
			loadItemDomEl.innerHTML = `
            <div class="load-item__title"></div>
                <div class="load-item__content">
                    <div class="load-item__img"></div>
                    <div class="load-item__text">
						<div class="load-item__text-up"></div>
						<div class="load-item__text-bottom"></div>
                    </div>
                </div>
        `

			this.newsListDomEl.appendChild(loadItemDomEl)
		}
	}

	renderPopupError() {
		const errorPopupDomEl = document.createElement("div")
		errorPopupDomEl.classList.add("error-popup")
		errorPopupDomEl.innerHTML = `
			<h2 class="error-popup__title">Не удалось загрузить данные. Проверьте подключение и обновите страницу</h2>
		`

		this.newsDomEl.appendChild(errorPopupDomEl)
	}

	addEvent() {
		this.newsDomEl.querySelector(".news__reload").addEventListener("click", () => this.renderAllNews())
	}
}
