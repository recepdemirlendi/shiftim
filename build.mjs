// Shiftim web sitesi üreticisi: tanıtım sayfası + Gizlilik, KVKK ve Çerez politikaları.
// Gizlilik metni uygulamadaki ../mobile/src/lib/privacy.json'dan gelir (uygulama ile site aynı metni gösterir).
// KVKK ve çerez metinleri content/ altında. Metin değişince: node build.mjs → oluşan HTML'leri commit et.
// Dış kaynak (font, betik, analiz) yüklenmez; Çerez Politikası'nda bunu taahhüt ediyoruz.
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
const mail = `<a href="mailto:${esc(contact)}">${esc(contact)}</a>`;
const fill = (t) => esc(t.replaceAll('{controller}', controller)).replaceAll('{contact}', mail);
const anchor = (h) => h.toLocaleLowerCase('tr').replace(/^\d+\.\s*/, '').normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/ı/g, 'i').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const logo = (cls = 'logo-mark') => `<svg class="${cls}" viewBox="0 0 40 40" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6366F1"/><stop offset="1" stop-color="#A855F7"/></linearGradient></defs><rect width="40" height="40" rx="11" fill="url(#lg)"/><rect x="10" y="12" width="20" height="17" rx="3.5" fill="none" stroke="#fff" stroke-width="2.4"/><path d="M10 17.5h20M15.5 9.5v5M24.5 9.5v5" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/><path d="m16 23 2.6 2.4L24 20.5" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const icon = {
  ai: '<path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z"/><path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9z"/>',
  sos: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.5"/>',
  chat: '<path d="M4 5h16v11H8l-4 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
  qr: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2"/>',
  sun: '<circle cx="12" cy="13" r="4"/><path d="M12 4v2M5.6 6.6l1.4 1.4M18.4 6.6 17 8M3 13h2M19 13h2M4 19h16"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="m3.5 6 1.2 1.2L7 5M3.5 12l1.2 1.2L7 11M3.5 18l1.2 1.2L7 17"/>',
  share: '<path d="M7 11V20h10v-9"/><path d="M12 15V3M8 7l4-4 4 4"/>',
  shield: '<path d="M12 3 5 6v5c0 4.4 3 8.3 7 10 4-1.7 7-5.6 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  home: '<path d="M4 11 12 4l8 7v9h-5v-6H9v6H4z"/>',
  cal: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
  team: '<circle cx="9" cy="9" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 19c.8-3 3.2-4.5 6-4.5s5.2 1.5 6 4.5M15 15.5c2.6-.3 4.7.9 5.5 3.5"/>',
};
const svg = (name, cls = 'ico') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon[name]}</svg>`;

