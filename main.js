const key = '41b766d0cd0542d1b34a4ab70409abdf';
const topHeadlinesUrl =  `https://newsapi.org/v2/top-headlines?country=us&apiKey=41b766d0cd0542d1b34a4ab70409abdf`;
          
const getHeadlinesBtn = document.getElementById('getHeadlinesBtn');


const getHeadlines = (e) => {
  
  e.preventDefault();

  fetch(topHeadlinesUrl).
  then(res => res.json()).
  then(data => {
    console.log(data)  
    const headlinesContainer = document.getElementById('headlinesContainer');
    let articleCard = data.articles.map(article => {
      return `
      <a href="${article.url}" target="_blank">
        <div class="article-card">
          <img src="${article.urlToImage}" href=${article.url} alt="article-igm">
          <h3>${article.title}</h3>
          <p>${article.description}</p>
          </div>
      </a>`
        
      }).join('');
      headlinesContainer.innerHTML = articleCard;
    console.log(articleCard)
  }).catch((error) => {
    console.log(error);
  })
  
};





getHeadlinesBtn.addEventListener('click', getHeadlines);







      // let div = document.createElement('div');
      // let img = document.createElement('img');
      // let a = document.createElement('a');
      // a.setAttribute('href', article.url);
      // a.setAttribute('target', '_blank');
      // a.textContent = article.title;
      // img.textContent = article.urlToImage;
      // div.appendChild(img);
      // div.appendChild(a);
      // headlinesContainer.appendChild(div);