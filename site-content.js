import { firebaseConfig, firebaseEnabled } from './firebase-config.js';
import { defaultContent } from './default-content.js';

async function getContent(){
  const local=localStorage.getItem('alamalContent');
  let data=defaultContent;
  if(local){try{data={...defaultContent,...JSON.parse(local)}}catch(e){console.warn('Local content:',e)}}
  if(firebaseEnabled){
    try{
      const {initializeApp,getApps,getApp}=await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js');
      const {getFirestore,doc,getDoc}=await import('https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js');
      const app=getApps().length?getApp():initializeApp(firebaseConfig), db=getFirestore(app), snap=await getDoc(doc(db,'site','content'));
      if(snap.exists()) data={...defaultContent,...snap.data()};
    }catch(e){console.warn('Firebase:',e)}
  }
  return data;
}
function esc(v=''){return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function render(d){
  const set=(id,v,html=false)=>{const e=document.getElementById(id);if(e)e[html?'innerHTML':'textContent']=v||''};
  set('heroBadge',d.hero?.badge);set('heroTitle',d.hero?.title,true);set('heroText',d.hero?.text);
  const heroMainImage=document.getElementById('heroMainImage');if(heroMainImage&&d.hero?.image)heroMainImage.src=d.hero.image;
  set('aboutTitle',d.about?.title);set('aboutText',d.about?.text);set('ctaTitle',d.cta?.title);set('ctaText',d.cta?.text);
  document.querySelectorAll('[data-site="phone"]').forEach(e=>e.textContent=d.general?.phone||'');
  document.querySelectorAll('[data-site="email"]').forEach(e=>e.textContent=d.general?.email||'');
  document.querySelectorAll('[data-site="address"]').forEach(e=>e.textContent=d.general?.address||'');
  const about=document.querySelector('.about-img>img');if(about&&d.about?.image)about.src=d.about.image;
  const pg=document.getElementById('productsGrid');if(pg&&d.products)pg.innerHTML=d.products.map(p=>`<article class="product reveal show"><div class="product-art">${p.image?`<img class="product-upload" src="${esc(p.image)}" alt="${esc(p.name)}">`:`<div class="mini-can" style="--pc:linear-gradient(145deg,${esc(p.color||'#0d64d8')},#132238)"></div>`}</div><div class="product-body"><small>${esc(p.category)}</small><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><a href="products.html">تفاصيل المنتج ←</a></div></article>`).join('');
  const pr=document.getElementById('projectsGrid');if(pr&&d.projects)pr.innerHTML=d.projects.map(p=>`<div class="project reveal show"><img src="${esc(p.image||'assets/cover.jpg')}" alt="${esc(p.title)}"><div><h3>${esc(p.title)}</h3><span>${esc(p.subtitle)}</span></div></div>`).join('');
  const tg=document.getElementById('testimonialsGrid');if(tg&&d.testimonials)tg.innerHTML=d.testimonials.map(t=>`<div class="quote reveal show"><div class="stars">★★★★★</div><p>${esc(t.text)}</p><div class="who"><div class="avatar">${esc((t.name||'ع')[0])}</div><div><strong>${esc(t.name)}</strong><br><small>${esc(t.role)}</small></div></div></div>`).join('');
}
render(await getContent());
