import{i as d,a as y,S as h}from"./assets/vendor-BYIoKOoG.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(e){if(e.ep)return;e.ep=!0;const a=o(e);fetch(e.href,a)}})();const v="41712066-bd7b5e249df7a86bd45ef70ea",b="https://pixabay.com/api/",p={key:v,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15},u=async(s,t=1)=>{const o=(s??"").trim();if(o===""){d.info({message:"Sorry, enter a word to search!",position:"topRight"});return}const n=new URLSearchParams({...p,q:o,page:t}),e=`${b}?${n.toString()}`;return(await y.get(e)).data},m=s=>`<li class="gallery-item">
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
  `,r={listImg:document.querySelector(".gallery"),formSearch:document.querySelector(".form"),loader:document.querySelector(".loader"),observe:document.querySelector(".observer")};let i=null,l=null;r.loader.style.display="none";const S=p.per_page,f=new h(".gallery a",{captionsData:"alt",captionDelay:250});let L={root:null,rootMargin:"0px",threshold:.01};const g=new IntersectionObserver(I,L),w=async s=>{if(s.preventDefault(),i=s.target.elements.search.value,l=1,!!i){r.loader.style.display="block";try{const t=await u(i);if(!t.hits.length){d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),r.listImg.innerHTML="",r.formSearch.reset();return}const o=t.hits.map(n=>m(n)).join("");r.listImg.innerHTML=o,r.formSearch.reset(),f.refresh(),g.observe(r.observe)}catch(t){console.log(t.status)}finally{r.loader.style.display="none"}}};r.formSearch.addEventListener("submit",w);async function I(s){if(s[0].isIntersecting){l++,r.loader.style.display="block";try{const t=await u(i,l),o=t.hits.map(e=>m(e)).join("");r.listImg.insertAdjacentHTML("beforeend",o),f.refresh();const n=Math.ceil(t.totalHits/S);l===n&&(g.unobserve(r.observe),d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(t){console.log(t.status)}finally{r.loader.style.display="none"}}}
//# sourceMappingURL=index.js.map
