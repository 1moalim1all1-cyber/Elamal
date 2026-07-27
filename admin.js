import { firebaseConfig, firebaseEnabled } from './firebase-config.js';
import { defaultContent } from './default-content.js';

let data = structuredClone(defaultContent);
let auth = null;
let db = null;
let storage = null;
let currentUser = null;
let fb = {};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function pathGet(object, path) {
  return path.split('.').reduce((value, key) => value?.[key], object);
}

function pathSet(object, path, value) {
  const keys = path.split('.');
  let target = object;

  keys.slice(0, -1).forEach((key) => {
    target = target[key] ??= {};
  });

  target[keys.at(-1)] = value;
}

function mergeContent(saved = {}) {
  data = {
    ...defaultContent,
    ...saved,
    general: {
      ...defaultContent.general,
      ...(saved.general || {})
    },
    hero: {
      ...defaultContent.hero,
      ...(saved.hero || {})
    },
    about: {
      ...defaultContent.about,
      ...(saved.about || {})
    },
    cta: {
      ...defaultContent.cta,
      ...(saved.cta || {})
    },
    products: Array.isArray(saved.products)
      ? saved.products
      : structuredClone(defaultContent.products || []),
    projects: Array.isArray(saved.projects)
      ? saved.projects
      : structuredClone(defaultContent.projects || []),
    testimonials: Array.isArray(saved.testimonials)
      ? saved.testimonials
      : structuredClone(defaultContent.testimonials || [])
  };
}

async function initFirebase() {
  if (!firebaseEnabled) return false;

  try {
    const appModule = await import(
      'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js'
    );
    const authModule = await import(
      'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js'
    );
    const firestoreModule = await import(
      'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js'
    );
    const storageModule = await import(
      'https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js'
    );

    const app = appModule.getApps().length
      ? appModule.getApp()
      : appModule.initializeApp(firebaseConfig);

    auth = authModule.getAuth(app);
    db = firestoreModule.getFirestore(app);
    storage = storageModule.getStorage(app);

    fb = {
      ...authModule,
      ...firestoreModule,
      ...storageModule
    };

    return true;
  } catch (error) {
    console.error(error);
    alert(`خطأ في الاتصال بـ Firebase: ${error.message}`);
    return false;
  }
}

function showApp() {
  $('#login').style.display = 'none';
  $('#app').style.display = 'block';
  fill();
}

async function loadContent() {
  const raw = localStorage.getItem('alamalContent');

  if (raw) {
    try {
      mergeContent(JSON.parse(raw));
    } catch (error) {
      console.warn('تعذر قراءة البيانات المحلية:', error);
      mergeContent({});
    }
  } else {
    mergeContent({});
  }

  if (db) {
    const snapshot = await fb.getDoc(fb.doc(db, 'site', 'content'));

    if (snapshot.exists()) {
      mergeContent(snapshot.data());
      localStorage.setItem('alamalContent', JSON.stringify(data));
    }
  }
}

function fill() {
  $$('[data-path]').forEach((element) => {
    element.value = pathGet(data, element.dataset.path) ?? '';
  });

  const heroPreview = $('#heroImageAdminPreview');

  if (heroPreview) {
    heroPreview.src = data.hero?.image || 'assets/hero-products.jpg';
  }

  renderLists();
}

