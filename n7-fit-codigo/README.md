# N7 Fit Academia

Site em Next.js, TypeScript e Tailwind, com exportação estática.

## Visualizar

Versão hospedada: https://n7-fit-contagem.earthyllama4.chatgpt.site

Para executar o projeto localmente com Node.js e pnpm instalados:

```sh
pnpm install
pnpm dev
```

Abra http://127.0.0.1:3000. Para gerar arquivos estáticos, execute `pnpm build`. O resultado fica em `out/` e precisa ser servido por um servidor HTTP.

## Atualizar conteúdo

Os dados de contato estão centralizados em `app/units.ts`. Retiro, Três Barras e Fonte Grande têm contatos individuais e mensagens de WhatsApp codificadas. Nova Contagem tem localização pelo endereço fornecido e contato pelo Instagram oficial.

As fotografias são conceituais, geradas por IA e identificadas na página. A assinatura tipográfica N7 FIT é temporária. Substitua pelo logotipo original e por fotos reais autorizadas quando disponíveis.

## Informações pendentes

- Logotipo original em alta resolução e fotografias autorizadas das unidades.
- Telefone de Nova Contagem; confirmação do endereço fornecido antes de visitas.
- Confirmação direta do endereço de Fonte Grande (Rua José Rodrigues Guilherme, 785). Ele foi omitido do site até essa confirmação.
- Horários, planos, modalidades e benefícios por unidade.
- Ficha e atualidade das avaliações de Nova Contagem. Pontuação e depoimentos fornecidos não foram publicados por falta de verificação.

Não há preços, horários, CNPJ, testemunhos, profissionais ou ofertas inventados. O botão flutuante e a chamada final abrem o seletor de unidades.
