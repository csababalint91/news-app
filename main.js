const key = "41b766d0cd0542d1b34a4ab70409abdf";

const newsAppApiBaseUrl = "https://news-app-api-zeta.vercel.app/";

// Get Headlines

const articleWrapper = document.querySelectorAll(".article-wrapper");
const loader = document.querySelector(".loader");
const totalResults = document.getElementById('totalResult');

window.onload = getHeadlines = () => {
  // Clear page
  newsListContainer.innerHTML = "";
  headlinesContainer.innerHTML = "";
  loader.style.display = "block";
  //totalResults.innerHTML = "";

  let topHeadlinesUrl = `${newsAppApiBaseUrl}getAPIResponse/topHeadlines`;

  fetch(topHeadlinesUrl)
    .then((res) => res.json())
    .then((data) => {
      //totalResults.innerHTML = `Total results: ${data.totalResults}`
      console.log(data.totalResults)
      const headlinesContainer = document.getElementById("headlinesContainer");
      let articleCard = data.articles
        .map((article) => {

          return `
      <div onclick="window.open('${article.url}', '_blank')" class="article-card">
          <div class="img-wrapper">
          <img src="${article.urlToImage || "./no-image.jpeg"}" href=${article.url
            } alt="article-img" loading="lazy">
          </div>
          <h3>${article.title}</h3>
          <p>${article.description || "--Description not available!--"}</p>
          <cite>${article.source.name}-${new Date(
              article.publishedAt
            ).getFullYear()}-${new Date(article.publishedAt).getMonth() + 1
            }-${new Date(article.publishedAt).getDate()}</cite>
      </div>`;
        })
        .join("");

      loader.style.display = "none";

      headlinesContainer.innerHTML = articleCard;
    })
    .catch((error) => {
      console.log(error);
    });
};


//  Headlines by category

const getCategory = (e) => {
  // Clear page
  newsListContainer.innerHTML = "";
  headlinesContainer.innerHTML = "";
  loader.style.display = "block";

  let categoriesValue = e.target.value;

  let categoriesUrl = `${newsAppApiBaseUrl}getAPIResponse/category?category=${categoriesValue}`;
  // `https://newsapi.org/v2/top-headlines?country=us&pageSize=30&category=${categoriesValue}&apiKey=${key}`


  fetch(categoriesUrl)
    .then((response) => response.json())
    .then((data) => {
      // totalResults.innerHTML = `Total results: ${data.totalResults}`
      let categoryCard = data.articles
        .map((article) => {
          return `
  <div onclick="window.open('${article.url}', '_blank')" class="article-card">
      <div class="img-wrapper">
      <img src="${article.urlToImage || "./no-image.jpeg"
            }"  alt="article-img" loading="lazy">
      </div>
      <h3>${article.title}</h3>
      <p>${article.description}</p><cite style=>${article.source.name
            }-${new Date(article.publishedAt).getFullYear()}-${new Date(article.publishedAt).getMonth() + 1
            }-${new Date(article.publishedAt).getDate()}</cite>
  </div>`;
        })
        .join("");

      loader.style.display = "none";
      headlinesContainer.innerHTML = categoryCard;
    })
    .catch((error) => {
      console.log(error);
    });
};

const categories = document.getElementById("categories");
categories.addEventListener("change", getCategory);

//

// Get Search

const searchFrom = document.getElementById("searchFrom");
const newsListContainer = document.getElementById("newsListContainer");

const retriveSearch = (e) => {
  // Clear page
  newsListContainer.innerHTML = "";
  headlinesContainer.innerHTML = "";
  loader.style.display = "block";

  // Set drop down value back to disabled
  categories.value = "Select Category";

  e.preventDefault();

  let topic = searchInput.value;
  let searchUrl = `${newsAppApiBaseUrl}getAPIResponse/topic?topic=${topic}`;

  // `https://newsapi.org/v2/everything?q=${topic}&pageSize=100&apiKey=${key}`

  fetch(searchUrl)
    .then((res) => res.json())
    .then((data) => {
      internationalNumberFormat = new Intl.NumberFormat('en-GB')
      totalResults.innerHTML = `Total results: ${internationalNumberFormat.format(data.totalResults)}`
      let searchList = data.articles
        .map((article) => {
          return `
      <div onclick="window.open('${article.url}', '_blank')" class="search-list-item" >
          <img src="${article.urlToImage || "./no-image.jpeg"
            }" alt="article-img" loading="lazy"><cite style=>${article.source.name
            }-${new Date(article.publishedAt).getFullYear()}-${new Date(article.publishedAt).getMonth() + 1
            }-${new Date(article.publishedAt).getDate()}</cite>
          <h2>${article.title}</h2>  
      </div>`;
        })
        .join("");

      loader.style.display = "none";
      newsListContainer.innerHTML = searchList;
    });
};

searchFrom.addEventListener("submit", retriveSearch);
//

// Back to the top button
window.addEventListener("scroll", () => {
  let scrolled;
  scrolled = window.scrollY;
  const arrowTopBtn = document.getElementById("arrowTopBtn");
  if (scrolled > 167) {
    arrowTopBtn.style.visibility = "visible";
  } else {
    arrowTopBtn.style.visibility = "hidden";
  }
});


arrowTopBtn.addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
});
//

// Loader
