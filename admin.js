import { firebaseConfig, firebaseEnabled } from './firebase-config.js';
import { defaultContent } from './default-content.js';
import { cloudinaryConfig, cloudinaryEnabled } from './cloudinary-config.js';
let data=structuredClone(defaultContent), auth,db,user,fb={};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const pathGet=(o,p)=>p.split('.').reduce((a,k)=>a?.[k],o);
const pathSet=(o,p,v)=>{let a=o,k=p.split('.');k.slice(0,-1).forEach(x=>a=a[x]??={});a[k.at(-1)]=v};
async function initFirebase(){if(!firebaseEnabled)return false;try{const appM=await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js'),authM=await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js'),fsM=await import('https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js');const app=appM.initializeApp(firebaseConfig);auth=authM.getAuth(app);db=fsM.getFirestore(app);fb={...authM,...fsM};return true}catch(e){alert('خطأ Firebase: '+e.message);return false}}
function showApp(){ $('#login').style.display='none';$('#app').style.display='block';fill(); }
async function load(){const raw=localStorage.getItem('alamalContent');if(raw)data={...data,...JSON.parse(raw)};if(db){const s=await fb.getDoc(fb.doc(db,'site','content'));if(s.exists())data={...data,...s.data()}}}
function fill(){ $$('[data-path]').forEach(e=>e.value=pathGet(data,e.dataset.path)||'');$$('[data-check]').forEach(e=>e.checked=pathGet(data,e.dataset.check)!==false);renderLists();enhanceImageInputs(); }
function collect(){ $$('[data-path]').forEach(e=>pathSet(data,e.dataset.path,e.value));$$('[data-check]').forEach(e=>pathSet(data,e.dataset.check,e.checked)); }
function esc(v=''){return String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function listHtml(type,fields){return (data[type]||[]).map((it,i)=>`<div class="repeat" data-item="${type}" data-index="${i}"><div class="grid">${fields.map(f=>`<div class="field ${f.full?'full':''}"><label>${f.label}</label>${f.area?`<textarea rows="3" data-key="${f.key}">${esc(it[f.key]||'')}</textarea>`:f.options?`<select data-key="${f.key}">${f.options.map(o=>`<option value="${esc(o.value)}" ${it[f.key]===o.value?'selected':''}>${esc(o.label)}</option>`).join('')}</select>`:`<input data-key="${f.key}" ${f.upload?'data-image-input':''} type="${f.type||'text'}" value="${esc(it[f.key]||'')}" placeholder="${f.upload?'رابط الصورة أو اختر صورة':''}">`}</div>`).join('')}</div><div class="row-actions"><button class="btn danger" data-remove="${type}.${i}">حذف</button></div></div>`).join('')}
function renderLists(){ $('#categoriesList').innerHTML=listHtml('categories',[{key:'name',label:'اسم القسم'},{key:'slug',label:'كود القسم'},{key:'description',label:'وصف القسم',area:true,full:true},{key:'image',label:'صورة القسم',upload:true,full:true}]);$('#catalogList').innerHTML=listHtml('catalog',[{key:'name',label:'اسم اللون'},{key:'code',label:'كود اللون'},{key:'color',label:'درجة اللون',type:'color'}]); const cats=[{value:'دهانات داخلية',label:'دهانات داخلية'},{value:'دهانات خارجية',label:'دهانات خارجية'},{value:'دهانات ديكورية',label:'دهانات ديكورية'}]; $('#productsList').innerHTML=listHtml('products',[{key:'name',label:'اسم الصنف'},{key:'category',label:'اختر القسم',options:cats},{key:'description',label:'وصف الصنف',area:true,full:true},{key:'color',label:'اختر لون الصنف',type:'color'},{key:'image',label:'صورة الصنف أو رابطها',upload:true}]);$('#projectsList').innerHTML=listHtml('projects',[{key:'title',label:'اسم المشروع'},{key:'subtitle',label:'وصف قصير'},{key:'image',label:'الصورة أو رابطها',upload:true,full:true}]);$('#testimonialsList').innerHTML=listHtml('testimonials',[{key:'name',label:'اسم العميل'},{key:'role',label:'الصفة'},{key:'text',label:'الرأي',area:true,full:true}]);enhanceImageInputs();}

function enhanceImageInputs(){
  $$('[data-image-input]').forEach((input,index)=>{
    if(input.dataset.enhanced==='1') return;
    input.dataset.enhanced='1';
    const wrap=document.createElement('div');
    wrap.className='image-tools';
    const preview=document.createElement('img');
    preview.className='preview';
    preview.alt='معاينة الصورة';
    preview.style.display=input.value?'block':'none';
    if(input.value) preview.src=input.value;
    const file=document.createElement('input');
    file.type='file'; file.accept='image/jpeg,image/png,image/webp,image/gif'; file.className='hidden-file';
    file.id='image-file-'+Date.now()+'-'+index;
    const button=document.createElement('button');
    button.type='button'; button.className='btn light upload-btn'; button.textContent='اختيار صورة ورفعها';
    const progress=document.createElement('span');
    progress.className='upload-progress';
    progress.textContent=cloudinaryEnabled?'':'أضف بيانات Cloudinary أولًا';
    button.onclick=()=>file.click();
    file.onchange=async()=>{
      const selected=file.files?.[0];
      if(!selected) return;
      if(selected.size>8*1024*1024){progress.textContent='حجم الصورة أكبر من 8MB';return}
      const localUrl=URL.createObjectURL(selected); preview.src=localUrl;preview.style.display='block';
      try{
        button.disabled=true;progress.textContent='جاري رفع الصورة...';
        const url=await uploadToCloudinary(selected);
        input.value=url; input.dispatchEvent(new Event('input',{bubbles:true}));
        preview.src=url;progress.textContent='تم الرفع — احفظ التعديلات';
      }catch(err){progress.textContent='فشل الرفع: '+err.message}
      finally{button.disabled=false;file.value=''}
    };
    input.addEventListener('input',()=>{preview.src=input.value;preview.style.display=input.value?'block':'none'});
    wrap.append(preview,button,file,progress);input.insertAdjacentElement('afterend',wrap);
  });
}
async function uploadToCloudinary(file){
  if(!cloudinaryEnabled) throw new Error('ضع Cloud Name وUpload Preset في cloudinary-config.js');
  const form=new FormData();
  form.append('file',file);
  form.append('upload_preset',cloudinaryConfig.uploadPreset);
  if(cloudinaryConfig.folder) form.append('folder',cloudinaryConfig.folder);
  const endpoint=`https://api.cloudinary.com/v1_1/${encodeURIComponent(cloudinaryConfig.cloudName)}/image/upload`;
  const response=await fetch(endpoint,{method:'POST',body:form});
  const result=await response.json();
  if(!response.ok || !result.secure_url) throw new Error(result?.error?.message||'تعذر رفع الصورة');
  return result.secure_url;
}

function collectLists(){ $$('[data-item]').forEach(box=>{const a=data[box.dataset.item][+box.dataset.index];box.querySelectorAll('[data-key]').forEach(e=>a[e.dataset.key]=e.value)}) }
async function save(){collect();collectLists();$('#message').innerHTML='<div class="notice">جاري الحفظ...</div>';try{localStorage.setItem('alamalContent',JSON.stringify(data));if(db)await fb.setDoc(fb.doc(db,'site','content'),data);$('#message').innerHTML='<div class="notice ok">تم حفظ التعديلات بنجاح. الصور مرفوعة على Cloudinary وروابطها محفوظة في Firestore.</div>';fill()}catch(e){$('#message').innerHTML='<div class="notice">تعذر الحفظ: '+esc(e.message)+'</div>'}}
$('.tab').onclick=null;$$('.tab').forEach(b=>b.onclick=()=>{$$('.tab').forEach(x=>x.classList.remove('active'));$$('.panel').forEach(x=>x.classList.remove('active'));b.classList.add('active');$('#'+b.dataset.panel).classList.add('active');$('#pageTitle').textContent=b.textContent});
$$('[data-add]').forEach(b=>b.onclick=()=>{collectLists();const t=b.dataset.add;if(t==='categories')data[t].push({name:'قسم جديد',slug:'new',description:'',image:'',visible:true});if(t==='catalog')data[t].push({name:'لون جديد',code:'AL-000',color:'#cccccc',visible:true});if(t==='products')data[t].push({name:'صنف جديد',category:'دهانات داخلية',description:'',color:'#0d64d8',image:''});if(t==='projects')data[t].push({title:'مشروع جديد',subtitle:'',image:''});if(t==='testimonials')data[t].push({name:'عميل جديد',role:'',text:''});renderLists()});
document.addEventListener('click',e=>{if(e.target.dataset.remove){collectLists();const[t,i]=e.target.dataset.remove.split('.');data[t].splice(+i,1);renderLists()}});$('#save').onclick=save;
$('#loginForm').onsubmit=async e=>{e.preventDefault();$('#loginStatus').textContent='جاري الدخول...';if(!firebaseEnabled){if($('#email').value.trim()!=='01071908374'||$('#password').value!=='7460077'){ $('#loginStatus').textContent='رقم الموبايل أو كلمة السر غير صحيحة'; return; }localStorage.setItem('alamalAdmin','1');await load();showApp();return}try{await fb.signInWithEmailAndPassword(auth,$('#email').value,$('#password').value)}catch(err){$('#loginStatus').textContent='تعذر الدخول: '+err.message}};
$('#logout').onclick=async()=>{if(auth)await fb.signOut(auth);localStorage.removeItem('alamalAdmin');location.reload()};
const connected=await initFirebase();$('#mode').textContent=connected?'متصل بـ Firebase — التعديلات تظهر لكل الزوار':'وضع التجربة المحلي — أضف بيانات Firebase للنشر الفعلي';$('#loginHint').textContent=connected?'سجل دخولك بحساب الأدمن في Firebase.':'استخدم رقم الموبايل وكلمة السر الخاصة بالأدمن.';
if(connected){fb.onAuthStateChanged(auth,async u=>{if(u){user=u;await load();showApp()}})}else if(localStorage.getItem('alamalAdmin')){await load();showApp()}
