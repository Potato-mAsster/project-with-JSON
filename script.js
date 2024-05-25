const search = document.getElementById('search'),
  submit = document.getElementById('submit'),
  random = document.getElementById('random'),
  mangasEl = document.getElementById('mangas'),
  resultHeading = document.getElementById('result-heading'),
  single_mangaEl = document.getElementById('single-manga');

fetch('./manga.json')
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });

function searchManga(e) {
  e.preventDefault();
  single_mangaEl.innerHTML = '';
  const term = search.value;
  if (term.trim()) {
    fetch('./manga.json')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Результаты поиска для '${term}':</h2>`;

        const filteredMangas = data.filter(manga =>
          manga.title.toLowerCase().includes(term.toLowerCase())
        );

        if (filteredMangas.length === 0) {
          resultHeading.innerHTML = `<p>Нет результатов. Попробуйте снова!</p>`;
        } else {
          mangasEl.innerHTML = filteredMangas
            .map(
              manga => `
            <div class="manga">
              <img src="${manga.image_url}" alt="${manga.title}" />
              <div class="manga-info" data-mangaID="${manga.id}">
                <h3>${manga.title}</h3>
                <p>${manga.author}</p>
              </div>
            </div>
          `
            )
            .join('');
        }
      });
    search.value = '';
  } else {
    alert('Пожалуйста, введите запрос');
  }
}

document.getElementById('all').addEventListener('click', function() {
  displayFilteredManga('all');
});

document.getElementById('action').addEventListener('click', function() {
  displayFilteredManga('Экшен');
});

document.getElementById('romance').addEventListener('click', function() {
  displayFilteredManga('Романтика');
});

document.getElementById('fantasy').addEventListener('click', function() {
  displayFilteredManga('Фэнтези');
});

function displayFilteredManga(genre) {
  fetch('./manga.json')
    .then(res => res.json())
    .then(data => {
      const filteredMangas = genre === 'all' ? data : data.filter(manga => manga.genre.includes(genre));
      
      if (filteredMangas.length === 0) {
        resultHeading.innerHTML = `<p>Нет результатов для жанра '${genre}'. Попробуйте снова!</p>`;
      } else {
        resultHeading.innerHTML = `${genre}:</h2>`;
        mangasEl.innerHTML = filteredMangas
          .map(
            manga => `
          <div class="manga">
            <img src="${manga.image_url}" alt="${manga.title}" />
            <div class="manga-info" data-mangaID="${manga.id}">
              <h3>${manga.title}</h3>
              <p>${manga.author}</p>
            </div>
          </div>
        `
          )
          .join('');
      }
    });
}


function getMangaById(mangaID) {
  fetch('./manga.json')
    .then(res => res.json())
    .then(data => {
      const manga = data.find(m => m.id === parseInt(mangaID));
      addMangaToDOM(manga);
    });
}

function getRandomManga() {
  mangasEl.innerHTML = '';
  resultHeading.innerHTML = '';

  fetch('./manga.json')
    .then(res => res.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const manga = data[randomIndex];

      addMangaToDOM(manga);
    });
}

function addMangaToDOM(manga) {
  single_mangaEl.innerHTML = `
    <div class="single-manga">
      <h1>${manga.title}</h1>
      <img src="${manga.image_url}" alt="${manga.title}" />
      <div class="single-manga-info">
        ${manga.author ? `<p>Автор: ${manga.author}</p>` : ''}
        ${manga.genre ? `<p>Жанр: ${manga.genre}</p>` : ''}
      </div>
      <div class="main">
        <p>${manga.description}</p>
      </div>
    </div>
  `;
}

submit.addEventListener('submit', searchManga);
random.addEventListener('click', getRandomManga);

mangasEl.addEventListener('click', e => {
  const mangaInfo = e.composedPath().find(item => {
    if (item.classList) {
      return item.classList.contains('manga-info');
    } else {
      return false;
    }
  });

  if (mangaInfo) {
    const mangaID = mangaInfo.getAttribute('data-mangaID');
    window.location.href = `manga-details.html?id=${mangaID}`;
  }
});
