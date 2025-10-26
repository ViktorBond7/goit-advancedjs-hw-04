import{i as d,a as f,S as g}from"./assets/vendor-BYIoKOoG.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}})();const h="41712066-bd7b5e249df7a86bd45ef70ea",y="https://pixabay.com/api/",v={key:h,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:30},p=async(t,e=1)=>{const o=(t??"").trim();if(o===""){d.info({message:"Sorry, enter a word to search!",position:"topRight"});return}const i=new URLSearchParams({...v,q:o,page:e}),s=`${y}?${i.toString()}`;return(await f.get(s)).data},m=t=>`<li class="gallery-item">
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
  `,a={listImg:document.querySelector(".gallery"),formSearch:document.querySelector(".form"),loader:document.querySelector(".loader"),loadMore:document.querySelector(".js-load-more")};let n=null,l=null;a.loader.style.display="none";const u=new g(".gallery a",{captionsData:"alt",captionDelay:250}),S=async t=>{if(t.preventDefault(),n=t.target.elements.search.value,l=1,!!n){a.loader.style.display="block";try{const e=await p(n);if(console.log(e),!e.hits.length){d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),a.listImg.innerHTML="",a.formSearch.reset();return}e.hits.length<e.total&&a.loadMore.classList.remove("is-hiden");const o=e.hits.map(i=>m(i)).join("");a.listImg.innerHTML=o,a.formSearch.reset(),u.refresh()}catch(e){console.log(e.status)}finally{a.loader.style.display="none"}}},b=async t=>{t.preventDefault(),l++;try{const e=await p(n,l);console.log(e),Math.ceil(e.total/e.hits.length)>=l&&a.loadMore.classList.add("is-hiden");const o=e.hits.map(i=>m(i)).join("");a.listImg.insertAdjacentHTML("beforeend",o),u.refresh()}catch(e){console.log(e.status)}finally{a.loader.style.display="none"}};a.formSearch.addEventListener("submit",S);a.loadMore.addEventListener("click",b);
//# sourceMappingURL=index.js.map
