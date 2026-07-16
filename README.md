# Cardápio Digital v2.0 - Tobia's Lanches

<div align="center">
  <p>Uma evolução da primeira versão do cardápio digital, com categorias mais fáceis de encontrar, fechamento do pedido mais previsível e um painel Admin voltado para ajustes diários de catálogo, taxas, horários e combos.</p>
  <p>
    <a href="https://cardapio-digital-tobias-lanches-v2-0.vercel.app/"><b>Ver projeto online</b>
</div>

## Visão geral

O **Cardápio Digital v2.0** nasceu da evolução da primeira versão criada para o Tobia's Lanches. A primeira versão já tirava o pedido da conversa solta no WhatsApp e transformava o PDF em um cardápio web. A v2.0 levou essa base para uma rotina mais completa de atendimento, com catálogo maior, checkout por tipo de atendimento, Admin para manutenção diária e operação online com Supabase.

A solução foi reorganizar a experiência pública e o painel Admin para deixar o fluxo do pedido mais fácil de acompanhar. O cliente navega pelo cardápio, monta o pedido, confere itens, valores e forma de atendimento, e envia a mensagem pronta pelo WhatsApp. No Admin, a manutenção do catálogo, das configurações e da personalização fica concentrada em uma estrutura mais fácil de continuar evoluindo.

## Resumo rápido

| Área | O que a v2.0 entrega |
| --- | --- |
| Público | Categorias visíveis, carrinho com resumo do pedido e checkout dividido por tipo de atendimento |
| Admin | Edição de produtos, categorias, adicionais, combos, horários, Pix, taxas e dados do estabelecimento |
| Operação | Controle de disponibilidade, horários, taxas, Pix e localidades |
| Online | Integração com Supabase por `config.js` |
| Publicação | Arquivos estáticos prontos para uso local ou deploy na Vercel |

## Contexto do projeto

### O problema

A primeira versão já resolvia um ponto importante: tirar o pedido do PDF e das mensagens soltas no WhatsApp. Mesmo assim, o projeto ainda precisava cobrir mais partes do dia a dia do estabelecimento. O catálogo cresceu, o checkout precisava lidar com entrega, retirada e consumo no local, e o Admin precisava dar mais controle para editar dados sem depender de mudanças diretas no código.

### Qual foi a solução?

Reorganizei a área pública e o painel Admin para transformar o cardápio em uma base mais próxima de produto. A área pública ficou focada em escolha, revisão e envio do pedido. O Admin ficou focado em manutenção: produtos, categorias, adicionais, combos, horários, Pix, localidades, taxas e integração online.

### Minha contribuição

- Na concepção, defini a evolução da primeira versão para uma base mais completa.
- Na análise de requisitos, organizei as necessidades do cliente, do atendimento e do Admin.
- No design e na modelagem, planejei a interface pública, o fluxo de pedido e a estrutura do painel administrativo.
- No código, desenvolvi catálogo, carrinho, checkout, Admin e integração com Supabase.
- Nos testes, validei funcionamento e responsividade em diferentes tamanhos de tela.
- Na implantação, publiquei na Vercel e deixei a base preparada para ajustes e evolução.

### O que se destaca?

- Catálogo público com produtos, categorias, adicionais e combos em uma navegação direta.
- Checkout preparado para entrega, retirada ou consumo no local, com taxa por localidade, Pix, mesa e dados de endereço.
- Painel Admin para cuidar do catálogo, horários, localidades, taxas, personalização e uso online com Supabase.

## O que mudou em relação à versão anterior

### Interface pública
- Categorias e produtos separados de forma mais fácil de escanear
- Títulos, descrições e preços com leitura mais direta no cardápio
- Combos em seção própria, sem parecerem improviso dentro da lista de produtos
- Carrinho com comportamento mais previsível em desktop e mobile
- Checkout separado para entrega, retirada e consumo no local
- Resumo do pedido mais fácil de conferir antes de abrir o WhatsApp

### Painel administrativo
- Cadastro do catálogo separado por produtos, categorias, adicionais e combos
- Organização do Admin seguindo a rotina de edição do estabelecimento
- Configurações reunindo dados usados no pedido, como horários, Pix, taxas e localidades
- Ajustes recorrentes concentrados no painel e no `config.js`, sem exigir edição do HTML principal

### Operação do estabelecimento
- Controle de disponibilidade de produtos
- Controle de horários de funcionamento
- Configuração de Pix e formas de pagamento
- Configuração de taxas e localidades de entrega
- Dados prontos para sincronização online quando o Supabase estiver configurado

