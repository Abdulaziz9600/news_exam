
// News Form 
let elnewsForm = $(".js-news-form");
let elnewsSerachInput = $(".js-news-serch-input",elnewsForm);
let elnewsSerachSelect = $(".js-news-serch-select",elnewsForm);
let elnewsSerachSortInput = $(".js-news-sort-input",elnewsForm);


// Elemts HTML

let elNewsList = $(".js-news-list");
let elNewsBookMark = $(".js-bookmark-list");
let elTemplate =$("#news-template").content;


let arr =[]
// News Render

let NewsRender = function (inputvalue,selsectvalue){
  let NewsApi = `https://newsapi.org/v2/everything?q=${inputvalue}&from=2022-05-02&sortBy=${selsectvalue}&apiKey=586201f6a7a74e6f907fc840b6495df8`;
  fetch(NewsApi)
  .then(function (response){
    return response.json()
  })
  .then(data => {
    arr = data.articles
    renderNews(data.articles)
  })
  
}

const renderNews  = (data) => {

  let elResaultFragment = document.createDocumentFragment();
    
  data.forEach( function(news) {
    let elNewsTemplate = elTemplate.cloneNode(true);
    
    $(".card-img-top",elNewsTemplate).src = news.urlToImage;
    $(".card-img-top",elNewsTemplate).alt = news.author;
    $(".card-title",elNewsTemplate).textContent = news.author;
    $(".news-link",elNewsTemplate).href = news.url;
    $(".card-text",elNewsTemplate).textContent = news.content;
    $(".news_modal",elNewsTemplate).dataset.title =  news.title;

    elResaultFragment.append(elNewsTemplate);
    
  });
  elNewsList.append(elResaultFragment)
 
}


elnewsForm.addEventListener("change", function(e) {
  elNewsList.innerHTML = "";
  
  e.preventDefault();
  NewsRender(elnewsSerachInput.value,elnewsSerachSelect.value)
})

elNewsList.addEventListener("click", (e) => {
  elModalBodyResultList.innerHTML = "";
  if (e.target.matches(".news_modal")) {
    const foundNews = arr.filter(i => i.title == e.target.dataset.title)
    renderNewsModal(foundNews)
  }
})

elModalBodyResultList = $(".modal_list");

elModalTemplate = $(".modal_template").content;
let renderNewsModal = (data) => {
  
  let modalFragment = document.createDocumentFragment();
  data.forEach(e => {
    let modalTemplate = elModalTemplate.cloneNode(true);
    $(".modal_text", modalTemplate).textContent = e.description;
    $(".time",modalTemplate).textContent = e.publishedAt.split("T",1)
    modalFragment.appendChild(modalTemplate)
  })
  elModalBodyResultList.appendChild(modalFragment)
}
NewsRender()