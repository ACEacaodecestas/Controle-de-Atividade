# Ordem de Serviço — PWA final com modo offline

Esta versão mantém a OS e corrige o Service Worker para oferecer um app-shell offline real.

Importante:
- Publique todos os arquivos na raiz do GitHub Pages.
- Mantenha a pasta `icons/`.
- Depois de publicar, abra o site no Chrome Android e atualize.
- Toque em `🔧 Diagnóstico PWA`.
- O Service Worker deve aparecer como registrado e controlando.

O Chrome pode decidir quando mostrar o prompt de instalação. O evento `beforeinstallprompt` não é uma garantia permanente; a instalação também pode aparecer pelo menu do Chrome quando o site atende aos critérios.
