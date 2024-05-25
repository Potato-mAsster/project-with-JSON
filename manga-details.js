 const singleMangaEl = document.getElementById('single-manga');
 const path = "./manga.json"
const urlParams = new URLSearchParams(window.location.search);
const mangaID = urlParams.get('id');

function getMangaById(mangaID) {
  fetch(path)
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

getMangaById(mangaID);
