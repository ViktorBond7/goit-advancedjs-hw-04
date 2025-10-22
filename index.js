import{S as l,i as c}from"./assets/vendor-B07T6_gy.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();const d="41712066-bd7b5e249df7a86bd45ef70ea",m="https://pixabay.com/api/",p={key:d,image_type:"photo",orientation:"horizontal",safesearch:!0},u=t=>{const r=(t??"").trim(),a=new URLSearchParams({...p,q:r}),i=`${m}?${a.toString()}`;return fetch(i).then(e=>{if(e.ok)return e.json();throw new Error(e.status)})},f=t=>`<li class="gallery-item">
    <a class="gallery-link" href="${t.largeImageURL}">
      <img
        class="gallery-image"
        src="${t.webformatURL}"
        alt="${t.tags}"
        />
    </a>
    <div class="container-description-img">
        <div class="description-item">
          <span class="img-label">likes</span>
          <span class="img-value">${t.likes}</span>
        </div>
        <div class="description-item">
          <span class="img-label">views</span>
          <span class="img-value">${t.views}</span>
        </div>
         <div class="description-item">
          <span class="img-label">comments</span>
          <span class="img-value">${t.comments}</span>
        </div>
           <div class="description-item">
          <span class="img-label">downloads</span>
          <span class="img-value">${t.downloads}</span>
        </div>
    </div>
  </li>
  `,o={listImg:document.querySelector(".gallery"),formSearch:document.querySelector(".form"),loader:document.querySelector(".loader")};o.loader.style.display="none";const g=new l(".gallery a",{captionsData:"alt",captionDelay:250}),h=t=>{t.preventDefault();const r=t.target.elements.search.value;r&&(o.loader.style.display="block",u(r).then(a=>{if(!a.hits.length){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),o.listImg.innerHTML="",o.formSearch.reset();return}const i=a.hits.map(e=>f(e)).join("");o.listImg.innerHTML=i,o.formSearch.reset(),g.refresh()}).catch(a=>console.log(a.status)).finally(()=>{o.loader.style.display="none"}))};o.formSearch.addEventListener("submit",h);
//# sourceMappingURL=index.js.map
