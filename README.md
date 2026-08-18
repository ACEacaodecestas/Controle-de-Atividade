# Ordem de Serviço – Manutenção Preventiva e Corretiva

Aplicativo web/PWA para criação de Ordens de Serviço, checklists de CFTV, Controle de Acesso, Cerca Elétrica, Alarme, Infraestrutura/Rede, registro fotográfico, assinatura na tela e geração de PDF.

## Publicar no GitHub Pages

1. Crie um repositório no GitHub.
2. Envie `index.html`, `manifest.json` e `sw.js`.
3. Vá em **Settings → Pages**.
4. Em Source, selecione **Deploy from a branch**.
5. Escolha `main` e `/root`.
6. Salve e abra o endereço do GitHub Pages no celular.

O app usa `localStorage` do navegador para o histórico. Portanto, nesta primeira versão os dados ficam no aparelho/navegador em que foram cadastrados.

## Assinatura

A assinatura do cliente é feita diretamente no canvas, com dedo ou caneta, e é incorporada ao PDF.

## Próxima evolução recomendada

Para uso profissional com vários técnicos/celulares, adicionar banco de dados online, login, numeração centralizada, backup, fotos em armazenamento, painel administrativo e envio automático da OS assinada por WhatsApp/e-mail.
