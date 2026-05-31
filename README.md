# Cardápio Digital v2.0 - Tobia's Lanches

<div align="center">
  <p>Uma evolução direta da primeira versão do cardápio digital, com navegação pública mais consistente, checkout mais sólido e um painel Admin mais preparado para manutenção diária.</p>
  <p>
    <a href="https://cardapio-digital-tobias-lanches-v2-0.vercel.app/"><b>Ver projeto online</b>
</div>

## Visão geral

O **Cardápio Digital v2.0** é a continuação da primeira versão criada para o Tobia's Lanches. A proposta continua simples: o cliente escolhe os itens, revisa o pedido e envia tudo pelo WhatsApp. O que mudou foi a base do projeto, que ficou mais organizada para entregar uma experiência pública melhor e uma rotina de manutenção mais prática no Admin.

Em relação à versão anterior, a navegação pública ficou mais clara, o carrinho e o checkout ficaram mais consistentes, e a estrutura passou a atender melhor a operação real do estabelecimento. O projeto também foi preparado para funcionar online com Supabase, sem perder a simplicidade de publicação como site estático.

## Resumo rápido

| Área | O que a v2.0 entrega |
| --- | --- |
| Público | Navegação mais limpa, carrinho mais claro e checkout mais consistente |
| Admin | Melhor manutenção de produtos, categorias, adicionais, combos e configurações |
| Operação | Controle de disponibilidade, horários, taxas, Pix e localidades |
| Online | Integração com Supabase por `config.js` |
| Publicação | Estrutura simples para uso local e deploy estático |

## O que mudou em relação à versão anterior

### Interface pública
- Navegação mais organizada entre categorias e produtos
- Leitura mais clara de títulos, descrições e preços
- Área de combos melhor integrada ao restante do cardápio
- Fluxo do carrinho mais estável em desktop e mobile
- Checkout mais bem distribuído para entrega, retirada e consumo no local
- Revisão mais consistente antes do envio para o WhatsApp

### Painel administrativo
- Estrutura mais sólida para editar o catálogo
- Melhor organização entre produtos, categorias, adicionais e combos
- Área de configurações mais alinhada ao uso diário
- Base mais prática para ajustes recorrentes sem mexer no HTML principal

### Operação do estabelecimento
- Controle de disponibilidade de produtos
- Controle de horários de funcionamento
- Configuração de Pix e formas de pagamento
- Configuração de taxas e localidades de entrega
- Estrutura mais preparada para sincronização online

## Recursos novos da v2.0

Além da reorganização visual e estrutural, a v2.0 passou a concentrar recursos que deixam o sistema mais completo no uso real.

### Recursos novos no público

- **Idioma em PT-BR e EN**
  - A interface pública conta com seletor de idioma e estrutura preparada para conteúdo bilíngue.

- **Modo de acessibilidade**
  - O topo da aplicação inclui um modo acessível com leitura reforçada para melhorar a experiência de uso.

- **Combos com destaque próprio**
  - A versão 2.0 ganhou uma área dedicada para combos, com leitura mais clara, indicação de economia e adição direta ao carrinho.

- **Checkout mais completo**
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

- **Gestão mais ampla do catálogo**
  - A manutenção não fica restrita a produtos: a v2.0 organiza também categorias, adicionais, combos e configurações do estabelecimento.

- **Área de Nuvem**
  - O projeto passa a ter uma área específica para operação online, conectando a manutenção diária com a estrutura de sincronização.

- **Relatórios**
  - O painel inclui uma área dedicada para leitura operacional e acompanhamento, ampliando o escopo além do simples cadastro.

- **Imagens preparadas para operação online**
  - A estrutura do projeto já considera bucket de imagens (`product-images`) para publicação e manutenção visual do catálogo.

- **Base mais preparada para publicação recorrente**
  - Em vez de funcionar apenas como uma página estática editada manualmente, a v2.0 foi organizada para suportar manutenção contínua.

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

Essa base mantém o projeto leve, simples de publicar e viável para operação online quando necessário.

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
- para uso simples, basta hospedar os arquivos
- para deploy na Vercel, o projeto já inclui `vercel.json`
- a estrutura atual já está pronta para publicação estática

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

Isso permite reaproveitar a base do projeto sem reconstruir a aplicação.

## Diferença de posicionamento

A primeira versão cumpria bem a função de transformar um cardápio estático em uma experiência clicável com envio por WhatsApp.

A v2.0 amplia essa proposta com:

- interface mais bem resolvida
- fluxo público mais consistente
- melhor adaptação entre desktop e mobile
- suporte a idioma e acessibilidade na experiência pública
- checkout mais completo para entrega, retirada e consumo no local
- localidade de entrega com cálculo e bloqueio por área
- Pix integrado ao fluxo de fechamento do pedido
- combos tratados como parte real da experiência, não como exceção
- Admin mais preparado para manutenção real
- estrutura mais organizada para continuidade do projeto
- suporte mais claro à operação online

Em resumo: a proposta continua simples, mas a execução ficou mais madura.

## Indicação de uso

Esta base é adequada para cenários como:

- quiosques
- lanchonetes
- pequenos negócios de alimentação
- operações que recebem pedidos por WhatsApp
- cardápios digitais com necessidade de manutenção frequente
- publicação rápida de uma solução estática com possibilidade de integração online

## Observações finais

- o projeto continua simples de publicar
- a área pública foi pensada com foco forte em mobile
- o Admin foi preparado para facilitar manutenção diária
- a configuração online depende do `config.js`
- branding e conteúdo podem ser ajustados sem reestruturar a base

## Licença

Este projeto é protegido por direitos autorais.

Consulte o arquivo `LICENSE` para a política de uso desta base.

## Autor

Desenvolvido por **Kayron Magalhães**.  
Todos os direitos reservados.
