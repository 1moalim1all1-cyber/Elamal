import { firebaseConfig, firebaseEnabled } from './firebase-config.js';
import { defaultContent } from './default-content.js';

async function getContent(){
  const local=localStorage.getItem('alamalContent');
  let data=local?JSON.parse(local):defaultContent;
  if(firebaseEnabled){
    try{
      const {initializeApp}=await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js');
      const {getFirestore,doc,getDoc}=await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
      const app=initializeApp(firebaseConfig), db=getFirestore(app), snap=await getDoc(doc(db,'site','content'));
      if(snap.exists()) data={...defaultContent,...snap.data()};
    }catch(e){console.warn('Firebase:',e)}
  }
  return data;
}
function esc(v=''){return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function render(d){
  const set=(id,v,html=false)=>{const e=document.getElementById(id);if(e)e[html?'innerHTML':'textContent']=v||''};
  set('heroBadge',d.hero?.badge);set('heroTitle',d.hero?.title,true);set('heroText',d.hero?.text);
  set('aboutTitle',d.about?.title);
  document.documentElement.style.setProperty('--blue',d.general?.primaryColor||'#0d64d8');document.documentElement.style.setProperty('--orange',d.general?.accentColor||'#ff6b18');
  document.querySelectorAll('.brand span').forEach(e=>e.textContent=d.general?.siteName||'');document.querySelectorAll('.brand img').forEach(e=>{if(d.general?.logo)e.src=d.general.logo});
  const acts=document.querySelectorAll('.hero .actions a');if(acts[0]){acts[0].textContent=(d.hero?.primaryText||'')+' ←';acts[0].href=d.hero?.primaryLink||'#'}if(acts[1]){acts[1].textContent=d.hero?.secondaryText||'';acts[1].href=d.hero?.secondaryLink||'#'}
  const stats=document.querySelectorAll('.hero .stat');[['stat1Value','stat1Label'],['stat2Value','stat2Label'],['stat3Value','stat3Label']].forEach((k,i)=>{if(stats[i]){stats[i].querySelector('strong').textContent=d.hero?.[k[0]]||'';stats[i].querySelector('small').textContent=d.hero?.[k[1]]||''}});
  const footerDesc=document.querySelector('footer .footer-grid>div:first-child p');if(footerDesc)footerDesc.textContent=d.general?.footerText||'';const copy=document.querySelector('footer .copy');if(copy)copy.textContent=d.general?.copyright||'';set('aboutText',d.about?.text);set('ctaTitle',d.cta?.title);set('ctaText',d.cta?.text);
  document.querySelectorAll('[data-site="phone"]').forEach(e=>e.textContent=d.general?.phone||'');
  document.querySelectorAll('[data-site="email"]').forEach(e=>e.textContent=d.general?.email||'');
  document.querySelectorAll('[data-site="address"]').forEach(e=>e.textContent=d.general?.address||'');
  const about=document.querySelector('.about-img>img');if(about&&d.about?.image)about.src=d.about.image;
  const pg=document.getElementById('productsGrid');if(pg&&d.products)pg.innerHTML=d.products.map(p=>`<article class="product reveal show"><div class="product-art">${p.image?`<img class="product-upload" src="${esc(p.image)}" alt="${esc(p.name)}">`:`<div class="mini-can" style="--pc:linear-gradient(145deg,${esc(p.color||'#0d64d8')},#132238)"></div>`}</div><div class="product-body"><small>${esc(p.category)}</small><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><a href="products.html">تفاصيل المنتج ←</a></div></article>`).join('');
  const pr=document.getElementById('projectsGrid');if(pr&&d.projects)pr.innerHTML=d.projects.map(p=>`<div class="project reveal show"><img src="${esc(p.image||'assets/cover.jpg')}" alt="${esc(p.title)}"><div><h3>${esc(p.title)}</h3><span>${esc(p.subtitle)}</span></div></div>`).join('');
  const tg=document.getElementById('testimonialsGrid');if(tg&&d.testimonials)tg.innerHTML=d.testimonials.map(t=>`<div class="quote reveal show"><div class="stars">★★★★★</div><p>${esc(t.text)}</p><div class="who"><div class="avatar">${esc((t.name||'ع')[0])}</div><div><strong>${esc(t.name)}</strong><br><small>${esc(t.role)}</small></div></div></div>`).join('');
}
render(await getContent());
