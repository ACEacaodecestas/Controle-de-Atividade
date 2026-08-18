# Ordem de Serviço — PWA

Esta versão mantém o aplicativo web e usa o mecanismo oficial de instalação do Chrome.

Quando o Chrome disponibilizar `beforeinstallprompt`, o botão **Instalar aplicativo** abre a caixa nativa do Android.

Se o Chrome não disponibilizar o evento, o botão mostra o caminho pelo menu do Chrome. Isso é uma limitação deliberada do navegador: JavaScript não pode fabricar a caixa nativa de instalação.

Publique todos os arquivos na raiz do repositório, mantendo `icons/`.
