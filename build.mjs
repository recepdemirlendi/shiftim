// Shiftim web sitesi üreticisi: tanıtım sayfası + Gizlilik, KVKK ve Çerez politikaları.
// Gizlilik metni uygulamadaki ../mobile/src/lib/privacy.json'dan gelir (uygulama ile site aynı metni gösterir).
// KVKK ve çerez metinleri content/ altında. Metin değişince: node build.mjs → oluşan HTML'leri commit et.
import { readFileSync, writeFileSync } from 'node:fs';

const read = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url), 'utf8'));
const privacy = read('../mobile/src/lib/privacy.json');
const docs = [
  { slug: 'gizlilik', short: 'Gizlilik', doc: privacy, desc: 'Hangi verilerin neden işlendiği, kimlerle paylaşıldığı ve hakların.' },
  { slug: 'kvkk', short: 'KVKK', doc: read('./content/kvkk.json'), desc: '6698 sayılı Kanun kapsamında aydınlatma metni ve başvuru yolu.' },
  { slug: 'cerez', short: 'Çerezler', doc: read('./content/cerez.json'), desc: 'Reklam ve takip çerezi kullanmıyoruz; cihazda tutulanların listesi.' },
];
const { controller, contact } = privacy;
const YEAR = 2026;

const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);
// Metindeki {controller}/{contact} yer tutucuları; e-posta adresi tıklanabilir olur
const fill = (t) => esc(t.replaceAll('{controller}', controller))
  .replaceAll('{contact}', `<a href="mailto:${esc(contact)}">${esc(contact)}</a>`);
