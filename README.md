# Vinicius Romualdo — Portfolio

Portfolio profissional desenvolvido com Next.js, TypeScript e CSS.

## Desenvolvimento local

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Validação

```bash
npm run lint
npm run build
```

## Publicação na Vercel

1. Importe este repositório em https://vercel.com/new.
2. Mantenha o framework detectado como **Next.js**.
3. Adicione a variável `NEXT_PUBLIC_SITE_URL` com a URL pública definitiva,
   sem barra no final.
4. Clique em **Deploy**.

Cada atualização enviada à branch `main` gera automaticamente uma nova
publicação em produção. Pull requests recebem URLs de preview isoladas.

## SEO e compartilhamento

Os metadados ficam em `app/layout.tsx`. A imagem utilizada por LinkedIn,
WhatsApp e outras redes fica em
`public/vinicius-romualdo-og.png`.
