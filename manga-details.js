const singleMangaEl = document.getElementById('single-manga');

// Получение параметра id из URL
const urlParams = new URLSearchParams(window.location.search);
const mangaID = urlParams.get('id');

// Функция для получения манги по ее идентификатору
function getMangaById(mangaID) {
  fetch('./manga.json')
    .then(res => res.json())
    .then(data => {
      const manga = data.find(m => m.id === parseInt(mangaID));
      if (manga) {
        displayMangaDetails(manga);
      } else {
        singleMangaEl.innerHTML = '<h2>Манга не найдена</h2>';
      }
    })
    .catch(error => {
      console.error('Error fetching manga data:', error);
      singleMangaEl.innerHTML = '<h2>Ошибка загрузки данных манги</h2>';
    });
}

// Функция для отображения информации о манге
function displayMangaDetails(manga) {
  singleMangaEl.innerHTML = `
    <div class="single-manga">
      <h1>${manga.title}</h1>
      <img src="${manga.image_url}" alt="${manga.title}" />
      <div class="single-manga-info">
        <p>Автор: ${manga.author}</p>
        <p>Жанр: ${manga.genre}</p>
        <p>Год: ${manga.year}</p>
      </div>
      <div class="main">
        <p>${manga.description}</p>
      </div>
    </div>
  `;
}

// Вызов функции для получения и отображения информации о манге
getMangaById(mangaID);
