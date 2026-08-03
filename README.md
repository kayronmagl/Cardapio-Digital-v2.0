<div align="center">
  <img
    width="100%"
    src="https://capsule-render.vercel.app/api?type=waving&height=115&section=header&color=0:5C5C5C,50:6F6F6F,100:828282&animation=twinkling"
    alt="Cabeçalho"
  />  
</div>

<div align="center">
  <img
    src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=23&duration=2800&pause=1000&color=828282&center=true&vCenter=true&width=720&height=75&lines=Card%C3%A1pio+Digital+v2.0"
    alt="Cardápio Digital v2.0"
  />
</div>

<div align="center">
  <p>
    Conhecça a evolução do Cardápio Digital do Tobia's Lanches!
  </p>

  <p>
    <a href="https://cardapio-digital-tobias-lanches-v2-0.vercel.app/index.html">
      <img src="https://img.shields.io/badge/Projeto_ao_vivo-0D1117?style=for-the-badge&logo=vercel&logoColor=828282" alt="Projeto ao vivo"/>
    </a>
    <a href="LICENSE">
      <img src="https://img.shields.io/badge/Licen%C3%A7a-0D1117?style=for-the-badge&logo=opensourceinitiative&logoColor=828282" alt="Licença"/>
    </a>
  </p>
</div>

<div align="center">
  <img
    width="72%"
    height="1"
    src="https://capsule-render.vercel.app/api?type=rect&height=1&color=0:5C5C5C,50:828282,100:5C5C5C"
    alt=""
  />
</div>

<br>

## Visão Geral

O **Cardápio Digital v2.0** é a evolução do meu projeto de cardápio digital, pensada para entregar uma experiência mais completa tanto para quem faz o pedido quanto para quem administra o catálogo

O sistema é dividido em dois blocos:

* **Área pública:** interface focada em facilitar a navegação do catálogo, seleção de produtos, cálculo de taxas e fechamento do pedido pelo cliente.
* **Painel administrativo:** nova interface de controle focada para o ADM do Tobia's contendo o cadastro de produtos, categorias, adicionais, combos, horários de funcionamento, personalização visual, trocas e adição de imagens, taxas por localidade e formas de pagamento.

O cardápio suporta operação offline por meio de armazenamento local ou sincronização online via integração nativa com o **Supabase**.

<div align="center">
  <img
    width="72%"
    height="1"
    src="https://capsule-render.vercel.app/api?type=rect&height=1&color=0:5C5C5C,50:828282,100:5C5C5C"
    alt=""
  />
</div>

## Arquitetura do projeto

```text
Cliente
│
▼
Frontend (HTML5 / CSS3 / JavaScript)
│
├── Supabase Database (PostgreSQL)
├── Supabase Storage (Imagens de Produtos)
├── Supabase Realtime (Sincronização de Dados)
│
▼
WhatsApp Web / Application API Link

```

<div align="center">
  <img
    width="72%"
    height="1"
    src="https://capsule-render.vercel.app/api?type=rect&height=1&color=0:5C5C5C,50:828282,100:5C5C5C"
    alt=""
  />
</div>

## Recursos

### Área Pública

* Navegação estruturada por categorias.
* Catálogo de produtos e seções de combos.
* Seleção e personalização de adicionais.
* Gerenciamento de estado do carrinho de compras.
* Checkout parametrizado por modalidade de atendimento.
* Exibição estática e dinâmica de chave Pix para pagamento.
* Suporte a internacionalização (PT-BR / EN).
* Camada de acessibilidade nativa.
* Formatação e encaminhamento de payload para o WhatsApp.

### Painel Administrativo

* CRUD de produtos e controle de visibilidade.
* CRUD de categorias do cardápio.
* CRUD de adicionais e vinculação por produto.
* CRUD de combos configuráveis.
* Definição de horários de funcionamento e status da loja.
* Gestão de localidades e taxas de entrega estipuladas.
* Cadastro de formas de pagamento aceitas.
* Emissão de relatórios de operações.
* Configuração e teste de conexão com o Supabase.

<div align="center">
  <img
    width="72%"
    height="1"
    src="https://capsule-render.vercel.app/api?type=rect&height=1&color=0:5C5C5C,50:828282,100:5C5C5C"
    alt=""
  />
</div>

## Funcionalidades

### Área Pública

| Funcionalidade | Descrição Técnica |
| --- | --- |
| **Filtro de Catálogo** | Filtragem de itens em tempo de execução baseada na categoria selecionada. |
| **Visualização de Produto** | Exibição de atributos principais: nome, descrição detalhada, preço unitário e imagem. |
| **Módulo de Combos** | Mapeamento e exibição de agrupamentos de itens configurados via painel. |
| **Gerenciamento de Carrinho** | Adição, remoção e alteração de quantidades com atualização contínua do total. |
| **Opções de Adicionais** | Inclusão de complementos vinculados à estrutura relacional do produto. |
| **Acessibilidade e Idioma** | Alternância de idioma (PT-BR/EN) e aplicação de estilos para alto contraste. |
| **Envio do Pedido** | Redirecionamento estruturado para a API do WhatsApp com o texto do pedido formatado. |

### Carrinho e Checkout