function collect() {
  $$('[data-path]').forEach((element) => {
    pathSet(data, element.dataset.path, element.value);
  });
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function listHtml(type, fields) {
  return (data[type] || []).map((item, index) => `
    <div class="repeat" data-item="${type}" data-index="${index}">
      <div class="grid">
        ${fields.map((field) => `
          <div class="field ${field.full ? 'full' : ''}">
            <label>${field.label}</label>

            ${field.area
              ? `<textarea rows="3" data-key="${field.key}">${escapeHtml(item[field.key] || '')}</textarea>`
              : field.options
                ? `<select data-key="${field.key}">
                    ${field.options.map((option) => `
                      <option
                        value="${escapeHtml(option.value)}"
                        ${item[field.key] === option.value ? 'selected' : ''}
                      >
                        ${escapeHtml(option.label)}
                      </option>
                    `).join('')}
                  </select>`
                : `<input
                    data-key="${field.key}"
                    type="${field.type || 'text'}"
                    value="${escapeHtml(item[field.key] || '')}"
                  >`
            }

            ${field.upload
              ? `<input
                  type="file"
                  accept="image/*"
                  data-item-upload="${type}.${index}.${field.key}"
                >`
              : ''
            }
          </div>
        `).join('')}
      </div>

      <div class="row-actions">
        <button
          class="btn danger"
          type="button"
          data-remove="${type}.${index}"
        >
          حذف
        </button>
      </div>
    </div>
  `).join('');
}

function renderLists() {
  const categories = [
    { value: 'دهان داخلي', label: 'دهان داخلي' },
    { value: 'دهان خارجي', label: 'دهان خارجي' },
    { value: 'دهان ديكوري', label: 'دهان ديكوري' },
    { value: 'معجون', label: 'معجون' },
    { value: 'برايمر وتجهيز', label: 'برايمر وتجهيز' }
  ];

  $('#productsList').innerHTML = listHtml('products', [
    { key: 'name', label: 'اسم الصنف' },
    {
      key: 'category',
      label: 'اختر القسم',
      options: categories
    },
    {
      key: 'description',
      label: 'وصف الصنف',
      area: true,
      full: true
    },
    {
      key: 'color',
      label: 'اختر لون الصنف',
      type: 'color'
    },
    {
      key: 'image',
      label: 'صورة الصنف أو رابطها',
      upload: true
    }
  ]);

  $('#projectsList').innerHTML = listHtml('projects', [
    { key: 'title', label: 'اسم المشروع' },
    { key: 'subtitle', label: 'وصف قصير' },
    {
      key: 'image',
      label: 'الصورة أو رابطها',
      upload: true,
      full: true
    }
  ]);

  $('#testimonialsList').innerHTML = listHtml('testimonials', [
    { key: 'name', label: 'اسم العميل' },
    { key: 'role', label: 'الصفة' },
    {
      key: 'text',
      label: 'الرأي',
      area: true,
      full: true
    }
  ]);
}

function collectLists() {
  $$('[data-item]').forEach((box) => {
    const type = box.dataset.item;
    const index = Number(box.dataset.index);
    const item = data[type]?.[index];

    if (!item) return;

    box.querySelectorAll('[data-key]').forEach((element) => {
      item[element.dataset.key] = element.value;
    });
  });
}

async function upload(file) {
  if (!file) return '';

  if (!storage) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const safeName = file.name.replace(/[^\w.\-]+/g, '-');
  const reference = fb.ref(storage, `site/${Date.now()}-${safeName}`);

  await fb.uploadBytes(reference, file);
  return fb.getDownloadURL(reference);
}

async function save() {
  collect();
  collectLists();

  $('#message').innerHTML =
    '<div class="notice">جاري حفظ التعديلات...</div>';

  try {
    for (const element of $$('[data-upload]')) {
      if (!element.files?.[0]) continue;

      const imageUrl = await upload(element.files[0]);
      pathSet(data, element.dataset.upload, imageUrl);
    }

    for (const element of $$('[data-item-upload]')) {
      if (!element.files?.[0]) continue;

      const [type, index, key] =
        element.dataset.itemUpload.split('.');

      data[type][Number(index)][key] =
        await upload(element.files[0]);
    }

    localStorage.setItem(
      'alamalContent',
      JSON.stringify(data)
    );

    if (db) {
      await fb.setDoc(
        fb.doc(db, 'site', 'content'),
        data
      );
    }

    $('#message').innerHTML =
      '<div class="notice ok">تم حفظ التعديلات بنجاح. افتح الموقع أو حدّث الصفحة لرؤيتها.</div>';

    fill();
  } catch (error) {
    console.error(error);

    $('#message').innerHTML =
      `<div class="notice">تعذر الحفظ: ${escapeHtml(error.message)}</div>`;
  }
}

function setupTabs() {
  $$('.tab').forEach((button) => {
    button.addEventListener('click', () => {
      $$('.tab').forEach((item) => {
        item.classList.remove('active');
      });

      $$('.panel').forEach((panel) => {
        panel.classList.remove('active');
      });

      button.classList.add('active');

      const panel = $(`#${button.dataset.panel}`);

      if (panel) {
        panel.classList.add('active');
      }

      $('#pageTitle').textContent = button.textContent.trim();
    });
  });
}

function setupAddButtons() {
  $$('[data-add]').forEach((button) => {
    button.addEventListener('click', () => {
      collectLists();

      const type = button.dataset.add;

      if (!Array.isArray(data[type])) {
        data[type] = [];
      }

      if (type === 'products') {
        data.products.push({
          name: 'صنف جديد',
          category: 'دهان داخلي',
          description: '',
          color: '#0d64d8',
          image: ''
        });
      }

      if (type === 'projects') {
        data.projects.push({
          title: 'مشروع جديد',
          subtitle: '',
          image: ''
        });
      }

      if (type === 'testimonials') {
        data.testimonials.push({
          name: 'عميل جديد',
          role: '',
          text: ''
        });
      }

      renderLists();
    });
  });
}

function setupRemoveButtons() {
  document.addEventListener('click', (event) => {
    const value = event.target.dataset.remove;

    if (!value) return;

    collectLists();

    const [type, index] = value.split('.');
    data[type].splice(Number(index), 1);

    renderLists();
  });
}

function setupImagePreview() {
  const heroUpload = $('#heroImageUpload');
  const heroUrl = $('#heroImageUrl');
  const heroPreview = $('#heroImageAdminPreview');

  if (heroUpload && heroPreview) {
    heroUpload.addEventListener('change', () => {
      const file = heroUpload.files?.[0];

      if (file) {
        heroPreview.src = URL.createObjectURL(file);
      }
    });
  }

  if (heroUrl && heroPreview) {
    heroUrl.addEventListener('input', () => {
      const value = heroUrl.value.trim();

      if (value) {
        heroPreview.src = value;
      }
    });
  }
}

function setupLogin() {
  $('#loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = $('#email').value.trim().toLowerCase();
    const password = $('#password').value;
    const status = $('#loginStatus');

    status.textContent = 'جاري الدخول...';

    if (!firebaseEnabled) {
      if (
        email !== 'admin@alamal.com' ||
        password !== '7460077'
      ) {
        status.textContent =
          'البريد الإلكتروني أو كلمة السر غير صحيحة';
        return;
      }

      localStorage.setItem('alamalAdmin', '1');

      await loadContent();
      showApp();

      status.textContent = '';
      return;
    }

    try {
      await fb.signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      console.error(error);
      const messages = {
        'auth/invalid-credential': 'البريد الإلكتروني أو كلمة السر غير صحيحة.',
        'auth/user-not-found': 'حساب الأدمن غير موجود في Firebase Authentication.',
        'auth/wrong-password': 'كلمة السر غير صحيحة.',
        'auth/too-many-requests': 'محاولات كثيرة. انتظر قليلًا ثم جرّب مرة أخرى.',
        'auth/network-request-failed': 'تعذر الاتصال بالإنترنت.'
      };
      status.textContent = messages[error.code] || `تعذر الدخول: ${error.message}`;
    }
  });
}