const css = `
:root{--brand:#4F46E5;--brand-2:#A855F7;--brand-soft:#EEF0FF;--bg:#F7F7FC;--surface:#FFFFFF;--surface-2:#F2F3FA;--text:#0B1022;--text-2:#334155;--muted:#64748B;--border:#E5E7F1;--danger:#E11D48;--success:#059669;--glow-1:rgba(99,102,241,.22);--glow-2:rgba(168,85,247,.18);--shadow:0 1px 2px rgba(15,23,42,.04),0 10px 30px -12px rgba(15,23,42,.12);--radius:22px;color-scheme:light}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--brand:#8B87FF;--brand-2:#C084FC;--brand-soft:#22224A;--bg:#090B12;--surface:#121622;--surface-2:#1A1F2E;--text:#F3F5FA;--text-2:#CBD5E1;--muted:#8B95AA;--border:#252B3C;--danger:#FB7185;--success:#34D399;--glow-1:rgba(99,102,241,.28);--glow-2:rgba(168,85,247,.22);--shadow:0 10px 30px -12px rgba(0,0,0,.6);color-scheme:dark}}
*{box-sizing:border-box}html{-webkit-text-size-adjust:100%;scroll-behavior:smooth;scroll-padding-top:90px}
body{margin:0;background:var(--bg);color:var(--text);font:16px/1.65 -apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:clip}
a{color:var(--brand);text-decoration:none}a:hover{text-decoration:underline;text-underline-offset:3px}
:focus-visible{outline:3px solid var(--brand);outline-offset:3px;border-radius:8px}
.wrap{width:100%;max-width:1160px;margin:0 auto;padding:0 16px}@media(min-width:720px){.wrap{padding:0 28px}}
.ico{width:22px;height:22px;flex:none}
/* Üst bar */
header.top{position:sticky;top:0;z-index:20;background:color-mix(in srgb,var(--bg) 78%,transparent);backdrop-filter:saturate(1.8) blur(16px);-webkit-backdrop-filter:saturate(1.8) blur(16px);border-bottom:1px solid color-mix(in srgb,var(--border) 70%,transparent)}
header.top .wrap{display:flex;align-items:center;justify-content:space-between;height:66px;gap:12px}
.brand{display:flex;align-items:center;gap:10px;color:var(--text);font-weight:800;font-size:20px;letter-spacing:-.4px}.brand:hover{text-decoration:none}
.logo-mark{width:34px;height:34px;flex:none;filter:drop-shadow(0 6px 12px rgba(99,102,241,.35))}
nav.links{display:flex;gap:2px;align-items:center}
nav.links a{color:var(--muted);font-weight:600;font-size:14px;padding:8px 11px;border-radius:10px}nav.links a:hover,nav.links a[aria-current]{color:var(--text);background:var(--surface-2);text-decoration:none}
nav.links a.pill{background:var(--text);color:var(--bg);margin-left:6px}nav.links a.pill:hover{opacity:.9;background:var(--text);color:var(--bg)}
@media(max-width:640px){nav.links .hide-sm{display:none}nav.links a{padding:8px 8px}}
/* Ortak */
.eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:700;color:var(--brand);background:var(--brand-soft);padding:6px 12px 6px 8px;border-radius:999px;border:1px solid color-mix(in srgb,var(--brand) 18%,transparent)}
.eyebrow .dot{width:8px;height:8px;border-radius:50%;background:var(--success);box-shadow:0 0 0 4px color-mix(in srgb,var(--success) 25%,transparent)}
.grad{background:linear-gradient(95deg,var(--brand) 10%,var(--brand-2) 90%);-webkit-background-clip:text;background-clip:text;color:transparent}
.btn{display:inline-flex;align-items:center;gap:10px;font-weight:700;font-size:15px;padding:12px 18px;border-radius:14px;border:1px solid transparent;line-height:1.15;transition:transform .15s ease,box-shadow .15s ease}
.btn:hover{text-decoration:none;transform:translateY(-1px)}
.btn.dark{background:var(--text);color:var(--bg);box-shadow:0 10px 24px -10px rgba(11,16,34,.5)}.btn.ghost{background:var(--surface);color:var(--text);border-color:var(--border)}
.btn small{display:block;font-weight:600;font-size:11px;opacity:.7;letter-spacing:.2px}
.btn svg.store{width:22px;height:22px}
section.block{padding:56px 0}@media(min-width:900px){section.block{padding:80px 0}}
.sec-head{max-width:680px;margin:0 0 32px}.sec-head.center{margin:0 auto 36px;text-align:center}
.sec-head h2{font-size:clamp(28px,4vw,40px);letter-spacing:-1px;line-height:1.1;margin:12px 0 10px}.sec-head p{color:var(--muted);margin:0;font-size:17px}
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow)}
/* Hero */
.hero-bg{position:relative;isolation:isolate;overflow-x:clip}
.hero-bg:before{content:"";position:absolute;inset:-120px -10% auto;height:720px;z-index:-1;background:radial-gradient(40% 50% at 20% 30%,var(--glow-1),transparent 70%),radial-gradient(35% 45% at 80% 20%,var(--glow-2),transparent 70%)}
.hero-bg:after{content:"";position:absolute;inset:0;z-index:-1;background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px);background-size:44px 44px;opacity:.35;-webkit-mask-image:radial-gradient(60% 55% at 50% 30%,#000,transparent 75%);mask-image:radial-gradient(60% 55% at 50% 30%,#000,transparent 75%)}
.hero{padding:48px 0 24px;display:grid;gap:44px;align-items:center}@media(min-width:960px){.hero{grid-template-columns:1.08fr .92fr;padding:88px 0 64px}}
.hero h1{font-size:clamp(38px,6.6vw,64px);line-height:1.02;letter-spacing:-2px;margin:20px 0 18px;font-weight:850}
.hero p.lead{font-size:clamp(17px,2.2vw,20px);color:var(--text-2);max-width:560px;margin:0 0 30px}
.cta{display:flex;gap:10px;flex-wrap:wrap}
.hero-note{display:flex;align-items:center;gap:10px;margin-top:22px;color:var(--muted);font-size:14px}
.hero-note .ico{width:18px;height:18px;color:var(--success)}
/* Telefon */
.phone-wrap{justify-self:center;position:relative;width:min(330px,100%)}
.phone{position:relative;background:var(--surface);border:1px solid var(--border);border-radius:44px;padding:12px;box-shadow:0 40px 80px -30px rgba(79,70,229,.45),0 0 0 8px #0B1022,0 0 0 9px #2A3045;animation:float 7s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@media (prefers-reduced-motion:reduce){.phone{animation:none}}
.screen{background:var(--bg);border-radius:34px;overflow:hidden;padding:10px 12px 0}
.status{display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:700;padding:4px 10px 10px;color:var(--text)}
.status .island{width:88px;height:24px;background:#000;border-radius:14px}
.status .bars{display:flex;gap:2px;align-items:flex-end}.status .bars i{display:block;width:3px;background:var(--text);border-radius:1px}
.p-greet{font-size:12px;color:var(--muted);font-weight:600;margin:4px 6px 0}.p-title{font-size:23px;font-weight:850;margin:0 6px 12px;letter-spacing:-.5px}
.p-card{border-radius:18px;padding:13px 14px;margin-bottom:10px;background:var(--surface);border:1px solid var(--border)}
.p-shift{background:linear-gradient(135deg,#4F46E5,#9333EA);color:#fff;border:0}.p-shift .t{font-size:10.5px;font-weight:700;opacity:.85;text-transform:uppercase;letter-spacing:.6px}.p-shift .h{font-size:28px;font-weight:850;letter-spacing:-.6px;margin:4px 0 0}.p-shift .s{font-size:13.5px;opacity:.92}
.p-shift .who{display:flex;margin-top:10px}.p-shift .who i{width:24px;height:24px;border-radius:50%;border:2px solid #7C3AED;margin-right:-7px;display:grid;place-items:center;font-size:10px;font-style:normal;font-weight:800}
.p-open{position:relative;padding-left:18px}.p-open:before{content:"";position:absolute;left:0;top:12px;bottom:12px;width:4px;border-radius:0 4px 4px 0;background:var(--danger)}
.p-open b{display:block;font-size:14px}.p-open>span{font-size:12px;color:var(--muted)}
.p-row{display:flex;gap:8px;margin-top:9px}.p-btn{background:#059669;color:#fff;font-size:12px;font-weight:700;padding:6px 11px;border-radius:9px}.p-tag{font-size:11px;font-weight:700;color:var(--danger);background:color-mix(in srgb,var(--danger) 12%,transparent);padding:5px 9px;border-radius:999px;margin-left:auto}
.p-chat{display:flex;flex-direction:column;gap:6px}.bub{font-size:12.5px;padding:7px 11px;border-radius:14px;max-width:82%;line-height:1.4}.bub.in{background:var(--surface-2);align-self:flex-start;border-bottom-left-radius:4px}.bub.out{background:var(--brand);color:#fff;align-self:flex-end;border-bottom-right-radius:4px}
.tabbar{display:flex;justify-content:space-around;padding:10px 4px 14px;margin:6px -12px 0;background:var(--surface);border-top:1px solid var(--border);color:var(--muted)}.tabbar span{display:flex;flex-direction:column;align-items:center;gap:2px;font-size:9.5px;font-weight:700}.tabbar span.on{color:var(--brand)}.tabbar .ico{width:19px;height:19px}
.float-chip{position:absolute;z-index:2;display:flex;align-items:center;gap:8px;background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow);padding:9px 12px;border-radius:14px;font-size:12.5px;font-weight:700;white-space:nowrap}
.float-chip .ico{width:18px;height:18px;color:var(--brand)}
.float-chip.a{left:-34px;top:120px}.float-chip.b{right:-30px;bottom:150px}
@media(max-width:480px){.float-chip{display:none}}
/* Sektörler */
.sectors{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;padding:8px 0 4px}
.sectors span{background:var(--surface);border:1px solid var(--border);border-radius:999px;padding:9px 16px;font-weight:650;font-size:14.5px;color:var(--text-2)}
.sectors-label{text-align:center;color:var(--muted);font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;margin:0 0 14px}
/* Özellikler */
.grid{display:grid;gap:16px;grid-template-columns:1fr}@media(min-width:640px){.grid{grid-template-columns:1fr 1fr}}@media(min-width:980px){.grid.three{grid-template-columns:repeat(3,1fr)}}
.feature{padding:26px;transition:transform .2s ease,border-color .2s ease}.feature:hover{transform:translateY(-3px);border-color:color-mix(in srgb,var(--brand) 40%,var(--border))}
.feature h3{font-size:18px;margin:16px 0 6px;letter-spacing:-.3px}.feature p{margin:0;color:var(--muted);font-size:15px}
.ibox{width:48px;height:48px;border-radius:14px;display:grid;place-items:center;color:#fff;background:linear-gradient(135deg,var(--c1),var(--c2));box-shadow:0 10px 20px -8px var(--c1)}
/* Adımlar */
.steps{display:grid;gap:16px;counter-reset:s}@media(min-width:900px){.steps{grid-template-columns:repeat(3,1fr)}}
.step{padding:26px;position:relative}.step:before{counter-increment:s;content:counter(s);display:grid;place-items:center;width:36px;height:36px;border-radius:50%;background:var(--brand-soft);color:var(--brand);font-weight:800}
.step h3{margin:14px 0 6px;font-size:18px;letter-spacing:-.3px}.step p{margin:0;color:var(--muted);font-size:15px}
/* Güven */
.trust{position:relative;overflow:hidden;border-radius:30px;padding:34px 22px;display:grid;gap:26px;color:#fff;background:radial-gradient(60% 80% at 100% 0%,rgba(255,255,255,.18),transparent 60%),linear-gradient(135deg,#4338CA,#7E22CE)}
@media(min-width:900px){.trust{grid-template-columns:.9fr 1.1fr;padding:52px;align-items:center}}
.trust h2{font-size:clamp(28px,4vw,40px);letter-spacing:-1px;line-height:1.1;margin:0 0 12px}.trust p{color:rgba(255,255,255,.86);margin:0 0 20px;font-size:17px}
.trust ul{list-style:none;margin:0;padding:0;display:grid;gap:12px}
.trust li{display:flex;gap:14px;align-items:flex-start;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:16px;padding:14px 16px;backdrop-filter:blur(6px)}
.trust li b{display:block}.trust li span{color:rgba(255,255,255,.85);font-size:14.5px}
.trust .docs{display:flex;flex-wrap:wrap;gap:8px}.trust .docs a{color:#fff;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.25);padding:8px 14px;border-radius:999px;font-weight:700;font-size:14px}.trust .docs a:hover{background:rgba(255,255,255,.24);text-decoration:none}
/* SSS */
.faq{max-width:780px;margin:0 auto;display:grid;gap:10px}
.faq details{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:0 20px}
.faq summary{cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:18px 0;font-weight:700;font-size:16.5px}
.faq summary::-webkit-details-marker{display:none}.faq summary .ico{color:var(--muted);transition:transform .2s}.faq details[open] summary .ico{transform:rotate(180deg)}
.faq details p{margin:0 0 18px;color:var(--text-2)}
/* Son çağrı */
.final{text-align:center;padding:44px 22px;border-radius:30px;background:var(--surface);border:1px solid var(--border);box-shadow:var(--shadow)}
.final h2{font-size:clamp(26px,4vw,38px);letter-spacing:-1px;margin:0 0 10px}.final p{color:var(--muted);margin:0 auto 24px;max-width:520px}
/* Belgeler */
.progress{position:fixed;top:0;left:0;height:3px;width:0;z-index:30;background:linear-gradient(90deg,var(--brand),var(--brand-2))}
.doc-hero{position:relative;isolation:isolate;padding:48px 0 30px;border-bottom:1px solid var(--border);background:linear-gradient(180deg,color-mix(in srgb,var(--brand-soft) 70%,transparent),transparent)}
.doc-hero h1{font-size:clamp(30px,5vw,46px);letter-spacing:-1.2px;line-height:1.08;margin:16px 0 12px}
.doc-hero p{color:var(--text-2);max-width:720px;margin:0 0 16px}
.crumbs{font-size:14px;color:var(--muted)}.crumbs a{color:var(--muted)}
.meta{display:flex;flex-wrap:wrap;gap:8px;font-size:13.5px;color:var(--muted)}.meta span{display:inline-flex;gap:6px;align-items:center;background:var(--surface);border:1px solid var(--border);padding:5px 11px;border-radius:999px}
.doc-layout{display:grid;gap:28px;padding:32px 0 64px}@media(min-width:980px){.doc-layout{grid-template-columns:260px minmax(0,1fr);align-items:start}}
.toc{display:none}@media(min-width:980px){.toc{display:block;position:sticky;top:96px}}
.toc p{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.8px;color:var(--muted);margin:0 0 10px}
.toc ol{list-style:none;margin:0 0 20px;padding:0;border-left:2px solid var(--border)}.toc a{display:block;color:var(--muted);font-size:14px;padding:6px 0 6px 14px;margin-left:-2px;border-left:2px solid transparent;line-height:1.35}.toc a:hover,.toc a.on{color:var(--text);border-left-color:var(--brand);text-decoration:none}
.toc .print{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:700;color:var(--text);background:var(--surface);border:1px solid var(--border);padding:8px 12px;border-radius:10px;cursor:pointer}
article.doc{padding:26px 20px;min-width:0}@media(min-width:720px){article.doc{padding:44px 52px}}
article.doc section{padding-top:8px}article.doc h2{font-size:21px;letter-spacing:-.3px;margin:26px 0 10px;display:flex;align-items:center;gap:10px}
article.doc section:first-child h2{margin-top:6px}
article.doc p{color:var(--text-2);margin:0 0 12px}
article.doc ul{margin:0 0 14px;padding:0;list-style:none}article.doc li{position:relative;padding-left:22px;margin-bottom:9px;color:var(--text-2)}
article.doc li:before{content:"";position:absolute;left:4px;top:.68em;width:7px;height:7px;border-radius:50%;background:linear-gradient(135deg,var(--brand),var(--brand-2))}
article.doc a{word-break:break-word;font-weight:600}
.callout{display:flex;gap:12px;align-items:flex-start;background:var(--brand-soft);border:1px solid color-mix(in srgb,var(--brand) 20%,transparent);border-radius:16px;padding:14px 16px;margin:0 0 8px;color:var(--text-2);font-size:15px}.callout .ico{color:var(--brand);margin-top:2px}
.related{display:grid;gap:12px;margin-top:40px;padding-top:26px;border-top:1px solid var(--border)}@media(min-width:640px){.related{grid-template-columns:1fr 1fr}}
.related a{display:flex;justify-content:space-between;gap:12px;align-items:center;background:var(--surface-2);border:1px solid transparent;border-radius:16px;padding:16px 18px;color:var(--text)}.related a:hover{text-decoration:none;border-color:var(--brand)}
.related b{display:block}.related span{color:var(--muted);font-size:14px}.related .ico{color:var(--brand)}
/* Alt bilgi */
footer.bottom{border-top:1px solid var(--border);padding:44px 0 36px;color:var(--muted);font-size:14.5px;margin-top:24px}
.fgrid{display:grid;gap:28px}@media(min-width:760px){.fgrid{grid-template-columns:1.4fr 1fr 1fr}}
.fgrid h4{color:var(--text);font-size:13px;text-transform:uppercase;letter-spacing:.8px;margin:0 0 12px}
.fgrid ul{list-style:none;margin:0;padding:0;display:grid;gap:8px}.fgrid a{color:var(--muted)}.fgrid a:hover{color:var(--text)}
.fbrand p{margin:12px 0 0;max-width:340px}
.fbase{display:flex;flex-wrap:wrap;gap:8px 20px;justify-content:space-between;border-top:1px solid var(--border);margin-top:32px;padding-top:20px;font-size:13.5px}
@media print{header.top,footer.bottom,.toc,.related,.progress{display:none}body{background:#fff;color:#000}.doc-hero{background:none;border:0;padding-top:0}article.doc{border:0;box-shadow:none;padding:0}}
`;

