(function () {
  const system = window?.TemplateProductSystem;
  const shared = window?.TemplateShared;

  if (!system || !shared) {
    document.body.innerHTML = "Não foi possível carregar o cardápio.";
    return;
  }

  const STORAGE_KEYS = {
    cart: "template-cardapio-cart-v3",
    form: "template-cardapio-form-v3",
    locale: system?.keys?.legacyLocale || "template-cardapio-locale-v2",
    accessibility: "template-cardapio-accessibility-mode-v1",
  };
  const ADMIN_MOBILE_BACK_TO_TOP_KEY = "template-cardapio-admin-mobile-back-top-v1";

  const AUTHOR_NAME = "Kayron Magalhães";
  const AUTHOR_URL = "https://www.instagram.com/kayronmagl/";

  const MESSAGES = {
    "pt-BR": {
      languageLabel: "Idioma",
      languageSelectAria: "Selecionar idioma",
      cartButton: "Carrinho",
      summaryStartAria: "Resumo inicial",
      destaqueInicialAria: "Destaques do atendimento",
      destaqueInformacoesAria: "Informações rápidas",
      scheduleTitle: "Horários de funcionamento",
      scheduleHelp: "Confira se estamos atendendo agora.",
      nextSchedule: "Próximo horário",
      scheduleAvailability: "Disponibilidade",
      weeklyAgenda: "Agenda semanal",
      weeklyAgendaAria: "Agenda semanal",
      categoriesAria: "Categorias do cardápio",
      footerAria: "Informações do cardápio",
      footerNavAria: "Links do site",
      footerNoteFallback: "Obrigado pela preferência.",
      footerBackToTop: "Voltar ao topo",
      footerViewMenu: "Ver cardápio",
      footerAdmin: "Entrar no Admin",
      authorCreditAria: "Crédito de autoria",
      authorCreditPrefix: "Cardápio digital por",
      locationSectionAria: "Localização",
      locationTitle: "Localização",
      locationAddressLabel: "Endereço",
      directionsButton: "Ver rota",
      pickupLocationTitle: "Retirada no local",
      directionsTitle: "Como chegar",
      publicMenuTitle: "Cardápio digital",
      businessNameFallback: "Nome do seu negócio",
      menuSubtitleFallback: "Lanches, bebidas e sobremesas",
      addressServiceAreaFallback: "Confirme o endereço com o estabelecimento.",
      highlightMessageFallback: "Escolha os produtos, revise o carrinho e envie a mensagem para o estabelecimento.",
      openNow: "Aberto agora",
      closed: "Fechado",
      closedToday: "Fechado",
      closedNow: "Fechado",
      noSchedule: "Sem horários configurados",
      serviceUntil: "Atendimento até {{time}}",
      scheduleFlexible: "Pedidos sem bloqueio por horário.",
      opensToday: "Abre hoje às {{time}}",
      opensTomorrow: "Abre amanhã às {{time}}",
      opensOnDay: "Abre {{day}} às {{time}}",
      nextDaySuffix: " (dia seguinte)",
      catalogToolsAria: "Ferramentas do catálogo",
      catalogFiltersSummary: "Busca e filtros",
      searchLabel: "Busca avançada",
      searchPlaceholder: "Busque por nome, descrição, tag ou categoria",
      categoryFilter: "Categoria",
      statusFilter: "Status",
      priceFilter: "Preço",
      sortBy: "Ordenar por",
      allCategories: "Todas as categorias",
      statusAll: "Todos",
      statusActive: "Disponíveis",
      statusFeatured: "Destaques",
      statusInactive: "Indisponíveis",
      priceAll: "Qualquer preço",
      priceLow: "Até R$ 15",
      priceMid: "R$ 15 a R$ 30",
      priceHigh: "Acima de R$ 30",
      sortMenuOrder: "Ordem do cardápio",
      sortRecent: "Mais recente",
      sortName: "Nome",
      sortPriceAsc: "Menor preço",
      sortPriceDesc: "Maior preço",
      visualExpanded: "Cards maiores",
      visualCompact: "Lista compacta",
      highlightMode: "Destacar itens",
      simplifiedMode: "Visual simples",
      accessibilityButton: "Acessibilidade",
      accessibilityModeOn: "Leitura reforçada: ativada",
      accessibilityModeOff: "Leitura reforçada: desativada",
      favoritesOnly: "Favoritos",
      clearFilters: "Limpar filtros",
      categoryQuickAll: "Tudo",
      categoryCountOne: "{{count}} item",
      categoryCountOther: "{{count}} itens",
      catalogSummary: "Mostrando {{count}} de {{total}} produtos",
      catalogSummaryFavorites: "{{count}} de {{total}} produtos • favoritos filtrados",
      noItemsCategory: "Nenhum item cadastrado nesta categoria.",
      noResults: "Nenhum produto encontrado com os filtros atuais.",
      favoriteAdd: "Adicionar aos favoritos",
      favoriteRemove: "Remover dos favoritos",
      featured: "Destaque",
      prepTime: "{{value}} min",
      tagLabel: "Tags",
      galleryLabel: "Galeria",
      soldOut: "Inativo",
      customizeItem: "Personalizar",
      noAddOns: "Sem adicionais para este item.",
      addOnsAria: "Adicionais para {{product}}",
      itemNoteLabel: "Observação do item",
      optional: "Opcional",
      unavailable: "Indisponível",
      productUnavailable: "Produto indisponível",
      addToCart: "Adicionar no carrinho",
      cartCheckoutTitle: "Carrinho e pedido",
      cartDescription: "Revise os itens, escolha entrega ou retirada e confirme antes de abrir o WhatsApp.",
      orderItemsTitle: "Itens do pedido",
      orderSummaryTitle: "Resumo do pedido",
      cartItemsAria: "Itens do carrinho",
      cartFinancialSummaryAria: "Resumo financeiro do pedido",
      serviceLegend: "1. Tipo de atendimento",
      serviceHelp: "Use entrega/retirada para pedir pelo WhatsApp ou consumo no local para identificar a mesa.",
      serviceModeAria: "Tipo de atendimento",
      serviceDelivery: "Entrega / retirada",
      serviceLocal: "Consumo no local",
      deliveryLegend: "2. Entrega ou retirada",
      deliveryTypeLabel: "Receber como:",
      selectOption: "Selecione",
      deliveryOption: "Entrega",
      pickupOption: "Retirada no local",
      deliveryTypeHelp: "Entrega exige endereço. Retirada usa o endereço do estabelecimento.",
      approxTime: "Tempo aproximado: {{time}}.",
      neighborhoodLabel: "Localidade de entrega:",
      neighborhoodSelect: "Selecione a localidade",
      neighborhoodUnavailableSuffix: " (sem entrega)",
      addressLabel: "Endereço para entrega:",
      addressPlaceholder: "Rua, número e complemento",
      addressHelp: "Informe rua, número e complemento. Esse endereço é suficiente para enviar o pedido.",
      referenceLabel: "Ponto de referência:",
      referencePlaceholder: "Ex.: perto da praça",
      referenceHelp: "Opcional, mas ajuda o entregador a localizar você mais rápido.",
      customerMapLinkLabel: "Link da sua localização no Google Maps (opcional)",
      customerMapLinkPlaceholder: "https://maps.app.goo.gl/...",
      customerMapLinkHelp: "Abra o Google Maps, escolha sua localização, toque em Compartilhar e cole o link aqui para facilitar a entrega.",
      customerAddressEnoughHelp: "O link do Google Maps é opcional. Use apenas se quiser facilitar a localização da entrega.",
      customerCoordinatesLabel: "Coordenadas (opcional)",
      customerCoordinatesHelp: "Use apenas se você souber sua latitude e longitude. Exemplo: -6.025839, -38.348820",
      customerLatitudePlaceholder: "Latitude",
      customerLongitudePlaceholder: "Longitude",
      pickupAt: "Retirada no local:",
      localLegend: "2. Consumo no local",
      localHelp: "Informe o número da mesa para o pedido ser identificado com facilidade.",
      tableNumberLabel: "Número da mesa:",
      tableNumberPlaceholder: "Ex.: 3",
      customerLegend: "3. Dados do cliente",
      fullNameLabel: "Nome completo:",
      nameHelp: "Informe o nome usado para identificação do pedido.",
      rememberData: "Lembrar meus dados neste aparelho",
      paymentLegend: "4. Pagamento",
      paymentLabel: "Forma de pagamento:",
      pixOption: "Pix",
      cashOption: "Dinheiro",
      cardOption: "Cartão",
      paymentHelp: "Ao escolher Pix, a chave aparece logo abaixo para copiar.",
      pixDataTitle: "Dados do Pix",
      pixKeyLabel: "Chave:",
      pixOwnerLabel: "Titular:",
      pixBankLabel: "Banco:",
      copyPix: "Copiar chave Pix",
      pixCopied: "Chave Pix copiada.",
      pixMissing: "Defina a chave Pix nas configurações.",
      clipboardUnavailable: "Cópia automática indisponível neste navegador.",
      pixCopyFailed: "Não foi possível copiar automaticamente.",
      needsChange: "Precisa de troco?",
      changeForLabel: "Troco para quanto?",
      changeForPlaceholder: "Ex.: 50",
      notesLegend: "5. Observações",
      notesLabel: "Detalhes do pedido:",
      notesPlaceholder: "Ex.: sem cebola, sem verdura, etc.",
      notesHelp: "Use este campo para observações gerais do pedido.",
      consentLegend: "6. Consentimento",
      consentText: "Autorizo o uso dos meus dados para contato e processamento deste pedido.",
      finishOrder: "Revisar pedido",
      clearCart: "Limpar carrinho",
      close: "Fechar",
      confirmCloseAria: "Fechar confirmação",
      confirmTitle: "Confirmar pedido",
      confirmDescription: "Confira os dados abaixo antes de abrir o pedido no WhatsApp.",
      confirmAndSend: "Enviar pelo WhatsApp",
      back: "Voltar",
      mobileTotal: "Total",
      mobileItemsOne: "{{count}} item",
      mobileItemsOther: "{{count}} itens",
      viewCart: "Ver carrinho",
      emptyCart: "Seu carrinho está vazio.",
      emptyCartHint: "Adicione um produto para revisar o pedido aqui.",
      emptyCartError: "O carrinho já está vazio.",
      cartCleared: "Carrinho limpo.",
      removeItem: "Remover",
      orderSubtotal: "Subtotal",
      orderDeliveryFee: "Taxa de entrega",
      orderTotal: "Total",
      orderPartialTotal: "Total parcial",
      topItemsOne: "Itens: {{count}} item",
      topItemsOther: "Itens: {{count}} itens",
      topSubtotal: "Subtotal: {{value}}",
      cartItemsOne: "{{count}} item no carrinho.",
      cartItemsOther: "{{count}} itens no carrinho.",
      calculateFeePrompt: "Selecione a localidade para calcular a taxa.",
      deliveryUnavailable: "Não fazemos entrega em {{name}}. Selecione retirada no local.",
      deliveryFeeInfo: "Taxa de entrega para {{name}}: {{value}}.",
      deliveryBaseFeeInfo: "Taxa de entrega: {{value}}.",
      deliveryFeeCustom: "A combinar pelo WhatsApp",
      deliveryFeeCustomInfo: "Taxa de entrega para {{name}}: a combinar pelo WhatsApp.",
      deliveryLocationNoteField: "Obs. da localidade: {{value}}",
      outsideHours: "No momento estamos fora do horário de atendimento. Confira o próximo horário informado acima.",
      cartRequired: "Adicione pelo menos um item para continuar.",
      nameRequired: "Informe o nome do cliente.",
      deliveryTypeRequired: "Escolha se o pedido será por entrega ou retirada.",
      neighborhoodRequired: "Selecione a localidade de entrega.",
      addressRequired: "Informe o endereço de entrega.",
      neighborhoodBlocked: "A localidade escolhida não está disponível para entrega.",
      tableRequired: "Informe o número da mesa para continuar.",
      paymentRequired: "Escolha a forma de pagamento para continuar.",
      changeRequired: "Informe para quanto precisa de troco.",
      consentRequired: "Confirme o uso dos dados para enviar o pedido.",
      whatsappMissing: "O WhatsApp do estabelecimento não está disponível no momento.",
      orderHeader: "NOVO PEDIDO VIA CARDÁPIO - {{brand}}",
      customerField: "Cliente: {{value}}",
      serviceField: "Atendimento: {{value}}",
      typeField: "Tipo: {{value}}",
      itemsField: "ITENS:",
      subtotalField: "Subtotal: {{value}}",
      deliveryFeeField: "Taxa de entrega: {{value}}",
      totalField: "Total: {{value}}",
      partialTotalField: "Total parcial (sem taxa combinada): {{value}}",
      paymentField: "Pagamento: {{value}}",
      orderNotesField: "Obs. pedido: {{value}}",
      deliveryNeighborhoodField: "Localidade: {{value}}",
      deliveryAddressBlockLabel: "Endereço:",
      deliveryAddressField: "Endereço: {{value}}",
      deliveryReferenceField: "Referência: {{value}}",
      customerLocationField: "Localização do cliente:",
      pickupField: "Retirada no local: {{value}}",
      pickupLocationField: "Retirada no local:",
      pickupRouteField: "Rota:",
      tableField: "Mesa: {{value}}",
      changeField: "Troco para: {{value}}",
      serviceDeliveryLabel: "Entrega",
      serviceLocalLabel: "No local",
      typeDeliveryLabel: "Entrega",
      typePickupLabel: "Retirada",
      itemAddOnsField: "Adicionais: {{value}}",
      itemNoteField: "Obs. item: {{value}}",
      cloudLoading: "Atualizando cardápio...",
      cloudLoaded: "Cardápio atualizado.",
      cloudLoadError: "Não foi possível carregar os dados online.",
      cloudConnectionHint: "Você ainda pode usar os dados carregados.",
      productAdded: "Produto adicionado.",
      itemRemoved: "Item removido.",
      quantityUpdated: "Quantidade atualizada.",
      accessibilityEnabled: "Modo acessível ativado.",
      accessibilityDisabled: "Modo acessível desativado.",
      whatsappOpened: "WhatsApp aberto em nova aba. Revise e envie a mensagem.",
      popupBlocked: "Não foi possível abrir o WhatsApp. Permita pop-ups e tente novamente.",
      paymentPixLabel: "Pix",
      paymentCashLabel: "Dinheiro",
      paymentCardLabel: "Cartão",
      days: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
    },
    "en-US": {
      languageLabel: "Language",
      languageSelectAria: "Select language",
      cartButton: "Cart",
      summaryStartAria: "Opening summary",
      destaqueInicialAria: "Service highlights",
      destaqueInformacoesAria: "Quick information",
      scheduleTitle: "Opening hours",
      scheduleHelp: "Check if we are serving now.",
      nextSchedule: "Next opening",
      scheduleAvailability: "Availability",
      weeklyAgenda: "Weekly schedule",
      weeklyAgendaAria: "Weekly schedule",
      categoriesAria: "Menu categories",
      footerAria: "Menu information",
      footerNavAria: "Site links",
      footerNoteFallback: "Thanks for choosing us.",
      footerBackToTop: "Back to top",
      footerViewMenu: "View menu",
      footerAdmin: "Admin login",
      authorCreditAria: "Author credit",
      authorCreditPrefix: "Digital menu by",
      locationSectionAria: "Location",
      locationTitle: "Location",
      locationAddressLabel: "Address",
      directionsButton: "Get directions",
      pickupLocationTitle: "Pickup at the store",
      directionsTitle: "How to get there",
      publicMenuTitle: "Digital menu",
      businessNameFallback: "Your business name",
      menuSubtitleFallback: "Snacks, drinks and desserts",
      addressServiceAreaFallback: "Confirm the address with the business.",
      highlightMessageFallback: "Choose your items, review the cart, and send the message to the business.",
      openNow: "Open now",
      closed: "Closed",
      closedToday: "Closed",
      closedNow: "Closed right now",
      noSchedule: "No hours configured",
      serviceUntil: "Serving until {{time}}",
      scheduleFlexible: "Orders are available without schedule blocking.",
      opensToday: "Opens today at {{time}}",
      opensTomorrow: "Opens tomorrow at {{time}}",
      opensOnDay: "Opens {{day}} at {{time}}",
      nextDaySuffix: " (next day)",
      catalogToolsAria: "Catalog tools",
      catalogFiltersSummary: "Search and filters",
      searchLabel: "Advanced search",
      searchPlaceholder: "Search by name, description, tag, or category",
      categoryFilter: "Category",
      statusFilter: "Status",
      priceFilter: "Price",
      sortBy: "Sort by",
      allCategories: "All categories",
      statusAll: "All",
      statusActive: "Available",
      statusFeatured: "Featured",
      statusInactive: "Unavailable",
      priceAll: "Any price",
      priceLow: "Up to $15",
      priceMid: "$15 to $30",
      priceHigh: "Above $30",
      sortMenuOrder: "Menu order",
      sortRecent: "Most recent",
      sortName: "Name",
      sortPriceAsc: "Lowest price",
      sortPriceDesc: "Highest price",
      visualExpanded: "Larger cards",
      visualCompact: "Compact list",
      highlightMode: "Highlight items",
      simplifiedMode: "Simple view",
      accessibilityButton: "Accessibility",
      accessibilityModeOn: "Enhanced reading: on",
      accessibilityModeOff: "Enhanced reading: off",
      favoritesOnly: "Favorites",
      clearFilters: "Clear filters",
      categoryQuickAll: "All",
      categoryCountOne: "{{count}} item",
      categoryCountOther: "{{count}} items",
      catalogSummary: "Showing {{count}} of {{total}} products",
      catalogSummaryFavorites: "{{count}} of {{total}} products • favorites filtered",
      noItemsCategory: "No items registered in this category.",
      noResults: "No products found with the current filters.",
      favoriteAdd: "Add to favorites",
      favoriteRemove: "Remove from favorites",
      featured: "Featured",
      prepTime: "{{value}} min",
      tagLabel: "Tags",
      galleryLabel: "Gallery",
      soldOut: "Inactive",
      customizeItem: "Customize",
      noAddOns: "No add-ons for this item.",
      addOnsAria: "Add-ons for {{product}}",
      itemNoteLabel: "Item note",
      optional: "Optional",
      unavailable: "Unavailable",
      productUnavailable: "Product unavailable",
      addToCart: "Add to cart",
      cartCheckoutTitle: "Cart and order",
      cartDescription: "Review the items, choose delivery or pickup, and confirm before opening WhatsApp.",
      orderItemsTitle: "Order items",
      orderSummaryTitle: "Order summary",
      cartItemsAria: "Cart items",
      cartFinancialSummaryAria: "Order financial summary",
      serviceLegend: "1. Service type",
      serviceHelp: "Use delivery/pickup to order through WhatsApp or dine in to identify the table.",
      serviceModeAria: "Service type",
      serviceDelivery: "Delivery / pickup",
      serviceLocal: "Dine in",
      deliveryLegend: "2. Delivery or pickup",
      deliveryTypeLabel: "Receive as:",
      selectOption: "Select",
      deliveryOption: "Delivery",
      pickupOption: "Pickup",
      deliveryTypeHelp: "Delivery requires an address. Pickup uses the store address.",
      approxTime: "Estimated time: {{time}}.",
      neighborhoodLabel: "Delivery area:",
      neighborhoodSelect: "Select delivery area",
      neighborhoodUnavailableSuffix: " (unavailable)",
      addressLabel: "Delivery address:",
      addressPlaceholder: "Street, number, and details",
      addressHelp: "Enter street, number, and extra details. This address is enough to send the order.",
      referenceLabel: "Reference point:",
      referencePlaceholder: "Ex.: near the square",
      referenceHelp: "Optional, but it helps the driver find you faster.",
      customerMapLinkLabel: "Your Google Maps location link (optional)",
      customerMapLinkPlaceholder: "https://maps.app.goo.gl/...",
      customerMapLinkHelp: "Open Google Maps, choose your location, tap Share, and paste the link here to make delivery easier.",
      customerAddressEnoughHelp: "The Google Maps link is optional. Use it only if you want to make delivery easier to find.",
      customerCoordinatesLabel: "Coordinates (optional)",
      customerCoordinatesHelp: "Use only if you know your latitude and longitude. Example: -6.025839, -38.348820",
      customerLatitudePlaceholder: "Latitude",
      customerLongitudePlaceholder: "Longitude",
      pickupAt: "Pickup at the store:",
      localLegend: "2. Dine in",
      localHelp: "Enter the table number so the order can be identified easily.",
      tableNumberLabel: "Table number:",
      tableNumberPlaceholder: "Ex.: 3",
      customerLegend: "3. Customer details",
      fullNameLabel: "Full name:",
      nameHelp: "Enter the name used to identify the order.",
      rememberData: "Remember my details on this device",
      paymentLegend: "4. Payment",
      paymentLabel: "Payment method:",
      pixOption: "Pix",
      cashOption: "Cash",
      cardOption: "Card",
      paymentHelp: "When Pix is selected, the key appears below so it can be copied.",
      pixDataTitle: "Pix details",
      pixKeyLabel: "Key:",
      pixOwnerLabel: "Owner:",
      pixBankLabel: "Bank:",
      copyPix: "Copy Pix key",
      pixCopied: "Pix key copied.",
      pixMissing: "Set the Pix key in the settings.",
      clipboardUnavailable: "Automatic copy is unavailable in this browser.",
      pixCopyFailed: "Could not copy automatically.",
      needsChange: "Need change?",
      changeForLabel: "Change for how much?",
      changeForPlaceholder: "Ex.: 50",
      notesLegend: "5. Notes",
      notesLabel: "Order details:",
      notesPlaceholder: "Ex.: no onions, no greens, etc.",
      notesHelp: "Use this field for general order notes.",
      consentLegend: "6. Consent",
      consentText: "I authorize the use of my data for contact and order processing.",
      finishOrder: "Review order",
      clearCart: "Clear cart",
      close: "Close",
      confirmCloseAria: "Close confirmation",
      confirmTitle: "Confirm order",
      confirmDescription: "Check the information below before opening WhatsApp.",
      confirmAndSend: "Send through WhatsApp",
      back: "Back",
      mobileTotal: "Total",
      mobileItemsOne: "{{count}} item",
      mobileItemsOther: "{{count}} items",
      viewCart: "View cart",
      emptyCart: "Your cart is empty.",
      emptyCartHint: "Add an item to review the order here.",
      emptyCartError: "The cart is already empty.",
      cartCleared: "Cart cleared.",
      removeItem: "Remove",
      orderSubtotal: "Subtotal",
      orderDeliveryFee: "Delivery fee",
      orderTotal: "Total",
      orderPartialTotal: "Partial total",
      topItemsOne: "Items: {{count}} item",
      topItemsOther: "Items: {{count}} items",
      topSubtotal: "Subtotal: {{value}}",
      cartItemsOne: "{{count}} item in the cart.",
      cartItemsOther: "{{count}} items in the cart.",
      calculateFeePrompt: "Select the delivery area to calculate the fee.",
      deliveryUnavailable: "We do not deliver to {{name}}. Choose pickup instead.",
      deliveryFeeInfo: "Delivery fee for {{name}}: {{value}}.",
      deliveryBaseFeeInfo: "Delivery fee: {{value}}.",
      deliveryFeeCustom: "To be confirmed on WhatsApp",
      deliveryFeeCustomInfo: "Delivery fee for {{name}}: to be confirmed on WhatsApp.",
      deliveryLocationNoteField: "Location note: {{value}}",
      outsideHours: "We are currently outside business hours. Check the next opening time above.",
      cartRequired: "Add at least one item to continue.",
      nameRequired: "Enter the customer name.",
      deliveryTypeRequired: "Choose whether the order is for delivery or pickup.",
      neighborhoodRequired: "Select the delivery area.",
      addressRequired: "Enter the delivery address.",
      neighborhoodBlocked: "The selected area is unavailable for delivery.",
      tableRequired: "Enter the table number to continue.",
      paymentRequired: "Choose a payment method to continue.",
      changeRequired: "Enter the amount you need change for.",
      consentRequired: "Confirm data usage to send the order.",
      whatsappMissing: "The business WhatsApp is unavailable right now.",
      orderHeader: "NEW ORDER - {{brand}}",
      customerField: "Customer: {{value}}",
      serviceField: "Service: {{value}}",
      typeField: "Type: {{value}}",
      itemsField: "ITEMS:",
      subtotalField: "Subtotal: {{value}}",
      deliveryFeeField: "Delivery fee: {{value}}",
      totalField: "Total: {{value}}",
      partialTotalField: "Partial total (delivery fee not included): {{value}}",
      paymentField: "Payment: {{value}}",
      orderNotesField: "Order note: {{value}}",
      deliveryNeighborhoodField: "Delivery area: {{value}}",
      deliveryAddressBlockLabel: "Address:",
      deliveryAddressField: "Address: {{value}}",
      deliveryReferenceField: "Reference: {{value}}",
      customerLocationField: "Customer location:",
      pickupField: "Pickup at the store: {{value}}",
      pickupLocationField: "Pickup at the store:",
      pickupRouteField: "Directions:",
      tableField: "Table: {{value}}",
      changeField: "Change for: {{value}}",
      serviceDeliveryLabel: "Delivery",
      serviceLocalLabel: "Dine in",
      typeDeliveryLabel: "Delivery",
      typePickupLabel: "Pickup",
      itemAddOnsField: "Add-ons: {{value}}",
      itemNoteField: "Item note: {{value}}",
      cloudLoading: "Updating menu...",
      cloudLoaded: "Menu updated.",
      cloudLoadError: "Could not load the online data.",
      cloudConnectionHint: "You can still use the loaded data.",
      productAdded: "Product added.",
      itemRemoved: "Item removed.",
      quantityUpdated: "Quantity updated.",
      accessibilityEnabled: "Accessible mode on.",
      accessibilityDisabled: "Accessible mode off.",
      whatsappOpened: "WhatsApp opened in a new tab. Review and send the message.",
      popupBlocked: "Could not open WhatsApp. Allow pop-ups and try again.",
      paymentPixLabel: "Pix",
      paymentCashLabel: "Cash",
      paymentCardLabel: "Card",
      days: ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"],
    },
  };

  Object.assign(MESSAGES["pt-BR"], {
    catalogToolsAria: "Busca e filtros do cardápio",
    catalogFiltersSummary: "Buscar produtos",
    scheduleHelp: "Confira se estamos atendendo agora.",
    searchLabel: "Buscar produto",
    searchPlaceholder: "Digite nome, descrição ou categoria",
    statusFilter: "Mostrar",
    statusActive: "Disponíveis",
    statusInactive: "Indisponíveis",
    visualExpanded: "Cards maiores",
    visualCompact: "Lista compacta",
    highlightMode: "Destacar itens",
    simplifiedMode: "Visual simples",
    favoritesOnly: "Favoritos",
    noItemsCategory: "Nenhum produto disponível nesta categoria.",
    noResults: "Nenhum produto encontrado. Tente buscar por outro nome ou veja as categorias.",
    soldOut: "Indisponível no momento",
    unavailable: "Indisponível no momento",
    productUnavailable: "Produto indisponível no momento",
    cartCheckoutTitle: "Carrinho e pedido",
    cartDescription: "Revise os itens, escolha entrega ou retirada e confirme antes de abrir o WhatsApp.",
    emptyCartHint: "Adicione produtos para montar seu pedido.",
    serviceHelp: "Escolha como deseja receber ou consumir o pedido.",
    serviceDelivery: "Entrega ou retirada",
    deliveryTypeLabel: "Como deseja receber?",
    deliveryTypeHelp: "Na entrega, informe seu endereço. Na retirada, o pedido fica no estabelecimento.",
    neighborhoodLabel: "Selecione sua localidade:",
    neighborhoodSelect: "Escolha sua localidade",
    addressHelp: "Informe rua, número e complemento para a entrega.",
    customerMapLinkLabel: "Link do Google Maps da entrega (opcional)",
    customerMapLinkHelp: "Opcional. Cole o link da sua localização no Google Maps se quiser facilitar a entrega.",
    customerAddressEnoughHelp: "O endereço acima já é suficiente. O link do Google Maps é opcional.",
    customerCoordinatesLabel: "Coordenadas da entrega (opcional)",
    customerCoordinatesHelp: "Use apenas se souber latitude e longitude. Se não souber, deixe em branco.",
    pixMissing: "A chave Pix não está disponível no momento. Escolha outra forma de pagamento ou combine pelo WhatsApp.",
    clipboardUnavailable: "Não foi possível copiar automaticamente. Copie a chave Pix manualmente.",
    pixCopyFailed: "Não foi possível copiar automaticamente. Copie a chave Pix manualmente.",
    notesPlaceholder: "Ex.: sem cebola, ponto da carne, embalagem separada",
    consentText: "Autorizo o uso dos meus dados apenas para este pedido.",
    calculateFeePrompt: "Selecione sua localidade para ver a taxa de entrega.",
    deliveryUnavailable: "Não entregamos em {{name}} no momento. Escolha retirada no local.",
    deliveryFeeCustom: "A combinar pelo WhatsApp",
    deliveryLocationNoteField: "Observação da localidade: {{value}}",
    cartRequired: "Adicione produtos para montar seu pedido.",
    nameRequired: "Digite seu nome para enviar o pedido.",
    deliveryTypeRequired: "Escolha entrega ou retirada para continuar.",
    neighborhoodRequired: "Escolha uma localidade de entrega.",
    addressRequired: "Informe o endereço de entrega.",
    neighborhoodBlocked: "Essa localidade não está disponível para entrega.",
    tableRequired: "Informe o número da mesa para continuar.",
    paymentRequired: "Escolha a forma de pagamento para continuar.",
    changeRequired: "Informe para quanto precisa de troco.",
    consentRequired: "Confirme o uso dos dados para enviar o pedido.",
    whatsappMissing: "O WhatsApp do estabelecimento não está disponível no momento.",
    partialTotalField: "Total parcial (sem taxa combinada): {{value}}",
    orderNotesField: "Observações do pedido: {{value}}",
    itemNoteField: "Observação do item: {{value}}",
    cloudLoadError: "Não foi possível atualizar o cardápio agora.",
    cloudConnectionHint: "Você ainda pode usar os dados carregados.",
    popupBlocked: "Não foi possível abrir o WhatsApp. Libere pop-ups ou tente novamente.",
    transitionToAdmin: "Abrindo painel...",
    offersAria: "Combos do cardápio",
    offersKicker: "Combos",
    offersTitle: "Combos",
    offersSummary: "{{count}} combos ativos",
    offersSummaryOne: "1 combo ativo",
    comboOfferChip: "Combo",
    comboIncludes: "Inclui: {{value}}",
    comboSavings: "Economize {{value}}",
    comboAdd: "Adicionar combo",
    comboUnavailable: "Combo indisponível",
    productAdded: "Produto adicionado ao carrinho.",
    comboAdded: "Combo adicionado ao carrinho.",
    offerIncludesField: "Inclui: {{value}}",
  });

  Object.assign(MESSAGES["en-US"], {
    catalogToolsAria: "Menu search and filters",
    catalogFiltersSummary: "Search products",
    scheduleHelp: "Check if we are serving now.",
    searchLabel: "Search product",
    searchPlaceholder: "Type name, description, or category",
    statusFilter: "Show",
    statusActive: "Available",
    statusInactive: "Unavailable",
    visualExpanded: "Larger cards",
    visualCompact: "Compact list",
    highlightMode: "Highlight items",
    simplifiedMode: "Simple view",
    favoritesOnly: "Favorites",
    noItemsCategory: "No products available in this category.",
    noResults: "No products found. Try another name or browse the categories.",
    soldOut: "Unavailable now",
    unavailable: "Unavailable now",
    productUnavailable: "Product unavailable now",
    cartCheckoutTitle: "Cart and order",
    cartDescription: "Review the items, choose delivery or pickup, and confirm before opening WhatsApp.",
    emptyCartHint: "Add products to build your order.",
    serviceHelp: "Choose how you want to receive or consume the order.",
    serviceDelivery: "Delivery or pickup",
    deliveryTypeLabel: "How do you want to receive it?",
    deliveryTypeHelp: "For delivery, enter your address. For pickup, the order stays at the store.",
    neighborhoodLabel: "Select your delivery area:",
    neighborhoodSelect: "Choose your delivery area",
    addressHelp: "Enter street, number, and details for delivery.",
    customerMapLinkLabel: "Delivery Google Maps link (optional)",
    customerMapLinkHelp: "Optional. Paste your Google Maps location link if you want to make delivery easier.",
    customerAddressEnoughHelp: "The address above is enough. The Google Maps link is optional.",
    customerCoordinatesLabel: "Delivery coordinates (optional)",
    customerCoordinatesHelp: "Use only if you know latitude and longitude. If not, leave blank.",
    pixMissing: "The Pix key is unavailable right now. Choose another payment method or confirm through WhatsApp.",
    clipboardUnavailable: "Could not copy automatically. Copy the Pix key manually.",
    pixCopyFailed: "Could not copy automatically. Copy the Pix key manually.",
    notesPlaceholder: "Ex.: no onions, meat doneness, separate packaging",
    consentText: "I authorize the use of my data only for this order.",
    calculateFeePrompt: "Select your delivery area to see the delivery fee.",
    deliveryUnavailable: "We do not deliver to {{name}} right now. Choose pickup instead.",
    deliveryFeeCustom: "To be confirmed on WhatsApp",
    deliveryLocationNoteField: "Delivery area note: {{value}}",
    cartRequired: "Add products to build your order.",
    nameRequired: "Enter your name to send the order.",
    deliveryTypeRequired: "Choose delivery or pickup to continue.",
    neighborhoodRequired: "Choose a delivery area.",
    addressRequired: "Enter the delivery address.",
    neighborhoodBlocked: "This area is not available for delivery.",
    tableRequired: "Enter the table number to continue.",
    paymentRequired: "Choose a payment method to continue.",
    changeRequired: "Enter the amount you need change for.",
    consentRequired: "Confirm data usage to send the order.",
    whatsappMissing: "The business WhatsApp is unavailable right now.",
    partialTotalField: "Partial total (delivery fee not included): {{value}}",
    orderNotesField: "Order notes: {{value}}",
    itemNoteField: "Item note: {{value}}",
    cloudLoadError: "Could not update the menu right now.",
    cloudConnectionHint: "You can still use the loaded data.",
    popupBlocked: "Could not open WhatsApp. Allow pop-ups or try again.",
    transitionToAdmin: "Opening panel...",
    offersAria: "Menu combos",
    offersKicker: "Combos",
    offersTitle: "Combos",
    offersSummary: "{{count}} active combos",
    offersSummaryOne: "1 active combo",
    comboOfferChip: "Combo",
    comboIncludes: "Includes: {{value}}",
    comboSavings: "Save {{value}}",
    comboAdd: "Add combo",
    comboUnavailable: "Combo unavailable",
    productAdded: "Product added to cart.",
    comboAdded: "Combo added to cart.",
    offerIncludesField: "Includes: {{value}}",
  });

  const DEMO_TAG_TRANSLATIONS = {
    "en-US": {
      "clássico": "classic",
      duplo: "double",
      destaque: "featured",
      entrada: "starter",
      batata: "fries",
      compartilhar: "share",
      cebola: "onion",
      bebida: "drink",
      lata: "can",
      gelado: "cold",
      fruta: "fruit",
      "Água": "water",
      "água": "water",
      leve: "light",
    },
  };

  const state = {
    states: system?.getStates(),
    locale: shared?.loadStorageValue(STORAGE_KEYS?.locale, "", "local"),
    filters: {
      query: "",
      category: "all",
      status: "all",
      price: "all",
      sort: "menu",
      onlyFavorites: false,
    },
    ui: system?.getClientUiState(),
    accessibilityMode: shared?.loadStorageValue(STORAGE_KEYS?.accessibility, "disabled", "local"),
    favorites: system?.getFavorites(),
    cart: shared?.loadStorageValue(STORAGE_KEYS?.cart, [], "local"),
    rememberedForm: shared?.loadStorageValue(STORAGE_KEYS?.form, {}, "local"),
    pendingMessage: "",
    viewTracker: new Set(),
    gallerySelection: {},
    observer: null,
    realtimeSocket: null,
    realtimeHeartbeatId: null,
    realtimeRefreshTimer: null,
    realtimeRef: 1,
    realtimeConfigKey: "",
    cloudLoadInFlight: false,
    ignoreRealtimeUntil: 0,
    statusTimer: null,
    feedbackTimer: null,
  };

  const loadJson = function (key, fallback) {
    return shared?.loadStorageValue(key, fallback, "local");
  };

  const saveJson = function (key, value) {
    return shared?.saveStorageValue(key, value, "local");
  };

  const clone = shared?.clone;

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

  function t(key, params) {
    return localeTools?.translate(key, params);
  }

  function normalizeAccessibilityMode(value) {
    return String(value || "").trim().toLowerCase() === "enabled" ? "enabled" : "disabled";
  }

  function isAccessibilityEnhanced() {
    return normalizeAccessibilityMode(state?.accessibilityMode) === "enabled";
  }

  function saveAccessibilityMode(mode) {
    state.accessibilityMode = normalizeAccessibilityMode(mode);
    shared?.saveStorageValue(STORAGE_KEYS?.accessibility, state?.accessibilityMode, "local");
  }

  function rawMessage(key) {
    return localeTools?.rawMessage(key);
  }

  function textValue(value, locale) {
    return localeTools?.textValue(value, locale);
  }

  function formatProductCopy(value) {
    const text = String(value || "").replace(/\s+/g, " ").trim();
    if (!text) {
      return "";
    }

    const locale = getSupportedLocales()[currentLocale()]?.formatLocale || currentLocale() || "pt-BR";
    const lower = text.toLocaleLowerCase(locale);
    return lower.charAt(0).toLocaleUpperCase(locale) + lower.slice(1);
  }

  function arrayValue(value, locale) {
    return localeTools?.listValue(value, locale);
  }

  const escapeHtml = shared?.escapeHtml;
  const $ = shared?.byId;

  function getMenuState() {
    return state?.states?.menuState || { categories: [], addOns: [], products: [] };
  }

  function getBrandConfig() {
    return state?.states?.brandConfig || {};
  }

  function normalizeComparableText(value) {
    return String(value || "")
      .trim()
      .replace(/\s+/g, " ")
      .toLowerCase();
  }

  function isRepeatedText(primary, secondary) {
    const primaryText = normalizeComparableText(primary);
    const secondaryText = normalizeComparableText(secondary);
    return Boolean(primaryText && secondaryText && primaryText === secondaryText);
  }

  function isMobileViewport() {
    return Boolean(window?.matchMedia?.("(max-width: 768px)")?.matches) || Number(window?.innerWidth || 0) <= 768;
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

  function consumeAdminMobileBackToTopIntent() {
    try {
      const storage = window?.sessionStorage;
      const shouldReset = storage?.getItem(ADMIN_MOBILE_BACK_TO_TOP_KEY) === "1";
      storage?.removeItem(ADMIN_MOBILE_BACK_TO_TOP_KEY);
      return shouldReset;
    } catch (error) {
      return false;
    }
  }

  function setupAdminMobileBackReturn() {
    window?.addEventListener("pageshow", function (event) {
      const shouldReset = consumeAdminMobileBackToTopIntent();
      if (!shouldReset || !isMobileViewport() || !isBackForwardNavigation(event)) {
        return;
      }

      scrollWindowToTop();
    });
  }

  function setupPageNavigationTransition() {
    shared?.setupPageTransition?.({
      selector: '#linkPainelAdmin[href="admin.html"]',
      message: function () {
        return t("transitionToAdmin");
      },
      brand: function () {
        return textValue(getBrandConfig()?.brand?.name, currentLocale()) || t("businessNameFallback");
      },
      durationMs: 220,
    });
  }

  function getCloudConfig() {
    return state?.states?.cloudConfig || {};
  }

  const REALTIME_TABLE_KEYS = ["categories", "products", "addOns", "productAddOns", "settings"];

  function isCloudOnlineMode() {
    const cloud = getCloudConfig();
    return Boolean(cloud?.enabled && system?.isSupabaseConfigured(cloud));
  }

  function isRealtimeEnabled() {
    const cloud = getCloudConfig();
    return Boolean(isCloudOnlineMode() && cloud?.realtime);
  }

  function realtimeConfigKey() {
    const cloud = getCloudConfig();
    return [
      cloud?.enabled,
      cloud?.url,
      cloud?.anonKey,
      cloud?.schema,
      cloud?.realtime,
      cloud?.tables?.categories,
      cloud?.tables?.products,
      cloud?.tables?.addOns,
      cloud?.tables?.productAddOns,
    ]?.join("|");
  }

  function realtimeSocketUrl(cloud) {
    const socketUrl = new URL(
      "/realtime/v1/websocket",
      String(cloud?.url || "")?.replace(/\/+$/, "") + "/"
    );
    socketUrl.protocol = socketUrl.protocol === "https:" ? "wss:" : "ws:";
    socketUrl.searchParams.set("apikey", String(cloud?.anonKey || ""));
    socketUrl.searchParams.set("vsn", "1.0.0");
    return socketUrl.toString();
  }

  function nextRealtimeRef() {
    state.realtimeRef += 1;
    return String(state?.realtimeRef);
  }

  function closeRealtimeSubscription() {
    if (state?.realtimeHeartbeatId) {
      window?.clearInterval(state?.realtimeHeartbeatId);
      state.realtimeHeartbeatId = null;
    }

    if (state?.realtimeRefreshTimer) {
      window?.clearTimeout(state?.realtimeRefreshTimer);
      state.realtimeRefreshTimer = null;
    }

    if (state?.realtimeSocket) {
      try {
        state?.realtimeSocket?.close();
      } catch (error) {
        // Realtime is progressive. Local and reload fallback remain available.
      }
    }

    state.realtimeSocket = null;
    state.realtimeConfigKey = "";
  }

  function refreshCloudCatalogSilently(options) {
    if (!isCloudOnlineMode()) {
      return Promise.resolve(false);
    }

    const notify = options?.notify !== false;
    if (state?.cloudLoadInFlight) {
      return Promise.resolve(false);
    }

    state.cloudLoadInFlight = true;
    if (notify) {
      showStatus(t("cloudLoading"), "ok");
    }

    return system?.loadCloudCatalog()
      ?.then(function () {
        syncFromSystem();
        if (notify) {
          showStatus(t("cloudLoaded"), "ok");
        }
        return true;
      })
      ?.catch(function (error) {
        console.error("Falha ao carregar catálogo online.", error);
        if (notify) {
          showStatus(`${t("cloudLoadError")} ${t("cloudConnectionHint")}`, "error");
        }
        return false;
      })
      ?.finally(function () {
        state.cloudLoadInFlight = false;
      });
  }

  function scheduleRealtimeRefresh() {
    if (Date.now() < Number(state?.ignoreRealtimeUntil || 0) || state?.cloudLoadInFlight) {
      return;
    }

    if (state?.realtimeRefreshTimer) {
      window?.clearTimeout(state?.realtimeRefreshTimer);
    }

    state.realtimeRefreshTimer = window?.setTimeout(function () {
      state.realtimeRefreshTimer = null;
      refreshCloudCatalogSilently({ notify: false });
    }, 700);
  }

  function sendRealtimeMessage(event, topic, payload) {
    if (!state?.realtimeSocket || state?.realtimeSocket?.readyState !== WebSocket?.OPEN) {
      return;
    }

    state?.realtimeSocket?.send(JSON?.stringify({
      topic,
      event,
      payload: payload || {},
      ref: nextRealtimeRef(),
    }));
  }

  function startRealtimeSubscription() {
    if (!isRealtimeEnabled() || typeof WebSocket !== "function") {
      closeRealtimeSubscription();
      return;
    }

    const cloud = getCloudConfig();
    const key = realtimeConfigKey();
    if (state?.realtimeSocket && state?.realtimeConfigKey === key) {
      return;
    }

    closeRealtimeSubscription();
    state.realtimeConfigKey = key;

    try {
      const socket = new WebSocket(realtimeSocketUrl(cloud));
      const topic = "realtime:public:menu_catalog";
      state.realtimeSocket = socket;

      socket?.addEventListener("open", function () {
        const postgresChanges = REALTIME_TABLE_KEYS?.map(function (tableKey) {
          return {
            event: "*",
            schema: cloud?.schema || "public",
            table: cloud?.tables?.[tableKey],
          };
        })?.filter(function (entry) {
          return Boolean(entry?.table);
        });

        sendRealtimeMessage("phx_join", topic, {
          config: {
            broadcast: { self: false },
            presence: { key: "" },
            postgres_changes: postgresChanges,
          },
          access_token: cloud?.anonKey,
        });

        state.realtimeHeartbeatId = window?.setInterval(function () {
          sendRealtimeMessage("heartbeat", "phoenix", {});
        }, 25000);
      });

      socket?.addEventListener("message", function (event) {
        let message = null;
        try {
          message = JSON?.parse(event?.data);
        } catch (error) {
          return;
        }

        if (message?.event === "postgres_changes") {
          scheduleRealtimeRefresh();
        }
      });

      socket?.addEventListener("close", function () {
        if (state?.realtimeHeartbeatId) {
          window?.clearInterval(state?.realtimeHeartbeatId);
          state.realtimeHeartbeatId = null;
        }
        state.realtimeSocket = null;
      });

      socket?.addEventListener("error", function () {
        closeRealtimeSubscription();
      });
    } catch (error) {
      closeRealtimeSubscription();
    }
  }

  function bootCloudCatalog() {
    if (!isCloudOnlineMode()) {
      closeRealtimeSubscription();
      return;
    }

    refreshCloudCatalogSilently({ notify: true })?.then(function () {
      state.ignoreRealtimeUntil = Date.now() + 1500;
      startRealtimeSubscription();
    });
  }
  function getProductById(productId) {
    return getMenuState().products.find((product) => product?.id === productId) || null;
  }

  function getCategoryBySlug(slug) {
    return getMenuState().categories.find((category) => category?.slug === slug) || null;
  }

  function getAddOnById(addOnId) {
    return getMenuState().addOns.find((addOn) => addOn?.id === addOnId) || null;
  }

  function isProductActive(product) {
    if (!product) {
      return false;
    }

    if (typeof product?.active === "boolean") {
      return product.active;
    }

    return product?.status !== "inactive";
  }

  function isProductVisible(product) {
    return Boolean(product) && isProductActive(product);
  }

  function isProductPurchasable(product) {
    return isProductVisible(product) && product?.available !== false;
  }

  function productName(product) {
    return textValue(product?.name, currentLocale()) || product?.id || "";
  }

  function categoryName(category) {
    return textValue(category?.name, currentLocale()) || category?.slug || "";
  }

  function addOnName(addOn) {
    return textValue(addOn?.name, currentLocale()) || addOn?.id || "";
  }

  function getOffersState() {
    const offers = getMenuState()?.offers || {};
    return {
      combos: Array.isArray(offers?.combos) ? offers.combos : [],
      // v2.0 keeps legacy discount data tolerated in storage, but the public product only exposes combos.
      discounts: [],
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

  function offerDescription(offer) {
    return textValue(offer?.description, currentLocale()) || "";
  }

  function getComboItems(combo) {
    return (Array.isArray(combo?.items) ? combo.items : [])
      ?.map(function (item) {
        const product = getProductById(item?.productId);
        return {
          product,
          productId: item?.productId,
          quantity: Math.max(1, Number(item?.quantity || 1)),
        };
      });
  }

  function isComboPurchasable(combo) {
    const items = getComboItems(combo);
    return Boolean(
      combo?.active !== false &&
      Number(combo?.price) >= 0 &&
      items?.length &&
      items?.every(function (item) {
        return item?.product && isProductPurchasable(item.product);
      })
    );
  }

  function comboOriginalPrice(combo) {
    return getComboItems(combo)?.reduce(function (total, item) {
      return total + Number(item?.product?.price || 0) * item?.quantity;
    }, 0);
  }

  function comboIncludesText(combo) {
    return getComboItems(combo)
      ?.filter(function (item) {
        return item?.product;
      })
      ?.map(function (item) {
        return item?.quantity + "x " + productName(item.product);
      })
      ?.join(", ");
  }

  function displayProductTag(tag) {
    const raw = String(tag || "").trim();
    const localizedTags = DEMO_TAG_TRANSLATIONS[currentLocale()] || {};
    return localizedTags[raw] || raw;
  }

  function formatCurrency(value) {
    const business = getBrandConfig()?.business || {};
    const locale = getSupportedLocales()[currentLocale()]?.formatLocale || currentLocale();
    const currency = business.currency || "BRL";
    return shared?.formatCurrency(value, {
      locale: locale,
      currency: currency,
    });
  }

  function safeExternalUrl(value) {
    const raw = String(value || "")?.replace(/[<>"']/g, "")?.trim()?.slice(0, 600);
    if (!raw || !/^https?:\/\//i.test(raw)) {
      return "";
    }

    try {
      const url = new URL(raw);
      return /^https?:$/i.test(url?.protocol) ? url?.toString() : "";
    } catch (error) {
      return "";
    }
  }

  function coordinateValue(value, min, max) {
    const raw = String(value || "")?.replace(",", ".")?.trim()?.slice(0, 40);
    const number = Number(raw);
    if (!raw || !Number.isFinite(number) || number < min || number > max) {
      return "";
    }
    return String(number);
  }

  function coordinateRouteUrl(latitude, longitude) {
    const lat = coordinateValue(latitude, -90, 90);
    const lng = coordinateValue(longitude, -180, 180);
    return lat && lng ? "https://www.google.com/maps?q=" + lat + "," + lng : "";
  }

  function businessLocation() {
    const business = getBrandConfig()?.business || {};
    const location = business?.location && typeof business?.location === "object" ? business.location : {};

    return {
      address: String(location?.address || business?.pickupAddress || "")?.trim(),
      district: String(location?.district || location?.neighborhood || "")?.trim(),
      city: String(location?.city || "")?.trim(),
      state: String(location?.state || location?.uf || "")?.trim(),
      mapsUrl: safeExternalUrl(location?.mapsUrl || location?.googleMapsUrl || location?.routeUrl),
      latitude: coordinateValue(location?.latitude || location?.lat, -90, 90),
      longitude: coordinateValue(location?.longitude || location?.lng || location?.lon, -180, 180),
      pickupNote: String(location?.pickupNote || location?.note || "")?.trim(),
    };
  }

  function locationRouteUrl(location) {
    return safeExternalUrl(location?.mapsUrl) || coordinateRouteUrl(location?.latitude, location?.longitude);
  }

  function businessLocationLines(location) {
    const firstLine = [location?.address, location?.district]?.filter(Boolean)?.join(" — ");
    const cityState = location?.city && location?.state
      ? location.city + "/" + location.state
      : [location?.city, location?.state]?.filter(Boolean)?.join(" ");

    return [firstLine, cityState]?.filter(Boolean);
  }

  function customerLocationUrl(form) {
    return safeExternalUrl(form?.customerMapsUrl) || coordinateRouteUrl(form?.customerLatitude, form?.customerLongitude);
  }

  const normalizePhone = shared?.normalizePhone;

  function applyTheme() {
    const appearance = getBrandConfig()?.appearance || {};
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
    document.documentElement.lang =
      getSupportedLocales()[currentLocale()]?.htmlLang || currentLocale();
    document.body.dataset.visualMode = state?.ui?.visualMode || "expanded";
    document.body.dataset.catalogMode = state?.ui?.catalogMode || "default";
    document.body.dataset.highlightMode = String(Boolean(state?.ui?.highlightMode));
    if (isAccessibilityEnhanced()) {
      document.documentElement.dataset.accessibility = "enhanced";
    } else {
      delete document.documentElement.dataset.accessibility;
    }
  }

  function parseTimeToMinutes(timeString) {
    const parts = String(timeString || "")?.split(":");
    const hours = Number(parts[0] || 0);
    const minutes = Number(parts[1] || 0);
    return hours * 60 + minutes;
  }

  function buildScheduleWindows(referenceDate) {
    const baseDate = new Date(referenceDate);
    baseDate?.setHours(0, 0, 0, 0);
    const schedule = Array.isArray(getBrandConfig()?.schedule) ? getBrandConfig()?.schedule : [];
    const windows = [];

    for (let offset = -1; offset <= 7; offset += 1) {
      const dayDate = new Date(baseDate);
      dayDate?.setDate(baseDate?.getDate() + offset);
      const item = schedule?.find((entry) => Number(entry?.day) === dayDate?.getDay());
      if (!item?.enabled || !item?.open || !item?.close) {
        continue;
      }

      const start = new Date(dayDate);
      start?.setHours(Math?.floor(parseTimeToMinutes(item?.open) / 60), parseTimeToMinutes(item?.open) % 60, 0, 0);
      const end = new Date(dayDate);
      end?.setHours(Math?.floor(parseTimeToMinutes(item?.close) / 60), parseTimeToMinutes(item?.close) % 60, 0, 0);
      if (parseTimeToMinutes(item.close) <= parseTimeToMinutes(item?.open)) {
        end?.setDate(end?.getDate() + 1);
      }

      windows?.push({
        dayIndex: dayDate?.getDay(),
        start,
        end,
        item,
      });
    }

    return windows?.sort(function (left, right) {
      return left?.start - right?.start;
    });
  }

  function getScheduleStatus(referenceDate) {
    const business = getBrandConfig()?.business || {};
    if (business.allowOrdersOutsideHours) {
      return {
        open: true,
        label: t("openNow"),
        heading: t("scheduleAvailability"),
        detail: t("scheduleFlexible"),
      };
    }

    const now = new Date(referenceDate || Date?.now());
    const windows = buildScheduleWindows(now);
    if (!windows?.length) {
      return { open: false, label: t("closed"), heading: t("nextSchedule"), detail: t("noSchedule") };
    }

    const currentWindow = windows?.find(function (entry) {
      return now >= entry?.start && now <= entry?.end;
    });

    if (currentWindow) {
      return {
        open: true,
        label: t("openNow"),
        heading: t("nextSchedule"),
        detail: t("serviceUntil", { time: currentWindow?.item?.close }),
      };
    }

    const nextWindow = windows?.find(function (entry) {
      return entry?.start > now;
    });

    if (!nextWindow) {
      return { open: false, label: t("closed"), heading: t("nextSchedule"), detail: t("noSchedule") };
    }

    const startDay = new Date(nextWindow?.start);
    startDay?.setHours(0, 0, 0, 0);
    const nowDay = new Date(now);
    nowDay?.setHours(0, 0, 0, 0);
    const diffDays = Math?.round((startDay - nowDay) / (1000 * 60 * 60 * 24));
    let detail = "";

    if (diffDays === 0) {
      detail = t("opensToday", { time: nextWindow?.item?.open });
    } else if (diffDays === 1) {
      detail = t("opensTomorrow", { time: nextWindow?.item?.open });
    } else {
      detail = t("opensOnDay", {
        day: t("days")[nextWindow?.dayIndex],
        time: nextWindow?.item?.open,
      });
    }

    return {
      open: false,
      label: diffDays === 0 ? t("closedToday") : t("closedNow"),
      heading: t("nextSchedule"),
      detail,
    };
  }

  function renderLanguageSelector() {
    const selector = $("seletorIdioma");
    if (!selector) {
      return;
    }

    const supported = getSupportedLocales();
    selector.innerHTML = Object?.keys(supported)
      ?.map(function (localeKey) {
        const locale = supported[localeKey];
        return '<option value="' + escapeHtml(localeKey) + '">' + escapeHtml(locale?.label || localeKey) + "</option>";
      })
      ?.join("");
    selector.value = currentLocale();
  }

  function renderStaticTexts() {
    document.title = textValue(getBrandConfig()?.brand?.name, currentLocale()) || t("publicMenuTitle");
    $("rotuloIdioma").textContent = t("languageLabel");
    $("seletorIdioma")?.setAttribute("aria-label", t("languageSelectAria"));
    $("textoAcessibilidadeLabel").textContent = t("accessibilityButton");
    $("textoAcessibilidadeEstado").textContent = isAccessibilityEnhanced()
      ? t("accessibilityModeOn")
      : t("accessibilityModeOff");
    $("botaoAcessibilidade")?.setAttribute("aria-pressed", String(isAccessibilityEnhanced()));
    $("botaoAcessibilidade")?.setAttribute(
      "aria-label",
      t("accessibilityButton") + ". " + (isAccessibilityEnhanced() ? t("accessibilityModeOn") : t("accessibilityModeOff"))
    );
    $("textoBotaoCarrinho").textContent = t("cartButton");
    $("topoBlocos")?.setAttribute("aria-label", t("summaryStartAria"));
    $("secaoDestaqueInicial")?.setAttribute("aria-label", t("destaqueInicialAria"));
    $("destaqueInformacoes")?.setAttribute("aria-label", t("destaqueInformacoesAria"));
    $("tituloHorario").textContent = t("scheduleTitle");
    $("ajudaHorario").textContent = t("scheduleHelp");
    $("rotuloProximoHorario").textContent = t("nextSchedule");
    $("rotuloAgendaHorario").textContent = t("weeklyAgenda");
    $("agendaHorario")?.setAttribute("aria-label", t("weeklyAgendaAria"));
    $("catalogTools")?.setAttribute("aria-label", t("catalogToolsAria"));
    $("catalogFiltersSummary").textContent = t("catalogFiltersSummary");
    $("menuCategorias")?.setAttribute("aria-label", t("categoriesAria"));
    $("rodapeUtilitarios")?.setAttribute("aria-label", t("footerAria"));
    $("rodapeLinks")?.setAttribute("aria-label", t("footerNavAria"));
    $("linkTopo").textContent = t("footerBackToTop");
    $("linkCardapio").textContent = t("footerViewMenu");
    if ($("linkPainelAdmin")) {
      $("linkPainelAdmin").textContent = t("footerAdmin");
    }
    $("creditoAutoria")?.setAttribute("aria-label", t("authorCreditAria"));
    $("creditoAutoriaPrefixo").textContent = t("authorCreditPrefix");
    $("creditoAutoriaLink").textContent = AUTHOR_NAME;
    $("creditoAutoriaLink").setAttribute("href", AUTHOR_URL);
    $("creditoAutoriaLink").setAttribute("target", "_blank");
    $("creditoAutoriaLink").setAttribute("rel", "noopener noreferrer");
    $("secaoLocalizacao")?.setAttribute("aria-label", t("locationSectionAria"));
    if ($("tituloLocalizacao")) {
      $("tituloLocalizacao").textContent = t("locationTitle");
    }
    if ($("rotuloEnderecoEstabelecimento")) {
      $("rotuloEnderecoEstabelecimento").textContent = t("locationAddressLabel");
    }
    if ($("tituloRetiradaLocal")) {
      $("tituloRetiradaLocal").textContent = t("pickupLocationTitle");
    }
    if ($("tituloComoChegar")) {
      $("tituloComoChegar").textContent = t("directionsTitle");
    }
    if ($("linkRotaEstabelecimento")) {
      $("linkRotaEstabelecimento").textContent = t("directionsButton");
    }
    $("tituloCarrinho").textContent = t("cartCheckoutTitle");
    $("descricaoCarrinho").textContent = t("cartDescription");
    $("tituloItensPedido").textContent = t("orderItemsTitle");
    $("tituloResumoPedido").textContent = t("orderSummaryTitle");
    $("painelCarrinho")?.setAttribute("aria-label", t("cartItemsAria"));
    $("totaisCarrinho")?.setAttribute("aria-label", t("cartFinancialSummaryAria"));
    $("legendaTipoAtendimento").textContent = t("serviceLegend");
    $("ajudaTipoAtendimento").textContent = t("serviceHelp");
    $("grupoTipoAtendimento")?.setAttribute("aria-label", t("serviceModeAria"));
    $("textoAtendimentoDelivery").textContent = t("serviceDelivery");
    $("textoAtendimentoLocal").textContent = t("serviceLocal");
    $("legendaEntrega").textContent = t("deliveryLegend");
    $("labelTipoEntrega").textContent = t("deliveryTypeLabel");
    $("opcaoEntregaSelecione").textContent = t("selectOption");
    $("opcaoEntregaDelivery").textContent = t("deliveryOption");
    $("opcaoEntregaRetirada").textContent = t("pickupOption");
    $("ajudaTipoEntrega").textContent = t("deliveryTypeHelp");
    $("labelBairroEntrega").textContent = t("neighborhoodLabel");
    $("labelEnderecoEntrega").textContent = t("addressLabel");
    $("ajudaEnderecoEntrega").textContent = t("addressHelp");
    $("labelReferencia").textContent = t("referenceLabel");
    $("ajudaReferencia").textContent = t("referenceHelp");
    $("labelClienteMapsUrl").textContent = t("customerMapLinkLabel");
    $("ajudaClienteMapsUrl").textContent = t("customerMapLinkHelp");
    $("ajudaEnderecoSuficiente").textContent = t("customerAddressEnoughHelp");
    $("labelClienteCoordenadas").textContent = t("customerCoordinatesLabel");
    $("ajudaClienteCoordenadas").textContent = t("customerCoordinatesHelp");
    $("legendaNoLocal").textContent = t("localLegend");
    $("ajudaNoLocal").textContent = t("localHelp");
    $("labelNumeroMesa").textContent = t("tableNumberLabel");
    $("legendaCliente").textContent = t("customerLegend");
    $("labelNome").textContent = t("fullNameLabel");
    $("ajudaNome").textContent = t("nameHelp");
    $("textoLembrarDados").textContent = t("rememberData");
    $("legendaPagamento").textContent = t("paymentLegend");
    $("labelPagamento").textContent = t("paymentLabel");
    $("opcaoPagamentoSelecione").textContent = t("selectOption");
    $("opcaoPagamentoPix").textContent = t("pixOption");
    $("opcaoPagamentoDinheiro").textContent = t("cashOption");
    $("opcaoPagamentoCartao").textContent = t("cardOption");
    $("ajudaPagamento").textContent = t("paymentHelp");
    $("tituloPix").textContent = t("pixDataTitle");
    $("labelPixChave").textContent = t("pixKeyLabel");
    $("labelPixTitular").textContent = t("pixOwnerLabel");
    $("labelPixBanco").textContent = t("pixBankLabel");
    $("botaoCopiarPix").textContent = t("copyPix");
    $("mensagemCopiaPix").textContent = t("pixCopied");
    $("textoPrecisaTroco").textContent = t("needsChange");
    $("labelTrocoPara").textContent = t("changeForLabel");
    $("legendaObservacoes").textContent = t("notesLegend");
    $("labelObservacoes").textContent = t("notesLabel");
    $("ajudaObservacoes").textContent = t("notesHelp");
    $("legendaConsentimento").textContent = t("consentLegend");
    $("textoAceiteLgpd").textContent = t("consentText");
    $("botaoFinalizar").textContent = t("finishOrder");
    $("botaoLimparCarrinho").textContent = t("clearCart");
    $("botaoFechar").textContent = t("close");
    $("botaoFecharConfirmacaoTopo")?.setAttribute("aria-label", t("confirmCloseAria"));
    $("tituloConfirmacao").textContent = t("confirmTitle");
    $("descricaoConfirmacao").textContent = t("confirmDescription");
    $("botaoConfirmarEnvio").textContent = t("confirmAndSend");
    $("botaoCancelarConfirmacao").textContent = t("back");
    renderMobileCartLabel(0);
    $("textoBotaoCarrinhoMobile").textContent = t("viewCart");
    $("enderecoEntrega").placeholder = t("addressPlaceholder");
    $("referencia").placeholder = t("referencePlaceholder");
    $("clienteMapsUrl").placeholder = t("customerMapLinkPlaceholder");
    $("clienteLatitude").placeholder = t("customerLatitudePlaceholder");
    $("clienteLatitude")?.setAttribute("aria-label", t("customerLatitudePlaceholder"));
    $("clienteLongitude").placeholder = t("customerLongitudePlaceholder");
    $("clienteLongitude")?.setAttribute("aria-label", t("customerLongitudePlaceholder"));
    $("numeroMesa").placeholder = t("tableNumberPlaceholder");
    $("trocoPara").placeholder = t("changeForPlaceholder");
    $("observacoes").placeholder = t("notesPlaceholder");
  }

  function renderLocationSection() {
    const section = $("secaoLocalizacao");
    if (!section) {
      return;
    }

    const location = businessLocation();
    const lines = businessLocationLines(location);
    const routeUrl = locationRouteUrl(location);
    const hasContent = Boolean(lines?.length || location?.pickupNote || routeUrl);
    section.hidden = !hasContent;
    section?.classList?.toggle("oculto", !hasContent);

    if (!hasContent) {
      return;
    }

    $("blocoEnderecoEstabelecimento").hidden = !lines?.length;
    $("textoEnderecoEstabelecimento").textContent = lines?.[0] || "";
    $("textoCidadeEstabelecimento").textContent = lines?.[1] || "";
    $("textoCidadeEstabelecimento").hidden = !lines?.[1];
    $("observacaoRetirada").textContent = location?.pickupNote || "";
    $("observacaoRetirada").hidden = !location?.pickupNote;

    const routeLink = $("linkRotaEstabelecimento");
    if (routeLink) {
      routeLink.hidden = !routeUrl;
      if (routeUrl) {
        routeLink.href = routeUrl;
      } else {
        routeLink.removeAttribute("href");
      }
    }
  }

  function renderHighlightInfoMarkup(text) {
    const rawText = String(text || "")?.trim();
    if (!rawText) {
      return "";
    }

    const separatorIndex = rawText.indexOf(":");
    if (separatorIndex <= 0) {
      return '<span class="destaque-info-value">' + escapeHtml(rawText) + "</span>";
    }

    const label = rawText.slice(0, separatorIndex).trim();
    const value = rawText.slice(separatorIndex + 1).trim();
    return (
      '<span class="destaque-info-label">' + escapeHtml(label) + "</span>" +
      '<span class="destaque-info-value">' + escapeHtml(value || rawText) + "</span>"
    );
  }

  function syncPublicMetadata(brandName, menuSubtitle, highlightMessage) {
    document.title = brandName || t("publicMenuTitle");
    const description = [brandName, menuSubtitle, highlightMessage]
      .map(function (part) {
        return String(part || "").trim();
      })
      .filter(Boolean)
      .join(". ");
    const metaDescription = document?.querySelector?.('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute("content", description);
    }
  }

  function renderBranding() {
    const brand = getBrandConfig()?.brand || {};
    const destaqueInicial = getBrandConfig()?.destaqueInicial || getBrandConfig()?.hero || {};
    const business = getBrandConfig()?.business || {};
    const delivery = getBrandConfig()?.delivery || {};
    const pix = getBrandConfig()?.pix || {};
    const logoSite = $("logoSite");
    const defaultLogoUrl = "./assets/logo-tobias-lanches-web.png";
    const logoUrl = String(brand?.logoUrl || "")?.trim() || defaultLogoUrl;
    const brandName = textValue(brand?.name, currentLocale()) || t("businessNameFallback");
    const menuSubtitle = textValue(brand?.subtitle, currentLocale()) || t("menuSubtitleFallback");
    const serviceArea = textValue(delivery?.cityLabel, currentLocale()) || "";
    const highlightMessage = textValue(destaqueInicial?.subtitle, currentLocale()) || t("highlightMessageFallback");
    const location = businessLocation();
    const pickupAddress =
      businessLocationLines(location)?.join("<br>") ||
      String(business.pickupAddress || "")?.trim() ||
      textValue(delivery?.cityLabel, currentLocale()) ||
      t("addressServiceAreaFallback");

    if (logoUrl) {
      logoSite.src = logoUrl;
      logoSite.alt = "Logo " + brandName;
      logoSite.hidden = false;
    } else {
      logoSite.hidden = true;
      logoSite?.removeAttribute("src");
      logoSite.alt = "";
    }

    $("subtituloTopo").textContent = menuSubtitle;
    $("tituloSite").textContent = brandName;
    syncPublicMetadata(brandName, menuSubtitle, highlightMessage);
    const enderecoTopo = $("enderecoTopo");
    if (enderecoTopo) {
      enderecoTopo.textContent = "";
      enderecoTopo.hidden = true;
    }
    $("destaqueChamada").textContent = textValue(destaqueInicial?.kicker, currentLocale());
    $("destaqueTitulo").textContent = textValue(destaqueInicial?.title, currentLocale());
    $("destaqueSubtitulo").textContent = highlightMessage;
    $("destaqueTempo").innerHTML = renderHighlightInfoMarkup(textValue(destaqueInicial?.waitingTimeLabel, currentLocale()));
    $("destaquePagamento").innerHTML = renderHighlightInfoMarkup(textValue(destaqueInicial?.paymentLabel, currentLocale()));
    $("rodapeNota").textContent = textValue(brand?.footerNote, currentLocale()) || t("footerNoteFallback");
    $("tempoEsperaInfo").textContent = t("approxTime", {
      time: textValue(business.waitingTime, currentLocale()) || "-",
    });
    $("tempoEsperaLocal").textContent = t("approxTime", {
      time: textValue(business.waitingTime, currentLocale()) || "-",
    });
    $("avisoRetirada").innerHTML =
      "<strong>" +
      escapeHtml(t("pickupAt")) +
      "</strong><br>" +
      String(pickupAddress)
        ?.split("<br>")
        ?.map(function (line) {
          return escapeHtml(line);
        })
        ?.join("<br>") +
      (location?.pickupNote ? "<br>" + escapeHtml(location.pickupNote) : "");
    renderLocationSection();
    $("chavePixTexto").textContent = pix?.key || "-";
    $("pixTitularTexto").textContent = textValue(pix?.owner, currentLocale()) || "-";
    $("pixBancoTexto").textContent = textValue(pix?.bank, currentLocale()) || "-";

    const destaqueSelos = arrayValue(destaqueInicial?.chips, currentLocale());

    $("destaqueSelos").innerHTML = destaqueSelos
      ?.map(function (chip) {
        return '<li class="chip">' + escapeHtml(String(chip)) + "</li>";
      })
      ?.join("");
    $("destaqueSelos")?.classList?.toggle("oculto", destaqueSelos?.length === 0);

    const destaqueImagemBox = $("destaqueImagem");
    const destaqueImagemArquivo = $("destaqueImagemArquivo");
    const destaqueImagemUrl = "";
    const topoBlocos = $("topoBlocos");
    const destaqueSection = $("secaoDestaqueInicial");
    if (!destaqueImagemBox || !destaqueImagemArquivo) {
      return;
    }

    if (destaqueImagemUrl) {
      destaqueImagemBox?.classList?.remove("oculto");
      destaqueSection?.classList?.remove("destaque-inicial--without-image");
      topoBlocos?.classList?.remove("topo-blocos--without-hero-image");
      destaqueImagemArquivo.src = destaqueImagemUrl;
      destaqueImagemArquivo.alt = brandName;
    } else {
      destaqueImagemBox?.classList?.add("oculto");
      destaqueSection?.classList?.add("destaque-inicial--without-image");
      topoBlocos?.classList?.add("topo-blocos--without-hero-image");
      destaqueImagemArquivo?.removeAttribute("src");
      destaqueImagemArquivo.alt = "";
    }
  }

  function renderSchedule() {
    const agenda = $("agendaHorario");
    const schedule = Array.isArray(getBrandConfig()?.schedule) ? getBrandConfig()?.schedule : [];
    const dayNames = rawMessage("days");

    const activeDays = schedule?.filter(function (item) {
      return item?.enabled && item?.open && item?.close;
    });

    if (!activeDays?.length) {
      agenda.innerHTML = '<li class="agenda-mensagem">' + escapeHtml(t("noSchedule")) + "</li>";
    } else {
      agenda.innerHTML = activeDays
        ?.map(function (item) {
          const suffix =
            parseTimeToMinutes(item.close) <= parseTimeToMinutes(item?.open)
              ? t("nextDaySuffix")
              : "";
          return (
            "<li>" +
            '<span class="agenda-dia">' +
            escapeHtml(dayNames[item?.day] || "") +
            "</span>" +
            '<span class="agenda-hora">' +
            escapeHtml(item?.open + " - " + item?.close + suffix) +
            "</span>" +
            "</li>"
          );
        })
        ?.join("");
    }

    const status = getScheduleStatus();
    $("statusQuiosque").className = "status-quiosque " + (status?.open ? "status-aberta" : "status-fechado");
    $("statusQuiosque").textContent = status?.label;
    $("rotuloProximoHorario").textContent = status?.heading || t("nextSchedule");
    $("detalheHorario").textContent = status?.detail;
  }

  function getCategoryProductCount(slug) {
    return getMenuState()?.products?.filter(function (product) {
      return product?.category === slug && isProductPurchasable(product);
    })?.length;
  }

  function getPublicCategories() {
    return getSortedCategories()?.filter(function (category) {
      return getCategoryProductCount(category?.slug) > 0;
    });
  }

  function ensurePublicCategoryFilter(categories) {
    const nextCategories = Array.isArray(categories) ? categories : getPublicCategories();
    if (!state?.filters || state.filters.category === "all") {
      return nextCategories;
    }

    const selectedStillVisible = nextCategories.some(function (category) {
      return category?.slug === state?.filters?.category;
    });

    if (!selectedStillVisible) {
      state.filters.category = "all";
    }

    return nextCategories;
  }

  function renderToolbar() {
    const toolbar = $("catalogToolbar");
    const categories = ensurePublicCategoryFilter(getPublicCategories());

    toolbar.innerHTML =
      '<label class="catalog-field">' +
      "<span>" +
      escapeHtml(t("searchLabel")) +
      "</span>" +
      '<input type="search" id="catalogSearch" autocomplete="off" placeholder="' +
      escapeHtml(t("searchPlaceholder")) +
      '" value="' +
      escapeHtml(state?.filters?.query) +
      '">' +
      "</label>" +
      '<label class="catalog-field">' +
      "<span>" +
      escapeHtml(t("categoryFilter")) +
      "</span>" +
      '<select id="catalogCategory">' +
      '<option value="all">' +
      escapeHtml(t("allCategories")) +
      "</option>" +
      categories
        ?.map(function (category) {
          return (
            '<option value="' +
            escapeHtml(category?.slug) +
            '"' +
            (state?.filters?.category === category?.slug ? " selected" : "") +
            ">" +
            escapeHtml(categoryName(category)) +
            "</option>"
          );
        })
        ?.join("") +
      "</select>" +
      "</label>" +
      '<label class="catalog-field">' +
      "<span>" +
      escapeHtml(t("statusFilter")) +
      "</span>" +
      '<select id="catalogStatus">' +
      buildOptions(
        [
          { value: "all", label: t("statusAll") },
          { value: "active", label: t("statusActive") },
          { value: "inactive", label: t("statusInactive") },
          { value: "featured", label: t("statusFeatured") },
        ],
        state?.filters?.status
      ) +
      "</select>" +
      "</label>" +
      '<label class="catalog-field">' +
      "<span>" +
      escapeHtml(t("priceFilter")) +
      "</span>" +
      '<select id="catalogPrice">' +
      buildOptions(
        [
          { value: "all", label: t("priceAll") },
          { value: "low", label: t("priceLow") },
          { value: "mid", label: t("priceMid") },
          { value: "high", label: t("priceHigh") },
        ],
        state?.filters?.price
      ) +
      "</select>" +
      "</label>" +
      '<label class="catalog-field">' +
      "<span>" +
      escapeHtml(t("sortBy")) +
      "</span>" +
      '<select id="catalogSort">' +
      buildOptions(
        [
          { value: "menu", label: t("sortMenuOrder") },
          { value: "recent", label: t("sortRecent") },
          { value: "name", label: t("sortName") },
          { value: "priceAsc", label: t("sortPriceAsc") },
          { value: "priceDesc", label: t("sortPriceDesc") },
        ],
        state?.filters?.sort
      ) +
      "</select>" +
      "</label>" +
      '<div class="catalog-toggle-row">' +
      buildToggleButton("visualMode", state?.ui?.visualMode === "expanded" ? "expanded" : "compact", "expanded", t("visualExpanded")) +
      buildToggleButton("visualMode", state?.ui?.visualMode === "expanded" ? "expanded" : "compact", "compact", t("visualCompact")) +
      buildStateButton("highlightMode", Boolean(state?.ui?.highlightMode), t("highlightMode")) +
      buildStateButton(
        "catalogMode",
        state?.ui?.catalogMode === "simplified",
        t("simplifiedMode"),
        "simplified"
      ) +
      buildStateButton("favoritesOnly", Boolean(state?.filters?.onlyFavorites), t("favoritesOnly")) +
      "</div>" +
      '<button type="button" id="catalogResetFilters" class="botao botao-secundario catalog-reset-btn">' +
      escapeHtml(t("clearFilters")) +
      "</button>";
  }

  function buildOptions(options, selectedValue) {
    return options
      ?.map(function (item) {
        return (
          '<option value="' +
          escapeHtml(item?.value) +
          '"' +
          (selectedValue === item?.value ? " selected" : "") +
          ">" +
          escapeHtml(item?.label) +
          "</option>"
        );
      })
      ?.join("");
  }

  function buildToggleButton(group, currentValue, buttonValue, label) {
    const active = currentValue === buttonValue;
    return (
      '<button type="button" class="catalog-chip' +
      (active ? " catalog-chip--active" : "") +
      '" data-ui-group="' +
      escapeHtml(group) +
      '" data-ui-value="' +
      escapeHtml(buttonValue) +
      '">' +
      escapeHtml(label) +
      "</button>"
    );
  }

  function buildStateButton(key, active, label, value) {
    return (
      '<button type="button" class="catalog-chip' +
      (active ? " catalog-chip--active" : "") +
      '" data-flag-key="' +
      escapeHtml(key) +
      '"' +
      (value ? ' data-flag-value="' + escapeHtml(value) + '"' : "") +
      ">" +
      escapeHtml(label) +
      "</button>"
    );
  }

  function compareMenuOrder(leftOrder, rightOrder, leftLabel, rightLabel) {
    const leftSort = Number.isFinite(Number(leftOrder)) ? Number(leftOrder) : Number.MAX_SAFE_INTEGER;
    const rightSort = Number.isFinite(Number(rightOrder)) ? Number(rightOrder) : Number.MAX_SAFE_INTEGER;

    if (leftSort !== rightSort) {
      return leftSort - rightSort;
    }

    return String(leftLabel || "").localeCompare(String(rightLabel || ""), currentLocale());
  }

  function getSortedCategories() {
    return clone(getMenuState()?.categories || []).sort(function (left, right) {
      return compareMenuOrder(left?.sortOrder, right?.sortOrder, categoryName(left), categoryName(right));
    });
  }

  function getSortedProducts(products) {
    return clone(products || []).sort(function (left, right) {
      return compareMenuOrder(left?.sortOrder, right?.sortOrder, productName(left), productName(right));
    });
  }

  function renderCategoryMenu() {
    const categories = ensurePublicCategoryFilter(getPublicCategories());
    const totalCount = (getMenuState()?.products || [])?.filter(function (product) {
      return isProductVisible(product);
    })?.length;
    const totalLabel = totalCount === 1
      ? t("categoryCountOne", { count: totalCount })
      : t("categoryCountOther", { count: totalCount });
    $("menuCategorias").innerHTML =
      '<button class="categoria' +
      (state?.filters?.category === "all" ? " ativa" : "") +
      '" type="button" data-category-filter="all">' +
      '<span class="categoria-titulo">' +
      escapeHtml(t("categoryQuickAll")) +
      "</span>" +
      '<small class="categoria-contagem">' +
      escapeHtml(totalLabel) +
      "</small>" +
      "</button>" +
      categories
        ?.map(function (category) {
          const count = getCategoryProductCount(category?.slug);
          const label = count === 1 ? t("categoryCountOne", { count: count }) : t("categoryCountOther", { count: count });
          return (
            '<button class="categoria' +
            (state?.filters?.category === category?.slug ? " ativa" : "") +
            '" type="button" data-category-filter="' +
            escapeHtml(category?.slug) +
            '">' +
            '<span class="categoria-titulo">' +
            escapeHtml(categoryName(category)) +
            "</span>" +
            '<small class="categoria-contagem">' +
            escapeHtml(label) +
            "</small>" +
            "</button>"
          );
        })
        ?.join("");
  }

  function getFilteredProducts() {
    const categories = ensurePublicCategoryFilter(getPublicCategories());
    const categoryMap = new Map(
      categories?.map(function (category) {
        return [category?.slug, categoryName(category)];
      })
    );

    const filtered = (getMenuState()?.products || [])?.filter(function (product) {
      const query = String(state?.filters?.query || "")?.trim()?.toLowerCase();
      const price = Number(product?.price || 0);
      const isFavorite = state?.favorites?.includes(product?.id);
      const visible = isProductVisible(product);
      const available = visible && product?.available !== false;
      if (!visible) {
        return false;
      }
      const productStatus = available ? (product?.featured ? "featured" : "active") : "inactive";
      const searchable = [
        productName(product),
        textValue(product?.description, currentLocale()),
        textValue(product?.longDescription, currentLocale()),
        categoryMap?.get(product?.category) || "",
      ]
        ?.concat(Array.isArray(product?.tags) ? product?.tags : [])
        ?.join(" ")
        ?.toLowerCase();

      if (query && !searchable?.includes(query)) {
        return false;
      }

      if (state?.filters?.category !== "all" && product?.category !== state?.filters?.category) {
        return false;
      }

      if (state?.filters?.status === "active" && productStatus !== "active" && productStatus !== "featured") {
        return false;
      }

      if (state?.filters?.status === "featured" && !product?.featured) {
        return false;
      }

      if (state?.filters?.status === "inactive" && productStatus !== "inactive") {
        return false;
      }

      if (state?.filters?.price === "low" && price > 15) {
        return false;
      }

      if (state?.filters?.price === "mid" && (price < 15 || price > 30)) {
        return false;
      }

      if (state?.filters?.price === "high" && price < 30) {
        return false;
      }

      if (state?.filters?.onlyFavorites && !isFavorite) {
        return false;
      }

      return productStatus !== "";
    });

    const sorted = getSortedProducts(filtered);

    sorted?.sort(function (left, right) {
      if (state?.ui?.highlightMode && Boolean(left?.featured) !== Boolean(right?.featured)) {
        return right?.featured ? 1 : -1;
      }

      if (state?.filters?.sort === "name") {
        return productName(left)?.localeCompare(productName(right), currentLocale());
      }

      if (state?.filters?.sort === "priceAsc") {
        return Number(left?.price || 0) - Number(right?.price || 0);
      }

      if (state?.filters?.sort === "priceDesc") {
        return Number(right?.price || 0) - Number(left?.price || 0);
      }

      if (state?.filters?.sort === "recent") {
        return String(right?.updatedAt || right?.createdAt || "")?.localeCompare(String(left?.updatedAt || left?.createdAt || ""));
      }

      return compareMenuOrder(left?.sortOrder, right?.sortOrder, productName(left), productName(right));
    });

    return sorted;
  }

  function emptyProductsMessage() {
    const hasSearchQuery = Boolean(String(state?.filters?.query || "")?.trim());
    const hasSecondaryFilters = state?.filters?.status !== "all"
      || state?.filters?.price !== "all"
      || Boolean(state?.filters?.onlyFavorites);

    if (state?.filters?.category !== "all" && !hasSearchQuery && !hasSecondaryFilters) {
      return t("noItemsCategory");
    }

    return t("noResults");
  }

  function currentProductImage(product) {
    const images = Array.isArray(product?.images) && product?.images?.length
      ? product?.images
      : [product?.primaryImage || product?.imageUrl]?.filter(Boolean);
    if (!images?.length) {
      return "";
    }

    const selected = state?.gallerySelection[product?.id];
    return images?.includes(selected) ? selected : product?.primaryImage || images[0];
  }

  function renderProductMedia(product, productImage) {
    if (!productImage) {
      return "";
    }

    return (
      '<div class="produto-imagem-box">' +
      '<img class="produto-imagem" src="' +
      escapeHtml(productImage) +
      '" alt="' +
      escapeHtml(productName(product)) +
      '" loading="lazy" decoding="async">' +
      "</div>"
    );
  }

  function renderOfferMedia(combo) {
    const image = combo?.primaryImage || combo?.imageUrl || "";

    if (!image) {
      return "";
    }

    return (
      '<div class="oferta-imagem-box">' +
      '<img class="oferta-imagem" src="' +
      escapeHtml(image) +
      '" alt="' +
      escapeHtml(offerName(combo)) +
      '" loading="lazy" decoding="async">' +
      "</div>"
    );
  }

  function renderComboOffer(combo) {
    const available = isComboPurchasable(combo);
    const originalPrice = comboOriginalPrice(combo);
    const savings = Math.max(0, originalPrice - Number(combo?.price || 0));
    const includes = comboIncludesText(combo);
    const media = renderOfferMedia(combo);

    return (
      '<article class="oferta-card' +
      (!media ? " oferta-card--no-image" : "") +
      (!available ? " oferta-card--unavailable" : "") +
      '" data-offer-id="' +
      escapeHtml(combo?.id) +
      '">' +
      media +
      '<div class="oferta-card-body">' +
      '<div class="oferta-card-copy">' +
      '<span class="oferta-chip">' + escapeHtml(t("comboOfferChip")) + "</span>" +
      "<h3>" + escapeHtml(offerName(combo)) + "</h3>" +
      (offerDescription(combo)
        ? '<p class="oferta-descricao">' + escapeHtml(offerDescription(combo)) + "</p>"
        : "") +
      (includes
        ? '<p class="oferta-inclui">' + escapeHtml(t("comboIncludes", { value: includes })) + "</p>"
        : "") +
      (savings > 0
        ? '<span class="oferta-economia">' + escapeHtml(t("comboSavings", { value: formatCurrency(savings) })) + "</span>"
        : "") +
      "</div>" +
      '<div class="oferta-card-action">' +
      '<span class="oferta-preco">' + escapeHtml(formatCurrency(combo?.price)) + "</span>" +
      '<button class="botao botao-principal oferta-add-btn" type="button" data-add-offer="' +
      escapeHtml(combo?.id) +
      '"' +
      (!available ? ' disabled aria-disabled="true"' : "") +
      ">" +
      escapeHtml(available ? t("comboAdd") : t("comboUnavailable")) +
      "</button>" +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function renderOffers() {
    const section = $("secaoOfertas");
    if (!section) {
      return;
    }

    const combos = getOffersState()?.combos?.filter(isComboPurchasable);
    const offerCount = combos?.length;
    const visible = offerCount > 0;

    section.hidden = !visible;
    section?.classList?.toggle("oculto", !visible);
    section?.setAttribute("aria-label", t("offersAria"));

    if (!visible) {
      $("ofertasCombos").innerHTML = "";
      return;
    }

    $("ofertasKicker").textContent = t("offersKicker");
    $("ofertasTitulo").textContent = t("offersTitle");
    $("ofertasResumo").textContent = offerCount === 1
      ? t("offersSummaryOne")
      : t("offersSummary", { count: offerCount });
    $("ofertasCombos").innerHTML = combos?.map(renderComboOffer)?.join("");
  }

  function renderProducts() {
    const products = getFilteredProducts();
    const area = $("areaProdutos");
    const total = (getMenuState()?.products || [])?.filter(function (product) {
      return isProductVisible(product);
    })?.length;
    const summaryKey = state?.filters?.onlyFavorites ? "catalogSummaryFavorites" : "catalogSummary";

    $("catalogSummary").textContent = t(summaryKey, {
      count: products?.length,
      total: total,
    });

    $("statusCategoria").textContent = $("catalogSummary")?.textContent;
    area?.classList?.toggle("grade-produtos--compact", state?.ui?.visualMode === "compact");
    area?.classList?.toggle("grade-produtos--simple", state?.ui?.catalogMode === "simplified");

    if (!products?.length) {
      area.innerHTML =
        '<article class="produto-card produto-card--empty"><p>' +
        escapeHtml(emptyProductsMessage()) +
        "</p></article>";
      disconnectObserver();
      return;
    }

    area.innerHTML = products?.map(renderProductCard)?.join("");
    attachObserver();
  }

  function renderProductCard(product) {
    const images = Array.isArray(product?.images) && product?.images?.length
      ? product?.images
      : [product?.primaryImage || product?.imageUrl]?.filter(Boolean);
    const productImage = currentProductImage(product);
    const favorite = state?.favorites?.includes(product?.id);
    const category = getCategoryBySlug(product?.category);
    const addOns = (Array.isArray(product?.addOns) ? product?.addOns : [])
      ?.map(getAddOnById)
      ?.filter(Boolean);
    const tags = Array.isArray(product?.tags) ? product?.tags : [];
    const active = isProductVisible(product);
    const available = isProductPurchasable(product);
    const compact = state?.ui?.visualMode === "compact";
    const simplified = state?.ui?.catalogMode === "simplified";
    const description = formatProductCopy(textValue(product?.description, currentLocale()));
    const longDescription = formatProductCopy(textValue(product?.longDescription, currentLocale()));
    const showLongDescription = Boolean(longDescription && !isRepeatedText(description, longDescription));

    return (
      '<article class="produto-card' +
      (product?.featured ? " produto-card--featured" : "") +
      (!active ? " produto-card--inactive" : "") +
      (active && !available ? " produto-card--unavailable" : "") +
      '" data-product-id="' +
      escapeHtml(product?.id) +
      '">' +
      '<div class="produto-card-topline">' +
      '<span class="produto-chip produto-chip--category">' +
      escapeHtml(categoryName(category)) +
      "</span>" +
      '<button type="button" class="produto-favorito' +
      (favorite ? " produto-favorito--ativo" : "") +
      '" aria-label="' +
      escapeHtml(favorite ? t("favoriteRemove") : t("favoriteAdd")) +
      '" data-favorite-product="' +
      escapeHtml(product?.id) +
      '">' +
      (favorite ? "♥" : "♡") +
      "</button>" +
      "</div>" +
      renderProductMedia(product, productImage) +
      '<div class="produto-conteudo">' +
      '<div class="produto-topo">' +
      "<div>" +
      "<h3>" +
      escapeHtml(productName(product)) +
      "</h3>" +
      '<div class="produto-meta-row">' +
      (product?.featured
        ? '<span class="produto-chip produto-chip--featured">' + escapeHtml(t("featured")) + "</span>"
        : "") +
      (product?.prepTime
        ? '<span class="produto-chip produto-chip--time">' +
          escapeHtml(t("prepTime", { value: product?.prepTime })) +
          "</span>"
        : "") +
      (!active
        ? '<span class="produto-chip produto-chip--inactive">' + escapeHtml(t("soldOut")) + "</span>"
        : !available
          ? '<span class="produto-chip produto-chip--unavailable">' + escapeHtml(t("unavailable")) + "</span>"
        : "") +
      "</div>" +
      "</div>" +
      "</div>" +
      (description
        ? '<p class="produto-descricao">' + escapeHtml(description) + "</p>"
        : "") +
      (!compact && !simplified && showLongDescription
        ? '<p class="produto-descricao-longa">' +
          escapeHtml(longDescription) +
          "</p>"
        : "") +
      (tags?.length
        ? '<div class="produto-tags" aria-label="' +
          escapeHtml(t("tagLabel")) +
          '">' +
          tags
            ?.map(function (tag) {
              return '<span class="produto-tag">' + escapeHtml(displayProductTag(tag)) + "</span>";
            })
            ?.join("") +
          "</div>"
        : "") +
      (images?.length > 1 && !simplified
        ? '<div class="produto-galeria" aria-label="' +
          escapeHtml(t("galleryLabel")) +
          '">' +
          images
            ?.map(function (image) {
              return (
                '<button type="button" class="produto-thumb' +
                (productImage === image ? " produto-thumb--active" : "") +
                '" data-gallery-product="' +
                escapeHtml(product?.id) +
                '" data-gallery-image="' +
                escapeHtml(image) +
                '">' +
                '<img src="' +
                escapeHtml(image) +
                '" alt="">' +
                "</button>"
              );
            })
            ?.join("") +
          "</div>"
        : "") +
      '<details class="personalizacao">' +
      "<summary>" +
      escapeHtml(t("customizeItem")) +
      "</summary>" +
      '<div class="add-on-list" role="group" aria-label="' +
      escapeHtml(t("addOnsAria", { product: productName(product) })) +
      '">' +
      (addOns?.length
        ? addOns
            ?.map(function (addOn) {
              return (
                '<label class="checkbox-linha add-on-item">' +
                '<input type="checkbox" data-product-add-on="' +
                escapeHtml(product?.id) +
                '" value="' +
                escapeHtml(addOn?.id) +
                '"' +
                (available ? "" : ' disabled aria-disabled="true"') +
                '>' +
                "<span>" +
                escapeHtml(addOnName(addOn)) +
                " (" +
                escapeHtml(formatCurrency(addOn?.price)) +
                ")</span>" +
                "</label>"
              );
            })
            ?.join("")
        : '<p class="aviso">' + escapeHtml(t("noAddOns")) + "</p>") +
      "</div>" +
      '<label for="obs-' +
      escapeHtml(product?.id) +
      '">' +
      escapeHtml(t("itemNoteLabel")) +
      "</label>" +
      '<input id="obs-' +
      escapeHtml(product?.id) +
      '" class="obs-item" type="text" maxlength="70" placeholder="' +
      escapeHtml(t("optional")) +
      '"' +
      (available ? "" : ' disabled aria-disabled="true"') +
      '>' +
      "</details>" +
      "</div>" +
      '<div class="produto-rodape">' +
      '<span class="preco-produto">' +
      escapeHtml(formatCurrency(product?.price)) +
      "</span>" +
      '<button class="botao botao-principal botao-adicionar" type="button" data-add-product="' +
      escapeHtml(product?.id) +
      '"' +
      (!available ? ' disabled aria-disabled="true"' : "") +
      ">" +
      escapeHtml(available ? t("addToCart") : t("unavailable")) +
      "</button>" +
      "</div>" +
      "</article>"
    );
  }

  function attachObserver() {
    disconnectObserver();
    const cards = document?.querySelectorAll("[data-product-id]");
    if (!("IntersectionObserver" in window)) {
      cards?.forEach(function (card) {
        trackView(card?.dataset?.productId);
      });
      return;
    }

    state.observer = new IntersectionObserver(
      function (entries) {
        entries?.forEach(function (entry) {
          if (entry?.isIntersecting) {
            trackView(entry?.target?.dataset?.productId);
          }
        });
      },
      { threshold: 0.45 }
    );

    cards?.forEach(function (card) {
      state?.observer?.observe(card);
    });
  }

  function disconnectObserver() {
    if (state?.observer) {
      state?.observer?.disconnect();
      state.observer = null;
    }
  }

  function trackView(productId) {
    if (!productId || state?.viewTracker?.has(productId)) {
      return;
    }

    state?.viewTracker?.add(productId);
    system?.trackView(productId);
  }

  function readCardAddOns(card) {
    return Array?.from(card?.querySelectorAll("input[data-product-add-on]:checked"))?.map(function (input) {
      return String(input?.value || "");
    });
  }

  function readCardNote(card, productId) {
    const input = card?.querySelector("#obs-" + CSS?.escape(productId));
    return input ? String(input?.value || "")?.trim()?.slice(0, 70) : "";
  }

  function cartKey(productId, addOns, note) {
    return [productId, addOns?.slice()?.sort()?.join(","), note?.toLowerCase()]?.join("|");
  }

  function comboCartKey(comboId) {
    return "combo|" + String(comboId || "");
  }

  function sanitizeCart() {
    const validProducts = new Set(getMenuState()?.products
      ?.filter(function (product) {
        return product && isProductPurchasable(product);
      })
      ?.map(function (product) {
        return product?.id;
      }));
    const validAddOns = new Set(getMenuState()?.addOns?.map(function (addOn) {
      return addOn?.id;
    }));
    const validCombos = new Set(getOffersState()?.combos
      ?.filter(isComboPurchasable)
      ?.map(function (combo) {
        return combo?.id;
      }));

    state.cart = (Array.isArray(state?.cart) ? state?.cart : [])?.map(function (item) {
      const itemType = item?.type === "combo" || item?.offerId ? "combo" : "product";
      if (itemType === "combo") {
        const offerId = String(item?.offerId || item?.comboId || "");
        if (!validCombos?.has(offerId)) {
          return null;
        }
        return {
          key: comboCartKey(offerId),
          type: "combo",
          offerId,
          quantity: Math?.max(1, Number(item?.quantity || 1)),
        };
      }

      if (!item || !validProducts?.has(item?.productId)) {
        return null;
      }

      return {
        key: String(item?.key || cartKey(item?.productId, item?.addOns || [], item?.note || "")),
        type: "product",
        productId: String(item?.productId),
        addOns: Array.isArray(item?.addOns)
          ? item?.addOns?.filter(function (addOnId) {
              return validAddOns?.has(addOnId);
            })
          : [],
        note: String(item?.note || "")?.slice(0, 70),
        quantity: Math?.max(1, Number(item?.quantity || 1)),
      };
    })?.filter(Boolean);

    saveJson(STORAGE_KEYS?.cart, state?.cart);
  }

  function addProductToCart(productId, card) {
    const product = getProductById(productId);
    if (!product || !isProductPurchasable(product)) {
      return false;
    }

    const addOns = readCardAddOns(card)?.filter(function (addOnId) {
      return Array.isArray(product?.addOns) && product?.addOns?.includes(addOnId);
    });
    const note = readCardNote(card, productId);
    const key = cartKey(productId, addOns, note);
    const existing = state?.cart?.find(function (item) {
      return item?.key === key;
    });

    if (existing) {
      existing.quantity += 1;
    } else {
      state?.cart?.push({
        key: key,
        productId: productId,
        addOns: addOns,
        note: note,
        quantity: 1,
      });
    }

    saveJson(STORAGE_KEYS?.cart, state?.cart);
    system?.trackAdd(productId);
    state.pendingMessage = "";
    renderCart();
    showStatus(t("productAdded"), "ok", { timeout: 1800 });
    showMicroFeedback(t("productAdded"));
    pulseCartControls();

    card?.querySelectorAll("input[data-product-add-on]")?.forEach(function (input) {
      input.checked = false;
    });
    const noteInput = card?.querySelector("#obs-" + CSS?.escape(productId));
    if (noteInput) {
      noteInput.value = "";
    }

    return true;
  }

  function addComboToCart(comboId) {
    const combo = getComboById(comboId);
    if (!combo || !isComboPurchasable(combo)) {
      showStatus(t("comboUnavailable"), "error");
      return false;
    }

    const key = comboCartKey(comboId);
    const existing = state?.cart?.find(function (item) {
      return item?.key === key;
    });

    if (existing) {
      existing.quantity += 1;
    } else {
      state?.cart?.push({
        key,
        type: "combo",
        offerId: comboId,
        quantity: 1,
      });
    }

    saveJson(STORAGE_KEYS?.cart, state?.cart);
    state.pendingMessage = "";
    renderCart();
    showStatus(t("comboAdded"), "ok", { timeout: 1800 });
    showMicroFeedback(t("comboAdded"));
    pulseCartControls();
    return true;
  }

  function getResolvedCartItems() {
    return state?.cart
      ?.map(function (item) {
        if (item?.type === "combo" || item?.offerId) {
          const combo = getComboById(item?.offerId);
          if (!combo || !isComboPurchasable(combo)) {
            return null;
          }
          const quantity = Math?.max(1, Number(item?.quantity || 1));
          const unitPrice = Number(combo?.price || 0);
          return {
            key: item?.key,
            type: "combo",
            combo,
            includedItems: getComboItems(combo)?.filter(function (entry) {
              return entry?.product;
            }),
            quantity,
            unitPrice,
            totalPrice: unitPrice * quantity,
          };
        }

        const product = getProductById(item?.productId);
        if (!product || !isProductPurchasable(product)) {
          return null;
        }

        const addOns = (Array.isArray(item?.addOns) ? item?.addOns : [])
          ?.map(getAddOnById)
          ?.filter(Boolean);
        const unitPrice = Number(product?.price || 0) + addOns?.reduce(function (total, addOn) {
          return total + Number(addOn?.price || 0);
        }, 0);

        return {
          key: item?.key,
          product: product,
          addOns: addOns,
          note: String(item?.note || ""),
          quantity: Math?.max(1, Number(item?.quantity || 1)),
          unitPrice: unitPrice,
          totalPrice: unitPrice * Math?.max(1, Number(item?.quantity || 1)),
        };
      })
      ?.filter(Boolean);
  }

  function deliveryLocations() {
    const delivery = getBrandConfig()?.delivery || {};
    const source = Array.isArray(delivery?.locations)
      ? delivery.locations
      : Array.isArray(delivery?.neighborhoods)
        ? delivery.neighborhoods
        : [];

    return source.map(function (location, index) {
      const fixedFee = Number(location?.fee);
      const feeMode = location?.feeMode === "custom" || location?.fee == null ? "custom" : "fixed";
      return {
        id: String(location?.id || location?.slug || index),
        name: location?.name,
        fee: feeMode === "fixed" && Number.isFinite(fixedFee) && fixedFee >= 0 ? fixedFee : null,
        feeMode: feeMode,
        active: location?.active == null ? location?.available !== false : location?.active !== false,
        note: location?.note,
      };
    });
  }

  function activeDeliveryLocations() {
    return deliveryLocations().filter(function (location) {
      return location?.active !== false;
    });
  }

  function selectedNeighborhood(form) {
    const value = String(form?.neighborhood || "");
    if (!value) {
      return null;
    }

    const locations = activeDeliveryLocations();
    const byId = locations.find(function (location) {
      return String(location?.id || "") === value;
    });
    if (byId) {
      return byId;
    }

    const legacyIndex = Number?.parseInt(value, 10);
    return Number?.isNaN(legacyIndex) ? null : locations[legacyIndex] || null;
  }

  function hasCustomDeliveryFee(form) {
    const location = selectedNeighborhood(form);
    return Boolean(location && location?.feeMode === "custom");
  }

  function deliveryFee(form) {
    if (form?.serviceMode !== "delivery" || form?.deliveryType !== "entrega") {
      return 0;
    }

    const locations = activeDeliveryLocations();
    if (!locations?.length) {
      return Number(getBrandConfig()?.delivery?.baseFee || 0) || 0;
    }

    const neighborhood = selectedNeighborhood(form);
    if (!neighborhood || neighborhood?.active === false || neighborhood?.feeMode === "custom") {
      return 0;
    }

    return Number(neighborhood?.fee ?? getBrandConfig()?.delivery?.baseFee ?? 0) || 0;
  }

  function collectForm() {
    return {
      serviceMode: document.querySelector('input[name="tipoAtendimento"]:checked')?.value || "delivery",
      deliveryType: $("tipoEntrega")?.value,
      neighborhood: $("bairroEntrega")?.value,
      address: String($("enderecoEntrega")?.value || "")?.trim()?.slice(0, 140),
      reference: String($("referencia")?.value || "")?.trim()?.slice(0, 100),
      customerMapsUrl: safeExternalUrl($("clienteMapsUrl")?.value || ""),
      customerLatitude: coordinateValue($("clienteLatitude")?.value || "", -90, 90),
      customerLongitude: coordinateValue($("clienteLongitude")?.value || "", -180, 180),
      tableNumber: String($("numeroMesa")?.value || "")?.trim()?.slice(0, 10),
      name: String($("nome")?.value || "")?.trim()?.slice(0, 80),
      payment: $("pagamento")?.value,
      needsChange: $("precisaTroco")?.checked,
      changeFor: String($("trocoPara")?.value || "")?.trim()?.slice(0, 20),
      notes: String($("observacoes")?.value || "")?.trim()?.slice(0, 250),
      remember: $("lembrarDadosCliente")?.checked,
      consent: $("aceiteLgpd")?.checked,
    };
  }

  function rememberFormData() {
    const form = collectForm();
    if (!form?.remember) {
      saveJson(STORAGE_KEYS?.form, {});
      return;
    }

    delete form?.consent;
    saveJson(STORAGE_KEYS?.form, form);
  }

  function hydrateRememberedForm() {
    const form = state?.rememberedForm && typeof state?.rememberedForm === "object" ? state?.rememberedForm : {};
    if (!Object?.keys(form)?.length) {
      return;
    }

    const radio = document?.querySelector('input[name="tipoAtendimento"][value="' + CSS?.escape(form?.serviceMode || "delivery") + '"]');
    if (radio) {
      radio.checked = true;
    }

    $("tipoEntrega").value = form?.deliveryType || "";
    $("bairroEntrega").value = form?.neighborhood || "";
    $("enderecoEntrega").value = form?.address || "";
    $("referencia").value = form?.reference || "";
    $("clienteMapsUrl").value = form?.customerMapsUrl || "";
    $("clienteLatitude").value = form?.customerLatitude || "";
    $("clienteLongitude").value = form?.customerLongitude || "";
    $("numeroMesa").value = form?.tableNumber || "";
    $("nome").value = form?.name || "";
    $("pagamento").value = form?.payment || "";
    $("precisaTroco").checked = Boolean(form?.needsChange);
    $("trocoPara").value = form?.changeFor || "";
    $("observacoes").value = form?.notes || "";
    $("lembrarDadosCliente").checked = true;
  }

  function updateNeighborhoodOptions() {
    const neighborhoods = activeDeliveryLocations();
    const currentValue = $("bairroEntrega")?.value;
    $("bairroEntrega").innerHTML =
      '<option value="">' +
      escapeHtml(t("neighborhoodSelect")) +
      "</option>" +
      neighborhoods
        ?.map(function (neighborhood, index) {
          const suffix = neighborhood?.available === false ? t("neighborhoodUnavailableSuffix") : "";
          return (
            '<option value="' +
            escapeHtml(String(neighborhood?.id || index)) +
            '">' +
            escapeHtml(textValue(neighborhood?.name, currentLocale()) + suffix) +
            "</option>"
          );
        })
        ?.join("");
    $("bairroEntrega").value = neighborhoods?.some(function (neighborhood) {
      return String(neighborhood?.id || "") === currentValue;
    }) ? currentValue : "";

    const hasLocations = Boolean(neighborhoods?.length);
    $("labelBairroEntrega").hidden = !hasLocations;
    $("bairroEntrega").hidden = !hasLocations;
  }

  function updatePaymentPanels() {
    const payment = $("pagamento")?.value;
    const cash = payment === "cash";

    $("pixInfo")?.classList?.toggle("oculto", payment !== "pix");
    $("trocoInfo")?.classList?.toggle("oculto", !cash);
    $("trocoParaBox")?.classList?.toggle("oculto", !(cash && $("precisaTroco")?.checked));
    $("trocoPara").disabled = !(cash && $("precisaTroco")?.checked);
  }

  function updateCheckoutMode() {
    const form = collectForm();
    const deliveryMode = form?.serviceMode === "delivery";
    const deliveryAddressMode = deliveryMode && form?.deliveryType === "entrega";
    const pickupMode = deliveryMode && form?.deliveryType === "retirada";
    const deliveryLocationOptions = activeDeliveryLocations();
    const neighborhood = selectedNeighborhood(form);
    const requiresNeighborhood = deliveryAddressMode && deliveryLocationOptions?.length > 0;

    $("blocoDelivery")?.classList?.toggle("oculto", !deliveryMode);
    $("blocoNoLocal")?.classList?.toggle("oculto", deliveryMode);
    $("camposEntrega")?.classList?.toggle("oculto", !deliveryAddressMode);
    $("enderecoRetirada")?.classList?.toggle("oculto", !pickupMode);
    $("tipoEntrega").disabled = !deliveryMode;
    $("labelBairroEntrega").hidden = !requiresNeighborhood;
    $("bairroEntrega").hidden = !requiresNeighborhood;
    $("bairroEntrega").required = requiresNeighborhood;
    $("bairroEntrega").disabled = !requiresNeighborhood;
    $("enderecoEntrega").disabled = !deliveryAddressMode;
    $("referencia").disabled = !deliveryAddressMode;
    $("clienteMapsUrl").disabled = !deliveryAddressMode;
    $("clienteLatitude").disabled = !deliveryAddressMode;
    $("clienteLongitude").disabled = !deliveryAddressMode;
    $("numeroMesa").disabled = deliveryMode;

    if (!deliveryAddressMode) {
      $("taxaEntregaInfo").textContent = "";
      $("bloqueioEntregaInfo")?.classList?.add("oculto");
    } else if (!deliveryLocationOptions?.length) {
      const baseFee = Number(getBrandConfig()?.delivery?.baseFee || 0) || 0;
      $("taxaEntregaInfo").textContent = baseFee > 0
        ? t("deliveryBaseFeeInfo", { value: formatCurrency(baseFee) })
        : "";
      $("bloqueioEntregaInfo")?.classList?.add("oculto");
    } else if (!neighborhood) {
      $("taxaEntregaInfo").textContent = t("calculateFeePrompt");
      $("bloqueioEntregaInfo")?.classList?.add("oculto");
    } else if (neighborhood?.active === false) {
      $("taxaEntregaInfo").textContent = "";
      $("bloqueioEntregaInfo").textContent = t("deliveryUnavailable", {
        name: textValue(neighborhood?.name, currentLocale()),
      });
      $("bloqueioEntregaInfo")?.classList?.remove("oculto");
    } else if (neighborhood?.feeMode === "custom") {
      const note = textValue(neighborhood?.note, currentLocale());
      $("taxaEntregaInfo").textContent = t("deliveryFeeCustomInfo", {
        name: textValue(neighborhood?.name, currentLocale()),
      }) + (note ? " " + note : "");
      $("bloqueioEntregaInfo")?.classList?.add("oculto");
    } else {
      $("taxaEntregaInfo").textContent = t("deliveryFeeInfo", {
        name: textValue(neighborhood?.name, currentLocale()),
        value: formatCurrency(deliveryFee(form)),
      });
      $("bloqueioEntregaInfo")?.classList?.add("oculto");
    }

    renderCart();
  }

  function computeTotals() {
    const items = getResolvedCartItems();
    const form = collectForm();
    const subtotal = items?.reduce(function (total, item) {
      return total + item?.totalPrice;
    }, 0);
    const usesDeliveryFee = form?.serviceMode === "delivery" && form?.deliveryType === "entrega";
    const fee = deliveryFee(form);
    const customFee = usesDeliveryFee && hasCustomDeliveryFee(form);

    return {
      items: items,
      subtotal: subtotal,
      deliveryFee: fee,
      deliveryFeeMode: customFee ? "custom" : "fixed",
      showDeliveryFee: usesDeliveryFee,
      total: subtotal + fee,
    };
  }

  function updateMobileCartVisibility(itemCount) {
    const hasItems = Number(itemCount || 0) > 0;
    const bar = $("barraMobile");
    document?.body?.classList?.toggle("cart-has-items", hasItems);

    if (!bar) {
      return;
    }

    bar.hidden = !hasItems;
    bar?.setAttribute("aria-hidden", String(!hasItems));
  }

  function renderMobileCartLabel(itemCount) {
    const label = $("barraMobileLabel");
    updateMobileCartVisibility(itemCount);

    if (!label) {
      return;
    }
    label.innerHTML =
      '<span class="barra-mobile-label-count">' +
      escapeHtml(t(itemCount === 1 ? "mobileItemsOne" : "mobileItemsOther", { count: itemCount })) +
      "</span>";
  }

  function isCartOverlayOpen() {
    const cart = $("caixaCarrinho");
    return Boolean(cart && !cart?.hidden && cart?.classList?.contains("show"));
  }

  function renderCart() {
    sanitizeCart();
    const list = $("listaCarrinho");
    const totals = computeTotals();
    const itemCount = totals?.items?.reduce(function (count, item) {
      return count + item?.quantity;
    }, 0);

    if (!totals?.items?.length) {
      list.innerHTML =
        '<li class="item-vazio">' +
        '<span class="item-vazio__title">' +
        escapeHtml(t("emptyCart")) +
        "</span>" +
        '<span class="item-vazio__hint">' +
        escapeHtml(t("emptyCartHint")) +
        "</span>" +
        "</li>";
    } else {
      list.innerHTML = totals?.items
        ?.map(function (item) {
          const details = [];
          if (item?.type === "combo" && item?.includedItems?.length) {
            details?.push(t("offerIncludesField", {
              value: item?.includedItems?.map(function (entry) {
                return entry?.quantity + "x " + productName(entry?.product);
              })?.join(", "),
            }));
          }
          if (item?.addOns?.length) {
            details?.push(t("itemAddOnsField", {
              value: item?.addOns?.map(addOnName)?.join(", "),
            }));
          }
          if (item?.note) {
            details?.push(t("itemNoteField", { value: item?.note }));
          }

          return (
            '<li class="item-carrinho">' +
            '<div class="item-linha">' +
            '<div class="item-descricao">' +
            '<strong class="item-nome">' +
            escapeHtml(item?.type === "combo" ? offerName(item?.combo) : productName(item?.product)) +
            "</strong>" +
            (details?.length
              ? '<p class="item-detalhes">' + escapeHtml(details?.join(" | ")) + "</p>"
              : "") +
            "</div>" +
            '<span class="item-valor">' +
            escapeHtml(formatCurrency(item?.totalPrice)) +
            "</span>" +
            "</div>" +
            '<div class="controles-item cart-controls">' +
            '<div class="cart-qty" role="group" aria-label="' +
            escapeHtml(t("cartItemsAria")) +
            '">' +
            '<button type="button" class="cart-btn cart-btn--icon" data-cart-action="minus" data-cart-key="' +
            escapeHtml(item?.key) +
            '">-</button>' +
            '<span class="quantidade-item cart-qty-pill">' +
            escapeHtml(String(item?.quantity)) +
            "</span>" +
            '<button type="button" class="cart-btn cart-btn--icon" data-cart-action="plus" data-cart-key="' +
            escapeHtml(item?.key) +
            '">+</button>' +
            "</div>" +
            '<button type="button" class="cart-btn cart-btn--danger" data-cart-action="remove" data-cart-key="' +
            escapeHtml(item?.key) +
            '">' +
            escapeHtml(t("removeItem")) +
            "</button>" +
            "</div>" +
            "</li>"
          );
        })
        ?.join("");
    }

    const deliveryFeeText = totals?.deliveryFeeMode === "custom"
      ? t("deliveryFeeCustom")
      : formatCurrency(totals?.deliveryFee);
    const totalLabel = totals?.deliveryFeeMode === "custom"
      ? t("orderPartialTotal")
      : t("orderTotal");

    const deliveryFeeLine = totals?.showDeliveryFee
      ? '<span class="resumo-linha resumo-linha--taxa"><span>' +
        escapeHtml(t("orderDeliveryFee")) +
        "</span><strong>" +
        escapeHtml(deliveryFeeText) +
        "</strong></span>"
      : "";
    $("resumoPedido").innerHTML =
      '<span class="resumo-linha resumo-linha--subtotal"><span>' +
      escapeHtml(t("orderSubtotal")) +
      "</span><strong>" +
      escapeHtml(formatCurrency(totals?.subtotal)) +
      "</strong></span>" +
      deliveryFeeLine;

    $("valorTotal").innerHTML =
      "<span>" +
      escapeHtml(totalLabel) +
      "</span><strong>" +
      escapeHtml(formatCurrency(totals?.total)) +
      "</strong>";
    $("quantidadeCarrinho").textContent = String(itemCount);
    const topItems = $("resumoTopoItens");
    const topSubtotal = $("resumoTopoSubtotal");
    if (topItems) topItems.textContent = t(itemCount === 1 ? "topItemsOne" : "topItemsOther", { count: itemCount });
    if (topSubtotal) topSubtotal.textContent = t("topSubtotal", { value: formatCurrency(totals?.subtotal) });
    $("carrinhoSubtitulo").textContent = itemCount === 1 ? t("cartItemsOne", { count: itemCount }) : t("cartItemsOther", { count: itemCount });
    renderMobileCartLabel(itemCount);
    $("totalBarraMobile").textContent = formatCurrency(totals?.subtotal);
  }

  function prefersFloatingPublicFeedback() {
    return isMobileViewport() || isCartOverlayOpen();
  }

  function publicFeedbackHost() {
    if (isCartOverlayOpen()) {
      return $("caixaCarrinho")?.querySelector?.(".caixa-carrinho") || document?.body;
    }
    return document?.body;
  }

  function syncPublicFeedbackPlacement(feedback) {
    if (!feedback) {
      return;
    }

    const host = publicFeedbackHost();
    if (host && feedback?.parentElement !== host) {
      host?.appendChild?.(feedback);
    }

    const inCart = isCartOverlayOpen();
    const compactCart = inCart && isMobileViewport();
    feedback?.classList?.toggle("public-action-feedback--cart", inCart);
    feedback?.classList?.toggle("public-action-feedback--cart-mobile", compactCart);
    feedback?.classList?.toggle("public-action-feedback--cart-desktop", inCart && !compactCart);
  }

  function setPublicActionFeedbackTone(feedback, type) {
    if (!feedback?.classList) {
      return;
    }

    const tone = type === "error" ? "error" : type === "warn" ? "warn" : "ok";
    feedback.classList.remove(
      "public-action-feedback--ok",
      "public-action-feedback--warn",
      "public-action-feedback--error"
    );
    feedback.classList.add("public-action-feedback--" + tone);
  }

  function showStatus(message, type, options) {
    const text = String(message || "").trim();
    const success = $("mensagemStatus");
    const error = $("mensagemErro");

    if (state?.statusTimer) {
      window?.clearTimeout(state?.statusTimer);
      state.statusTimer = null;
    }

    if (success && error) {
      success?.classList?.add("oculto");
      error?.classList?.add("oculto");
      success.textContent = "";
      error.textContent = "";
    }

    if (!text) {
      return;
    }

    if (prefersFloatingPublicFeedback()) {
      showMicroFeedback(text, type, options);
      return;
    }

    if (!success || !error) {
      return;
    }

    if (type === "error") {
      error.textContent = text;
      error?.classList?.remove("oculto");
      return;
    }

    success.textContent = text;
    success?.classList?.remove("oculto");

    const timeout = options?.persist ? 0 : Number(options?.timeout ?? 2600);
    if (timeout > 0) {
      state.statusTimer = window?.setTimeout(function () {
        clearStatus();
      }, timeout);
    }
  }

  function clearStatus() {
    if (state?.statusTimer) {
      window?.clearTimeout(state?.statusTimer);
      state.statusTimer = null;
    }

    if (state?.feedbackTimer) {
      window?.clearTimeout(state?.feedbackTimer);
      state.feedbackTimer = null;
    }

    const success = $("mensagemStatus");
    const error = $("mensagemErro");
    const feedback = $("publicActionFeedback");

    success?.classList?.add("oculto");
    error?.classList?.add("oculto");
    if (success) success.textContent = "";
    if (error) error.textContent = "";
    feedback?.classList?.remove("public-action-feedback--visible");
    feedback?.classList?.remove(
      "public-action-feedback--ok",
      "public-action-feedback--warn",
      "public-action-feedback--error"
    );
    feedback?.classList?.remove(
      "public-action-feedback--cart",
      "public-action-feedback--cart-mobile",
      "public-action-feedback--cart-desktop"
    );
    if (feedback) feedback.textContent = "";
  }

  function pulseCartControls() {
    ["botaoCarrinho", "botaoAbrirCarrinhoMobile"]?.forEach(function (id) {
      const button = $(id);
      if (!button) {
        return;
      }

      button?.classList?.remove("pulse");
      window?.requestAnimationFrame(function () {
        button?.classList?.add("pulse");
        window?.setTimeout(function () {
          button?.classList?.remove("pulse");
        }, 260);
      });
    });
  }

  function showMicroFeedback(message, type, options) {
    const text = String(message || "").trim();
    if (!text) {
      return;
    }

    let feedback = $("publicActionFeedback");
    if (!feedback) {
      feedback = document?.createElement("div");
      feedback.id = "publicActionFeedback";
      feedback.className = "public-action-feedback";
      feedback.setAttribute("role", "status");
      feedback.setAttribute("aria-live", "polite");
      document?.body?.appendChild(feedback);
    }

    syncPublicFeedbackPlacement(feedback);

    if (state?.feedbackTimer) {
      window?.clearTimeout(state?.feedbackTimer);
      state.feedbackTimer = null;
    }

    const signature = normalizeComparableText((type || "ok") + " " + text);
    const now = Date.now();
    if (
      showMicroFeedback.lastSignature === signature
      && now - Number(showMicroFeedback.lastAt || 0) < 900
    ) {
      return;
    }
    showMicroFeedback.lastSignature = signature;
    showMicroFeedback.lastAt = now;

    feedback.textContent = text;
    setPublicActionFeedbackTone(feedback, type);
    feedback?.classList?.add("public-action-feedback--visible");

    const timeout = options?.persist ? 0 : Number(options?.timeout ?? 1800);
    if (timeout > 0) {
      state.feedbackTimer = window?.setTimeout(function () {
        feedback?.classList?.remove("public-action-feedback--visible");
        state.feedbackTimer = null;
      }, timeout);
    }
  }

  function markActionButtonFeedback(button) {
    if (!button) {
      return;
    }

    button?.classList?.remove("botao-add-feedback");
    void button?.offsetWidth;
    button?.classList?.add("botao-add-feedback");
    button?.setAttribute("aria-live", "polite");
    window?.setTimeout(function () {
      button?.classList?.remove("botao-add-feedback");
    }, 850);
  }

  function hasOpenOverlay() {
    return Boolean(document?.querySelector?.(".fundo-escuro.show"));
  }

  function updateOverlayScrollLock() {
    document.body?.classList?.toggle("overlay-scroll-lock", hasOpenOverlay());
  }

  function openOverlay(element) {
    if (!element) {
      return;
    }
    element.hidden = false;
    element.inert = false;
    element?.setAttribute("aria-hidden", "false");
    element?.classList?.remove("oculto");
    element?.classList?.add("show");
    updateOverlayScrollLock();
  }

  function closeOverlay(element) {
    if (!element) {
      return;
    }
    element?.classList?.remove("show");
    element?.classList?.add("oculto");
    element.inert = true;
    element.hidden = true;
    element?.setAttribute("aria-hidden", "true");
    updateOverlayScrollLock();
  }

  function openCart() {
    openOverlay($("caixaCarrinho"));
    syncPublicFeedbackPlacement($("publicActionFeedback"));
    $("botaoCarrinho")?.setAttribute("aria-expanded", "true");
    $("botaoAbrirCarrinhoMobile")?.setAttribute("aria-expanded", "true");
  }

  function closeCart() {
    clearStatus();
    clearPixCopyFeedback();
    closeOverlay($("caixaCarrinho"));
    $("botaoCarrinho")?.setAttribute("aria-expanded", "false");
    $("botaoAbrirCarrinhoMobile")?.setAttribute("aria-expanded", "false");
  }

  function openConfirmation(message) {
    $("resumoConfirmacao").innerHTML = message
      ?.split("\n")
      ?.map(function (line) {
        return "<p>" + escapeHtml(line || " ") + "</p>";
      })
      ?.join("");
    openOverlay($("modalConfirmacao"));
  }

  function closeConfirmation() {
    closeOverlay($("modalConfirmacao"));
  }

  function checkoutValidation(message, targetId) {
    return {
      message,
      targetId: targetId || "",
    };
  }

  function validateCheckout(form) {
    if (!getResolvedCartItems()?.length) {
      return checkoutValidation(t("cartRequired"), "listaCarrinho");
    }

    if (!getScheduleStatus()?.open) {
      return checkoutValidation(t("outsideHours"), "statusQuiosque");
    }

    if (!form?.name) {
      return checkoutValidation(t("nameRequired"), "nome");
    }

    if (form?.serviceMode === "delivery") {
      if (!form?.deliveryType) {
        return checkoutValidation(t("deliveryTypeRequired"), "tipoEntrega");
      }

      if (form?.deliveryType === "entrega") {
        const deliveryLocationOptions = activeDeliveryLocations();
        const neighborhood = selectedNeighborhood(form);
        if (deliveryLocationOptions?.length && !form?.neighborhood) {
          return checkoutValidation(t("neighborhoodRequired"), "bairroEntrega");
        }
        if (deliveryLocationOptions?.length && (!neighborhood || neighborhood?.active === false)) {
          return checkoutValidation(t("neighborhoodBlocked"), "bairroEntrega");
        }
        if (!form?.address) {
          return checkoutValidation(t("addressRequired"), "enderecoEntrega");
        }
      }
    } else if (!form?.tableNumber) {
      return checkoutValidation(t("tableRequired"), "numeroMesa");
    }

    if (!form?.payment) {
      return checkoutValidation(t("paymentRequired"), "pagamento");
    }

    if (form?.payment === "cash" && form?.needsChange && !form?.changeFor) {
      return checkoutValidation(t("changeRequired"), "trocoPara");
    }

    if (!form?.consent) {
      return checkoutValidation(t("consentRequired"), "aceiteLgpd");
    }

    return checkoutValidation("", "");
  }

  function validateForm(form) {
    return validateCheckout(form)?.message || "";
  }

  function clearCheckoutFieldErrors() {
    document?.querySelectorAll?.(".checkout-field-error")?.forEach(function (item) {
      item?.remove();
    });

    document?.querySelectorAll?.('[aria-invalid="true"]')?.forEach(function (field) {
      const describedBy = String(field?.getAttribute("aria-describedby") || "")
        ?.split(/\s+/)
        ?.filter(function (id) {
          return id && !/^checkout-field-error-/.test(id);
        })
        ?.join(" ");

      field?.removeAttribute("aria-invalid");
      if (describedBy) {
        field?.setAttribute("aria-describedby", describedBy);
      } else {
        field?.removeAttribute("aria-describedby");
      }
    });
  }

  function showCheckoutValidationError(validation) {
    if (!validation?.message) {
      return;
    }

    clearCheckoutFieldErrors();
    const field = validation?.targetId ? $(validation?.targetId) : null;
    if (prefersFloatingPublicFeedback()) {
      showMicroFeedback(validation?.message, "error", { timeout: field ? 2400 : 3000 });
    } else {
      showStatus(validation?.message, "error", { persist: true });
    }

    if (!field) {
      if (!prefersFloatingPublicFeedback()) {
        $("mensagemErro")?.focus?.({ preventScroll: false });
      }
      return;
    }

    const errorId = "checkout-field-error-" + validation?.targetId;
    const error = document?.createElement("p");
    error.id = errorId;
    error.className = "checkout-field-error";
    error.setAttribute("role", "alert");
    error.textContent = validation?.message;

    const reference = field?.type === "checkbox" || field?.type === "radio"
      ? field?.closest?.(".checkbox-linha") || field?.closest?.(".segmented") || field
      : field;
    reference?.insertAdjacentElement?.("afterend", error);

    const ids = String(field?.getAttribute("aria-describedby") || "")
      ?.split(/\s+/)
      ?.filter(Boolean);
    if (!ids?.includes(errorId)) {
      ids?.push(errorId);
    }
    field?.setAttribute("aria-invalid", "true");
    field?.setAttribute("aria-describedby", ids?.join(" "));

    const scrollTarget = field?.closest?.(".bloco-form") || field;
    scrollTarget?.scrollIntoView?.({
      behavior: "smooth",
      block: "center",
    });
    window?.setTimeout(function () {
      field?.focus?.({ preventScroll: true });
    }, 180);
  }

  function paymentLabel(value) {
    if (value === "pix") {
      return t("paymentPixLabel");
    }
    if (value === "cash") {
      return t("paymentCashLabel");
    }
    if (value === "card") {
      return t("paymentCardLabel");
    }
    return value || "-";
  }

  function serviceLabel(serviceMode) {
    return serviceMode === "no_local" ? t("serviceLocalLabel") : t("serviceDeliveryLabel");
  }

  function orderServiceLabel(form) {
    if (form?.serviceMode === "no_local") {
      return t("serviceLocalLabel");
    }
    if (form?.deliveryType === "retirada") {
      return t("typePickupLabel");
    }
    if (form?.deliveryType === "entrega") {
      return t("typeDeliveryLabel");
    }
    return serviceLabel(form?.serviceMode);
  }

  function buildOrderMessage() {
    const form = collectForm();
    const totals = computeTotals();
    const lines = [];
    const brandName = textValue(getBrandConfig()?.brand?.name, currentLocale()) || t("businessNameFallback");

    lines?.push(t("orderHeader", { brand: brandName }));
    lines?.push(t("customerField", { value: form?.name }));
    lines?.push(t("serviceField", { value: orderServiceLabel(form) }));
    lines?.push("");
    lines?.push(t("itemsField"));

    totals?.items?.forEach(function (item) {
      const itemName = item?.type === "combo" ? offerName(item?.combo) : productName(item?.product);
      lines?.push("- " + item?.quantity + "x " + itemName + " - " + formatCurrency(item?.totalPrice));
      if (item?.type === "combo" && item?.includedItems?.length) {
        lines?.push("  " + t("offerIncludesField", {
          value: item?.includedItems?.map(function (entry) {
            return entry?.quantity + "x " + productName(entry?.product);
          })?.join(", "),
        }));
      }
      if (item?.addOns?.length) {
        lines?.push("  " + t("itemAddOnsField", { value: item?.addOns?.map(addOnName)?.join(", ") }));
      }
      if (item?.note) {
        lines?.push("  " + t("itemNoteField", { value: item?.note }));
      }
    });

    lines?.push("");
    lines?.push(t("subtotalField", { value: formatCurrency(totals?.subtotal) }));
    if (form?.serviceMode === "delivery" && form?.deliveryType === "entrega") {
      lines?.push(t("deliveryFeeField", {
        value: totals?.deliveryFeeMode === "custom" ? t("deliveryFeeCustom") : formatCurrency(totals?.deliveryFee),
      }));
    }
    lines?.push(t(totals?.deliveryFeeMode === "custom" ? "partialTotalField" : "totalField", {
      value: formatCurrency(totals?.total),
    }));
    lines?.push(t("paymentField", { value: paymentLabel(form?.payment) }));

    if (form?.notes) {
      lines?.push(t("orderNotesField", { value: form?.notes }));
    }

    if (form?.serviceMode === "delivery") {
      if (form?.deliveryType === "entrega") {
        const neighborhood = selectedNeighborhood(form);
        lines?.push(t("deliveryAddressBlockLabel"));
        lines?.push(form?.address);
        if (neighborhood) {
          lines?.push(t("deliveryNeighborhoodField", { value: textValue(neighborhood?.name, currentLocale()) }));
          if (textValue(neighborhood?.note, currentLocale())) {
            lines?.push(t("deliveryLocationNoteField", { value: textValue(neighborhood?.note, currentLocale()) }));
          }
        }
        if (form?.reference) {
          lines?.push(t("deliveryReferenceField", { value: form?.reference }));
        }
        const customerRoute = customerLocationUrl(form);
        if (customerRoute) {
          lines?.push(t("customerLocationField"));
          lines?.push(customerRoute);
        }
      } else {
        const location = businessLocation();
        const locationLines = businessLocationLines(location);
        const routeUrl = locationRouteUrl(location);
        lines?.push(t("pickupLocationField"));
        if (locationLines?.length) {
          locationLines?.forEach(function (line) {
            lines?.push(line);
          });
        } else {
          lines?.push(textValue(getBrandConfig()?.delivery?.cityLabel, currentLocale()) || t("addressServiceAreaFallback"));
        }
        if (routeUrl) {
          lines?.push(t("pickupRouteField"));
          lines?.push(routeUrl);
        }
      }
    } else {
      lines?.push(t("tableField", { value: form?.tableNumber }));
    }

    if (form?.payment === "cash" && form?.needsChange && form?.changeFor) {
      lines?.push(t("changeField", { value: form?.changeFor }));
    }

    return lines?.join("\n");
  }

  function openWhatsApp(message) {
    const whatsappNumber = normalizePhone(getBrandConfig()?.business?.whatsappNumber || "");
    if (!/^\d{10,15}$/?.test(whatsappNumber)) {
      return { ok: false, message: t("whatsappMissing") };
    }

    const opened = window?.open(
      "https://wa.me/" + encodeURIComponent(whatsappNumber) + "?text=" + encodeURIComponent(message),
      "_blank"
    );

    return opened ? { ok: true } : { ok: false, message: t("popupBlocked") };
  }

  function toggleFavorite(productId) {
    state.favorites = system?.toggleFavorite(productId);
    renderToolbar();
    renderProducts();
  }

  function toggleAccessibilityMode() {
    saveAccessibilityMode(isAccessibilityEnhanced() ? "disabled" : "enabled");
    applyTheme();
    renderStaticTexts();
    renderSchedule();
    renderToolbar();
    renderCategoryMenu();
    renderOffers();
    renderProducts();
    renderCart();
    showStatus(t(isAccessibilityEnhanced() ? "accessibilityEnabled" : "accessibilityDisabled"), "ok", { timeout: 2200 });
    showMicroFeedback(t(isAccessibilityEnhanced() ? "accessibilityEnabled" : "accessibilityDisabled"));
  }

  function applyUiChange(group, value) {
    if (group === "visualMode") {
      system?.saveClientUiState({
        visualMode: value === "compact" ? "compact" : "expanded",
      });
      return;
    }
  }

  function toggleUiFlag(key, value) {
    if (key === "highlightMode") {
      system?.saveClientUiState({
        highlightMode: !state?.ui?.highlightMode,
      });
      return;
    }

    if (key === "catalogMode") {
      system?.saveClientUiState({
        catalogMode: state?.ui?.catalogMode === "simplified" ? "default" : value || "simplified",
      });
      return;
    }

    if (key === "favoritesOnly") {
      state.filters.onlyFavorites = !state?.filters?.onlyFavorites;
      renderToolbar();
      renderProducts();
    }
  }

  function resetFilters() {
    state.filters = {
      query: "",
      category: "all",
      status: "all",
      price: "all",
      sort: "menu",
      onlyFavorites: false,
    };
    renderToolbar();
    renderCategoryMenu();
    renderProducts();
  }

  function syncFromSystem() {
    state.states = system?.getStates();
    state.ui = system?.getClientUiState();
    state.favorites = system?.getFavorites();
    state.locale = resolveLocale(state?.locale || getDefaultLocale());
    sanitizeCart();
    applyTheme();
    renderLanguageSelector();
    renderStaticTexts();
    renderBranding();
    renderSchedule();
    updateNeighborhoodOptions();
    renderToolbar();
    renderCategoryMenu();
    renderOffers();
    renderProducts();
    hydrateRememberedForm();
    updatePaymentPanels();
    updateCheckoutMode();
    renderCart();
  }

  function isMetricStateChange(detail) {
    const type = String(detail?.type || "");
    return type === "track-view" || type === "track-add" || type === "metrics" || type === "clear-metrics";
  }

  function clearPixCopyFeedback() {
    $("mensagemCopiaPix")?.classList?.add("oculto");
    $("mensagemErroCopiaPix")?.classList?.add("oculto");
  }

  function copyPixKey() {
    const key = String(getBrandConfig()?.pix?.key || "")?.trim();
    clearPixCopyFeedback();

    if (!key) {
      showStatus(t("pixMissing"), "error", { timeout: 2600 });
      return;
    }

    if (!navigator?.clipboard || typeof navigator?.clipboard?.writeText !== "function") {
      showStatus(t("clipboardUnavailable"), "error", { timeout: 2600 });
      return;
    }

    navigator?.clipboard?.writeText(key)?.then(function () {
      showStatus(t("pixCopied"), "ok", { timeout: 1600 });
    })?.catch(function () {
      showStatus(t("pixCopyFailed"), "error", { timeout: 2600 });
    });
  }

  function handleMenuImageError(event) {
    const image = event?.target;
    if (!(image instanceof HTMLImageElement)) {
      return;
    }

    if (image?.classList?.contains("produto-imagem")) {
      image?.closest?.(".produto-imagem-box")?.remove();
      return;
    }

    if (image?.classList?.contains("oferta-imagem")) {
      image?.closest?.(".oferta-imagem-box")?.classList?.add("oferta-imagem-box--fallback");
      image?.remove();
    }
  }

  function bindEvents() {
    document?.addEventListener("error", handleMenuImageError, true);

    $("seletorIdioma")?.addEventListener("change", function (event) {
      state.locale = resolveLocale(event?.target?.value);
      window?.localStorage?.setItem(STORAGE_KEYS?.locale, JSON?.stringify(state?.locale));
      clearStatus();
      syncFromSystem();
    });

    document?.addEventListener("input", function (event) {
      if (event?.target?.id === "catalogSearch") {
        state.filters.query = String(event?.target?.value || "");
        renderProducts();
        return;
      }

      if (
        [
          "tipoEntrega",
          "bairroEntrega",
          "enderecoEntrega",
          "referencia",
          "clienteMapsUrl",
          "clienteLatitude",
          "clienteLongitude",
          "numeroMesa",
          "nome",
          "pagamento",
          "trocoPara",
          "observacoes",
          "lembrarDadosCliente",
          "aceiteLgpd",
        ]?.includes(event?.target?.id)
      ) {
        clearCheckoutFieldErrors();
        clearStatus();
        rememberFormData();
        updatePaymentPanels();
        updateCheckoutMode();
      }
    });

    document?.addEventListener("change", function (event) {
      if (event?.target?.id === "catalogCategory") {
        state.filters.category = event?.target?.value || "all";
        renderCategoryMenu();
        renderProducts();
        return;
      }

      if (event?.target?.id === "catalogStatus") {
        state.filters.status = event?.target?.value || "all";
        renderProducts();
        return;
      }

      if (event?.target?.id === "catalogPrice") {
        state.filters.price = event?.target?.value || "all";
        renderProducts();
        return;
      }

      if (event?.target?.id === "catalogSort") {
        state.filters.sort = event?.target?.value || "recent";
        renderProducts();
        return;
      }

      if (event?.target?.name === "tipoAtendimento") {
        clearCheckoutFieldErrors();
        updateCheckoutMode();
        rememberFormData();
        return;
      }

      if (["tipoEntrega", "bairroEntrega", "pagamento"].includes(event?.target?.id)) {
        clearCheckoutFieldErrors();
        clearStatus();
        updatePaymentPanels();
        updateCheckoutMode();
        rememberFormData();
        return;
      }

      if (event?.target?.id === "precisaTroco") {
        clearCheckoutFieldErrors();
        updatePaymentPanels();
        rememberFormData();
      }
    });

    document?.addEventListener("click", function (event) {
      const button = event?.target?.closest("button");
      if (!button) {
        return;
      }

      if (button?.dataset?.categoryFilter) {
        state.filters.category = button?.dataset?.categoryFilter;
        renderToolbar();
        renderCategoryMenu();
        renderProducts();
        return;
      }

      if (button?.dataset?.favoriteProduct) {
        toggleFavorite(button?.dataset?.favoriteProduct);
        return;
      }

      if (button?.dataset?.galleryProduct && button?.dataset?.galleryImage) {
        state.gallerySelection[button.dataset.galleryProduct] = button?.dataset?.galleryImage;
        renderProducts();
        return;
      }

      if (button?.dataset?.addProduct) {
        const card = button?.closest("[data-product-id]");
        if (card) {
          if (addProductToCart(button?.dataset?.addProduct, card)) {
            markActionButtonFeedback(button);
          }
        }
        return;
      }

      if (button?.dataset?.addOffer) {
        if (addComboToCart(button?.dataset?.addOffer)) {
          markActionButtonFeedback(button);
        }
        return;
      }

      if (button?.dataset?.cartAction && button?.dataset?.cartKey) {
        const item = state?.cart?.find(function (cartItem) {
          return cartItem?.key === button?.dataset?.cartKey;
        });
        if (!item) {
          return;
        }

        if (button?.dataset?.cartAction !== "remove") {
          const validItem = item?.type === "combo" || item?.offerId
            ? isComboPurchasable(getComboById(item?.offerId))
            : isProductPurchasable(getProductById(item?.productId));
          if (!validItem) {
            sanitizeCart();
            renderCart();
            showStatus(item?.type === "combo" || item?.offerId ? t("comboUnavailable") : t("productUnavailable"), "error");
            return;
          }
        }

        const action = button?.dataset?.cartAction;

        if (action === "plus") {
          item.quantity += 1;
        } else if (action === "minus") {
          item.quantity -= 1;
        } else if (action === "remove") {
          item.quantity = 0;
        }

        const removed = item?.quantity <= 0 || action === "remove";
        state.cart = state?.cart?.filter(function (cartItem) {
          return cartItem?.quantity > 0;
        });
        saveJson(STORAGE_KEYS?.cart, state?.cart);
        renderCart();
        showStatus(t(removed ? "itemRemoved" : "quantityUpdated"), "ok", { timeout: removed ? 1800 : 1200 });
        showMicroFeedback(t(removed ? "itemRemoved" : "quantityUpdated"));
        pulseCartControls();
        return;
      }

      if (button?.dataset?.uiGroup && button?.dataset?.uiValue) {
        applyUiChange(button?.dataset?.uiGroup, button?.dataset?.uiValue);
        return;
      }

      if (button?.dataset?.flagKey) {
        toggleUiFlag(button?.dataset?.flagKey, button?.dataset?.flagValue);
        return;
      }

      if (button?.id === "botaoAcessibilidade") {
        toggleAccessibilityMode();
        return;
      }

      if (button?.id === "catalogResetFilters") {
        resetFilters();
        return;
      }

      if (button?.id === "botaoCarrinho" || button?.id === "botaoAbrirCarrinhoMobile") {
        openCart();
        return;
      }

      if (button?.id === "botaoFechar") {
        closeCart();
        return;
      }

      if (button?.id === "botaoLimparCarrinho") {
        if (!state?.cart?.length) {
          showStatus(t("emptyCartError"), "error");
          return;
        }
        state.cart = [];
        saveJson(STORAGE_KEYS?.cart, state?.cart);
        renderCart();
        showStatus(t("cartCleared"), "ok");
        return;
      }

      if (button?.id === "botaoCopiarPix") {
        copyPixKey();
        return;
      }

      if (button?.id === "botaoFinalizar") {
        clearStatus();
        const validation = validateCheckout(collectForm());
        if (validation?.message) {
          showCheckoutValidationError(validation);
          return;
        }
        state.pendingMessage = buildOrderMessage();
        closeCart();
        openConfirmation(state?.pendingMessage);
        return;
      }

      if (button?.id === "botaoCancelarConfirmacao" || button?.id === "botaoFecharConfirmacaoTopo") {
        closeConfirmation();
        openCart();
        return;
      }

      if (button?.id === "botaoConfirmarEnvio") {
        const validation = validateCheckout(collectForm());
        if (validation?.message) {
          closeConfirmation();
          openCart();
          window?.setTimeout?.(function () {
            showCheckoutValidationError(validation);
          }, 80);
          return;
        }

        if (!state?.pendingMessage) {
          state.pendingMessage = buildOrderMessage();
        }

        const response = openWhatsApp(state?.pendingMessage);
        if (!response?.ok) {
          closeConfirmation();
          openCart();
          showStatus(response?.message, "error");
          return;
        }

        closeConfirmation();
        showStatus(t("whatsappOpened"), "ok");
      }
    });

    $("formCliente")?.addEventListener("submit", function (event) {
      event?.preventDefault();
      $("botaoFinalizar")?.click();
    });

    $("caixaCarrinho")?.addEventListener("click", function (event) {
      if (event?.target === $("caixaCarrinho")) {
        closeCart();
      }
    });

    $("modalConfirmacao")?.addEventListener("click", function (event) {
      if (event?.target === $("modalConfirmacao")) {
        closeConfirmation();
        openCart();
      }
    });

    document?.addEventListener("keydown", function (event) {
      if (event?.key === "Escape") {
        if ($("modalConfirmacao")?.classList?.contains("show")) {
          closeConfirmation();
          openCart();
          return;
        }
        if ($("caixaCarrinho")?.classList?.contains("show")) {
          closeCart();
        }
      }
    });

    window?.addEventListener("template:state-change", function (event) {
      if (isMetricStateChange(event?.detail)) {
        return;
      }
      syncFromSystem();
      if (event?.detail?.type === "cloud-sync-to-local") {
        state.ignoreRealtimeUntil = Date.now() + 1500;
      }
      startRealtimeSubscription();
    });

    window?.addEventListener("storage", function (event) {
      if (!event || !event?.key) {
        return;
      }

      if ([STORAGE_KEYS?.cart, STORAGE_KEYS?.form, STORAGE_KEYS?.locale, STORAGE_KEYS?.accessibility]?.includes(event?.key)) {
        state.cart = loadJson(STORAGE_KEYS?.cart, []);
        state.rememberedForm = loadJson(STORAGE_KEYS?.form, {});
        state.locale = loadJson(STORAGE_KEYS?.locale, currentLocale());
        state.accessibilityMode = normalizeAccessibilityMode(
          shared?.loadStorageValue(STORAGE_KEYS?.accessibility, state?.accessibilityMode, "local")
        );
        syncFromSystem();
      }
    });
  }

  function init() {
    state.locale = resolveLocale(state?.locale || getDefaultLocale());
    state.accessibilityMode = normalizeAccessibilityMode(state?.accessibilityMode);
    sanitizeCart();
    bindEvents();
    setupPageNavigationTransition();
    setupAdminMobileBackReturn();
    syncFromSystem();
    bootCloudCatalog();
    window?.setInterval(renderSchedule, 60000);
  }

  init();
})();

