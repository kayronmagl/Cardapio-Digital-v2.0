(function () {
  const system = window?.TemplateProductSystem;
  const shared = window?.TemplateShared;
  const adminAuthFactory = window?.TemplateAdminAuth;

  if (!system || !shared || !adminAuthFactory) {
    document.body.innerHTML = "Não foi possível carregar o painel.";
    return;
  }

  const LOCALE_KEY = system?.keys?.legacyLocale || "template-cardapio-locale-v2";
  const AUTH_KEYS = {
    passwordHash: "template-cardapio-admin-password-hash-v1",
    session: "template-cardapio-admin-session-v1",
  };
  const ADMIN_MOBILE_BACK_TO_TOP_KEY = "template-cardapio-admin-mobile-back-top-v1";
  const SESSION_DURATION_MS = 30 * 60 * 1000;
  const IMAGE_MAX_BYTES = 1024 * 1024;
  const IMAGE_ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
  const THEME_PRESET_LABEL_KEYS = {
    "tobias-lanches": "themePresetTobiasLanches",
    "dark-premium": "themePresetDarkPremium",
    "light-clean": "themePresetLightClean",
    "burger-red": "themePresetBurgerRed",
    "fresh-green": "themePresetFreshGreen",
    "acai-purple": "themePresetAcaiPurple",
    "coffee-brown": "themePresetCoffeeBrown",
    "ocean-blue": "themePresetOceanBlue",
    "pizza-orange": "themePresetPizzaOrange",
    "bakery-cream": "themePresetBakeryCream",
    "minimal-black": "themePresetMinimalBlack",
    "tropical-yellow": "themePresetTropicalYellow",
    "neutral-gray": "themePresetNeutralGray",
    "pastel-soft": "themePresetPastelSoft",
    "ice-cream-pink": "themePresetIceCreamPink",
    "rustic-wood": "themePresetRusticWood",
    "colorblind-safe": "themePresetColorblindSafe",
    "high-contrast": "themePresetHighContrast",
  };

  const AUTHOR_NAME = "Kayron Magalhães";
  const AUTHOR_URL = "https://www.instagram.com/kayronmagl/";
  const APP_VERSION = "2.0";

  const MESSAGES = {
    "pt-BR": {
      panelKicker: "Painel",
      panelTitle: "Gerenciar cardápio",
      panelSubtitle: "Edite com calma. No modo online, o painel publica automaticamente ao salvar.",
      viewPublic: "Ver cardápio público",
      transitionToPublic: "Voltando ao cardápio...",
      languageLabel: "Idioma",
      logout: "Sair",
      authSetPassword: "Defina sua senha",
      authSignIn: "Entrar no painel",
      authSetDescription: "Escolha uma senha para entrar neste painel neste aparelho.",
      authSignDescription: "Use a mesma senha criada no primeiro acesso deste aparelho.",
      passwordLabel: "Senha",
      passwordConfirm: "Confirmar senha",
      savePassword: "Salvar senha",
      signIn: "Entrar",
      authEmail: "E-mail do Admin",
      authOnlineDescription: "Use o e-mail e a senha autorizados no Supabase Auth. O config.js é apenas a configuração técnica inicial.",
      onlineAccessGranted: "Login do Supabase realizado.",
      onlineSessionExpired: "Sessão do Supabase expirada. Entre novamente.",
      onlineRequired: "Entre com o usuário do Supabase Auth para operar no modo online.",
      passwordMismatch: "As senhas não conferem.",
      passwordTooShort: "Use pelo menos 6 caracteres para a senha.",
      passwordWrong: "Senha incorreta.",
      cryptoUnavailable: "Não foi possível proteger a senha. Abra esta página em HTTPS ou localhost.",
      accessGranted: "Acesso liberado.",
      passwordSaved: "Senha definida com sucesso.",
      sessionExpired: "Sessão expirada. Entre novamente.",
      tabsAria: "Seções do painel",
      tabProducts: "Produtos",
      tabCategories: "Categorias",
      tabAddOns: "Adicionais",
      tabOffers: "Combos",
      tabSettings: "Configurações",
      tabCloud: "Nuvem",
      tabReports: "Relatórios",
      tabSystem: "Ações do sistema",
      productsTitle: "Produtos",
      productsSubtitle: "Busca, filtros, cadastro, status e imagem do produto.",
      productsQuickNav: "Atalhos de produtos",
      searchLabel: "Buscar",
      searchPlaceholder: "Nome, descrição ou tag",
      categoryFilter: "Categoria",
      statusFilter: "Status",
      sortLabel: "Ordenar",
      addProductShortcut: "Adicionar produto",
      searchProductShortcut: "Buscar produto",
      allCategories: "Todas",
      allStatuses: "Todos",
      statusActive: "Ativos",
      statusInactive: "Inativos",
      statusAvailable: "Disponíveis",
      statusUnavailable: "Indisponíveis",
      statusFeatured: "Destaques",
      sortMenuOrder: "Ordem do cardápio",
      sortRecent: "Mais recente",
      sortName: "Nome",
      sortPriceAsc: "Menor preço",
      sortPriceDesc: "Maior preço",
      clearFilters: "Limpar filtros",
      productFormTitle: "Formulário do produto",
      productNamePt: "Nome do produto",
      productNameEn: "Nome em inglês",
      productBasicsSection: "Informações principais",
      productDescriptionsSection: "Descrições e busca",
      productCategory: "Categoria",
      productPrice: "Preço",
      productDescriptionPt: "Descrição curta",
      productDescriptionEn: "Descrição curta em inglês",
      productLongDescriptionPt: "Descrição longa",
      productLongDescriptionEn: "Descrição longa em inglês",
      productTags: "Palavras-chave de busca",
      productPrepTime: "Tempo de preparo (min)",
      productStatus: "Ativo: aparece no cardápio",
      productAvailability: "Disponível: pode ser comprado",
      featuredProduct: "Marcar como destaque",
      productImages: "Imagem do produto",
      productImagesHelp: "A imagem será exibida no cardápio.",
      primaryImage: "Imagem atual",
      imageGallery: "Pré-visualização",
      chooseImage: "Escolher imagem",
      removeImage: "Remover imagem",
      pasteImageLink: "Colar link da imagem",
      imageLinkLabel: "Link da imagem",
      imageLinkPlaceholder: "https://exemplo.com/imagem.jpg",
      imageFormatsHelp: "Use JPG, PNG ou WebP.",
      imageTooLarge: "A imagem é muito grande. Use uma imagem menor.",
      imageInvalidType: "Escolha uma imagem JPG, PNG ou WebP.",
      imageFileError: "Não foi possível ler a imagem escolhida.",
      imageUploadPublishError: "A imagem não foi enviada. O produto pode ser publicado sem imagem, mas revise o armazenamento de imagens no Supabase.",
      noImageSelected: "Nenhuma imagem escolhida.",
      productImagePublishHelp: "No modo online, a imagem será enviada quando você publicar.",
      addOnsTitle: "Adicionais",
      saveProduct: "Salvar produto",
      createProduct: "Criar produto",
      cancelEdit: "Cancelar",
      active: "Ativo",
      inactive: "Inativo",
      unavailable: "Indisponível",
      featured: "Destaque",
      productListTitle: "Lista de produtos",
      noProducts: "Nenhum produto encontrado.",
      edit: "Editar",
      delete: "Excluir",
      deactivate: "Desativar",
      activate: "Ativar",
      categoriesTitle: "Categorias",
      categoriesSubtitle: "Organize o cardápio por grupos. Se deixar o código vazio, ele será criado pelo sistema.",
      categoryFormTitle: "Formulário da categoria",
      categorySlug: "Código da categoria (opcional)",
      categoryNamePt: "Nome da categoria",
      categoryNameEn: "Nome em inglês",
      categoryDescriptionPt: "Descrição",
      categoryDescriptionEn: "Descrição em inglês",
      saveCategory: "Salvar categoria",
      createCategory: "Criar categoria",
      noCategories: "Nenhuma categoria cadastrada.",
      categoryProducts: "{{count}} produtos",
      addOnsSubtitle: "Cadastre adicionais usados nos produtos e mantenha os preços organizados.",
      addOnFormTitle: "Formulário do adicional",
      addOnId: "Código do adicional (opcional)",
      addOnNamePt: "Nome do adicional",
      addOnNameEn: "Nome em inglês",
      addOnPrice: "Preço do adicional",
      addOnEnabled: "Adicional ativo",
      saveAddOn: "Salvar adicional",
      createAddOn: "Criar adicional",
      noAddOns: "Nenhum adicional cadastrado.",
      addOnListTitle: "Lista de adicionais",
      addOnSaved: "Adicional salvo.",
      addOnCreated: "Adicional criado.",
      addOnDeleted: "Adicional excluído.",
      offersTitle: "Combos",
      offersSubtitle: "Crie combos usando produtos que já existem no cardápio.",
      comboFormTitle: "Criar ou editar combo",
      comboListTitle: "Combos",
      offerNamePt: "Nome em português",
      offerNameEn: "Nome em inglês (opcional)",
      offerCode: "Identificação interna (opcional)",
      offerDescriptionPt: "Descrição em português",
      offerDescriptionEn: "Descrição em inglês (opcional)",
      offerImageUrl: "Imagem opcional",
      offerImageHelp: "Se não tiver imagem, pode deixar vazio.",
      comboPrice: "Preço final que o cliente vai pagar",
      comboProducts: "Escolha os produtos do combo",
      comboProductQuantity: "Qtd.",
      comboProductSearch: "Buscar produto",
      comboProductSearchPlaceholder: "Digite o nome do produto",
      comboProductCategory: "Categoria",
      comboProductView: "Ver produtos",
      comboProductViewAll: "Todos",
      comboProductViewSelected: "Selecionados",
      comboProductSelectedOnly: "Selecionados",
      comboProductAvailableOnly: "Somente ativos",
      comboSelectedCountOne: "{{count}} produto selecionado",
      comboSelectedCountOther: "{{count}} produtos selecionados",
      comboSelectedGroup: "Produtos selecionados",
      comboAvailableGroup: "Produtos disponíveis",
      comboNoProductsFound: "Nenhum produto encontrado com estes filtros.",
      comboNoSelectedProducts: "Nenhum produto selecionado.",
      comboClearSelection: "Limpar seleção",
      comboShowSelected: "Mostrar selecionados",
      comboShowAllProducts: "Mostrar todos",
      comboSelectCategory: "Adicionar categoria ao combo",
      comboUncategorized: "Sem categoria",
      comboActive: "Mostrar combo no cardápio",
      saveCombo: "Salvar combo",
      createCombo: "Criar combo",
      noCombos: "Nenhum combo cadastrado.",
      comboFormHelp: "Combo é um pacote de produtos vendido por um preço único.",
      advancedOfferSettings: "Avançado",
      advancedOfferSettingsHelp: "Normalmente você pode deixar vazio. O sistema cria esse código sozinho.",
      comboSaved: "Combo salvo.",
      comboCreated: "Combo criado.",
      comboDeleted: "Combo excluído.",
      offerNameRequired: "Informe o nome da oferta.",
      comboProductsRequired: "Escolha pelo menos um produto para montar o combo.",
      comboPriceRequired: "Informe quanto o cliente vai pagar pelo combo.",
      offerUnavailableWarning: "Este combo tem produto oculto ou indisponível. Ele não aparece para compra até corrigir.",
      includedProducts: "Inclui: {{value}}",
      productSyncPending: "Há atualizações disponíveis. Salve ou descarte o produto atual antes de sincronizar.",
      adminSyncPending: "Há atualizações disponíveis. Salve ou cancele a edição atual antes de sincronizar.",
      adminSyncApplied: "Atualização pendente aplicada.",
      settingsTitle: "Configurações",
      settingsSubtitle: "Use os atalhos para encontrar rapidamente estabelecimento, operação, localização, aparência e horários.",
      settingsQuickNav: "Atalhos de configuração",
      settingsQuickBrand: "Estabelecimento",
      settingsQuickOperation: "Operação",
      settingsQuickLocation: "Localização",
      settingsQuickAppearance: "Aparência",
      settingsQuickHours: "Horários",
      settingsUnsavedChanges: "Alterações não salvas",
      settingsSaveBarClean: "Revise os campos e salve ao terminar.",
      settingsSaveBarDirty: "Há alterações não salvas.",
      settingsGroupOrders: "Pedidos",
      settingsGroupDelivery: "Entrega",
      settingsGroupPix: "Pix",
      settingsGroupLanguage: "Idioma",
      settingsLocationAdvanced: "Opções avançadas de mapa",
      settingsLocationAdvancedHelp: "Use apenas se quiser informar link do Google Maps ou coordenadas.",
      brandNamePt: "Nome do estabelecimento",
      brandNameEn: "Nome do estabelecimento — EN",
      brandNamePtPlaceholder: "Nome do seu negócio",
      brandNameEnPlaceholder: "Your business name",
      brandSubtitlePt: "Subtítulo do cardápio",
      brandSubtitleEn: "Subtítulo do cardápio — EN",
      brandSubtitlePtPlaceholder: "Lanches, bebidas e sobremesas",
      brandSubtitleEnPlaceholder: "Snacks, drinks and desserts",
      footerNotePt: "Mensagem do rodapé",
      footerNoteEn: "Mensagem do rodapé — EN",
      footerNotePtPlaceholder: "Obrigado pela preferência.",
      footerNoteEnPlaceholder: "Thanks for choosing us.",
      brandImage: "Imagem da marca",
      brandImageHelp: "A imagem será exibida no painel e no cardápio deste aparelho.",
      destaqueChamadaPt: "Chamada curta do topo",
      destaqueChamadaEn: "Chamada curta do topo em inglês",
      destaqueTituloPt: "Título principal do topo",
      destaqueTituloEn: "Título do topo em inglês",
      destaqueSubtituloPt: "Mensagem de destaque",
      destaqueSubtituloEn: "Mensagem de destaque — EN",
      destaqueSubtituloPtPlaceholder: "Escolha os produtos, revise o carrinho e envie a mensagem para o estabelecimento",
      destaqueSubtituloEnPlaceholder: "Choose your items, review the cart, and send the message to the business",
      destaqueSelosPt: "Selos do topo",
      destaqueSelosEn: "Selos do topo em inglês",
      destaqueSelosHelp: "Use um selo por linha.",
      waitingTimePt: "Tempo médio",
      waitingTimeEn: "Waiting time in English",
      waitingLabelPt: "Meta de tempo",
      waitingLabelEn: "Time meta in English",
      paymentLabelPt: "Meta de pagamento",
      paymentLabelEn: "Payment meta in English",
      sectionBrand: "Estabelecimento",
      sectionBrandHelp: "Nome, subtítulo e mensagem final exibidos no cardápio.",
      sectionDestaqueInicial: "Destaque inicial",
      sectionDestaqueInicialHelp: "Mensagem principal do topo do cardápio, incluindo chamada, texto e selos.",
      sectionOperation: "Operação",
      sectionOperationHelp: "WhatsApp, entrega, Pix e idioma padrão usados no pedido.",
      sectionLocation: "Localização",
      sectionLocationHelp: "Endereço e rota simples. Cole um link do Google Maps ou use coordenadas opcionais.",
      sectionAppearance: "Aparência",
      sectionAppearanceHelp: "Teste uma prévia visual; salve as configurações para aplicar no cardápio público.",
      whatsappNumber: "WhatsApp do pedido",
      pickupAddress: "Endereço de retirada",
      pickupAddressPlaceholder: "Rua Exemplo, 123",
      locationDistrict: "Bairro",
      locationDistrictPlaceholder: "Centro",
      locationCity: "Cidade",
      locationCityPlaceholder: "Ereré",
      locationState: "Estado/UF",
      locationStatePlaceholder: "CE",
      locationMapsUrl: "Link do Google Maps",
      locationMapsUrlPlaceholder: "https://maps.app.goo.gl/...",
      locationMapsHelp: "Abra seu estabelecimento no Google Maps, toque em Compartilhar e cole o link aqui. Esse link será usado no botão Ver rota.",
      locationLatitude: "Latitude (opcional)",
      locationLongitude: "Longitude (opcional)",
      locationLatitudePlaceholder: "-6.025839",
      locationLongitudePlaceholder: "-38.348820",
      locationCoordinatesHelp: "Opcional. Use apenas se não tiver um link do Google Maps. Informe latitude e longitude.",
      pickupNote: "Observação de retirada (opcional)",
      pickupNotePlaceholder: "Ex.: retire no balcão principal.",
      baseFee: "Taxa base de entrega",
      cityLabelPt: "Endereço ou região de atendimento",
      cityLabelEn: "Endereço ou região de atendimento — EN",
      cityLabelPtPlaceholder: "Rua, bairro ou cidade de atendimento",
      cityLabelEnPlaceholder: "Street, neighborhood or service city",
      deliveryLocationsTitle: "Localidades de entrega",
      deliveryLocationsHelp: "Cadastre bairros, zonas ou regiões atendidas. Cada localidade pode ter taxa fixa ou taxa a combinar.",
      settingsQuickDeliveryLocations: "Localidades de entrega",
      addDeliveryLocation: "Adicionar localidade",
      noDeliveryLocations: "Nenhuma localidade cadastrada.",
      deliveryLocationNamePt: "Nome PT-BR",
      deliveryLocationNameEn: "Nome EN",
      deliveryLocationId: "Código da localidade (opcional)",
      deliveryLocationActive: "Localidade ativa: aparece na finalização do pedido",
      deliveryLocationFeeMode: "Tipo de taxa",
      deliveryLocationFeeFixed: "Taxa fixa",
      deliveryLocationFeeCustom: "Taxa a combinar",
      deliveryLocationFee: "Taxa de entrega",
      deliveryLocationNotePt: "Observação PT-BR",
      deliveryLocationNoteEn: "Observação EN",
      deliveryLocationNotePlaceholder: "Ex.: Taxa a combinar pelo WhatsApp",
      deleteDeliveryLocation: "Excluir localidade",
      deliveryLocationRequired: "Informe o nome da localidade.",
      deliveryLocationFeeInvalid: "A taxa fixa da localidade deve ser zero ou maior.",
      pixKey: "Chave Pix",
      pixOwnerPt: "Titular do Pix",
      pixOwnerEn: "Pix owner in English",
      pixBankPt: "Banco",
      pixBankEn: "Bank in English",
      defaultLocale: "Idioma padrão",
      theme: "Tema",
      palette: "Paleta",
      themePreset: "Tema do cardápio",
      themePresetHelp: "Clique em um tema para pré-visualizar no Admin. Salve as configurações para aplicar no cardápio público.",
      themePresetTechnical: "A prévia não publica alterações. O tema muda apenas cores visuais; produtos, carrinho, WhatsApp e Pix continuam iguais.",
      themePresetTobiasLanches: "Tobia's Lanches",
      themePresetDarkPremium: "Dark Premium",
      themePresetLightClean: "Light Clean",
      themePresetBurgerRed: "Burger Red",
      themePresetFreshGreen: "Fresh Green",
      themePresetAcaiPurple: "Açaí Purple",
      themePresetCoffeeBrown: "Coffee Brown",
      themePresetOceanBlue: "Ocean Blue",
      themePresetPizzaOrange: "Pizza Orange",
      themePresetBakeryCream: "Bakery Cream",
      themePresetMinimalBlack: "Minimal Black",
      themePresetTropicalYellow: "Tropical Yellow",
      themePresetNeutralGray: "Neutral Gray",
      themePresetPastelSoft: "Pastel Soft",
      themePresetIceCreamPink: "Ice Cream Pink",
      themePresetRusticWood: "Rustic Wood",
      themePresetColorblindSafe: "Colorblind Safe",
      themePresetHighContrast: "High Contrast",
      themeApplied: "Aplicado",
      themePreview: "Prévia",
      themeSaveToApply: "Salve para aplicar",
      themePreviewActiveNotice: "Prévia ativa — ainda não foi salva. Salve as configurações para aplicar ao cardápio público.",
      themePreviewProductName: "Produto",
      themePreviewBadge: "Novo",
      themePreviewAction: "Adicionar",
      light: "Claro",
      dark: "Escuro",
      blue: "Azul",
      green: "Verde",
      red: "Vermelho",
      orange: "Laranja",
      hoursTitle: "Horários de funcionamento",
      respectSchedule: "Respeitar horário de funcionamento",
      openTime: "Abre",
      closeTime: "Fecha",
      scheduleOpenStatus: "Aberto",
      scheduleClosedStatus: "Fechado",
      scheduleHelp: "Marque os dias abertos e ajuste Abre/Fecha. Ao desmarcar um dia, ele fica fechado.",
      saveSettings: "Salvar configurações",
      backToSettingsTop: "Voltar ao topo",
      cloudTitle: "Publicação online (Supabase)",
      cloudSubtitle: "Use esta área para republicar tudo, carregar dados já publicados e testar o modo online.",
      cloudUrl: "URL do projeto",
      cloudAnonKey: "Anon key",
      cloudSchema: "Área do banco (normalmente public)",
      cloudCategories: "Tabela categorias",
      cloudAddOns: "Tabela adicionais",
      cloudProducts: "Tabela produtos",
      cloudProductAddOns: "Tabela produto_adicionais",
      cloudEnabled: "Modo online ativo",
      cloudRealtime: "Atualização automática (Realtime)",
      autoReconnect: "Checagem periódica opcional",
      reconnectInterval: "Intervalo de checagem (ms)",
      saveCloud: "Salvar configuração",
      checkConnection: "Testar conexão",
      migrateToCloud: "Publicar alterações online",
      syncToLocal: "Carregar dados online",
      cloudPublishHelp: "Republica o cardápio online inteiro usando o estado atual do painel.",
      cloudLoadHelp: "Carrega no painel os dados que já estão publicados online.",
      cloudCheckHelp: "Verifica se o modo online está configurado corretamente.",
      cloudAdvancedTitle: "Opções avançadas",
      cloudAdvancedHelp: "Use esta área apenas na instalação inicial ou quando precisar revisar a configuração.",
      cloudStatus: "Status da conexão",
      lastCheck: "Última verificação",
      lastError: "Último erro",
      cloudConnected: "Conectado",
      cloudDisabled: "Desativado",
      cloudError: "Erro",
      reportsTitle: "Relatórios",
      reportsSubtitle: "Acompanhe ações confirmadas no cardápio: visualizações, carrinho, finalização e escolhas do cliente.",
      reportsOnlineLoading: "Carregando métricas online...",
      reportsOnlineActive: "Dados online carregados do Supabase.",
      reportsOnlineFallback: "Não foi possível carregar as métricas online. Mostrando dados locais deste navegador.",
      reportsLocalOnly: "Modo local: mostrando dados deste navegador.",
      reportClearOnlineWarning: "Dados locais limpos. Não foi possível limpar as métricas online.",
      totalProducts: "Produtos cadastrados",
      totalCategories: "Categorias cadastradas",
      totalAddOns: "Adicionais cadastrados",
      systemHealth: "Conferência dos dados",
      healthy: "Sem problemas",
      corrupted: "Com inconsistência",
      productsSeen: "Produtos vistos",
      productsSeenHelp: "vezes que produtos apareceram",
      productsAdded: "Adicionados ao carrinho",
      productsAddedHelp: "cliques confirmados em adicionar",
      checkoutOpened: "Checkouts abertos",
      checkoutOpenedHelp: "carrinhos com item abertos para finalizar",
      ordersPrepared: "Pedidos preparados",
      ordersPreparedHelp: "pedidos revisados antes do envio",
      topAdded: "Produtos mais adicionados ao carrinho",
      topViewed: "Produtos mais visualizados",
      paymentChoices: "Pagamento escolhido",
      serviceChoices: "Atendimento escolhido",
      searchNoResults: "Buscas sem resultado",
      reportSetupTitle: "Ajustes necessários",
      noMetrics: "Nada registrado ainda.",
      noSetupIssues: "Nenhum ajuste essencial encontrado.",
      noSearchNoResults: "Nenhuma busca sem resultado registrada.",
      reportCountOne: "{{count}} vez",
      reportCountOther: "{{count}} vezes",
      serviceChoiceDelivery: "Entrega",
      serviceChoicePickup: "Retirada",
      serviceChoiceDineIn: "No local",
      paymentMethodPix: "Pix",
      paymentMethodCard: "Cartão",
      paymentMethodCash: "Dinheiro",
      reportIssueNoActiveProducts: "Não há produto ativo para o cliente escolher.",
      reportIssueProductNoPrice: "Há produto ativo sem preço válido.",
      exportReport: "Baixar dados do relatório",
      clearMetrics: "Limpar dados do relatório",
      issuesDetected: "Problemas detectados",
      noIssues: "Nenhuma inconsistência crítica detectada.",
      systemTitle: "Ações do sistema",
      systemSubtitle: "Baixe backup, restaure dados ou limpe este aparelho com segurança.",
      adminAboutAria: "Sobre o sistema",
      adminAboutProduct: "Cardápio Digital",
      adminAboutCreditPrefix: "Sistema desenvolvido por",
      adminAboutVersion: "Versão {{version}}",
      backupSystem: "Backup completo do sistema",
      restoreBackup: "Restaurar backup",
      resetSystem: "Limpar dados deste aparelho",
      sanitizeSystem: "Corrigir dados locais",
      backupSystemHelp: "Baixe uma cópia completa antes de mudanças importantes.",
      restoreBackupHelp: "Importe um backup salvo anteriormente.",
      resetSystemHelp: "Baixa uma cópia e depois restaura a base limpa neste aparelho.",
      sanitizeSystemHelp: "Corrige duplicações e inconsistências simples nos dados locais.",
      systemActionsAria: "Ações de backup e manutenção",
      backToProductsTop: "Voltar ao topo dos produtos",
      resetWarning: "Limpar os dados do cardápio neste aparelho? Uma cópia de segurança será baixada antes.",
      deleteWarning: "Excluir '{{name}}'?",
      deleteCategoryWarning: "Excluir a categoria '{{name}}'? Produtos ligados serão movidos para a primeira categoria restante.",
      keepAtLeastOneCategory: "É preciso manter pelo menos uma categoria.",
      productSaved: "Produto salvo no painel.",
      productCreated: "Produto criado no painel.",
      productDeleted: "Produto excluído.",
      productStatusUpdated: "Status do produto atualizado.",
      categorySaved: "Categoria salva no painel.",
      categoryCreated: "Categoria criada no painel.",
      categoryDeleted: "Categoria excluída.",
      settingsSaved: "Configurações salvas no painel.",
      cloudSaved: "Ajustes online salvos no painel.",
      cloudLoading: "Carregando dados online...",
      cloudLoaded: "Dados online carregados no painel.",
      cloudPublishing: "Publicando alterações online...",
      cloudPublished: "Alterações publicadas no cardápio online.",
      cloudPublishedWithImageWarning: "Alterações publicadas no cardápio online. Algumas imagens não foram enviadas; revise o armazenamento de imagens.",
      cloudConnectionOk: "Conexão online verificada.",
      cloudConnectionError: "Não foi possível confirmar a conexão online. Verifique o Supabase.",
      cloudSettingsSaveError: "Não foi possível salvar os ajustes online. Verifique sua permissão no Supabase.",
      cloudSyncDone: "Dados online carregados no painel.",
      cloudMigrationDone: "Alterações publicadas no cardápio online.",
      cloudMigrationRealtimeDone: "Alterações publicadas no cardápio online.",
      cloudLoadError: "Não foi possível carregar os dados online.",
      cloudPublishError: "Não foi possível publicar as alterações. Verifique a conexão com o Supabase.",
      authInvalidCredentials: "E-mail ou senha incorretos.",
      onlineConnectionFriendly: "Não foi possível conectar ao modo online. Verifique a configuração da nuvem.",
      editCanceled: "Edição cancelada.",
      draftPreserved: "Rascunho preservado.",
      unsavedChanges: "Alterações não salvas.",
      backupDownloaded: "Backup exportado.",
      backupRestored: "Backup restaurado.",
      systemSanitized: "Dados locais conferidos e corrigidos.",
      systemResetDone: "Cardápio restaurado para a base limpa.",
      metricsCleared: "Métricas limpas.",
      reportExported: "Relatório exportado.",
      requiredField: "Preencha os campos obrigatórios.",
      invalidPrice: "Informe um preço válido.",
      productNameRequired: "Informe o nome do produto.",
      productCategoryRequired: "Selecione uma categoria.",
      productPriceRequired: "Informe um preço válido.",
      categoryNameRequired: "Informe o nome da categoria.",
      addOnNameRequired: "Informe o nome do adicional.",
      addOnPriceRequired: "Informe um preço válido para o adicional.",
      invalidCloudInterval: "Informe um intervalo de reconexão válido.",
      invalidBackup: "Não foi possível ler o backup. Escolha um arquivo válido.",
      uploadRestoreLabel: "Selecionar backup",
      realTimeMode: "Checagem opcional de conexão",
      localFallbackMode: "Fallback local pronto",
      yes: "Sim",
      no: "Não",
      daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
      daysLong: ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
    },
    "en-US": {
      panelKicker: "Panel",
      panelTitle: "Manage menu",
      panelSubtitle: "Edit calmly. In online mode, the panel publishes automatically when you save.",
      viewPublic: "View public menu",
      transitionToPublic: "Returning to menu...",
      languageLabel: "Language",
      logout: "Sign out",
      authSetPassword: "Set your password",
      authSignIn: "Sign in",
      authSetDescription: "Choose a password to open this panel on this device.",
      authSignDescription: "Use the same password created on the first access on this device.",
      passwordLabel: "Password",
      passwordConfirm: "Confirm password",
      savePassword: "Save password",
      signIn: "Sign in",
      authEmail: "Admin email",
      authOnlineDescription: "Use the authorized Supabase Auth email and password. config.js is only the initial technical setup.",
      onlineAccessGranted: "Supabase login successful.",
      onlineSessionExpired: "Supabase session expired. Sign in again.",
      onlineRequired: "Sign in with a Supabase Auth user to operate in online mode.",
      passwordMismatch: "Passwords do not match.",
      passwordTooShort: "Use at least 6 characters for the password.",
      passwordWrong: "Wrong password.",
      cryptoUnavailable: "Could not protect the password. Open this page over HTTPS or localhost.",
      accessGranted: "Access granted.",
      passwordSaved: "Password saved successfully.",
      sessionExpired: "Session expired. Sign in again.",
      tabsAria: "Admin sections",
      tabProducts: "Products",
      tabCategories: "Categories",
      tabAddOns: "Add-ons",
      tabOffers: "Combos",
      tabSettings: "Settings",
      tabCloud: "Cloud",
      tabReports: "Reports",
      tabSystem: "System actions",
      productsTitle: "Products",
      productsSubtitle: "Search, filters, product form, status, and product image.",
      productsQuickNav: "Product shortcuts",
      searchLabel: "Search",
      searchPlaceholder: "Name, description, or tag",
      categoryFilter: "Category",
      statusFilter: "Status",
      sortLabel: "Sort",
      addProductShortcut: "Add product",
      searchProductShortcut: "Search product",
      allCategories: "All",
      allStatuses: "All",
      statusActive: "Active",
      statusInactive: "Inactive",
      statusAvailable: "Available",
      statusUnavailable: "Unavailable",
      statusFeatured: "Featured",
      sortMenuOrder: "Menu order",
      sortRecent: "Most recent",
      sortName: "Name",
      sortPriceAsc: "Lowest price",
      sortPriceDesc: "Highest price",
      clearFilters: "Clear filters",
      productFormTitle: "Product form",
      productNamePt: "Product name",
      productNameEn: "Name in English",
      productBasicsSection: "Main information",
      productDescriptionsSection: "Descriptions and search",
      productCategory: "Category",
      productPrice: "Price",
      productDescriptionPt: "Short description",
      productDescriptionEn: "Short description in English",
      productLongDescriptionPt: "Long description",
      productLongDescriptionEn: "Long description in English",
      productTags: "Search keywords",
      productPrepTime: "Prep time (min)",
      productStatus: "Active: appears in the menu",
      productAvailability: "Available: can be purchased",
      featuredProduct: "Mark as featured",
      productImages: "Product image",
      productImagesHelp: "The image will appear in the menu.",
      primaryImage: "Current image",
      imageGallery: "Preview",
      chooseImage: "Choose image",
      removeImage: "Remove image",
      pasteImageLink: "Paste image link",
      imageLinkLabel: "Image link",
      imageLinkPlaceholder: "https://example.com/image.jpg",
      imageFormatsHelp: "Use JPG, PNG, or WebP.",
      imageTooLarge: "The image is too large. Use a smaller image.",
      imageInvalidType: "Choose a JPG, PNG, or WebP image.",
      imageFileError: "The selected image could not be read.",
      imageUploadPublishError: "The image was not uploaded. The product may publish without an image, but review image storage in Supabase.",
      noImageSelected: "No image selected yet.",
      productImagePublishHelp: "In online mode, the image is uploaded when you publish.",
      addOnsTitle: "Add-ons",
      saveProduct: "Save product",
      createProduct: "Create product",
      cancelEdit: "Cancel",
      active: "Active",
      inactive: "Inactive",
      unavailable: "Unavailable",
      featured: "Featured",
      productListTitle: "Product list",
      noProducts: "No products found.",
      edit: "Edit",
      delete: "Delete",
      deactivate: "Deactivate",
      activate: "Activate",
      categoriesTitle: "Categories",
      categoriesSubtitle: "Organize the menu into groups. If the code is left blank, the system creates it.",
      categoryFormTitle: "Category form",
      categorySlug: "Category code (optional)",
      categoryNamePt: "Category name",
      categoryNameEn: "Name in English",
      categoryDescriptionPt: "Description",
      categoryDescriptionEn: "Description in English",
      saveCategory: "Save category",
      createCategory: "Create category",
      noCategories: "No categories registered.",
      categoryProducts: "{{count}} products",
      addOnsSubtitle: "Create add-ons used by products and keep the pricing organized.",
      addOnFormTitle: "Add-on form",
      addOnId: "Add-on code (optional)",
      addOnNamePt: "Add-on name — PT-BR",
      addOnNameEn: "Add-on name",
      addOnPrice: "Add-on price",
      addOnEnabled: "Active add-on",
      saveAddOn: "Save add-on",
      createAddOn: "Create add-on",
      noAddOns: "No add-ons found.",
      addOnListTitle: "Add-ons list",
      addOnSaved: "Add-on saved.",
      addOnCreated: "Add-on created.",
      addOnDeleted: "Add-on deleted.",
      offersTitle: "Combos",
      offersSubtitle: "Create combos using products that already exist on the menu.",
      comboFormTitle: "Create or edit combo",
      comboListTitle: "Combos",
      offerNamePt: "Name in Portuguese",
      offerNameEn: "Name in English (optional)",
      offerCode: "Internal ID (optional)",
      offerDescriptionPt: "Description in Portuguese",
      offerDescriptionEn: "Description in English (optional)",
      offerImageUrl: "Optional image",
      offerImageHelp: "If you do not have an image, you can leave this blank.",
      comboPrice: "Final price the customer will pay",
      comboProducts: "Choose combo products",
      comboProductQuantity: "Qty.",
      comboProductSearch: "Search product",
      comboProductSearchPlaceholder: "Type the product name",
      comboProductCategory: "Category",
      comboProductView: "View products",
      comboProductViewAll: "All",
      comboProductViewSelected: "Selected",
      comboProductSelectedOnly: "Selected",
      comboProductAvailableOnly: "Active only",
      comboSelectedCountOne: "{{count}} product selected",
      comboSelectedCountOther: "{{count}} products selected",
      comboSelectedGroup: "Selected products",
      comboAvailableGroup: "Available products",
      comboNoProductsFound: "No products found with these filters.",
      comboNoSelectedProducts: "No selected products.",
      comboClearSelection: "Clear selection",
      comboShowSelected: "Show selected",
      comboShowAllProducts: "Show all",
      comboSelectCategory: "Add category to combo",
      comboUncategorized: "Uncategorized",
      comboActive: "Show combo on the menu",
      saveCombo: "Save combo",
      createCombo: "Create combo",
      noCombos: "No combos registered.",
      comboFormHelp: "A combo is a group of products sold for one price.",
      advancedOfferSettings: "Advanced",
      advancedOfferSettingsHelp: "You can usually leave this blank. The system creates this code automatically.",
      comboSaved: "Combo saved.",
      comboCreated: "Combo created.",
      comboDeleted: "Combo deleted.",
      offerNameRequired: "Enter the offer name.",
      comboProductsRequired: "Choose at least one product to build the combo.",
      comboPriceRequired: "Enter how much the customer will pay for the combo.",
      offerUnavailableWarning: "This combo has a hidden or unavailable product. It will not appear for purchase until fixed.",
      includedProducts: "Includes: {{value}}",
      productSyncPending: "Updates are available. Save or discard the current product before syncing.",
      adminSyncPending: "Updates are available. Save or cancel the current edit before syncing.",
      adminSyncApplied: "Pending update applied.",
      settingsTitle: "Settings",
      settingsSubtitle: "Use the shortcuts to quickly find business details, operation, location, appearance, and opening hours.",
      settingsQuickNav: "Settings shortcuts",
      settingsQuickBrand: "Business",
      settingsQuickOperation: "Operation",
      settingsQuickLocation: "Location",
      settingsQuickAppearance: "Appearance",
      settingsQuickHours: "Opening hours",
      settingsUnsavedChanges: "Unsaved changes",
      settingsSaveBarClean: "Review the fields and save when finished.",
      settingsSaveBarDirty: "There are unsaved changes.",
      settingsGroupOrders: "Orders",
      settingsGroupDelivery: "Delivery",
      settingsGroupPix: "Pix",
      settingsGroupLanguage: "Language",
      settingsLocationAdvanced: "Advanced map options",
      settingsLocationAdvancedHelp: "Use only if you want to enter a Google Maps link or coordinates.",
      brandNamePt: "Business name — PT-BR",
      brandNameEn: "Business name",
      brandNamePtPlaceholder: "Nome do seu negócio",
      brandNameEnPlaceholder: "Your business name",
      brandSubtitlePt: "Menu subtitle — PT-BR",
      brandSubtitleEn: "Menu subtitle",
      brandSubtitlePtPlaceholder: "Lanches, bebidas e sobremesas",
      brandSubtitleEnPlaceholder: "Snacks, drinks and desserts",
      footerNotePt: "Footer message — PT-BR",
      footerNoteEn: "Footer message",
      footerNotePtPlaceholder: "Obrigado pela preferência.",
      footerNoteEnPlaceholder: "Thanks for choosing us.",
      brandImage: "Brand image",
      brandImageHelp: "The image appears at the top of the menu and in the panel.",
      destaqueChamadaPt: "Top short label",
      destaqueChamadaEn: "Top short label in English",
      destaqueTituloPt: "Main top title",
      destaqueTituloEn: "Top title in English",
      destaqueSubtituloPt: "Highlight message — PT-BR",
      destaqueSubtituloEn: "Highlight message",
      destaqueSubtituloPtPlaceholder: "Escolha os produtos, revise o carrinho e envie a mensagem para o estabelecimento",
      destaqueSubtituloEnPlaceholder: "Choose your items, review the cart, and send the message to the business",
      destaqueSelosPt: "Top badges",
      destaqueSelosEn: "Top badges in English",
      destaqueSelosHelp: "Use one badge per line.",
      waitingTimePt: "Average order time in PT-BR",
      waitingTimeEn: "Average order time",
      waitingLabelPt: "Top time text in PT-BR",
      waitingLabelEn: "Top time text",
      paymentLabelPt: "Top payment text in PT-BR",
      paymentLabelEn: "Top payment text",
      sectionBrand: "Business details",
      sectionBrandHelp: "Business name, subtitle, and footer message shown in the menu.",
      sectionDestaqueInicial: "Top highlight",
      sectionDestaqueInicialHelp: "Main message shown at the top of the menu, including headline, text, and badges.",
      sectionOperation: "Operations",
      sectionOperationHelp: "WhatsApp, delivery, Pix, and default language used in orders.",
      sectionLocation: "Location",
      sectionLocationHelp: "Simple address and route. Paste a Google Maps link or use optional coordinates.",
      sectionAppearance: "Appearance",
      sectionAppearanceHelp: "Test a visual preview; save the settings to apply it to the public menu.",
      whatsappNumber: "Order WhatsApp",
      pickupAddress: "Pickup address",
      pickupAddressPlaceholder: "Example Street, 123",
      locationDistrict: "District",
      locationDistrictPlaceholder: "Downtown",
      locationCity: "City",
      locationCityPlaceholder: "City",
      locationState: "State",
      locationStatePlaceholder: "ST",
      locationMapsUrl: "Google Maps link",
      locationMapsUrlPlaceholder: "https://maps.app.goo.gl/...",
      locationMapsHelp: "Open your business on Google Maps, tap Share, and paste the link here. This link will be used in the Get directions button.",
      locationLatitude: "Latitude (optional)",
      locationLongitude: "Longitude (optional)",
      locationLatitudePlaceholder: "-6.025839",
      locationLongitudePlaceholder: "-38.348820",
      locationCoordinatesHelp: "Optional. Use only if you do not have a Google Maps link. Enter latitude and longitude.",
      pickupNote: "Pickup note (optional)",
      pickupNotePlaceholder: "Ex.: pick up at the main counter.",
      baseFee: "Base delivery fee (without area)",
      cityLabelPt: "Service area in PT-BR",
      cityLabelEn: "Service area",
      cityLabelPtPlaceholder: "Rua, bairro ou cidade de atendimento",
      cityLabelEnPlaceholder: "Street, neighborhood or service city",
      deliveryLocationsTitle: "Delivery areas",
      deliveryLocationsHelp: "Add districts, zones, or service areas. Each area can have a fixed fee or a fee to be confirmed.",
      settingsQuickDeliveryLocations: "Delivery areas",
      addDeliveryLocation: "Add delivery area",
      noDeliveryLocations: "No delivery areas added.",
      deliveryLocationNamePt: "PT-BR name",
      deliveryLocationNameEn: "EN name",
      deliveryLocationId: "Location code (optional)",
      deliveryLocationActive: "Active location: appears in the customer order form",
      deliveryLocationFeeMode: "Fee type",
      deliveryLocationFeeFixed: "Fixed fee",
      deliveryLocationFeeCustom: "Fee to be confirmed",
      deliveryLocationFee: "Delivery fee",
      deliveryLocationNotePt: "PT-BR note",
      deliveryLocationNoteEn: "EN note",
      deliveryLocationNotePlaceholder: "Ex.: Delivery fee to be confirmed by WhatsApp",
      deleteDeliveryLocation: "Delete location",
      deliveryLocationRequired: "Enter the delivery area name.",
      deliveryLocationFeeInvalid: "The fixed delivery fee must be zero or greater.",
      pixKey: "Pix key",
      pixOwnerPt: "Pix owner",
      pixOwnerEn: "Pix owner",
      pixBankPt: "Bank",
      pixBankEn: "Bank",
      defaultLocale: "Default locale",
      theme: "Theme",
      palette: "Palette",
      themePreset: "Menu theme",
      themePresetHelp: "Click a theme to preview it in Admin. Save the settings to apply it to the public menu.",
      themePresetTechnical: "Preview does not publish changes. The theme changes only visual colors; products, cart, WhatsApp, and Pix stay the same.",
      themePresetTobiasLanches: "Tobia's Lanches",
      themePresetDarkPremium: "Dark Premium",
      themePresetLightClean: "Light Clean",
      themePresetBurgerRed: "Burger Red",
      themePresetFreshGreen: "Fresh Green",
      themePresetAcaiPurple: "Acai Purple",
      themePresetCoffeeBrown: "Coffee Brown",
      themePresetOceanBlue: "Ocean Blue",
      themePresetPizzaOrange: "Pizza Orange",
      themePresetBakeryCream: "Bakery Cream",
      themePresetMinimalBlack: "Minimal Black",
      themePresetTropicalYellow: "Tropical Yellow",
      themePresetNeutralGray: "Neutral Gray",
      themePresetPastelSoft: "Pastel Soft",
      themePresetIceCreamPink: "Ice Cream Pink",
      themePresetRusticWood: "Rustic Wood",
      themePresetColorblindSafe: "Colorblind Safe",
      themePresetHighContrast: "High Contrast",
      themeApplied: "Applied",
      themePreview: "Preview",
      themeSaveToApply: "Save to apply",
      themePreviewActiveNotice: "Preview active — it has not been saved yet. Save the settings to apply it to the public menu.",
      themePreviewProductName: "Product",
      themePreviewBadge: "New",
      themePreviewAction: "Add",
      light: "Light",
      dark: "Dark",
      blue: "Blue",
      green: "Green",
      red: "Red",
      orange: "Orange",
      hoursTitle: "Opening hours",
      respectSchedule: "Respect opening hours",
      openTime: "Opens",
      closeTime: "Closes",
      scheduleOpenStatus: "Open",
      scheduleClosedStatus: "Closed",
      scheduleHelp: "Mark open days and adjust Opens/Closes. When a day is unchecked, it stays closed.",
      saveSettings: "Save settings",
      backToSettingsTop: "Back to top",
      cloudTitle: "Online publishing (Supabase)",
      cloudSubtitle: "Use this area to republish everything, load already published data, and verify the online mode.",
      cloudOperationalHelp: "Realtime and periodic checks are operational settings saved in Supabase.",
      cloudCheckAuth: "Test Auth login",
      cloudCheckStorage: "Check Storage",
      cloudSettingsTable: "menu_settings table",
      cloudStorageBucket: "Image bucket",
      cloudTechnicalTitle: "Initial technical setup",
      cloudTechnicalHelp: "The browser does not change the hosted config.js. Use this reference only to confirm the project, tables, and bucket.",
      cloudTechnicalManaged: "Current technical reference",
      cloudSettingsSavedOnline: "Online settings saved to Supabase.",
      cloudAuthOk: "Supabase login verified.",
      cloudStorageOk: "Storage checked successfully.",
      cloudLocalOnly: "Local mode active. config.js remains the technical reference.",
      cloudUrl: "Project URL",
      cloudAnonKey: "Anon key",
      cloudSchema: "Database area (usually public)",
      cloudCategories: "Categories table",
      cloudAddOns: "Add-ons table",
      cloudProducts: "Products table",
      cloudProductAddOns: "Product add-ons table",
      cloudEnabled: "Online mode active",
      cloudRealtime: "Automatic updates (Realtime)",
      autoReconnect: "Optional periodic check",
      reconnectInterval: "Check interval (ms)",
      saveCloud: "Save settings",
      checkConnection: "Check connection",
      migrateToCloud: "Publish changes online",
      syncToLocal: "Load online data",
      cloudPublishHelp: "Republishes the entire online menu using the current panel state.",
      cloudLoadHelp: "Loads into the panel the data that is already published online.",
      cloudCheckHelp: "Checks whether online mode is configured correctly.",
      cloudAdvancedTitle: "Advanced options",
      cloudAdvancedHelp: "Use this area only during the initial setup or when you need to review the configuration.",
      cloudStatus: "Connection status",
      lastCheck: "Last check",
      lastError: "Last error",
      cloudConnected: "Connected",
      cloudDisabled: "Disabled",
      cloudError: "Error",
      reportsTitle: "Reports",
      reportsSubtitle: "Track confirmed menu actions: views, cart, checkout, and customer choices.",
      reportsOnlineLoading: "Loading online metrics...",
      reportsOnlineActive: "Online data loaded from Supabase.",
      reportsOnlineFallback: "Could not load online metrics. Showing local data from this browser.",
      reportsLocalOnly: "Local mode: showing data from this browser.",
      reportClearOnlineWarning: "Local data cleared. Online metrics could not be cleared.",
      totalProducts: "Products registered",
      totalCategories: "Categories registered",
      totalAddOns: "Add-ons registered",
      systemHealth: "Data check",
      healthy: "No problems",
      corrupted: "With inconsistency",
      productsSeen: "Products viewed",
      productsSeenHelp: "times products appeared",
      productsAdded: "Added to cart",
      productsAddedHelp: "confirmed add-to-cart clicks",
      checkoutOpened: "Checkouts opened",
      checkoutOpenedHelp: "carts with items opened to finish",
      ordersPrepared: "Orders prepared",
      ordersPreparedHelp: "orders reviewed before sending",
      topAdded: "Products most added to cart",
      topViewed: "Most viewed products",
      paymentChoices: "Payment chosen",
      serviceChoices: "Service chosen",
      searchNoResults: "Searches with no result",
      reportSetupTitle: "Required adjustments",
      noMetrics: "Nothing recorded yet.",
      noSetupIssues: "No essential adjustment found.",
      noSearchNoResults: "No search without result recorded.",
      reportCountOne: "{{count}} time",
      reportCountOther: "{{count}} times",
      serviceChoiceDelivery: "Delivery",
      serviceChoicePickup: "Pickup",
      serviceChoiceDineIn: "Dine in",
      paymentMethodPix: "Pix",
      paymentMethodCard: "Card",
      paymentMethodCash: "Cash",
      reportIssueNoActiveProducts: "There is no active product for customers to choose.",
      reportIssueProductNoPrice: "There is an active product without a valid price.",
      exportReport: "Download report data",
      clearMetrics: "Clear report data",
      issuesDetected: "Issues detected",
      noIssues: "No critical inconsistencies detected.",
      systemTitle: "System actions",
      systemSubtitle: "Download a backup, restore data, or clean this device safely.",
      adminAboutAria: "About the system",
      adminAboutProduct: "Digital Menu",
      adminAboutCreditPrefix: "System developed by",
      adminAboutVersion: "Version {{version}}",
      backupSystem: "Full system backup",
      restoreBackup: "Restore backup",
      resetSystem: "Clear this device data",
      sanitizeSystem: "Fix local data",
      backupSystemHelp: "Download a complete copy before important changes.",
      restoreBackupHelp: "Import a backup saved earlier.",
      resetSystemHelp: "Downloads a copy and then restores the clean base on this device.",
      sanitizeSystemHelp: "Fixes simple duplicates and local data inconsistencies.",
      systemActionsAria: "Backup and maintenance actions",
      backToProductsTop: "Back to products top",
      resetWarning: "Clear the menu data on this device? A safety backup will be downloaded first.",
      deleteWarning: "Delete '{{name}}'?",
      deleteCategoryWarning: "Delete category '{{name}}'? Linked products will be moved to the first remaining category.",
      keepAtLeastOneCategory: "At least one category must remain.",
      productSaved: "Product saved in the panel.",
      productCreated: "Product created in the panel.",
      productDeleted: "Product deleted.",
      productStatusUpdated: "Product status updated.",
      categorySaved: "Category saved in the panel.",
      categoryCreated: "Category created in the panel.",
      categoryDeleted: "Category deleted.",
      settingsSaved: "Settings saved in the panel.",
      cloudSaved: "Online settings saved in the panel.",
      cloudLoading: "Loading online data...",
      cloudLoaded: "Online data loaded into the panel.",
      cloudPublishing: "Publishing online changes...",
      cloudPublished: "Changes published to the online menu.",
      cloudPublishedWithImageWarning: "Changes published to the online menu. Some images were not uploaded; review image storage.",
      cloudConnectionOk: "Online connection checked.",
      cloudConnectionError: "Could not confirm the online connection. Check Supabase.",
      cloudSettingsSaveError: "Could not save online settings. Check your Supabase permission.",
      cloudSyncDone: "Online data loaded into the panel.",
      cloudMigrationDone: "Changes published to the online menu.",
      cloudMigrationRealtimeDone: "Changes published to the online menu.",
      cloudLoadError: "Could not load the online data.",
      cloudPublishError: "Could not publish the changes. Check the Supabase connection.",
      authInvalidCredentials: "Incorrect email or password.",
      onlineConnectionFriendly: "Could not connect to online mode. Check the cloud configuration.",
      editCanceled: "Edit canceled.",
      draftPreserved: "Draft preserved.",
      unsavedChanges: "Unsaved changes.",
      backupDownloaded: "Backup exported.",
      backupRestored: "Backup restored.",
      systemSanitized: "Local data checked and fixed.",
      systemResetDone: "Menu restored to the clean base.",
      metricsCleared: "Metrics cleared.",
      reportExported: "Report exported.",
      requiredField: "Fill in the required fields.",
      invalidPrice: "Enter a valid price.",
      productNameRequired: "Enter the product name.",
      productCategoryRequired: "Select a category.",
      productPriceRequired: "Enter a valid price.",
      categoryNameRequired: "Enter the category name.",
      addOnNameRequired: "Enter the add-on name.",
      addOnPriceRequired: "Enter a valid add-on price.",
      invalidCloudInterval: "Enter a valid reconnect interval.",
      invalidBackup: "The backup could not be read. Choose a valid file.",
      uploadRestoreLabel: "Select backup",
      realTimeMode: "Optional connection check",
      localFallbackMode: "Local fallback ready",
      yes: "Yes",
      no: "No",
      daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      daysLong: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    },
  };

  Object.assign(MESSAGES["pt-BR"], {
    panelSubtitle: "Edite com calma. No modo online, o painel publica automaticamente ao salvar.",
    authOnlineDescription: "Use o e-mail e a senha criados no Supabase Auth para este Admin. O config.js é apenas a configuração técnica inicial.",
    onlineRequired: "Entre com o e-mail e a senha do Supabase Auth para usar o modo online.",
    cloudSubtitle: "Área técnica para conectar, republicar e testar o modo online. Use apenas se você configurou o Supabase.",
    cloudOperationalHelp: "Realtime e checagem periódica são opcionais. Se a atualização automática falhar, recarregar a página continua sendo o fallback.",
      cloudCheckAuth: "Validar login do Admin online",
      cloudCheckStorage: "Verificar envio de imagens",
      cloudSettingsTable: "Tabela dos ajustes online",
      cloudMetricEventsTable: "Tabela de métricas online",
      cloudStorageBucket: "Pasta de imagens do produto",
    cloudTechnicalTitle: "Configuração técnica inicial",
    cloudTechnicalHelp: "O navegador não altera o config.js hospedado. Use esta referência apenas para conferir projeto, tabelas e bucket da instalação técnica.",
    cloudTechnicalManaged: "Referência técnica atual",
    cloudSettingsSavedOnline: "Ajustes online salvos no Supabase.",
    cloudAuthOk: "Login do Supabase validado.",
    cloudStorageOk: "Envio de imagens verificado.",
    cloudLocalOnly: "Modo local ativo. O config.js continua sendo a referência técnica.",
    saveCloud: "Salvar ajustes online",
    cloudAdvancedTitle: "Configuração técnica inicial",
    cloudAdvancedHelp: "Use esta área apenas na instalação inicial ou quando precisar revisar a referência técnica.",
    cloudRealtime: "Atualização automática do cardápio (Realtime)",
    autoReconnect: "Checagem periódica de conexão",
    reconnectInterval: "Intervalo da checagem (ms)",
  });

  Object.assign(MESSAGES["en-US"], {
    authOnlineDescription: "Use the email and password created in Supabase Auth for this Admin. config.js is only the initial technical setup.",
    onlineRequired: "Sign in with the Supabase Auth email and password to use online mode.",
    cloudSubtitle: "Technical area for connecting, republishing, and testing online mode. Use it only if Supabase has been configured.",
    cloudOperationalHelp: "Realtime and periodic checks are optional. If automatic updates fail, reloading the page remains the fallback.",
      cloudCheckAuth: "Validate online Admin login",
      cloudCheckStorage: "Check image upload",
      cloudSettingsTable: "Online settings table",
      cloudMetricEventsTable: "Online metrics table",
      cloudStorageBucket: "Product image folder",
    cloudTechnicalHelp: "The browser does not change the hosted config.js. Use this reference only to confirm the project, tables, and technical installation bucket.",
    cloudRealtime: "Automatic menu updates (Realtime)",
    autoReconnect: "Periodic connection check",
    reconnectInterval: "Check interval (ms)",
    saveCloud: "Save online settings",
    cloudAdvancedHelp: "Use this area only during the initial setup or when you need to review the technical reference.",
  });

  Object.assign(MESSAGES["pt-BR"], {
    panelSubtitle: "Edite com calma. No modo online, o painel publica automaticamente ao salvar.",
    authSetDescription: "Escolha uma senha para entrar neste painel neste aparelho.",
    authSignDescription: "Use a senha criada no primeiro acesso deste aparelho.",
    authOnlineDescription: "Use o e-mail e a senha cadastrados no Supabase para este Admin. O config.js é uma configuração técnica feita na instalação.",
    onlineAccessGranted: "Login online realizado.",
    onlineSessionExpired: "Sua sessão online expirou. Entre novamente.",
    onlineRequired: "Entre com o e-mail e a senha do Admin online para continuar.",
    cryptoUnavailable: "Não foi possível salvar a senha com segurança. Abra esta página em HTTPS ou localhost.",
    productsSubtitle: "Cadastre produtos, imagens, preços, disponibilidade e adicionais.",
    searchLabel: "Buscar produto",
    searchPlaceholder: "Nome, descrição ou palavra-chave",
    productFormTitle: "Cadastrar ou editar produto",
    productDescriptionsSection: "Textos exibidos no cardápio",
    productTags: "Palavras-chave para busca",
    productPrepTime: "Tempo de preparo em minutos",
    productStatus: "Produto ativo: aparece no cardápio",
    productAvailability: "Produto disponível: pode ser comprado",
    available: "Disponível",
    makeAvailable: "Disponibilizar",
    makeUnavailable: "Indisponibilizar",
    productAvailabilityUpdated: "Disponibilidade do produto atualizada.",
    productImagesHelp: "A imagem aparece para o cliente no cardápio.",
    imageUploadPublishError: "A imagem não foi enviada. O produto pode ser publicado sem imagem, mas revise o armazenamento de imagens no Supabase.",
    productImagePublishHelp: "No modo online, a imagem será enviada junto com a publicação.",
    categoriesSubtitle: "Organize o cardápio por grupos. Se deixar o código vazio, ele será criado pelo sistema.",
    categoryFormTitle: "Cadastrar ou editar categoria",
    categorySlug: "Código da categoria (opcional)",
    categoryDescriptionPt: "Descrição da categoria",
    categoryDescriptionEn: "Descrição da categoria em inglês",
    addOnsSubtitle: "Cadastre extras que podem ser adicionados aos produtos, como queijo, bacon ou molhos.",
    addOnFormTitle: "Cadastrar ou editar adicional",
    addOnId: "Código do adicional (opcional)",
    addOnEnabled: "Adicional ativo: aparece nos produtos vinculados",
    settingsTitle: "Configurações do cardápio",
      settingsSubtitle: "Ajuste dados do estabelecimento, atendimento, entrega, Pix, políticas, aparência e horários.",
      settingsSaveBarClean: "Revise os campos e salve quando terminar.",
      settingsQuickPolicies: "Políticas",
      sectionOperationHelp: "WhatsApp, entrega, Pix e idioma padrão usados no pedido do cliente.",
      sectionLocationHelp: "Endereço e rota do estabelecimento. Use link do Google Maps ou coordenadas opcionais.",
      sectionAppearanceHelp: "Teste a aparência no painel. Salve para aplicar no cardápio público.",
      sectionPolicies: "Políticas",
      sectionPoliciesHelp: "Controle os links legais do rodapé e os dados exibidos nas páginas públicas. Use link externo se o estabelecimento já tiver uma política própria.",
      legalShowPrivacyPolicy: "Mostrar Política de Privacidade no rodapé",
      legalShowTermsOfUse: "Mostrar Termos de Uso no rodapé",
      legalBusinessName: "Nome legal do negócio",
      legalBusinessNameEn: "Nome legal do negócio — EN",
      legalContactEmail: "E-mail de contato legal",
      legalContactPhone: "Telefone de contato legal",
      legalBusinessAddress: "Endereço legal do negócio",
      legalLastUpdated: "Data de atualização",
      legalPrivacyMode: "Política de Privacidade",
      legalTermsMode: "Termos de Uso",
      legalModeInternal: "Usar página interna",
      legalModeExternal: "Usar link externo",
      legalPrivacyUrl: "URL externa da Política",
      legalTermsUrl: "URL externa dos Termos",
      legalExternalUrlHelp: "Se o modo externo estiver ativo e a URL estiver vazia ou inválida, o cardápio usa automaticamente a página interna.",
      legalChanged: "Políticas alteradas. Salve para aplicar no cardápio público.",
    whatsappNumber: "WhatsApp que receberá os pedidos",
    brandImageHelp: "A imagem aparece no topo do cardápio e no painel.",
    waitingTimePt: "Tempo médio do pedido",
    waitingTimeEn: "Tempo médio do pedido — EN",
    waitingLabelPt: "Texto do tempo no topo",
    waitingLabelEn: "Texto do tempo no topo — EN",
    paymentLabelPt: "Texto de pagamento no topo",
    paymentLabelEn: "Texto de pagamento no topo — EN",
    pickupAddress: "Endereço para retirada",
    baseFee: "Taxa base de entrega (sem localidade)",
    cityLabelPt: "Região de atendimento",
    cityLabelEn: "Região de atendimento — EN",
    deliveryLocationsHelp: "Cadastre bairros, zonas ou regiões atendidas. A taxa fixa soma ao pedido; a taxa a combinar será tratada pelo WhatsApp.",
    deliveryLocationNamePt: "Nome da localidade em PT-BR",
    deliveryLocationNameEn: "Nome da localidade em inglês",
    deliveryLocationId: "Código da localidade (opcional)",
    deliveryLocationActive: "Localidade ativa: aparece na finalização do pedido",
    deliveryLocationFeeMode: "Como cobrar a taxa",
    deliveryLocationFeeFixed: "Taxa fixa: soma ao total",
    deliveryLocationFeeCustom: "Taxa a combinar pelo WhatsApp",
    deliveryLocationFee: "Valor da taxa de entrega",
    deliveryLocationNotePt: "Observação da localidade em PT-BR",
    deliveryLocationNoteEn: "Observação da localidade em inglês",
    deliveryLocationRequired: "Informe o nome da localidade.",
    deliveryLocationFeeInvalid: "Informe uma taxa fixa igual ou maior que zero.",
    themePresetHelp: "Clique em um tema para pré-visualizar. Salve as configurações para aplicar no cardápio público.",
    themePresetTechnical: "A prévia muda apenas a aparência. Produtos, carrinho, WhatsApp e Pix continuam iguais.",
    scheduleHelp: "Marque os dias em que atende e informe os horários de abertura e fechamento.",
    cloudTitle: "Publicação online (Supabase)",
    cloudSubtitle: "Use esta área para republicar tudo, carregar dados já publicados e testar a conexão online.",
    cloudOperationalHelp: "Atualização automática e checagem periódica são opcionais. Se falharem, você ainda pode carregar os dados manualmente.",
    cloudUrl: "URL do projeto Supabase",
    cloudAnonKey: "Chave pública do projeto",
    cloudSchema: "Área do banco de dados",
    cloudCategories: "Tabela de categorias",
    cloudAddOns: "Tabela de adicionais",
    cloudProducts: "Tabela de produtos",
    cloudProductAddOns: "Tabela de vínculos produto/adicional",
    cloudRealtime: "Atualização automática do cardápio",
    autoReconnect: "Checagem periódica da conexão",
    reconnectInterval: "Intervalo da checagem em milissegundos",
    checkConnection: "Testar conexão online",
    cloudCheckAuth: "Validar login online do Admin",
    cloudCheckStorage: "Verificar envio de imagens",
    cloudSettingsTable: "Tabela dos ajustes online",
    cloudStorageBucket: "Pasta de imagens no Supabase",
    cloudTechnicalTitle: "Dados técnicos da instalação",
    cloudTechnicalHelp: "Esses dados são apenas referência da instalação. O painel não altera o config.js hospedado.",
    cloudTechnicalManaged: "Referência técnica atual",
    cloudSettingsSavedOnline: "Ajustes online salvos no Supabase.",
    cloudAuthOk: "Login online validado.",
    cloudStorageOk: "Envio de imagens verificado.",
    cloudLocalOnly: "Modo local ativo. As alterações ficam apenas neste navegador até o modo online estar disponível.",
    cloudModeOnline: "Modo online ativo: ao salvar, o painel tenta publicar as alterações no cardápio online.",
    cloudModeOffline: "Modo local: nada é publicado para todos enquanto o Supabase não estiver ativo.",
    cloudActionUnavailable: "Esta ação online não está disponível no modo local.",
    cloudActionLoginRequired: "Entre novamente no Admin online para publicar ou carregar dados.",
    cloudStatus: "Status da conexão online",
    lastCheck: "Última verificação",
    lastError: "Último erro registrado",
    pixOwnerEn: "Titular do Pix — EN",
    pixBankEn: "Banco — EN",
    reportsSubtitle: "Acompanhe ações confirmadas no cardápio: visualizações, carrinho, finalização e escolhas do cliente.",
    systemHealth: "Conferência dos dados",
    healthy: "Sem problemas",
    corrupted: "Com inconsistência",
    productsSeen: "Produtos vistos",
    productsSeenHelp: "vezes que produtos apareceram",
    productsAdded: "Adicionados ao carrinho",
    productsAddedHelp: "cliques confirmados em adicionar",
    checkoutOpened: "Checkouts abertos",
    checkoutOpenedHelp: "carrinhos com item abertos para finalizar",
    ordersPrepared: "Pedidos preparados",
    ordersPreparedHelp: "pedidos revisados antes do envio",
    topAdded: "Produtos mais adicionados ao carrinho",
    topViewed: "Produtos mais visualizados",
    paymentChoices: "Pagamento escolhido",
    serviceChoices: "Atendimento escolhido",
    searchNoResults: "Buscas sem resultado",
    reportSetupTitle: "Ajustes necessários",
    noMetrics: "Nada registrado ainda.",
    noSetupIssues: "Nenhum ajuste essencial encontrado.",
    noSearchNoResults: "Nenhuma busca sem resultado registrada.",
    reportCountOne: "{{count}} vez",
    reportCountOther: "{{count}} vezes",
    serviceChoiceDelivery: "Entrega",
    serviceChoicePickup: "Retirada",
    serviceChoiceDineIn: "No local",
    paymentMethodPix: "Pix",
    paymentMethodCard: "Cartão",
    paymentMethodCash: "Dinheiro",
    reportIssueNoActiveProducts: "Não há produto ativo para o cliente escolher.",
    reportIssueProductNoPrice: "Há produto ativo sem preço válido.",
    exportReport: "Baixar dados do relatório",
    clearMetrics: "Limpar dados do relatório",
    systemTitle: "Backup e manutenção",
    systemSubtitle: "Baixe backup, restaure dados ou limpe este aparelho com segurança.",
    resetSystem: "Limpar dados deste aparelho",
    sanitizeSystem: "Corrigir dados locais",
    resetSystemHelp: "Baixa uma cópia e depois restaura a base limpa neste aparelho.",
    sanitizeSystemHelp: "Corrige duplicações e inconsistências simples nos dados deste aparelho.",
    systemSanitized: "Dados locais conferidos e corrigidos.",
    systemResetDone: "Cardápio restaurado para a base limpa.",
    resetWarning: "Limpar os dados do cardápio neste aparelho? Uma cópia de segurança será baixada antes.",
    productSaved: "Produto salvo no painel.",
    productCreated: "Produto criado no painel.",
    categorySaved: "Categoria salva no painel.",
    categoryCreated: "Categoria criada no painel.",
    addOnSaved: "Adicional salvo no painel.",
    addOnCreated: "Adicional criado no painel.",
    settingsSaved: "Configurações salvas no painel.",
    cloudSaved: "Ajustes online salvos no painel.",
    cloudLoaded: "Dados online carregados no painel.",
    cloudPublished: "Alterações publicadas no cardápio online.",
    cloudPublishedWithImageWarning: "Alterações publicadas no cardápio online. Algumas imagens não foram enviadas; revise o armazenamento de imagens.",
    cloudConnectionOk: "Conexão online verificada.",
    cloudConnectionError: "Não foi possível confirmar a conexão online. Verifique o Supabase.",
    cloudSettingsSaveError: "Não foi possível salvar os ajustes online. Verifique sua permissão no Supabase.",
    cloudSyncDone: "Dados online carregados no painel.",
    cloudMigrationDone: "Alterações publicadas no cardápio online.",
    cloudMigrationRealtimeDone: "Alterações publicadas no cardápio online.",
    savedAndPublishedOnline: "Alterações salvas neste navegador e publicadas no cardápio online.",
    savedLocallyPublishFailed: "Alterações salvas neste navegador, mas não publicadas para todos.",
    requiredField: "Preencha os campos obrigatórios.",
    invalidBackup: "Não foi possível ler o backup. Escolha um arquivo válido.",
    invalidCloudInterval: "Informe um intervalo de checagem válido.",
    uploadRestoreLabel: "Selecionar arquivo de backup",
    realTimeMode: "Atualização online opcional",
    localFallbackMode: "Modo local pronto",
    savingChanges: "Salvando alterações...",
    savingAndPublishing: "Salvando e publicando online...",
    actionInProgress: "Carregando...",
    newProductReady: "Novo produto: preencha os campos e salve.",
    editingProduct: "Editando: {{name}}.",
    productAvailabilityChanged: "Disponibilidade do produto alterada. Salve para confirmar.",
    productImageSelected: "Imagem inserida. Salve para manter a alteração.",
    productImageRemoved: "Imagem removida. Salve para confirmar.",
    categoryEditing: "Editando categoria: {{name}}.",
    addOnEditing: "Editando adicional: {{name}}.",
    comboEditing: "Editando combo: {{name}}.",
    comboImageChanged: "Imagem do combo alterada. Salve o combo para confirmar.",
    deliveryLocationAdded: "Nova localidade adicionada. Preencha os dados e salve.",
    deliveryLocationChanged: "Localidade alterada. Salve as configurações para confirmar.",
    deliveryLocationRemoved: "Localidade removida. Salve as configurações para confirmar.",
    deliveryLocationActiveChanged: "Status da localidade alterado. Salve para confirmar.",
    deliveryFeeFixedChanged: "Taxa fixa ajustada. Informe o valor e salve.",
    deliveryFeeCustomChanged: "Taxa a combinar selecionada. Salve para confirmar.",
    whatsappChanged: "WhatsApp alterado. Salve para aplicar no pedido.",
    pixChanged: "Pix alterado. Salve para aplicar no checkout.",
    hoursChanged: "Horários alterados. Salve para aplicar.",
    locationChanged: "Localização alterada. Salve para aplicar no cardápio.",
    themeChanged: "Tema em prévia. Salve para aplicar no cardápio público.",
  });

  Object.assign(MESSAGES["en-US"], {
    panelSubtitle: "Edit calmly. In online mode, the panel publishes automatically when you save.",
    authSetDescription: "Choose a password to open this panel on this device.",
    authSignDescription: "Use the password created on the first access on this device.",
    authOnlineDescription: "Use the email and password registered in Supabase for this Admin. config.js is a technical setup completed during installation.",
    onlineAccessGranted: "Online login completed.",
    onlineSessionExpired: "Your online session expired. Sign in again.",
    onlineRequired: "Sign in with the online Admin email and password to continue.",
    cryptoUnavailable: "The password could not be saved safely. Open this page on HTTPS or localhost.",
    productsSubtitle: "Add products, images, prices, availability, and add-ons.",
    searchLabel: "Search product",
    searchPlaceholder: "Name, description, or keyword",
    productFormTitle: "Add or edit product",
    productDescriptionsSection: "Text shown in the menu",
    productTags: "Search keywords",
    productPrepTime: "Preparation time in minutes",
    productStatus: "Active product: appears in the menu",
    productAvailability: "Available product: can be purchased",
    available: "Available",
    makeAvailable: "Make available",
    makeUnavailable: "Make unavailable",
    productAvailabilityUpdated: "Product availability updated.",
    productImagesHelp: "The image appears to the customer in the menu.",
    imageUploadPublishError: "The image was not uploaded. The product may publish without an image, but review image storage in Supabase.",
    productImagePublishHelp: "In online mode, the image will be uploaded with the publication.",
    categoriesSubtitle: "Organize the menu into groups. If the code is left blank, the system creates it.",
    categoryFormTitle: "Add or edit category",
    categorySlug: "Category code (optional)",
    categoryDescriptionPt: "Category description in PT-BR",
    categoryDescriptionEn: "Category description",
    addOnsSubtitle: "Add extras that can be included with products, such as cheese, bacon, or sauces.",
    addOnFormTitle: "Add or edit add-on",
    addOnId: "Add-on code (optional)",
    addOnEnabled: "Active add-on: appears in linked products",
    settingsTitle: "Menu settings",
      settingsSubtitle: "Adjust business details, service, delivery, Pix, policies, appearance, and opening hours.",
      settingsSaveBarClean: "Review the fields and save when finished.",
      settingsQuickPolicies: "Policies",
      sectionOperationHelp: "WhatsApp, delivery, Pix, and default language used in the customer order.",
      sectionLocationHelp: "Store address and route. Use a Google Maps link or optional coordinates.",
      sectionAppearanceHelp: "Preview the appearance in the panel. Save to apply it to the public menu.",
      sectionPolicies: "Policies",
      sectionPoliciesHelp: "Control the legal footer links and the details shown on the public pages. Use an external link if the business already has its own policy.",
      legalShowPrivacyPolicy: "Show Privacy Policy in the footer",
      legalShowTermsOfUse: "Show Terms of Use in the footer",
      legalBusinessName: "Legal business name",
      legalBusinessNameEn: "Legal business name",
      legalContactEmail: "Legal contact email",
      legalContactPhone: "Legal contact phone",
      legalBusinessAddress: "Legal business address",
      legalLastUpdated: "Last updated date",
      legalPrivacyMode: "Privacy Policy",
      legalTermsMode: "Terms of Use",
      legalModeInternal: "Use internal page",
      legalModeExternal: "Use external link",
      legalPrivacyUrl: "External Privacy URL",
      legalTermsUrl: "External Terms URL",
      legalExternalUrlHelp: "If external mode is enabled and the URL is empty or invalid, the menu automatically uses the internal page.",
      legalChanged: "Policies changed. Save to apply them to the public menu.",
    whatsappNumber: "WhatsApp that receives orders",
    brandImageHelp: "The image appears at the top of the menu and in the panel.",
    waitingTimePt: "Average order time in PT-BR",
    waitingTimeEn: "Average order time",
    waitingLabelPt: "Top time text in PT-BR",
    waitingLabelEn: "Top time text",
    paymentLabelPt: "Top payment text in PT-BR",
    paymentLabelEn: "Top payment text",
    pickupAddress: "Pickup address",
    baseFee: "Base delivery fee (without area)",
    cityLabelPt: "Service area in PT-BR",
    cityLabelEn: "Service area",
    deliveryLocationsHelp: "Add districts, zones, or service areas. A fixed fee is added to the order; a fee to be confirmed is handled through WhatsApp.",
    deliveryLocationNamePt: "Delivery area name in PT-BR",
    deliveryLocationNameEn: "Delivery area name in English",
    deliveryLocationId: "Location code (optional)",
    deliveryLocationActive: "Active location: appears in the customer order form",
    deliveryLocationFeeMode: "How to charge the fee",
    deliveryLocationFeeFixed: "Fixed fee: added to the total",
    deliveryLocationFeeCustom: "Fee to be confirmed through WhatsApp",
    deliveryLocationFee: "Delivery fee amount",
    deliveryLocationNotePt: "Delivery area note in PT-BR",
    deliveryLocationNoteEn: "Delivery area note in English",
    deliveryLocationRequired: "Enter the delivery area name.",
    deliveryLocationFeeInvalid: "Enter a fixed fee equal to or greater than zero.",
    themePresetHelp: "Click a theme to preview it. Save the settings to apply it to the public menu.",
    themePresetTechnical: "The preview changes only the appearance. Products, cart, WhatsApp, and Pix stay the same.",
    scheduleHelp: "Mark the days you serve customers and enter opening and closing times.",
    cloudTitle: "Online publishing (Supabase)",
    cloudSubtitle: "Use this area to republish everything, load already published data, and test the online connection.",
    cloudOperationalHelp: "Automatic updates and periodic checks are optional. If they fail, you can still load data manually.",
    cloudUrl: "Supabase project URL",
    cloudAnonKey: "Project public key",
    cloudSchema: "Database area",
    cloudCategories: "Categories table",
    cloudAddOns: "Add-ons table",
    cloudProducts: "Products table",
    cloudProductAddOns: "Product/add-on links table",
    cloudRealtime: "Automatic menu updates",
    autoReconnect: "Periodic connection check",
    reconnectInterval: "Check interval in milliseconds",
    checkConnection: "Test online connection",
    cloudCheckAuth: "Validate online Admin login",
    cloudCheckStorage: "Check image upload",
    cloudSettingsTable: "Online settings table",
    cloudStorageBucket: "Supabase image folder",
    cloudTechnicalTitle: "Installation technical details",
    cloudTechnicalHelp: "These details are only an installation reference. The panel does not change the hosted config.js.",
    cloudTechnicalManaged: "Current technical reference",
    cloudSettingsSavedOnline: "Online settings saved to Supabase.",
    cloudAuthOk: "Online login verified.",
    cloudStorageOk: "Image upload checked.",
    cloudLocalOnly: "Local mode active. Changes stay only in this browser until online mode is available.",
    cloudModeOnline: "Online mode active: when saving, the panel tries to publish changes to the online menu.",
    cloudModeOffline: "Local mode: nothing is published to everyone while Supabase is not active.",
    cloudActionUnavailable: "This online action is not available in local mode.",
    cloudActionLoginRequired: "Sign in again to the online Admin to publish or load data.",
    cloudStatus: "Online connection status",
    lastCheck: "Last check",
    lastError: "Last recorded error",
    pixOwnerEn: "Pix owner",
    pixBankEn: "Bank",
    reportsSubtitle: "Track confirmed menu actions: views, cart, checkout, and customer choices.",
    systemHealth: "Data check",
    healthy: "No problems",
    corrupted: "With inconsistency",
    productsSeen: "Products viewed",
    productsSeenHelp: "times products appeared",
    productsAdded: "Added to cart",
    productsAddedHelp: "confirmed add-to-cart clicks",
    checkoutOpened: "Checkouts opened",
    checkoutOpenedHelp: "carts with items opened to finish",
    ordersPrepared: "Orders prepared",
    ordersPreparedHelp: "orders reviewed before sending",
    topAdded: "Products most added to cart",
    topViewed: "Most viewed products",
    paymentChoices: "Payment chosen",
    serviceChoices: "Service chosen",
    searchNoResults: "Searches with no result",
    reportSetupTitle: "Required adjustments",
    noMetrics: "Nothing recorded yet.",
    noSetupIssues: "No essential adjustment found.",
    noSearchNoResults: "No search without result recorded.",
    reportCountOne: "{{count}} time",
    reportCountOther: "{{count}} times",
    serviceChoiceDelivery: "Delivery",
    serviceChoicePickup: "Pickup",
    serviceChoiceDineIn: "Dine in",
    paymentMethodPix: "Pix",
    paymentMethodCard: "Card",
    paymentMethodCash: "Cash",
    reportIssueNoActiveProducts: "There is no active product for customers to choose.",
    reportIssueProductNoPrice: "There is an active product without a valid price.",
    exportReport: "Download report data",
    clearMetrics: "Clear report data",
    systemTitle: "Backup and maintenance",
    systemSubtitle: "Download a backup, restore data, or clean this device safely.",
    resetSystem: "Clear this device data",
    sanitizeSystem: "Fix local data",
    resetSystemHelp: "Downloads a copy and then restores the clean base on this device.",
    sanitizeSystemHelp: "Fixes simple duplicates and inconsistencies in this device data.",
    systemSanitized: "Local data checked and fixed.",
    systemResetDone: "Menu restored to the clean base.",
    resetWarning: "Clear the menu data on this device? A safety backup will be downloaded first.",
    productSaved: "Product saved in the panel.",
    productCreated: "Product created in the panel.",
    categorySaved: "Category saved in the panel.",
    categoryCreated: "Category created in the panel.",
    addOnSaved: "Add-on saved in the panel.",
    addOnCreated: "Add-on created in the panel.",
    settingsSaved: "Settings saved in the panel.",
    cloudSaved: "Online settings saved in the panel.",
    cloudLoaded: "Online data loaded into the panel.",
    cloudPublished: "Changes published to the online menu.",
    cloudPublishedWithImageWarning: "Changes published to the online menu. Some images were not uploaded; review image storage.",
    cloudConnectionOk: "Online connection checked.",
    cloudConnectionError: "Could not confirm the online connection. Check Supabase.",
    cloudSettingsSaveError: "Could not save online settings. Check your Supabase permission.",
    cloudSyncDone: "Online data loaded into the panel.",
    cloudMigrationDone: "Changes published to the online menu.",
    cloudMigrationRealtimeDone: "Changes published to the online menu.",
    savedAndPublishedOnline: "Changes were saved in this browser and published to the online menu.",
    savedLocallyPublishFailed: "Changes were saved in this browser, but not published to everyone.",
    requiredField: "Fill in the required fields.",
    invalidBackup: "The backup could not be read. Choose a valid file.",
    invalidCloudInterval: "Enter a valid check interval.",
    uploadRestoreLabel: "Select backup file",
    realTimeMode: "Optional online updates",
    localFallbackMode: "Local mode ready",
    savingChanges: "Saving changes...",
    savingAndPublishing: "Saving and publishing online...",
    actionInProgress: "Processing...",
    newProductReady: "New product: fill in the fields and save.",
    editingProduct: "Editing: {{name}}.",
    productAvailabilityChanged: "Product availability changed. Save to confirm.",
    productImageSelected: "Image added. Save to keep the change.",
    productImageRemoved: "Image removed. Save to confirm.",
    categoryEditing: "Editing category: {{name}}.",
    addOnEditing: "Editing add-on: {{name}}.",
    comboEditing: "Editing combo: {{name}}.",
    comboImageChanged: "Combo image changed. Save the combo to confirm.",
    deliveryLocationAdded: "New delivery area added. Fill in the details and save.",
    deliveryLocationChanged: "Delivery area changed. Save settings to confirm.",
    deliveryLocationRemoved: "Delivery area removed. Save settings to confirm.",
    deliveryLocationActiveChanged: "Delivery area status changed. Save to confirm.",
    deliveryFeeFixedChanged: "Fixed fee adjusted. Enter the amount and save.",
    deliveryFeeCustomChanged: "Fee to confirm selected. Save to confirm.",
    whatsappChanged: "WhatsApp changed. Save to apply it to orders.",
    pixChanged: "Pix changed. Save to apply it to checkout.",
    hoursChanged: "Opening hours changed. Save to apply.",
    locationChanged: "Location changed. Save to apply it to the menu.",
    themeChanged: "Theme preview active. Save to apply it to the public menu.",
  });

  const state = {
    locale: shared?.loadStorageValue(LOCALE_KEY, "", "local"),
    states: system?.getStates(),
    savedThemePreset: "",
    previewThemePreset: "",
    pendingThemePreset: "",
    activeTab: "products",
    tabsScrollLeft: 0,
    editingProductId: "",
    editingCategorySlug: "",
    editingAddOnId: "",
    editingComboId: "",
    isProductEditing: false,
    hasUnsavedProductChanges: false,
    productFormGuidance: "",
    productFormGuidanceName: "",
    productFormDraft: null,
    pendingRemoteProductUpdate: null,
    adminEditGuard: {
      dirtyAreas: {},
      formDrafts: {},
      pendingRemoteUpdate: null,
    },
    formDraftContext: "",
    productFilters: {
      search: "",
      category: "all",
      status: "all",
      sort: "menu",
    },
    comboProductFilters: {
      search: "",
      category: "all",
      selectedOnly: false,
      availableOnly: false,
    },
    onlineReportData: null,
    onlineReportsLoading: false,
    onlineReportsError: "",
    cloudMonitorId: null,
    adminStatusTimer: null,
    adminStatusSignature: "",
    adminStatusAt: 0,
  };

  const ADMIN_FORM_AREAS = {
    productForm: "products",
    categoryForm: "categories",
    addOnForm: "addOns",
    comboForm: "offers",
    settingsForm: "settings",
    cloudForm: "cloud",
  };

  const ADMIN_DESTRUCTIVE_STATE_EVENTS = new Set([
    "cloud-sync-to-local",
    "cloud-status",
    "external-storage",
  ]);

  const loadStorageValue = function (key, fallback, mode) {
    return shared?.loadStorageValue(key, fallback, mode || "local");
  };

  const saveStorageValue = function (key, value, mode) {
    return shared?.saveStorageValue(key, value, mode || "local");
  };

  const removeStorageValue = function (key, mode) {
    return shared?.removeStorageValue(key, mode || "local");
  };

  const $ = shared?.byId;
  const clone = shared?.clone;
  const escapeHtml = shared?.escapeHtml;

  function getSupportedLocales() {
    return state?.states?.brandConfig?.i18n?.supportedLocales || {
      "pt-BR": { label: "PT", name: "Português", formatLocale: "pt-BR", htmlLang: "pt-BR" },
      "en-US": { label: "EN", name: "English", formatLocale: "en-US", htmlLang: "en-US" },
    };
  }

  function getDefaultLocale() {
    return state?.states?.brandConfig?.i18n?.defaultLocale || "pt-BR";
  }

  const localeTools = shared?.createLocaleTools({
    messages: MESSAGES,
    getSupportedLocales: getSupportedLocales,
    getDefaultLocale: getDefaultLocale,
    getCurrentLocale: function () {
      return state?.locale || getDefaultLocale();
    },
  });

  function resolveLocale(locale) {
    return localeTools?.resolveLocale(locale);
  }

  function currentLocale() {
    state.locale = resolveLocale(state?.locale || getDefaultLocale());
    return state?.locale;
  }

  function localeDisplayName(localeKey, localeMeta) {
    const fixedNames = {
      "pt-BR": "Português",
      "en-US": "English",
    };

    return fixedNames[localeKey] || localeMeta?.name || localeMeta?.label || localeKey;
  }

  function t(key, params) {
    return localeTools?.translate(key, params);
  }

  function rawMessage(key) {
    return localeTools?.rawMessage(key);
  }

  function textValue(value, locale) {
    return localeTools?.textValue(value, locale);
  }

  function listValue(value, locale) {
    return localeTools?.listValue(value, locale);
  }

  const slugify = shared?.slugify;

  function formatCurrency(value) {
    const locale = getSupportedLocales()[currentLocale()]?.formatLocale || currentLocale();
    const currency = state?.states?.brandConfig?.business?.currency || "BRL";
    return shared?.formatCurrency(value, { locale: locale, currency: currency });
  }

  function isMobileViewport() {
    return Boolean(window?.matchMedia?.("(max-width: 768px)")?.matches) || Number(window?.innerWidth || 0) <= 768;
  }

  function isCompactAdminViewport() {
    return Boolean(window?.matchMedia?.("(max-width: 1024px)")?.matches) || Number(window?.innerWidth || 0) <= 1024;
  }

  function isAuthScreenActive() {
    const authPanel = $("authPanel");
    const app = $("adminApp");
    return Boolean(authPanel && !authPanel.hidden && (!app || app.hidden));
  }

  function syncAdminSurfaceMode() {
    const authScreenActive = isAuthScreenActive();
    document?.body?.classList?.toggle?.("admin-auth-screen-active", authScreenActive);
    if (!authScreenActive) {
      return;
    }

    const status = $("adminStatus");
    if (status) {
      status.textContent = "";
      status.className = "admin-status";
    }
  }

  function isBackForwardNavigation(event) {
    if (event?.persisted) {
      return true;
    }

    try {
      const navigation = window?.performance?.getEntriesByType?.("navigation")?.[0];
      if (navigation?.type === "back_forward") {
        return true;
      }
    } catch (error) {
    }

    try {
      return window?.performance?.navigation?.type === 2;
    } catch (error) {
      return false;
    }
  }

  function scrollWindowToTop() {
    const run = function () {
      try {
        window?.scrollTo?.({ top: 0, left: 0, behavior: "auto" });
      } catch (error) {
        window?.scrollTo?.(0, 0);
      }
      if (document?.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document?.body) {
        document.body.scrollTop = 0;
      }
    };

    const schedule = typeof window?.requestAnimationFrame === "function"
      ? window.requestAnimationFrame.bind(window)
      : function (callback) { window?.setTimeout?.(callback, 0); };

    run();
    schedule(function () {
      run();
      schedule(run);
    });
    window?.setTimeout?.(run, 90);
  }

  function markAdminMobileBackToTopIntent() {
    if (!isMobileViewport()) {
      return;
    }

    try {
      window?.sessionStorage?.setItem(ADMIN_MOBILE_BACK_TO_TOP_KEY, "1");
    } catch (error) {
    }
  }

  function setupAdminMobileBackToTop() {
    window?.addEventListener("pagehide", markAdminMobileBackToTopIntent);
    window?.addEventListener("popstate", function () {
      if (isMobileViewport()) {
        scrollWindowToTop();
      }
    });
    window?.addEventListener("pageshow", function (event) {
      if (isMobileViewport() && isBackForwardNavigation(event)) {
        scrollWindowToTop();
      }
    });
  }

  function categoryName(category) {
    return textValue(category?.name, currentLocale()) || category?.slug || "";
  }

  function productName(product) {
    return textValue(product?.name, currentLocale()) || product?.id || "";
  }

  function addOnName(addOn) {
    return textValue(addOn?.name, currentLocale()) || addOn?.id || "";
  }

  function getMenuState() {
    return state?.states?.menuState || { categories: [], addOns: [], products: [] };
  }

  function getBrandConfig() {
    return state?.states?.brandConfig || {};
  }

  function setupPageNavigationTransition() {
    shared?.setupPageTransition?.({
      selector: '.admin-public-link[href="index.html"]',
      message: function () {
        return t("transitionToPublic");
      },
      brand: function () {
        return textValue(getBrandConfig()?.brand?.name, currentLocale()) || t("adminAboutProduct");
      },
      durationMs: 220,
    });
  }

  function getProductById(productId) {
    return getMenuState()?.products?.find(function (product) {
      return product?.id === productId;
    }) || null;
  }

  function getCategoryBySlug(slug) {
    return getMenuState()?.categories?.find(function (category) {
      return category?.slug === slug;
    }) || null;
  }

  function getAddOnById(addOnId) {
    return getMenuState()?.addOns?.find(function (addOn) {
      return addOn?.id === addOnId;
    }) || null;
  }

  function getOffersState() {
    const offers = getMenuState()?.offers || {};
    return {
      combos: Array.isArray(offers?.combos) ? offers.combos : [],
      discounts: Array.isArray(offers?.discounts) ? offers.discounts : [],
    };
  }

  function getComboById(comboId) {
    return getOffersState()?.combos?.find(function (combo) {
      return combo?.id === comboId;
    }) || null;
  }

  function offerName(offer) {
    return textValue(offer?.name, currentLocale()) || offer?.id || "";
  }

  function comboProductsText(combo) {
    return (Array.isArray(combo?.items) ? combo.items : [])
      ?.map(function (item) {
        const product = getProductById(item?.productId);
        return (item?.quantity || 1) + "x " + (product ? productName(product) : item?.productId);
      })
      ?.join(", ");
  }

  function comboHasUnavailableProducts(combo) {
    return (Array.isArray(combo?.items) ? combo.items : [])?.some(function (item) {
      const product = getProductById(item?.productId);
      return !product || normalizeProductStatus(product) !== "active" || product?.available === false;
    });
  }

  function normalizeProductStatus(product) {
    if (typeof product?.active === "boolean") {
      return product.active ? "active" : "inactive";
    }
    if (product?.status === "inactive") {
      return "inactive";
    }
    return "active";
  }

  function refreshStates() {
    state.states = system?.getStates();
    state.savedThemePreset = resolveSelectedThemePreset(state?.states?.brandConfig?.appearance || {});
  }

  const auth = adminAuthFactory?.createAuthHelpers({
    keys: AUTH_KEYS,
    sessionDurationMs: SESSION_DURATION_MS,
  });

  const hasPassword = auth?.hasPassword;
  const savePassword = auth?.savePassword;
  const validatePassword = auth?.validatePassword;
  const createSession = auth?.createSession;
  const isAuthenticated = auth?.isAuthenticated;
  const renewSession = auth?.renewSession;

  function getCloudConfig() {
    return state?.states?.cloudConfig || system?.getStates()?.cloudConfig || {};
  }

  function isOnlineAdminMode() {
    const cloud = getCloudConfig();
    return Boolean(cloud?.enabled && system?.isSupabaseConfigured(cloud));
  }

  function ensureCloudActionReady() {
    if (!isOnlineAdminMode()) {
      showStatus(t("cloudActionUnavailable"), "warn");
      return false;
    }

    if (!isAdminAuthenticated()) {
      stopCloudMonitor();
      renderAuth();
      showStatus(t("cloudActionLoginRequired"), "warn");
      return false;
    }

    return true;
  }

  function canUseOnlineReports() {
    return Boolean(
      isOnlineAdminMode()
      && isAdminAuthenticated()
      && typeof system?.loadOnlineReportData === "function"
    );
  }

  function reportSourceMessage() {
    if (!canUseOnlineReports()) {
      return t("reportsLocalOnly");
    }
    if (state?.onlineReportsLoading) {
      return t("reportsOnlineLoading");
    }
    if (state?.onlineReportData) {
      return t("reportsOnlineActive");
    }
    if (state?.onlineReportsError) {
      return t("reportsOnlineFallback");
    }
    return t("reportsOnlineLoading");
  }

  function currentReportData(limit) {
    const status = system?.getSystemStatus();
    const online = state?.onlineReportData;
    const topLimit = limit || 5;

    if (online) {
      return {
        source: "online",
        status,
        summary: online?.summary || {},
        topAdded: (online?.topAdded || []).slice(0, topLimit),
        topViewed: (online?.topViewed || []).slice(0, topLimit),
        topPayments: (online?.paymentChoices || []).slice(0, topLimit),
        topServices: (online?.serviceChoices || []).slice(0, topLimit),
        topSearchNoResults: (online?.searchesWithNoResult || []).slice(0, topLimit),
      };
    }

    return {
      source: "local",
      status,
      summary: system?.getReportSummary?.() || {},
      topAdded: system?.getTopAdded(topLimit) || [],
      topViewed: system?.getTopViewed(topLimit) || [],
      topPayments: system?.getTopPaymentChoices?.(topLimit) || [],
      topServices: system?.getTopServiceChoices?.(topLimit) || [],
      topSearchNoResults: system?.getTopSearchNoResults?.(topLimit) || [],
    };
  }

  function loadOnlineReportsForActiveTab(force) {
    if (state?.activeTab !== "reports") {
      return;
    }

    if (!canUseOnlineReports()) {
      state.onlineReportData = null;
      state.onlineReportsLoading = false;
      state.onlineReportsError = "";
      return;
    }

    if (state?.onlineReportsLoading) {
      return;
    }

    if (!force && (state?.onlineReportData || state?.onlineReportsError)) {
      return;
    }

    state.onlineReportsLoading = true;
    state.onlineReportsError = "";

    system?.loadOnlineReportData?.(2000)
      ?.then(function (data) {
        state.onlineReportData = data || null;
        state.onlineReportsError = "";
      })
      ?.catch(function (error) {
        state.onlineReportData = null;
        state.onlineReportsError = error?.message || String(error);
        console.warn("Falha ao carregar métricas online; usando fallback local.", error);
      })
      ?.finally(function () {
        state.onlineReportsLoading = false;
        if (state?.activeTab === "reports") {
          renderDashboard();
        }
      });
  }

  function isAdminAuthenticated() {
    return isOnlineAdminMode() ? auth?.isSupabaseAuthenticated?.() : isAuthenticated();
  }

  function renewAdminSession() {
    return isOnlineAdminMode() ? auth?.getSupabaseSession?.() : renewSession();
  }

  function syncOnlineStateAfterLogin(notifyError) {
    if (!isOnlineAdminMode()) {
      return Promise.resolve(false);
    }

    return Promise.resolve(system?.loadCloudCatalog())
      .then(function () {
        refreshStates();
        return true;
      })
      .catch(function (error) {
        console.warn("Falha ao sincronizar dados online após o login.", error);
        if (notifyError) {
          showStatus(t("cloudLoadError"), "warn");
        }
        return false;
      });
  }

  function logout() {
    auth?.logout();
    stopCloudMonitor();
  }

  function showStatus(message, type, options) {
    const status = $("adminStatus");
    const text = String(message || "").trim();
    const statusType = type || "";
    const signature = normalizeFeedbackText(statusType + " " + text);
    const now = Date.now();
    const authScreenActive = isAuthScreenActive();
    const toastOnlyFeedback = isCompactAdminViewport() || authScreenActive;

    if (state?.adminStatusTimer) {
      window?.clearTimeout?.(state.adminStatusTimer);
      state.adminStatusTimer = null;
    }

    if (!text) {
      if (status) {
        status.textContent = "";
        status.className = "admin-status";
      }
      state.adminStatusSignature = "";
      state.adminStatusAt = 0;
      return;
    }

    if (
      signature
      && state?.adminStatusSignature === signature
      && now - Number(state?.adminStatusAt || 0) < Number(options?.dedupeMs || 1400)
    ) {
      return;
    }

    state.adminStatusSignature = signature;
    state.adminStatusAt = now;

    if (toastOnlyFeedback) {
      if (status) {
        status.textContent = "";
        status.className = "admin-status";
      }

      if (!authScreenActive && isProgressFeedbackMessage(text)) {
        return;
      }

      showAdminToast(
        text,
        statusType || (isProgressFeedbackMessage(text) ? "warn" : "ok")
      );
      return;
    }

    if (!status) {
      return;
    }

    status.textContent = text;
    status.className = "admin-status " + (statusType ? "admin-status-" + statusType : "");

    const persistent = Boolean(options?.persist || statusType === "error" || isProgressFeedbackMessage(text));
    if (!persistent) {
      const timeout = Number(options?.timeout || (statusType === "warn" ? 4200 : 3200));
      state.adminStatusTimer = window?.setTimeout?.(function () {
        if (state?.adminStatusSignature === signature) {
          showStatus("", "");
        }
      }, timeout);
    }

    if (text && statusType !== "warn" && !isProgressFeedbackMessage(text)) {
      const toastMessage = text;
      const toastType = statusType;
      window?.setTimeout?.(function () {
        if (!hasInlineFeedbackMessage(toastMessage)) {
          showAdminToast(toastMessage, toastType);
        }
      }, prefersReducedMotion() ? 0 : 180);
    }
  }

  function clearStatus() {
    showStatus("", "");
  }

  function showAdminToast(message, type) {
    const text = String(message || "").trim();
    if (!text || !document?.body) {
      return;
    }

    const signature = normalizeFeedbackText((type || "ok") + " " + text);
    const now = Date.now();
    if (showAdminToast.lastSignature === signature && now - Number(showAdminToast.lastAt || 0) < 1800) {
      return;
    }
    showAdminToast.lastSignature = signature;
    showAdminToast.lastAt = now;

    let stack = document.querySelector(".admin-toast-stack");
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "admin-toast-stack";
      stack.setAttribute("aria-live", "polite");
      stack.setAttribute("aria-relevant", "additions");
      document.body.appendChild(stack);
    }

    const toast = document.createElement("p");
    toast.className = "admin-toast admin-toast-" + (type || "ok");
    toast.textContent = text;
    stack.appendChild(toast);

    window.setTimeout(function () {
      toast.classList.add("admin-toast--leaving");
      window.setTimeout(function () {
        toast.remove();
        if (!stack.querySelector(".admin-toast")) {
          stack.remove();
        }
      }, prefersReducedMotion() ? 0 : 180);
    }, prefersReducedMotion() ? 1600 : 3200);
  }

  function normalizeFeedbackText(value) {
    return String(value || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function hasInlineFeedbackMessage(message) {
    const normalized = normalizeFeedbackText(message);
    if (!normalized || !document?.querySelectorAll) {
      return false;
    }

    return Array.from(document.querySelectorAll(".admin-inline-status")).some(function (item) {
      return item?.isConnected && normalizeFeedbackText(item?.textContent) === normalized;
    });
  }

  function isProgressFeedbackMessage(message) {
    const normalized = normalizeFeedbackText(message);
    return [
      t("actionInProgress"),
      t("savingChanges"),
      t("cloudLoading"),
    ].some(function (item) {
      return normalizeFeedbackText(item) === normalized;
    });
  }

  function validationError(message, fieldName) {
    const error = new Error(message);
    error.fieldName = fieldName;
    return error;
  }

  function friendlyAdminErrorMessage(error, fallbackKey) {
    if (error?.userMessage) {
      return String(error.userMessage);
    }

    const rawMessage = error instanceof Error
      ? String(error?.message || "")
      : String(error || "");
    const message = rawMessage?.trim();
    const lower = message?.toLowerCase();

    if (
      lower?.includes("invalid login credentials")
      || lower?.includes("invalid credentials")
      || lower?.includes("email not confirmed")
    ) {
      return t("authInvalidCredentials");
    }

    if (lower?.includes("session") && lower?.includes("expired")) {
      return t("sessionExpired");
    }

    if (
      lower?.includes("failed to fetch")
      || lower?.includes("network")
      || lower?.includes("supabase")
      || lower?.includes("fetch failed")
    ) {
      return t("onlineConnectionFriendly");
    }

    return message || t(fallbackKey || "requiredField");
  }

  function clearFormFieldErrors(form) {
    form?.querySelectorAll?.(".admin-field-error")?.forEach(function (error) {
      error?.remove();
    });
    form?.querySelectorAll?.('[aria-invalid="true"]')?.forEach(function (field) {
      field?.removeAttribute("aria-invalid");
      field?.removeAttribute("aria-describedby");
    });
  }

  function clearFieldError(field) {
    if (!field || !field?.name) {
      return;
    }

    field?.removeAttribute("aria-invalid");
    field?.removeAttribute("aria-describedby");
    field?.closest?.("label")?.querySelector?.(".admin-field-error")?.remove();
  }

  function showFieldValidation(form, error, message) {
    if (!form || !error?.fieldName) {
      return false;
    }

    clearFormFieldErrors(form);

    const field = form?.elements?.[error?.fieldName];
    const control = field instanceof Element ? field : field?.[0];
    const target = control?.closest?.("label") || control?.parentElement;
    if (!control || !target) {
      return false;
    }

    const errorId = "admin-field-error-" + String(error?.fieldName || "")?.replace(/[^a-z0-9_-]/gi, "-");
    const inline = document?.createElement("span");
    inline.id = errorId;
    inline.className = "admin-field-error";
    inline.setAttribute("role", "alert");
    inline.textContent = message;

    control?.setAttribute("aria-invalid", "true");
    control?.setAttribute("aria-describedby", errorId);
    target?.appendChild(inline);
    control?.focus?.({ preventScroll: false });
    return true;
  }

  function showContextStatus(targetSelector, message, type, options) {
    const target = typeof targetSelector === "string"
      ? document?.querySelector(targetSelector)
      : targetSelector;
    const text = String(message || "").trim();
    if (!target || !text) {
      return;
    }

    const statusType = type || "ok";
    if (isCompactAdminViewport()) {
      showAdminToast(text, statusType);
      return;
    }

    const existing = target?.querySelector?.(".admin-inline-status");
    if (
      existing
      && normalizeFeedbackText(existing?.textContent) === normalizeFeedbackText(text)
      && existing?.classList?.contains("admin-inline-status-" + statusType)
    ) {
      return;
    }

    target?.querySelectorAll?.(".admin-inline-status")?.forEach(function (item) {
      item?.remove();
    });

    const inline = document?.createElement("p");
    inline.className = "admin-inline-status admin-inline-status-" + statusType;
    inline.setAttribute("role", statusType === "error" ? "alert" : "status");
    inline.textContent = text;

    const submit = target?.querySelector?.('button[type="submit"]');
    const actionRow = submit?.closest?.(".admin-actions-row");
    const reference = actionRow?.parentElement === target
      ? actionRow
      : submit?.parentElement === target
        ? submit
        : null;

    if (reference) {
      target?.insertBefore(inline, reference);
    } else {
      target?.appendChild(inline);
    }

    if (!options?.persist && statusType !== "error") {
      const signature = normalizeFeedbackText(statusType + " " + text);
      window?.setTimeout?.(function () {
        if (
          inline?.isConnected
          && normalizeFeedbackText(statusType + " " + inline?.textContent) === signature
        ) {
          inline?.remove();
        }
      }, Number(options?.timeout || 5200));
    }
  }

  function scheduleUiTask(callback) {
    if (typeof callback !== "function") {
      return;
    }

    const schedule = typeof window?.requestAnimationFrame === "function"
      ? window.requestAnimationFrame.bind(window)
      : function (fn) { window?.setTimeout?.(fn, 0); };

    schedule(function () {
      schedule(callback);
    });
  }

  function prefersReducedMotion() {
    return Boolean(window?.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches);
  }

  function resolveAdminTarget(target) {
    return typeof target === "string"
      ? document?.querySelector(target)
      : target;
  }

  function firstFocusableField(target, selector) {
    if (!target) {
      return null;
    }

    const query = selector || 'input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled])';
    return target?.matches?.(query) ? target : target?.querySelector?.(query);
  }

  function highlightAdminTarget(target, duration) {
    const element = resolveAdminTarget(target);
    if (!element) {
      return;
    }

    element?.classList?.remove("admin-card--attention");
    void element?.offsetWidth;
    element?.classList?.add("admin-card--attention");
    window?.setTimeout?.(function () {
      element?.classList?.remove("admin-card--attention");
    }, Number(duration || 1100));
  }

  function guideAdminTarget(target, options) {
    const element = resolveAdminTarget(target);
    if (!element) {
      return;
    }

    if (options?.message) {
      showContextStatus(options?.statusTarget || element, options?.message, options?.type || "ok");
      if (normalizeFeedbackText($("adminStatus")?.textContent) === normalizeFeedbackText(options?.message)) {
        showStatus("", "");
      }
    }

    if (options?.highlight !== false) {
      highlightAdminTarget(element, options?.highlightDuration);
    }

    if (options?.scroll !== false) {
      element?.scrollIntoView?.({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: options?.block || "start",
      });
    }

    const focusTarget = options?.focus === false
      ? null
      : firstFocusableField(element, options?.focusSelector);
    focusTarget?.focus?.({ preventScroll: true });
    window?.setTimeout?.(function () {
      focusTarget?.focus?.({ preventScroll: true });
    }, prefersReducedMotion() ? 0 : Number(options?.focusDelay || 120));
  }

  function focusAdminForm(formSelector, options) {
    const form = resolveAdminTarget(formSelector);
    const target = form?.closest?.(".admin-card") || form;
    guideAdminTarget(target, {
      ...options,
      statusTarget: form,
    });
  }

  function setButtonBusy(button, busy, label) {
    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    if (busy) {
      button.dataset.originalText = button.dataset.originalText || button.textContent || "";
      button.disabled = true;
      button.setAttribute("aria-busy", "true");
      button.classList.add("admin-action-busy");
      if (label) {
        button.textContent = label;
      }
      return;
    }

    button.disabled = false;
    button.removeAttribute("aria-busy");
    button.classList.remove("admin-action-busy");
    if (button.dataset.originalText) {
      button.textContent = button.dataset.originalText;
    }
    delete button.dataset.originalText;
  }

  function combineAdminFeedback(primaryMessage, detailMessage) {
    const primary = String(primaryMessage || "").trim();
    const detail = String(detailMessage || "").trim();

    if (!primary) {
      return detail;
    }
    if (!detail) {
      return primary;
    }
    if (normalizeFeedbackText(primary) === normalizeFeedbackText(detail)) {
      return primary;
    }

    return primary + " " + detail;
  }

  function shouldAutoPublishAdminForm(formId) {
    return [
      "productForm",
      "categoryForm",
      "addOnForm",
      "comboForm",
      "settingsForm",
      "product-action",
      "category-action",
      "add-on-action",
      "combo-action",
    ].includes(String(formId || ""))
      && isOnlineAdminMode();
  }

  function getAdminSavePendingMessage(formId) {
    return shouldAutoPublishAdminForm(formId) ? t("savingAndPublishing") : t("savingChanges");
  }

  async function publishAdminChangesAfterSave(options) {
    const localMessage = String(options?.localMessage || t("savingChanges")).trim();
    if (!shouldAutoPublishAdminForm(options?.formId)) {
      return {
        message: localMessage,
        type: "ok",
        publishedOnline: false,
      };
    }

    try {
      const result = await system?.replaceCloudCatalog?.();
      const hasImageUploadWarnings = Boolean(result?.imageUploadWarnings?.length);
      return {
        message: hasImageUploadWarnings ? t("cloudPublishedWithImageWarning") : t("savedAndPublishedOnline"),
        type: hasImageUploadWarnings ? "warn" : "ok",
        publishedOnline: true,
      };
    } catch (error) {
      console.error("Falha ao publicar automaticamente após salvar.", error);
      return {
        message: combineAdminFeedback(
          t("savedLocallyPublishFailed"),
          friendlyAdminErrorMessage(error, options?.fallbackKey || "cloudPublishError")
        ),
        type: "warn",
        publishedOnline: false,
        error,
      };
    }
  }

  function handleAsyncButton(button, pendingMessage, task, fallbackKey) {
    if (!(button instanceof HTMLButtonElement) || typeof task !== "function") {
      return Promise.resolve(false);
    }

    setButtonBusy(button, true, pendingMessage || t("actionInProgress"));
    if (pendingMessage) {
      showStatus(pendingMessage, "ok");
    }

    return Promise.resolve()
      .then(task)
      .catch(function (error) {
        console.error("Falha ao executar ação do Admin.", error);
        showStatus(friendlyAdminErrorMessage(error, fallbackKey || "requiredField"), "error");
      })
      .finally(function () {
        setButtonBusy(button, false);
      });
  }

  function getAdminEditGuard() {
    if (!state.adminEditGuard || typeof state.adminEditGuard !== "object") {
      state.adminEditGuard = {
        dirtyAreas: {},
        formDrafts: {},
        pendingRemoteUpdate: null,
      };
    }

    state.adminEditGuard.dirtyAreas = state.adminEditGuard.dirtyAreas || {};
    state.adminEditGuard.formDrafts = state.adminEditGuard.formDrafts || {};
    return state.adminEditGuard;
  }

  function isTrackedAdminFormId(formId) {
    return Boolean(ADMIN_FORM_AREAS[formId]);
  }

  function settingsAreaForFieldName(name) {
    const field = String(name || "");
    if (/^(pickupAddress|pickupNote|location)/.test(field)) {
      return "location";
    }
    if (/^(scheduleEnabled|day-)/.test(field)) {
      return "hours";
    }
    if (field === "themePreset" || /^theme/.test(field)) {
      return "appearance";
    }
    return "settings";
  }

  function allAdminAreasForForm(formId) {
    if (formId === "settingsForm") {
      return ["settings", "location", "hours", "appearance"];
    }

    const area = ADMIN_FORM_AREAS[formId];
    return area ? [area] : [];
  }

  function adminAreasForFormTarget(formId, target) {
    const baseArea = ADMIN_FORM_AREAS[formId];
    if (!baseArea) {
      return [];
    }

    if (formId !== "settingsForm") {
      return [baseArea];
    }

    const fieldArea = settingsAreaForFieldName(target?.name);
    return fieldArea && fieldArea !== "settings"
      ? ["settings", fieldArea]
      : ["settings"];
  }

  function setAdminDirtyArea(area, dirty) {
    if (!area) {
      return;
    }

    const guard = getAdminEditGuard();
    if (dirty) {
      guard.dirtyAreas[area] = true;
      return;
    }

    delete guard.dirtyAreas[area];
  }

  function setAdminDirtyAreas(areas, dirty) {
    (Array.isArray(areas) ? areas : [areas]).forEach(function (area) {
      setAdminDirtyArea(area, dirty);
    });
  }

  function readAdminFormDraft(form) {
    const fields = {};
    Array?.from(form?.elements || [])?.forEach(function (control) {
      const name = String(control?.name || "");
      const type = String(control?.type || "").toLowerCase();
      if (!name || control?.disabled || ["button", "submit", "reset", "file"].includes(type)) {
        return;
      }

      if (type === "radio") {
        if (!fields[name]) {
          fields[name] = { kind: "radio", value: "" };
        }
        if (control?.checked) {
          fields[name] = { kind: "radio", value: String(control?.value || "") };
        }
        return;
      }

      if (type === "checkbox") {
        fields[name] = {
          kind: "checkbox",
          checked: Boolean(control?.checked),
          value: String(control?.value || "on"),
        };
        return;
      }

      fields[name] = {
        kind: type || "text",
        value: String(control?.value ?? ""),
      };
    });

    return {
      fields: fields,
      capturedAt: new Date()?.toISOString(),
    };
  }

  function captureAdminFormDraft(form) {
    if (!(form instanceof HTMLFormElement) || !isTrackedAdminFormId(form?.id) || form?.id === "productForm") {
      return;
    }

    const nextDraft = readAdminFormDraft(form);
    const previousDraft = getAdminEditGuard()?.formDrafts?.[form.id];
    if (form?.id === "comboForm" && previousDraft?.fields) {
      Object.keys(previousDraft.fields).forEach(function (fieldName) {
        if (
          (fieldName?.startsWith("comboProduct-") || fieldName?.startsWith("comboQty-"))
          && !Object.prototype.hasOwnProperty.call(nextDraft.fields, fieldName)
        ) {
          nextDraft.fields[fieldName] = previousDraft.fields[fieldName];
        }
      });
    }

    getAdminEditGuard().formDrafts[form.id] = nextDraft;
  }

  function captureActiveAdminFormDrafts() {
    captureProductFormDraft();
    ["categoryForm", "addOnForm", "comboForm", "settingsForm", "cloudForm"].forEach(function (formId) {
      const form = $(formId);
      if (form && isAdminFormDraftActive(formId)) {
        captureAdminFormDraft(form);
      }
    });
  }

  function getAdminFormDraft(formId) {
    return getAdminEditGuard()?.formDrafts?.[formId] || null;
  }

  function adminDraftFieldValue(formId, name, fallback) {
    const entry = getAdminFormDraft(formId)?.fields?.[name];
    return entry && Object.prototype.hasOwnProperty.call(entry, "value")
      ? entry.value
      : fallback;
  }

  function adminDraftFieldChecked(formId, name, fallback) {
    const entry = getAdminFormDraft(formId)?.fields?.[name];
    return entry?.kind === "checkbox" ? Boolean(entry?.checked) : fallback;
  }

  function currentDraftFieldValue(name, fallback) {
    return state?.formDraftContext
      ? adminDraftFieldValue(state.formDraftContext, name, fallback)
      : fallback;
  }

  function currentDraftFieldChecked(name, fallback) {
    return state?.formDraftContext
      ? adminDraftFieldChecked(state.formDraftContext, name, fallback)
      : fallback;
  }

  function updateAdminFormCancelButtons() {
    const categoryCancel = $("cancelCategoryEdit");
    if (categoryCancel) {
      categoryCancel.hidden = !(state?.editingCategorySlug || isAdminFormDraftActive("categoryForm"));
    }

    const addOnCancel = $("cancelAddOnEdit");
    if (addOnCancel) {
      addOnCancel.hidden = !(state?.editingAddOnId || isAdminFormDraftActive("addOnForm"));
    }

    const comboCancel = $("cancelComboEdit");
    if (comboCancel) {
      comboCancel.hidden = !(state?.editingComboId || isAdminFormDraftActive("comboForm"));
    }

  }

  function hasSettingsUnsavedChanges() {
    return Boolean(isAdminFormDraftActive("settingsForm") || getPreviewThemePreset());
  }

  function updateSettingsDirtyUi() {
    const dirty = hasSettingsUnsavedChanges();
    const notice = $("settingsDirtyNotice");
    const saveBar = $("settingsSaveBar");
    const saveBarStatus = $("settingsSaveBarStatus");

    if (notice) {
      notice.textContent = dirty ? t("settingsUnsavedChanges") : "";
      notice.hidden = !dirty;
    }

    if (saveBar) {
      saveBar.classList.toggle("admin-settings-save-bar--dirty", dirty);
    }

    if (saveBarStatus) {
      saveBarStatus.textContent = dirty ? t("settingsSaveBarDirty") : t("settingsSaveBarClean");
    }
  }

  function isMobileFormSaveBarDirty(formId) {
    if (formId === "productForm") {
      return Boolean(state?.hasUnsavedProductChanges || state?.productFormDraft);
    }
    return isAdminFormDraftActive(formId);
  }

  function updateAdminMobileSaveBarsUi() {
    document?.querySelectorAll?.("[data-admin-mobile-save-bar-form]")?.forEach(function (saveBar) {
      const formId = String(saveBar?.getAttribute("data-admin-mobile-save-bar-form") || "");
      const dirty = isMobileFormSaveBarDirty(formId);
      const status = saveBar?.querySelector?.("[data-admin-mobile-save-bar-status]");
      saveBar?.classList?.toggle("admin-settings-save-bar--dirty", dirty);
      if (status) {
        status.textContent = dirty ? t("settingsSaveBarDirty") : t("settingsSaveBarClean");
      }
    });
  }

  function markAdminFormDirty(target, options) {
    const form = target instanceof HTMLFormElement ? target : target?.closest?.("form");
    const formId = form?.id || "";
    if (!isTrackedAdminFormId(formId) || formId === "productForm") {
      return;
    }

    setAdminDirtyAreas(options?.areas || adminAreasForFormTarget(formId, target), true);
    captureAdminFormDraft(form);
    updateAdminFormCancelButtons();
    updateSettingsDirtyUi();
    updateAdminMobileSaveBarsUi();
  }

  function markAdminFormDirtyById(formId, areas) {
    const form = $(formId);
    if (!(form instanceof HTMLFormElement) || !isTrackedAdminFormId(formId) || formId === "productForm") {
      return;
    }

    setAdminDirtyAreas(areas || allAdminAreasForForm(formId), true);
    captureAdminFormDraft(form);
    updateAdminFormCancelButtons();
    updateSettingsDirtyUi();
    updateAdminMobileSaveBarsUi();
  }

  function clearAdminFormEditing(formId) {
    const guard = getAdminEditGuard();
    delete guard.formDrafts[formId];
    setAdminDirtyAreas(allAdminAreasForForm(formId), false);

    if (formId === "productForm") {
      state.editingProductId = "";
      clearProductEditingState();
    }
    if (formId === "categoryForm") {
      state.editingCategorySlug = "";
    }
    if (formId === "addOnForm") {
      state.editingAddOnId = "";
    }
    if (formId === "comboForm") {
      state.editingComboId = "";
    }
    updateAdminFormCancelButtons();
    updateSettingsDirtyUi();
    updateAdminMobileSaveBarsUi();
  }

  function clearAllAdminEditingState() {
    clearProductEditingState();
    state.editingProductId = "";
    state.editingCategorySlug = "";
    state.editingAddOnId = "";
    state.editingComboId = "";
    state.pendingRemoteProductUpdate = null;
    state.adminEditGuard = {
      dirtyAreas: {},
      formDrafts: {},
      pendingRemoteUpdate: null,
    };
    clearThemePreviewState();
  }

  function hasAdminDirtyAreas() {
    const dirtyAreas = getAdminEditGuard()?.dirtyAreas || {};
    return Object.keys(dirtyAreas).some(function (area) {
      return Boolean(dirtyAreas[area]);
    });
  }

  function isAdminFormDraftActive(formId) {
    const guard = getAdminEditGuard();
    if (guard?.formDrafts?.[formId]) {
      return true;
    }

    return allAdminAreasForForm(formId).some(function (area) {
      return Boolean(guard?.dirtyAreas?.[area]);
    });
  }

  function isAdminFormDirty() {
    return hasAdminDirtyAreas();
  }

  function hasActiveAdminDraft() {
    return Boolean(isProductEditingActive())
      || Boolean(state?.editingCategorySlug)
      || Boolean(state?.editingAddOnId)
      || Boolean(state?.editingComboId)
      || isAdminFormDraftActive("categoryForm")
      || isAdminFormDraftActive("addOnForm")
      || isAdminFormDraftActive("comboForm")
      || isAdminFormDraftActive("settingsForm")
      || isAdminFormDraftActive("cloudForm")
      || Boolean(getPreviewThemePreset());
  }

  function isDestructiveAdminStateChange(detail) {
    return ADMIN_DESTRUCTIVE_STATE_EVENTS.has(String(detail?.type || ""));
  }

  function shouldDeferAdminStateChange(detail) {
    return Boolean(hasActiveAdminDraft() && isDestructiveAdminStateChange(detail));
  }

  function deferRemoteAdminUpdate(detail, options) {
    const guard = getAdminEditGuard();
    const pendingType = String(detail?.type || options?.type || "cloud-sync-to-local");
    const shouldKeepSnapshot = pendingType === "cloud-sync-to-local" || pendingType === "external-storage";
    const wasPending = Boolean(guard?.pendingRemoteUpdate);
    guard.pendingRemoteUpdate = {
      type: pendingType,
      operation: String(options?.operation || ""),
      detail: detail || {},
      snapshot: shouldKeepSnapshot ? system?.getStates?.() : null,
      receivedAt: new Date()?.toISOString(),
    };

    if (isProductEditingActive()) {
      state.pendingRemoteProductUpdate = {
        type: pendingType,
        receivedAt: guard.pendingRemoteUpdate.receivedAt,
      };
    }

    updateProductSyncNotice();
    if (!wasPending) {
      showStatus(isProductEditingActive() ? t("productSyncPending") : t("adminSyncPending"), "warn");
    }
  }

  function guardCloudActionWhileEditing(options) {
    if (!hasActiveAdminDraft()) {
      return false;
    }

    if (options?.deferOperation) {
      deferRemoteAdminUpdate(
        { type: "cloud-sync-to-local" },
        { operation: options.deferOperation }
      );
    } else {
      showStatus(t("adminSyncPending"), "warn");
    }
    return true;
  }

  function refreshAndRenderAfterRemote(detail) {
    if (shouldDeferAdminStateChange(detail)) {
      deferRemoteAdminUpdate(detail);
      return false;
    }

    refreshStates();
    renderDashboard();
    return true;
  }

  function applyPendingAdminUpdate(options) {
    const guard = getAdminEditGuard();
    const pending = guard?.pendingRemoteUpdate;
    if (!pending || hasActiveAdminDraft()) {
      return Promise.resolve(false);
    }

    guard.pendingRemoteUpdate = null;
    state.pendingRemoteProductUpdate = null;
    updateProductSyncNotice();

    if (pending?.operation === "sync-cloud-to-local") {
      showStatus(t("cloudLoading"), "ok");
      return Promise.resolve(system?.syncCloudToLocal?.())
        .then(function () {
          refreshStates();
          renderDashboard({ preserveProductDraft: false, preserveAdminDrafts: false });
          showStatus(t("cloudLoaded"), "ok");
          return true;
        })
        .catch(function (error) {
          console.error("Falha ao aplicar atualização pendente.", error);
          showStatus(t("cloudLoadError"), "error");
          return false;
        });
    }

    if (pending?.snapshot) {
      const currentSnapshot = system?.getStates?.() || {};
      // A stale remote snapshot must not undo the form the admin just saved.
      const nextMenuState = options?.preserveMenuState
        ? currentSnapshot?.menuState
        : pending.snapshot.menuState;
      const nextBrandConfig = options?.preserveBrandConfig
        ? currentSnapshot?.brandConfig
        : pending.snapshot.brandConfig;
      const nextCloudConfig = options?.preserveCloudConfig
        ? currentSnapshot?.cloudConfig
        : pending.snapshot.cloudConfig;

      system?.setMenuState?.(nextMenuState, { type: "deferred-remote-menu" });
      system?.setBrandConfig?.(nextBrandConfig, { type: "deferred-remote-settings" });
      system?.setCloudConfig?.(nextCloudConfig, { type: "deferred-remote-cloud" });
    }

    refreshStates();
    renderDashboard({ preserveProductDraft: false, preserveAdminDrafts: false });
    showStatus(t("adminSyncApplied"), "ok");
    return Promise.resolve(true);
  }

  function flushPendingAdminUpdate(options) {
    applyPendingAdminUpdate(options)?.catch(function (error) {
      console.error("Falha ao liberar atualização pendente.", error);
      showStatus(t("cloudLoadError"), "error");
    });
  }
  function isProductFormTarget(target) {
    return Boolean(target?.closest?.("#productForm"));
  }

  function isProductEditingActive() {
    return Boolean(state?.editingProductId)
      || Boolean(state?.isProductEditing)
      || Boolean(state?.hasUnsavedProductChanges)
      || Boolean(state?.productFormDraft);
  }

  function productEditingNoticeMessage() {
    if (state?.pendingRemoteProductUpdate || getAdminEditGuard()?.pendingRemoteUpdate) {
      return isProductEditingActive() ? t("productSyncPending") : t("adminSyncPending");
    }
    if (state?.productFormGuidance === "new") {
      return t("newProductReady");
    }
    if (state?.productFormGuidance === "edit" && state?.editingProductId) {
      const product = getProductById(state?.editingProductId);
      return t("editingProduct", { name: productName(product) || state?.productFormGuidanceName || "-" });
    }
    if (state?.hasUnsavedProductChanges) {
      return t("unsavedChanges");
    }
    if (state?.productFormDraft) {
      return t("draftPreserved");
    }
    return "";
  }

  function updateProductSyncNotice() {
    const notice = $("productSyncNotice");
    if (!notice) {
      return;
    }

    const message = productEditingNoticeMessage();
    notice.textContent = message;
    notice.hidden = !message;
  }

  function updateProductCancelButton() {
    const button = $("cancelProductEdit");
    if (!button) {
      return;
    }

    button.hidden = !isProductEditingActive();
  }

  function markProductEditing(options) {
    state.isProductEditing = options?.editing !== false;
    if (options?.editing !== false) {
      setAdminDirtyArea("products", true);
    }
    if (options?.dirty === true) {
      state.hasUnsavedProductChanges = true;
      state.productFormGuidance = "";
      state.productFormGuidanceName = "";
      captureProductFormDraft();
    }
    updateProductSyncNotice();
    updateProductCancelButton();
    updateAdminMobileSaveBarsUi();
  }

  function clearProductDraft() {
    state.productFormDraft = null;
  }

  function clearProductEditingState() {
    state.isProductEditing = false;
    state.hasUnsavedProductChanges = false;
    state.productFormGuidance = "";
    state.productFormGuidanceName = "";
    clearProductDraft();
    state.pendingRemoteProductUpdate = null;
    setAdminDirtyArea("products", false);
    updateProductSyncNotice();
    updateProductCancelButton();
    updateAdminMobileSaveBarsUi();
  }

  function deferRemoteProductSync(detail) {
    const wasPending = Boolean(state?.pendingRemoteProductUpdate);
    state.pendingRemoteProductUpdate = {
      type: String(detail?.type || "cloud-sync-to-local"),
      receivedAt: new Date()?.toISOString(),
    };
    updateProductSyncNotice();
    if (!wasPending) {
      showStatus(t("productSyncPending"), "warn");
    }
  }

  function completeProductEditing() {
    state.editingProductId = "";
    clearProductEditingState();
    renderDashboard({ preserveProductDraft: false });
  }

  function remoteProductUpdateMode(detail) {
    if (!isProductEditingActive()) {
      return "";
    }

    const type = String(detail?.type || "");
    if (type === "cloud-sync-to-local") {
      return "defer";
    }
    if (type === "cloud-status") {
      return "skip";
    }
    return "";
  }

  function applyLocaleToHeader() {
    const selector = $("adminLocaleSelector");
    const supported = getSupportedLocales();
    selector.innerHTML = Object?.keys(supported)
      ?.map(function (localeKey) {
        return '<option value="' + escapeHtml(localeKey) + '">' + escapeHtml(localeDisplayName(localeKey, supported[localeKey])) + "</option>";
      })
      ?.join("");
    selector.value = currentLocale();
    $("adminLocaleLabel").textContent = t("languageLabel");
    document.documentElement.lang = supported[currentLocale()]?.htmlLang || currentLocale();
  }

  function applyTheme() {
    const appearance = getAdminAppliedAppearance();
    const appliedAppearance = shared?.resolveAppliedAppearance?.(appearance) || {
      preset: "",
      theme: appearance?.theme === "light" ? "light" : "dark",
      palette: appearance?.palette || "gold",
    };
    document.documentElement.dataset.theme = appliedAppearance?.theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.palette = appliedAppearance?.palette || "gold";
    if (appliedAppearance?.preset) {
      document.documentElement.dataset.themePreset = appliedAppearance.preset;
    } else {
      delete document.documentElement.dataset.themePreset;
    }
  }

  function applyHeaderTexts() {
    const kicker = document?.querySelector(".admin-kicker");
    const title = document?.querySelector(".admin-title");
    const subtitle = document?.querySelector(".admin-subtitle");
    const link = document?.querySelector(".admin-public-link") || document?.querySelector(".admin-back-link");
    const logoutButton = $("logoutButton");
    const brandName = textValue(getBrandConfig()?.brand?.name, currentLocale()) || "Tobia's Lanches";
    const pageTitle = `${t("panelTitle")} - ${brandName}`;
    const metaDescription = document?.querySelector?.('meta[name="description"]');

    if (kicker) kicker.textContent = t("panelKicker");
    if (title) title.textContent = t("panelTitle");
    if (subtitle) subtitle.textContent = t("panelSubtitle");
    if (link) link.textContent = t("viewPublic");
    if (logoutButton) logoutButton.textContent = t("logout");
    document.title = pageTitle;
    if (metaDescription) metaDescription.setAttribute("content", `${t("panelSubtitle")} ${brandName}.`);
  }

  function renderAuth() {
    const authPanel = $("authPanel");
    const app = $("adminApp");
    const logoutButton = $("logoutButton");
    const firstAccess = !hasPassword();
    const onlineMode = isOnlineAdminMode();

    clearThemePreviewState();
    logoutButton.hidden = true;
    authPanel.hidden = false;
    app.hidden = true;
    app.innerHTML = "";
    applyTheme();
    syncAdminSurfaceMode();

    if (onlineMode) {
      authPanel.innerHTML =
        '<div class="admin-auth-box">' +
        '<h2>' + escapeHtml(t("authSignIn")) + '</h2>' +
        '<p>' + escapeHtml(t("authOnlineDescription")) + '</p>' +
        '<form id="authForm" class="admin-form admin-auth-form">' +
        '<label>' + escapeHtml(t("authEmail")) + '<input type="email" name="email" maxlength="120" inputmode="email" autocomplete="username" autocapitalize="none" spellcheck="false" required></label>' +
        '<label>' + escapeHtml(t("passwordLabel")) + '<input type="password" name="password" minlength="6" maxlength="80" autocomplete="current-password" autocapitalize="none" spellcheck="false" required></label>' +
        '<button type="submit" class="botao botao-principal">' + escapeHtml(t("signIn")) + '</button>' +
        '</form>' +
        '</div>';
      return;
    }

    authPanel.innerHTML =
      '<div class="admin-auth-box">' +
      '<h2>' +
      escapeHtml(firstAccess ? t("authSetPassword") : t("authSignIn")) +
      '</h2>' +
      '<p>' +
      escapeHtml(firstAccess ? t("authSetDescription") : t("authSignDescription")) +
      '</p>' +
      '<form id="authForm" class="admin-form admin-auth-form">' +
      '<label>' +
      escapeHtml(t("passwordLabel")) +
      '<input type="password" name="password" minlength="6" maxlength="60" autocomplete="' +
      (firstAccess ? "new-password" : "current-password") +
      '" autocapitalize="none" spellcheck="false" required>' +
      '</label>' +
      (firstAccess
        ? '<label>' +
          escapeHtml(t("passwordConfirm")) +
          '<input type="password" name="confirmPassword" minlength="6" maxlength="60" autocomplete="new-password" autocapitalize="none" spellcheck="false" required>' +
          '</label>'
        : '') +
      '<button type="submit" class="botao botao-principal">' +
      escapeHtml(firstAccess ? t("savePassword") : t("signIn")) +
      '</button>' +
      '</form>' +
      '</div>';
  }

  function buildTabButton(id, label) {
    const active = state?.activeTab === id;
    return (
      '<button type="button" class="admin-tab' +
      (active ? " admin-tab--active" : "") +
      '" role="tab" aria-selected="' +
      String(active) +
      '" data-admin-tab="' +
      escapeHtml(id) +
      '">' +
      escapeHtml(label) +
      "</button>"
    );
  }

  function getTabsContainer() {
    return document?.querySelector(".admin-tabs");
  }

  function getTabsScrollLeft() {
    const tabs = getTabsContainer();
    return Number(tabs?.scrollLeft || 0);
  }

  function clampScrollLeft(tabs, value) {
    const maxScrollLeft = Math?.max(Number(tabs?.scrollWidth || 0) - Number(tabs?.clientWidth || 0), 0);
    return Math?.min(Math?.max(Number(value || 0), 0), maxScrollLeft);
  }

  function keepActiveTabVisible(previousScrollLeft) {
    const schedule = typeof window?.requestAnimationFrame === "function"
      ? window.requestAnimationFrame.bind(window)
      : function (callback) { window?.setTimeout?.(callback, 0); };

    schedule(function () {
      const tabs = getTabsContainer();
      if (!tabs) {
        return;
      }

      const hasHorizontalScroll = Number(tabs?.scrollWidth || 0) > Number(tabs?.clientWidth || 0) + 1;
      if (!hasHorizontalScroll) {
        state.tabsScrollLeft = 0;
        return;
      }

      tabs.scrollLeft = clampScrollLeft(tabs, previousScrollLeft ?? state?.tabsScrollLeft);

      const activeTab = tabs?.querySelector('.admin-tab[aria-selected="true"]');
      if (!activeTab) {
        state.tabsScrollLeft = tabs?.scrollLeft || 0;
        return;
      }

      const activeStart = Number(activeTab?.offsetLeft || 0);
      const target = activeStart - (Number(tabs?.clientWidth || 0) - Number(activeTab?.offsetWidth || 0)) / 2;
      tabs.scrollLeft = clampScrollLeft(tabs, target);

      state.tabsScrollLeft = Number(tabs?.scrollLeft || 0);
    });
  }

  function renderDashboard(options) {
    if (options?.preserveProductDraft !== false && options?.preserveAdminDrafts !== false) {
      captureActiveAdminFormDrafts();
    }

    const previousTabsScrollLeft = Number?.isFinite(Number(options?.tabsScrollLeft))
      ? Number(options?.tabsScrollLeft)
      : getTabsScrollLeft();

    refreshStates();
    const authPanel = $("authPanel");
    const app = $("adminApp");
    const logoutButton = $("logoutButton");

    authPanel.hidden = true;
    authPanel.innerHTML = "";
    app.hidden = false;
    logoutButton.hidden = false;
    applyTheme();
    syncAdminSurfaceMode();
    app.innerHTML =
      '<div id="adminDashboard" class="admin-dashboard" data-active-tab="' +
      escapeHtml(state?.activeTab) +
      '">' +
      '<div class="admin-tabs" role="tablist" aria-label="' +
      escapeHtml(t("tabsAria")) +
      '">' +
      buildTabButton("products", t("tabProducts")) +
      buildTabButton("categories", t("tabCategories")) +
      buildTabButton("addOns", t("tabAddOns")) +
      buildTabButton("offers", t("tabOffers")) +
      buildTabButton("settings", t("tabSettings")) +
      buildTabButton("cloud", t("tabCloud")) +
      buildTabButton("reports", t("tabReports")) +
      buildTabButton("system", t("tabSystem")) +
      "</div>" +
      renderProductsPanel() +
      renderCategoriesPanel() +
      renderAddOnsPanel() +
      renderOffersPanel() +
      renderSettingsPanel() +
      renderCloudPanel() +
      renderReportsPanel() +
      renderSystemPanel() +
      "</div>";

    syncThemePresetPickerUI(app);
    updateSettingsDirtyUi();
    updateAdminMobileSaveBarsUi();
    updateProductSyncNotice();
    restartCloudMonitor();
    keepActiveTabVisible(previousTabsScrollLeft);
    loadOnlineReportsForActiveTab(false);
  }

  function renderPanel(id, content) {
    const hidden = state?.activeTab !== id;
    return (
      '<section class="admin-tab-panel' +
      (hidden ? " oculto" : "") +
      '" data-admin-tab-panel="' +
      escapeHtml(id) +
      '"' +
      (hidden ? " hidden" : "") +
      ">" +
      content +
      "</section>"
    );
  }

  function resetProductFilters() {
    state.productFilters = {
      search: "",
      category: "all",
      status: "all",
      sort: "menu",
    };
  }

  function getFilteredProducts() {
    const filters = state?.productFilters;
    const products = clone(getMenuState()?.products || []);
    const query = String(filters?.search || "")?.trim()?.toLowerCase();

    return products
      ?.filter(function (product) {
        const searchable = [
          productName(product),
          textValue(product?.description, currentLocale()),
          textValue(product?.longDescription, currentLocale()),
        ]
          ?.concat(Array.isArray(product?.tags) ? product?.tags : [])
          ?.join(" ")
          ?.toLowerCase();

        if (query && !searchable?.includes(query)) {
          return false;
        }
        if (filters?.category !== "all" && product?.category !== filters?.category) {
          return false;
        }
        if (filters?.status === "active" && normalizeProductStatus(product) !== "active") {
          return false;
        }
        if (filters?.status === "inactive" && normalizeProductStatus(product) !== "inactive") {
          return false;
        }
        if (filters?.status === "available" && product?.available === false) {
          return false;
        }
        if (filters?.status === "unavailable" && product?.available !== false) {
          return false;
        }
        if (filters?.status === "featured" && !product?.featured) {
          return false;
        }
        return true;
      })
      ?.sort(function (left, right) {
        const compareMenuOrder = function (leftOrder, rightOrder, leftLabel, rightLabel) {
          const leftSort = Number.isFinite(Number(leftOrder)) ? Number(leftOrder) : Number.MAX_SAFE_INTEGER;
          const rightSort = Number.isFinite(Number(rightOrder)) ? Number(rightOrder) : Number.MAX_SAFE_INTEGER;

          if (leftSort !== rightSort) {
            return leftSort - rightSort;
          }

          return String(leftLabel || "").localeCompare(String(rightLabel || ""), currentLocale());
        };

        if (filters?.sort === "name") {
          return productName(left)?.localeCompare(productName(right), currentLocale());
        }
        if (filters?.sort === "priceAsc") {
          return Number(left?.price || 0) - Number(right?.price || 0);
        }
        if (filters?.sort === "priceDesc") {
          return Number(right?.price || 0) - Number(left?.price || 0);
        }
        if (filters?.sort === "recent") {
          return String(right?.updatedAt || right?.createdAt || "")?.localeCompare(String(left?.updatedAt || left?.createdAt || ""));
        }
        return compareMenuOrder(left?.sortOrder, right?.sortOrder, productName(left), productName(right));
      });
  }

  function renderProductsPanel() {
    const products = getFilteredProducts();
    const categories = getMenuState()?.categories || [];
    const editingProduct = state?.editingProductId ? getProductById(state?.editingProductId) : null;
    const productDraft = getActiveProductDraft();
    const formProduct = productDraft ? { ...(editingProduct || {}), ...productDraft } : editingProduct;

    return renderPanel(
      "products",
      '<div class="admin-panels-grid admin-workspace-grid admin-products-workspace">' +
        '<div class="admin-products-sidebar">' +
        '<article id="admin-products-top" class="admin-card admin-products-tools-card">' +
          "<h2>" + escapeHtml(t("productsTitle")) + "</h2>" +
          '<p class="admin-note">' + escapeHtml(t("productsSubtitle")) + "</p>" +
          renderProductsShortcutNav() +
          renderProductsToolbar(categories) +
          '<p id="productSyncNotice" class="admin-note admin-note--pending"' + (productEditingNoticeMessage() ? "" : " hidden") + ">" + escapeHtml(productEditingNoticeMessage()) + "</p>" +
        "</article>" +
        '<article id="admin-product-form-section" class="admin-card admin-workspace-sidebar admin-products-form-card">' +
          renderProductForm(formProduct, {
            hasActiveDraft: Boolean(productDraft),
            isEditingExisting: Boolean(editingProduct),
          }) +
          '<div class="admin-section-top-actions">' +
          '<a class="admin-section-top-link" href="#admin-products-top">' + escapeHtml(t("backToProductsTop")) + "</a>" +
          "</div>" +
        "</article>" +
        "</div>" +
        '<article id="admin-products-list-section" class="admin-card admin-workspace-main admin-products-list-card">' +
          "<h2>" + escapeHtml(t("productListTitle")) + "</h2>" +
          '<div class="admin-products-list">' +
            (products?.length
              ? products?.map(renderProductCard)?.join("")
              : '<p class="admin-note">' + escapeHtml(t("noProducts")) + "</p>") +
          "</div>" +
        "</article>" +
      "</div>"
    );
  }

  function renderProductsShortcutNav() {
    return (
      '<nav class="admin-settings-nav admin-products-nav" aria-label="' + escapeHtml(t("productsQuickNav")) + '">' +
      '<button type="button" id="adminFocusProductFormBtn">' + escapeHtml(t("addProductShortcut")) + "</button>" +
      '<button type="button" id="adminFocusProductSearchBtn">' + escapeHtml(t("searchProductShortcut")) + "</button>" +
      "</nav>"
    );
  }

  function renderProductsToolbar(categories) {
    return (
      '<div class="admin-toolbar">' +
      '<label class="admin-toolbar-field">' +
      "<span>" + escapeHtml(t("searchLabel")) + "</span>" +
      '<input type="search" id="adminProductSearch" value="' + escapeHtml(state?.productFilters?.search) + '" placeholder="' + escapeHtml(t("searchPlaceholder")) + '">' +
      "</label>" +
      '<label class="admin-toolbar-field">' +
      "<span>" + escapeHtml(t("categoryFilter")) + "</span>" +
      '<select id="adminProductCategory">' +
      '<option value="all">' + escapeHtml(t("allCategories")) + "</option>" +
      categories
        ?.map(function (category) {
          return '<option value="' + escapeHtml(category?.slug) + '"' + (state?.productFilters?.category === category?.slug ? " selected" : "") + ">" + escapeHtml(categoryName(category)) + "</option>";
        })
        ?.join("") +
      "</select>" +
      "</label>" +
      '<label class="admin-toolbar-field">' +
      "<span>" + escapeHtml(t("statusFilter")) + "</span>" +
      '<select id="adminProductStatus">' +
      optionHtml("all", t("allStatuses"), state?.productFilters?.status) +
      optionHtml("active", t("statusActive"), state?.productFilters?.status) +
      optionHtml("inactive", t("statusInactive"), state?.productFilters?.status) +
      optionHtml("available", t("statusAvailable"), state?.productFilters?.status) +
      optionHtml("unavailable", t("statusUnavailable"), state?.productFilters?.status) +
      optionHtml("featured", t("statusFeatured"), state?.productFilters?.status) +
      "</select>" +
      "</label>" +
      '<label class="admin-toolbar-field">' +
      "<span>" + escapeHtml(t("sortLabel")) + "</span>" +
      '<select id="adminProductSort">' +
      optionHtml("menu", t("sortMenuOrder"), state?.productFilters?.sort) +
      optionHtml("recent", t("sortRecent"), state?.productFilters?.sort) +
      optionHtml("name", t("sortName"), state?.productFilters?.sort) +
      optionHtml("priceAsc", t("sortPriceAsc"), state?.productFilters?.sort) +
      optionHtml("priceDesc", t("sortPriceDesc"), state?.productFilters?.sort) +
      "</select>" +
      "</label>" +
      '<div class="admin-toolbar-actions">' +
      '<button type="button" id="adminClearProductFiltersBtn" class="botao botao-secundario admin-toolbar-clear">' + escapeHtml(t("clearFilters")) + "</button>" +
      "</div>" +
      "</div>"
    );
  }

  function focusProductForm(options) {
    const section = document?.querySelector(".admin-products-form-card");
    const form = $("productForm");

    guideAdminTarget(section || form, {
      highlight: Boolean(options?.highlight),
      message: options?.message,
      statusTarget: form,
      focusSelector: 'input[name="namePt"], input[name="nameEn"], select[name="category"], input[name="price"]',
      scroll: options?.scroll !== false,
    });
  }

  function focusProductSearch() {
    const searchField = $("adminProductSearch");
    const target = document?.querySelector(".admin-products-list-card") || searchField;

    guideAdminTarget(target, {
      highlight: true,
      focusSelector: "#adminProductSearch",
      statusTarget: target,
    });
  }

  function startNewProductFlow() {
    clearAdminFormEditing("productForm");
    state.editingProductId = "";
    state.productFormGuidance = "new";
    state.productFormGuidanceName = "";
    renderDashboard({ preserveProductDraft: false, preserveAdminDrafts: false });
    showStatus(t("newProductReady"), "ok");
    scheduleUiTask(function () {
      focusProductForm({ highlight: true, message: t("newProductReady") });
    });
  }

  function optionHtml(value, label, selected) {
    return '<option value="' + escapeHtml(value) + '"' + (value === selected ? " selected" : "") + ">" + escapeHtml(label) + "</option>";
  }

  function sanitizeImageValue(value) {
    if (typeof system?.sanitizeImageSource === "function") {
      return system?.sanitizeImageSource(value);
    }
    return String(value || "").trim();
  }

  function normalizeImageEntries(value) {
    const items = Array.isArray(value) ? value : [value];
    return Array?.from(
      new Set(
        items
          ?.map(function (item) {
            return sanitizeImageValue(item);
          })
          ?.filter(Boolean)
      )
    );
  }

  function isInlineImageValue(value) {
    return /^data:image\//i.test(String(value || "").trim());
  }

  function imageFieldConfig(fieldKey) {
    if (fieldKey === "productImage") {
      return {
        fieldId: "productImageField",
        imagesName: "imagesText",
        imagesId: "productImagesText",
        primaryName: "primaryImage",
        primaryId: "productPrimaryImage",
        fileId: "productImageFile",
        linkName: "productImageLink",
        linkId: "productImageLink",
        previewId: "productImagePreview",
        label: t("productImages"),
        help: t("productImagesHelp"),
        extraHelp: t("productImagePublishHelp"),
      };
    }

    if (fieldKey === "comboImage") {
      return {
        fieldId: "comboImageField",
        imagesName: "comboImagesText",
        imagesId: "comboImagesText",
        primaryName: "comboPrimaryImage",
        primaryId: "comboPrimaryImage",
        fileId: "comboImageFile",
        linkName: "comboImageLink",
        linkId: "comboImageLink",
        previewId: "comboImagePreview",
        label: t("offerImageUrl"),
        help: t("offerImageHelp"),
        extraHelp: t("productImagePublishHelp"),
      };
    }

    if (fieldKey === "brandLogo") {
      return {
        fieldId: "brandLogoField",
        imagesName: "brandLogoImagesText",
        imagesId: "brandLogoImagesText",
        primaryName: "brandLogoPrimaryImage",
        primaryId: "brandLogoPrimaryImage",
        fileId: "brandLogoFile",
        linkName: "brandLogoImageLink",
        linkId: "brandLogoImageLink",
        previewId: "brandLogoPreview",
        label: t("brandImage"),
        help: t("brandImageHelp"),
        extraHelp: "",
      };
    }

    return null;
  }

  function imageFieldElements(fieldKey) {
    const config = imageFieldConfig(fieldKey);
    if (!config) {
      return null;
    }

    return {
      config,
      field: $(config?.fieldId),
      hiddenImages: $(config?.imagesId),
      hiddenPrimary: $(config?.primaryId),
      fileInput: $(config?.fileId),
      linkInput: $(config?.linkId),
      preview: $(config?.previewId),
      removeButton: document?.querySelector('[data-media-remove="' + fieldKey + '"]'),
    };
  }

  function renderImagePreview(imageValue, label) {
    if (!imageValue) {
      return (
        '<div class="admin-media-preview-card admin-media-preview-card--empty">' +
        '<span>' + escapeHtml(t("noImageSelected")) + "</span>" +
        "</div>"
      );
    }

    return (
      '<div class="admin-media-preview-card">' +
      '<img src="' +
      escapeHtml(imageValue) +
      '" alt="' +
      escapeHtml(label) +
      '" data-admin-media-preview-image>' +
      '<span>' + escapeHtml(t("imageGallery")) + "</span>" +
      "</div>"
    );
  }

  function handleAdminImageError(event) {
    const image = event?.target;
    if (!(image instanceof HTMLImageElement) || !image?.matches?.("[data-admin-media-preview-image]")) {
      return;
    }

    image?.closest?.(".admin-media-preview-card")?.classList?.add("admin-media-preview-card--empty");
    image?.remove();
  }

  function renderImageField(fieldKey, images, primaryImage) {
    const config = imageFieldConfig(fieldKey);
    const normalizedImages = normalizeImageEntries(images);
    const currentImage = sanitizeImageValue(primaryImage) || normalizedImages[0] || "";
    const nextImages = currentImage && !normalizedImages.includes(currentImage)
      ? [currentImage].concat(normalizedImages)
      : normalizedImages;

    return (
      '<div class="admin-media-field" id="' + escapeHtml(config?.fieldId) + '">' +
      '<p class="admin-media-title">' + escapeHtml(config?.label) + "</p>" +
      '<p class="admin-fieldset-help">' + escapeHtml(config?.help) + "</p>" +
      '<textarea name="' + escapeHtml(config?.imagesName) + '" id="' + escapeHtml(config?.imagesId) + '" hidden>' + escapeHtml(nextImages?.join("\n")) + "</textarea>" +
      '<input type="hidden" name="' + escapeHtml(config?.primaryName) + '" id="' + escapeHtml(config?.primaryId) + '" value="' + escapeHtml(currentImage) + '">' +
      '<input type="file" id="' + escapeHtml(config?.fileId) + '" accept="image/*" hidden>' +
      '<div class="admin-media-preview" id="' + escapeHtml(config?.previewId) + '">' +
      renderImagePreview(currentImage, config?.label) +
      "</div>" +
      '<div class="admin-actions-row admin-media-actions">' +
      '<button type="button" class="botao botao-secundario" data-media-choose="' + escapeHtml(fieldKey) + '">' + escapeHtml(t("chooseImage")) + "</button>" +
      '<button type="button" class="botao botao-secundario botao-perigo-discreto" data-media-remove="' + escapeHtml(fieldKey) + '"' + (currentImage ? "" : " disabled") + ">" + escapeHtml(t("removeImage")) + "</button>" +
      "</div>" +
      '<p class="admin-field-note">' + escapeHtml(t("imageFormatsHelp")) + "</p>" +
      (config?.extraHelp ? '<p class="admin-field-note">' + escapeHtml(config?.extraHelp) + "</p>" : "") +
      '<details class="admin-media-advanced">' +
      "<summary>" + escapeHtml(t("pasteImageLink")) + "</summary>" +
      '<label>' + escapeHtml(t("imageLinkLabel")) +
      '<input type="text" name="' + escapeHtml(config?.linkName) + '" id="' + escapeHtml(config?.linkId) + '" value="' + escapeHtml(isInlineImageValue(currentImage) ? "" : currentImage) + '" placeholder="' + escapeHtml(t("imageLinkPlaceholder")) + '">' +
      "</label>" +
      "</details>" +
      "</div>"
    );
  }

  function setImageFieldValue(fieldKey, images, primaryImage) {
    const refs = imageFieldElements(fieldKey);
    if (!refs) {
      return;
    }

    const normalizedImages = normalizeImageEntries(images);
    const currentImage = sanitizeImageValue(primaryImage) || normalizedImages[0] || "";
    const nextImages = currentImage && !normalizedImages.includes(currentImage)
      ? [currentImage].concat(normalizedImages)
      : normalizedImages;

    if (refs?.hiddenImages) {
      refs.hiddenImages.value = nextImages?.join("\n");
    }
    if (refs?.hiddenPrimary) {
      refs.hiddenPrimary.value = currentImage;
    }
    if (refs?.linkInput) {
      refs.linkInput.value = currentImage && !isInlineImageValue(currentImage) ? currentImage : "";
    }
    if (refs?.preview) {
      refs.preview.innerHTML = renderImagePreview(currentImage, refs?.config?.label);
    }
    if (refs?.removeButton) {
      refs.removeButton.disabled = !currentImage;
    }
    if (refs?.fileInput) {
      refs.fileInput.value = "";
    }
  }

  function readImageFileAsDataUrl(file) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(String(reader?.result || ""));
      };
      reader.onerror = function () {
        reject(new Error(t("imageFileError")));
      };
      reader.readAsDataURL(file);
    });
  }

  function isAcceptedImageFile(file) {
    if (!file) {
      return false;
    }

    return IMAGE_ALLOWED_TYPES?.has(String(file?.type || "").toLowerCase())
      || /\.(jpe?g|png|webp)$/i.test(String(file?.name || ""));
  }

  function renderProductForm(product, options) {
    const isEditingExisting = Boolean(options?.isEditingExisting);
    const canCancelDraft = Boolean(options?.hasActiveDraft) || Boolean(state?.isProductEditing) || isEditingExisting;
    const categories = getMenuState()?.categories || [];
    const addOns = getMenuState()?.addOns || [];
    const images = Array.isArray(product?.images) && product?.images?.length
      ? product?.images
      : [product?.primaryImage || product?.imageUrl]?.filter(Boolean);
    const primaryImage = product?.primaryImage || images[0] || "";
    const tagText = Array.isArray(product?.tags) ? product?.tags?.join(", ") : "";
    const selectedAddOns = Array.isArray(product?.addOns) ? product?.addOns : [];

    return (
      "<h3>" + escapeHtml(t("productFormTitle")) + "</h3>" +
      '<form id="productForm" class="admin-form" novalidate>' +
      '<input type="hidden" name="productId" value="' + escapeHtml(product?.id || "") + '">' +
      '<fieldset class="admin-fieldset admin-form-block">' +
      '<legend>' + escapeHtml(t("productBasicsSection")) + "</legend>" +
      '<div class="admin-form-block-grid">' +
      '<label>' + escapeHtml(t("productNamePt")) +
      '<input type="text" name="namePt" maxlength="80" required value="' + escapeHtml(textValue(product?.name, "pt-BR")) + '">' +
      "</label>" +
      '<label>' + escapeHtml(t("productNameEn")) +
      '<input type="text" name="nameEn" maxlength="80" value="' + escapeHtml(textValue(product?.name, "en-US")) + '">' +
      "</label>" +
      '<label>' + escapeHtml(t("productCategory")) +
      '<select name="category" required>' +
      '<option value="">' + escapeHtml(t("requiredField")) + "</option>" +
      categories
        ?.map(function (category) {
          return '<option value="' + escapeHtml(category?.slug) + '"' + (product?.category === category?.slug ? " selected" : "") + ">" + escapeHtml(categoryName(category)) + "</option>";
        })
        ?.join("") +
      "</select>" +
      "</label>" +
      '<label>' + escapeHtml(t("productPrice")) +
      '<input type="number" name="price" min="0" step="0.01" required value="' + escapeHtml(String(product?.price ?? "")) + '">' +
      "</label>" +
      '<label>' + escapeHtml(t("productPrepTime")) +
      '<input type="number" name="prepTime" min="0" step="1" value="' + escapeHtml(product?.prepTime == null ? "" : String(product?.prepTime)) + '">' +
      "</label>" +
      '<label>' + escapeHtml(t("productStatus")) +
      '<select name="status">' +
      optionHtml("active", t("active"), normalizeProductStatus(product || {})) +
      optionHtml("inactive", t("inactive"), normalizeProductStatus(product || {})) +
      "</select>" +
      "</label>" +
      "</div>" +
      '<label class="checkbox-linha admin-check admin-check--featured">' +
      '<input type="checkbox" name="featured" ' + (product?.featured ? "checked" : "") + '>' +
      "<span>" + escapeHtml(t("featuredProduct")) + "</span>" +
      "</label>" +
      "</fieldset>" +
      '<fieldset class="admin-fieldset admin-form-block">' +
      '<legend>' + escapeHtml(t("productDescriptionsSection")) + "</legend>" +
      '<div class="admin-form-block-grid admin-form-block-grid--wide">' +
      '<label>' + escapeHtml(t("productDescriptionPt")) +
      '<textarea name="descriptionPt" maxlength="180">' + escapeHtml(textValue(product?.description, "pt-BR")) + "</textarea>" +
      "</label>" +
      '<label>' + escapeHtml(t("productDescriptionEn")) +
      '<textarea name="descriptionEn" maxlength="180">' + escapeHtml(textValue(product?.description, "en-US")) + "</textarea>" +
      "</label>" +
      '<label>' + escapeHtml(t("productLongDescriptionPt")) +
      '<textarea name="longDescriptionPt" maxlength="300">' + escapeHtml(textValue(product?.longDescription, "pt-BR")) + "</textarea>" +
      "</label>" +
      '<label>' + escapeHtml(t("productLongDescriptionEn")) +
      '<textarea name="longDescriptionEn" maxlength="300">' + escapeHtml(textValue(product?.longDescription, "en-US")) + "</textarea>" +
      "</label>" +
      '<label>' + escapeHtml(t("productTags")) +
      '<input type="text" name="tags" maxlength="180" value="' + escapeHtml(tagText) + '">' +
      "</label>" +
      "</div>" +
      "</fieldset>" +
      renderImageField("productImage", images, primaryImage) +
      '<fieldset class="admin-fieldset admin-form-block">' +
      "<legend>" + escapeHtml(t("addOnsTitle")) + "</legend>" +
      '<div class="admin-add-on-grid">' +
      (addOns?.length
        ? addOns
            ?.map(function (addOn) {
              return (
                '<label class="checkbox-linha admin-check">' +
                '<input type="checkbox" name="addOns" value="' +
                escapeHtml(addOn?.id) +
                '"' +
                (selectedAddOns?.includes(addOn?.id) ? " checked" : "") +
                '>' +
                "<span>" +
                escapeHtml(addOnName(addOn) + " - " + formatCurrency(addOn?.price)) +
                "</span>" +
                "</label>"
              );
            })
            ?.join("")
        : '<p class="admin-note">-</p>') +
      "</div>" +
      "</fieldset>" +
      '<div class="admin-actions-row admin-actions-row--form">' +
      '<button type="submit" class="botao botao-principal">' + escapeHtml(isEditingExisting ? t("saveProduct") : t("createProduct")) + "</button>" +
      '<button type="button" id="cancelProductEdit" class="botao botao-secundario"' + (canCancelDraft ? "" : " hidden") + ">" + escapeHtml(t("cancelEdit")) + "</button>" +
      "</div>" +
      "</form>" +
      renderAdminMobileSaveBar({
        id: "productMobileSaveBar",
        formId: "productForm",
        topHref: "#admin-products-top",
        submitLabel: t("saveProduct"),
      })
    );
  }

  function renderProductCard(product) {
    const category = getCategoryBySlug(product?.category);
    const image = product?.primaryImage || product?.imageUrl || "";
    const tags = Array.isArray(product?.tags) ? product?.tags?.join(", ") : "";
    const active = normalizeProductStatus(product) === "active";
    const available = product?.available !== false;
    const stateClass = active
      ? (available ? " admin-product-card-on" : " admin-product-card-unavailable")
      : " admin-product-card-off";

    return (
      '<article class="admin-product-card admin-catalog-product-card' + stateClass + '">' +
      '<div class="admin-product-main">' +
      (image
        ? '<div class="admin-product-thumb"><img src="' + escapeHtml(image) + '" alt=""></div>'
        : '<div class="admin-product-thumb admin-product-thumb--empty"></div>') +
      '<div class="admin-product-body">' +
      '<div class="admin-product-headline">' +
      '<p class="admin-product-category">' + escapeHtml(categoryName(category)) + "</p>" +
      '<p class="admin-product-price">' + escapeHtml(formatCurrency(product?.price)) + "</p>" +
      "</div>" +
      "<h3>" + escapeHtml(productName(product)) + "</h3>" +
      (tags ? '<p class="admin-product-tags">' + escapeHtml(tags) + "</p>" : "") +
      "</div>" +
      "</div>" +
      '<div class="admin-product-status-row">' +
      '<span class="admin-badge ' + (active ? "admin-badge--on" : "admin-badge--off") + '">' + escapeHtml(active ? t("active") : t("inactive")) + "</span>" +
      '<span class="admin-badge ' + (available ? "admin-badge--on" : "admin-badge--off admin-badge--unavailable") + '">' + escapeHtml(available ? t("available") : t("unavailable")) + "</span>" +
      (product.featured ? '<span class="admin-badge admin-badge--on admin-badge--featured">' + escapeHtml(t("featured")) + "</span>" : "") +
      "</div>" +
      '<div class="admin-actions-row admin-product-actions">' +
      '<button type="button" class="botao botao-secundario admin-action-btn admin-action-btn--edit" data-product-action="edit" data-product-id="' + escapeHtml(product?.id) + '">' + escapeHtml(t("edit")) + "</button>" +
      '<button type="button" class="botao botao-secundario admin-action-btn admin-action-btn--toggle" data-product-action="toggle" data-product-id="' + escapeHtml(product?.id) + '">' + escapeHtml(active ? t("deactivate") : t("activate")) + "</button>" +
      '<button type="button" class="botao botao-secundario admin-action-btn admin-action-btn--availability ' + (available ? "admin-action-btn--availability-on" : "admin-action-btn--availability-off") + '" data-product-action="availability" data-product-id="' + escapeHtml(product?.id) + '">' + escapeHtml(available ? t("makeUnavailable") : t("makeAvailable")) + "</button>" +
      '<button type="button" class="botao botao-secundario admin-action-btn admin-action-btn--danger" data-product-action="delete" data-product-id="' + escapeHtml(product?.id) + '">' + escapeHtml(t("delete")) + "</button>" +
      "</div>" +
      "</article>"
    );
  }

  function renderCategoriesPanel() {
    const categories = getMenuState()?.categories || [];
    const editingCategory = state?.editingCategorySlug ? getCategoryBySlug(state?.editingCategorySlug) : null;

    return renderPanel(
      "categories",
      '<div class="admin-panels-grid admin-workspace-grid">' +
      '<article id="admin-categories-top" class="admin-card admin-workspace-sidebar">' +
      "<h2>" + escapeHtml(t("categoriesTitle")) + "</h2>" +
      '<p class="admin-note">' + escapeHtml(t("categoriesSubtitle")) + "</p>" +
      "<h3>" + escapeHtml(t("categoryFormTitle")) + "</h3>" +
      renderCategoryForm(editingCategory) +
      "</article>" +
      '<article id="admin-categories-list-section" class="admin-card admin-workspace-main">' +
      "<h2>" + escapeHtml(t("categoriesTitle")) + "</h2>" +
      '<div class="admin-products-list">' +
      (categories?.length
        ? categories?.map(renderCategoryCard)?.join("")
        : '<p class="admin-note">' + escapeHtml(t("noCategories")) + "</p>") +
      "</div>" +
      "</article>" +
      "</div>"
    );
  }

  function renderCategoryForm(category) {
    const formId = "categoryForm";
    const slugOriginal = adminDraftFieldValue(formId, "slugOriginal", category?.slug || "");
    const slug = adminDraftFieldValue(formId, "slug", category?.slug || "");
    const namePt = adminDraftFieldValue(formId, "namePt", textValue(category?.name, "pt-BR"));
    const nameEn = adminDraftFieldValue(formId, "nameEn", textValue(category?.name, "en-US"));
    const descriptionPt = adminDraftFieldValue(formId, "descriptionPt", textValue(category?.description, "pt-BR"));
    const descriptionEn = adminDraftFieldValue(formId, "descriptionEn", textValue(category?.description, "en-US"));
    const canCancel = Boolean(category) || isAdminFormDraftActive(formId);

    return (
      '<form id="categoryForm" class="admin-form" novalidate>' +
      '<input type="hidden" name="slugOriginal" value="' + escapeHtml(slugOriginal) + '">' +
      '<label>' + escapeHtml(t("categorySlug")) +
      '<input type="text" name="slug" maxlength="80" value="' + escapeHtml(slug) + '">' +
      "</label>" +
      '<label>' + escapeHtml(t("categoryNamePt")) +
      '<input type="text" name="namePt" maxlength="80" required value="' + escapeHtml(namePt) + '">' +
      "</label>" +
      '<label>' + escapeHtml(t("categoryNameEn")) +
      '<input type="text" name="nameEn" maxlength="80" value="' + escapeHtml(nameEn) + '">' +
      "</label>" +
      '<label>' + escapeHtml(t("categoryDescriptionPt")) +
      '<textarea name="descriptionPt" maxlength="180">' + escapeHtml(descriptionPt) + "</textarea>" +
      "</label>" +
      '<label>' + escapeHtml(t("categoryDescriptionEn")) +
      '<textarea name="descriptionEn" maxlength="180">' + escapeHtml(descriptionEn) + "</textarea>" +
      "</label>" +
      '<div class="admin-actions-row">' +
      '<button type="submit" class="botao botao-principal">' + escapeHtml(category ? t("saveCategory") : t("createCategory")) + "</button>" +
      '<button type="button" id="cancelCategoryEdit" class="botao botao-secundario"' + (canCancel ? "" : " hidden") + ">" + escapeHtml(t("cancelEdit")) + "</button>" +
      "</div>" +
      "</form>" +
      renderAdminMobileSaveBar({
        id: "categoryMobileSaveBar",
        formId: "categoryForm",
        topHref: "#admin-categories-top",
        submitLabel: category ? t("saveCategory") : t("createCategory"),
      })
    );
  }

  function renderCategoryCard(category) {
    const count = getMenuState()?.products?.filter(function (product) {
      return product?.category === category?.slug;
    })?.length;

    return (
      '<article class="admin-product-card">' +
      '<div class="admin-product-body">' +
      '<p class="admin-product-category">' + escapeHtml(category?.slug) + "</p>" +
      "<h3>" + escapeHtml(categoryName(category)) + "</h3>" +
      '<p class="admin-note">' + escapeHtml(textValue(category?.description, currentLocale())) + "</p>" +
      '<span class="admin-badge admin-badge--on">' + escapeHtml(t("categoryProducts", { count: count })) + "</span>" +
      "</div>" +
      '<div class="admin-actions-row admin-product-actions admin-product-actions--compact">' +
      '<button type="button" class="botao botao-secundario admin-action-btn admin-action-btn--edit" data-category-action="edit" data-category-slug="' + escapeHtml(category?.slug) + '">' + escapeHtml(t("edit")) + "</button>" +
      '<button type="button" class="botao botao-secundario admin-action-btn admin-action-btn--danger" data-category-action="delete" data-category-slug="' + escapeHtml(category?.slug) + '">' + escapeHtml(t("delete")) + "</button>" +
      "</div>" +
      "</article>"
    );
  }

  function renderAddOnsPanel() {
    const addOns = getMenuState()?.addOns || [];
    const editingAddOn = state?.editingAddOnId ? getAddOnById(state?.editingAddOnId) : null;

    return renderPanel(
      "addOns",
      '<div class="admin-panels-grid admin-workspace-grid">' +
      '<article id="admin-add-ons-top" class="admin-card admin-workspace-sidebar">' +
      "<h2>" + escapeHtml(t("addOnsTitle")) + "</h2>" +
      '<p class="admin-note">' + escapeHtml(t("addOnsSubtitle")) + "</p>" +
      renderAddOnForm(editingAddOn) +
      "</article>" +
      '<article id="admin-addons-list-section" class="admin-card admin-workspace-main">' +
      "<h2>" + escapeHtml(t("addOnListTitle")) + "</h2>" +
      '<div class="admin-products-list">' +
      (addOns?.length
        ? addOns?.map(renderAddOnCard)?.join("")
        : '<p class="admin-note">' + escapeHtml(t("noAddOns")) + "</p>") +
      "</div>" +
      "</article>" +
      "</div>"
    );
  }

  function renderAddOnForm(addOn) {
    const formId = "addOnForm";
    const addOnIdOriginal = adminDraftFieldValue(formId, "addOnIdOriginal", addOn?.id || "");
    const addOnId = adminDraftFieldValue(formId, "addOnId", addOn?.id || "");
    const namePt = adminDraftFieldValue(formId, "namePt", textValue(addOn?.name, "pt-BR"));
    const nameEn = adminDraftFieldValue(formId, "nameEn", textValue(addOn?.name, "en-US"));
    const price = adminDraftFieldValue(formId, "price", String(addOn?.price ?? ""));
    const active = adminDraftFieldChecked(formId, "active", addOn?.active !== false);
    const canCancel = Boolean(addOn) || isAdminFormDraftActive(formId);

    return (
      "<h3>" + escapeHtml(t("addOnFormTitle")) + "</h3>" +
      '<form id="addOnForm" class="admin-form" novalidate>' +
      '<input type="hidden" name="addOnIdOriginal" value="' + escapeHtml(addOnIdOriginal) + '">' +
      '<label>' + escapeHtml(t("addOnId")) +
      '<input type="text" name="addOnId" maxlength="80" value="' + escapeHtml(addOnId) + '">' +
      "</label>" +
      '<label>' + escapeHtml(t("addOnNamePt")) +
      '<input type="text" name="namePt" maxlength="80" required value="' + escapeHtml(namePt) + '">' +
      "</label>" +
      '<label>' + escapeHtml(t("addOnNameEn")) +
      '<input type="text" name="nameEn" maxlength="80" value="' + escapeHtml(nameEn) + '">' +
      "</label>" +
      '<label>' + escapeHtml(t("addOnPrice")) +
      '<input type="number" name="price" min="0" step="0.01" required value="' + escapeHtml(price) + '">' +
      "</label>" +
      '<label class="checkbox-linha admin-check">' +
      '<input type="checkbox" name="active" ' + (active ? "checked" : "") + '>' +
      "<span>" + escapeHtml(t("addOnEnabled")) + "</span>" +
      "</label>" +
      '<div class="admin-actions-row">' +
      '<button type="submit" class="botao botao-principal">' + escapeHtml(addOn ? t("saveAddOn") : t("createAddOn")) + "</button>" +
      '<button type="button" id="cancelAddOnEdit" class="botao botao-secundario"' + (canCancel ? "" : " hidden") + ">" + escapeHtml(t("cancelEdit")) + "</button>" +
      "</div>" +
      "</form>" +
      renderAdminMobileSaveBar({
        id: "addOnMobileSaveBar",
        formId: "addOnForm",
        topHref: "#admin-add-ons-top",
        submitLabel: addOn ? t("saveAddOn") : t("createAddOn"),
      })
    );
  }

  function renderAddOnCard(addOn) {
    const active = addOn?.active !== false;

    return (
      '<article class="admin-product-card' + (active ? "" : " admin-product-card-off") + '">' +
      '<div class="admin-product-body">' +
      '<p class="admin-product-category">' + escapeHtml(addOn?.id || "-") + "</p>" +
      "<h3>" + escapeHtml(addOnName(addOn)) + "</h3>" +
      '<p class="admin-product-price">' + escapeHtml(formatCurrency(addOn?.price || 0)) + "</p>" +
      '<span class="admin-badge ' + (active ? "admin-badge--on" : "admin-badge--off") + '">' + escapeHtml(active ? t("active") : t("inactive")) + "</span>" +
      "</div>" +
      '<div class="admin-actions-row admin-product-actions admin-product-actions--compact">' +
      '<button type="button" class="botao botao-secundario admin-action-btn admin-action-btn--edit" data-add-on-action="edit" data-add-on-id="' + escapeHtml(addOn?.id) + '">' + escapeHtml(t("edit")) + "</button>" +
      '<button type="button" class="botao botao-secundario admin-action-btn admin-action-btn--danger" data-add-on-action="delete" data-add-on-id="' + escapeHtml(addOn?.id) + '">' + escapeHtml(t("delete")) + "</button>" +
      "</div>" +
      "</article>"
    );
  }

  function renderOffersPanel() {
    const offers = getOffersState();
    const editingCombo = state?.editingComboId ? getComboById(state?.editingComboId) : null;
    const hasCombos = Array.isArray(offers?.combos) && offers.combos.length > 0;

    return renderPanel(
      "offers",
      '<div class="admin-panels-grid admin-workspace-grid admin-offers-panel' +
        (hasCombos ? "" : " admin-offers-panel--empty") +
        '">' +
      '<article id="admin-offers-top" class="admin-card admin-workspace-sidebar admin-offers-form-card">' +
      "<h2>" + escapeHtml(t("offersTitle")) + "</h2>" +
      '<p class="admin-note">' + escapeHtml(t("offersSubtitle")) + "</p>" +
      renderComboForm(editingCombo) +
      "</article>" +
      '<article class="admin-card admin-workspace-main admin-offers-list-card' +
        (hasCombos ? "" : " admin-offers-list-card--empty") +
        '">' +
      "<h2>" + escapeHtml(t("comboListTitle")) + "</h2>" +
      '<div class="admin-products-list admin-offers-list">' +
      (hasCombos
        ? offers.combos.map(renderComboCard).join("")
        : '<p class="admin-note">' + escapeHtml(t("noCombos")) + "</p>") +
      "</div>" +
      "</article>" +
      "</div>"
    );
  }

  function comboProductCheckboxName(product) {
    return "comboProduct-" + product?.id;
  }

  function comboProductQuantityName(product) {
    return "comboQty-" + product?.id;
  }

  function comboProductIsAvailable(product) {
    return normalizeProductStatus(product) === "active" && product?.available !== false;
  }

  function comboProductCategoryLabel(product) {
    const category = getCategoryBySlug(product?.category);
    return category ? categoryName(category) : t("comboUncategorized");
  }

  function comboSelectedCountText(count) {
    return count === 1
      ? t("comboSelectedCountOne", { count: count })
      : t("comboSelectedCountOther", { count: count });
  }

  function comboProductSelection(product, selectedMap, formId) {
    const selected = selectedMap.has(product?.id);
    const quantity = selectedMap.get(product?.id) || 1;
    const checkboxName = comboProductCheckboxName(product);
    const quantityName = comboProductQuantityName(product);
    const checked = adminDraftFieldChecked(formId, checkboxName, selected);
    return {
      checkboxName: checkboxName,
      quantityName: quantityName,
      checked: checked,
      quantity: adminDraftFieldValue(formId, quantityName, String(quantity)),
    };
  }

  function getComboProductEntries(products, selectedMap, formId) {
    return (Array.isArray(products) ? products : []).map(function (product) {
      const selection = comboProductSelection(product, selectedMap, formId);
      return {
        product: product,
        checked: Boolean(selection?.checked),
        available: comboProductIsAvailable(product),
        category: String(product?.category || ""),
        categoryLabel: comboProductCategoryLabel(product),
      };
    });
  }

  function comboProductMatchesFilters(entry) {
    const filters = state?.comboProductFilters || {};
    const query = String(filters?.search || "")?.trim()?.toLowerCase();
    const categoryFilter = String(filters?.category || "all");
    const product = entry?.product;
    const searchable = [
      productName(product),
      textValue(product?.description, currentLocale()),
      textValue(product?.longDescription, currentLocale()),
      product?.id,
    ]
      ?.join(" ")
      ?.toLowerCase();

    if (query && !searchable?.includes(query)) {
      return false;
    }
    if (categoryFilter !== "all" && entry?.category !== categoryFilter) {
      return false;
    }
    if (filters?.availableOnly && !entry?.available) {
      return false;
    }
    return true;
  }

  function renderComboProductCategoryOptions(products) {
    const filters = state?.comboProductFilters || {};
    const productCategorySlugs = new Set((Array.isArray(products) ? products : [])
      .map(function (product) { return product?.category; })
      .filter(Boolean));
    const knownSlugs = new Set();
    let html = optionHtml("all", t("allCategories"), filters?.category || "all");

    (getMenuState()?.categories || []).forEach(function (category) {
      if (!productCategorySlugs.has(category?.slug)) {
        return;
      }
      knownSlugs.add(category?.slug);
      html += optionHtml(category?.slug, categoryName(category), filters?.category || "all");
    });

    productCategorySlugs.forEach(function (slug) {
      if (!knownSlugs.has(slug)) {
        html += optionHtml(slug, slug, filters?.category || "all");
      }
    });

    return html;
  }

  function renderComboProductsToolbar(products, selectedCount) {
    const filters = state?.comboProductFilters || {};
    const selectedOnly = Boolean(filters?.selectedOnly);
    const availableOnly = Boolean(filters?.availableOnly);
    const categorySelected = String(filters?.category || "all") !== "all";

    return (
      '<div class="admin-combo-products-toolbar">' +
      '<div class="admin-combo-products-toolbar-head">' +
      '<span class="admin-combo-products-counter">' + escapeHtml(comboSelectedCountText(selectedCount)) + "</span>" +
      '<div class="admin-combo-products-actions">' +
      '<button type="button" class="botao botao-secundario admin-combo-products-action" data-combo-product-action="clear-selection"' + (selectedCount ? "" : " disabled") + ">" + escapeHtml(t("comboClearSelection")) + "</button>" +
      '<button type="button" class="botao botao-secundario admin-combo-products-action" data-combo-product-action="select-category"' + (categorySelected ? "" : " disabled") + ">" + escapeHtml(t("comboSelectCategory")) + "</button>" +
      "</div>" +
      "</div>" +
      '<div class="admin-combo-products-controls">' +
      '<label class="admin-combo-product-search" for="comboProductSearch">' +
      "<span>" + escapeHtml(t("comboProductSearch")) + "</span>" +
      '<input type="search" id="comboProductSearch" value="' + escapeHtml(filters?.search || "") + '" placeholder="' + escapeHtml(t("comboProductSearchPlaceholder")) + '" autocomplete="off">' +
      "</label>" +
      '<label class="admin-combo-product-filter" for="comboProductCategory">' +
      "<span>" + escapeHtml(t("comboProductCategory")) + "</span>" +
      '<select id="comboProductCategory">' + renderComboProductCategoryOptions(products) + "</select>" +
      "</label>" +
      '<label class="admin-combo-product-filter admin-combo-product-view" for="comboProductView">' +
      "<span>" + escapeHtml(t("comboProductView")) + "</span>" +
      '<select id="comboProductView">' +
      '<option value="all"' + (selectedOnly ? "" : " selected") + ">" + escapeHtml(t("comboProductViewAll")) + "</option>" +
      '<option value="selected"' + (selectedOnly ? " selected" : "") + ">" + escapeHtml(t("comboProductViewSelected")) + "</option>" +
      "</select>" +
      "</label>" +
      '<label class="checkbox-linha admin-check admin-combo-filter-check">' +
      '<input type="checkbox" id="comboProductAvailableOnly"' + (availableOnly ? " checked" : "") + ">" +
      "<span>" + escapeHtml(t("comboProductAvailableOnly")) + "</span>" +
      "</label>" +
      "</div>" +
      "</div>"
    );
  }

  function renderComboProductChoice(product, selectedMap, formId) {
    const selection = comboProductSelection(product, selectedMap, formId);
    const active = comboProductIsAvailable(product);
    const categoryLabel = comboProductCategoryLabel(product);

    return (
      '<article class="admin-combo-product' +
      (selection?.checked ? " admin-combo-product--selected" : "") +
      (active ? "" : " admin-combo-product--unavailable") +
      '" data-combo-product-card data-combo-product-id="' + escapeHtml(product?.id) + '">' +
      '<label class="checkbox-linha admin-check admin-combo-product-check">' +
      '<input type="checkbox" data-combo-product-checkbox name="' + escapeHtml(selection?.checkboxName) + '" value="' + escapeHtml(product?.id) + '"' + (selection?.checked ? " checked" : "") + ">" +
      '<span class="admin-combo-product-main"><strong>' + escapeHtml(productName(product)) + "</strong><small>" + escapeHtml(categoryLabel) + "</small></span>" +
      "</label>" +
      (selection?.checked
        ? '<label class="admin-combo-qty">' +
        '<span>' + escapeHtml(t("comboProductQuantity")) + "</span>" +
        '<input type="number" name="' + escapeHtml(selection?.quantityName) + '" min="1" step="1" value="' + escapeHtml(selection?.quantity) + '">' +
        "</label>"
        : "") +
      '<span class="admin-badge ' + (active ? "admin-badge--on" : "admin-badge--off") + '">' + escapeHtml(active ? t("active") : t("unavailable")) + "</span>" +
      "</article>"
    );
  }

  function renderComboProductEntries(entries, selectedMap, formId) {
    return (Array.isArray(entries) ? entries : []).map(function (entry) {
      return renderComboProductChoice(entry?.product, selectedMap, formId);
    }).join("");
  }

  function groupComboProductEntries(entries) {
    const groups = [];
    const groupMap = {};
    (Array.isArray(entries) ? entries : []).forEach(function (entry) {
      const key = entry?.category || "__uncategorized";
      if (!groupMap[key]) {
        groupMap[key] = {
          key: key,
          label: entry?.categoryLabel || t("comboUncategorized"),
          entries: [],
        };
        groups.push(groupMap[key]);
      }
      groupMap[key].entries.push(entry);
    });
    return groups;
  }

  function renderComboAvailableProducts(entries, selectedMap, formId) {
    const groups = groupComboProductEntries(entries);
    if (groups.length <= 1) {
      return '<div class="admin-combo-products-grid">' + renderComboProductEntries(entries, selectedMap, formId) + "</div>";
    }

    return groups.map(function (group) {
      return (
        '<section class="admin-combo-products-category">' +
        '<h5>' + escapeHtml(group?.label) + '<span>' + escapeHtml(String(group?.entries?.length || 0)) + "</span></h5>" +
        '<div class="admin-combo-products-grid">' + renderComboProductEntries(group?.entries, selectedMap, formId) + "</div>" +
        "</section>"
      );
    }).join("");
  }

  function renderComboProductGroups(products, selectedMap, formId) {
    const entries = getComboProductEntries(products, selectedMap, formId);
    const selectedEntries = entries.filter(function (entry) { return entry?.checked; });
    const availableEntries = entries.filter(function (entry) {
      return !entry?.checked && comboProductMatchesFilters(entry);
    });
    const filters = state?.comboProductFilters || {};
    let html = "";

    if (selectedEntries.length) {
      html += (
        '<section class="admin-combo-products-group admin-combo-products-group--selected">' +
        '<h4>' + escapeHtml(t("comboSelectedGroup")) + "</h4>" +
        '<div class="admin-combo-products-grid">' + renderComboProductEntries(selectedEntries, selectedMap, formId) + "</div>" +
        "</section>"
      );
    } else if (filters?.selectedOnly) {
      html += '<p class="admin-note admin-combo-products-empty">' + escapeHtml(t("comboNoSelectedProducts")) + "</p>";
    }

    if (!filters?.selectedOnly) {
      if (availableEntries.length) {
        html += (
          '<section class="admin-combo-products-group">' +
          '<h4>' + escapeHtml(t("comboAvailableGroup")) + "</h4>" +
          renderComboAvailableProducts(availableEntries, selectedMap, formId) +
          "</section>"
        );
      } else if (!selectedEntries.length) {
        html += '<p class="admin-note admin-combo-products-empty">' + escapeHtml(t("comboNoProductsFound")) + "</p>";
      }
    }

    return '<div class="admin-combo-products-groups">' + html + "</div>";
  }

  function renderComboProductsPicker(products, selectedMap, formId) {
    const entries = getComboProductEntries(products, selectedMap, formId);
    const selectedCount = entries.filter(function (entry) { return entry?.checked; }).length;

    return (
      renderComboProductsToolbar(products, selectedCount) +
      renderComboProductGroups(products, selectedMap, formId)
    );
  }

  function captureComboFormDraftIfActive() {
    const form = $("comboForm");
    if (form instanceof HTMLFormElement && isAdminFormDraftActive("comboForm")) {
      captureAdminFormDraft(form);
    }
  }

  function focusComboProductSearch(cursor) {
    const searchField = $("comboProductSearch");
    if (!searchField) {
      return;
    }
    const nextCursor = Number.isFinite(Number(cursor))
      ? Number(cursor)
      : String(searchField?.value || "")?.length;
    searchField?.focus();
    searchField?.setSelectionRange(nextCursor, nextCursor);
  }

  function updateComboProductFilter(key, value, options) {
    state.comboProductFilters = state?.comboProductFilters || {
      search: "",
      category: "all",
      selectedOnly: false,
      availableOnly: false,
    };
    state.comboProductFilters[key] = value;
    captureComboFormDraftIfActive();
    renderDashboard();
    if (options?.focusSearch) {
      focusComboProductSearch(options?.cursor);
    }
  }

  function getComboFormDraftForMutation() {
    const form = $("comboForm");
    if (form instanceof HTMLFormElement) {
      captureAdminFormDraft(form);
    }

    const guard = getAdminEditGuard();
    guard.formDrafts.comboForm = guard?.formDrafts?.comboForm || {
      fields: {},
      capturedAt: new Date()?.toISOString(),
    };
    guard.formDrafts.comboForm.fields = guard?.formDrafts?.comboForm?.fields || {};
    return guard.formDrafts.comboForm;
  }

  function commitComboFormDraftMutation(draft) {
    getAdminEditGuard().formDrafts.comboForm = {
      ...(draft || {}),
      fields: draft?.fields || {},
      capturedAt: new Date()?.toISOString(),
    };
    setAdminDirtyAreas(["offers"], true);
    updateAdminFormCancelButtons();
    updateSettingsDirtyUi();
    updateAdminMobileSaveBarsUi();
  }

  function setComboProductDraftChecked(draft, product, checked) {
    const checkboxName = comboProductCheckboxName(product);
    const quantityName = comboProductQuantityName(product);
    draft.fields[checkboxName] = {
      kind: "checkbox",
      checked: Boolean(checked),
      value: String(product?.id ?? ""),
    };
    if (checked && !draft.fields[quantityName]) {
      draft.fields[quantityName] = {
        kind: "number",
        value: "1",
      };
    }
  }

  function handleComboProductAction(action) {
    const products = getMenuState()?.products || [];

    if (action === "clear-selection") {
      const draft = getComboFormDraftForMutation();
      products.forEach(function (product) {
        setComboProductDraftChecked(draft, product, false);
      });
      commitComboFormDraftMutation(draft);
      renderDashboard();
      return;
    }

    if (action === "select-category") {
      const category = String(state?.comboProductFilters?.category || "all");
      if (category === "all") {
        return;
      }

      const draft = getComboFormDraftForMutation();
      products
        .filter(function (product) {
          return (product?.category || "__uncategorized") === category && comboProductIsAvailable(product);
        })
        .forEach(function (product) {
          setComboProductDraftChecked(draft, product, true);
        });
      commitComboFormDraftMutation(draft);
      renderDashboard();
    }
  }

  function toggleComboProductCard(card) {
    const checkbox = card?.querySelector?.("[data-combo-product-checkbox]");
    if (!checkbox || checkbox?.disabled) {
      return false;
    }

    checkbox.checked = !checkbox.checked;
    markAdminFormDirty(checkbox);
    renderDashboard();
    return true;
  }

  function renderComboForm(combo) {
    const formId = "comboForm";
    const selectedMap = new Map((Array.isArray(combo?.items) ? combo.items : []).map(function (item) {
      return [item?.productId, Number(item?.quantity || 1)];
    }));
    const products = getMenuState()?.products || [];
    const comboIdOriginal = adminDraftFieldValue(formId, "comboIdOriginal", combo?.id || "");
    const comboId = adminDraftFieldValue(formId, "comboId", combo?.id || "");
    const namePt = adminDraftFieldValue(formId, "namePt", textValue(combo?.name, "pt-BR"));
    const nameEn = adminDraftFieldValue(formId, "nameEn", textValue(combo?.name, "en-US"));
    const descriptionPt = adminDraftFieldValue(formId, "descriptionPt", textValue(combo?.description, "pt-BR"));
    const descriptionEn = adminDraftFieldValue(formId, "descriptionEn", textValue(combo?.description, "en-US"));
    const comboImages = normalizeImageEntries(Array.isArray(combo?.images) && combo?.images?.length
      ? combo?.images
      : [combo?.primaryImage || combo?.imageUrl]?.filter(Boolean));
    const comboImagesText = adminDraftFieldValue(formId, "comboImagesText", comboImages?.join("\n"));
    const comboPrimaryImage = adminDraftFieldValue(formId, "comboPrimaryImage", combo?.primaryImage || combo?.imageUrl || comboImages[0] || "");
    const price = adminDraftFieldValue(formId, "price", String(combo?.price ?? ""));
    const active = adminDraftFieldChecked(formId, "active", combo?.active !== false);
    const canCancel = Boolean(combo) || isAdminFormDraftActive(formId);
    const advancedOpen = Boolean(comboIdOriginal || comboId);

    return (
      "<h3>" + escapeHtml(t("comboFormTitle")) + "</h3>" +
      '<p class="admin-note admin-offer-form-help">' + escapeHtml(t("comboFormHelp")) + "</p>" +
      '<form id="comboForm" class="admin-form admin-offer-form" novalidate>' +
      '<input type="hidden" name="comboIdOriginal" value="' + escapeHtml(comboIdOriginal) + '">' +
      '<div class="admin-split">' +
      '<label>' + escapeHtml(t("offerNamePt")) +
      '<input type="text" name="namePt" maxlength="80" required value="' + escapeHtml(namePt) + '">' +
      "</label>" +
      '<label>' + escapeHtml(t("offerNameEn")) +
      '<input type="text" name="nameEn" maxlength="80" value="' + escapeHtml(nameEn) + '">' +
      "</label>" +
      "</div>" +
      '<label>' + escapeHtml(t("offerDescriptionPt")) +
      '<textarea name="descriptionPt" maxlength="180">' + escapeHtml(descriptionPt) + "</textarea>" +
      "</label>" +
      '<label>' + escapeHtml(t("offerDescriptionEn")) +
      '<textarea name="descriptionEn" maxlength="180">' + escapeHtml(descriptionEn) + "</textarea>" +
      "</label>" +
      renderImageField("comboImage", parseImagesText(comboImagesText), comboPrimaryImage) +
      '<label>' + escapeHtml(t("comboPrice")) +
      '<input type="number" name="price" min="0" step="0.01" required value="' + escapeHtml(price) + '">' +
      "</label>" +
      '<details class="admin-offer-advanced"' + (advancedOpen ? " open" : "") + '>' +
      "<summary>" + escapeHtml(t("advancedOfferSettings")) + "</summary>" +
      '<p class="admin-field-note">' + escapeHtml(t("advancedOfferSettingsHelp")) + "</p>" +
      '<label>' + escapeHtml(t("offerCode")) +
      '<input type="text" name="comboId" maxlength="80" value="' + escapeHtml(comboId) + '">' +
      "</label>" +
      "</details>" +
      '<fieldset class="admin-fieldset admin-combo-products-fieldset">' +
      "<legend>" + escapeHtml(t("comboProducts")) + "</legend>" +
      '<div class="admin-combo-products-list">' +
      (products?.length
        ? renderComboProductsPicker(products, selectedMap, formId)
        : '<p class="admin-note">' + escapeHtml(t("noProducts")) + "</p>") +
      "</div>" +
      "</fieldset>" +
      '<label class="checkbox-linha admin-check">' +
      '<input type="checkbox" name="active" ' + (active ? "checked" : "") + '>' +
      "<span>" + escapeHtml(t("comboActive")) + "</span>" +
      "</label>" +
      '<div class="admin-actions-row">' +
      '<button type="submit" class="botao botao-principal">' + escapeHtml(combo ? t("saveCombo") : t("createCombo")) + "</button>" +
      '<button type="button" id="cancelComboEdit" class="botao botao-secundario"' + (canCancel ? "" : " hidden") + ">" + escapeHtml(t("cancelEdit")) + "</button>" +
      "</div>" +
      "</form>" +
      renderAdminMobileSaveBar({
        id: "comboMobileSaveBar",
        formId: "comboForm",
        topHref: "#admin-offers-top",
        submitLabel: t("saveCombo"),
      })
    );
  }

  function renderComboCard(combo) {
    const warning = comboHasUnavailableProducts(combo);
    const image = combo?.primaryImage || combo?.imageUrl || "";

    return (
      '<article class="admin-product-card admin-offer-card admin-offer-card--combo' + (combo?.active === false ? " admin-product-card-off" : "") + '">' +
      (image
        ? '<div class="admin-product-thumb admin-offer-thumb"><img src="' + escapeHtml(image) + '" alt=""></div>'
        : '<div class="admin-product-thumb admin-product-thumb--empty admin-offer-thumb"></div>') +
      '<div class="admin-product-body">' +
      '<p class="admin-product-category">' + escapeHtml(combo?.id || "-") + "</p>" +
      "<h3>" + escapeHtml(offerName(combo)) + "</h3>" +
      '<p class="admin-note">' + escapeHtml(t("includedProducts", { value: comboProductsText(combo) || "-" })) + "</p>" +
      '<p class="admin-product-price">' + escapeHtml(formatCurrency(combo?.price || 0)) + "</p>" +
      '<span class="admin-badge ' + (combo?.active !== false ? "admin-badge--on" : "admin-badge--off") + '">' + escapeHtml(combo?.active !== false ? t("active") : t("inactive")) + "</span>" +
      (warning ? '<span class="admin-badge admin-badge--off">' + escapeHtml(t("offerUnavailableWarning")) + "</span>" : "") +
      "</div>" +
      '<div class="admin-actions-row admin-product-actions admin-product-actions--compact">' +
      '<button type="button" class="botao botao-secundario admin-action-btn admin-action-btn--edit" data-combo-action="edit" data-combo-id="' + escapeHtml(combo?.id) + '">' + escapeHtml(t("edit")) + "</button>" +
      '<button type="button" class="botao botao-secundario admin-action-btn admin-action-btn--toggle" data-combo-action="toggle" data-combo-id="' + escapeHtml(combo?.id) + '">' + escapeHtml(combo?.active !== false ? t("deactivate") : t("activate")) + "</button>" +
      '<button type="button" class="botao botao-secundario admin-action-btn admin-action-btn--danger" data-combo-action="delete" data-combo-id="' + escapeHtml(combo?.id) + '">' + escapeHtml(t("delete")) + "</button>" +
      "</div>" +
      "</article>"
    );
  }

  function resolveSelectedThemePreset(appearance) {
    return shared?.suggestThemePreset?.(appearance || {}) || "tobias-lanches";
  }

  function getSavedThemeAppearance() {
    return state?.states?.brandConfig?.appearance || {};
  }

  function getSavedThemePreset() {
    return state?.savedThemePreset || resolveSelectedThemePreset(getSavedThemeAppearance());
  }

  function getPendingThemePreset() {
    return shared?.normalizeThemePreset?.(state?.pendingThemePreset) || getSavedThemePreset();
  }

  function getPreviewThemePreset() {
    return shared?.normalizeThemePreset?.(state?.previewThemePreset) || "";
  }

  function clearThemePreviewState() {
    state.pendingThemePreset = "";
    state.previewThemePreset = "";
  }

  function getAdminAppliedAppearance() {
    const savedAppearance = getSavedThemeAppearance();
    const previewPreset = getPreviewThemePreset();

    if (!previewPreset) {
      return savedAppearance;
    }

    return resolveThemeAppearanceForSave(previewPreset, savedAppearance);
  }

  function resolveThemeAppearanceForSave(selectedPreset, currentAppearance) {
    const appearance = currentAppearance && typeof currentAppearance === "object" ? currentAppearance : {};
    const explicitPreset = shared?.normalizeThemePreset?.(appearance?.preset) || "";
    const suggestedPreset = resolveSelectedThemePreset(appearance);
    const nextPreset = shared?.normalizeThemePreset?.(selectedPreset) || suggestedPreset;

    if (!explicitPreset && nextPreset === suggestedPreset) {
      return {
        ...appearance,
        preset: "",
        theme: appearance?.theme === "light" ? "light" : "dark",
        palette: String(appearance?.palette || "gold"),
      };
    }

    const presetConfig = shared?.getThemePresetConfig?.(nextPreset);
    return {
      ...appearance,
      preset: nextPreset,
      theme: presetConfig?.theme || "dark",
      palette: presetConfig?.palette || "gold",
    };
  }

  function getThemeCardState(presetKey) {
    const previewPreset = getPreviewThemePreset();
    if (previewPreset && previewPreset === presetKey) {
      return "preview";
    }

    return getSavedThemePreset() === presetKey ? "applied" : "normal";
  }

  function getThemeCardBadgeLabel(cardState) {
    if (cardState === "preview") {
      return t("themePreview");
    }

    if (cardState === "applied") {
      return t("themeApplied");
    }

    return "";
  }

  function getThemePreviewTokens(preset) {
    const swatches = Array.isArray(preset?.swatches) && preset?.swatches?.length
      ? preset.swatches
      : [preset?.theme === "dark" ? "#111827" : "#f8fafc", "#ffffff", "#e5e7eb", "#d97706"];
    const darkTheme = preset?.theme === "dark";

    return {
      background: swatches?.[0] || (darkTheme ? "#111827" : "#f8fafc"),
      surface: swatches?.[1] || (darkTheme ? "#1f2937" : "#ffffff"),
      muted: swatches?.[2] || (darkTheme ? "#374151" : "#e5e7eb"),
      accent: swatches?.[3] || (darkTheme ? "#f59e0b" : "#d97706"),
      text: darkTheme ? "#f8fafc" : "#0f172a",
      secondaryText: darkTheme ? "rgba(226,232,240,0.74)" : "#475569",
      accentText: darkTheme ? "#111827" : "#ffffff",
      border: darkTheme ? "rgba(248,250,252,0.08)" : "rgba(15,23,42,0.08)",
    };
  }

  function renderThemePreviewCard(preset) {
    const preview = getThemePreviewTokens(preset);
    const previewStyle = [
      "--theme-preview-bg:" + preview?.background,
      "--theme-preview-surface:" + preview?.surface,
      "--theme-preview-muted:" + preview?.muted,
      "--theme-preview-accent:" + preview?.accent,
      "--theme-preview-text:" + preview?.text,
      "--theme-preview-secondary:" + preview?.secondaryText,
      "--theme-preview-accent-text:" + preview?.accentText,
      "--theme-preview-border:" + preview?.border,
    ]?.join(";");

    return (
      '<span class="admin-theme-card__preview" style="' + escapeHtml(previewStyle) + '">' +
      '<span class="admin-theme-card__preview-shell">' +
      '<span class="admin-theme-card__preview-badge">' + escapeHtml(t("themePreviewBadge")) + "</span>" +
      '<span class="admin-theme-card__preview-product">' + escapeHtml(t("themePreviewProductName")) + "</span>" +
      '<span class="admin-theme-card__preview-price">' + escapeHtml(formatCurrency(24.9)) + "</span>" +
      '<span class="admin-theme-card__preview-button">' + escapeHtml(t("themePreviewAction")) + "</span>" +
      "</span>" +
      "</span>"
    );
  }

  function syncThemePresetPickerUI(root) {
    const scope = root?.querySelector ? root : document;
    const picker = scope?.querySelector?.(".admin-theme-fieldset");
    if (!picker) {
      return;
    }

    const savedPreset = getSavedThemePreset();
    const selectedPreset = currentDraftFieldValue("themePreset", getPendingThemePreset());
    const previewPreset = getPreviewThemePreset();
    const previewActive = Boolean(previewPreset && previewPreset !== savedPreset);

    picker?.querySelectorAll?.(".admin-theme-option")?.forEach(function (option) {
      const presetKey = option?.dataset?.themePreset || "";
      const cardState = previewPreset && presetKey === previewPreset
        ? "preview"
        : savedPreset === presetKey
          ? "applied"
          : "normal";
      const badge = option?.querySelector?.("[data-theme-card-badge]");
      const note = option?.querySelector?.("[data-theme-card-note]");
      const input = option?.querySelector?.('input[name="themePreset"]');

      option.dataset.themeCardState = cardState;

      if (input) {
        input.checked = selectedPreset === presetKey;
      }

      if (badge) {
        const badgeLabel = getThemeCardBadgeLabel(cardState);
        badge.textContent = badgeLabel;
        badge.hidden = !badgeLabel;
      }

      if (note) {
        const noteLabel = cardState === "preview" ? t("themeSaveToApply") : "";
        note.textContent = noteLabel;
        note.hidden = !noteLabel;
      }
    });

    const previewNotice = picker?.querySelector?.("[data-theme-preview-notice]");
    if (previewNotice) {
      previewNotice.textContent = previewActive ? t("themePreviewActiveNotice") : "";
      previewNotice.hidden = !previewActive;
    }
  }

  function activateThemePreview(selectedPreset, root) {
    const normalizedPreset = shared?.normalizeThemePreset?.(selectedPreset) || getSavedThemePreset();
    const savedPreset = getSavedThemePreset();

    state.pendingThemePreset = normalizedPreset;
    state.previewThemePreset = normalizedPreset !== savedPreset ? normalizedPreset : "";
    markAdminFormDirtyById("settingsForm", ["settings", "appearance"]);

    applyTheme();
    syncThemePresetPickerUI(root || document);
  }

  function renderThemePresetPicker(appearance) {
    const savedPreset = getSavedThemePreset();
    const selectedPreset = currentDraftFieldValue("themePreset", getPendingThemePreset());
    const previewPreset = getPreviewThemePreset();
    const presets = shared?.getThemePresets?.() || [];
    const previewActive = Boolean(previewPreset && previewPreset !== savedPreset);

    return (
      '<fieldset class="admin-fieldset admin-theme-fieldset">' +
      "<legend>" + escapeHtml(t("themePreset")) + "</legend>" +
      '<p class="admin-fieldset-help">' + escapeHtml(t("themePresetHelp")) + "</p>" +
      '<div class="admin-theme-grid">' +
      presets
        ?.map(function (preset) {
          const labelKey = THEME_PRESET_LABEL_KEYS[preset?.key] || "";
          const label = labelKey ? t(labelKey) : preset?.key || "";
          const cardState = getThemeCardState(preset?.key || "");
          const badgeLabel = getThemeCardBadgeLabel(cardState);
          return (
            '<label class="admin-theme-option" data-theme-preset="' + escapeHtml(preset?.key || "") + '" data-theme-card-state="' + escapeHtml(cardState) + '">' +
            '<input type="radio" name="themePreset" value="' + escapeHtml(preset?.key || "") + '" ' + (selectedPreset === preset?.key ? "checked" : "") + ">" +
            '<span class="admin-theme-card">' +
            renderThemePreviewCard(preset) +
            '<span class="admin-theme-card__swatches">' +
            (Array.isArray(preset?.swatches) ? preset.swatches : [])
              ?.map(function (swatch) {
                return '<span class="admin-theme-card__swatch" style="background:' + escapeHtml(swatch) + ';"></span>';
              })
              ?.join("") +
            "</span>" +
            '<span class="admin-theme-card__text">' +
            '<span class="admin-theme-card__header">' +
            '<strong class="admin-theme-card__title">' + escapeHtml(label) + "</strong>" +
            '<span class="admin-theme-card__status" data-theme-card-badge' + (badgeLabel ? "" : " hidden") + ">" + escapeHtml(badgeLabel) + "</span>" +
            "</span>" +
            '<span class="admin-theme-card__meta">' + escapeHtml(preset?.theme === "dark" ? t("dark") : t("light")) + "</span>" +
            '<span class="admin-theme-card__note" data-theme-card-note' + (cardState === "preview" ? "" : " hidden") + ">" + escapeHtml(cardState === "preview" ? t("themeSaveToApply") : "") + "</span>" +
            "</span>" +
            "</span>" +
            "</label>"
          );
        })
        ?.join("") +
      "</div>" +
      '<p class="admin-theme-preview-notice" data-theme-preview-notice aria-live="polite"' + (previewActive ? "" : " hidden") + ">" + escapeHtml(previewActive ? t("themePreviewActiveNotice") : "") + "</p>" +
      '<p class="admin-note admin-theme-note">' + escapeHtml(t("themePresetTechnical")) + "</p>" +
      "</fieldset>"
    );
  }

  function renderSettingsPanel() {
    const previousDraftContext = state.formDraftContext;
    state.formDraftContext = "settingsForm";
    try {
    const config = state?.states?.brandConfig || {};
    const business = config?.business || {};
    const location = business?.location || {};
    const brand = config?.brand || {};
    const destaqueInicial = config?.destaqueInicial || config?.hero || {};
    const pix = config?.pix || {};
    const delivery = config?.delivery || {};
    const appearance = config?.appearance || {};
    const legal = config?.legal || {};
    const schedule = Array.isArray(config?.schedule) ? config?.schedule : [];

    return renderPanel(
      "settings",
      '<article id="settings-top" class="admin-card admin-card-wide">' +
      "<h2>" + escapeHtml(t("settingsTitle")) + "</h2>" +
      '<p class="admin-note">' + escapeHtml(t("settingsSubtitle")) + "</p>" +
      renderSettingsShortcutNav() +
      renderSettingsDirtyNotice() +
      '<form id="settingsForm" class="admin-form admin-settings-form">' +
      settingsSection(
        t("sectionBrand"),
        t("sectionBrandHelp"),
        '<div class="admin-split">' +
        settingsInput("brandNamePt", t("brandNamePt"), textValue(brand?.name, "pt-BR"), "text", null, null, t("brandNamePtPlaceholder")) +
        settingsInput("brandNameEn", t("brandNameEn"), textValue(brand?.name, "en-US"), "text", null, null, t("brandNameEnPlaceholder")) +
        "</div>" +
        '<div class="admin-split">' +
        settingsInput("brandSubtitlePt", t("brandSubtitlePt"), textValue(brand?.subtitle, "pt-BR"), "text", null, null, t("brandSubtitlePtPlaceholder")) +
        settingsInput("brandSubtitleEn", t("brandSubtitleEn"), textValue(brand?.subtitle, "en-US"), "text", null, null, t("brandSubtitleEnPlaceholder")) +
        "</div>" +
        '<div class="admin-split">' +
        settingsInput("footerNotePt", t("footerNotePt"), textValue(brand?.footerNote, "pt-BR"), "text", null, null, t("footerNotePtPlaceholder")) +
        settingsInput("footerNoteEn", t("footerNoteEn"), textValue(brand?.footerNote, "en-US"), "text", null, null, t("footerNoteEnPlaceholder")) +
        "</div>" +
        renderSettingsMediaField(
          "brandLogo",
          t("brandImage"),
          t("brandImageHelp"),
          [brand?.logoUrl]?.filter(Boolean),
          brand?.logoUrl || ""
        ),
        "settings-business"
      ) +
      settingsSection(
        t("sectionDestaqueInicial"),
        t("sectionDestaqueInicialHelp"),
        '<div class="admin-split">' +
        settingsInput("destaqueChamadaPt", t("destaqueChamadaPt"), textValue(destaqueInicial?.kicker, "pt-BR")) +
        settingsInput("destaqueChamadaEn", t("destaqueChamadaEn"), textValue(destaqueInicial?.kicker, "en-US")) +
        "</div>" +
        '<div class="admin-split">' +
        settingsInput("destaqueTituloPt", t("destaqueTituloPt"), textValue(destaqueInicial?.title, "pt-BR")) +
        settingsInput("destaqueTituloEn", t("destaqueTituloEn"), textValue(destaqueInicial?.title, "en-US")) +
        "</div>" +
        '<div class="admin-split admin-split--wide">' +
        settingsTextarea("destaqueSubtituloPt", t("destaqueSubtituloPt"), textValue(destaqueInicial?.subtitle, "pt-BR"), t("destaqueSubtituloPtPlaceholder")) +
        settingsTextarea("destaqueSubtituloEn", t("destaqueSubtituloEn"), textValue(destaqueInicial?.subtitle, "en-US"), t("destaqueSubtituloEnPlaceholder")) +
        "</div>" +
        '<div class="admin-split admin-split--wide">' +
        settingsTextarea("destaqueSelosPt", t("destaqueSelosPt"), arrayTextValue(destaqueInicial?.chips, "pt-BR")) +
        settingsTextarea("destaqueSelosEn", t("destaqueSelosEn"), arrayTextValue(destaqueInicial?.chips, "en-US")) +
        "</div>" +
        '<p class="admin-field-note">' + escapeHtml(t("destaqueSelosHelp")) + "</p>" +
        '<div class="admin-split">' +
        settingsInput("waitingLabelPt", t("waitingLabelPt"), textValue(destaqueInicial?.waitingTimeLabel, "pt-BR")) +
        settingsInput("waitingLabelEn", t("waitingLabelEn"), textValue(destaqueInicial?.waitingTimeLabel, "en-US")) +
        "</div>" +
        '<div class="admin-split">' +
        settingsInput("paymentLabelPt", t("paymentLabelPt"), textValue(destaqueInicial?.paymentLabel, "pt-BR")) +
        settingsInput("paymentLabelEn", t("paymentLabelEn"), textValue(destaqueInicial?.paymentLabel, "en-US")) +
        "</div>"
      ) +
      settingsSection(
        t("sectionOperation"),
        t("sectionOperationHelp"),
        settingsSubgroup(
          t("settingsGroupOrders"),
          '<div class="admin-split">' +
          settingsInput("waitingTimePt", t("waitingTimePt"), textValue(business.waitingTime, "pt-BR")) +
          settingsInput("waitingTimeEn", t("waitingTimeEn"), textValue(business.waitingTime, "en-US")) +
          "</div>" +
          settingsInput("whatsappNumber", t("whatsappNumber"), business.whatsappNumber || "")
        ) +
        settingsSubgroup(
          t("settingsGroupDelivery"),
          '<div class="admin-split">' +
          settingsInput("baseFee", t("baseFee"), String(delivery?.baseFee ?? 0), "number", "0", "0.01") +
          settingsInput("cityLabelPt", t("cityLabelPt"), textValue(delivery?.cityLabel, "pt-BR"), "text", null, null, t("cityLabelPtPlaceholder")) +
          "</div>" +
          settingsInput("cityLabelEn", t("cityLabelEn"), textValue(delivery?.cityLabel, "en-US"), "text", null, null, t("cityLabelEnPlaceholder"))
        ) +
        settingsSubgroup(
          t("settingsGroupPix"),
          '<div class="admin-split">' +
          settingsInput("pixKey", t("pixKey"), pix?.key || "") +
          settingsInput("pixOwnerPt", t("pixOwnerPt"), textValue(pix?.owner, "pt-BR")) +
          "</div>" +
          '<div class="admin-split">' +
          settingsInput("pixOwnerEn", t("pixOwnerEn"), textValue(pix?.owner, "en-US")) +
          settingsInput("pixBankPt", t("pixBankPt"), textValue(pix?.bank, "pt-BR")) +
          "</div>" +
          settingsInput("pixBankEn", t("pixBankEn"), textValue(pix?.bank, "en-US"))
        ) +
        settingsSubgroup(
          t("settingsGroupLanguage"),
          settingsSelect("defaultLocale", t("defaultLocale"), Object?.keys(getSupportedLocales())?.map(function (localeKey) {
            return { value: localeKey, label: getSupportedLocales()[localeKey]?.label || localeKey };
          }), config?.i18n?.defaultLocale || "pt-BR")
        ),
        "settings-operation"
      ) +
      settingsSection(
        t("sectionPolicies"),
        t("sectionPoliciesHelp"),
        '<div class="admin-split">' +
        settingsCheckbox("legalShowPrivacyPolicy", t("legalShowPrivacyPolicy"), legal?.showPrivacyPolicy !== false) +
        settingsCheckbox("legalShowTermsOfUse", t("legalShowTermsOfUse"), legal?.showTermsOfUse !== false) +
        "</div>" +
        '<div class="admin-split">' +
        settingsInput("legalBusinessName", t("legalBusinessName"), legal?.businessName || "", "text", null, null, textValue(brand?.name, "pt-BR")) +
        settingsInput("legalBusinessNameEn", t("legalBusinessNameEn"), legal?.businessNameEn || "", "text", null, null, textValue(brand?.name, "en-US")) +
        "</div>" +
        '<div class="admin-split">' +
        settingsInput("legalContactEmail", t("legalContactEmail"), legal?.contactEmail || "", "email") +
        settingsInput("legalContactPhone", t("legalContactPhone"), legal?.contactPhone || "", "tel") +
        "</div>" +
        settingsInput("legalBusinessAddress", t("legalBusinessAddress"), legal?.businessAddress || "", "text", null, null, location?.address || business.pickupAddress || "") +
        '<div class="admin-split">' +
        settingsInput("legalLastUpdated", t("legalLastUpdated"), legal?.lastUpdated || "", "date") +
        settingsSelect("legalPrivacyMode", t("legalPrivacyMode"), [
          { value: "internal", label: t("legalModeInternal") },
          { value: "external", label: t("legalModeExternal") },
        ], legal?.privacyPolicyMode || "internal") +
        "</div>" +
        settingsInput("legalPrivacyUrl", t("legalPrivacyUrl"), settingsExternalUrlValue(legal?.privacyPolicyUrl), "text", null, null, "https://...") +
        '<div class="admin-split">' +
        settingsSelect("legalTermsMode", t("legalTermsMode"), [
          { value: "internal", label: t("legalModeInternal") },
          { value: "external", label: t("legalModeExternal") },
        ], legal?.termsOfUseMode || "internal") +
        settingsInput("legalTermsUrl", t("legalTermsUrl"), settingsExternalUrlValue(legal?.termsOfUseUrl), "text", null, null, "https://...") +
        "</div>" +
        '<p class="admin-field-note">' + escapeHtml(t("legalExternalUrlHelp")) + "</p>",
        "settings-policies"
      ) +
      settingsSection(
        t("deliveryLocationsTitle"),
        t("deliveryLocationsHelp"),
        renderDeliveryLocationsEditor(delivery),
        "settings-delivery-locations"
      ) +
      settingsSection(
        t("sectionLocation"),
        t("sectionLocationHelp"),
        settingsInput("pickupAddress", t("pickupAddress"), location?.address || business.pickupAddress || "", "text", null, null, t("pickupAddressPlaceholder")) +
        '<div class="admin-split">' +
        settingsInput("locationDistrict", t("locationDistrict"), location?.district || "", "text", null, null, t("locationDistrictPlaceholder")) +
        settingsInput("locationCity", t("locationCity"), location?.city || "", "text", null, null, t("locationCityPlaceholder")) +
        "</div>" +
        '<div class="admin-split">' +
        settingsInput("locationState", t("locationState"), location?.state || "", "text", null, null, t("locationStatePlaceholder")) +
        settingsInput("pickupNote", t("pickupNote"), location?.pickupNote || "", "text", null, null, t("pickupNotePlaceholder")) +
        "</div>" +
        '<details class="admin-settings-advanced">' +
        "<summary>" + escapeHtml(t("settingsLocationAdvanced")) + "</summary>" +
        '<div class="admin-settings-advanced-content">' +
        '<p class="admin-field-note">' + escapeHtml(t("settingsLocationAdvancedHelp")) + "</p>" +
        '<div class="admin-settings-map-group">' +
        settingsInput("locationMapsUrl", t("locationMapsUrl"), location?.mapsUrl || "", "url", null, null, t("locationMapsUrlPlaceholder")) +
        '<p class="admin-field-note">' + escapeHtml(t("locationMapsHelp")) + "</p>" +
        "</div>" +
        '<div class="admin-settings-map-group">' +
        '<div class="admin-split">' +
        settingsInput("locationLatitude", t("locationLatitude"), location?.latitude || "", "text", null, null, t("locationLatitudePlaceholder")) +
        settingsInput("locationLongitude", t("locationLongitude"), location?.longitude || "", "text", null, null, t("locationLongitudePlaceholder")) +
        "</div>" +
        '<p class="admin-field-note">' + escapeHtml(t("locationCoordinatesHelp")) + "</p>" +
        "</div>" +
        "</div>" +
        "</details>",
        "settings-location"
      ) +
      settingsSection(
        t("sectionAppearance"),
        t("sectionAppearanceHelp"),
        renderThemePresetPicker(appearance),
        "settings-appearance"
      ) +
      renderScheduleEditor(schedule, business) +
      '<button type="submit" class="botao botao-principal">' + escapeHtml(t("saveSettings")) + "</button>" +
      "</form>" +
      renderSettingsSaveBar() +
      "</article>"
    );
    } finally {
      state.formDraftContext = previousDraftContext;
    }
  }

  function renderSettingsDirtyNotice() {
    const dirty = hasSettingsUnsavedChanges();
    return (
      '<p id="settingsDirtyNotice" class="admin-settings-dirty-notice" role="status"' +
      (dirty ? "" : " hidden") +
      ">" +
      escapeHtml(dirty ? t("settingsUnsavedChanges") : "") +
      "</p>"
    );
  }

  function renderSettingsSaveBar() {
    const dirty = hasSettingsUnsavedChanges();
    return (
      '<div id="settingsSaveBar" class="admin-settings-save-bar' +
      (dirty ? " admin-settings-save-bar--dirty" : "") +
      '">' +
      '<span id="settingsSaveBarStatus" class="admin-settings-save-bar__status">' +
      escapeHtml(dirty ? t("settingsSaveBarDirty") : t("settingsSaveBarClean")) +
      "</span>" +
      '<div class="admin-settings-save-bar__actions">' +
      '<a class="admin-section-top-link" href="#settings-top">' + escapeHtml(t("backToSettingsTop")) + "</a>" +
      '<button type="submit" form="settingsForm" class="botao botao-principal">' + escapeHtml(t("saveSettings")) + "</button>" +
      "</div>" +
      "</div>"
    );
  }

  function renderAdminMobileSaveBar(options) {
    const formId = String(options?.formId || "");
    const dirty = isMobileFormSaveBarDirty(formId);
    return (
      '<div id="' + escapeHtml(options?.id || "") + '" class="admin-settings-save-bar admin-mobile-form-save-bar' +
      (dirty ? " admin-settings-save-bar--dirty" : "") +
      '" data-admin-mobile-save-bar-form="' + escapeHtml(formId) + '">' +
      '<span class="admin-settings-save-bar__status" data-admin-mobile-save-bar-status>' +
      escapeHtml(dirty ? t("settingsSaveBarDirty") : t("settingsSaveBarClean")) +
      "</span>" +
      '<div class="admin-settings-save-bar__actions">' +
      '<a class="admin-section-top-link" href="' + escapeHtml(options?.topHref || "#adminDashboard") + '">' + escapeHtml(t("backToSettingsTop")) + "</a>" +
      '<button type="submit" form="' + escapeHtml(formId) + '" class="botao botao-principal">' + escapeHtml(options?.submitLabel || t("saveSettings")) + "</button>" +
      "</div>" +
      "</div>"
    );
  }

  function settingsSubgroup(title, content) {
    return (
      '<section class="admin-settings-subgroup">' +
      "<h3>" + escapeHtml(title) + "</h3>" +
      '<div class="admin-settings-subgroup-grid">' + content + "</div>" +
      "</section>"
    );
  }

  function renderSettingsShortcutNav() {
    const links = [
      { href: "#settings-business", label: t("settingsQuickBrand") },
      { href: "#settings-operation", label: t("settingsQuickOperation") },
      { href: "#settings-policies", label: t("settingsQuickPolicies") },
      { href: "#settings-delivery-locations", label: t("settingsQuickDeliveryLocations") },
      { href: "#settings-location", label: t("settingsQuickLocation") },
      { href: "#settings-appearance", label: t("settingsQuickAppearance") },
      { href: "#settings-hours", label: t("settingsQuickHours") },
    ];

    return (
      '<nav class="admin-settings-nav" aria-label="' + escapeHtml(t("settingsQuickNav")) + '">' +
      links
        ?.map(function (item) {
          return '<a href="' + escapeHtml(item?.href) + '">' + escapeHtml(item?.label) + "</a>";
        })
        ?.join("") +
      "</nav>"
    );
  }

  function deliveryLocationsForAdmin(delivery) {
    const source = Array.isArray(delivery?.locations)
      ? delivery.locations
      : Array.isArray(delivery?.neighborhoods)
        ? delivery.neighborhoods
        : [];

    return source.map(function (location, index) {
      const name = location?.name || {};
      const id = String(location?.id || slugify(textValue(name, "pt-BR") || textValue(name, "en-US"), "localidade-" + (index + 1)));
      const feeMode = location?.feeMode === "custom" || location?.fee == null ? "custom" : "fixed";
      return {
        rowKey: id || "localidade-" + (index + 1),
        id: id,
        name: name,
        fee: feeMode === "fixed" ? Number(location?.fee || 0) : "",
        feeMode: feeMode,
        active: location?.active == null ? location?.available !== false : location?.active !== false,
        note: location?.note || {},
      };
    });
  }

  function deliveryLocationSummary(location, feeMode, active) {
    const name = textValue(location?.name, "pt-BR") || textValue(location?.name, "en-US") || t("addDeliveryLocation");
    const feeLabel = feeMode === "custom"
      ? t("deliveryLocationFeeCustom")
      : formatCurrency(Number(location?.fee || 0));
    const statusLabel = active ? t("active") : t("inactive");
    return {
      name,
      feeLabel,
      statusLabel,
    };
  }

  function renderDeliveryLocationRow(rowKey, location, options) {
    const key = String(rowKey || "localidade-" + Date.now());
    const feeMode = currentDraftFieldValue("deliveryLocationFeeMode-" + key, location?.feeMode || "fixed");
    const active = currentDraftFieldChecked("deliveryLocationActive-" + key, location?.active !== false);
    const summary = deliveryLocationSummary(location, feeMode, active);
    const rowOptions = options && typeof options === "object" ? options : {};

    return (
      '<details class="admin-delivery-location-row" data-delivery-location-row="' + escapeHtml(key) + '"' +
      (rowOptions?.isNew ? ' data-delivery-location-new="true"' : "") +
      (rowOptions?.open ? " open" : "") +
      ">" +
      '<summary class="admin-delivery-location-summary">' +
      '<span class="admin-delivery-location-summary-copy">' +
      '<strong>' + escapeHtml(summary?.name) + "</strong>" +
      '<span>' + escapeHtml(summary?.feeLabel + " · " + summary?.statusLabel) + "</span>" +
      "</span>" +
      '<span class="admin-delivery-location-edit" aria-hidden="true">' + escapeHtml(t("edit")) + "</span>" +
      "</summary>" +
      '<div class="admin-delivery-location-fields">' +
      '<div class="admin-delivery-location-head">' +
      '<label class="checkbox-linha admin-check">' +
      '<input type="checkbox" name="deliveryLocationActive-' + escapeHtml(key) + '" ' + (active ? "checked" : "") + '>' +
      "<span>" + escapeHtml(t("deliveryLocationActive")) + "</span>" +
      "</label>" +
      '<button type="button" class="botao botao-secundario botao-perigo-discreto admin-delivery-location-remove" data-delivery-location-remove="' + escapeHtml(key) + '">' +
      escapeHtml(t("deleteDeliveryLocation")) +
      "</button>" +
      "</div>" +
      '<div class="admin-split">' +
      settingsInput("deliveryLocationNamePt-" + key, t("deliveryLocationNamePt"), textValue(location?.name, "pt-BR")) +
      settingsInput("deliveryLocationNameEn-" + key, t("deliveryLocationNameEn"), textValue(location?.name, "en-US")) +
      "</div>" +
      '<div class="admin-split">' +
      settingsInput("deliveryLocationId-" + key, t("deliveryLocationId"), location?.id || key) +
      '<label>' +
      escapeHtml(t("deliveryLocationFeeMode")) +
      '<select name="deliveryLocationFeeMode-' + escapeHtml(key) + '">' +
      '<option value="fixed"' + (feeMode === "fixed" ? " selected" : "") + ">" + escapeHtml(t("deliveryLocationFeeFixed")) + "</option>" +
      '<option value="custom"' + (feeMode === "custom" ? " selected" : "") + ">" + escapeHtml(t("deliveryLocationFeeCustom")) + "</option>" +
      "</select>" +
      "</label>" +
      "</div>" +
      '<div class="admin-split">' +
      settingsInput("deliveryLocationFee-" + key, t("deliveryLocationFee"), String(location?.fee ?? ""), "number", "0", "0.01") +
      settingsInput("deliveryLocationNotePt-" + key, t("deliveryLocationNotePt"), textValue(location?.note, "pt-BR"), "text", null, null, t("deliveryLocationNotePlaceholder")) +
      "</div>" +
      settingsInput("deliveryLocationNoteEn-" + key, t("deliveryLocationNoteEn"), textValue(location?.note, "en-US"), "text", null, null, t("deliveryLocationNotePlaceholder")) +
      '<div class="admin-actions-row admin-delivery-location-edit-actions">' +
      '<button type="button" class="botao botao-secundario" data-delivery-location-cancel="' + escapeHtml(key) + '">' + escapeHtml(t("cancelEdit")) + "</button>" +
      "</div>" +
      "</div>" +
      "</details>"
    );
  }

  function renderDeliveryLocationsEditor(delivery) {
    const locations = deliveryLocationsForAdmin(delivery);
    return (
      '<div class="admin-delivery-locations-editor">' +
      '<div id="deliveryLocationsList" class="admin-delivery-locations-list">' +
      locations
        .map(function (location) {
          return renderDeliveryLocationRow(location?.rowKey, location);
        })
        .join("") +
      "</div>" +
      '<p id="deliveryLocationsEmpty" class="admin-note"' + (locations?.length ? " hidden" : "") + ">" +
      escapeHtml(t("noDeliveryLocations")) +
      "</p>" +
      '<button type="button" class="botao botao-secundario admin-delivery-location-add" data-delivery-location-add="true">' +
      escapeHtml(t("addDeliveryLocation")) +
      "</button>" +
      "</div>"
    );
  }

  function updateDeliveryLocationsEmptyState() {
    const list = $("deliveryLocationsList");
    const empty = $("deliveryLocationsEmpty");
    if (empty) {
      empty.hidden = Boolean(list?.querySelector("[data-delivery-location-row]"));
    }
  }

  function addDeliveryLocationRow() {
    const list = $("deliveryLocationsList");
    if (!list) {
      return;
    }

    const key = "nova-" + Date.now();
    list.insertAdjacentHTML("beforeend", renderDeliveryLocationRow(key, {
      id: "",
      name: { "pt-BR": "", "en-US": "" },
      fee: 0,
      feeMode: "fixed",
      active: true,
      note: { "pt-BR": "", "en-US": "" },
    }, { open: true, isNew: true }));
    updateDeliveryLocationsEmptyState();
    markAdminFormDirtyById("settingsForm", ["settings"]);
    const row = list.querySelector('[data-delivery-location-row="' + key + '"]');
    showStatus(t("deliveryLocationAdded"), "ok");
    guideAdminTarget(row, {
      message: t("deliveryLocationAdded"),
      type: "ok",
      focusSelector: 'input[name^="deliveryLocationNamePt"]',
    });
  }

  function removeDeliveryLocationRow(button) {
    const editor = button?.closest?.(".admin-delivery-locations-editor");
    button?.closest?.("[data-delivery-location-row]")?.remove();
    updateDeliveryLocationsEmptyState();
    markAdminFormDirtyById("settingsForm", ["settings"]);
    showStatus(t("deliveryLocationRemoved"), "warn");
    guideAdminTarget(editor || "#settings-delivery-locations", {
      message: t("deliveryLocationRemoved"),
      type: "warn",
      focus: false,
      scroll: false,
    });
  }

  function cancelDeliveryLocationEdit(button) {
    const row = button?.closest?.("[data-delivery-location-row]");
    const editor = button?.closest?.(".admin-delivery-locations-editor");
    if (!row) {
      return;
    }

    if (row?.dataset?.deliveryLocationNew === "true") {
      row?.remove();
      updateDeliveryLocationsEmptyState();
      showStatus(t("editCanceled"), "ok");
      guideAdminTarget(editor || "#settings-delivery-locations", {
        message: t("editCanceled"),
        type: "ok",
        focus: false,
        scroll: false,
      });
      return;
    }

    row.open = false;
    showStatus(t("editCanceled"), "ok");
    guideAdminTarget(row, {
      message: t("editCanceled"),
      type: "ok",
      focus: false,
      scroll: false,
    });
  }

  function settingsFeedbackForField(field) {
    const name = String(field?.name || "");
    if (!name || !field?.closest?.("#settingsForm")) {
      return null;
    }

    if (name === "whatsappNumber") {
      return { target: "#settings-operation", message: t("whatsappChanged") };
    }

    if (/^pix/i.test(name)) {
      return { target: "#settings-operation", message: t("pixChanged") };
    }

    if (/^legal/.test(name)) {
      return { target: "#settings-policies", message: t("legalChanged") };
    }

    if (/^deliveryLocationActive-/.test(name)) {
      return {
        target: field?.closest?.("[data-delivery-location-row]") || "#settings-delivery-locations",
        message: t("deliveryLocationActiveChanged"),
      };
    }

    if (/^deliveryLocationFeeMode-/.test(name)) {
      return {
        target: field?.closest?.("[data-delivery-location-row]") || "#settings-delivery-locations",
        message: field?.value === "custom" ? t("deliveryFeeCustomChanged") : t("deliveryFeeFixedChanged"),
      };
    }

    if (/^deliveryLocationFee-/.test(name)) {
      return {
        target: field?.closest?.("[data-delivery-location-row]") || "#settings-delivery-locations",
        message: t("deliveryFeeFixedChanged"),
      };
    }

    if (/^deliveryLocation(Name|Id|Note)(Pt|En)?-/.test(name)) {
      return {
        target: field?.closest?.("[data-delivery-location-row]") || "#settings-delivery-locations",
        message: t("deliveryLocationChanged"),
      };
    }

    if (/^(scheduleEnabled|day-|day-open-|day-close-)/.test(name)) {
      return { target: "#settings-hours", message: t("hoursChanged") };
    }

    if (/^(pickupAddress|pickupNote|location|deliveryMode|baseFee|cityLabel)/.test(name)) {
      return { target: "#settings-location", message: t("locationChanged") };
    }

    return null;
  }

  function announceSettingsFieldChange(field) {
    const feedback = settingsFeedbackForField(field);
    if (!feedback) {
      return;
    }

    highlightAdminTarget(feedback?.target);
  }

  function settingsInput(name, label, value, type, min, step, placeholder) {
    const resolvedValue = currentDraftFieldValue(name, value);
    return (
      '<label>' +
      escapeHtml(label) +
      '<input type="' +
      escapeHtml(type || "text") +
      '" name="' +
      escapeHtml(name) +
      '"' +
      (min != null ? ' min="' + escapeHtml(min) + '"' : "") +
      (step != null ? ' step="' + escapeHtml(step) + '"' : "") +
      (placeholder ? ' placeholder="' + escapeHtml(placeholder) + '"' : "") +
      ' value="' +
      escapeHtml(resolvedValue || "") +
      '">' +
      "</label>"
    );
  }

  function settingsTextarea(name, label, value, placeholder) {
    const resolvedValue = currentDraftFieldValue(name, value);
    return (
      '<label>' +
      escapeHtml(label) +
      '<textarea name="' + escapeHtml(name) + '"' + (placeholder ? ' placeholder="' + escapeHtml(placeholder) + '"' : "") + '>' + escapeHtml(resolvedValue || "") + "</textarea>" +
      "</label>"
    );
  }

  function settingsCheckbox(name, label, checked) {
    const resolvedChecked = currentDraftFieldChecked(name, Boolean(checked));
    return (
      '<label class="checkbox-linha admin-check admin-policy-check">' +
      '<input type="checkbox" name="' + escapeHtml(name) + '" ' + (resolvedChecked ? "checked" : "") + '>' +
      "<span>" + escapeHtml(label) + "</span>" +
      "</label>"
    );
  }

  function settingsExternalUrlValue(value) {
    const url = String(value || "")?.trim();
    return url?.startsWith("#") ? "" : url;
  }

  function settingsSection(title, help, content, id) {
    return (
      '<fieldset' + (id ? ' id="' + escapeHtml(id) + '"' : "") + ' class="admin-fieldset admin-settings-section">' +
      "<legend>" + escapeHtml(title) + "</legend>" +
      '<p class="admin-fieldset-help">' + escapeHtml(help) + "</p>" +
      '<div class="admin-settings-stack">' + content + "</div>" +
      '<div class="admin-section-top-actions">' +
      '<a class="admin-section-top-link" href="#settings-top">' + escapeHtml(t("backToSettingsTop")) + "</a>" +
      "</div>" +
      "</fieldset>"
    );
  }

  function scheduleEntryForDay(schedule, dayIndex, fallbackOpen, fallbackClose) {
    const entry = Array.isArray(schedule)
      ? schedule?.find(function (item) {
          return Number(item?.day) === dayIndex;
        })
      : null;

    return {
      day: dayIndex,
      enabled: Boolean(entry?.enabled),
      open: String(entry?.open || fallbackOpen || "18:00")?.slice(0, 5),
      close: String(entry?.close || fallbackClose || "23:00")?.slice(0, 5),
    };
  }

  function renderScheduleEditor(schedule, business) {
    const rows = Array.isArray(schedule) ? schedule : [];
    const firstTimedEntry = rows?.find(function (item) {
      return item?.open && item?.close;
    });
    const fallbackOpen = firstTimedEntry?.open || "18:00";
    const fallbackClose = firstTimedEntry?.close || "23:00";
    const daysShort = rawMessage("daysShort") || [];
    const daysLong = rawMessage("daysLong") || daysShort;
    const scheduleEnabled = currentDraftFieldChecked("scheduleEnabled", !business?.allowOrdersOutsideHours);

    return (
      '<fieldset id="settings-hours" class="admin-fieldset admin-hours-fieldset">' +
      "<legend>" + escapeHtml(t("hoursTitle")) + "</legend>" +
      '<div class="admin-hours-head">' +
      '<p class="admin-fieldset-help">' + escapeHtml(t("scheduleHelp")) + "</p>" +
      '<label class="checkbox-linha admin-check admin-hours-master">' +
      '<input type="checkbox" name="scheduleEnabled" ' + (scheduleEnabled ? "checked" : "") + '>' +
      "<span>" + escapeHtml(t("respectSchedule")) + "</span>" +
      "</label>" +
      "</div>" +
      '<div class="admin-hours-grid">' +
      Array?.from({ length: 7 })
        ?.map(function (_, index) {
          const entry = scheduleEntryForDay(rows, index, fallbackOpen, fallbackClose);
          const enabled = currentDraftFieldChecked("day-" + index, scheduleEnabled && entry?.enabled);
          const openTime = currentDraftFieldValue("day-open-" + index, entry?.open);
          const closeTime = currentDraftFieldValue("day-close-" + index, entry?.close);
          const dayName = daysLong?.[index] || daysShort?.[index] || String(index + 1);
          const shortName = daysShort?.[index] || dayName;

          return (
            '<div class="admin-hours-row">' +
            '<div class="admin-hours-day">' +
            "<strong>" + escapeHtml(dayName) + "</strong>" +
            '<span aria-hidden="true">' + escapeHtml(shortName) + "</span>" +
            "</div>" +
            '<label class="admin-hours-toggle">' +
            '<input class="admin-hours-checkbox" type="checkbox" name="day-' + index + '" ' + (enabled ? "checked" : "") + '>' +
            '<span class="admin-hours-toggle-text">' +
            '<span class="admin-hours-state admin-hours-state--open">' + escapeHtml(t("scheduleOpenStatus")) + "</span>" +
            '<span class="admin-hours-state admin-hours-state--closed">' + escapeHtml(t("scheduleClosedStatus")) + "</span>" +
            "</span>" +
            "</label>" +
            '<div class="admin-hours-times">' +
            '<label class="admin-hours-time">' +
            "<span>" + escapeHtml(t("openTime")) + "</span>" +
            '<input type="time" name="day-open-' + index + '" value="' + escapeHtml(openTime) + '">' +
            "</label>" +
            '<span class="admin-hours-separator" aria-hidden="true">—</span>' +
            '<label class="admin-hours-time">' +
            "<span>" + escapeHtml(t("closeTime")) + "</span>" +
            '<input type="time" name="day-close-' + index + '" value="' + escapeHtml(closeTime) + '">' +
            "</label>" +
            "</div>" +
            "</div>"
          );
        })
        ?.join("") +
      "</div>" +
      '<div class="admin-section-top-actions">' +
      '<a class="admin-section-top-link" href="#settings-top">' + escapeHtml(t("backToSettingsTop")) + "</a>" +
      "</div>" +
      "</fieldset>"
    );
  }

  function renderSettingsMediaField(prefix, label, help, images, primaryImage) {
    return renderImageField(prefix, images || [], primaryImage || "");
  }

  function settingsSelect(name, label, options, selected) {
    const resolvedSelected = currentDraftFieldValue(name, selected);
    return (
      '<label>' +
      escapeHtml(label) +
      '<select name="' + escapeHtml(name) + '">' +
      options
        ?.map(function (item) {
          return '<option value="' + escapeHtml(item?.value) + '"' + (item?.value === resolvedSelected ? " selected" : "") + ">" + escapeHtml(item?.label) + "</option>";
        })
        ?.join("") +
      "</select>" +
      "</label>"
    );
  }

  function renderCloudPanel() {
    const previousDraftContext = state.formDraftContext;
    state.formDraftContext = "cloudForm";
    try {
    const cloud = state?.states?.cloudConfig || {};
    const cloudRealtime = currentDraftFieldChecked("cloudRealtime", Boolean(cloud?.realtime));
    const autoReconnect = currentDraftFieldChecked("autoReconnect", cloud?.autoReconnect !== false);
    const cloudActionsAvailable = isOnlineAdminMode();
    const cloudModeClass = cloudActionsAvailable ? " admin-cloud-mode-notice--online" : " admin-cloud-mode-notice--offline";
    return renderPanel(
      "cloud",
      '<article class="admin-card admin-card-wide">' +
      '<h2>' + escapeHtml(t("cloudTitle")) + '</h2>' +
      '<p class="admin-note">' + escapeHtml(t("cloudSubtitle")) + '</p>' +
      '<p class="admin-cloud-mode-notice' + cloudModeClass + '">' + escapeHtml(t(cloudActionsAvailable ? "cloudModeOnline" : "cloudModeOffline")) + '</p>' +
      '<div class="admin-grid admin-cloud-grid">' +
      '<div class="admin-card admin-cloud-card admin-cloud-card--status">' +
      '<h2>' + escapeHtml(t("cloudStatus")) + '</h2>' +
      '<p class="admin-note">' + escapeHtml(t("cloudCheckHelp")) + '</p>' +
      '<div class="admin-cloud-status-card">' + renderCloudStatusCard(cloud) + '</div>' +
      '</div>' +
      '<div class="admin-card admin-card-wide admin-cloud-card admin-cloud-card--actions">' +
      '<div class="admin-cloud-primary-grid">' +
      cloudActionCard("adminMigrateCloudBtn", t("migrateToCloud"), t("cloudPublishHelp"), true, { disabled: !cloudActionsAvailable }) +
      cloudActionCard("adminSyncCloudBtn", t("syncToLocal"), t("cloudLoadHelp"), false, { disabled: !cloudActionsAvailable }) +
      cloudActionCard("adminCheckCloudBtn", t("checkConnection"), t("cloudCheckHelp"), false, { disabled: !cloudActionsAvailable }) +
      cloudActionCard("adminCheckAuthBtn", t("cloudCheckAuth"), t("authOnlineDescription"), false, { disabled: !cloudActionsAvailable }) +
      cloudActionCard("adminCheckStorageBtn", t("cloudCheckStorage"), t("imageUploadPublishError"), false, { disabled: !cloudActionsAvailable }) +
      '</div>' +
      '<form id="cloudForm" class="admin-form admin-cloud-form">' +
      '<p class="admin-note">' + escapeHtml(t("cloudOperationalHelp")) + '</p>' +
      '<div class="admin-cloud-form-grid">' +
      '<label class="checkbox-linha admin-check">' +
      '<input type="checkbox" name="cloudRealtime" ' + (cloudRealtime ? "checked" : "") + '>' +
      '<span>' + escapeHtml(t("cloudRealtime")) + '</span>' +
      '</label>' +
      '<label class="checkbox-linha admin-check">' +
      '<input type="checkbox" name="autoReconnect" ' + (autoReconnect ? "checked" : "") + '>' +
      '<span>' + escapeHtml(t("autoReconnect")) + '</span>' +
      '</label>' +
      settingsInput("reconnectIntervalMs", t("reconnectInterval"), String(cloud?.reconnectIntervalMs || 30000), "number", "1000", "1000") +
      '<div class="admin-actions-row admin-actions-row--cloud">' +
      '<button type="submit" class="botao botao-secundario">' + escapeHtml(t("saveCloud")) + '</button>' +
      '</div>' +
      '</div>' +
      '</form>' +
      '<details class="admin-cloud-advanced">' +
      '<summary>' + escapeHtml(t("cloudTechnicalTitle")) + '</summary>' +
      '<p class="admin-note">' + escapeHtml(t("cloudTechnicalHelp")) + '</p>' +
      renderCloudTechnicalSummary(cloud) +
      '</details>' +
      '</div>' +
      '</div>' +
      '</article>'
    );
    } finally {
      state.formDraftContext = previousDraftContext;
    }
  }

  function cloudActionCard(buttonId, title, help, primary, options) {
    const disabled = Boolean(options?.disabled);
    return (
      '<article class="admin-cloud-action-item' + (primary ? " admin-cloud-action-item--primary" : "") + (disabled ? " admin-cloud-action-item--disabled" : "") + '">' +
      "<h3>" + escapeHtml(title) + "</h3>" +
      '<p class="admin-note">' + escapeHtml(help) + "</p>" +
      (disabled ? '<p class="admin-cloud-action-disabled-note">' + escapeHtml(t("cloudActionUnavailable")) + "</p>" : "") +
      '<button type="button" id="' + escapeHtml(buttonId) + '" class="botao ' + (primary ? "botao-principal" : "botao-secundario") + '"' + (disabled ? ' disabled aria-disabled="true"' : "") + '>' +
      escapeHtml(title) +
      "</button>" +
      "</article>"
    );
  }

  function cloudSummaryRow(label, value, options) {
    const rowOptions = options && typeof options === "object" ? options : {};
    return (
      '<div class="admin-cloud-summary-row">' +
      '<span class="admin-cloud-summary-label">' + escapeHtml(label) + "</span>" +
      '<span class="admin-cloud-summary-value' + (rowOptions?.mono ? " admin-cloud-summary-value--mono" : "") + '">' + escapeHtml(value || "-") + "</span>" +
      "</div>"
    );
  }

  function renderCloudTechnicalSummary(cloud) {
    return (
      '<div class="admin-cloud-status-card">' +
      '<p class="admin-cloud-status-heading"><strong>' + escapeHtml(t("cloudTechnicalManaged")) + '</strong></p>' +
      '<div class="admin-cloud-summary-grid">' +
      cloudSummaryRow(t("cloudEnabled"), cloud?.enabled ? t("yes") : t("no")) +
      cloudSummaryRow(t("cloudUrl"), cloud?.url || "-", { mono: true }) +
      cloudSummaryRow(t("cloudSchema"), cloud?.schema || "public") +
      cloudSummaryRow(t("cloudCategories"), cloud?.tables?.categories || "-", { mono: true }) +
      cloudSummaryRow(t("cloudProducts"), cloud?.tables?.products || "-", { mono: true }) +
      cloudSummaryRow(t("cloudAddOns"), cloud?.tables?.addOns || "-", { mono: true }) +
      cloudSummaryRow(t("cloudProductAddOns"), cloud?.tables?.productAddOns || "-", { mono: true }) +
      cloudSummaryRow(t("cloudSettingsTable"), cloud?.tables?.settings || "-", { mono: true }) +
      cloudSummaryRow(t("cloudMetricEventsTable"), cloud?.tables?.metricEvents || "menu_metric_events", { mono: true }) +
      cloudSummaryRow(t("cloudStorageBucket"), cloud?.storage?.bucket || "-", { mono: true }) +
      '</div>' +
      '</div>'
    );
  }

  function renderCloudStatusCard(cloud) {
    const status = cloud?.status === "connected" ? t("cloudConnected") : cloud?.status === "error" ? t("cloudError") : t("cloudDisabled");
    const pillClass = cloud?.status === "connected" ? "admin-pill admin-pill--ok" : "admin-pill admin-pill--off";
    return (
      '<p class="admin-cloud-status-heading"><span class="' + pillClass + '">' + escapeHtml(status) + '</span></p>' +
      '<div class="admin-cloud-summary-grid">' +
      cloudSummaryRow(t("lastCheck"), cloud?.lastCheckAt || "-", { mono: true }) +
      cloudSummaryRow(t("lastError"), cloud?.lastError || "-", { mono: true }) +
      '</div>'
    );
  }

  function renderReportsPanel() {
    const reportData = currentReportData(5);
    const status = reportData?.status;
    const summary = reportData?.summary || {};
    const topAdded = reportData?.topAdded || [];
    const topViewed = reportData?.topViewed || [];
    const topPayments = reportData?.topPayments || [];
    const topServices = reportData?.topServices || [];
    const topSearchNoResults = reportData?.topSearchNoResults || [];
    const setupIssues = buildReportSetupIssues(status);

    return renderPanel(
      "reports",
      '<div class="admin-panels-grid admin-reports-grid">' +
      '<article class="admin-card admin-card-wide admin-reports-overview">' +
      "<h2>" + escapeHtml(t("reportsTitle")) + "</h2>" +
      '<p class="admin-note">' + escapeHtml(t("reportsSubtitle")) + "</p>" +
      '<p class="admin-note">' + escapeHtml(reportSourceMessage()) + "</p>" +
      '<div class="admin-metric-grid">' +
      metricCard(t("productsSeen"), String(summary?.productsViewed || 0), t("productsSeenHelp")) +
      metricCard(t("productsAdded"), String(summary?.productsAdded || 0), t("productsAddedHelp")) +
      metricCard(t("checkoutOpened"), String(summary?.checkoutOpened || 0), t("checkoutOpenedHelp")) +
      metricCard(t("ordersPrepared"), String(summary?.orderPrepared || 0), t("ordersPreparedHelp")) +
      "</div>" +
      '<div class="admin-actions-row">' +
      '<button type="button" id="adminExportReportBtn" class="botao botao-principal">' + escapeHtml(t("exportReport")) + "</button>" +
      '<button type="button" id="adminClearMetricsBtn" class="botao botao-secundario botao-perigo-discreto">' + escapeHtml(t("clearMetrics")) + "</button>" +
      "</div>" +
      "</article>" +
      '<article class="admin-card">' +
      "<h2>" + escapeHtml(t("topAdded")) + "</h2>" +
      renderMetricList(topAdded) +
      "</article>" +
      '<article class="admin-card">' +
      "<h2>" + escapeHtml(t("topViewed")) + "</h2>" +
      renderMetricList(topViewed) +
      "</article>" +
      '<article class="admin-card">' +
      "<h2>" + escapeHtml(t("serviceChoices")) + "</h2>" +
      renderChoiceMetricList(topServices, reportServiceChoiceLabel, "noMetrics") +
      "</article>" +
      '<article class="admin-card">' +
      "<h2>" + escapeHtml(t("paymentChoices")) + "</h2>" +
      renderChoiceMetricList(topPayments, reportPaymentChoiceLabel, "noMetrics") +
      "</article>" +
      '<article class="admin-card">' +
      "<h2>" + escapeHtml(t("searchNoResults")) + "</h2>" +
      renderChoiceMetricList(topSearchNoResults, reportSearchLabel, "noSearchNoResults") +
      "</article>" +
      '<article class="admin-card">' +
      "<h2>" + escapeHtml(t("systemHealth")) + "</h2>" +
      '<div class="admin-metric-grid admin-metric-grid--compact">' +
      metricCard(t("totalProducts"), String(status?.counts?.products || 0)) +
      metricCard(t("totalCategories"), String(status?.counts?.categories || 0)) +
      metricCard(t("totalAddOns"), String(status?.counts?.addOns || 0)) +
      "</div>" +
      "</article>" +
      '<article class="admin-card admin-card-wide">' +
      "<h2>" + escapeHtml(t("reportSetupTitle")) + "</h2>" +
      renderIssueList(setupIssues) +
      "</article>" +
      "</div>"
    );
  }

  function metricCard(label, value, note) {
    return (
      '<article class="admin-metric-card">' +
      '<p class="admin-note">' + escapeHtml(label) + "</p>" +
      "<strong>" + escapeHtml(value) + "</strong>" +
      (note ? '<span class="admin-metric-help">' + escapeHtml(note) + "</span>" : "") +
      "</article>"
    );
  }

  function reportCount(count) {
    const value = Number(count || 0);
    return t(value === 1 ? "reportCountOne" : "reportCountOther", { count: value });
  }

  function renderMetricList(items) {
    if (!items?.length) {
      return '<p class="admin-note">' + escapeHtml(t("noMetrics")) + "</p>";
    }

    return (
      '<ul class="admin-simple-list">' +
      items
        ?.map(function (item) {
          return '<li><strong>' + escapeHtml(productName(item?.product) || item?.productId || "-") + "</strong><span>" + escapeHtml(reportCount(item?.count)) + "</span></li>";
        })
        ?.join("") +
      "</ul>"
    );
  }

  function renderChoiceMetricList(items, labeler, emptyKey) {
    if (!items?.length) {
      return '<p class="admin-note">' + escapeHtml(t(emptyKey || "noMetrics")) + "</p>";
    }

    return (
      '<ul class="admin-simple-list">' +
      items
        ?.map(function (item) {
          return '<li><strong>' + escapeHtml(labeler(item?.value)) + "</strong><span>" + escapeHtml(reportCount(item?.count)) + "</span></li>";
        })
        ?.join("") +
      "</ul>"
    );
  }

  function reportPaymentChoiceLabel(value) {
    if (value === "pix") {
      return t("paymentMethodPix");
    }
    if (value === "card") {
      return t("paymentMethodCard");
    }
    if (value === "cash") {
      return t("paymentMethodCash");
    }
    return value || "-";
  }

  function reportServiceChoiceLabel(value) {
    if (value === "delivery") {
      return t("serviceChoiceDelivery");
    }
    if (value === "pickup") {
      return t("serviceChoicePickup");
    }
    if (value === "dine_in") {
      return t("serviceChoiceDineIn");
    }
    return value || "-";
  }

  function reportSearchLabel(value) {
    return value || "-";
  }

  function buildReportSetupIssues(status) {
    const menu = getMenuState();
    const products = Array.isArray(menu?.products) ? menu.products : [];
    const activeProducts = products?.filter(function (product) {
      return normalizeProductStatus(product) === "active" && product?.available !== false;
    });
    const issues = [];

    if (!activeProducts?.length) {
      issues?.push(t("reportIssueNoActiveProducts"));
    }

    if (activeProducts?.some(function (product) {
      return !Number.isFinite(Number(product?.price)) || Number(product?.price) <= 0;
    })) {
      issues?.push(t("reportIssueProductNoPrice"));
    }

    return issues?.concat(status?.issues || []);
  }

  function renderIssueList(issues) {
    if (!issues?.length) {
      return '<p class="admin-note">' + escapeHtml(t("noSetupIssues")) + "</p>";
    }

    return (
      '<ul class="admin-simple-list">' +
      issues
        ?.map(function (issue) {
          return "<li>" + escapeHtml(issue) + "</li>";
        })
        ?.join("") +
      "</ul>"
    );
  }

  function renderSystemPanel() {
    return renderPanel(
      "system",
      '<article class="admin-card admin-card-wide">' +
      "<h2>" + escapeHtml(t("systemTitle")) + "</h2>" +
      '<p class="admin-note">' + escapeHtml(t("systemSubtitle")) + "</p>" +
      '<div class="admin-system-actions-grid" role="group" aria-label="' + escapeHtml(t("systemActionsAria")) + '">' +
      renderSystemActionCard("adminBackupBtn", t("backupSystem"), t("backupSystemHelp"), "primary") +
      renderSystemActionCard("adminRestoreBtn", t("restoreBackup"), t("restoreBackupHelp"), "danger") +
      renderSystemActionCard("adminResetBtn", t("resetSystem"), t("resetSystemHelp"), "danger") +
      renderSystemActionCard("adminSanitizeBtn", t("sanitizeSystem"), t("sanitizeSystemHelp"), "danger") +
      '<input type="file" id="adminRestoreInput" accept="application/json" hidden>' +
      "</div>" +
      '<div class="admin-system-about" aria-label="' + escapeHtml(t("adminAboutAria")) + '">' +
      '<p class="admin-system-about__title">' + escapeHtml(t("adminAboutProduct")) + "</p>" +
      '<p class="admin-system-about__credit">' +
      escapeHtml(t("adminAboutCreditPrefix")) +
      ' <a href="' + escapeHtml(AUTHOR_URL) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(AUTHOR_NAME) + "</a>" +
      "</p>" +
      '<p class="admin-system-about__version">' + escapeHtml(t("adminAboutVersion", { version: APP_VERSION })) + "</p>" +
      "</div>" +
      "</article>"
    );
  }

  function renderSystemActionCard(buttonId, title, help, tone) {
    const primary = tone === "primary";
    const danger = tone === "danger";
    return (
      '<article class="admin-system-action-card' + (primary ? " admin-system-action-card--primary" : "") + (danger ? " admin-system-action-card--danger" : "") + '">' +
      '<div class="admin-system-action-copy">' +
      "<h3>" + escapeHtml(title) + "</h3>" +
      '<p class="admin-note">' + escapeHtml(help) + "</p>" +
      "</div>" +
      '<button type="button" id="' + escapeHtml(buttonId) + '" class="botao ' + (primary ? "botao-principal" : "botao-secundario") + (danger ? " admin-system-danger-btn" : "") + '">' + escapeHtml(title) + "</button>" +
      "</article>"
    );
  }

  function parseImagesText(value) {
    return normalizeImageEntries(
      String(value || "")
        ?.split(/\r?\n/)
        ?.map(function (item) {
          return String(item || "")?.trim();
        })
        ?.filter(Boolean)
    );
  }

  function readImageFieldValue(formData, imagesFieldName, primaryFieldName) {
    const images = parseImagesText(formData?.get(imagesFieldName));
    const primaryImage = sanitizeImageValue(formData?.get(primaryFieldName) || images[0] || "");
    return {
      images: primaryImage && !images.includes(primaryImage) ? [primaryImage].concat(images) : images,
      primaryImage,
    };
  }

  function readProductDraft(form) {
    const formData = new FormData(form);
    const imageField = readImageFieldValue(formData, "imagesText", "primaryImage");

    return {
      id: String(formData?.get("productId") || "")?.trim(),
      category: String(formData?.get("category") || "")?.trim(),
      name: {
        "pt-BR": String(formData?.get("namePt") || ""),
        "en-US": String(formData?.get("nameEn") || ""),
      },
      description: {
        "pt-BR": String(formData?.get("descriptionPt") || ""),
        "en-US": String(formData?.get("descriptionEn") || ""),
      },
      longDescription: {
        "pt-BR": String(formData?.get("longDescriptionPt") || ""),
        "en-US": String(formData?.get("longDescriptionEn") || ""),
      },
      price: String(formData?.get("price") || ""),
      images: imageField?.images,
      primaryImage: imageField?.primaryImage,
      imageUrl: imageField?.primaryImage,
      tags: String(formData?.get("tags") || "")
        ?.split(",")
        ?.map(function (tag) {
          return tag?.trim();
        })
        ?.filter(Boolean),
      prepTime: String(formData?.get("prepTime") || ""),
      status: String(formData?.get("status") || "active") === "inactive" ? "inactive" : "active",
      available: readProductAvailabilityFromForm(formData),
      featured: formData?.get("featured") === "on",
      addOns: formData?.getAll("addOns")?.map(function (item) {
        return String(item || "");
      }),
    };
  }

  function captureProductFormDraft() {
    const form = $("productForm");
    if (!(form instanceof HTMLFormElement) || !isProductEditingActive()) {
      return;
    }

    state.productFormDraft = readProductDraft(form);
  }

  function getActiveProductDraft() {
    const draft = state?.productFormDraft;
    if (!draft) {
      return null;
    }

    const draftId = String(draft?.id || "");
    const editingId = String(state?.editingProductId || "");
    if (editingId) {
      return draftId === editingId ? draft : null;
    }

    return draftId ? null : draft;
  }

  function serializeTranslations(pt, en) {
    const ptValue = String(pt || "")?.trim();
    const enValue = String(en || "")?.trim() || ptValue;
    return { "pt-BR": ptValue, "en-US": enValue };
  }

  function normalizeComparableText(value) {
    return String(value || "")
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();
  }

  function dedupeLongDescription(description, longDescription) {
    const descriptionValue = description && typeof description === "object" ? description : {};
    const longDescriptionValue = longDescription && typeof longDescription === "object" ? longDescription : {};

    return {
      "pt-BR": normalizeComparableText(descriptionValue["pt-BR"]) === normalizeComparableText(longDescriptionValue["pt-BR"])
        ? ""
        : String(longDescriptionValue["pt-BR"] || "").trim(),
      "en-US": normalizeComparableText(descriptionValue["en-US"]) === normalizeComparableText(longDescriptionValue["en-US"])
        ? ""
        : String(longDescriptionValue["en-US"] || "").trim(),
    };
  }

  function readProductAvailabilityFromForm(formData) {
    if (typeof formData?.has === "function" && formData.has("available")) {
      return formData?.get("available") === "on";
    }

    const productId = String(formData?.get("productId") || "").trim();
    const existingProduct = productId ? getProductById(productId) : null;
    return existingProduct ? existingProduct?.available !== false : true;
  }

  function arrayTextValue(value, locale) {
    const source = value && typeof value === "object" ? value[locale] : value;
    return Array.isArray(source) ? source?.join("\n") : "";
  }

  function serializeLineTranslations(pt, en, fallback) {
    const fallbackValue = fallback && typeof fallback === "object" ? fallback : {};
    const ptValues = shared?.uniqueLines(pt);
    const enValues = shared?.uniqueLines(en);
    const fallbackPt = Array.isArray(fallbackValue["pt-BR"]) ? clone(fallbackValue["pt-BR"]) : [];
    const fallbackEn = Array.isArray(fallbackValue["en-US"]) ? clone(fallbackValue["en-US"]) : clone(fallbackPt);

    return {
      "pt-BR": ptValues?.length ? ptValues : fallbackPt,
      "en-US": enValues?.length ? enValues : (ptValues?.length ? clone(ptValues) : fallbackEn),
    };
  }

  function readProductForm(form) {
    const formData = new FormData(form);
    const namePt = String(formData?.get("namePt") || "")?.trim();
    const nameEn = String(formData?.get("nameEn") || "")?.trim();
    const category = String(formData?.get("category") || "")?.trim();
    const price = Number(formData?.get("price"));

    if (!namePt) {
      throw validationError(t("productNameRequired"), "namePt");
    }
    if (!category) {
      throw validationError(t("productCategoryRequired"), "category");
    }
    if (!Number.isFinite(price) || price < 0) {
      throw validationError(t("productPriceRequired"), "price");
    }

    const now = new Date()?.toISOString();
    const imageField = readImageFieldValue(formData, "imagesText", "primaryImage");
    const description = serializeTranslations(formData?.get("descriptionPt"), formData?.get("descriptionEn"));
    const longDescription = dedupeLongDescription(
      description,
      serializeTranslations(formData?.get("longDescriptionPt"), formData?.get("longDescriptionEn"))
    );

    return {
      id: String(formData?.get("productId") || "")?.trim(),
      category: category,
      name: serializeTranslations(namePt, nameEn),
      description: description,
      longDescription: longDescription,
      price: price,
      images: imageField?.images,
      primaryImage: imageField?.primaryImage,
      imageUrl: imageField?.primaryImage,
      tags: String(formData?.get("tags") || "")
        ?.split(",")
        ?.map(function (tag) {
          return tag?.trim();
        })
        ?.filter(Boolean),
      prepTime: formData?.get("prepTime") ? Number(formData?.get("prepTime")) : null,
      status: String(formData?.get("status") || "active") === "inactive" ? "inactive" : "active",
      available: readProductAvailabilityFromForm(formData),
      featured: formData?.get("featured") === "on",
      addOns: formData?.getAll("addOns")?.map(function (item) {
        return String(item || "");
      }),
      createdAt: now,
      updatedAt: now,
    };
  }

  function commitProduct(payload) {
    const menuState = clone(getMenuState());
    const nextProduct = clone(payload);
    const existingIndex = menuState?.products?.findIndex(function (product) {
      return product?.id === payload?.id;
    });

    if (existingIndex >= 0) {
      nextProduct.createdAt = menuState?.products[existingIndex]?.createdAt || payload?.createdAt;
      nextProduct.sortOrder = menuState?.products[existingIndex]?.sortOrder ?? existingIndex;
      menuState.products[existingIndex] = {
        ...menuState?.products[existingIndex],
        ...nextProduct,
        active: nextProduct?.status !== "inactive",
        available: nextProduct?.available !== false,
      };
      system?.setMenuState(menuState, { type: "product-update" });
      return "updated";
    }

    nextProduct.id = payload?.id || slugify(textValue(payload?.name, "pt-BR"), "produto");
    nextProduct.sortOrder = menuState?.products?.length;
    nextProduct.active = nextProduct?.status !== "inactive";
    nextProduct.available = nextProduct?.available !== false;
    menuState?.products?.push(nextProduct);
    system?.setMenuState(menuState, { type: "product-create" });
    return "created";
  }

  function readCategoryForm(form) {
    const formData = new FormData(form);
    const namePt = String(formData?.get("namePt") || "")?.trim();
    const slugOriginal = String(formData?.get("slugOriginal") || "")?.trim();
    if (!namePt) {
      throw validationError(t("categoryNameRequired"), "namePt");
    }

    return {
      slugOriginal: slugOriginal,
      slug: slugify(formData?.get("slug"), namePt),
      name: serializeTranslations(namePt, formData?.get("nameEn")),
      description: serializeTranslations(formData?.get("descriptionPt"), formData?.get("descriptionEn")),
    };
  }

  function commitCategory(payload) {
    const menuState = clone(getMenuState());
    const existingIndex = menuState?.categories?.findIndex(function (category) {
      return category?.slug === payload?.slugOriginal;
    });

    if (existingIndex >= 0) {
      const previousSlug = menuState?.categories[existingIndex]?.slug;
      menuState.categories[existingIndex] = {
        ...menuState?.categories[existingIndex],
        slug: payload?.slug,
        name: payload?.name,
        description: payload?.description,
      };
      menuState.products = menuState?.products?.map(function (product) {
        return product?.category === previousSlug ? { ...product, category: payload?.slug } : product;
      });
      system?.setMenuState(menuState, { type: "category-update" });
      return "updated";
    }

    menuState?.categories?.push({
      slug: payload?.slug,
      name: payload?.name,
      description: payload?.description,
      sortOrder: menuState?.categories?.length,
    });
    system?.setMenuState(menuState, { type: "category-create" });
    return "created";
  }

  function readAddOnForm(form) {
    const formData = new FormData(form);
    const namePt = String(formData?.get("namePt") || "")?.trim();
    const idOriginal = String(formData?.get("addOnIdOriginal") || "")?.trim();
    const price = Number(formData?.get("price") || 0);
    if (!namePt) {
      throw validationError(t("addOnNameRequired"), "namePt");
    }
    if (!Number.isFinite(price) || price < 0) {
      throw validationError(t("addOnPriceRequired"), "price");
    }

    return {
      idOriginal: idOriginal,
      id: slugify(formData?.get("addOnId"), namePt),
      name: serializeTranslations(namePt, formData?.get("nameEn")),
      price: price,
      active: formData?.get("active") === "on",
      updatedAt: new Date()?.toISOString(),
    };
  }

  function commitAddOn(payload) {
    const menuState = clone(getMenuState());
    const existingIndex = menuState?.addOns?.findIndex(function (addOn) {
      return addOn?.id === payload?.idOriginal;
    });

    if (existingIndex >= 0) {
      const previousId = menuState?.addOns[existingIndex]?.id;
      menuState.addOns[existingIndex] = {
        ...menuState?.addOns[existingIndex],
        id: payload?.id,
        name: payload?.name,
        price: payload?.price,
        active: payload?.active,
        updatedAt: payload?.updatedAt,
      };
      menuState.products = menuState?.products?.map(function (product) {
        return {
          ...product,
          addOns: Array.isArray(product?.addOns)
            ? product?.addOns?.map(function (item) {
              return item === previousId ? payload?.id : item;
            })
            : [],
        };
      });
      system?.setMenuState(menuState, { type: "add-on-update" });
      return "updated";
    }

    menuState?.addOns?.push({
      id: payload?.id,
      name: payload?.name,
      price: payload?.price,
      active: payload?.active,
      sortOrder: menuState?.addOns?.length,
      createdAt: payload?.updatedAt,
      updatedAt: payload?.updatedAt,
    });
    system?.setMenuState(menuState, { type: "add-on-create" });
    return "created";
  }

  function ensureOffersContainer(menuState) {
    menuState.offers = menuState?.offers && typeof menuState.offers === "object"
      ? menuState.offers
      : {};
    menuState.offers.combos = Array.isArray(menuState?.offers?.combos) ? menuState.offers.combos : [];
    menuState.offers.discounts = Array.isArray(menuState?.offers?.discounts) ? menuState.offers.discounts : [];
    return menuState.offers;
  }

  function readComboForm(form) {
    const formData = new FormData(form);
    const namePt = String(formData?.get("namePt") || "")?.trim();
    const price = Number(formData?.get("price"));
    if (!namePt) {
      throw validationError(t("offerNameRequired"), "namePt");
    }
    if (!Number.isFinite(price) || price < 0) {
      throw validationError(t("comboPriceRequired"), "price");
    }

    const items = (getMenuState()?.products || [])
      ?.filter(function (product) {
        return formData?.get("comboProduct-" + product?.id) === product?.id;
      })
      ?.map(function (product) {
        return {
          productId: product?.id,
          quantity: Math.max(1, Math.floor(Number(formData?.get("comboQty-" + product?.id) || 1))),
        };
      });

    if (!items?.length) {
      throw validationError(t("comboProductsRequired"), "namePt");
    }

    const now = new Date()?.toISOString();
    const imageField = readImageFieldValue(formData, "comboImagesText", "comboPrimaryImage");

    return {
      idOriginal: String(formData?.get("comboIdOriginal") || "")?.trim(),
      id: slugify(formData?.get("comboId"), namePt),
      type: "combo",
      name: serializeTranslations(namePt, formData?.get("nameEn")),
      description: serializeTranslations(formData?.get("descriptionPt"), formData?.get("descriptionEn")),
      imageUrl: imageField?.primaryImage,
      primaryImage: imageField?.primaryImage,
      images: imageField?.images,
      items,
      price,
      active: formData?.get("active") === "on",
      updatedAt: now,
    };
  }

  function commitCombo(payload) {
    const menuState = clone(getMenuState());
    const offers = ensureOffersContainer(menuState);
    const existingIndex = offers.combos.findIndex(function (combo) {
      return combo?.id === payload?.idOriginal;
    });

    if (existingIndex >= 0) {
      offers.combos[existingIndex] = {
        ...offers.combos[existingIndex],
        ...payload,
        createdAt: offers.combos[existingIndex]?.createdAt || payload?.updatedAt,
        sortOrder: offers.combos[existingIndex]?.sortOrder ?? existingIndex,
      };
      delete offers.combos[existingIndex].idOriginal;
      system?.setMenuState(menuState, { type: "combo-update" });
      return "updated";
    }

    const nextCombo = {
      ...payload,
      createdAt: payload?.updatedAt,
      sortOrder: offers.combos.length,
    };
    delete nextCombo.idOriginal;
    offers.combos.push(nextCombo);
    system?.setMenuState(menuState, { type: "combo-create" });
    return "created";
  }

  function deliveryLocationControl(row, key, field) {
    const name = "deliveryLocation" + field + "-" + key;
    return Array.from(row?.querySelectorAll("[name]") || []).find(function (control) {
      return control?.name === name;
    }) || null;
  }

  function readDeliveryLocationsFromForm(form) {
    return Array.from(form?.querySelectorAll("[data-delivery-location-row]") || [])
      .map(function (row, index) {
        const key = String(row?.dataset?.deliveryLocationRow || "");
        const namePt = String(deliveryLocationControl(row, key, "NamePt")?.value || "")?.trim();
        const nameEn = String(deliveryLocationControl(row, key, "NameEn")?.value || "")?.trim();
        const idValue = String(deliveryLocationControl(row, key, "Id")?.value || "")?.trim();
        const feeMode = String(deliveryLocationControl(row, key, "FeeMode")?.value || "fixed") === "custom" ? "custom" : "fixed";
        const feeValue = Number(deliveryLocationControl(row, key, "Fee")?.value || 0);
        const active = Boolean(deliveryLocationControl(row, key, "Active")?.checked);
        const notePt = String(deliveryLocationControl(row, key, "NotePt")?.value || "")?.trim();
        const noteEn = String(deliveryLocationControl(row, key, "NoteEn")?.value || "")?.trim();

        if (!namePt && !nameEn) {
          throw validationError(t("deliveryLocationRequired"), "deliveryLocationNamePt-" + key);
        }

        if (feeMode === "fixed" && (!Number.isFinite(feeValue) || feeValue < 0)) {
          throw validationError(t("deliveryLocationFeeInvalid"), "deliveryLocationFee-" + key);
        }

        return {
          id: slugify(idValue || namePt || nameEn, "localidade-" + (index + 1)),
          name: serializeTranslations(namePt, nameEn),
          fee: feeMode === "fixed" ? feeValue : null,
          feeMode: feeMode,
          active: active,
          note: serializeTranslations(notePt, noteEn),
        };
      });
  }

  function readSettingsForm(form) {
    const formData = new FormData(form);
    const current = clone(state?.states?.brandConfig);
    const nextAppearance = resolveThemeAppearanceForSave(
      String(formData?.get("themePreset") || ""),
      current?.appearance
    );
    const scheduleEnabled = formData?.get("scheduleEnabled") === "on";

    const brandImage = readImageFieldValue(formData, "brandLogoImagesText", "brandLogoPrimaryImage");
    const businessLocation = {
      address: String(formData?.get("pickupAddress") || "")?.trim(),
      district: String(formData?.get("locationDistrict") || "")?.trim(),
      city: String(formData?.get("locationCity") || "")?.trim(),
      state: String(formData?.get("locationState") || "")?.trim()?.toUpperCase(),
      mapsUrl: String(formData?.get("locationMapsUrl") || "")?.trim(),
      latitude: String(formData?.get("locationLatitude") || "")?.trim(),
      longitude: String(formData?.get("locationLongitude") || "")?.trim(),
      pickupNote: String(formData?.get("pickupNote") || "")?.trim(),
    };

    return {
      ...current,
      i18n: {
        ...current?.i18n,
        defaultLocale: String(formData?.get("defaultLocale") || "pt-BR"),
      },
      brand: {
        ...current?.brand,
        name: serializeTranslations(formData?.get("brandNamePt"), formData?.get("brandNameEn")),
        subtitle: serializeTranslations(formData?.get("brandSubtitlePt"), formData?.get("brandSubtitleEn")),
        footerNote: serializeTranslations(formData?.get("footerNotePt"), formData?.get("footerNoteEn")),
        logoUrl: brandImage?.primaryImage || "",
      },
      legal: {
        ...(current?.legal || {}),
        enabled: true,
        businessName: String(formData?.get("legalBusinessName") || "")?.trim(),
        businessNameEn: String(formData?.get("legalBusinessNameEn") || "")?.trim(),
        contactEmail: String(formData?.get("legalContactEmail") || "")?.trim(),
        contactPhone: String(formData?.get("legalContactPhone") || "")?.trim(),
        businessAddress: String(formData?.get("legalBusinessAddress") || "")?.trim(),
        lastUpdated: String(formData?.get("legalLastUpdated") || current?.legal?.lastUpdated || "")?.trim(),
        showPrivacyPolicy: formData?.get("legalShowPrivacyPolicy") === "on",
        showTermsOfUse: formData?.get("legalShowTermsOfUse") === "on",
        privacyPolicyMode: String(formData?.get("legalPrivacyMode") || "internal") === "external" ? "external" : "internal",
        termsOfUseMode: String(formData?.get("legalTermsMode") || "internal") === "external" ? "external" : "internal",
        privacyPolicyUrl: String(formData?.get("legalPrivacyUrl") || "")?.trim(),
        termsOfUseUrl: String(formData?.get("legalTermsUrl") || "")?.trim(),
      },
      destaqueInicial: {
        ...(current?.destaqueInicial || current?.hero || {}),
        kicker: serializeTranslations(formData?.get("destaqueChamadaPt"), formData?.get("destaqueChamadaEn")),
        title: serializeTranslations(formData?.get("destaqueTituloPt"), formData?.get("destaqueTituloEn")),
        subtitle: serializeTranslations(formData?.get("destaqueSubtituloPt"), formData?.get("destaqueSubtituloEn")),
        imageUrl: "",
        waitingTimeLabel: serializeTranslations(formData?.get("waitingLabelPt"), formData?.get("waitingLabelEn")),
        paymentLabel: serializeTranslations(formData?.get("paymentLabelPt"), formData?.get("paymentLabelEn")),
        chips: serializeLineTranslations(
          formData?.get("destaqueSelosPt"),
          formData?.get("destaqueSelosEn"),
          current?.destaqueInicial?.chips || current?.hero?.chips || { "pt-BR": ["Entrega", "Retirada", "No local"], "en-US": ["Delivery", "Pickup", "Dine in"] }
        ),
      },
      business: {
        ...current?.business,
        waitingTime: serializeTranslations(formData?.get("waitingTimePt"), formData?.get("waitingTimeEn")),
        whatsappNumber: String(formData?.get("whatsappNumber") || "")?.replace(/\D/g, ""),
        pickupAddress: businessLocation?.address,
        location: businessLocation,
        allowOrdersOutsideHours: !scheduleEnabled,
      },
      delivery: {
        ...current?.delivery,
        cityLabel: serializeTranslations(formData?.get("cityLabelPt"), formData?.get("cityLabelEn")),
        baseFee: Number(formData?.get("baseFee") || 0),
        locations: readDeliveryLocationsFromForm(form),
      },
      pix: {
        ...current?.pix,
        key: String(formData?.get("pixKey") || "")?.trim(),
        owner: serializeTranslations(formData?.get("pixOwnerPt"), formData?.get("pixOwnerEn")),
        bank: serializeTranslations(formData?.get("pixBankPt"), formData?.get("pixBankEn")),
      },
      schedule: Array?.from({ length: 7 })?.map(function (_, index) {
        const dayEnabled = scheduleEnabled && formData?.get("day-" + index) === "on";
        const openTime = String(formData?.get("day-open-" + index) || "")?.trim();
        const closeTime = String(formData?.get("day-close-" + index) || "")?.trim();
        return {
          day: index,
          enabled: dayEnabled,
          open: dayEnabled ? openTime : "",
          close: dayEnabled ? closeTime : "",
        };
      }),
      appearance: {
        ...nextAppearance,
      },
    };
  }

  function readCloudForm(form) {
    const formData = new FormData(form);
    const interval = Number(formData?.get("reconnectIntervalMs"));
    if (!Number.isFinite(interval) || interval < 1000) {
      throw new Error(t("invalidCloudInterval"));
    }

    return {
      ...(clone(state?.states?.cloudConfig) || {}),
      realtime: formData?.get("cloudRealtime") === "on",
      autoReconnect: formData?.get("autoReconnect") === "on",
      reconnectIntervalMs: interval,
    };
  }

  async function exportReport() {
    if (canUseOnlineReports() && !state?.onlineReportData) {
      try {
        state.onlineReportData = await system?.loadOnlineReportData?.(2000);
        state.onlineReportsError = "";
      } catch (error) {
        state.onlineReportData = null;
        state.onlineReportsError = error?.message || String(error);
        console.warn("Falha ao carregar métricas online para exportação; exportando fallback local.", error);
      }
    }

    const reportData = currentReportData(10);
    const status = reportData?.status;
    const report = {
      exportedAt: new Date()?.toISOString(),
      source: reportData?.source || "local",
      summary: reportData?.summary || {},
      catalog: status?.counts,
      setupIssues: buildReportSetupIssues(status),
      topAdded: reportData?.topAdded || [],
      topViewed: reportData?.topViewed || [],
      paymentChoices: reportData?.topPayments || [],
      serviceChoices: reportData?.topServices || [],
      searchesWithNoResult: reportData?.topSearchNoResults || [],
      metrics: reportData?.source === "online" ? null : system?.getMetrics(),
    };
    system?.downloadJsonFile("relatorio-cardapio-" + Date?.now() + ".json", report);
    showStatus(t("reportExported"), "ok");
  }

  function downloadBackup(filename) {
    system?.downloadJsonFile(filename, system?.exportBackup());
    showStatus(t("backupDownloaded"), "ok");
  }

  function stopCloudMonitor() {
    if (state?.cloudMonitorId) {
      window?.clearInterval(state?.cloudMonitorId);
      state.cloudMonitorId = null;
    }
  }

  function restartCloudMonitor() {
    stopCloudMonitor();
    const cloud = state?.states?.cloudConfig || {};
    if (!isAdminAuthenticated() || cloud?.autoReconnect === false) {
      return;
    }

    state.cloudMonitorId = window?.setInterval(function () {
      if (!isAdminAuthenticated()) {
        stopCloudMonitor();
        renderAuth();
        showStatus(t("sessionExpired"), "warn");
        return;
      }

      system?.checkCloudConnection()?.then(function () {
        if (state?.activeTab === "cloud" || state?.activeTab === "reports") {
          refreshAndRenderAfterRemote({ type: "cloud-status" });
        }
      })?.catch(function () {
      });
    }, Number(cloud?.reconnectIntervalMs || 30000));
  }

  async function handleAuthSubmit(form) {
    const formData = new FormData(form);
    const password = String(formData?.get("password") || "");
    const confirmPassword = String(formData?.get("confirmPassword") || "");

    if (isOnlineAdminMode()) {
      const email = String(formData?.get("email") || "").trim();
      if (!email || !password) {
        throw new Error(t("requiredField"));
      }
      await auth?.signInWithSupabase?.(getCloudConfig(), email, password);
      await syncOnlineStateAfterLogin(false);
      renderDashboard();
      return;
    }

    if (password?.length < 6) {
      throw new Error(t("passwordTooShort"));
    }

    if (!hasPassword()) {
      if (password !== confirmPassword) {
        throw new Error(t("passwordMismatch"));
      }

      await savePassword(password);
      createSession();
      renderDashboard();
      return;
    }

    if (!(await validatePassword(password))) {
      throw new Error(t("passwordWrong"));
    }

    createSession();
    renderDashboard();
  }

  function bindEvents() {
    document?.addEventListener("error", handleAdminImageError, true);

    $("adminLocaleSelector")?.addEventListener("change", function (event) {
      state.locale = resolveLocale(event?.target?.value);
      saveStorageValue(LOCALE_KEY, state?.locale, "local");
      applyLocaleToHeader();
      applyHeaderTexts();
      if (isAdminAuthenticated()) {
        renderDashboard();
      } else {
        renderAuth();
      }
      clearStatus();
    });

    document?.addEventListener("submit", function (event) {
      const form = event?.target;
      if (!(form instanceof HTMLFormElement)) {
        return;
      }

      event?.preventDefault();
      renewAdminSession();
      clearFormFieldErrors(form);
      const submitButton = event?.submitter instanceof HTMLButtonElement
        ? event.submitter
        : form?.querySelector?.('button[type="submit"]');
      const pendingMessage = form?.id === "authForm"
        ? t("actionInProgress")
        : getAdminSavePendingMessage(form?.id);
      setButtonBusy(submitButton, true, pendingMessage);
      showStatus(pendingMessage, "ok");

      Promise?.resolve()
        ?.then(async function () {
          if (form?.id === "authForm") {
            await handleAuthSubmit(form);
            return;
          }

          if (form?.id === "productForm") {
            const payload = readProductForm(form);
            clearAdminFormEditing("productForm");
            const status = commitProduct(payload);
            const localMessage = status === "updated" ? t("productSaved") : t("productCreated");
            const feedback = await publishAdminChangesAfterSave({
              formId: "productForm",
              localMessage,
            });
            renderDashboard({ preserveProductDraft: false, preserveAdminDrafts: false });
            showStatus(feedback.message, feedback.type);
            showContextStatus("#productForm", feedback.message, feedback.type);
            scheduleUiTask(function () {
              guideAdminTarget("#admin-product-form-section", {
                message: feedback.message,
                type: feedback.type,
                statusTarget: "#productForm",
                focus: false,
                scroll: false,
              });
            });
            flushPendingAdminUpdate({ preserveMenuState: true });
            return;
          }

          if (form?.id === "categoryForm") {
            const payload = readCategoryForm(form);
            clearAdminFormEditing("categoryForm");
            const status = commitCategory(payload);
            const localMessage = status === "updated" ? t("categorySaved") : t("categoryCreated");
            const feedback = await publishAdminChangesAfterSave({
              formId: "categoryForm",
              localMessage,
            });
            renderDashboard({ preserveProductDraft: false, preserveAdminDrafts: false });
            showStatus(feedback.message, feedback.type);
            showContextStatus("#categoryForm", feedback.message, feedback.type);
            scheduleUiTask(function () {
              focusAdminForm("#categoryForm", {
                message: feedback.message,
                type: feedback.type,
                focus: false,
                scroll: false,
              });
            });
            flushPendingAdminUpdate({ preserveMenuState: true });
            return;
          }

          if (form?.id === "addOnForm") {
            const payload = readAddOnForm(form);
            clearAdminFormEditing("addOnForm");
            const status = commitAddOn(payload);
            const localMessage = status === "updated" ? t("addOnSaved") : t("addOnCreated");
            const feedback = await publishAdminChangesAfterSave({
              formId: "addOnForm",
              localMessage,
            });
            renderDashboard({ preserveProductDraft: false, preserveAdminDrafts: false });
            showStatus(feedback.message, feedback.type);
            showContextStatus("#addOnForm", feedback.message, feedback.type);
            scheduleUiTask(function () {
              focusAdminForm("#addOnForm", {
                message: feedback.message,
                type: feedback.type,
                focus: false,
                scroll: false,
              });
            });
            flushPendingAdminUpdate({ preserveMenuState: true });
            return;
          }

          if (form?.id === "comboForm") {
            const payload = readComboForm(form);
            clearAdminFormEditing("comboForm");
            const status = commitCombo(payload);
            const localMessage = status === "updated" ? t("comboSaved") : t("comboCreated");
            const feedback = await publishAdminChangesAfterSave({
              formId: "comboForm",
              localMessage,
            });
            renderDashboard({ preserveProductDraft: false, preserveAdminDrafts: false });
            showStatus(feedback.message, feedback.type);
            showContextStatus("#comboForm", feedback.message, feedback.type);
            scheduleUiTask(function () {
              focusAdminForm("#comboForm", {
                message: feedback.message,
                type: feedback.type,
                focus: false,
                scroll: false,
              });
            });
            flushPendingAdminUpdate({ preserveMenuState: true });
            return;
          }

          if (form?.id === "settingsForm") {
            const nextBrandConfig = readSettingsForm(form);
            clearAdminFormEditing("settingsForm");
            clearThemePreviewState();
            system?.setBrandConfig(nextBrandConfig, { type: "settings-update" });
            const feedback = await publishAdminChangesAfterSave({
              formId: "settingsForm",
              localMessage: t("settingsSaved"),
            });
            renderDashboard({ preserveProductDraft: false, preserveAdminDrafts: false });
            showStatus(feedback.message, feedback.type);
            showContextStatus("#settingsForm", feedback.message, feedback.type);
            scheduleUiTask(function () {
              guideAdminTarget("#settingsForm", {
                message: feedback.message,
                type: feedback.type,
                focus: false,
                scroll: false,
              });
            });
            flushPendingAdminUpdate({ preserveBrandConfig: true });
            return;
          }

          if (form?.id === "cloudForm") {
            const nextCloud = readCloudForm(form);
            clearAdminFormEditing("cloudForm");
            system?.setCloudConfig(nextCloud, { type: "cloud-update" });
            if (isOnlineAdminMode()) {
              if (!isAdminAuthenticated()) {
                throw new Error(t("cloudActionLoginRequired"));
              }
              await system?.saveCloudOperationalSettings?.(nextCloud);
              await system?.syncCloudToLocal?.();
              refreshStates();
              renderDashboard({ preserveProductDraft: false, preserveAdminDrafts: false });
              showStatus(t("cloudSettingsSavedOnline"), "ok");
              showContextStatus("#cloudForm", t("cloudSettingsSavedOnline"), "ok");
              scheduleUiTask(function () {
                focusAdminForm("#cloudForm", {
                  message: t("cloudSettingsSavedOnline"),
                  type: "ok",
                  focus: false,
                  scroll: false,
                });
              });
              flushPendingAdminUpdate({ preserveCloudConfig: true });
              return;
            }
            renderDashboard({ preserveProductDraft: false, preserveAdminDrafts: false });
            showStatus(t("cloudLocalOnly"), "ok");
            showContextStatus("#cloudForm", t("cloudLocalOnly"), "ok");
            scheduleUiTask(function () {
              focusAdminForm("#cloudForm", {
                message: t("cloudLocalOnly"),
                type: "ok",
                focus: false,
                scroll: false,
              });
            });
            flushPendingAdminUpdate({ preserveCloudConfig: true });
          }
        })
        ?.catch(function (error) {
          const message = friendlyAdminErrorMessage(error, "requiredField");
          if (error?.code === "CRYPTO_UNAVAILABLE") {
            showStatus(t("cryptoUnavailable"), "error");
            return;
          }
          if (form?.id === "cloudForm") {
            const cloudMessage = friendlyAdminErrorMessage(error, "cloudSettingsSaveError");
            showStatus(cloudMessage, "error");
            showFieldValidation(form, error, cloudMessage);
            highlightAdminTarget(form?.closest?.(".admin-card") || form);
            return;
          }
          showStatus(message, "error");
          showFieldValidation(form, error, message);
          highlightAdminTarget(form?.closest?.(".admin-card") || form);
        })
        ?.finally(function () {
          setButtonBusy(submitButton, false);
        });
    });

    document?.addEventListener("input", function (event) {
      clearFieldError(event?.target);

      if (event?.target?.id === "adminProductSearch") {
        state.productFilters.search = String(event?.target?.value || "");
        const cursor = Number(event?.target?.selectionStart || state?.productFilters?.search?.length);
        renderDashboard();
        const searchField = $("adminProductSearch");
        if (searchField) {
          searchField?.focus();
          searchField?.setSelectionRange(cursor, cursor);
        }
        return;
      }

      if (event?.target?.id === "comboProductSearch") {
        const searchValue = String(event?.target?.value || "");
        const cursor = Number(event?.target?.selectionStart || searchValue?.length);
        updateComboProductFilter("search", searchValue, {
          focusSearch: true,
          cursor: cursor,
        });
        return;
      }

      if (event?.target?.id === "productImageLink") {
        const nextImage = sanitizeImageValue(event?.target?.value);
        setImageFieldValue("productImage", nextImage ? [nextImage] : [], nextImage);
        markProductEditing({ dirty: true });
        return;
      }

      if (event?.target?.id === "comboImageLink") {
        const nextImage = sanitizeImageValue(event?.target?.value);
        setImageFieldValue("comboImage", nextImage ? [nextImage] : [], nextImage);
        markAdminFormDirty(event?.target);
        return;
      }

      if (event?.target?.id === "brandLogoImageLink") {
        const nextImage = sanitizeImageValue(event?.target?.value);
        setImageFieldValue("brandLogo", nextImage ? [nextImage] : [], nextImage);
        markAdminFormDirty(event?.target);
        return;
      }

      if (isProductFormTarget(event?.target)) {
        markProductEditing({ dirty: true });
        return;
      }

      markAdminFormDirty(event?.target);
    });

    document?.addEventListener("change", function (event) {
      clearFieldError(event?.target);

      if (event?.target?.name === "themePreset") {
        activateThemePreview(String(event?.target?.value || ""), event?.target?.closest?.("form") || document);
        highlightAdminTarget("#settings-appearance");
        return;
      }

      if (event?.target?.id === "adminProductCategory") {
        state.productFilters.category = event?.target?.value || "all";
        renderDashboard();
        return;
      }

      if (event?.target?.id === "adminProductStatus") {
        state.productFilters.status = event?.target?.value || "all";
        renderDashboard();
        return;
      }

      if (event?.target?.id === "adminProductSort") {
        state.productFilters.sort = event?.target?.value || "recent";
        renderDashboard();
        return;
      }

      if (event?.target?.id === "comboProductCategory") {
        updateComboProductFilter("category", event?.target?.value || "all");
        return;
      }

      if (event?.target?.id === "comboProductView") {
        updateComboProductFilter("selectedOnly", String(event?.target?.value || "all") === "selected");
        return;
      }

      if (event?.target?.id === "comboProductAvailableOnly") {
        updateComboProductFilter("availableOnly", Boolean(event?.target?.checked));
        return;
      }

      if (event?.target?.matches?.("[data-combo-product-checkbox]")) {
        markAdminFormDirty(event?.target);
        renderDashboard();
        return;
      }

      if (event?.target?.id === "adminRestoreInput") {
        const file = event?.target?.files?.[0];
        if (!file) {
          return;
        }

        const reader = new FileReader();
        reader.onload = function () {
          try {
            const backup = JSON?.parse(String(reader?.result || ""));
            system?.restoreBackup(backup);
            clearAllAdminEditingState();
            renderDashboard({ preserveProductDraft: false, preserveAdminDrafts: false });
            showStatus(t("backupRestored"), "ok");
          } catch (error) {
            showStatus(t("invalidBackup"), "error");
          }
        };
        reader?.readAsText(file);
        return;
      }

      if (event?.target?.id === "productImageFile" || event?.target?.id === "comboImageFile" || event?.target?.id === "brandLogoFile") {
        const file = event?.target?.files?.[0];
        const fieldKey = event?.target?.id === "productImageFile"
          ? "productImage"
          : event?.target?.id === "comboImageFile"
            ? "comboImage"
            : "brandLogo";

        if (!file) {
          return;
        }

        if (!isAcceptedImageFile(file)) {
          event.target.value = "";
          showStatus(t("imageInvalidType"), "error");
          return;
        }

        if (Number(file?.size || 0) > IMAGE_MAX_BYTES) {
          event.target.value = "";
          showStatus(t("imageTooLarge"), "error");
          return;
        }

        readImageFileAsDataUrl(file)
          .then(function (dataUrl) {
            setImageFieldValue(fieldKey, [dataUrl], dataUrl);
            if (fieldKey === "productImage") {
              markProductEditing({ dirty: true });
              showStatus(t("productImageSelected"), "warn");
            } else if (fieldKey === "comboImage") {
              markAdminFormDirtyById("comboForm", ["offers"]);
              showStatus(t("comboImageChanged"), "warn");
            } else {
              markAdminFormDirtyById("settingsForm", ["settings"]);
              showStatus(t("productImageSelected"), "warn");
            }
            guideAdminTarget("#" + imageFieldConfig(fieldKey)?.fieldId, {
              message: fieldKey === "comboImage" ? t("comboImageChanged") : t("productImageSelected"),
              type: "warn",
              focus: false,
              scroll: false,
            });
          })
          .catch(function (error) {
            console.error("Falha ao ler imagem escolhida.", error);
            showStatus(t("imageFileError"), "error");
          });
        return;
      }

      if (isProductFormTarget(event?.target)) {
        markProductEditing({ dirty: true });
        if (event?.target?.id === "productImageLink" && sanitizeImageValue(event?.target?.value)) {
          showStatus(t("productImageSelected"), "warn");
          guideAdminTarget("#productImageField", {
            message: t("productImageSelected"),
            type: "warn",
            focus: false,
            scroll: false,
          });
        }
        return;
      }

      if (event?.target?.id === "comboImageLink" && sanitizeImageValue(event?.target?.value)) {
        showStatus(t("comboImageChanged"), "warn");
        guideAdminTarget("#comboImageField", {
          message: t("comboImageChanged"),
          type: "warn",
          focus: false,
          scroll: false,
        });
      }

      if (event?.target?.closest?.("#settingsForm")) {
        announceSettingsFieldChange(event?.target);
      }

      markAdminFormDirty(event?.target);
    });

    document?.addEventListener("click", function (event) {
      const comboProductCard = event?.target?.closest?.("[data-combo-product-card]");
      if (comboProductCard && !event?.target?.closest?.("input, select, textarea, button, a, label")) {
        renewAdminSession();
        toggleComboProductCard(comboProductCard);
        return;
      }

      const anchor = event?.target?.closest?.('a[href^="#"]');
      if (anchor) {
        const href = String(anchor?.getAttribute?.("href") || "")?.trim();
        const target = href && href !== "#" ? resolveAdminTarget(href) : null;
        if (target) {
          event?.preventDefault?.();
          renewAdminSession();
          if (typeof window?.history?.replaceState === "function") {
            window.history.replaceState(null, "", href);
          } else {
            window.location.hash = href;
          }
          guideAdminTarget(target, {
            focus: false,
            block: "start",
          });
          return;
        }
      }

      const button = event?.target?.closest("button");
      if (!button) {
        return;
      }

      renewAdminSession();

      if (button?.dataset?.adminTab) {
        const tabsScrollLeft = getTabsScrollLeft();
        state.activeTab = button?.dataset?.adminTab;
        if (state?.activeTab === "reports") {
          state.onlineReportData = null;
          state.onlineReportsError = "";
        }
        clearStatus();
        renderDashboard({ tabsScrollLeft: tabsScrollLeft });
        return;
      }

      if (button?.id === "logoutButton") {
        clearThemePreviewState();
        logout();
        renderAuth();
        showStatus(t("logout"), "ok");
        return;
      }


      if (button?.id === "adminClearProductFiltersBtn") {
        resetProductFilters();
        renderDashboard();
        return;
      }

      if (button?.id === "adminFocusProductFormBtn") {
        startNewProductFlow();
        return;
      }

      if (button?.id === "adminFocusProductSearchBtn") {
        focusProductSearch();
        return;
      }

      if (button?.dataset?.comboProductAction) {
        handleComboProductAction(button?.dataset?.comboProductAction);
        return;
      }

      if (button?.dataset?.deliveryLocationAdd) {
        addDeliveryLocationRow();
        return;
      }

      if (button?.dataset?.deliveryLocationRemove) {
        removeDeliveryLocationRow(button);
        return;
      }

      if (button?.dataset?.deliveryLocationCancel) {
        cancelDeliveryLocationEdit(button);
        return;
      }

      if (button?.dataset?.mediaChoose) {
        const refs = imageFieldElements(button?.dataset?.mediaChoose);
        refs?.fileInput?.click();
        return;
      }

      if (button?.dataset?.mediaRemove) {
        setImageFieldValue(button?.dataset?.mediaRemove, [], "");
        if (button?.dataset?.mediaRemove === "productImage") {
          markProductEditing({ dirty: true });
        } else if (button?.dataset?.mediaRemove === "comboImage") {
          markAdminFormDirtyById("comboForm", ["offers"]);
        } else if (button?.dataset?.mediaRemove === "brandLogo") {
          markAdminFormDirtyById("settingsForm", ["settings"]);
        }
        showStatus(button?.dataset?.mediaRemove === "comboImage" ? t("comboImageChanged") : t("productImageRemoved"), "warn");
        guideAdminTarget("#" + imageFieldConfig(button?.dataset?.mediaRemove)?.fieldId, {
          message: button?.dataset?.mediaRemove === "comboImage" ? t("comboImageChanged") : t("productImageRemoved"),
          type: "warn",
          focus: false,
          scroll: false,
        });
        return;
      }

      if (button?.id === "cancelProductEdit") {
        clearAdminFormEditing("productForm");
        renderDashboard({ preserveProductDraft: false, preserveAdminDrafts: false });
        showStatus(t("editCanceled"), "ok");
        showContextStatus("#productForm", t("editCanceled"), "ok");
        scheduleUiTask(function () {
          guideAdminTarget("#admin-product-form-section", {
            message: t("editCanceled"),
            type: "ok",
            statusTarget: "#productForm",
            focus: false,
            scroll: false,
          });
        });
        flushPendingAdminUpdate();
        return;
      }

      if (button?.id === "cancelCategoryEdit") {
        clearAdminFormEditing("categoryForm");
        renderDashboard({ preserveProductDraft: false, preserveAdminDrafts: false });
        showStatus(t("editCanceled"), "ok");
        showContextStatus("#categoryForm", t("editCanceled"), "ok");
        scheduleUiTask(function () {
          focusAdminForm("#categoryForm", {
            message: t("editCanceled"),
            type: "ok",
            focus: false,
            scroll: false,
          });
        });
        flushPendingAdminUpdate();
        return;
      }

      if (button?.id === "cancelAddOnEdit") {
        clearAdminFormEditing("addOnForm");
        renderDashboard({ preserveProductDraft: false, preserveAdminDrafts: false });
        showStatus(t("editCanceled"), "ok");
        showContextStatus("#addOnForm", t("editCanceled"), "ok");
        scheduleUiTask(function () {
          focusAdminForm("#addOnForm", {
            message: t("editCanceled"),
            type: "ok",
            focus: false,
            scroll: false,
          });
        });
        flushPendingAdminUpdate();
        return;
      }

      if (button?.id === "cancelComboEdit") {
        clearAdminFormEditing("comboForm");
        renderDashboard({ preserveProductDraft: false, preserveAdminDrafts: false });
        showStatus(t("editCanceled"), "ok");
        showContextStatus("#comboForm", t("editCanceled"), "ok");
        scheduleUiTask(function () {
          focusAdminForm("#comboForm", {
            message: t("editCanceled"),
            type: "ok",
            focus: false,
            scroll: false,
          });
        });
        flushPendingAdminUpdate();
        return;
      }

      if (button?.dataset?.productAction) {
        const action = String(button?.dataset?.productAction || "");
        if (action === "edit") {
          void handleProductAction(action, button?.dataset?.productId);
          return;
        }
        handleAsyncButton(
          button,
          shouldAutoPublishAdminForm("product-action") ? t("savingAndPublishing") : t("actionInProgress"),
          function () {
            return handleProductAction(action, button?.dataset?.productId);
          },
          "cloudPublishError"
        );
        return;
      }

      if (button?.dataset?.categoryAction) {
        const action = String(button?.dataset?.categoryAction || "");
        if (action === "edit") {
          void handleCategoryAction(action, button?.dataset?.categorySlug);
          return;
        }
        handleAsyncButton(
          button,
          shouldAutoPublishAdminForm("category-action") ? t("savingAndPublishing") : t("actionInProgress"),
          function () {
            return handleCategoryAction(action, button?.dataset?.categorySlug);
          },
          "cloudPublishError"
        );
        return;
      }

      if (button?.dataset?.addOnAction) {
        const action = String(button?.dataset?.addOnAction || "");
        if (action === "edit") {
          void handleAddOnAction(action, button?.dataset?.addOnId);
          return;
        }
        handleAsyncButton(
          button,
          shouldAutoPublishAdminForm("add-on-action") ? t("savingAndPublishing") : t("actionInProgress"),
          function () {
            return handleAddOnAction(action, button?.dataset?.addOnId);
          },
          "cloudPublishError"
        );
        return;
      }

      if (button?.dataset?.comboAction) {
        const action = String(button?.dataset?.comboAction || "");
        if (action === "edit") {
          void handleComboAction(action, button?.dataset?.comboId);
          return;
        }
        handleAsyncButton(
          button,
          shouldAutoPublishAdminForm("combo-action") ? t("savingAndPublishing") : t("actionInProgress"),
          function () {
            return handleComboAction(action, button?.dataset?.comboId);
          },
          "cloudPublishError"
        );
        return;
      }

      if (button?.id === "adminCheckCloudBtn") {
        if (!ensureCloudActionReady()) {
          return;
        }
        handleAsyncButton(button, t("actionInProgress"), function () {
          return system?.checkCloudConnection()?.then(function (result) {
            refreshAndRenderAfterRemote({ type: "cloud-status" });
            if (result?.status === "connected") {
              showStatus(t("cloudConnectionOk"), "ok");
              return;
            }
            showStatus(t("cloudConnectionError"), "error");
          });
        }, "cloudConnectionError");
        return;
      }

      if (button?.id === "adminCheckAuthBtn") {
        if (!ensureCloudActionReady()) {
          return;
        }
        handleAsyncButton(button, t("actionInProgress"), function () {
          return auth?.verifySupabaseSession?.(getCloudConfig())?.then(function () {
            showStatus(t("cloudAuthOk"), "ok");
          });
        }, "onlineRequired");
        return;
      }

      if (button?.id === "adminCheckStorageBtn") {
        if (!ensureCloudActionReady()) {
          return;
        }
        handleAsyncButton(button, t("actionInProgress"), function () {
          return system?.checkCloudStorage?.()?.then(function () {
            showStatus(t("cloudStorageOk"), "ok");
          });
        }, "imageUploadPublishError");
        return;
      }

      if (button?.id === "adminMigrateCloudBtn") {
        if (!ensureCloudActionReady()) {
          return;
        }
        if (guardCloudActionWhileEditing()) {
          return;
        }
        handleAsyncButton(button, t("cloudPublishing"), function () {
          return system?.replaceCloudCatalog()?.then(function (result) {
            const hasImageUploadWarnings = Boolean(result?.imageUploadWarnings?.length);
            refreshAndRenderAfterRemote({ type: "cloud-sync-to-local" });
            showStatus(
              hasImageUploadWarnings ? t("cloudPublishedWithImageWarning") : t("cloudPublished"),
              hasImageUploadWarnings ? "warn" : "ok"
            );
            scheduleUiTask(function () {
              guideAdminTarget("[data-admin-tab-panel=\"cloud\"]", {
                message: hasImageUploadWarnings ? t("cloudPublishedWithImageWarning") : t("cloudPublished"),
                type: hasImageUploadWarnings ? "warn" : "ok",
                focus: false,
                scroll: false,
              });
            });
          });
        }, "cloudPublishError");
        return;
      }

      if (button?.id === "adminSyncCloudBtn") {
        if (!ensureCloudActionReady()) {
          return;
        }
        if (guardCloudActionWhileEditing({ deferOperation: "sync-cloud-to-local" })) {
          return;
        }
        handleAsyncButton(button, t("cloudLoading"), function () {
          return system?.syncCloudToLocal()?.then(function () {
            refreshAndRenderAfterRemote({ type: "cloud-sync-to-local" });
            showStatus(t("cloudLoaded"), "ok");
            scheduleUiTask(function () {
              guideAdminTarget("[data-admin-tab-panel=\"cloud\"]", {
                message: t("cloudLoaded"),
                type: "ok",
                focus: false,
                scroll: false,
              });
            });
          });
        }, "cloudLoadError");
        return;
      }

      if (button?.id === "adminExportReportBtn") {
        handleAsyncButton(button, t("actionInProgress"), function () {
          return exportReport();
        });
        return;
      }

      if (button?.id === "adminClearMetricsBtn") {
        handleAsyncButton(button, t("actionInProgress"), async function () {
          let onlineWarning = false;
          system?.clearMetrics();

          if (canUseOnlineReports() && typeof system?.clearOnlineMetrics === "function") {
            try {
              await system?.clearOnlineMetrics?.();
            } catch (error) {
              onlineWarning = true;
              state.onlineReportsError = error?.message || String(error);
              console.warn("Falha ao limpar métricas online.", error);
            }
          }

          state.onlineReportData = null;
          if (!onlineWarning) {
            state.onlineReportsError = "";
          }
          renderDashboard();
          showStatus(onlineWarning ? t("reportClearOnlineWarning") : t("metricsCleared"), onlineWarning ? "warn" : "ok");
        });
        return;
      }

      if (button?.id === "adminBackupBtn") {
        downloadBackup("backup-cardapio-" + Date?.now() + ".json");
        return;
      }

      if (button?.id === "adminRestoreBtn") {
        $("adminRestoreInput")?.click();
        return;
      }

      if (button?.id === "adminResetBtn") {
        if (!window?.confirm(t("resetWarning"))) {
          return;
        }
        system?.downloadJsonFile("backup-pre-reset-" + Date?.now() + ".json", system?.exportBackup());
        system?.resetSystem();
        clearAllAdminEditingState();
        renderDashboard({ preserveProductDraft: false, preserveAdminDrafts: false });
        showStatus(t("systemResetDone"), "ok");
        return;
      }

      if (button?.id === "adminSanitizeBtn") {
        system?.sanitizeSystemData();
        renderDashboard();
        showStatus(t("systemSanitized"), "ok");
      }
    });

    window?.addEventListener("template:state-change", function (event) {
      if (shouldDeferAdminStateChange(event?.detail)) {
        deferRemoteAdminUpdate(event?.detail);
        return;
      }

      refreshStates();
      if (isAdminAuthenticated()) {
        renderDashboard();
      }
    });
  }

  async function handleProductAction(action, productId) {
    const product = getProductById(productId);
    if (!product) {
      return;
    }

    const menuState = clone(getMenuState());
    const index = menuState?.products?.findIndex(function (item) {
      return item?.id === productId;
    });

    if (action === "edit") {
      clearProductEditingState();
      state.editingProductId = productId;
      state.productFormGuidance = "edit";
      state.productFormGuidanceName = productName(product);
      markProductEditing({ editing: true, dirty: false });
      renderDashboard({ preserveProductDraft: false });
      const message = t("editingProduct", { name: productName(product) });
      showStatus(message, "ok");
      scheduleUiTask(function () {
        focusProductForm({ highlight: true, message: message });
      });
      return;
    }

    if (action === "toggle" && index >= 0) {
      const nextStatus = normalizeProductStatus(product) === "active" ? "inactive" : "active";
      menuState.products[index] = {
        ...menuState?.products[index],
        status: nextStatus,
        active: nextStatus !== "inactive",
        available: menuState?.products[index]?.available !== false,
        updatedAt: new Date()?.toISOString(),
      };
      system?.setMenuState(menuState, { type: "product-toggle" });
      const feedback = await publishAdminChangesAfterSave({
        formId: "product-action",
        localMessage: t("productStatusUpdated"),
      });
      renderDashboard();
      showStatus(feedback.message, feedback.type);
      scheduleUiTask(function () {
        guideAdminTarget("#admin-products-list-section", {
          message: feedback.message,
          type: feedback.type,
          focus: false,
          scroll: false,
        });
      });
      return;
    }

    if (action === "availability" && index >= 0) {
      menuState.products[index] = {
        ...menuState?.products[index],
        available: menuState?.products[index]?.available === false,
        updatedAt: new Date()?.toISOString(),
      };
      system?.setMenuState(menuState, { type: "product-availability" });
      const feedback = await publishAdminChangesAfterSave({
        formId: "product-action",
        localMessage: t("productAvailabilityUpdated"),
      });
      renderDashboard();
      showStatus(feedback.message, feedback.type);
      scheduleUiTask(function () {
        guideAdminTarget("#admin-products-list-section", {
          message: feedback.message,
          type: feedback.type,
          focus: false,
          scroll: false,
        });
      });
      return;
    }

    if (action === "delete" && index >= 0) {
      if (!window?.confirm(t("deleteWarning", { name: productName(product) }))) {
        return;
      }
      const wasEditingDeletedProduct = state?.editingProductId === productId;
      menuState?.products?.splice(index, 1);
      system?.setMenuState(menuState, { type: "product-delete" });
      const feedback = await publishAdminChangesAfterSave({
        formId: "product-action",
        localMessage: t("productDeleted"),
      });
      if (wasEditingDeletedProduct) {
        state.editingProductId = "";
        clearProductEditingState();
      }
      renderDashboard({ preserveProductDraft: !wasEditingDeletedProduct });
      showStatus(feedback.message, feedback.type);
      scheduleUiTask(function () {
        guideAdminTarget("#admin-products-list-section", {
          message: feedback.message,
          type: feedback.type,
          focus: false,
          scroll: false,
        });
      });
    }
  }

  async function handleCategoryAction(action, categorySlug) {
    const category = getCategoryBySlug(categorySlug);
    if (!category) {
      return;
    }

    if (action === "edit") {
      clearAdminFormEditing("categoryForm");
      state.editingCategorySlug = categorySlug;
      renderDashboard({ preserveAdminDrafts: false });
      const message = t("categoryEditing", { name: categoryName(category) });
      showStatus(message, "ok");
      scheduleUiTask(function () {
        focusAdminForm("#categoryForm", {
          message: message,
          type: "ok",
          highlight: true,
          focusSelector: 'input[name="namePt"], input[name="slug"]',
        });
      });
      return;
    }

    if (action === "delete") {
      const menuState = clone(getMenuState());
      if (menuState.categories.length <= 1) {
        showStatus(t("keepAtLeastOneCategory"), "error");
        return;
      }

      if (!window?.confirm(t("deleteCategoryWarning", { name: categoryName(category) }))) {
        return;
      }

      const replacement = menuState?.categories?.find(function (item) {
        return item?.slug !== categorySlug;
      });
      menuState.categories = menuState?.categories?.filter(function (item) {
        return item?.slug !== categorySlug;
      });
      menuState.products = menuState?.products?.map(function (product) {
        return product?.category === categorySlug ? { ...product, category: replacement?.slug } : product;
      });
      system?.setMenuState(menuState, { type: "category-delete" });
      const feedback = await publishAdminChangesAfterSave({
        formId: "category-action",
        localMessage: t("categoryDeleted"),
      });
      clearAdminFormEditing("categoryForm");
      renderDashboard({ preserveAdminDrafts: false });
      showStatus(feedback.message, feedback.type);
      scheduleUiTask(function () {
        guideAdminTarget("#admin-categories-list-section", {
          message: feedback.message,
          type: feedback.type,
          focus: false,
          scroll: false,
        });
      });
    }
  }

  async function handleAddOnAction(action, addOnId) {
    const addOn = getAddOnById(addOnId);
    if (!addOn) {
      return;
    }

    if (action === "edit") {
      clearAdminFormEditing("addOnForm");
      state.editingAddOnId = addOnId;
      renderDashboard({ preserveAdminDrafts: false });
      const message = t("addOnEditing", { name: addOnName(addOn) });
      showStatus(message, "ok");
      scheduleUiTask(function () {
        focusAdminForm("#addOnForm", {
          message: message,
          type: "ok",
          highlight: true,
          focusSelector: 'input[name="namePt"], input[name="addOnId"]',
        });
      });
      return;
    }

    if (action === "delete") {
      const menuState = clone(getMenuState());
      if (!window?.confirm(t("deleteWarning", { name: addOnName(addOn) }))) {
        return;
      }

      menuState.addOns = menuState?.addOns?.filter(function (item) {
        return item?.id !== addOnId;
      });
      menuState.products = menuState?.products?.map(function (product) {
        return {
          ...product,
          addOns: Array.isArray(product?.addOns)
            ? product?.addOns?.filter(function (item) {
              return item !== addOnId;
            })
          : [],
        };
      });
      system?.setMenuState(menuState, { type: "add-on-delete" });
      const feedback = await publishAdminChangesAfterSave({
        formId: "add-on-action",
        localMessage: t("addOnDeleted"),
      });
      clearAdminFormEditing("addOnForm");
      renderDashboard({ preserveAdminDrafts: false });
      showStatus(feedback.message, feedback.type);
      scheduleUiTask(function () {
        guideAdminTarget("#admin-addons-list-section", {
          message: feedback.message,
          type: feedback.type,
          focus: false,
          scroll: false,
        });
      });
    }
  }

  async function handleComboAction(action, comboId) {
    const combo = getComboById(comboId);
    if (!combo) {
      return;
    }

    const menuState = clone(getMenuState());
    const offers = ensureOffersContainer(menuState);
    const index = offers.combos.findIndex(function (item) {
      return item?.id === comboId;
    });

    if (action === "edit") {
      clearAdminFormEditing("comboForm");
      state.editingComboId = comboId;
      renderDashboard({ preserveAdminDrafts: false });
      const message = t("comboEditing", { name: offerName(combo) });
      showStatus(message, "ok");
      scheduleUiTask(function () {
        focusAdminForm("#comboForm", {
          message: message,
          type: "ok",
          highlight: true,
          focusSelector: 'input[name="namePt"], input[name="comboId"]',
        });
      });
      return;
    }

    if (action === "toggle" && index >= 0) {
      offers.combos[index] = {
        ...offers.combos[index],
        active: offers.combos[index]?.active === false,
        updatedAt: new Date()?.toISOString(),
      };
      system?.setMenuState(menuState, { type: "combo-toggle" });
      const feedback = await publishAdminChangesAfterSave({
        formId: "combo-action",
        localMessage: t("comboSaved"),
      });
      renderDashboard();
      showStatus(feedback.message, feedback.type);
      scheduleUiTask(function () {
        guideAdminTarget("[data-admin-tab-panel=\"offers\"]", {
          message: feedback.message,
          type: feedback.type,
          focus: false,
          scroll: false,
        });
      });
      return;
    }

    if (action === "delete" && index >= 0) {
      if (!window?.confirm(t("deleteWarning", { name: offerName(combo) }))) {
        return;
      }
      offers.combos.splice(index, 1);
      if (state?.editingComboId === comboId) {
        clearAdminFormEditing("comboForm");
      }
      system?.setMenuState(menuState, { type: "combo-delete" });
      const feedback = await publishAdminChangesAfterSave({
        formId: "combo-action",
        localMessage: t("comboDeleted"),
      });
      renderDashboard({ preserveAdminDrafts: false });
      showStatus(feedback.message, feedback.type);
      scheduleUiTask(function () {
        guideAdminTarget("[data-admin-tab-panel=\"offers\"]", {
          message: feedback.message,
          type: feedback.type,
          focus: false,
          scroll: false,
        });
      });
    }
  }

  function init() {
    refreshStates();
    state.locale = resolveLocale(state?.locale || getDefaultLocale());
    applyTheme();
    applyLocaleToHeader();
    applyHeaderTexts();
    bindEvents();
    setupPageNavigationTransition();
    setupAdminMobileBackToTop();

    if (isOnlineAdminMode()) {
      if (isAdminAuthenticated()) {
        renderDashboard();
        syncOnlineStateAfterLogin(false).then(function () {
          renderDashboard();
        });
      } else {
        renderAuth();
      }
    } else if (isAuthenticated()) {
      createSession();
      renderDashboard();
    } else {
      renderAuth();
    }

    window?.setInterval(function () {
      if (!isAdminAuthenticated()) {
        logout();
        renderAuth();
        showStatus(isOnlineAdminMode() ? t("onlineSessionExpired") : t("sessionExpired"), "warn");
      }
    }, 60000);
  }

  init();
})();
