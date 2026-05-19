# Cardápio Digital v2.0 - Tobia's Lanches

Esta é a v2.0 do cardápio digital anterior do Tobia's Lanches. A proposta continua a mesma: o cliente escolhe os itens, revisa o pedido e envia tudo pelo WhatsApp, mas agora em uma base mais organizada, com visual refinado e um painel Admin mais preparado para manutenção diária.

Em relação à versão anterior, a navegação pública, o carrinho, o checkout e o gerenciamento do catálogo ficaram mais consistentes em desktop e mobile. A estrutura também ficou mais pronta para operação online, sem deixar de ser simples de publicar como projeto estático.

Veja o projeto já online em: [Cardápio Digital v2.0](https://cardapio-digital-tobias-lanches-v2-0.vercel.app/)

## O que mudou na v2.0

- Interface pública mais limpa e mais consistente para navegação, filtros, carrinho e checkout.
- Painel Admin mais sólido para editar produtos, categorias, adicionais, combos e configurações.
- Melhor controle de disponibilidade de produtos, horários, PIX, taxas e localidades de entrega.
- Base reorganizada para facilitar manutenção, publicação e uso com sincronização online.

## Estrutura do projeto

- `index.html`: entrada do cardápio público.
- `admin.html`: entrada do painel Admin.
- `config.js`: configuração pública do modo online.
- `assets/`: logo, favicon e arquivos visuais do projeto.
- `dist/`: scripts e estilos usados pelo cardápio e pelo Admin.
- `vercel.json`: configuração de deploy e headers para publicação na Vercel.

## Como usar

Abra `index.html` para acessar o cardápio.

Abra `admin.html` para acessar o painel de gerenciamento.

Não precisa rodar build para usar esta versão. A pasta `dist/` já faz parte do projeto entregue.

## Modo online e configuração atual

O projeto suporta operação online via Supabase, e a configuração pública desse modo fica centralizada em `config.js`.

Se a conexão, as tabelas ou o bucket mudarem, o ponto de ajuste principal é `config.js`.

## Publicação

Esta v2.0 pode ser publicada como site estático.

- Para uso local, basta abrir os arquivos principais no navegador.
- Para deploy, o projeto já inclui `vercel.json` com headers e regras adequadas para publicação na Vercel.

## Observação

Logo, favicon, imagens e dados do estabelecimento podem ser ajustados sem alterar a estrutura principal da v2.0.

Desenvolvido por Kayron Magalhães. Todos os direitos reservados.