## Recursos novos da v2.0

Além da reorganização visual e estrutural, a v2.0 concentra recursos que aparecem no fluxo de pedido de ponta a ponta: idioma, acessibilidade, combos, entrega por localidade, Pix e atualização online.

### Recursos novos no público

- **Idioma em PT-BR e EN**
  - A interface pública conta com seletor de idioma e estrutura preparada para conteúdo bilíngue.

- **Modo de acessibilidade**
  - O topo da aplicação inclui um modo acessível com leitura reforçada para deixar textos e controles mais fáceis de identificar.

- **Combos com destaque próprio**
  - A versão 2.0 ganhou uma área dedicada para combos, com título próprio, indicação de economia e adição direta ao carrinho.

- **Checkout por tipo de atendimento**
  - O cliente pode escolher entre entrega, retirada ou consumo no local, sem depender de um fluxo único e engessado.

- **Pedido no local com identificação de mesa**
  - Para consumo no estabelecimento, o sistema permite informar o número da mesa no próprio checkout.

- **Entrega por localidade**
  - A taxa pode variar por localidade, e o sistema também trata casos em que determinada área não está disponível para entrega.

- **Link do Google Maps e coordenadas opcionais**
  - O cliente pode informar um link da localização ou preencher latitude e longitude para facilitar a entrega.

- **Painel de Pix no checkout**
  - Ao escolher Pix, a chave aparece no fluxo de pagamento com suporte para cópia rápida.

- **Feedback de atualização online**
  - Quando o modo online está ativo, o público recebe mensagens de atualização do cardápio sem depender de recarga manual como única saída.

### Recursos novos no Admin

- **Gestão do catálogo e da operação**
  - A manutenção não fica restrita a produtos: a v2.0 organiza categorias, adicionais, combos, horários, taxas, Pix e dados do estabelecimento.

- **Área de Nuvem**
  - O projeto passa a ter uma área específica para operação online, conectando a manutenção diária com a estrutura de sincronização.

- **Relatórios**
  - O painel inclui uma área dedicada para leitura operacional e acompanhamento, então o Admin não fica limitado ao cadastro de produtos.

- **Imagens preparadas para operação online**
  - A estrutura do projeto já considera bucket de imagens (`product-images`) para publicação e manutenção visual do catálogo.

- **Publicação e manutenção contínua**
  - Em vez de funcionar apenas como uma página estática editada manualmente, a v2.0 separa arquivos e dados para facilitar atualizações frequentes.

## Principais funcionalidades

### Catálogo público
Na área pública, o cliente pode:

- navegar pelas categorias do cardápio
- visualizar produtos com nome, descrição e preço
- acessar combos em seção dedicada
- adicionar itens ao carrinho
- escolher adicionais quando aplicável
- alternar idioma da interface
- ativar o modo de acessibilidade
- revisar o pedido antes do envio
- finalizar tudo pelo WhatsApp

### Carrinho e checkout
O fluxo de pedido cobre:

- revisão dos itens do carrinho
- resumo financeiro do pedido
- escolha entre entrega, retirada ou consumo no local
- seleção da localidade de entrega
- cálculo de taxa quando aplicável
- preenchimento de endereço e referência
- preenchimento de número da mesa para consumo no local
- uso opcional de coordenadas e link do Google Maps
- exibição de dados do Pix com cópia rápida da chave
- confirmação final antes de abrir o WhatsApp

### Painel Admin
O `admin.html` concentra a gestão do sistema e cobre:

- **Produtos**
- **Categorias**
- **Adicionais**
- **Combos**
- **Configurações**
- **Nuvem**
- **Relatórios**

Na prática, isso permite atualizar o cardápio e os dados operacionais com muito mais controle do que na primeira versão.

## Estrutura do projeto