function setupLogout() {
  $('#logout').addEventListener('click', async () => {
    if (auth) {
      await fb.signOut(auth);
    }

    localStorage.removeItem('alamalAdmin');
    location.reload();
  });
}

async function start() {
  setupTabs();
  setupAddButtons();
  setupRemoveButtons();
  setupImagePreview();
  setupLogin();
  setupLogout();

  $('#save').addEventListener('click', save);

  const connected = await initFirebase();

  $('#mode').textContent = connected
    ? 'متصل بـ Firebase — التعديلات تظهر لكل الزوار'
    : 'وضع التجربة المحلي — أضف بيانات Firebase للنشر الفعلي';

  $('#loginHint').textContent = connected
    ? 'سجل دخولك بحساب الأدمن في Firebase.'
    : 'استخدم البريد الإلكتروني وكلمة السر الخاصة بالأدمن.';

  if (connected) {
    fb.onAuthStateChanged(auth, async (user) => {
      if (!user) {
        currentUser = null;
        $('#app').style.display = 'none';
        $('#login').style.display = 'grid';
        return;
      }

      currentUser = user;
      await loadContent();
      showApp();
    });
  } else if (localStorage.getItem('alamalAdmin') === '1') {
    await loadContent();
    showApp();
  }
}

start().catch((error) => {
  console.error(error);

  const status = $('#loginStatus');

  if (status) {
    status.textContent =
      `حدث خطأ أثناء تشغيل لوحة التحكم: ${error.message}`;
  }
});