const anchor = (h) => h.toLocaleLowerCase('tr').replace(/^\d+\.\s*/, '').normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/ı/g, 'i').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const logo = `<svg class="logo-mark" viewBox="0 0 40 40" aria-hidden="true"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6366F1"/><stop offset="1" stop-color="#8B5CF6"/></linearGradient></defs><rect width="40" height="40" rx="11" fill="url(#g)"/><rect x="10" y="12" width="20" height="17" rx="3.5" fill="none" stroke="#fff" stroke-width="2.4"/><path d="M10 17.5h20M15.5 9.5v5M24.5 9.5v5" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><path d="m16 23 2.6 2.4L24 20.5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const icon = {
  ai: '<path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z"/><path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9z"/>',
  sos: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.5"/>',
  chat: '<path d="M4 5h16v11H8l-4 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
  qr: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2"/>',
  sun: '<circle cx="12" cy="13" r="4"/><path d="M12 4v2M5.6 6.6l1.4 1.4M18.4 6.6 17 8M3 13h2M19 13h2M4 19h16"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3.5 6 1.2 1.2L7 5M3.5 12l1.2 1.2L7 11M3.5 18l1.2 1.2L7 17"/>',
  share: '<path d="M7 11V20h10v-9"/><path d="M12 15V3M8 7l4-4 4 4"/>',
  shield: '<path d="M12 3 5 6v5c0 4.4 3 8.3 7 10 4-1.7 7-5.6 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
};
const svg = (name) => `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon[name]}</svg>`;

const css = `
:root{--brand:#4F46E5;--brand-2:#8B5CF6;--brand-soft:#EEF0FF;--bg:#F6F7FB;--surface:#FFFFFF;--surface-2:#F1F3F9;--text:#0F172A;--text-2:#334155;--muted:#64748B;--border:#E4E7F0;--danger:#DC2626;--success:#059669;--shadow:0 1px 2px rgba(15,23,42,.04),0 8px 24px rgba(15,23,42,.06);color-scheme:light}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--brand:#8B87FF;--brand-2:#A78BFA;--brand-soft:#23234A;--bg:#0B0D14;--surface:#141824;--surface-2:#1B2030;--text:#F1F5F9;--text-2:#CBD5E1;--muted:#8A94A8;--border:#262B3B;--danger:#F87171;--success:#34D399;--shadow:none;color-scheme:dark}}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:88px}
body{margin:0;background:var(--bg);color:var(--text);font:16px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}
a{color:var(--brand);text-decoration:none}a:hover{text-decoration:underline}
.wrap{width:100%;max-width:1120px;margin:0 auto;padding:0 16px}@media(min-width:720px){.wrap{padding:0 28px}}
header.top{position:sticky;top:0;z-index:10;background:color-mix(in srgb,var(--bg) 82%,transparent);backdrop-filter:saturate(1.6) blur(14px);-webkit-backdrop-filter:saturate(1.6) blur(14px);border-bottom:1px solid var(--border)}
header.top .wrap{display:flex;align-items:center;justify-content:space-between;height:64px;gap:16px}
.brand{display:flex;align-items:center;gap:10px;color:var(--text);font-weight:800;font-size:19px;letter-spacing:-.3px}.brand:hover{text-decoration:none}
.logo-mark{width:34px;height:34px;flex:none}
nav.links{display:flex;gap:4px;flex-wrap:wrap;justify-content:flex-end}
nav.links a{color:var(--muted);font-weight:600;font-size:14px;padding:7px 10px;border-radius:9px}nav.links a:hover,nav.links a[aria-current]{color:var(--text);background:var(--surface-2);text-decoration:none}
@media(max-width:560px){nav.links .hide-sm{display:none}}
.btn{display:inline-flex;align-items:center;gap:8px;font-weight:700;font-size:15px;padding:12px 18px;border-radius:12px;border:1px solid transparent;line-height:1.2}
.btn.primary{background:var(--brand);color:#fff}.btn.ghost{background:var(--surface);color:var(--text);border-color:var(--border)}.btn:hover{text-decoration:none;filter:brightness(1.05)}
.btn small{display:block;font-weight:600;font-size:11px;opacity:.75;letter-spacing:.2px}
.eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:var(--brand);background:var(--brand-soft);padding:6px 12px;border-radius:999px}
/* Tanıtım */
.hero{padding:56px 0 32px;display:grid;gap:40px;align-items:center}@media(min-width:900px){.hero{grid-template-columns:1.1fr .9fr;padding:84px 0 56px}}
.hero h1{font-size:clamp(34px,6vw,56px);line-height:1.05;letter-spacing:-1.5px;margin:18px 0 16px}
.hero h1 .grad{background:linear-gradient(90deg,var(--brand),var(--brand-2));-webkit-background-clip:text;background-clip:text;color:transparent}
.hero p.lead{font-size:clamp(17px,2.2vw,19px);color:var(--text-2);max-width:560px;margin:0 0 28px}
.cta{display:flex;gap:10px;flex-wrap:wrap}
.phone{justify-self:center;width:min(320px,100%);background:var(--surface);border:1px solid var(--border);border-radius:38px;padding:18px 14px 22px;box-shadow:0 30px 60px -20px rgba(79,70,229,.35),var(--shadow);position:relative}
.phone:before{content:"";display:block;width:90px;height:22px;background:var(--text);opacity:.9;border-radius:12px;margin:0 auto 14px}
.p-greet{font-size:12px;color:var(--muted);font-weight:600;margin:0 6px}.p-title{font-size:22px;font-weight:800;margin:0 6px 12px;letter-spacing:-.4px}
.p-card{border-radius:18px;padding:14px;margin-bottom:10px;background:var(--surface-2)}
.p-shift{background:linear-gradient(135deg,#4F46E5,#7C3AED);color:#fff}.p-shift .t{font-size:11px;font-weight:700;opacity:.8;text-transform:uppercase;letter-spacing:.5px}.p-shift .h{font-size:26px;font-weight:800;letter-spacing:-.5px;margin:4px 0 0}.p-shift .s{font-size:14px;opacity:.9}
.p-open{border-left:4px solid var(--danger)}.p-open b{display:block;font-size:14px}.p-open span{font-size:12px;color:var(--muted)}
.p-btn{display:inline-block;margin-top:8px;background:var(--success);color:#fff;font-size:12px;font-weight:700;padding:6px 10px;border-radius:9px}
.p-chat{display:flex;flex-direction:column;gap:6px}.bub{font-size:13px;padding:8px 11px;border-radius:14px;max-width:80%}.bub.in{background:var(--surface);border:1px solid var(--border);align-self:flex-start;border-bottom-left-radius:4px}.bub.out{background:var(--brand);color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
section.block{padding:40px 0}section.block h2{font-size:clamp(26px,3.5vw,34px);letter-spacing:-.8px;line-height:1.15;margin:0 0 8px}section.block p.sub{color:var(--muted);margin:0 0 28px;max-width:640px}
.grid{display:grid;gap:14px;grid-template-columns:1fr}@media(min-width:640px){.grid{grid-template-columns:1fr 1fr}}@media(min-width:960px){.grid.three{grid-template-columns:repeat(3,1fr)}}
.card{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:22px;box-shadow:var(--shadow)}
.card h3{font-size:17px;margin:12px 0 4px;letter-spacing:-.2px}.card p{margin:0;color:var(--muted);font-size:15px}
.ico{width:22px;height:22px}.ibox{width:44px;height:44px;border-radius:13px;display:grid;place-items:center;background:var(--brand-soft);color:var(--brand)}
.trust{background:linear-gradient(135deg,#4F46E5,#7C3AED);color:#fff;border-radius:28px;padding:32px 24px;display:grid;gap:24px}@media(min-width:900px){.trust{grid-template-columns:1fr 1.2fr;padding:44px}}
.trust h2{color:#fff}.trust p{color:rgba(255,255,255,.85);margin:0}.trust ul{list-style:none;margin:0;padding:0;display:grid;gap:12px}
.trust li{display:flex;gap:12px;align-items:flex-start;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.18);border-radius:14px;padding:12px 14px}.trust li .ico{flex:none;margin-top:2px}
.trust a.doc{color:#fff;font-weight:700;text-decoration:underline;text-underline-offset:3px}
/* Belgeler */
.doc-head{padding:44px 0 8px}.doc-head h1{font-size:clamp(28px,4.5vw,42px);letter-spacing:-1px;line-height:1.1;margin:14px 0 10px}
.meta{display:flex;flex-wrap:wrap;gap:8px;color:var(--muted);font-size:14px}.meta span{background:var(--surface);border:1px solid var(--border);padding:4px 10px;border-radius:999px}
.doc-layout{display:grid;gap:28px;padding:24px 0 56px}@media(min-width:960px){.doc-layout{grid-template-columns:250px 1fr;align-items:start}}
.toc{display:none}@media(min-width:960px){.toc{display:block;position:sticky;top:88px}}
.toc p{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.6px;color:var(--muted);margin:0 0 10px}
.toc ol{list-style:none;margin:0;padding:0;border-left:2px solid var(--border)}.toc a{display:block;color:var(--muted);font-size:14px;padding:6px 0 6px 14px;margin-left:-2px;border-left:2px solid transparent;line-height:1.35}.toc a:hover{color:var(--text);border-left-color:var(--brand);text-decoration:none}
article.doc{background:var(--surface);border:1px solid var(--border);border-radius:24px;padding:24px 20px;box-shadow:var(--shadow);min-width:0}@media(min-width:720px){article.doc{padding:40px 44px}}
article.doc .intro{font-size:17px;color:var(--text-2);margin:0 0 8px;padding-bottom:20px;border-bottom:1px solid var(--border)}
article.doc h2{font-size:20px;letter-spacing:-.3px;margin:32px 0 10px}article.doc p{color:var(--text-2);margin:0 0 12px}
article.doc ul{margin:0 0 12px;padding-left:20px;color:var(--text-2)}article.doc li{margin-bottom:8px}article.doc li::marker{color:var(--brand)}
article.doc a{word-break:break-word}
.related{display:grid;gap:12px;margin-top:36px;padding-top:24px;border-top:1px solid var(--border)}@media(min-width:640px){.related{grid-template-columns:1fr 1fr}}
.related a{display:block;background:var(--surface-2);border-radius:14px;padding:14px 16px;color:var(--text)}.related a:hover{text-decoration:none;outline:2px solid var(--brand)}.related b{display:block}.related span{color:var(--muted);font-size:14px}
footer.bottom{border-top:1px solid var(--border);padding:32px 0 40px;color:var(--muted);font-size:14px}
footer.bottom .wrap{display:flex;flex-wrap:wrap;gap:16px 28px;justify-content:space-between;align-items:center}footer.bottom nav{display:flex;gap:18px;flex-wrap:wrap}footer.bottom a{color:var(--muted)}footer.bottom a:hover{color:var(--text)}
@media print{header.top,footer.bottom,.toc,.related{display:none}body{background:#fff}article.doc{border:0;box-shadow:none;padding:0}}
`;

const header = (active) => `<header class="top"><div class="wrap">
<a class="brand" href="./">${logo}<span>Shiftim</span></a>
<nav class="links" aria-label="Ana menü"><a class="hide-sm" href="./#ozellikler">Özellikler</a>${docs.map((d) => `<a href="${d.slug}.html"${active === d.slug ? ' aria-current="page"' : ''}>${d.short}</a>`).join('')}</nav>
</div></header>`;

const footer = `<footer class="bottom"><div class="wrap">
<div>© ${YEAR} Shiftim · ${esc(controller)} · <a href="mailto:${esc(contact)}">${esc(contact)}</a></div>
<nav aria-label="Yasal">${docs.map((d) => `<a href="${d.slug}.html">${esc(d.doc.title)}</a>`).join('')}</nav>
</div></footer>`;

const page = ({ title, description, active, body }) => `<!doctype html>
<html lang="tr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#4F46E5">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="style.css">
</head><body>
${header(active)}
<main>${body}</main>
${footer}
</body></html>
`;

// ---------- Belge sayfaları ----------
for (const d of docs) {
  const { doc } = d;
  const sections = doc.sections.map((s) => {
    const id = anchor(s.heading);
    return `<section id="${id}"><h2>${esc(s.heading)}</h2>
${(s.paragraphs ?? []).map((p) => `<p>${fill(p)}</p>`).join('\n')}
${s.bullets ? `<ul>${s.bullets.map((b) => `<li>${fill(b)}</li>`).join('')}</ul>` : ''}</section>`;
  }).join('\n');
  const toc = doc.sections.map((s) => `<li><a href="#${anchor(s.heading)}">${esc(s.heading)}</a></li>`).join('');
  const related = docs.filter((x) => x !== d).map((x) => `<a href="${x.slug}.html"><b>${esc(x.doc.title)}</b><span>${esc(x.desc)}</span></a>`).join('');
  writeFileSync(new URL(`./${d.slug}.html`, import.meta.url), page({
    title: `${doc.title} · Shiftim`,
    description: d.desc,
    active: d.slug,
    body: `<div class="wrap">
<div class="doc-head"><span class="eyebrow">${svg('shield')} Yasal belge</span><h1>${esc(doc.title)}</h1>
<div class="meta"><span>Son güncelleme: ${esc(doc.updated)}</span><span>Veri sorumlusu: ${esc(controller)}</span></div></div>
<div class="doc-layout">
<aside class="toc"><p>Bu sayfada</p><ol>${toc}</ol></aside>
<article class="doc"><p class="intro">${fill(doc.intro)}</p>
${sections}
<div class="related">${related}</div>
</article></div></div>`,
  }));
}

// ---------- Tanıtım sayfası ----------
const features = [
  ['ai', 'Programı yapay zekâ hazırlasın', '“Ali pazartesi izinli, hafta sonları dönüşümlü olsun” yaz; program saniyeler içinde hazır. Sen kontrol edip yayınla.'],
  ['sos', 'Gelemeyen çalışana anında çözüm', '“Bugün gelemiyorum” diyen çalışanın vardiyası ekibe duyurulur; ilk “Ben gelirim” diyen alır.'],
  ['chat', 'WhatsApp grubuna gerek yok', 'Ekip sohbeti ve birebir mesajlar uygulamanın içinde; program, izin ve konuşma tek yerde.'],
  ['qr', 'QR ve konumla giriş-çıkış', 'Çalışan işyerindeki QR kodu okutarak giriş yapar; mesai raporu kendiliğinden oluşur.'],
  ['sun', 'Yöneticiye sabah özeti', 'Her sabah tek bildirim: bugün kim var, hangi vardiya eksik, kaç talep onay bekliyor.'],
  ['list', 'Devir notu ve kontrol listesi', 'Açılış ve kapanış listeleri, vardiyalar arası devir notları. Kafe de klinik de aynı kolaylıkla.'],
];
writeFileSync(new URL('./index.html', import.meta.url), page({
  title: 'Shiftim · Vardiya planlama, tek dokunuşla',
  description: 'Kafe, restoran, klinik ve mağazalar için yapay zekâ destekli vardiya planlama, açık vardiya, ekip sohbeti ve QR ile mesai takibi.',
  active: 'home',
  body: `<div class="wrap">
<section class="hero">
<div>
<span class="eyebrow">Kafe · restoran · klinik · mağaza</span>
<h1>Vardiya planlama,<br><span class="grad">tek dokunuşla.</span></h1>
<p class="lead">Programı yapay zekâ hazırlasın, gelemeyen çalışanın yerine ekip anında girsin, herkes WhatsApp'a dönmeden uygulamada konuşsun.</p>
<div class="cta">
<span class="btn primary"><span><small>Yakında</small>App Store</span></span>
<span class="btn ghost"><span><small>Yakında</small>Google Play</span></span>
</div>
</div>
<div class="phone" aria-hidden="true">
<p class="p-greet">Cumartesi, 11 Eki</p><p class="p-title">Günaydın, Ayşe</p>
<div class="p-card p-shift"><div class="t">2 sa 15 dk sonra başlıyor</div><div class="h">08:00 – 16:00</div><div class="s">Sabah vardiyası · Mehmet ile</div></div>
<div class="p-card p-open"><b>Cmt · Akşam vardiyası</b><span>Ali gelemiyor · “Hastayım”</span><br><span class="p-btn">Ben gelirim</span></div>
<div class="p-card p-chat"><div class="bub in">Süt bitti, sabah sipariş verelim mi?</div><div class="bub out">Tamam, devir notuna yazdım 👍</div></div>
</div>
</section>

<section class="block" id="ozellikler">
<h2>Yöneticinin işini sıfırlayan özellikler</h2>
<p class="sub">Sektörden bağımsız: kafeden hastaneye her vardiyalı ekip için tasarlandı.</p>
<div class="grid three">${features.map(([i, h, p]) => `<div class="card"><div class="ibox">${svg(i)}</div><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
</section>

<section class="block">
<div class="trust">
<div><h2>Verilerin güvende</h2><p>Ekibinin bilgileri yalnızca vardiya işlerin için kullanılır. Reklam yok, takip yok, satış yok.</p></div>
<ul>
<li>${svg('shield')}<span>Veriler Avrupa Birliği'nde (Frankfurt) saklanır; herkes yalnızca yetkili olduğu bilgiyi görür.</span></li>
<li>${svg('share')}<span>Reklam, analiz veya takip çerezi yok. Ayrıntılar <a class="doc" href="cerez.html">Çerez Politikası</a>'nda.</span></li>
<li>${svg('list')}<span>Hesabını ve tüm verilerini uygulamadan istediğin an silebilirsin. <a class="doc" href="kvkk.html">KVKK Aydınlatma Metni</a> · <a class="doc" href="gizlilik.html">Gizlilik Politikası</a></span></li>
</ul>
</div>
</section>
</div>`,
}));

writeFileSync(new URL('./style.css', import.meta.url), css.trim() + '\n');
writeFileSync(new URL('./favicon.svg', import.meta.url), logo.replace('class="logo-mark" ', 'xmlns="http://www.w3.org/2000/svg" ').replace(' aria-hidden="true"', '') + '\n');
writeFileSync(new URL('./.nojekyll', import.meta.url), '');
console.log('index.html, gizlilik.html, kvkk.html, cerez.html, style.css, favicon.svg yazıldı');
