# Ordem de Serviço — correção do Service Worker

Esta versão corrige o principal problema encontrado no diagnóstico:
Service Worker não registrado.

O registro agora usa explicitamente:
`/Controle-de-Atividade/sw.js`

O Service Worker foi simplificado para não depender de cache de arquivos durante a instalação.

Publique todos os arquivos na raiz do repositório e mantenha a pasta `icons/`.

Após publicar:
1. Abra o aplicativo no Chrome Android.
2. Atualize a página.
3. Toque em `🔧 Diagnóstico PWA`.
4. Confira se `Service Worker registrado` aparece como ✅.
5. Depois teste `📲 Instalar aplicativo`.
