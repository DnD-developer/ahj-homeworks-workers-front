import avatar from "../../layout/assets/img/preview.jpeg"

export default class News {
	constructor(parrentElement) {
		this.parrentElementDomEl = document.querySelector(parrentElement)
		this.newsList = [
			{
				title: "Новость 1",
				img: avatar,
				text: "Обратите внимание, даже если у пользователя нет подключения, страница всё равно должна отображаться, но в режиме 'загрузки' и после неудачной попытки соединения переходить в режим:"
			},
			{
				title: "Новость 2",
				img: avatar,
				text: "Реализуйте подобный интерфейс, закешировав статические ресурсы и показывая данный внешний вид до момента загрузки данных"
			},
			{
				title: "Новость 3",
				img: avatar,
				text: "Реализуйте подобный интерфейс, закешировав статические ресурсы и показывая данный внешний вид до момента загрузки данных"
			}
		]
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

		this.newsList.forEach(elem => this.createNewsItem(elem))

		this.parrentElementDomEl.appendChild(this.newsDomEl)
	}

	createNewsItem({ img, text, title }) {
		const newsItemDomEl = document.createElement("li")
		newsItemDomEl.classList.add("news__item")
		newsItemDomEl.innerHTML = `
            <h3 class="news__item-title">${title} </h3>
                <div class="news__item-content">
                    <img class="news__item-img" src="${img}" alt="аватар" />
                    <p class="news__item-text">
                        ${text}
                    </p>
                </div>
        `

		this.newsListDomEl.appendChild(newsItemDomEl)
	}
}
