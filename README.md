# Shiftim web sitesi

Tanıtım sayfası ve yasal belgeler (Gizlilik Politikası, KVKK Aydınlatma Metni, Çerez Politikası). GitHub Pages ile yayınlanır.

- Gizlilik metni uygulamadaki `../mobile/src/lib/privacy.json` dosyasından gelir; uygulama ve site aynı metni gösterir.
- KVKK ve çerez metinleri `content/` altında.
- Metin değişince `node build.mjs` çalıştır, oluşan HTML dosyalarını commit edip gönder.
