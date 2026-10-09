# Vértice Perícia e Desenvolvimento

Site institucional da Vértice, com áreas independentes para serviços periciais, auditoria e desenvolvimento de software.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

O endereço local será informado no terminal. Para validar a versão de produção:

```sh
npm run build
npm run preview
```

## Analytics

O site está preparado para carregar o Google Analytics 4 somente quando a variável
`VITE_GA_MEASUREMENT_ID` estiver configurada. Copie `.env.example` para `.env.local` durante o
desenvolvimento ou adicione a variável nas configurações de ambiente da Netlify.

Além das visualizações de página, o site envia os seguintes eventos quando o Analytics está ativo:

- `contact_form_submit`
- `software_request`
- `whatsapp_click`
- `email_click`
- `phone_click`
- `generate_lead`

O Analytics respeita o consentimento registrado no banner de cookies. Sem autorização, o script do
Google Analytics não é carregado. O visitante pode reabrir as preferências pelo link “Cookies” no
rodapé.

## Netlify Forms

A página `/contato` envia três formulários independentes para a área **Forms** da Netlify:

- `solicitacao-pericia`
- `solicitacao-auditoria`
- `solicitacao-desenvolvimento`

As definições estáticas usadas pela detecção do build ficam em `public/netlify-forms.html`. Depois do
primeiro deploy, confirme no painel da Netlify que os três formulários foram reconhecidos e configure
as notificações por e-mail desejadas.