const nav = (active) => `<header class="top"><div class="wrap">
<a class="brand" href="./" aria-label="Shiftim ana sayfa">${logo()}<span>Shiftim</span></a>
<nav class="links" aria-label="Ana menü">
<a class="hide-sm" href="./#ozellikler">Özellikler</a><a class="hide-sm" href="./#sss">SSS</a>
${docs.map((d) => `<a class="hide-sm" href="${d.slug}.html"${active === d.slug ? ' aria-current="page"' : ''}>${d.short}</a>`).join('')}
<a class="pill" href="app/">Panele giriş</a>
</nav></div></header>`;

const footer = `<footer class="bottom"><div class="wrap">
<div class="fgrid">
<div class="fbrand"><a class="brand" href="./">${logo()}<span>Shiftim</span></a><p>Kafe, restoran, klinik ve mağazalar için yapay zekâ destekli vardiya planlama.</p></div>
<div><h4>Ürün</h4><ul><li><a href="app/">Yönetim paneli (web)</a></li><li><a href="./#ozellikler">Özellikler</a></li><li><a href="./#nasil">Nasıl çalışır?</a></li><li><a href="./#sss">Sık sorulan sorular</a></li></ul></div>
<div><h4>Yasal</h4><ul>${docs.map((d) => `<li><a href="${d.slug}.html">${esc(d.doc.title)}</a></li>`).join('')}</ul></div>
</div>
<div class="fbase"><span>© ${YEAR} Shiftim · ${esc(controller)}</span><span>${mail}</span></div>
</div></footer>`;

