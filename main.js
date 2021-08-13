const key = "41b766d0cd0542d1b34a4ab70409abdf";

// Get Headlines

const getHeadlinesBtn = document.getElementById("getHeadlinesBtn");

const getHeadlines = () => {
  newsListContainer.innerHTML = "";


  let topHeadlinesUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&category=&apiKey=${key}`;


  fetch(topHeadlinesUrl)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const headlinesContainer = document.getElementById("headlinesContainer");
      let articleCard = data.articles
        .map((article) => {
          return `
      <a href="${article.url}" target="_blank">
        <div class="article-card">
          <img src="${article.urlToImage}" href=${article.url} alt="article-img">
          <h3>${article.title}</h3>
          <p>${article.description}</p>
          <cite style=>${article.source.name}-${article.publishedAt}</cite>
          </div>
      </a>`;
        })
        .join("");

      headlinesContainer.innerHTML = articleCard;
      
    })
    .catch((error) => {
      console.log(error);
    });
};

getHeadlinesBtn.addEventListener("click", getHeadlines);

// Get Search

const searchFrom = document.getElementById("searchFrom");
const searchInput = document.getElementById("searchInput");
const newsListContainer = document.getElementById("newsListContainer");

const retriveSearch = (e) => {
  headlinesContainer.innerHTML = "";

  e.preventDefault();

  let topic = searchInput.value;
  let searchUrl = `https://newsapi.org/v2/everything?q=${topic}&pageSize=100&apiKey=${key}`;

  fetch(searchUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let searchList = data.articles
        .map(article => {
          return `
      <a href="${article.url}" target="_blank">
        <div class="search-list-item">
          <img src="${article.urlToImage}" href=${article.url} alt="article-img">
          <h1>${article.title}</h1>
          </div>
      </a>
      <hr>`
        })
        .join("");
      newsListContainer.innerHTML = searchList;
    });
  console.log(topic);
};

searchFrom.addEventListener("submit", retriveSearch);


//  Headlines by category

// const getValue = (e) => {

//   let selectedValue = document.getElementById('categories').value;
//   console.log(selectedValue);
// }


const getValue = (e) => {

  newsListContainer.innerHTML = "";
  
  let categoriesValue =  e.target.value;  
  
  let categoriesUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&category=${categoriesValue}&apiKey=${key}`
  
  const categoriesListContainer = document.getElementById('categoriesListContainer');

  fetch(categoriesUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let categoryCard = data.articles
    .map((article) => {
      return `
  <a href="${article.url}" target="_blank">
    <div class="article-card">
      <img src="${article.urlToImage}" href=${article.url} alt="article-img">
      <h3>${article.title}</h3>
      <p>${article.description}</p>
      </div>
  </a>`;
  
    })
    .join("");
    
  
    headlinesContainer.innerHTML = categoryCard;
  })
  .catch((error) => {
    console.log(error);
  });
}


categories.addEventListener('change', getValue);