```text
Cardapio Digital v2.0/
|-- index.html
|-- admin.html
|-- config.js
|-- vercel.json
|-- robots.txt
|-- LICENSE
|-- README.md
|-- assets/
`-- dist/
```

### Arquivos principais

| Arquivo | Função |
| --- | --- |
| `index.html` | Entrada do cardápio público |
| `admin.html` | Entrada do painel administrativo |
| `config.js` | Configuração pública do modo online |
| `assets/` | Logo, favicon e arquivos visuais |
| `dist/` | Scripts e estilos usados pelo público e pelo Admin |
| `vercel.json` | Regras de deploy e headers para publicação |

## Fluxo de uso

### Área pública
1. O cliente abre o cardápio
2. Navega pelas categorias
3. Escolhe os produtos
4. Adiciona itens ao carrinho
5. Revisa o pedido
6. Define entrega, retirada ou consumo no local
7. Confirma os dados
8. Abre o WhatsApp com a mensagem pronta para envio

### Área administrativa
1. O responsável acessa `admin.html`
2. Entra no painel
3. Ajusta catálogo e configurações
4. Publica ou sincroniza os dados conforme o modo configurado
5. Revisa o resultado no cardápio público

## Tecnologias utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript Vanilla

### Operação online
- Supabase
- Supabase Storage
- Supabase Realtime

### Publicação
- Vercel

Essa base mantém o projeto leve, com arquivos estáticos para publicação rápida e suporte a Supabase quando a operação precisar de sincronização online.

## Modo online

O projeto suporta operação online com Supabase, e a configuração pública fica centralizada em `config.js`.

Hoje, essa configuração cobre:

- ativação do modo online
- provider usado
- realtime
- URL do projeto Supabase
- chave pública `anon`
- schema
- nomes das tabelas
- bucket de imagens

### Estrutura configurada
- `menu_categories`
- `menu_products`
- `menu_add_ons`
- `menu_product_add_ons`
- `menu_settings`
- bucket `product-images`

### Importante
O `config.js` deve conter apenas dados públicos compatíveis com frontend, como:

- URL pública
- chave `anon`
- nomes das tabelas
- bucket

Ele **não** deve receber:

- chave administrativa do Supabase
- credenciais privadas
- segredos de backend

## Uso e publicação

### Uso local
- abra `index.html` para acessar o cardápio
- abra `admin.html` para acessar o painel administrativo

Esta versão já inclui a pasta `dist/`, então não depende de build para uso comum.

### Publicação
- para publicar sem backend próprio, basta hospedar os arquivos
- para deploy na Vercel, o projeto já inclui `vercel.json`
- a estrutura atual já está pronta para deploy estático

## Personalização

Sem alterar a estrutura principal, é possível ajustar:

- logo
- favicon
- textos do estabelecimento
- dados de contato
- dados de pagamento
- catálogo
- categorias
- adicionais
- combos
- horários
- disponibilidade
- localidades e taxas de entrega

Isso permite reaproveitar a base para outro estabelecimento trocando conteúdo, identidade visual e dados operacionais, sem reconstruir a aplicação.

## O que evoluiu?

A primeira versão cumpria bem a função de transformar um cardápio estático em uma experiência clicável com envio por WhatsApp. Ela provou que o fluxo de atendimento podia ficar mais rápido e organizado.

A v2.0 deixou de ser apenas um ajuste visual e passou a ser uma base de produto em uso, com:

- telas públicas com hierarquia visível entre títulos, botões, descrições e preços
- fluxo público com passos mais previsíveis
- layout ajustado para leitura em desktop e mobile
- suporte a idioma e acessibilidade na experiência pública
- checkout separado para entrega, retirada e consumo no local
- localidade de entrega com cálculo e bloqueio por área
- Pix integrado ao fluxo de fechamento do pedido
- combos tratados como parte real da experiência, não como exceção
- Admin organizado por tarefas de manutenção
- estrutura preparada para continuar evoluindo o projeto
- conexão online documentada por `config.js` e tabelas Supabase

Em resumo: a ideia continua direta, mas agora o projeto cobre mais etapas reais do pedido, da manutenção e da publicação online.

## Indicação de uso

Esta base é adequada para cenários como:

- quiosques
- lanchonetes
- pequenos negócios de alimentação com cardápio atualizado com frequência
- operações que recebem pedidos por WhatsApp
- cardápios digitais com necessidade de manutenção frequente
- publicação rápida de um cardápio estático com opção de sincronização online

## Observações finais

- o projeto pode ser publicado como site estático
- a área pública prioriza leitura e pedido no celular
- o Admin concentra os ajustes diários do cardápio e da operação
- a configuração online depende do `config.js`
- branding e conteúdo podem ser ajustados sem reestruturar a base

## Licença

Este projeto é protegido por direitos autorais.

Consulte o arquivo `LICENSE` para a política de uso desta base.

## Autor

Desenvolvido por **Kayron Magalhães**.
Todos os direitos reservados.