const page = ({ title, description, active, body, script = '' }) => `<!doctype html>
<html lang="tr"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#4F46E5">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="website"><meta property="og:locale" content="tr_TR">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="style.css">
</head><body>
${nav(active)}
<main>${body}</main>
${footer}
${script}
</body></html>
`;

// Belgelerde: okuma çubuğu ve içindekilerde aktif bölümün vurgulanması (dış kaynak yok)
const docScript = `<script>
(() => {
  const bar = document.querySelector('.progress');
  const links = [...document.querySelectorAll('.toc a[href^="#"]')];
  const secs = links.map((a) => document.getElementById(a.getAttribute('href').slice(1)));
  const onScroll = () => {
    const h = document.documentElement;
    bar.style.width = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100 + '%';
    let i = secs.findLastIndex((s) => s && s.getBoundingClientRect().top < 140);
    links.forEach((a, k) => a.classList.toggle('on', k === i));
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  document.querySelector('.print')?.addEventListener('click', () => print());
})();
</script>`;

// ---------- Belge sayfaları ----------
for (const d of docs) {
  const { doc } = d;
  const sections = doc.sections.map((s) => {
    const id = anchor(s.heading);
    return `<section id="${id}"><h2>${esc(s.heading)}</h2>
${(s.paragraphs ?? []).map((p) => `<p>${fill(p)}</p>`).join('\n')}
${s.bullets ? `<ul>${s.bullets.map((b) => `<li>${fill(b)}</li>`).join('')}</ul>` : ''}</section>`;
  }).join('\n');
  const toc = doc.sections.map((s) => `<li><a href="#${anchor(s.heading)}">${esc(s.heading.replace(/^\d+\.\s*/, ''))}</a></li>`).join('');
  const related = docs.filter((x) => x !== d)
    .map((x) => `<a href="${x.slug}.html"><span><b>${esc(x.doc.title)}</b><span>${esc(x.desc)}</span></span>${svg('arrow')}</a>`).join('');
  writeFileSync(new URL(`./${d.slug}.html`, import.meta.url), page({
    title: `${doc.title} · Shiftim`,
    description: d.desc,
    active: d.slug,
    script: docScript,
    body: `<div class="progress" aria-hidden="true"></div>
<div class="doc-hero"><div class="wrap">
<div class="crumbs"><a href="./">Shiftim</a> / Yasal</div>
<h1>${esc(doc.title)}</h1>
<p>${esc(d.desc)}</p>
<div class="meta"><span>${svg('cal')} Son güncelleme: ${esc(doc.updated)}</span><span>${svg('shield')} Veri sorumlusu: ${esc(controller)}</span><span>${svg('mail')} ${esc(contact)}</span></div>
</div></div>
<div class="wrap"><div class="doc-layout">
<aside class="toc"><p>Bu sayfada</p><ol>${toc}</ol><button class="print" type="button">${svg('share')} Yazdır / PDF</button></aside>
<article class="doc card">
<div class="callout">${svg('shield')}<span>${fill(doc.intro)}</span></div>
${sections}
<div class="related">${related}</div>
</article></div></div>`,
  }));
}

