import{i as d,a as f,S as y}from"./assets/vendor-BYIoKOoG.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const h="41712066-bd7b5e249df7a86bd45ef70ea",v="https://pixabay.com/api/",m={key:h,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15},p=async(s,t=1)=>{const o=(s??"").trim();if(o===""){d.info({message:"Sorry, enter a word to search!",position:"topRight"});return}const i=new URLSearchParams({...m,q:o,page:t}),e=`${v}?${i.toString()}`;return(await f.get(e)).data},u=s=>`<li class="gallery-item">
    <a class="gallery-link" href="${s.largeImageURL}">
      <img
        class="gallery-image"
        src="${s.webformatURL}"
        alt="${s.tags}"
        />
    </a>
    <div class="container-description-img">
        <div class="description-item">
          <span class="img-label">likes</span>
          <span class="img-value">${s.likes}</span>
        </div>
        <div class="description-item">
          <span class="img-label">views</span>
          <span class="img-value">${s.views}</span>
        </div>
         <div class="description-item">
          <span class="img-label">comments</span>
          <span class="img-value">${s.comments}</span>
        </div>
           <div class="description-item">
          <span class="img-label">downloads</span>
          <span class="img-value">${s.downloads}</span>
        </div>
    </div>
  </li>
  `,a={listImg:document.querySelector(".gallery"),formSearch:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMore:document.querySelector(".js-load-more"),galleryItem:document.querySelector(".gallery-item")};let n=null,l=null;a.loader.style.display="none";const S=m.per_page,g=new y(".gallery a",{captionsData:"alt",captionDelay:250}),b=async s=>{if(s.preventDefault(),n=s.target.elements.search.value,l=1,!!n){a.loader.style.display="block";try{const t=await p(n);if(!t.hits.length){d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),a.listImg.innerHTML="",a.formSearch.reset();return}t.hits.length<t.total&&a.loadMore.classList.remove("is-hiden");const o=t.hits.map(i=>u(i)).join("");a.listImg.innerHTML=o,a.formSearch.reset(),g.refresh()}catch(t){console.log(t.status)}finally{a.loader.style.display="none"}}},L=async s=>{s.preventDefault(),l++,a.loader.style.display="block";try{const t=await p(n,l),o=t.hits.map(r=>u(r)).join("");a.listImg.insertAdjacentHTML("beforeend",o),g.refresh();const i=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"});const e=Math.ceil(t.totalHits/S);l>=e&&(a.loadMore.classList.add("is-hiden"),d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(t){console.log(t.status)}finally{a.loader.style.display="none"}};a.formSearch.addEventListener("submit",b);a.loadMore.addEventListener("click",L);
//# sourceMappingURL=index.js.map
