(async()=>{
 const fallback={phone:'01071908374',whatsapp:'201071908374',whatsappUrl:'https://wa.me/201071908374',facebook:'',instagram:'',tiktok:'',youtube:'',linkedin:'',address:'مصر',factoryMapUrl:''};
 let general={...fallback};
 try{
   const raw=localStorage.getItem('alamalContent');
   if(raw){const parsed=JSON.parse(raw);general={...general,...(parsed.general||{})};}
   const cfg=await import('./firebase-config.js');
   if(cfg.firebaseEnabled){
     const {initializeApp,getApps}=await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js');
     const {getFirestore,doc,getDoc}=await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');
     const app=getApps().length?getApps()[0]:initializeApp(cfg.firebaseConfig), snap=await getDoc(doc(getFirestore(app),'site','content'));
     if(snap.exists()) general={...general,...(snap.data().general||{})};
   }
 }catch(e){console.warn('Social links:',e)}
 const digits=String(general.whatsapp||general.phone||fallback.whatsapp).replace(/\D/g,'');
 const wa=general.whatsappUrl||`https://wa.me/${digits}`;
 const msg=encodeURIComponent('مرحبًا، أريد الاستفسار عن منتجات الأمل للدهانات');
 document.querySelectorAll('a[href*="wa.me"],a[id*="Whats"],a[class*="whats" i]').forEach(a=>{a.href=`${wa}${wa.includes('?')?'&':'?'}text=${msg}`;a.target='_blank';a.rel='noopener'});
 document.querySelectorAll('a[href^="tel:"]').forEach(a=>a.href=`tel:${general.phone||fallback.phone}`);
 document.querySelectorAll('.admin-link,a[href*="admin.html"],a[href*="alamal-control"]').forEach(a=>a.remove());
 if(!document.querySelector('.wa-float')){
   const a=document.createElement('a');a.className='wa-float';a.href=`${wa}${wa.includes('?')?'&':'?'}text=${msg}`;a.target='_blank';a.rel='noopener';a.setAttribute('aria-label','تواصل واتساب');a.innerHTML='<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M19.11 17.37c-.27-.14-1.59-.78-1.84-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.46-.84-2-.22-.53-.44-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.35.98 2.66 1.12 2.84.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.58.66.21 1.25.18 1.72.11.52-.08 1.59-.65 1.82-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16.03 4.8c-6.18 0-11.2 5.02-11.2 11.2 0 1.97.51 3.89 1.49 5.58L4.73 27.4l5.96-1.56A11.15 11.15 0 0016.03 27.2c6.18 0 11.2-5.02 11.2-11.2s-5.02-11.2-11.2-11.2zm0 20.5c-1.78 0-3.52-.48-5.03-1.38l-.36-.21-3.54.93.94-3.45-.23-.36A9.26 9.26 0 016.73 16c0-5.13 4.17-9.3 9.3-9.3s9.3 4.17 9.3 9.3-4.17 9.3-9.3 9.3z"/></svg>';document.body.appendChild(a);
 }
 const socials=[['facebook','فيسبوك','f'],['instagram','إنستجرام','◎'],['tiktok','تيك توك','♪'],['youtube','يوتيوب','▶'],['linkedin','لينكدإن','in']].filter(([k])=>general[k]);
 if(socials.length&&!document.querySelector('.social-links-managed')){
   const box=document.createElement('div');box.className='social-links-managed';box.setAttribute('aria-label','روابط التواصل الاجتماعي');
   box.innerHTML=socials.map(([k,label,icon])=>`<a href="${String(general[k]).replace(/"/g,'&quot;')}" target="_blank" rel="noopener" aria-label="${label}" title="${label}">${icon}</a>`).join('');
   const footer=document.querySelector('footer');if(footer)footer.appendChild(box);else document.body.appendChild(box);
 }

 const address=String(general.address||'').trim();
 const mapUrl=String(general.factoryMapUrl||'').trim();
 document.querySelectorAll('[data-site="address"],#contactAddressText').forEach(e=>e.textContent=address);
 if(mapUrl){
   const addressCard=document.querySelector('#contactAddressText')?.closest('a,div.contact-card');
   if(addressCard&&addressCard.tagName==='A'){addressCard.href=mapUrl;addressCard.target='_blank';addressCard.rel='noopener'}
   document.querySelectorAll('#contactMapEmbed,#mapEmbed,.map-embed').forEach(box=>{
     box.innerHTML='';
     const iframe=document.createElement('iframe');
     iframe.title='موقع مصنع الأمل للدهانات';iframe.loading='lazy';iframe.referrerPolicy='no-referrer-when-downgrade';iframe.allowFullscreen=true;
     iframe.src=`https://www.google.com/maps?q=${encodeURIComponent(address||mapUrl)}&output=embed`;
     iframe.style.cssText='width:100%;height:100%;min-height:280px;border:0';box.appendChild(iframe);
   });
   if(!document.querySelector('.factory-location-managed')){
     const footer=document.querySelector('footer');
     if(footer){const a=document.createElement('a');a.className='factory-location-managed';a.href=mapUrl;a.target='_blank';a.rel='noopener';a.innerHTML=`<span>📍</span><span><b>موقع المصنع</b><small>${address||'افتح الموقع على خرائط Google'}</small></span>`;footer.appendChild(a)}
   }
 }
})();