| Módulo | Parâmetros e Operações |
| --- | --- |
| **Resumo Financeiro** | Cálculo do subtotal, aplicação de taxa de entrega e somatório final do pedido. |
| **Tipo de Atendimento** | Seleção entre três modalidades: Entrega (Delivery), Retirada no Local ou Consumo na Mesa. |
| **Logística e Endereço** | Inclusão de logradouro, ponto de referência, número da mesa ou link do Google Maps. |
| **Pagamento Pix** | Renderização da chave Pix cadastrada para cópia direta durante o fluxo do checkout. |
| **Validação de Envio** | Verificação de campos obrigatórios antes da geração do payload do WhatsApp. |

### Painel Administrativo

| Módulo | Escopo de Gestão |
| --- | --- |
| **Gestão de Produtos** | Inserção, edição, exclusão e atribuição de imagens no bucket do Supabase. |
| **Gestão de Categorias** | Ordenação e cadastro das seções que compõem o menu principal. |
| **Gestão de Adicionais** | Configuração de itens extras e associação com a tabela relacional correspondente. |
| **Gestão de Combos** | Definição de pacotes promocionais contendo múltiplos produtos cadastrados. |
| **Configuração de Loja** | Alteração de dados institucionais, status de funcionamento e taxas por bairro/região. |
| **Relatórios** | Consolidação e visualização gráfica de dados operacionais dos pedidos. |

### Descrição dos Arquivos Principais

| Arquivo / Diretório | Função no Sistema |
| --- | --- |
| `index.html` | Ponto de entrada da interface pública do cardápio e checkout. |
| `admin.html` | Ponto de entrada do painel administrativo e telas de gestão. |
| `config.js` | Arquivo contendo os parâmetros de inicialização do cliente Supabase. |
| `assets/` | Diretório de recursos estáticos (logos, favicons e elementos gráficos). |
| `dist/` | Scripts empacotados, módulos JavaScript e arquivos de estilo compilados. |
| `vercel.json` | Arquivo de parametrização de rotas e headers para deploy na Vercel. |

<div align="center">
  <img
    width="72%"
    height="1"
    src="https://capsule-render.vercel.app/api?type=rect&height=1&color=0:5C5C5C,50:828282,100:5C5C5C"
    alt=""
  />
</div>

## Banco de Dados

A persistência de dados no Supabase é baseada nas seguintes tabelas relacionais:

| Tabela | Função | Chave Primária / Relações |
| --- | --- | --- |
| `menu_categories` | Armazena as categorias do catálogo. | `id` |
| `menu_products` | Armazena os produtos e preços. | `id`, Foreign Key `category_id` -> `menu_categories.id` |
| `menu_add_ons` | Armazena os adicionais disponíveis. | `id` |
| `menu_product_add_ons` | Tabela associativa entre produtos e adicionais. | Foreign Key `product_id`, Foreign Key `add_on_id` |
| `menu_settings` | Armazena as configurações globais da aplicação. | `id` |

### Storage

* **Bucket:** `product-images` (Utilizado para armazenamento de imagens de produtos e identificadores visuais do estabelecimento).

<div align="center">
  <img
    width="72%"
    height="1"
    src="https://capsule-render.vercel.app/api?type=rect&height=1&color=0:5C5C5C,50:828282,100:5C5C5C"
    alt=""
  />
</div>

## Modo Online

A integração com serviços externos é gerenciada centralmente pelo arquivo `config.js`.

### Parâmetros do `config.js`

* Habilitação da sincronização remota (`true`/`false`).
* Identificação do provider (`supabase`).
* Configuração de escuta via WebSockets (`realtime`).
* Endpoint da API (`SUPABASE_URL`).
* Chave de acesso público (`SUPABASE_ANON_KEY`).
* Schema do banco de dados (padrão: `public`).
* Mapeamento das tabelas e do bucket de armazenamento.

### Diretrizes de Segurança

| Permitido em `config.js` | Proibido em `config.js` |
| --- | --- |
| URL pública do projeto | Chave de serviço (`service_role`) |
| Chave pública anônima (`anon`) | Credenciais administrativas de banco |
| Nomes das tabelas e buckets | Chaves privadas e segredos de API |

<div align="center">
  <img
    width="72%"
    height="1"
    src="https://capsule-render.vercel.app/api?type=rect&height=1&color=0:5C5C5C,50:828282,100:5C5C5C"
    alt=""
  />
</div>

## Personalização

A aplicação permite parametrização de elementos visuais e operacionais sem alteração do código-fonte principal:

* **Identidade Visual:** substituição dos arquivos de imagem em `assets/` (logo e favicon).
* **Conteúdo do Catálogo:** modificação dos cadastros de categorias, produtos, adicionais e combos via painel.
* **Regras de Negócio:** ajuste de horários de atendimento, taxas de entrega por localidade e formas de pagamento no painel administrativo.

<div align="center">
  <img
    width="72%"
    height="1"
    src="https://capsule-render.vercel.app/api?type=rect&height=1&color=0:5C5C5C,50:828282,100:5C5C5C"
    alt=""
  />
</div>

## Deploy

A aplicação aceita hospedagem em qualquer provedor de conteúdo estático.

* **Vercel:** O arquivo `vercel.json` na raiz do repositório já contém as regras de reescrita e cabeçalhos.
* **Outros Servidores (Netlify, GitHub Pages):** Requer apenas a alocação dos arquivos do repositório no diretório público do servidor.

<div align="center">
  <img
    width="72%"
    height="1"
    src="https://capsule-render.vercel.app/api?type=rect&height=1&color=0:5C5C5C,50:828282,100:5C5C5C"
    alt=""
  />
</div>

## Licença

Este projeto está sujeito aos termos de propriedade intelectual descritos no arquivo LICENSE.
