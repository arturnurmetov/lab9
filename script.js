// Данные о фильмах
const movies = [
    {
      id: 1,
      title: "Интерстеллар",
      poster: "https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/430042eb-ee69-4818-aed0-a312400a26bf/600x900",
      genre: "Фантастика, драма, приключения",
      director: "Кристофер Нолан",
      cast: "Мэттью Макконахи, Энн Хэтэуэй, Джессика Честейн, Майкл Кейн",
      ageRating: "12+",
      duration: "169 мин.",
      description:
        "Когда засуха приводит человечество к продовольственному кризису, коллектив исследователей и учёных отправляется сквозь червоточину (которая предположительно соединяет области пространства-времени через большое расстояние) в путешествие, чтобы превзойти прежние ограничения для космических путешествий человека и переселить человечество на другую планету.",
      trailerUrl: "https://rutube.ru/video/431d40d0b432eb2c37c8d427bce15356/",
      videoSource: "rutube",
    },
    {
      id: 2,
      title: "Зеленая миля",
      poster: "https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/4057c4b8-8208-4a04-b169-26b0661453e3/600x900",
      genre: "Драма, фэнтези, криминал",
      director: "Фрэнк Дарабонт",
      cast: "Том Хэнкс, Дэвид Морс, Бонни Хант, Майкл Кларк Дункан",
      ageRating: "16+",
      duration: "189 мин.",
      description:
        "Пол Эджкомб — начальник блока смертников в тюрьме «Холодная гора», каждый из узников которого однажды проходит «зеленую милю» по пути к месту казни. Пол повидал много заключённых и надзирателей за время работы. Однако гигант Джон Коффи, обвинённый в страшном преступлении, стал одним из самых необычных обитателей блока.",
      trailerUrl: "https://rutube.ru/video/8d94f71e677b4996d075330c519d3e75/",
      videoSource: "rutube",
    },
    {
      id: 3,
      title: "Побег из Шоушенка",
      poster: "https://avatars.mds.yandex.net/get-kinopoisk-image/1946459/bf93b465-1189-4155-9dd1-cb9fb5cb1bb5/600x900",
      genre: "Драма, криминал",
      director: "Фрэнк Дарабонт",
      cast: "Тим Роббинс, Морган Фриман, Боб Гантон, Уильям Сэдлер",
      ageRating: "16+",
      duration: "142 мин",
      description:
        "Бухгалтер Энди Дюфрейн обвинён в убийстве собственной жены и её любовника. Оказавшись в тюрьме под названием Шоушенк, он сталкивается с жестокостью и беззаконием, царящими по обе стороны решётки. Каждый, кто попадает в эти стены, становится их рабом до конца жизни. Но Энди, обладающий живым умом и доброй душой, находит подход как к заключённым, так и к охранникам, добиваясь их особого к себе расположения.",
      trailerUrl: "https://rutube.ru/video/503fcdb091ee0b72c52b5e3be0bf72e8/",
      videoSource: "rutube",
    },
  ]
  
  // Функция для преобразования URL видео в формат для встраивания
  function getEmbedUrl(url, source) {
    if (!url) return null
  
    // Обработка YouTube URL
    if (source === "youtube" || url.includes("youtube.com") || url.includes("youtu.be")) {
      // Если URL уже в формате embed, используем его
      if (url.includes("/embed/")) {
        return url + (url.includes("?") ? "&autoplay=1" : "?autoplay=1")
      }
  
      // Извлекаем ID видео из YouTube URL
      let videoId = ""
      if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1]
      } else if (url.includes("v=")) {
        videoId = url.split("v=")[1].split("&")[0]
      }
  
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`
      }
    }
  
    // Обработка VK URL
    if (source === "vk" || url.includes("vk.com/video")) {
      // Регулярное выражение для извлечения ID владельца и ID видео из VK URL
      const vkRegex = /vk\.com\/video(-?\d+)_(\d+)/
      const match = url.match(vkRegex)
  
      if (match && match.length >= 3) {
        const ownerId = match[1]
        const videoId = match[2]
        return `https://vk.com/video_ext.php?oid=${ownerId}&id=${videoId}&hd=1&autoplay=1`
      }
    }
  
    // Если не удалось обработать URL, возвращаем исходный
    return url
  }
  
  // Функция для отображения информации о фильме
  function displayMovieInfo(movie) {
    const movieInfoContainer = document.getElementById("movie-info")
  
    // Создаем HTML для информации о фильме
    const movieHTML = `
          <div class="movie-content">
              <div class="movie-poster">
                  <img src="${movie.poster}" alt="Постер фильма ${movie.title}">
              </div>
              <div class="movie-details">
                  <h2 class="movie-title">${movie.title}</h2>
                  
                  <div class="movie-info-list">
                      <div class="movie-info-item">
                          <span class="movie-info-label">Жанр:</span>
                          <span>${movie.genre || "—"}</span>
                      </div>
                      <div class="movie-info-item">
                          <span class="movie-info-label">Режиссер:</span>
                          <span>${movie.director || "—"}</span>
                      </div>
                      <div class="movie-info-item">
                          <span class="movie-info-label">В ролях:</span>
                          <span>${movie.cast || "—"}</span>
                      </div>
                      <div class="movie-info-item">
                          <span class="movie-info-label">Возраст:</span>
                          <span>${movie.ageRating || "—"}</span>
                      </div>
                      <div class="movie-info-item">
                          <span class="movie-info-label">Длительность:</span>
                          <span>${movie.duration || "—"}</span>
                      </div>
                  </div>
                  
                  <button class="buy-ticket-btn">КУПИТЬ БИЛЕТ</button>
                  
                  <div class="movie-description-container">
                      <h3 class="movie-description-title">Описание</h3>
                      <p class="movie-description">${movie.description}</p>
                  </div>
              </div>
          </div>
          
          <div class="trailer-section">
              <h3 class="trailer-title">Трейлер</h3>
              <div class="trailer-container">
                  <div class="trailer-placeholder" id="trailer-placeholder" data-source="${movie.videoSource || "youtube"}" data-url="${movie.trailerUrl}">
                      <div class="play-button">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                      </div>
                      <img src="${movie.poster}" alt="Трейлер фильма ${movie.title}">
                  </div>
              </div>
          </div>
      `
  
    // Вставляем HTML в контейнер
    movieInfoContainer.innerHTML = movieHTML
  
    // Добавляем обработчик события для воспроизведения трейлера
    const trailerPlaceholder = document.getElementById("trailer-placeholder")
    trailerPlaceholder.addEventListener("click", function () {
      const trailerContainer = this.parentElement
      const videoUrl = this.getAttribute("data-url")
      const videoSource = this.getAttribute("data-source")
  
      // Получаем URL для встраивания
      const embedUrl = getEmbedUrl(videoUrl, videoSource)
  
      if (!embedUrl) {
        console.error("Не удалось получить URL для встраивания видео")
        return
      }
  
      this.remove()
  
      const iframe = document.createElement("iframe")
      iframe.src = embedUrl
      iframe.title = `Трейлер фильма`
      iframe.frameBorder = "0"
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      iframe.allowFullscreen = true
      iframe.className = "trailer-iframe"
  
      trailerContainer.appendChild(iframe)
    })
  }
  
  // Выбираем случайный фильм при загрузке страницы
  document.addEventListener("DOMContentLoaded", () => {
    const randomIndex = Math.floor(Math.random() * movies.length)
    const randomMovie = movies[randomIndex]
    displayMovieInfo(randomMovie)
  })
  