// ---------- Tanıtım sayfası ----------
const features = [
  ['ai', '#6366F1', '#A855F7', 'Programı yapay zekâ hazırlasın', '“Ali pazartesi izinli, hafta sonları dönüşümlü olsun” yaz; program saniyeler içinde hazır. Sen kontrol edip yayınla.'],
  ['sos', '#F43F5E', '#FB923C', 'Gelemeyen çalışana anında çözüm', '“Bugün gelemiyorum” diyen çalışanın vardiyası ekibe duyurulur; ilk “Ben gelirim” diyen alır.'],
  ['chat', '#10B981', '#14B8A6', 'WhatsApp grubuna gerek yok', 'Ekip sohbeti ve birebir mesajlar uygulamanın içinde; program, izin ve konuşma tek yerde.'],
  ['qr', '#0EA5E9', '#6366F1', 'QR ve konumla giriş-çıkış', 'Çalışan işyerindeki QR kodu okutarak giriş yapar; mesai raporu kendiliğinden oluşur.'],
  ['sun', '#F59E0B', '#F97316', 'Yöneticiye sabah özeti', 'Her sabah tek bildirim: bugün kim var, hangi vardiya eksik, kaç talep onay bekliyor.'],
  ['list', '#8B5CF6', '#EC4899', 'Devir notu ve kontrol listesi', 'Açılış/kapanış listeleri ve vardiyalar arası devir notları. Kafe de klinik de aynı kolaylıkla.'],
];
const steps = [
  ['Ekibini davet et', 'İşletmeni oluştur, 6 haneli kodu çalışanlarına gönder. Google, Apple ya da e-postayla bir dakikada katılırlar.'],
  ['Programı söyle, o hazırlasın', 'Vardiya tiplerini bir kez tanımla; her hafta ne istediğini yaz, yapay zekâ izinleri ve müsaitlikleri gözeterek programı kursun.'],
  ['Yayınla ve rahatla', 'Yayınladığın an herkese bildirim gider. Takas, izin ve “gelemiyorum” talepleri artık uygulamada çözülür.'],
];
const faq = [
  ['Shiftim hangi işletmeler için uygun?', 'Vardiyalı çalışan her ekip için: kafe, restoran, fırın, klinik, hastane birimleri, mağaza, otel, güvenlik ve çağrı merkezleri. Vardiya tiplerini ve saatlerini kendin belirlersin.'],
  ['Çalışanlarım uygulamayı indirmek zorunda mı?', 'Hayır. Programı tek dokunuşla WhatsApp grubuna metin olarak ya da PDF olarak gönderebilirsin; uygulamayı kullanmayan da programı görür. Uygulamayı kullananlar ayrıca bildirim, takas ve izin özelliklerinden yararlanır.'],
  ['Yapay zekâ kararları benim yerime mi veriyor?', 'Hayır. Yapay zekâ yalnızca senin talimatlarınla taslak hazırlar; programı kontrol edip yayınlayan her zaman yöneticidir. Kalıcı talimatlarını (“hafta sonları dönüşümlü”) hatırlar ve her hafta uygular.'],
  ['Birden fazla şubem var, hepsini yönetebilir miyim?', 'Evet. Her şube ayrı ekip olarak tutulur; tek hesapla şubeler arasında geçiş yapabilirsin.'],
  ['Verilerim nerede saklanıyor?', "Avrupa Birliği'nde (Frankfurt) saklanır. Reklam ya da takip için kullanılmaz, satılmaz. Ayrıntılar Gizlilik Politikası ve KVKK Aydınlatma Metni'nde."],
  ['Hesabımı silebilir miyim?', 'Evet, uygulamada Ekip → Hesabımı sil ile istediğin an; hesabın ve sana ait kayıtlar kalıcı olarak silinir.'],
];
const apple = '<svg class="store" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.4 12.6c0-2.4 2-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.8-3.5.8-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.5-3.6zM14.1 5.6c.6-.8 1.1-1.8 1-2.9-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2-.5 2.7-1.3z"/></svg>';
const play = '<svg class="store" viewBox="0 0 24 24" aria-hidden="true"><path fill="#34A853" d="M4 3.3 13.6 13 4 22.7c-.4-.2-.6-.6-.6-1.1V4.4c0-.5.2-.9.6-1.1z"/><path fill="#FBBC04" d="m17 9.6-3.4 3.4L17 16.4l3.9-2.2c1-.6 1-1.9 0-2.4z"/><path fill="#4285F4" d="M4 3.3c.3-.2.8-.2 1.2 0L17 9.6 13.6 13z"/><path fill="#EA4335" d="m13.6 13 3.4 3.4-11.8 6.3c-.4.2-.9.2-1.2 0z"/></svg>';

