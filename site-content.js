import {db} from "./firebase-config.js";
import {doc,getDoc,collection,getDocs,query,where} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const setText=(selector,value)=>{document.querySelectorAll(selector).forEach(el=>{if(value)el.textContent=value})};
const setHref=(selector,value)=>{document.querySelectorAll(selector).forEach(el=>{if(value)el.href=value})};

async function loadSiteContent(){
  try{
    const [homeSnap,settingsSnap,productsSnap,projectsSnap,testimonialsSnap]=await Promise.all([
      getDoc(doc(db,"site","homepage")),
      getDoc(doc(db,"site","settings")),
      getDocs(query(collection(db,"products"),where("visible","==",true))),
      getDocs(collection(db,"projects")),
      getDocs(collection(db,"testimonials"))
    ]);
    if(homeSnap.exists()){
      const h=homeSnap.data();
      setText("[data-content='heroTitle']",h.heroTitle);
      setText("[data-content='heroDescription']",h.heroDescription);
      setText("[data-content='aboutTitle']",h.aboutTitle);
      setText("[data-content='aboutText']",h.aboutText);
      setHref("[data-link='primaryButton']",h.primaryButtonUrl);
      setText("[data-content='primaryButtonText']",h.primaryButtonText);
      const hero=document.querySelector("[data-image='heroImage']");
      if(hero&&h.heroImageUrl)hero.src=h.heroImageUrl;
    }
    if(settingsSnap.exists()){
      const s=settingsSnap.data();
      setText("[data-content='phone']",s.phone);
      setText("[data-content='factoryAddress']",s.factoryAddress);
      setHref("[data-link='whatsapp']",s.whatsapp);
      setHref("[data-link='facebook']",s.facebook);
      setHref("[data-link='instagram']",s.instagram);
      setHref("[data-link='tiktok']",s.tiktok);
      document.title=s.metaTitle||s.siteName||document.title;
      const meta=document.querySelector('meta[name="description"]');
      if(meta&&s.metaDescription)meta.content=s.metaDescription;
    }
    window.alamalFirebaseContent={
      products:productsSnap.docs.map(d=>({id:d.id,...d.data()})),
      projects:projectsSnap.docs.map(d=>({id:d.id,...d.data()})),
      testimonials:testimonialsSnap.docs.map(d=>({id:d.id,...d.data()}))
    };
    document.dispatchEvent(new CustomEvent("alamalContentLoaded",{detail:window.alamalFirebaseContent}));
  }catch(e){console.error("تعذر تحميل محتوى الموقع من Firebase:",e)}
}
loadSiteContent();
