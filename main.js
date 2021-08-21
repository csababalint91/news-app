const key = "41b766d0cd0542d1b34a4ab70409abdf";

// Get Headlines

const articleWrapper = document.querySelectorAll(".article-wrapper");
const loader = document.querySelector('.loader');

const getHeadlines = () => {
  // Clear page
  newsListContainer.innerHTML = "";
  headlinesContainer.innerHTML = "";
  loader.style.display = 'block';

  let topHeadlinesUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&category=&apiKey=${key}`;

  fetch(topHeadlinesUrl)
    .then((res) => res.json())
    .then((data) => {
      const headlinesContainer = document.getElementById("headlinesContainer");
      let articleCard = data.articles
        .map((article) => {    
          return `
      <div onclick="location.href ='${article.url}';" target="_blank" class="article-card">
          <div class="img-wrapper">
          <img src="${article.urlToImage || './no-image.jpeg'}" href=${article.url} alt="article-img" loading="lazy">
          </div>
          <h3>${article.title}</h3>
          <p>${article.description || '--Description not available!--'}</p>
          <cite>${article.source.name}-${new Date(article.publishedAt).getFullYear()}-${new Date(article.publishedAt).getMonth()+1}-${new Date(article.publishedAt).getDate()}</cite>
      </div>`;
    })
    .join("");
      
      loader.style.display = 'none';
    
      headlinesContainer.innerHTML = articleCard;

      
    })
    .catch((error) => {
      console.log(error);
    });
  };
  

//  Headlines by category

const getValue = (e) => {
  
  // Clear page
  newsListContainer.innerHTML = "";
  headlinesContainer.innerHTML = "";
  loader.style.display = 'block';

  let categoriesValue =  e.target.value;  
  
  let categoriesUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&category=${categoriesValue}&apiKey=${key}`
  

  fetch(categoriesUrl)
  .then(response => response.json())
  .then(data => {
    let categoryCard = data.articles
    .map((article) => {
      return `
  <div onclick="location.href ='${article.url}';" target="_blank" class="article-card">
      <div class="img-wrapper">
      <img src="${article.urlToImage || './no-image.jpeg'}"  alt="article-img" loading="lazy">
      </div>
      <h3>${article.title}</h3>
      <p>${article.description}</p><cite style=>${article.source.name}-${new Date(article.publishedAt).getFullYear()}-${new Date(article.publishedAt).getMonth()+1}-${new Date(article.publishedAt).getDate()}</cite>
  </div>`;
    })
    .join("");
    
    loader.style.display = 'none';
    headlinesContainer.innerHTML = categoryCard;

  })
  .catch((error) => {
    console.log(error);
  });
}


categories.addEventListener('change', getValue);

//


// Get Search

const searchFrom = document.getElementById("searchFrom");
const newsListContainer = document.getElementById("newsListContainer");

const retriveSearch = (e) => {

  // Clear page
  newsListContainer.innerHTML = "";
  headlinesContainer.innerHTML = "";
  loader.style.display = 'block';

  // Set drop down value back to disabled
  categories.value = "Select Category"


  e.preventDefault();

  let topic = searchInput.value;
  let searchUrl = `https://newsapi.org/v2/everything?q=${topic}&pageSize=100&apiKey=${key}`;

  fetch(searchUrl)
    .then(res => res.json())
    .then(data => {
      let searchList = data.articles
        .map(article => {
          return `
      <div onclick="location.href ='${article.url}';" target="_blank" class="search-list-item" >
          <img src="${article.urlToImage || './no-image.jpeg'}" alt="article-img" loading="lazy"><cite style=>${article.source.name}-${new Date(article.publishedAt).getFullYear()}-${new Date(article.publishedAt).getMonth()+1}-${new Date(article.publishedAt).getDate()}</cite>
          <h2>${article.title}</h2>  
      </div>`
        })
        .join("");

      loader.style.display = 'none'; 
      newsListContainer.innerHTML = searchList;

    });
};

searchFrom.addEventListener("submit", retriveSearch);
//


// Back to the top button
window.addEventListener('scroll', () => {

  let crolled;
  scrolled = window.scrollY;
  const arrowTopBtn = document.getElementById('arrowTopBtn');
  if(scrolled > 167) {
    arrowTopBtn.style.visibility = 'visible'
  } else {
    arrowTopBtn.style.visibility = 'hidden'
  }
})

arrowTopBtn.addEventListener('click', () => {
    document.documentElement.scrollTop = 0;

})
//


// Loader 