writeFileSync(new URL('./index.html', import.meta.url), page({
  title: 'Shiftim · Vardiya planlama, tek dokunuşla',
  description: 'Kafe, restoran, klinik ve mağazalar için yapay zekâ destekli vardiya planlama, açık vardiya, ekip sohbeti ve QR ile mesai takibi.',
  active: 'home',
  body: `<div class="hero-bg"><div class="wrap">
<section class="hero">
<div>
<span class="eyebrow"><span class="dot"></span>Yakında App Store ve Google Play'de</span>
<h1>Vardiya planlama,<br><span class="grad">tek dokunuşla.</span></h1>
<p class="lead">Programı yapay zekâ hazırlasın, gelemeyen çalışanın yerine ekip anında girsin, herkes WhatsApp'a dönmeden uygulamada konuşsun.</p>
<div class="cta">
<span class="btn dark">${apple}<span><small>Yakında</small>App Store</span></span>
<span class="btn ghost">${play}<span><small>Yakında</small>Google Play</span></span>
</div>
<div class="hero-note">${svg('shield')}Verilerin AB'de saklanır · reklam ve takip yok · KVKK uyumlu</div>
</div>
<div class="phone-wrap" aria-hidden="true">
<div class="float-chip a">${svg('ai')} Program 8 sn'de hazır</div>
<div class="float-chip b">${svg('sun')} Sabah özeti: 6 kişi, 0 eksik</div>
<div class="phone"><div class="screen">
<div class="status"><span>09:41</span><span class="island"></span><span class="bars"><i style="height:5px"></i><i style="height:7px"></i><i style="height:9px"></i><i style="height:11px"></i></span></div>
<p class="p-greet">Cumartesi, 11 Ekim</p><p class="p-title">Günaydın, Ayşe</p>
<div class="p-card p-shift"><div class="t">2 sa 15 dk sonra başlıyor</div><div class="h">08:00 – 16:00</div><div class="s">Sabah vardiyası</div>
<div class="who"><i style="background:#0EA5E9">MK</i><i style="background:#10B981">ZA</i><i style="background:#F59E0B">+2</i></div></div>
<div class="p-card p-open"><b>Cmt · Akşam vardiyası</b><span>Ali gelemiyor · “Hastayım”</span><div class="p-row"><span class="p-btn">Ben gelirim</span><span class="p-tag">Açık</span></div></div>
<div class="p-card p-chat"><div class="bub in">Süt bitti, sabah sipariş verelim mi?</div><div class="bub out">Tamam, devir notuna yazdım 👍</div></div>
<div class="tabbar"><span class="on">${svg('sun')}Bugün</span><span>${svg('cal')}Takvim</span><span>${svg('chat')}Mesajlar</span><span>${svg('team')}Ekip</span></div>
</div></div>
</div>
</section>
<p class="sectors-label">Vardiyalı çalışan her ekip için</p>
<div class="sectors"><span>☕ Kafe</span><span>🍽️ Restoran</span><span>🥐 Fırın</span><span>🏥 Klinik &amp; hastane</span><span>🛍️ Mağaza</span><span>🏨 Otel</span><span>🛡️ Güvenlik</span><span>📞 Çağrı merkezi</span></div>
</div></div>

<div class="wrap">
<section class="block" id="ozellikler">
<div class="sec-head"><span class="eyebrow">Özellikler</span><h2>Yöneticinin işini <span class="grad">neredeyse sıfırlar</span></h2><p>En büyük günlük dert gelmeyen çalışan; en çok zaman alan iş program yapmak. İkisini de çözüyoruz.</p></div>
<div class="grid three">${features.map(([i, c1, c2, h, p]) => `<div class="card feature"><div class="ibox" style="--c1:${c1};--c2:${c2}">${svg(i)}</div><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
</section>

<section class="block" id="nasil" style="padding-top:0">
<div class="sec-head"><span class="eyebrow">Nasıl çalışır?</span><h2>Üç adımda hazır</h2><p>Kurulum yok, eğitim yok. Bugün başla, bu haftanın programını bugün yayınla.</p></div>
<div class="steps">${steps.map(([h, p]) => `<div class="card step"><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
</section>

<section class="block" style="padding-top:0">
<div class="trust">
<div><h2>Verilerin güvende</h2><p>Ekibinin bilgileri yalnızca vardiya işlerin için kullanılır. Reklam yok, takip yok, satış yok.</p>
<div class="docs">${docs.map((d) => `<a href="${d.slug}.html">${esc(d.doc.title)}</a>`).join('')}</div></div>
<ul>
<li>${svg('globe')}<span><b>AB'de saklanır</b><span>Veriler Frankfurt veri merkezinde tutulur ve şifreli bağlantıyla iletilir.</span></span></li>
<li>${svg('lock')}<span><b>Herkes sadece kendi yetkisini görür</b><span>Çalışanlar birbirinin ücretini, izin taleplerini ya da birebir mesajlarını göremez.</span></span></li>
<li>${svg('trash')}<span><b>Silmek senin elinde</b><span>Hesabını ve tüm verilerini uygulamadan istediğin an kalıcı olarak silebilirsin.</span></span></li>
</ul>
</div>
</section>

<section class="block" id="sss" style="padding-top:0">
<div class="sec-head center"><span class="eyebrow">SSS</span><h2>Sık sorulan sorular</h2></div>
<div class="faq">${faq.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(q)}${svg('chev')}</summary><p>${esc(a)}</p></details>`).join('')}</div>
</section>

<section class="block" style="padding-top:0">
<div class="final"><h2>Erken erişim listesine katıl</h2><p>Shiftim çok yakında mağazalarda. İşletmende ilk deneyenlerden olmak istersen yaz; kurulumda birebir yardımcı olalım.</p>
<a class="btn dark" href="mailto:${esc(contact)}?subject=Shiftim%20erken%20eri%C5%9Fim">${svg('mail')} Bize yaz</a></div>
</section>
</div>`,
}));

writeFileSync(new URL('./style.css', import.meta.url), css.trim() + '\n');
writeFileSync(new URL('./favicon.svg', import.meta.url), logo('x').replace('class="x" ', 'xmlns="http://www.w3.org/2000/svg" ').replace(' aria-hidden="true"', '') + '\n');
writeFileSync(new URL('./.nojekyll', import.meta.url), '');
console.log('index.html, gizlilik.html, kvkk.html, cerez.html, style.css, favicon.svg yazıldı');
