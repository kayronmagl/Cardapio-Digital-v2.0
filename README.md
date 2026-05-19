# Cardápio Digital v2.0 - Tobia's Lanches

A v2.0 do **Cardápio Digital - Tobia's Lanches** representa a evolução direta da primeira versão do projeto. A proposta continua a mesma: permitir que o cliente escolha os produtos, revise o pedido e finalize tudo pelo WhatsApp de forma simples. A diferença é que, nesta versão, a base foi reorganizada para entregar uma experiência mais consistente no público e uma manutenção muito mais prática no Admin.

Em relação à versão anterior, a interface pública ficou mais clara, o fluxo do carrinho e do checkout ficou mais sólido, e o gerenciamento do catálogo passou a cobrir melhor a rotina real do estabelecimento. O projeto também foi preparado para operação online com Supabase, sem perder a simplicidade de publicação como site estático.

## Acesso ao projeto

- **Projeto online:** [Cardápio Digital v2.0](https://cardapio-digital-tobias-lanches-v2-0.vercel.app/)
- **Repositório:** [kayronmagl/Cardapio-Digital-v2.0](https://github.com/kayronmagl/Cardapio-Digital-v2.0)

---

## Visão geral

Esta versão foi pensada para melhorar dois pontos ao mesmo tempo:

1. **Experiência do cliente**
   - navegação mais organizada no cardápio
   - carrinho mais claro
   - checkout mais consistente
   - confirmação do pedido com envio direto para o WhatsApp

2. **Operação do estabelecimento**
   - painel Admin mais estruturado
   - melhor controle do catálogo
   - ajustes de disponibilidade, horários, taxas e dados de entrega
   - base mais preparada para operação online e manutenção frequente

O resultado é um projeto mais maduro do que a primeira versão, sem fugir da proposta original: um cardápio digital simples, funcional e fácil de publicar.

---

## O que mudou na v2.0

A v2.0 não é apenas uma continuação visual da versão anterior. Ela traz uma reorganização real da experiência e da estrutura do projeto.

### Melhorias na área pública
- Interface mais limpa e mais consistente para navegação no cardápio
- Melhor leitura das categorias, produtos e combos
- Carrinho com fluxo mais claro para revisão do pedido
- Checkout mais bem organizado para entrega, retirada ou consumo no local
- Melhor comportamento em desktop e mobile
- Revisão do envio final pelo WhatsApp com mensagem mais estruturada

### Melhorias na área administrativa
- Painel Admin mais sólido para manutenção do catálogo
- Edição de produtos, categorias, adicionais e combos em uma estrutura mais consistente
- Ajustes de configurações do estabelecimento sem precisar alterar a base principal do projeto
- Melhor controle operacional para rotina diária

### Melhorias operacionais
- Controle de disponibilidade de produtos
- Controle de horários
- Configuração de Pix e formas de pagamento
- Configuração de taxas e localidades de entrega
- Base mais preparada para sincronização online com Supabase

---

## Principais recursos

## Catálogo público
A área pública do sistema foi pensada para que o cliente consiga navegar com rapidez, principalmente no celular.

### O cliente pode:
- visualizar categorias do cardápio
- consultar produtos com nome, descrição e preço
- acessar combos em área dedicada
- adicionar produtos ao carrinho
- escolher adicionais quando aplicável
- revisar o pedido antes de enviar
- escolher entre entrega, retirada ou consumo no local
- finalizar pelo WhatsApp com a mensagem já montada

## Carrinho e checkout
O fluxo de pedido foi estruturado para reduzir atrito na finalização.

### O checkout cobre:
- revisão dos itens do carrinho
- resumo financeiro do pedido
- escolha do tipo de atendimento
- seleção de localidade de entrega
- cálculo de taxa quando aplicável
- campos de endereço e referência
- opção de coordenadas e link do Google Maps
- confirmação final antes de abrir o WhatsApp

## Painel Admin
O `admin.html` concentra a parte de gestão.

### O Admin cobre:
- **Produtos**
- **Categorias**
- **Adicionais**
- **Combos**
- **Configurações**
- **Nuvem**
- **Relatórios**

Na prática, isso permite manter o cardápio e os dados do estabelecimento sem depender de edição manual do HTML principal para tarefas do dia a dia.

---

## Estrutura do projeto

```text
Cardapio Digital v2.0/
├─ index.html
├─ admin.html
├─ config.js
├─ vercel.json
├─ robots.txt
├─ LICENSE
├─ README.md
├─ assets/
└─ dist/
```

### Arquivos principais

- `index.html`  
  Entrada da área pública do cardápio.

- `admin.html`  
  Entrada do painel administrativo.

- `config.js`  
  Configuração pública do modo online. Centraliza a integração com Supabase no ambiente publicado.

- `vercel.json`  
  Configuração de deploy e headers para publicação na Vercel.

- `assets/`  
  Arquivos de identidade visual, como logo e favicon.

- `dist/`  
  Scripts e estilos usados tanto na interface pública quanto no Admin.

---

## Fluxo de uso

## Área pública
1. O cliente abre o cardápio
2. Navega pelas categorias
3. Escolhe os produtos
4. Adiciona itens ao carrinho
5. Revisa o pedido
6. Define entrega, retirada ou consumo no local
7. Confirma os dados
8. Abre o WhatsApp com a mensagem pronta para envio

## Área administrativa
1. O responsável acessa `admin.html`
2. Entra no painel
3. Ajusta catálogo e configurações
4. Publica ou sincroniza os dados, conforme o modo configurado
5. Revisa o resultado no cardápio público

---

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

A escolha dessa base mantém o projeto simples de publicar, mas ainda suficiente para suportar operação online quando necessário.

---

## Modo online

A v2.0 suporta operação online com Supabase.

A configuração pública atual fica centralizada em:

- `config.js`

Hoje, essa configuração inclui:
- ativação do modo online
- provider usado
- realtime
- URL do projeto Supabase
- chave pública `anon`
- schema
- nomes das tabelas
- bucket de imagens

### Estrutura configurada no modo online
- `menu_categories`
- `menu_products`
- `menu_add_ons`
- `menu_product_add_ons`
- `menu_settings`
- bucket `product-images`

### Importante
O `config.js` deve conter apenas dados públicos de integração compatíveis com frontend, como:
- URL pública
- chave `anon`
- nomes de tabelas
- bucket

Ele **não** deve receber:
- `service_role`
- credenciais privadas
- segredos de backend

---

## Como usar

## Uso local
Para abrir localmente:

- abra `index.html` para acessar o cardápio
- abra `admin.html` para acessar o painel administrativo

Esta versão já inclui a pasta `dist/`, então não depende de build para uso comum.

## Uso publicado
O projeto pode ser publicado como site estático.

- para uso simples, basta hospedar os arquivos
- para deploy na Vercel, o projeto já inclui `vercel.json`

---

## Publicação

A v2.0 foi organizada para continuar simples de publicar.

### Opção 1: uso local
- abrir os arquivos principais diretamente no navegador

### Opção 2: deploy estático
- publicar a raiz do projeto como site estático

### Opção 3: Vercel
- usar o `vercel.json` já incluído
- manter os arquivos principais na estrutura atual
- publicar o projeto com a configuração de headers já prevista

---

## Personalização

A estrutura principal da v2.0 permite adaptar o projeto sem refazer a base.

### É possível ajustar com facilidade:
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

Isso permite reaproveitar a base do projeto sem alterar sua estrutura central.

---

## Diferença em relação à versão anterior

A primeira versão do projeto cumpria bem a função de transformar um cardápio estático em uma experiência clicável com envio por WhatsApp.

A v2.0 amplia essa proposta com:
- interface mais bem resolvida
- fluxo público mais consistente
- melhor uso em telas diferentes
- Admin mais preparado para manutenção real
- base mais organizada para continuidade do projeto
- suporte mais claro à operação online

Em resumo: a proposta continua simples, mas a estrutura ficou mais madura.

---

## Indicação de uso

Este projeto é adequado para cenários como:
- quiosques
- lanchonetes
- pequenos negócios de alimentação
- operações que recebem pedidos por WhatsApp
- cardápios digitais com necessidade de manutenção frequente
- publicação rápida de uma solução estática com possibilidade de integração online

---

## Observações importantes

- O projeto continua simples de publicar
- A área pública foi pensada com foco forte em mobile
- O Admin foi preparado para facilitar manutenção diária
- A configuração online depende do `config.js`
- Alterações de branding e conteúdo podem ser feitas sem reestruturar a base
- A existência de Supabase não impede o uso do projeto como entrega estática

---

## Licença e uso

Este projeto é protegido por direitos autorais.

Consulte o arquivo `LICENSE` para a política de uso desta base.

---

## Autor

Desenvolvido por **Kayron Magalhães**.  
Todos os direitos reservados.
