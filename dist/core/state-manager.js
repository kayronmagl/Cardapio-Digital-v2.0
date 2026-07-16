(function () {
  const STORAGE_KEYS = {
    legacyCatalog: "template-cardapio-catalog-v2",
    legacySettings: "template-cardapio-settings-v2",
    legacyLocale: "template-cardapio-locale-v2",
    menuState: "menu_state",
    brandConfig: "brand_config",
    cloudConfig: "cloud_config",
    metrics: "system_metrics",
    metricSession: "menu_metric_session_id",
    favorites: "favorite_products",
    clientUi: "client_ui_state",
  };

  const SUPABASE_DEFAULTS = {
    enabled: false,
    provider: "supabase",
    realtime: false,
    url: "",
    anonKey: "",
    schema: "public",
    tables: {
      categories: "menu_categories",
      addOns: "menu_add_ons",
      products: "menu_products",
      productAddOns: "menu_product_add_ons",
      settings: "menu_settings",
      metricEvents: "menu_metric_events",
    },
    storage: {
      bucket: "product-images",
    },
    autoReconnect: true,
    reconnectIntervalMs: 30000,
    status: "unknown",
    lastCheckAt: "",
    lastError: "",
  };

  const IMAGE_SOURCE_MAX_LENGTH = 2 * 1024 * 1024;
  const PRODUCT_IMAGE_BUCKET = "product-images";
  const CURRENT_LOGO_URL = "./assets/NovaLogoTobias.png";

  const DEFAULT_BRAND = {
      "i18n": {
          "defaultLocale": "pt-BR",
          "supportedLocales": {
              "pt-BR": {
                  "label": "PT",
                  "name": "Português",
                  "formatLocale": "pt-BR",
                  "htmlLang": "pt-BR"
              },
              "en-US": {
                  "label": "EN",
                  "name": "English",
                  "formatLocale": "en-US",
                  "htmlLang": "en-US"
              }
          }
      },
      "brand": {
          "name": {
              "pt-BR": "Tobia's Lanches",
              "en-US": "Tobia's Lanches"
          },
          "subtitle": {
              "pt-BR": "Lanches, bebidas e sobremesas",
              "en-US": "Snacks, drinks, and desserts"
          },
          "logoUrl": CURRENT_LOGO_URL,
          "footerNote": {
              "pt-BR": "",
              "en-US": ""
          }
      },
      "destaqueInicial": {
          "kicker": {
              "pt-BR": "Cardápio digital do Tobia's Lanches",
              "en-US": "Cardápio digital do Tobia's Lanches"
          },
          "title": {
              "pt-BR": "Peça rápido e sem complicação.",
              "en-US": "Peça rápido e sem complicação."
          },
          "subtitle": {
              "pt-BR": "Delivery, retirada e pedido no local com confirmação no WhatsApp.",
              "en-US": "Delivery, retirada e pedido no local com confirmação no WhatsApp."
          },
          "imageUrl": "",
          "chips": {
              "pt-BR": [
                  "Delivery",
                  "Retirada",
                  "No local"
              ],
              "en-US": [
                  "Delivery",
                  "Pickup",
                  "Dine in"
              ]
          },
          "waitingTimeLabel": {
              "pt-BR": "Tempo médio: 20 a 40 min",
              "en-US": "Average time: 20 to 40 min"
          },
          "paymentLabel": {
              "pt-BR": "Pagamento: Pix, cartão e dinheiro",
              "en-US": "Payment: Pix, card, and cash"
          }
      },
      "business": {
          "pickupAddress": "",
          "location": {
              "address": "",
              "district": "",
              "city": "",
              "state": "",
              "mapsUrl": "",
              "latitude": "",
              "longitude": "",
              "pickupNote": ""
          },
          "whatsappNumber": "",
          "waitingTime": {
              "pt-BR": "20 a 40 min",
              "en-US": "20 to 40 min"
          },
          "allowOrdersOutsideHours": true,
          "locale": "pt-BR",
          "currency": "BRL"
      },
      "pix": {
          "key": "",
          "owner": {
              "pt-BR": "",
              "en-US": ""
          },
          "bank": {
              "pt-BR": "",
              "en-US": ""
          }
      },
      "delivery": {
          "cityLabel": {
              "pt-BR": "",
              "en-US": ""
          },
          "baseFee": 0,
          "locations": [],
          "neighborhoods": []
      },
      "schedule": [
          {
              "day": 0,
              "enabled": true,
              "open": "18:00",
              "close": "23:00"
          },
          {
              "day": 1,
              "enabled": false,
              "open": "",
              "close": ""
          },
          {
              "day": 2,
              "enabled": false,
              "open": "",
              "close": ""
          },
          {
              "day": 3,
              "enabled": false,
              "open": "",
              "close": ""
          },
          {
              "day": 4,
              "enabled": true,
              "open": "18:00",
              "close": "23:00"
          },
          {
              "day": 5,
              "enabled": true,
              "open": "18:00",
              "close": "23:00"
          },
          {
              "day": 6,
              "enabled": true,
              "open": "18:00",
              "close": "23:00"
          }
      ],
      "appearance": {
          "preset": "tobias-lanches",
          "theme": "dark",
          "palette": "gold",
          "productLayoutMode": "expanded",
          "catalogMode": "default"
      },
      "legal": {
          "enabled": true,
          "showPrivacyPolicy": true,
          "showTermsOfUse": true,
          "businessName": "Tobia's Lanches",
          "businessNameEn": "Tobia's Lanches",
          "contactEmail": "",
          "contactPhone": "",
          "businessAddress": "",
          "lastUpdated": "2026-05-31",
          "privacyPolicyMode": "internal",
          "termsOfUseMode": "internal",
          "privacyPolicyUrl": "",
          "termsOfUseUrl": ""
      }
  };

  const DEFAULT_MENU = {
      "version": 1,
      "locale": "pt-BR",
      "categories": [
          {
              "slug": "pastel",
              "name": {
                  "pt-BR": "Pastéis",
                  "en-US": "Pastéis"
              },
              "description": {
                  "pt-BR": "",
                  "en-US": ""
              },
              "sortOrder": 0
          },
          {
              "slug": "hamburguer",
              "name": {
                  "pt-BR": "Hambúrgueres",
                  "en-US": "Hambúrgueres"
              },
              "description": {
                  "pt-BR": "",
                  "en-US": ""
              },
              "sortOrder": 1
          },
          {
              "slug": "refrigerante",
              "name": {
                  "pt-BR": "Refrigerantes",
                  "en-US": "Refrigerantes"
              },
              "description": {
                  "pt-BR": "",
                  "en-US": ""
              },
              "sortOrder": 2
          },
          {
              "slug": "batida",
              "name": {
                  "pt-BR": "Batidas",
                  "en-US": "Batidas"
              },
              "description": {
                  "pt-BR": "",
                  "en-US": ""
              },
              "sortOrder": 3
          }
      ],
      "addOns": [
          {
              "id": "presunto",
              "name": {
                  "pt-BR": "Presunto",
                  "en-US": "Presunto"
              },
              "price": 3,
              "sortOrder": 0
          },
          {
              "id": "queijo",
              "name": {
                  "pt-BR": "Queijo extra",
                  "en-US": "Queijo extra"
              },
              "price": 3,
              "sortOrder": 1
          },
          {
              "id": "catupiry",
              "name": {
                  "pt-BR": "Catupiry",
                  "en-US": "Catupiry"
              },
              "price": 2.5,
              "sortOrder": 2
          },
          {
              "id": "cheddar",
              "name": {
                  "pt-BR": "Cheddar",
                  "en-US": "Cheddar"
              },
              "price": 2.5,
              "sortOrder": 3
          },
          {
              "id": "calabresa",
              "name": {
                  "pt-BR": "Calabresa",
                  "en-US": "Calabresa"
              },
              "price": 3,
              "sortOrder": 4
          },
          {
              "id": "frango",
              "name": {
                  "pt-BR": "Frango",
                  "en-US": "Frango"
              },
              "price": 3,
              "sortOrder": 5
          }
      ],
      "products": [
          {
              "id": "1",
              "category": "pastel",
              "name": {
                  "pt-BR": "Pizza 22cm",
                  "en-US": "Pizza 22cm"
              },
              "description": {
                  "pt-BR": "MISTO RALADO, TOMATE, CEBOLA, MILHO E CHEDDAR.",
                  "en-US": "MISTO RALADO, TOMATE, CEBOLA, MILHO E CHEDDAR."
              },
              "longDescription": {
                  "pt-BR": "MISTO RALADO, TOMATE, CEBOLA, MILHO E CHEDDAR.",
                  "en-US": "MISTO RALADO, TOMATE, CEBOLA, MILHO E CHEDDAR."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 12,
              "available": true,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 1
          },
          {
              "id": "2",
              "category": "pastel",
              "name": {
                  "pt-BR": "Frango Catupiry 22cm",
                  "en-US": "Frango Catupiry 22cm"
              },
              "description": {
                  "pt-BR": "FRANGO, QUEIJO COALHO, MILHO E CATUPIRY",
                  "en-US": "FRANGO, QUEIJO COALHO, MILHO E CATUPIRY"
              },
              "longDescription": {
                  "pt-BR": "FRANGO, QUEIJO COALHO, MILHO E CATUPIRY",
                  "en-US": "FRANGO, QUEIJO COALHO, MILHO E CATUPIRY"
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 12,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 2
          },
          {
              "id": "3",
              "category": "pastel",
              "name": {
                  "pt-BR": "3 Queijos 22cm",
                  "en-US": "3 Queijos 22cm"
              },
              "description": {
                  "pt-BR": "QUEIJO COALHO FATIADO, CHEDDAR E CATUPIRY.",
                  "en-US": "QUEIJO COALHO FATIADO, CHEDDAR E CATUPIRY."
              },
              "longDescription": {
                  "pt-BR": "QUEIJO COALHO FATIADO, CHEDDAR E CATUPIRY.",
                  "en-US": "QUEIJO COALHO FATIADO, CHEDDAR E CATUPIRY."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 12,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 3
          },
          {
              "id": "4",
              "category": "pastel",
              "name": {
                  "pt-BR": "Tudão 22cm",
                  "en-US": "Tudão 22cm"
              },
              "description": {
                  "pt-BR": "MISTO RALADO, FRANGO, CEBOLA, CHEIRO VERDE, MILHO E CATUPIRY.",
                  "en-US": "MISTO RALADO, FRANGO, CEBOLA, CHEIRO VERDE, MILHO E CATUPIRY."
              },
              "longDescription": {
                  "pt-BR": "MISTO RALADO, FRANGO, CEBOLA, CHEIRO VERDE, MILHO E CATUPIRY.",
                  "en-US": "MISTO RALADO, FRANGO, CEBOLA, CHEIRO VERDE, MILHO E CATUPIRY."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 12,
              "available": true,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 4
          },
          {
              "id": "5",
              "category": "pastel",
              "name": {
                  "pt-BR": "Bolonhesa 26cm",
                  "en-US": "Bolonhesa 26cm"
              },
              "description": {
                  "pt-BR": "CARNE MOÍDA, FRANGO, QUEIJO COALHO FATIADO, MILHO, TOMATE, CHEDDAR E CATUPIRY.",
                  "en-US": "CARNE MOÍDA, FRANGO, QUEIJO COALHO FATIADO, MILHO, TOMATE, CHEDDAR E CATUPIRY."
              },
              "longDescription": {
                  "pt-BR": "CARNE MOÍDA, FRANGO, QUEIJO COALHO FATIADO, MILHO, TOMATE, CHEDDAR E CATUPIRY.",
                  "en-US": "CARNE MOÍDA, FRANGO, QUEIJO COALHO FATIADO, MILHO, TOMATE, CHEDDAR E CATUPIRY."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 14,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 5
          },
          {
              "id": "6",
              "category": "pastel",
              "name": {
                  "pt-BR": "Pastel Árabe 26cm",
                  "en-US": "Pastel Árabe 26cm"
              },
              "description": {
                  "pt-BR": "CARNE MOIDA, QUEIJO COALHO, TOMATE, CEBOLA E LIMÃO.",
                  "en-US": "CARNE MOIDA, QUEIJO COALHO, TOMATE, CEBOLA E LIMÃO."
              },
              "longDescription": {
                  "pt-BR": "CARNE MOIDA, QUEIJO COALHO, TOMATE, CEBOLA E LIMÃO.",
                  "en-US": "CARNE MOIDA, QUEIJO COALHO, TOMATE, CEBOLA E LIMÃO."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 14,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 6
          },
          {
              "id": "7",
              "category": "hamburguer",
              "name": {
                  "pt-BR": "Ponta Negra Misto",
                  "en-US": "Ponta Negra Misto"
              },
              "description": {
                  "pt-BR": "PÃO BRIOCHE, PRESUNTO, QUEIJO, SALADA E MOLHOS.",
                  "en-US": "PÃO BRIOCHE, PRESUNTO, QUEIJO, SALADA E MOLHOS."
              },
              "longDescription": {
                  "pt-BR": "PÃO BRIOCHE, PRESUNTO, QUEIJO, SALADA E MOLHOS.",
                  "en-US": "PÃO BRIOCHE, PRESUNTO, QUEIJO, SALADA E MOLHOS."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 10,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 7
          },
          {
              "id": "8",
              "category": "hamburguer",
              "name": {
                  "pt-BR": "Smach Encanto",
                  "en-US": "Smach Encanto"
              },
              "description": {
                  "pt-BR": "PÃO BRIOCHE, CARNE ARTESANAL, CHEDDAR, SALADA E MOLHOS.",
                  "en-US": "PÃO BRIOCHE, CARNE ARTESANAL, CHEDDAR, SALADA E MOLHOS."
              },
              "longDescription": {
                  "pt-BR": "PÃO BRIOCHE, CARNE ARTESANAL, CHEDDAR, SALADA E MOLHOS.",
                  "en-US": "PÃO BRIOCHE, CARNE ARTESANAL, CHEDDAR, SALADA E MOLHOS."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 12,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 8
          },
          {
              "id": "9",
              "category": "hamburguer",
              "name": {
                  "pt-BR": "Majorlandia Frango",
                  "en-US": "Majorlandia Frango"
              },
              "description": {
                  "pt-BR": "PÃO BRIOCHE, FRANGO, QUEIJO, PRESUNTO, MILHO, CATUPIRY, SALADA E MOLHOS.",
                  "en-US": "PÃO BRIOCHE, FRANGO, QUEIJO, PRESUNTO, MILHO, CATUPIRY, SALADA E MOLHOS."
              },
              "longDescription": {
                  "pt-BR": "PÃO BRIOCHE, FRANGO, QUEIJO, PRESUNTO, MILHO, CATUPIRY, SALADA E MOLHOS.",
                  "en-US": "PÃO BRIOCHE, FRANGO, QUEIJO, PRESUNTO, MILHO, CATUPIRY, SALADA E MOLHOS."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 14,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 9
          },
          {
              "id": "10",
              "category": "hamburguer",
              "name": {
                  "pt-BR": "Canoa Quebrada Burguer",
                  "en-US": "Canoa Quebrada Burguer"
              },
              "description": {
                  "pt-BR": "PÃO BRIOCHE, CARNE ARTESANAL, CALABRESA, QUEIJO, PRESUNTO, CATUPIRY E MOLHOS.",
                  "en-US": "PÃO BRIOCHE, CARNE ARTESANAL, CALABRESA, QUEIJO, PRESUNTO, CATUPIRY E MOLHOS."
              },
              "longDescription": {
                  "pt-BR": "PÃO BRIOCHE, CARNE ARTESANAL, CALABRESA, QUEIJO, PRESUNTO, CATUPIRY E MOLHOS.",
                  "en-US": "PÃO BRIOCHE, CARNE ARTESANAL, CALABRESA, QUEIJO, PRESUNTO, CATUPIRY E MOLHOS."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 16,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 10
          },
          {
              "id": "11",
              "category": "hamburguer",
              "name": {
                  "pt-BR": "Mão Branca Burguer",
                  "en-US": "Mão Branca Burguer"
              },
              "description": {
                  "pt-BR": "PÃO BRIOCHE, CARNE ARTESANAL, FRANGO, CHEDDAR, SALADA E MOLHOS.",
                  "en-US": "PÃO BRIOCHE, CARNE ARTESANAL, FRANGO, CHEDDAR, SALADA E MOLHOS."
              },
              "longDescription": {
                  "pt-BR": "PÃO BRIOCHE, CARNE ARTESANAL, FRANGO, CHEDDAR, SALADA E MOLHOS.",
                  "en-US": "PÃO BRIOCHE, CARNE ARTESANAL, FRANGO, CHEDDAR, SALADA E MOLHOS."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 18,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 11
          },
          {
              "id": "12",
              "category": "hamburguer",
              "name": {
                  "pt-BR": "Iracema Burguer",
                  "en-US": "Iracema Burguer"
              },
              "description": {
                  "pt-BR": "PÃO BRIOCHE, CARNE ARTESANAL, FRANGO, QUEIJO, PRESUNTO, CALABRESA, CHEDDAR E MOLHOS.",
                  "en-US": "PÃO BRIOCHE, CARNE ARTESANAL, FRANGO, QUEIJO, PRESUNTO, CALABRESA, CHEDDAR E MOLHOS."
              },
              "longDescription": {
                  "pt-BR": "PÃO BRIOCHE, CARNE ARTESANAL, FRANGO, QUEIJO, PRESUNTO, CALABRESA, CHEDDAR E MOLHOS.",
                  "en-US": "PÃO BRIOCHE, CARNE ARTESANAL, FRANGO, QUEIJO, PRESUNTO, CALABRESA, CHEDDAR E MOLHOS."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 20,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 12
          },
          {
              "id": "13",
              "category": "refrigerante",
              "name": {
                  "pt-BR": "Coca-Cola 1L",
                  "en-US": "Coca-Cola 1L"
              },
              "description": {
                  "pt-BR": "Refrigerante Coca-Cola 1 litro.",
                  "en-US": "Refrigerante Coca-Cola 1 litro."
              },
              "longDescription": {
                  "pt-BR": "Refrigerante Coca-Cola 1 litro.",
                  "en-US": "Refrigerante Coca-Cola 1 litro."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 10,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 13
          },
          {
              "id": "14",
              "category": "refrigerante",
              "name": {
                  "pt-BR": "Cajuína São Geraldo 1L",
                  "en-US": "Cajuína São Geraldo 1L"
              },
              "description": {
                  "pt-BR": "Refrigerante Cajuína São Geraldo.",
                  "en-US": "Refrigerante Cajuína São Geraldo."
              },
              "longDescription": {
                  "pt-BR": "Refrigerante Cajuína São Geraldo.",
                  "en-US": "Refrigerante Cajuína São Geraldo."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 10,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 14
          },
          {
              "id": "15",
              "category": "refrigerante",
              "name": {
                  "pt-BR": "Coca-Cola Lata Zero",
                  "en-US": "Coca-Cola Lata Zero"
              },
              "description": {
                  "pt-BR": "Coca-Cola zero em lata.",
                  "en-US": "Coca-Cola zero em lata."
              },
              "longDescription": {
                  "pt-BR": "Coca-Cola zero em lata.",
                  "en-US": "Coca-Cola zero em lata."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 5,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 15
          },
          {
              "id": "16",
              "category": "refrigerante",
              "name": {
                  "pt-BR": "Coca-Cola Lata",
                  "en-US": "Coca-Cola Lata"
              },
              "description": {
                  "pt-BR": "Coca-Cola tradicional em lata.",
                  "en-US": "Coca-Cola tradicional em lata."
              },
              "longDescription": {
                  "pt-BR": "Coca-Cola tradicional em lata.",
                  "en-US": "Coca-Cola tradicional em lata."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 5,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 16
          },
          {
              "id": "17",
              "category": "refrigerante",
              "name": {
                  "pt-BR": "Cajuína Lata São Geraldo",
                  "en-US": "Cajuína Lata São Geraldo"
              },
              "description": {
                  "pt-BR": "Cajuína São Geraldo em lata.",
                  "en-US": "Cajuína São Geraldo em lata."
              },
              "longDescription": {
                  "pt-BR": "Cajuína São Geraldo em lata.",
                  "en-US": "Cajuína São Geraldo em lata."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 5,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 17
          },
          {
              "id": "18",
              "category": "refrigerante",
              "name": {
                  "pt-BR": "Água sem gás",
                  "en-US": "Água sem gás"
              },
              "description": {
                  "pt-BR": "Água mineral sem gás.",
                  "en-US": "Água mineral sem gás."
              },
              "longDescription": {
                  "pt-BR": "Água mineral sem gás.",
                  "en-US": "Água mineral sem gás."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 2,
              "available": true,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 18
          },
          {
              "id": "19",
              "category": "batida",
              "name": {
                  "pt-BR": "Batida Tradicional 300ml",
                  "en-US": "Batida Tradicional 300ml"
              },
              "description": {
                  "pt-BR": "Batida de açaí líquido, paçoca, castanha, leite em pó, leite condensado, leite líquido.",
                  "en-US": "Batida de açaí líquido, paçoca, castanha, leite em pó, leite condensado, leite líquido."
              },
              "longDescription": {
                  "pt-BR": "Batida de açaí líquido, paçoca, castanha, leite em pó, leite condensado, leite líquido.",
                  "en-US": "Batida de açaí líquido, paçoca, castanha, leite em pó, leite condensado, leite líquido."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 12,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 19
          },
          {
              "id": "20",
              "category": "batida",
              "name": {
                  "pt-BR": "Batida Banana",
                  "en-US": "Batida Banana"
              },
              "description": {
                  "pt-BR": "Batida de açaí líquido com banana.",
                  "en-US": "Batida de açaí líquido com banana."
              },
              "longDescription": {
                  "pt-BR": "Batida de açaí líquido com banana.",
                  "en-US": "Batida de açaí líquido com banana."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 13,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 20
          },
          {
              "id": "21",
              "category": "batida",
              "name": {
                  "pt-BR": "Batida Morango",
                  "en-US": "Batida Morango"
              },
              "description": {
                  "pt-BR": "Batida de açaí líquido com morango.",
                  "en-US": "Batida de açaí líquido com morango."
              },
              "longDescription": {
                  "pt-BR": "Batida de açaí líquido com morango.",
                  "en-US": "Batida de açaí líquido com morango."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 14,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 21
          },
          {
              "id": "23",
              "category": "pastel",
              "name": {
                  "pt-BR": "Moda da Casa 26cm",
                  "en-US": "Moda da Casa 26cm"
              },
              "description": {
                  "pt-BR": "FRANGO, QUEIJO COALHO, CALABRESA E CATUPIRY.",
                  "en-US": "FRANGO, QUEIJO COALHO, CALABRESA E CATUPIRY."
              },
              "longDescription": {
                  "pt-BR": "FRANGO, QUEIJO COALHO, CALABRESA E CATUPIRY.",
                  "en-US": "FRANGO, QUEIJO COALHO, CALABRESA E CATUPIRY."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 14,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 23
          },
          {
              "id": "24",
              "category": "pastel",
              "name": {
                  "pt-BR": "Especial da Casa 26cm",
                  "en-US": "Especial da Casa 26cm"
              },
              "description": {
                  "pt-BR": "MISTO RALADO, FRANGO, CARNE MOIDA, CALABRESA, CHEIRO VERDE, CEBOLA, MILHO, CATUPIRY E CHEDDAR.",
                  "en-US": "MISTO RALADO, FRANGO, CARNE MOIDA, CALABRESA, CHEIRO VERDE, CEBOLA, MILHO, CATUPIRY E CHEDDAR."
              },
              "longDescription": {
                  "pt-BR": "MISTO RALADO, FRANGO, CARNE MOIDA, CALABRESA, CHEIRO VERDE, CEBOLA, MILHO, CATUPIRY E CHEDDAR.",
                  "en-US": "MISTO RALADO, FRANGO, CARNE MOIDA, CALABRESA, CHEIRO VERDE, CEBOLA, MILHO, CATUPIRY E CHEDDAR."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 14,
              "available": true,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 24
          },
          {
              "id": "25",
              "category": "pastel",
              "name": {
                  "pt-BR": "Calabresa 26cm",
                  "en-US": "Calabresa 26cm"
              },
              "description": {
                  "pt-BR": "CALABRESA FATIADA, PRESUNTO FATIADO, QUEIJO COALHO FATIADO, CEBOLA, MILHO E CHEDDAR.",
                  "en-US": "CALABRESA FATIADA, PRESUNTO FATIADO, QUEIJO COALHO FATIADO, CEBOLA, MILHO E CHEDDAR."
              },
              "longDescription": {
                  "pt-BR": "CALABRESA FATIADA, PRESUNTO FATIADO, QUEIJO COALHO FATIADO, CEBOLA, MILHO E CHEDDAR.",
                  "en-US": "CALABRESA FATIADA, PRESUNTO FATIADO, QUEIJO COALHO FATIADO, CEBOLA, MILHO E CHEDDAR."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 14,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 25
          },
          {
              "id": "26",
              "category": "pastel",
              "name": {
                  "pt-BR": "Nordestino 30cm",
                  "en-US": "Nordestino 30cm"
              },
              "description": {
                  "pt-BR": "QUEIJO COALHO FATIADO, PRESUNTO FATIADO, CARNE MOÍDA, CALABRESA, CEBOLA, MILHO, CHEDDAR E ORÉGANO.",
                  "en-US": "QUEIJO COALHO FATIADO, PRESUNTO FATIADO, CARNE MOÍDA, CALABRESA, CEBOLA, MILHO, CHEDDAR E ORÉGANO."
              },
              "longDescription": {
                  "pt-BR": "QUEIJO COALHO FATIADO, PRESUNTO FATIADO, CARNE MOÍDA, CALABRESA, CEBOLA, MILHO, CHEDDAR E ORÉGANO.",
                  "en-US": "QUEIJO COALHO FATIADO, PRESUNTO FATIADO, CARNE MOÍDA, CALABRESA, CEBOLA, MILHO, CHEDDAR E ORÉGANO."
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 17,
              "available": false,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 26
          },
          {
              "id": "27",
              "category": "pastel",
              "name": {
                  "pt-BR": "Arretado 30cm",
                  "en-US": "Arretado 30cm"
              },
              "description": {
                  "pt-BR": "MISTO RALADO, FRANGO, CARNE MOÍDA, CALABRESA, CEBOLA, CHEIRO VERDE, MILHO, CHEDDAR E CATUPIRY",
                  "en-US": "MISTO RALADO, FRANGO, CARNE MOÍDA, CALABRESA, CEBOLA, CHEIRO VERDE, MILHO, CHEDDAR E CATUPIRY"
              },
              "longDescription": {
                  "pt-BR": "MISTO RALADO, FRANGO, CARNE MOÍDA, CALABRESA, CEBOLA, CHEIRO VERDE, MILHO, CHEDDAR E CATUPIRY",
                  "en-US": "MISTO RALADO, FRANGO, CARNE MOÍDA, CALABRESA, CEBOLA, CHEIRO VERDE, MILHO, CHEDDAR E CATUPIRY"
              },
              "imageUrl": "",
              "images": [],
              "primaryImage": "",
              "price": 17,
              "available": true,
              "active": true,
              "status": "active",
              "featured": false,
              "prepTime": null,
              "tags": [],
              "addOns": [],
              "createdAt": "",
              "updatedAt": "2026-05-17T09:11:59-03:00",
              "sortOrder": 27
          }
      ],
      "offers": {
          "combos": [],
          "discounts": []
      },
      "updatedAt": "2026-05-17T09:11:59-03:00"
  };

  const KNOWN_EN_TRANSLATIONS = {
      "Cardápio digital do Tobia's Lanches": "Tobia's Lanches digital menu",
      "Peça rápido e sem complicação.": "Order quickly and easily.",
      "Delivery, retirada e pedido no local com confirmação no WhatsApp.": "Delivery, pickup, and dine-in orders with WhatsApp confirmation.",
      "Pastéis": "Pastries",
      "Hambúrgueres": "Burgers",
      "Refrigerantes": "Soft drinks",
      "Batidas": "Shakes",
      "Presunto": "Ham",
      "Queijo extra": "Extra cheese",
      "Calabresa": "Calabrese sausage",
      "Frango": "Chicken",
      "Frango Catupiry 22cm": "Chicken with Catupiry 22cm",
      "3 Queijos 22cm": "3 Cheeses 22cm",
      "Tudão 22cm": "Loaded Special 22cm",
      "Bolonhesa 26cm": "Bolognese 26cm",
      "Pastel Árabe 26cm": "Arabic-style Pastel 26cm",
      "Ponta Negra Misto": "Ponta Negra Mixed",
      "Majorlandia Frango": "Majorlandia Chicken",
      "Canoa Quebrada Burguer": "Canoa Quebrada Burger",
      "Mão Branca Burguer": "Mão Branca Burger",
      "Iracema Burguer": "Iracema Burger",
      "Coca-Cola Lata Zero": "Coca-Cola Zero Can",
      "Coca-Cola Lata": "Coca-Cola Can",
      "Cajuína Lata São Geraldo": "São Geraldo Cajuina Can",
      "Água sem gás": "Still Water",
      "Batida Tradicional 300ml": "Traditional Acai Shake 300ml",
      "Batida Banana": "Banana Acai Shake",
      "Batida Morango": "Strawberry Acai Shake",
      "Moda da Casa 26cm": "House Special 26cm",
      "Especial da Casa 26cm": "House Deluxe 26cm",
      "Calabresa 26cm": "Calabrese Sausage 26cm",
      "Nordestino 30cm": "Northeastern Special 30cm",
      "Arretado 30cm": "Bold Special 30cm",
      "MISTO RALADO, TOMATE, CEBOLA, MILHO E CHEDDAR.": "Grated mixed cheese, tomato, onion, corn, and cheddar.",
      "FRANGO, QUEIJO COALHO, MILHO E CATUPIRY": "Chicken, coalho cheese, corn, and Catupiry.",
      "QUEIJO COALHO FATIADO, CHEDDAR E CATUPIRY.": "Sliced coalho cheese, cheddar, and Catupiry.",
      "MISTO RALADO, FRANGO, CEBOLA, CHEIRO VERDE, MILHO E CATUPIRY.": "Grated mixed cheese, chicken, onion, fresh herbs, corn, and Catupiry.",
      "CARNE MOÍDA, FRANGO, QUEIJO COALHO FATIADO, MILHO, TOMATE, CHEDDAR E CATUPIRY.": "Ground beef, chicken, sliced coalho cheese, corn, tomato, cheddar, and Catupiry.",
      "CARNE MOIDA, QUEIJO COALHO, TOMATE, CEBOLA E LIMÃO.": "Ground beef, coalho cheese, tomato, onion, and lime.",
      "PÃO BRIOCHE, PRESUNTO, QUEIJO, SALADA E MOLHOS.": "Brioche bun, ham, cheese, salad, and sauces.",
      "PÃO BRIOCHE, CARNE ARTESANAL, CHEDDAR, SALADA E MOLHOS.": "Brioche bun, handcrafted beef, cheddar, salad, and sauces.",
      "PÃO BRIOCHE, FRANGO, QUEIJO, PRESUNTO, MILHO, CATUPIRY, SALADA E MOLHOS.": "Brioche bun, chicken, cheese, ham, corn, Catupiry, salad, and sauces.",
      "PÃO BRIOCHE, CARNE ARTESANAL, CALABRESA, QUEIJO, PRESUNTO, CATUPIRY E MOLHOS.": "Brioche bun, handcrafted beef, calabrese sausage, cheese, ham, Catupiry, and sauces.",
      "PÃO BRIOCHE, CARNE ARTESANAL, FRANGO, CHEDDAR, SALADA E MOLHOS.": "Brioche bun, handcrafted beef, chicken, cheddar, salad, and sauces.",
      "PÃO BRIOCHE, CARNE ARTESANAL, FRANGO, QUEIJO, PRESUNTO, CALABRESA, CHEDDAR E MOLHOS.": "Brioche bun, handcrafted beef, chicken, cheese, ham, calabrese sausage, cheddar, and sauces.",
      "Refrigerante Coca-Cola 1 litro.": "1-liter Coca-Cola soft drink.",
      "Refrigerante Cajuína São Geraldo.": "Sao Geraldo cajuina soft drink.",
      "Coca-Cola zero em lata.": "Coca-Cola Zero in a can.",
      "Coca-Cola tradicional em lata.": "Classic Coca-Cola in a can.",
      "Cajuína São Geraldo em lata.": "Sao Geraldo cajuina in a can.",
      "Água mineral sem gás.": "Still mineral water.",
      "Batida de açaí líquido, paçoca, castanha, leite em pó, leite condensado, leite líquido.": "Liquid acai shake with pacoca, nuts, powdered milk, condensed milk, and milk.",
      "Batida de açaí líquido com banana.": "Liquid acai shake with banana.",
      "Batida de açaí líquido com morango.": "Liquid acai shake with strawberry.",
      "Sem entrega no momento.": "Unavailable for delivery right now.",
      "FRANGO, QUEIJO COALHO, CALABRESA E CATUPIRY.": "Chicken, coalho cheese, calabrese sausage, and Catupiry.",
      "MISTO RALADO, FRANGO, CARNE MOIDA, CALABRESA, CHEIRO VERDE, CEBOLA, MILHO, CATUPIRY E CHEDDAR.": "Grated mixed cheese, chicken, ground beef, calabrese sausage, fresh herbs, onion, corn, Catupiry, and cheddar.",
      "CALABRESA FATIADA, PRESUNTO FATIADO, QUEIJO COALHO FATIADO, CEBOLA, MILHO E CHEDDAR.": "Sliced calabrese sausage, sliced ham, sliced coalho cheese, onion, corn, and cheddar.",
      "QUEIJO COALHO FATIADO, PRESUNTO FATIADO, CARNE MOÍDA, CALABRESA, CEBOLA, MILHO, CHEDDAR E ORÉGANO.": "Sliced coalho cheese, sliced ham, ground beef, calabrese sausage, onion, corn, cheddar, and oregano.",
      "MISTO RALADO, FRANGO, CARNE MOÍDA, CALABRESA, CEBOLA, CHEIRO VERDE, MILHO, CHEDDAR E CATUPIRY": "Grated mixed cheese, chicken, ground beef, calabrese sausage, onion, fresh herbs, corn, cheddar, and Catupiry"
  };
 // IDIOMA | traducao consulta prepara dados de idioma. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function normalizeTranslationLookup(text) {
    return sanitizeText(text, "", 300)
      .replace(/\s+/g, " ")
      .replace(/\s*-\s*/g, "-")
      .trim();
  }

  const DEFAULT_METRICS = {
    views: {},
    adds: {},
    lastViewedAt: {},
    lastAddedAt: {},
    checkoutOpened: 0,
    orderPrepared: 0,
    payments: {},
    serviceChoices: {},
    searchNoResults: {},
    lastCheckoutOpenedAt: "",
    lastOrderPreparedAt: "",
    lastPaymentAt: {},
    lastServiceChoiceAt: {},
    lastSearchNoResultAt: {},
  };

  const DEFAULT_CLIENT_UI = {
    visualMode: "expanded",
    catalogMode: "default",
    highlightMode: false,
  };
 // TRATAMENTO | regra prepara dados de tratamento de dados. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function clone(value) {
    return JSON?.parse(JSON?.stringify(value));
  }
 // TRATAMENTO | JSON prepara dados de tratamento de dados. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function safeJsonParse(raw, fallback) {
    if (!raw) {
      return clone(fallback);
    }

    try {
      return JSON?.parse(raw);
    } catch (error) {
      return clone(fallback);
    }
  }
 // ESTADO | armazenamento le dados preenchidos em estado salvo. A logica pega campos da tela, limpa valores e monta um pacote pronto para validar e salvar.
  function readStorage(key, fallback) {
    try {
      return safeJsonParse(window?.localStorage?.getItem(key), fallback);
    } catch (error) {
      return clone(fallback);
    }
  }
 // ESTADO | armazenamento conversa com estado salvo. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  function writeStorage(key, value) {
    try {
      window?.localStorage?.setItem(key, JSON?.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }
 // ESTADO | remocao do armazenamento apaga uma chave local com seguranca. A logica tenta limpar o localStorage e devolve sucesso ou falha sem interromper o sistema.
  function removeStorage(key) {
    try {
      window?.localStorage?.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }
 // TRATAMENTO | texto prepara dados de tratamento de dados. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeText(value, fallback, maxLength) {
    const resolved = String(value == null ? fallback || "" : value)
      ?.replace(/[<>"]/g, "")
      ?.trim();

    return Number.isFinite(maxLength) ? resolved?.slice(0, maxLength) : resolved;
  }
 // LOCALIZACAO | mapas link prepara dados de localizacao e entrega. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeMapsUrl(value) {
    const raw = sanitizeText(value, "", 600);
    if (!raw) {
      return "";
    }

    try {
      const url = new URL(raw, window?.location?.href || "https://example.com/");
      return /^https?:$/i.test(url?.protocol) ? raw : "";
    } catch (error) {
      return "";
    }
  }
 // LEGAL | legal modo prepara dados de textos legais. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeLegalMode(value) {
    return sanitizeText(value, "internal", 20)?.toLowerCase() === "external" ? "external" : "internal";
  }
 // LEGAL | legal link prepara dados de textos legais. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeLegalUrl(value) {
    const raw = sanitizeText(value, "", 600);
    if (!raw) {
      return "";
    }

    try {
      const url = new URL(raw);
      return /^https?:$/i.test(url?.protocol) ? url?.toString() : "";
    } catch (error) {
      return "";
    }
  }
 // LEGAL | legal ajuste prepara dados de textos legais. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeLegalConfig(rawLegal) {
    const input = rawLegal && typeof rawLegal === "object" ? rawLegal : {};
    const source = { ...(DEFAULT_BRAND?.legal || {}), ...clone(input) };

    return {
      enabled: source?.enabled !== false,
      showPrivacyPolicy: source?.showPrivacyPolicy !== false,
      showTermsOfUse: source?.showTermsOfUse !== false,
      businessName: sanitizeText(source?.businessName, DEFAULT_BRAND?.legal?.businessName || "Tobia's Lanches", 120),
      businessNameEn: sanitizeText(source?.businessNameEn, DEFAULT_BRAND?.legal?.businessNameEn || "Tobia's Lanches", 120),
      contactEmail: sanitizeText(source?.contactEmail, "", 160),
      contactPhone: sanitizeText(source?.contactPhone, "", 40),
      businessAddress: sanitizeText(source?.businessAddress, "", 240),
      lastUpdated: sanitizeText(source?.lastUpdated, DEFAULT_BRAND?.legal?.lastUpdated || "2026-05-31", 40),
      privacyPolicyMode: sanitizeLegalMode(source?.privacyPolicyMode),
      termsOfUseMode: sanitizeLegalMode(source?.termsOfUseMode),
      privacyPolicyUrl: sanitizeLegalUrl(source?.privacyPolicyUrl),
      termsOfUseUrl: sanitizeLegalUrl(source?.termsOfUseUrl),
    };
  }
 // LOCALIZACAO | coordenada prepara dados de localizacao e entrega. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeCoordinate(value, min, max) {
    const raw = sanitizeText(value, "", 40)?.replace(",", ".");
    if (!raw) {
      return "";
    }

    const number = Number(raw);
    if (!Number.isFinite(number) || number < min || number > max) {
      return "";
    }

    return String(number);
  }
 // LOCALIZACAO | estabelecimento localizacao prepara dados de localizacao e entrega. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeBusinessLocation(rawLocation, rawBusiness) {
    const source = rawLocation && typeof rawLocation === "object" ? rawLocation : {};
    const business = rawBusiness && typeof rawBusiness === "object" ? rawBusiness : {};

    return {
      address: sanitizeText(source?.address || source?.pickupAddress || business?.pickupAddress, "", 180),
      district: sanitizeText(source?.district || source?.neighborhood, "", 80),
      city: sanitizeText(source?.city, "", 80),
      state: sanitizeText(source?.state || source?.uf, "", 20)?.toUpperCase(),
      mapsUrl: sanitizeMapsUrl(source?.mapsUrl || source?.googleMapsUrl || source?.routeUrl),
      latitude: sanitizeCoordinate(source?.latitude || source?.lat, -90, 90),
      longitude: sanitizeCoordinate(source?.longitude || source?.lng || source?.lon, -180, 180),
      pickupNote: sanitizeText(source?.pickupNote || source?.note, "", 220),
    };
  }
 // NUVEM | ajustado nuvem credenciais confere uma condicao de nuvem Supabase. A logica analisa os dados atuais e devolve verdadeiro ou falso para decidir se a acao continua, espera ou para.
  function hasConfiguredCloudCredentials(cloudConfig) {
    const combined = String(cloudConfig?.url || "") + String(cloudConfig?.anonKey || "");
    return Boolean(
      cloudConfig?.url &&
      cloudConfig?.anonKey &&
      !/YOUR_PROJECT|YOUR-PROJECT|YOUR_SUPABASE_ANON_KEY|YOUR_ANON_PUBLIC_KEY|SEU-PROJETO|SUA_ANON_PUBLIC_KEY/i.test(combined)
    );
  }
 // NUVEM | publico nuvem ajuste prepara dados de nuvem Supabase. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function normalizePublicCloudConfig(rawConfig) {
    const input = rawConfig && typeof rawConfig === "object" ? rawConfig : {};
    const tables = input?.tables && typeof input?.tables === "object" ? input?.tables : {};
    const storage = input?.storage && typeof input?.storage === "object" ? input?.storage : {};

    return {
      enabled: Boolean(input?.enabled),
      provider: sanitizeText(input?.provider, SUPABASE_DEFAULTS?.provider, 40),
      realtime: Boolean(input?.realtime),
      url: sanitizeText(input?.url, "", 500),
      anonKey: sanitizeText(input?.anonKey, "", 500),
      schema: sanitizeText(input?.schema, SUPABASE_DEFAULTS?.schema, 40),
      tables: {
        categories: sanitizeText(tables.categories || input?.tableCategories, SUPABASE_DEFAULTS?.tables.categories, 80),
        addOns: sanitizeText(tables.addOns || input?.tableAddOns, SUPABASE_DEFAULTS?.tables.addOns, 80),
        products: sanitizeText(tables.products || input?.tableProducts, SUPABASE_DEFAULTS?.tables.products, 80),
        productAddOns: sanitizeText(tables.productAddOns || input?.tableProductAddOns, SUPABASE_DEFAULTS?.tables.productAddOns, 80),
        settings: sanitizeText(tables.settings || input?.tableSettings, SUPABASE_DEFAULTS?.tables.settings, 80),
        metricEvents: sanitizeText(tables.metricEvents || input?.tableMetricEvents, SUPABASE_DEFAULTS?.tables.metricEvents, 80),
      },
      storage: {
        bucket: sanitizeText(storage?.bucket || input?.storageBucket, SUPABASE_DEFAULTS?.storage?.bucket, 120),
      },
      autoReconnect: input?.autoReconnect !== false,
      reconnectIntervalMs: Number.isFinite(Number(input?.reconnectIntervalMs))
        ? Number(input?.reconnectIntervalMs)
        : SUPABASE_DEFAULTS?.reconnectIntervalMs,
      status: sanitizeText(input?.status, SUPABASE_DEFAULTS?.status, 20),
      lastCheckAt: sanitizeText(input?.lastCheckAt, "", 60),
      lastError: sanitizeText(input?.lastError, "", 300),
    };
  }
 // NUVEM | antigo Supabase ajuste prepara dados de nuvem Supabase. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function normalizeLegacySupabaseConfig(rawConfig) {
    const normalized = normalizePublicCloudConfig(rawConfig);
    if (rawConfig?.enabled == null) {
      normalized.enabled = hasConfiguredCloudCredentials(normalized);
    }
    return normalized;
  }
 // NUVEM | original nuvem ajuste regra confere uma condicao de nuvem Supabase. A logica analisa os dados atuais e devolve verdadeiro ou falso para decidir se a acao continua, espera ou para.
  function hasRawCloudConfigValue(rawConfig) {
    return Boolean(
      rawConfig &&
      typeof rawConfig === "object" &&
      Object?.keys(rawConfig)?.length > 0
    );
  }
 // NUVEM | mescla operacional nuvem ajuste conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  function mergeOperationalCloudConfig(baseConfig, operationalSource) {
    const source = operationalSource && typeof operationalSource === "object" ? operationalSource : {};
    return sanitizeCloudConfig({
      ...baseConfig,
      realtime: source?.realtime == null ? baseConfig?.realtime : Boolean(source?.realtime),
      autoReconnect: source?.autoReconnect == null ? baseConfig?.autoReconnect : source?.autoReconnect !== false,
      reconnectIntervalMs: Number.isFinite(Number(source?.reconnectIntervalMs))
        ? Number(source?.reconnectIntervalMs)
        : baseConfig?.reconnectIntervalMs,
      status: sanitizeText(source?.status, baseConfig?.status || "unknown", 20),
      lastCheckAt: sanitizeText(source?.lastCheckAt, baseConfig?.lastCheckAt || "", 60),
      lastError: sanitizeText(source?.lastError, baseConfig?.lastError || "", 300),
    });
  }
 // NUVEM | nuvem ajuste conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  function resolveCloudConfig(options) {
    const publicCloudConfig = sanitizeCloudConfig(options?.publicCloudConfig);
    const storedCloudConfig = sanitizeCloudConfig(options?.storedCloudConfig);
    const legacyCloudConfig = normalizeLegacySupabaseConfig(options?.legacySupabaseConfig);
    const defaultCloudConfig = sanitizeCloudConfig(SUPABASE_DEFAULTS);
    const statusSource = sanitizeCloudConfig(
      options?.statusSource ||
      options?.storedCloudConfig ||
      options?.legacySupabaseConfig ||
      defaultCloudConfig
    );

    const attachStatus = function (baseConfig) {
      return sanitizeCloudConfig({
        ...baseConfig,
        status: sanitizeText(statusSource?.status, baseConfig?.status || "unknown", 20),
        lastCheckAt: sanitizeText(statusSource?.lastCheckAt, baseConfig?.lastCheckAt || "", 60),
        lastError: sanitizeText(statusSource?.lastError, baseConfig?.lastError || "", 300),
      });
    };

    if (
      hasRawCloudConfigValue(options?.rawPublicCloudConfig) &&
      (publicCloudConfig?.enabled === false || hasConfiguredCloudCredentials(publicCloudConfig))
    ) {
      return mergeOperationalCloudConfig(attachStatus(publicCloudConfig), storedCloudConfig);
    }

    if (hasRawCloudConfigValue(options?.rawStoredCloudConfig)) {
      return mergeOperationalCloudConfig(attachStatus(storedCloudConfig), storedCloudConfig);
    }

    if (hasRawCloudConfigValue(options?.legacySupabaseConfig)) {
      return mergeOperationalCloudConfig(attachStatus(legacyCloudConfig), legacyCloudConfig);
    }

    return mergeOperationalCloudConfig(attachStatus(defaultCloudConfig), storedCloudConfig);
  }
 // TRATAMENTO | codigo curto prepara nomes para virar identificador. A logica remove acentos, troca espacos por hifen e usa fallback quando o texto fica vazio.
  function slugify(value, fallback) {
    const source = sanitizeText(value, fallback || "", 120)
      ?.normalize("NFD")
      ?.replace(/[\u0300-\u036f]/g, "")
      ?.toLowerCase()
      ?.replace(/[^a-z0-9]+/g, "-")
      ?.replace(/^-+|-+$/g, "");

    return source || sanitizeText(fallback || "item", "item", 80)?.toLowerCase()?.replace(/\s+/g, "-");
  }
 // BASE | unico identificador prepara dados de base do sistema. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function uniqueId(baseId, usedIds) {
    let nextId = baseId || "item";
    let counter = 1;

    while (usedIds?.has(nextId)) {
      counter += 1;
      nextId = `${baseId}-${counter}`;
    }

    usedIds?.add(nextId);
    return nextId;
  }
 // TRATAMENTO | primeiro objeto texto busca um valor de tratamento de dados. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function firstObjectText(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return "";
    }

    const values = Object.values(value);
    for (let index = 0; index < values.length; index += 1) {
      const text = sanitizeText(values[index], "", 300);
      if (text) {
        return text;
      }
    }

    return "";
  }
 // IDIOMA | conhecido ingles traducao separa uma regra de idioma. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function resolveKnownEnglishTranslation(text) {
    const source = sanitizeText(text, "", 300);
    if (!source) {
      return "";
    }
    const exact = sanitizeText(KNOWN_EN_TRANSLATIONS[source], "", 300);
    if (exact) {
      return exact;
    }
    const normalizedSource = normalizeTranslationLookup(source);
    if (!normalizedSource) {
      return "";
    }
    const normalizedMatch = Object.entries(KNOWN_EN_TRANSLATIONS).find(function (entry) {
      return normalizeTranslationLookup(entry?.[0]) === normalizedSource;
    });
    return sanitizeText(normalizedMatch?.[1], "", 300);
  }
 // IDIOMA | traducoes separa uma regra de idioma. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function ensureTranslations(value, fallback) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const fallbackText = sanitizeText(fallback, "", 300) || firstObjectText(value);
      const pt = sanitizeText(
        value["pt-BR"] || value?.pt || value["pt_br"] || value?.ptBR,
        fallbackText,
        300
      );
      const en = sanitizeText(
        value["en-US"] || value?.en || value["en_us"] || value?.enUS,
        pt || fallbackText,
        300
      );
      const translatedEn = resolveKnownEnglishTranslation(pt);
      return {
        "pt-BR": pt,
        "en-US": translatedEn && (!en || en === pt) ? translatedEn : en,
      };
    }

    const text = sanitizeText(value, fallback || "", 300);
    const translatedEn = resolveKnownEnglishTranslation(text);
    return { "pt-BR": text, "en-US": translatedEn || text };
  }
 // LOCALIZACAO | entrega locais prepara dados de localizacao e entrega. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function normalizeDeliveryLocations(deliverySource) {
    const source = deliverySource && typeof deliverySource === "object" ? deliverySource : {};
    const legacySource = Array.isArray(source?.locations)
      ? source.locations
      : Array.isArray(source?.neighborhoods)
        ? source.neighborhoods
        : DEFAULT_BRAND?.delivery?.locations;
    const usedIds = new Set();

    return (Array.isArray(legacySource) ? legacySource : [])
      .map((location, index) => {
        const name = ensureTranslations(location?.name, `Local ${index + 1}`);
        const rawFeeMode = sanitizeText(location?.feeMode, "", 20)?.toLowerCase();
        const feeMode = rawFeeMode === "custom" || location?.fee == null ? "custom" : "fixed";
        const numericFee = Number(location?.fee);
        const fee = feeMode === "fixed" && Number.isFinite(numericFee) && numericFee >= 0 ? numericFee : null;
        const idBase = slugify(
          location?.id || location?.slug || location?.key || name["pt-BR"] || name["en-US"],
          `localidade-${index + 1}`
        );

        return {
          id: uniqueId(idBase, usedIds),
          name,
          fee,
          feeMode,
          active: location?.active == null ? location?.available !== false : Boolean(location?.active),
          note: ensureTranslations(location?.note, ""),
        };
      })
      .filter((location) => Boolean(location?.id && (location?.name?.["pt-BR"] || location?.name?.["en-US"])));
  }
 // LOCALIZACAO | entrega locais antigo bairros busca um valor de localizacao e entrega. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function deliveryLocationsToLegacyNeighborhoods(locations) {
    return (Array.isArray(locations) ? locations : []).map((location) => ({
      name: clone(location?.name),
      fee: location?.feeMode === "fixed" ? Number(location?.fee || 0) : 0,
      available: location?.active !== false,
    }));
  }
 // TRATAMENTO | texto lista separa uma regra de tratamento de dados. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function ensureStringArray(value) {
    if (!Array.isArray(value)) {
      return [];
    }

    return Array?.from(
      new Set(
        value
          .map((item) => sanitizeText(item, "", 40))
          ?.filter(Boolean)
      )
    );
  }
 // IDIOMA | idioma lista traducoes separa uma regra de idioma. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function ensureLocaleArrayTranslations(value, fallback) {
    const fallbackSource = fallback && typeof fallback === "object" ? fallback : {};
    const fallbackPt = ensureStringArray(fallbackSource["pt-BR"]);
    const fallbackEn = ensureStringArray(fallbackSource["en-US"] || fallbackPt);

    if (value && typeof value === "object" && !Array.isArray(value)) {
      const pt = ensureStringArray(value["pt-BR"]);
      const en = ensureStringArray(value["en-US"]);
      return {
        "pt-BR": pt?.length ? pt : fallbackPt,
        "en-US": en?.length ? en : (pt?.length ? pt : fallbackEn),
      };
    }

    const source = ensureStringArray(value);
    return {
      "pt-BR": source?.length ? source : fallbackPt,
      "en-US": source?.length ? source : fallbackEn,
    };
  }
 // IMAGEM | imagem lista separa uma regra de imagens. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function ensureImageList(product) {
    const images = Array.isArray(product?.images)
      ? product?.images
      : Array.isArray(product?.gallery)
        ? product?.gallery
        : [];

    const normalized = ensureImageArray([
      product?.primaryImage,
      product?.imageUrl,
      product?.image,
      ...images,
    ]);

    return normalized;
  }
 // ADMIN | cardapio antigo catalogo monta uma estrutura de painel Admin. A logica junta partes soltas em um formato unico para renderizar, salvar ou enviar.
  function buildMenuFromLegacyCatalog(legacyCatalog, legacySettings) {
    const catalog = legacyCatalog && typeof legacyCatalog === "object" ? legacyCatalog : {};
    const settings = legacySettings && typeof legacySettings === "object" ? legacySettings : {};
    const hasLegacyProducts =
      Array.isArray(catalog?.products) && catalog?.products?.length > 0;
    const hasLegacyCategories =
      Array.isArray(catalog?.categories) && catalog?.categories?.length > 0;
    const fallbackCatalog = hasLegacyProducts || hasLegacyCategories ? catalog : clone(DEFAULT_MENU);

    return {
      version: 1,
      categories: Array.isArray(fallbackCatalog?.categories) ? clone(fallbackCatalog?.categories) : [],
      addOns: Array.isArray(fallbackCatalog?.addOns) ? clone(fallbackCatalog?.addOns) : [],
      products: Array.isArray(fallbackCatalog?.products) ? clone(fallbackCatalog?.products) : [],
      offers: fallbackCatalog?.offers && typeof fallbackCatalog?.offers === "object" ? clone(fallbackCatalog?.offers) : {},
      updatedAt: new Date()?.toISOString(),
      locale: sanitizeText(settings?.i18n?.defaultLocale, "pt-BR", 12),
    };
  }
 // COMBOS | combo desconto tipo prepara dados de combos. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function normalizeOfferDiscountType(value) {
    const type = sanitizeText(value, "", 20)?.toLowerCase();
    return type === "fixed" || type === "amount" || type === "valor" ? "fixed" : "percent";
  }
 // COMBOS | combo data prepara dados de combos. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeOfferDate(value) {
    const text = sanitizeText(value, "", 20);
    return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : "";
  }
 // COMBOS | combo itens prepara dados de combos. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeOfferItems(items) {
    return (Array.isArray(items) ? items : [])
      .map((item) => ({
        productId: sanitizeText(item?.productId || item?.product_id || item?.id, "", 80),
        quantity: Math.max(1, Math.floor(Number(item?.quantity || item?.qty || 1))),
      }))
      .filter((item) => item.productId);
  }
 // COMBOS | combos prepara dados de combos. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeOffers(rawOffers) {
    const source = rawOffers && typeof rawOffers === "object" ? rawOffers : {};
    const rawCombos = Array.isArray(source?.combos)
      ? source.combos
      : Array.isArray(source)
        ? source.filter((offer) => offer?.type === "combo")
        : [];
    const rawDiscounts = Array.isArray(source?.discounts)
      ? source.discounts
      : Array.isArray(source)
        ? source.filter((offer) => offer?.type === "discount")
        : [];
    const usedComboIds = new Set();
    const usedDiscountIds = new Set();

    const combos = rawCombos.map((combo, index) => {
      const name = ensureTranslations(combo?.name || combo?.name_translations, `Combo ${index + 1}`);
      const idBase = slugify(combo?.id || name["pt-BR"], `combo-${index + 1}`);
      const id = uniqueId(idBase, usedComboIds);
      const images = ensureImageArray([
        combo?.primaryImage,
        combo?.imageUrl,
        combo?.image,
        ...(Array.isArray(combo?.images) ? combo.images : []),
      ]);
      const primaryImage = sanitizeImageSource(combo?.primaryImage || combo?.imageUrl || combo?.image || images[0] || "") || images[0] || "";

      return {
        id,
        type: "combo",
        name,
        description: ensureTranslations(combo?.description || combo?.description_translations, ""),
        imageUrl: primaryImage,
        images,
        primaryImage,
        items: sanitizeOfferItems(combo?.items || combo?.products),
        price: Number.isFinite(Number(combo?.price)) ? Math.max(0, Number(combo.price)) : 0,
        active: combo?.active !== false,
        createdAt: sanitizeText(combo?.createdAt, "", 40),
        updatedAt: sanitizeText(combo?.updatedAt, "", 40) || new Date()?.toISOString(),
        sortOrder: Number.isFinite(Number(combo?.sortOrder ?? combo?.sort_order))
          ? Number(combo?.sortOrder ?? combo?.sort_order)
          : index,
      };
    }).sort(compareProductOrder);

    const discounts = rawDiscounts.map((discount, index) => {
      const name = ensureTranslations(discount?.name || discount?.name_translations, `Desconto ${index + 1}`);
      const idBase = slugify(discount?.id || name["pt-BR"], `desconto-${index + 1}`);
      const id = uniqueId(idBase, usedDiscountIds);

      return {
        id,
        type: "discount",
        name,
        discountType: normalizeOfferDiscountType(discount?.discountType || discount?.discount_type),
        value: Number.isFinite(Number(discount?.value)) ? Math.max(0, Number(discount.value)) : 0,
        minimumSubtotal: Number.isFinite(Number(discount?.minimumSubtotal ?? discount?.minimum_subtotal))
          ? Math.max(0, Number(discount?.minimumSubtotal ?? discount?.minimum_subtotal))
          : 0,
        startsAt: sanitizeOfferDate(discount?.startsAt || discount?.starts_at),
        endsAt: sanitizeOfferDate(discount?.endsAt || discount?.ends_at),
        active: discount?.active !== false,
        createdAt: sanitizeText(discount?.createdAt, "", 40),
        updatedAt: sanitizeText(discount?.updatedAt, "", 40) || new Date()?.toISOString(),
        sortOrder: Number.isFinite(Number(discount?.sortOrder ?? discount?.sort_order))
          ? Number(discount?.sortOrder ?? discount?.sort_order)
          : index,
      };
    }).sort(compareProductOrder);

    return {
      combos,
      discounts,
    };
  }
 // ESTADO | cardapio regra prepara dados de estado salvo. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeMenuState(rawMenuState) {
    const issues = [];
    const input = rawMenuState && typeof rawMenuState === "object" ? rawMenuState : {};
    const usedCategoryIds = new Set();
    const usedAddOnIds = new Set();
    const usedProductIds = new Set();

    const categories = (Array.isArray(input?.categories) ? input?.categories : []).map((category, index) => {
      const sourceName = ensureTranslations(category?.name || category?.name_translations, `Categoria ${index + 1}`);
      const slugBase = slugify(category?.slug || category?.id || sourceName["pt-BR"], `categoria-${index + 1}`);
      const slug = uniqueId(slugBase, usedCategoryIds);

      if (slug !== slugBase) {
        issues.push(`Categoria duplicada corrigida: ${slugBase}`);
      }

      return {
        slug,
        name: sourceName,
        description: ensureTranslations(category?.description || category?.description_translations, ""),
        sortOrder: Number.isFinite(Number(category?.sortOrder ?? category?.sort_order))
          ? Number(category?.sortOrder ?? category?.sort_order)
          : index,
      };
    });

    categories.sort(compareCategoryOrder);
    const validCategoryIds = new Set(categories.map((category) => category?.slug));

    const addOns = (Array.isArray(input?.addOns) ? input?.addOns : []).map((addOn, index) => {
      const sourceName = ensureTranslations(addOn?.name, `Adicional ${index + 1}`);
      const idBase = slugify(addOn?.id || sourceName["pt-BR"], `adicional-${index + 1}`);
      const id = uniqueId(idBase, usedAddOnIds);

      if (id !== idBase) {
        issues.push(`Adicional duplicado corrigido: ${idBase}`);
      }

      return {
        id,
        name: sourceName,
        price: Number.isFinite(Number(addOn?.price)) ? Number(addOn?.price) : 0,
        sortOrder: Number.isFinite(Number(addOn?.sortOrder)) ? Number(addOn?.sortOrder) : index,
      };
    });

    addOns.sort(compareAddOnOrder);
    const validAddOnIds = new Set(addOns.map((addOn) => addOn?.id));

    const products = (Array.isArray(input?.products) ? input?.products : []).map((product, index) => {
      const baseName = ensureTranslations(product?.name || product?.name_translations, `Produto ${index + 1}`);
      const idBase = slugify(product?.id || baseName["pt-BR"], `produto-${index + 1}`);
      const id = uniqueId(idBase, usedProductIds);
      const sourceCategory = sanitizeText(
        product?.category || product?.category_slug || product?.categoryId || product?.category_id,
        "",
        80
      );
      const category = validCategoryIds.has(sourceCategory) ? sourceCategory : categories[0]?.slug || "";
      const tags = ensureStringArray(product?.tags);
      const images = ensureImageList(product);
      const primaryImage = sanitizeImageSource(
        product?.primaryImage || product?.imageUrl || product?.image || images[0] || ""
      ) || images[0] || "";
      const active = resolveProductActiveFlag(product);
      const available = resolveProductAvailabilityFlag(product);
      const status = resolveProductStatus(product);

      if (!validCategoryIds.has(sourceCategory || "")) {
        issues.push(`Categoria ausente em produto corrigida: ${id}`);
      }

      if (id !== idBase) {
        issues.push(`Produto duplicado corrigido: ${idBase}`);
      }

      return {
        id,
        category,
        name: baseName,
        description: ensureTranslations(product?.description || product?.description_translations, ""),
        longDescription: ensureTranslations(product?.longDescription, ""),
        imageUrl: primaryImage,
        images,
        primaryImage,
        price: Number.isFinite(Number(product?.price)) ? Number(product?.price) : 0,
        available,
        active,
        status,
        featured: Boolean(product?.featured),
        prepTime: Number.isFinite(Number(product?.prepTime)) ? Number(product?.prepTime) : null,
        tags,
        addOns: ensureStringArray(product.addOns).filter((id) => validAddOnIds.has(id)),
        createdAt: sanitizeText(product?.createdAt, "", 40),
        updatedAt: sanitizeText(product?.updatedAt, "", 40) || new Date()?.toISOString(),
        sortOrder: Number.isFinite(Number(product?.sortOrder ?? product?.sort_order))
          ? Number(product?.sortOrder ?? product?.sort_order)
          : index,
      };
    });

    products.sort(compareProductOrder);

    return {
      state: {
        version: 1,
        locale: sanitizeText(input?.locale, "pt-BR", 12),
        categories,
        addOns,
        products,
        offers: sanitizeOffers(input?.offers),
        updatedAt: new Date()?.toISOString(),
      },
      issues,
    };
  }
 // IMAGEM | interno imagem dados link confere uma condicao de imagens. A logica analisa os dados atuais e devolve verdadeiro ou falso para decidir se a acao continua, espera ou para.
  function isInlineImageDataUrl(value) {
    return /^data:image\//i.test(String(value || "").trim());
  }
 // IMAGEM | imagem origem prepara dados de imagens. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeImageSource(value) {
    if (value == null) {
      return "";
    }

    let normalized = String(value).trim();
    if (!normalized) {
      return "";
    }

    normalized = normalized.replace(/^["']+|["']+$/g, "");

    if (isInlineImageDataUrl(normalized)) {
      return normalized.length <= IMAGE_SOURCE_MAX_LENGTH ? normalized : "";
    }

    if (/^(https?:\/\/|blob:)/i.test(normalized)) {
      return normalized;
    }

    normalized = normalized.replace(/^\?+(?=(?:\.{1,2}\/|\/|assets\/))/i, "");
    normalized = normalized.replace(/\?+(?=\.[a-z0-9]{2,5}(?:$|[?#]))/ig, "");

    if (!normalized) {
      return "";
    }

    if (/^(\/|\.{1,2}\/|assets\/)/i.test(normalized)) {
      return normalized;
    }

    if (/^[a-z0-9_\-./]+\.(?:png|jpe?g|webp|gif|svg|avif)(?:[?#].*)?$/i.test(normalized)) {
      return normalized;
    }

    return "";
  }
  function normalizeBrandLogoUrl(value) {
    const sanitized = sanitizeImageSource(value);
    if (/^\.\/assets\/[^/]+\.png(?:[?#].*)?$/i.test(sanitized)
      && sanitized !== CURRENT_LOGO_URL
      && !/\/(?:favicon|apple-touch-icon)\.png(?:[?#].*)?$/i.test(sanitized)) {
      return CURRENT_LOGO_URL;
    }
    return sanitized;
  }
 // PRODUTOS | produto ativo marcador separa uma regra de produtos. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function resolveProductActiveFlag(product) {
    if (!product || typeof product !== "object") {
      return false;
    }

    if (typeof product?.active === "boolean") {
      return product.active;
    }

    return product?.status !== "inactive";
  }
 // PRODUTOS | produto disponibilidade marcador separa uma regra de produtos. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function resolveProductAvailabilityFlag(product) {
    return product?.available !== false;
  }
 // PRODUTOS | produto status separa uma regra de produtos. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function resolveProductStatus(product) {
    return resolveProductActiveFlag(product) ? "active" : "inactive";
  }
 // IMAGEM | lista de imagens garante que imagem unica e galeria sigam o mesmo formato. A logica transforma valor solto em lista, remove repetidos e ignora entradas vazias.
  function ensureImageArray(value) {
    const items = Array.isArray(value) ? value : [value];
    return Array?.from(
      new Set(
        items
          .map((item) => sanitizeImageSource(item))
          .filter(Boolean)
      )
    );
  }
 // ESTADO | marca ajuste prepara dados de estado salvo. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeBrandConfig(rawBrandConfig) {
    const input = rawBrandConfig && typeof rawBrandConfig === "object" ? rawBrandConfig : {};
    const next = clone(DEFAULT_BRAND);
    const source = { ...next, ...clone(input) };

    next.i18n.defaultLocale = sanitizeText(source?.i18n?.defaultLocale, "pt-BR", 12);
    next.i18n.supportedLocales = source?.i18n?.supportedLocales || clone(DEFAULT_BRAND?.i18n?.supportedLocales);
    next.brand = {
      name: ensureTranslations(source?.brand?.name, DEFAULT_BRAND?.brand?.name["pt-BR"]),
      subtitle: ensureTranslations(source?.brand?.subtitle, DEFAULT_BRAND?.brand?.subtitle["pt-BR"]),
      logoUrl: normalizeBrandLogoUrl(source?.brand?.logoUrl),
      footerNote: ensureTranslations(source?.brand?.footerNote, ""),
    };
    const destaqueInicialSource = input?.destaqueInicial || input?.hero || source?.destaqueInicial || {};
    next.destaqueInicial = {
      kicker: ensureTranslations(destaqueInicialSource?.kicker, DEFAULT_BRAND?.destaqueInicial?.kicker["pt-BR"]),
      title: ensureTranslations(destaqueInicialSource?.title, DEFAULT_BRAND?.destaqueInicial?.title["pt-BR"]),
      subtitle: ensureTranslations(destaqueInicialSource?.subtitle, DEFAULT_BRAND?.destaqueInicial?.subtitle["pt-BR"]),
      imageUrl: sanitizeImageSource(destaqueInicialSource?.imageUrl || DEFAULT_BRAND?.destaqueInicial?.imageUrl),
      chips: ensureLocaleArrayTranslations(destaqueInicialSource?.chips, DEFAULT_BRAND?.destaqueInicial?.chips),
      waitingTimeLabel: ensureTranslations(
        destaqueInicialSource?.waitingTimeLabel,
        DEFAULT_BRAND?.destaqueInicial?.waitingTimeLabel["pt-BR"]
      ),
      paymentLabel: ensureTranslations(
        destaqueInicialSource?.paymentLabel,
        DEFAULT_BRAND?.destaqueInicial?.paymentLabel["pt-BR"]
      ),
    };
    const businessLocation = sanitizeBusinessLocation(source?.business?.location, source?.business);
    next.business = {
      pickupAddress: businessLocation?.address || sanitizeText(
        source?.business?.pickupAddress,
        DEFAULT_BRAND?.business.pickupAddress,
        180
      ),
      location: businessLocation,
      whatsappNumber: sanitizeText(
        String(source?.business?.whatsappNumber || "")?.replace(/\D/g, ""),
        DEFAULT_BRAND?.business.whatsappNumber,
        20
      ),
      waitingTime: ensureTranslations(
        source?.business?.waitingTime,
        DEFAULT_BRAND?.business.waitingTime["pt-BR"]
      ),
      allowOrdersOutsideHours: Boolean(source?.business?.allowOrdersOutsideHours),
      locale: sanitizeText(source?.business?.locale, "pt-BR", 12),
      currency: sanitizeText(source?.business?.currency, "BRL", 6),
    };
    next.pix = {
      key: sanitizeText(source?.pix?.key, DEFAULT_BRAND?.pix?.key, 120),
      owner: ensureTranslations(source?.pix?.owner, DEFAULT_BRAND?.pix?.owner["pt-BR"]),
      bank: ensureTranslations(source?.pix?.bank, DEFAULT_BRAND?.pix?.bank["pt-BR"]),
    };
    const deliveryLocations = normalizeDeliveryLocations(source?.delivery);
    next.delivery = {
      cityLabel: ensureTranslations(source?.delivery?.cityLabel, DEFAULT_BRAND?.delivery?.cityLabel["pt-BR"]),
      baseFee: Number.isFinite(Number(source?.delivery?.baseFee))
        ? Number(source?.delivery?.baseFee)
        : DEFAULT_BRAND?.delivery?.baseFee,
      locations: deliveryLocations,
      neighborhoods: deliveryLocationsToLegacyNeighborhoods(deliveryLocations),
    };
    next.schedule = Array.isArray(source?.schedule)
      ? source.schedule.map((entry, index) => ({
        day: Number.isFinite(Number(entry?.day)) ? Number(entry?.day) : index,
        enabled: Boolean(entry?.enabled),
        open: sanitizeText(entry?.open, "", 10),
        close: sanitizeText(entry?.close, "", 10),
      }))
      : clone(DEFAULT_BRAND?.schedule);
    const defaultAppearance = DEFAULT_BRAND?.appearance || {};
    const explicitPreset = window?.TemplateShared?.normalizeThemePreset?.(source?.appearance?.preset) || "";
    const resolvedAppearance = explicitPreset
      ? window?.TemplateShared?.getThemePresetConfig?.(explicitPreset)
      : null;
    next.appearance = {
      preset: explicitPreset,
      theme: explicitPreset
        ? resolvedAppearance?.theme || defaultAppearance?.theme || "dark"
        : sanitizeText(source?.appearance?.theme, defaultAppearance?.theme || "dark", 12) === "light"
          ? "light"
          : "dark",
      palette: explicitPreset
        ? resolvedAppearance?.palette || defaultAppearance?.palette || "gold"
        : sanitizeText(source?.appearance?.palette, defaultAppearance?.palette || "gold", 20),
      productLayoutMode: sanitizeText(source?.appearance?.productLayoutMode, "expanded", 20),
      catalogMode: sanitizeText(source?.appearance?.catalogMode, "default", 20),
    };
    next.legal = sanitizeLegalConfig(source?.legal);

    return next;
  }
 // NUVEM | nuvem ajuste prepara dados de nuvem Supabase. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeCloudConfig(rawCloudConfig) {
    const input = rawCloudConfig && typeof rawCloudConfig === "object" ? rawCloudConfig : {};
    const source = { ...clone(SUPABASE_DEFAULTS), ...clone(input) };

    return {
      enabled: Boolean(source?.enabled),
      provider: sanitizeText(source?.provider, "supabase", 40),
      realtime: Boolean(source?.realtime),
      url: sanitizeText(source?.url, "", 500),
      anonKey: sanitizeText(source?.anonKey, "", 500),
      schema: sanitizeText(source?.schema, SUPABASE_DEFAULTS?.schema, 40),
      tables: {
        categories: sanitizeText(
          source?.tables?.categories,
          SUPABASE_DEFAULTS?.tables.categories,
          80
        ),
        addOns: sanitizeText(source?.tables?.addOns, SUPABASE_DEFAULTS?.tables.addOns, 80),
        products: sanitizeText(source?.tables?.products, SUPABASE_DEFAULTS?.tables.products, 80),
        productAddOns: sanitizeText(
          source?.tables?.productAddOns,
          SUPABASE_DEFAULTS?.tables.productAddOns,
          80
        ),
        settings: sanitizeText(
          source?.tables?.settings,
          SUPABASE_DEFAULTS?.tables.settings,
          80
        ),
        metricEvents: sanitizeText(
          source?.tables?.metricEvents,
          SUPABASE_DEFAULTS?.tables.metricEvents,
          80
        ),
      },
      storage: {
        bucket: sanitizeText(source?.storage?.bucket, SUPABASE_DEFAULTS?.storage?.bucket, 120),
      },
      autoReconnect: source?.autoReconnect !== false,
      reconnectIntervalMs: Number.isFinite(Number(source?.reconnectIntervalMs))
        ? Number(source?.reconnectIntervalMs)
        : SUPABASE_DEFAULTS?.reconnectIntervalMs,
      status: sanitizeText(source?.status, "unknown", 20),
      lastCheckAt: sanitizeText(source?.lastCheckAt, "", 60),
      lastError: sanitizeText(source?.lastError, "", 300),
    };
  }
 // IDIOMA | traducao rotulo separa uma regra de idioma. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function translationSortLabel(value, fallback) {
    if (value && typeof value === "object") {
      return sanitizeText(value?.["pt-BR"] || value?.["en-US"], fallback || "", 120);
    }
    return sanitizeText(value, fallback || "", 120);
  }
 // PEDIDO | pedido ordena dados de pedido. A logica compara ordem manual, nome e fallback para a lista aparecer sempre previsivel.
  function compareSortOrder(leftOrder, rightOrder, leftLabel, rightLabel) {
    const leftSort = Number.isFinite(Number(leftOrder)) ? Number(leftOrder) : Number.MAX_SAFE_INTEGER;
    const rightSort = Number.isFinite(Number(rightOrder)) ? Number(rightOrder) : Number.MAX_SAFE_INTEGER;

    if (leftSort !== rightSort) {
      return leftSort - rightSort;
    }

    return String(leftLabel || "").localeCompare(String(rightLabel || ""), "pt-BR");
  }
 // CATEGORIAS | categoria pedido ordena dados de categorias. A logica compara ordem manual, nome e fallback para a lista aparecer sempre previsivel.
  function compareCategoryOrder(left, right) {
    return compareSortOrder(
      left?.sortOrder,
      right?.sortOrder,
      translationSortLabel(left?.name, left?.slug),
      translationSortLabel(right?.name, right?.slug)
    );
  }
 // ADICIONAIS | pedido ordena dados de adicionais. A logica compara ordem manual, nome e fallback para a lista aparecer sempre previsivel.
  function compareAddOnOrder(left, right) {
    return compareSortOrder(
      left?.sortOrder,
      right?.sortOrder,
      translationSortLabel(left?.name, left?.id),
      translationSortLabel(right?.name, right?.id)
    );
  }
 // PRODUTOS | produto pedido ordena dados de produtos. A logica compara ordem manual, nome e fallback para a lista aparecer sempre previsivel.
  function compareProductOrder(left, right) {
    return compareSortOrder(
      left?.sortOrder,
      right?.sortOrder,
      translationSortLabel(left?.name, left?.id),
      translationSortLabel(right?.name, right?.id)
    );
  }
 // ESTADO | padrao oficial regra monta uma estrutura de estado salvo. A logica junta partes soltas em um formato unico para renderizar, salvar ou enviar.
  function buildCanonicalStates() {
    const legacyCatalog = readStorage(STORAGE_KEYS?.legacyCatalog, {});
    const legacySettings = readStorage(STORAGE_KEYS?.legacySettings, {});
    const rawStoredCloudConfig = readStorage(STORAGE_KEYS?.cloudConfig, {});
    const publicCloudConfig = normalizePublicCloudConfig(window?.PUBLIC_CLOUD_CONFIG);
    const rawMenuState = readStorage(
      STORAGE_KEYS?.menuState,
      buildMenuFromLegacyCatalog(legacyCatalog, legacySettings)
    );
    const rawBrandConfig = readStorage(STORAGE_KEYS?.brandConfig, legacySettings);
    const { state: menuState, issues } = sanitizeMenuState(rawMenuState);

    return {
      menuState,
      brandConfig: sanitizeBrandConfig(rawBrandConfig),
      cloudConfig: resolveCloudConfig({
        rawPublicCloudConfig: window?.PUBLIC_CLOUD_CONFIG,
        publicCloudConfig,
        rawStoredCloudConfig,
        storedCloudConfig: rawStoredCloudConfig,
        legacySupabaseConfig: legacySettings?.supabase,
        statusSource: rawStoredCloudConfig,
      }),
      issues,
    };
  }
 // ESTADO | antigo catalogo regra separa uma regra de estado salvo. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function legacyCatalogFromState(menuState) {
    return {
      categories: menuState.categories.map((category) => ({
        slug: category?.slug,
        name: category?.name,
        description: category?.description,
        sortOrder: category?.sortOrder,
      })),
      addOns: menuState.addOns.map((addOn) => ({
        id: addOn?.id,
        name: addOn?.name,
        price: addOn?.price,
        sortOrder: addOn?.sortOrder,
      })),
      products: menuState.products.map((product) => ({
        id: product?.id,
        category: product?.category,
        name: product?.name,
        description: product?.description,
        longDescription: product?.longDescription,
        imageUrl: product?.primaryImage || product?.imageUrl,
        images: clone(product?.images),
        primaryImage: product?.primaryImage || product?.imageUrl,
        price: product?.price,
        available: resolveProductAvailabilityFlag(product),
        active: resolveProductActiveFlag(product),
        status: resolveProductStatus(product),
        featured: product?.featured,
        prepTime: product?.prepTime,
        tags: clone(product?.tags),
        addOns: clone(product?.addOns),
        sortOrder: product?.sortOrder,
        createdAt: product?.createdAt,
        updatedAt: product?.updatedAt,
      })),
      offers: clone(menuState?.offers || { combos: [], discounts: [] }),
    };
  }
 // NUVEM | antigo ajustes regra separa uma regra de nuvem Supabase. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function legacySettingsFromState(brandConfig, cloudConfig) {
    return {
      i18n: clone(brandConfig?.i18n),
      brand: clone(brandConfig?.brand),
      destaqueInicial: clone(brandConfig?.destaqueInicial),
      business: clone(brandConfig?.business),
      pix: clone(brandConfig?.pix),
      delivery: clone(brandConfig?.delivery),
      schedule: clone(brandConfig?.schedule),
      appearance: clone(brandConfig?.appearance),
      legal: clone(brandConfig?.legal),
      supabase: {
        enabled: cloudConfig?.enabled,
        provider: cloudConfig?.provider,
        realtime: cloudConfig?.realtime,
        url: cloudConfig?.url,
        anonKey: cloudConfig?.anonKey,
        schema: cloudConfig?.schema,
        tables: clone(cloudConfig?.tables),
        storage: clone(cloudConfig?.storage),
      },
    };
  }
 // EVENTOS | disparo regra regra altera eventos da tela depois de uma acao. A logica atualiza o dado principal e sincroniza a tela para o usuario ver resposta imediata.
  function emitStateChange(detail) {
    window?.dispatchEvent(
      new CustomEvent("template:state-change", {
        detail,
      })
    );
  }
 // ESTADO | padrao oficial regra separa uma regra de estado salvo. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function writeCanonicalStates(nextStates, meta) {
    writeStorage(STORAGE_KEYS?.menuState, nextStates?.menuState);
    writeStorage(STORAGE_KEYS?.brandConfig, nextStates?.brandConfig);
    writeStorage(STORAGE_KEYS?.cloudConfig, nextStates?.cloudConfig);
    writeStorage(STORAGE_KEYS?.legacyCatalog, legacyCatalogFromState(nextStates?.menuState));
    writeStorage(
      STORAGE_KEYS?.legacySettings,
      legacySettingsFromState(nextStates?.brandConfig, nextStates?.cloudConfig)
    );
    emitStateChange(meta || { type: "sync" });
  }
 // NUVEM | metrica bucket busca um valor de nuvem Supabase. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function metricBucket(value) {
    return value && typeof value === "object" && !Array.isArray(value) ? { ...value } : {};
  }
 // RELATORIOS | metrica contador busca um valor de relatorios. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function metricCount(value) {
    const count = Number(value || 0);
    return Number.isFinite(count) && count > 0 ? count : 0;
  }
 // RELATORIOS | metricas prepara dados de relatorios. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function normalizeMetrics(metrics) {
    const source = metrics && typeof metrics === "object" ? metrics : {};
    return {
      views: metricBucket(source?.views),
      adds: metricBucket(source?.adds),
      lastViewedAt: metricBucket(source?.lastViewedAt),
      lastAddedAt: metricBucket(source?.lastAddedAt),
      checkoutOpened: metricCount(source?.checkoutOpened),
      orderPrepared: metricCount(source?.orderPrepared),
      payments: metricBucket(source?.payments),
      serviceChoices: metricBucket(source?.serviceChoices),
      searchNoResults: metricBucket(source?.searchNoResults),
      lastCheckoutOpenedAt: sanitizeText(source?.lastCheckoutOpenedAt, "", 40),
      lastOrderPreparedAt: sanitizeText(source?.lastOrderPreparedAt, "", 40),
      lastPaymentAt: metricBucket(source?.lastPaymentAt),
      lastServiceChoiceAt: metricBucket(source?.lastServiceChoiceAt),
      lastSearchNoResultAt: metricBucket(source?.lastSearchNoResultAt),
    };
  }
 // RELATORIOS | metricas busca um valor de relatorios. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function getMetrics() {
    return normalizeMetrics(readStorage(STORAGE_KEYS?.metrics, DEFAULT_METRICS));
  }
 // RELATORIOS | metricas atualiza relatorios. A logica muda estado, classes ou dados salvos em um ponto so para a tela responder sem espalhar alteracoes.
  function saveMetrics(metrics, meta) {
    writeStorage(STORAGE_KEYS?.metrics, metrics);
    emitStateChange(meta || { type: "metrics" });
  }

  const ONLINE_METRIC_EVENTS = new Set([
    "product_view",
    "add_to_cart",
    "checkout_opened",
    "order_prepared",
    "payment_selected",
    "service_selected",
    "search_no_result",
  ]);
 // NUVEM | metrica evento tabela nome busca um valor de nuvem Supabase. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function metricEventTableName(cloudConfig) {
    return sanitizeText(
      cloudConfig?.tables?.metricEvents,
      SUPABASE_DEFAULTS?.tables?.metricEvents,
      80
    );
  }
 // ACESSO | metrica sessao identificador busca um valor de acesso do Admin. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function getMetricSessionId() {
    const current = sanitizeText(readStorage(STORAGE_KEYS?.metricSession, ""), "", 80);
    if (current) {
      return current;
    }

    const generated = sanitizeText(
      window?.crypto?.randomUUID?.() || `metric-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      "",
      80
    );
    writeStorage(STORAGE_KEYS?.metricSession, generated);
    return generated;
  }
 // RELATORIOS | metrica evento tipo prepara dados de relatorios. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeMetricEventType(value) {
    const eventType = sanitizeText(value, "", 40);
    return ONLINE_METRIC_EVENTS.has(eventType) ? eventType : "";
  }
 // RELATORIOS | metrica produto identificador prepara dados de relatorios. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeMetricProductId(value) {
    return sanitizeText(value, "", 80);
  }
 // RELATORIOS | metrica regra prepara dados de relatorios. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeMetricValue(value, maxLength) {
    return sanitizeText(value, "", maxLength || 120);
  }
 // RELATORIOS | metrica busca termo prepara dados de relatorios. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeMetricSearchTerm(value) {
    const term = sanitizeMetricValue(value, 80)?.trim()?.toLowerCase();
    if (!term || term.length < 3) {
      return "";
    }

    if (/@/.test(term) || /\d{8,}/.test(term)) {
      return "";
    }

    return term;
  }
 // RELATORIOS | metrica evento pacote de dados monta uma estrutura de relatorios. A logica junta partes soltas em um formato unico para renderizar, salvar ou enviar.
  function buildMetricEventPayload(eventType, details) {
    const type = sanitizeMetricEventType(eventType);
    if (!type) {
      return null;
    }

    const productId = sanitizeMetricProductId(details?.productId);
    const value = sanitizeMetricValue(details?.value, 120);

    return {
      event_type: type,
      product_id: productId || null,
      value: value || null,
      session_id: getMetricSessionId(),
      source: "public_menu",
      metadata: {},
    };
  }
 // NUVEM | metrica evento online registra uso em nuvem Supabase. A logica soma o evento localmente e, se a nuvem estiver ativa, tenta enviar online sem travar a tela.
  function recordMetricEventOnline(eventType, details) {
    const cloudConfig = getStates()?.cloudConfig;
    if (!isSupabaseConfigured(cloudConfig)) {
      return Promise.resolve({ ok: false, skipped: true });
    }

    const tableName = metricEventTableName(cloudConfig);
    const payload = buildMetricEventPayload(eventType, details || {});
    if (!tableName || !payload) {
      return Promise.resolve({ ok: false, skipped: true });
    }

    return fetch(buildCloudRestUrl(cloudConfig, tableName), {
      method: "POST",
      headers: supabaseHeaders(cloudConfig, { Prefer: "return=minimal" }),
      body: JSON?.stringify(payload),
    })
      .then(function (response) {
        if (!response?.ok) {
          return response?.text?.()
            ?.catch(() => "")
            ?.then(function (detailsText) {
              warnCloudSync("Metrica online ignorada; fallback local preservado.", {
                eventType: payload?.event_type,
                status: response?.status,
                details: detailsText,
              });
              return { ok: false, status: response?.status };
            });
        }
        return { ok: true };
      })
      .catch(function (error) {
        warnCloudSync("Metrica online ignorada; fallback local preservado.", {
          eventType: payload?.event_type,
          message: error?.message || String(error),
        });
        return { ok: false };
      });
  }
 // NUVEM | metrica evento online silencioso registra uso em nuvem Supabase. A logica soma o evento localmente e, se a nuvem estiver ativa, tenta enviar online sem travar a tela.
  function recordMetricEventOnlineSilently(eventType, details) {
    recordMetricEventOnline(eventType, details || {});
  }
 // FAVORITOS | favoritos busca um valor de favoritos. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function getFavorites() {
    return ensureStringArray(readStorage(STORAGE_KEYS?.favorites, []));
  }
 // FAVORITOS | favoritos atualiza favoritos. A logica muda estado, classes ou dados salvos em um ponto so para a tela responder sem espalhar alteracoes.
  function saveFavorites(favorites) {
    writeStorage(STORAGE_KEYS?.favorites, ensureStringArray(favorites));
    emitStateChange({ type: "favorites" });
  }
 // ESTADO | usuario interface regra busca um valor de estado salvo. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function getClientUiState() {
    const ui = readStorage(STORAGE_KEYS?.clientUi, DEFAULT_CLIENT_UI);
    return {
      visualMode: sanitizeText(ui?.visualMode, DEFAULT_CLIENT_UI?.visualMode, 20),
      catalogMode: sanitizeText(ui?.catalogMode, DEFAULT_CLIENT_UI?.catalogMode, 20),
      highlightMode: Boolean(ui?.highlightMode),
    };
  }
 // ESTADO | usuario interface regra atualiza estado salvo. A logica muda estado, classes ou dados salvos em um ponto so para a tela responder sem espalhar alteracoes.
  function saveClientUiState(nextUi) {
    const current = getClientUiState();
    const ui = {
      visualMode: sanitizeText(nextUi?.visualMode, current?.visualMode, 20),
      catalogMode: sanitizeText(nextUi?.catalogMode, current?.catalogMode, 20),
      highlightMode: nextUi?.highlightMode == null ? current?.highlightMode : Boolean(nextUi?.highlightMode),
    };
    writeStorage(STORAGE_KEYS?.clientUi, ui);
    emitStateChange({ type: "client-ui" });
    return ui;
  }
 // ESTADO | regra conversa com estado salvo. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  function loadStates() {
    const states = buildCanonicalStates();
    return clone(states);
  }

  let currentStates = loadStates();
 // ESTADO | regra busca um valor de estado salvo. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function getStates() {
    return clone(currentStates);
  }
 // ESTADO | regra altera estado salvo depois de uma acao. A logica atualiza o dado principal e sincroniza a tela para o usuario ver resposta imediata.
  function updateStates(updater, meta) {
    const draft = getStates();
    const next = typeof updater === "function" ? updater(draft) || draft : draft;
    const sanitized = {
      menuState: sanitizeMenuState(next?.menuState)?.state,
      brandConfig: sanitizeBrandConfig(next?.brandConfig),
      cloudConfig: resolveCloudConfig({
        rawPublicCloudConfig: window?.PUBLIC_CLOUD_CONFIG,
        publicCloudConfig: normalizePublicCloudConfig(window?.PUBLIC_CLOUD_CONFIG),
        rawStoredCloudConfig: next?.cloudConfig,
        storedCloudConfig: next?.cloudConfig,
        statusSource: next?.cloudConfig,
      }),
      issues: [],
    };
    currentStates = sanitized;
    writeCanonicalStates(sanitized, meta);
    return getStates();
  }
 // ESTADO | cardapio regra atualiza estado salvo. A logica muda estado, classes ou dados salvos em um ponto so para a tela responder sem espalhar alteracoes.
  function setMenuState(menuState, meta) {
    return updateStates(
      (draft) => {
        draft.menuState = clone(menuState);
        return draft;
      },
      meta || { type: "menu" }
    );
  }
 // ESTADO | marca ajuste atualiza estado salvo. A logica muda estado, classes ou dados salvos em um ponto so para a tela responder sem espalhar alteracoes.
  function setBrandConfig(brandConfig, meta) {
    return updateStates(
      (draft) => {
        draft.brandConfig = clone(brandConfig);
        return draft;
      },
      meta || { type: "brand" }
    );
  }
 // NUVEM | nuvem ajuste atualiza nuvem Supabase. A logica muda estado, classes ou dados salvos em um ponto so para a tela responder sem espalhar alteracoes.
  function setCloudConfig(cloudConfig, meta) {
    return updateStates(
      (draft) => {
        draft.cloudConfig = clone(cloudConfig);
        return draft;
      },
      meta || { type: "cloud" }
    );
  }
 // ESTADO | sistema dados prepara dados de estado salvo. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function sanitizeSystemData() {
    const next = buildCanonicalStates();
    currentStates = next;
    writeCanonicalStates(next, { type: "sanitize", issues: next?.issues });
    return getStates();
  }
 // ESTADO | sistema limpa estado salvo. A logica remove filtros, timers, avisos ou rascunhos antigos para a proxima acao comecar sem sobra.
  function resetSystem() {
    removeStorage(STORAGE_KEYS?.menuState);
    removeStorage(STORAGE_KEYS?.brandConfig);
    removeStorage(STORAGE_KEYS?.cloudConfig);
    removeStorage(STORAGE_KEYS?.metrics);
    removeStorage(STORAGE_KEYS?.metricSession);
    removeStorage(STORAGE_KEYS?.favorites);
    removeStorage(STORAGE_KEYS?.clientUi);
    removeStorage(STORAGE_KEYS?.legacyCatalog);
    removeStorage(STORAGE_KEYS?.legacySettings);
    currentStates = buildCanonicalStates();
    writeCanonicalStates(currentStates, { type: "reset" });
    saveMetrics(clone(DEFAULT_METRICS), { type: "reset-metrics" });
    saveFavorites([]);
    saveClientUiState(clone(DEFAULT_CLIENT_UI));
    return getStates();
  }
 // ESTADO | copia de seguranca separa uma regra de estado salvo. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function exportBackup() {
    return {
      version: 2,
      exportedAt: new Date()?.toISOString(),
      menuState: getStates()?.menuState,
      brandConfig: getStates()?.brandConfig,
      cloudConfig: getStates()?.cloudConfig,
      metrics: getMetrics(),
      favorites: getFavorites(),
      clientUi: getClientUiState(),
    };
  }
 // ESTADO | restauracao da copia aplica dados importados ao sistema. A logica valida o arquivo, normaliza cardapio, marca, nuvem e metricas, depois salva tudo no estado oficial.
  function restoreBackup(backup) {
    if (!backup || typeof backup !== "object") {
      throw new Error("Backup inválido.");
    }

    currentStates = {
      menuState: sanitizeMenuState(backup?.menuState)?.state,
      brandConfig: sanitizeBrandConfig(backup?.brandConfig),
      cloudConfig: resolveCloudConfig({
        rawPublicCloudConfig: window?.PUBLIC_CLOUD_CONFIG,
        publicCloudConfig: normalizePublicCloudConfig(window?.PUBLIC_CLOUD_CONFIG),
        rawStoredCloudConfig: backup?.cloudConfig,
        storedCloudConfig: backup?.cloudConfig,
        statusSource: backup?.cloudConfig,
      }),
      issues: [],
    };

    writeCanonicalStates(currentStates, { type: "restore" });
    saveMetrics(backup?.metrics && typeof backup?.metrics === "object" ? backup?.metrics : clone(DEFAULT_METRICS), {
      type: "restore-metrics",
    });
    saveFavorites(Array.isArray(backup?.favorites) ? backup?.favorites : []);
    saveClientUiState(backup?.clientUi || clone(DEFAULT_CLIENT_UI));
    return getStates();
  }
 // NUVEM | metrica registra uso em nuvem Supabase. A logica soma o evento localmente e, se a nuvem estiver ativa, tenta enviar online sem travar a tela.
  function trackMetric(bucketKey, productId) {
    if (!productId) {
      return;
    }

    const metrics = getMetrics();
    const bucket = metrics[bucketKey];
    const timeBucket = bucketKey === "views" ? metrics?.lastViewedAt : metrics?.lastAddedAt;

    bucket[productId] = metricCount(bucket[productId]) + 1;
    timeBucket[productId] = new Date()?.toISOString();
    saveMetrics(metrics, {
      type: bucketKey === "views" ? "track-view" : "track-add",
      productId,
    });
    recordMetricEventOnlineSilently(bucketKey === "views" ? "product_view" : "add_to_cart", {
      productId,
    });
  }
 // NUVEM | metrica bucket total busca um valor de nuvem Supabase. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function metricBucketTotal(bucket) {
    return Object?.values(bucket || {})?.reduce(function (total, count) {
      return total + metricCount(count);
    }, 0);
  }
 // NUVEM | metrica escolha altera nuvem Supabase depois de uma acao. A logica atualiza o dado principal e sincroniza a tela para o usuario ver resposta imediata.
  function addMetricChoice(metrics, bucketKey, lastBucketKey, value, now) {
    const key = sanitizeText(value, "", 80);
    if (!key) {
      return;
    }

    metrics[bucketKey] = metricBucket(metrics[bucketKey]);
    metrics[lastBucketKey] = metricBucket(metrics[lastBucketKey]);
    metrics[bucketKey][key] = metricCount(metrics[bucketKey][key]) + 1;
    metrics[lastBucketKey][key] = now;
  }
 // HORARIOS | checkout aberto registra uso em horarios. A logica soma o evento localmente e, se a nuvem estiver ativa, tenta enviar online sem travar a tela.
  function trackCheckoutOpened() {
    const metrics = getMetrics();
    metrics.checkoutOpened = metricCount(metrics?.checkoutOpened) + 1;
    metrics.lastCheckoutOpenedAt = new Date()?.toISOString();
    saveMetrics(metrics, { type: "track-checkout-opened" });
    recordMetricEventOnlineSilently("checkout_opened");
  }
 // PEDIDO | atendimento escolha chave busca um valor de pedido. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function serviceChoiceKey(details) {
    if (details?.service === "dine_in" || details?.service === "pickup" || details?.service === "delivery") {
      return details?.service;
    }
    if (details?.serviceMode === "no_local") {
      return "dine_in";
    }
    if (details?.deliveryType === "retirada") {
      return "pickup";
    }
    if (details?.deliveryType === "entrega") {
      return "delivery";
    }
    return "";
  }
 // PEDIDO | pedido preparado registra uso em pedido. A logica soma o evento localmente e, se a nuvem estiver ativa, tenta enviar online sem travar a tela.
  function trackOrderPrepared(details) {
    const metrics = getMetrics();
    const now = new Date()?.toISOString();
    metrics.orderPrepared = metricCount(metrics?.orderPrepared) + 1;
    metrics.lastOrderPreparedAt = now;
    addMetricChoice(metrics, "payments", "lastPaymentAt", details?.payment, now);
    const serviceChoice = serviceChoiceKey(details);
    addMetricChoice(metrics, "serviceChoices", "lastServiceChoiceAt", serviceChoice, now);
    saveMetrics(metrics, { type: "track-order-prepared" });
    recordMetricEventOnlineSilently("order_prepared");
    if (details?.payment) {
      recordMetricEventOnlineSilently("payment_selected", { value: details?.payment });
    }
    if (serviceChoice) {
      recordMetricEventOnlineSilently("service_selected", { value: serviceChoice });
    }
  }
 // BUSCA | busca sem resultado registra uso em busca e filtros. A logica soma o evento localmente e, se a nuvem estiver ativa, tenta enviar online sem travar a tela.
  function trackSearchNoResult(query) {
    const term = sanitizeMetricSearchTerm(query);
    if (!term || term?.length < 3) {
      return;
    }

    const metrics = getMetrics();
    const now = new Date()?.toISOString();
    addMetricChoice(metrics, "searchNoResults", "lastSearchNoResultAt", term, now);
    saveMetrics(metrics, { type: "track-search-no-result", query: term });
    recordMetricEventOnlineSilently("search_no_result", { value: term });
  }
 // NUVEM | topo metricas busca um valor de nuvem Supabase. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function getTopMetrics(bucketKey, limit) {
    const metrics = getMetrics();
    const source = metrics[bucketKey] || {};
    const menuState = getStates()?.menuState;
    const byId = new Map(menuState?.products?.map((product) => [product?.id, product]));

    return Object?.entries(source)
      .sort((left, right) => metricCount(right[1]) - metricCount(left[1]))
      ?.slice(0, limit || 5)
      .map(([productId, count]) => ({
        productId,
        count: metricCount(count),
        product: byId?.get(productId) || null,
      }));
  }
 // NUVEM | topo escolha metricas busca um valor de nuvem Supabase. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function getTopChoiceMetrics(bucketKey, limit) {
    const metrics = getMetrics();
    const source = metrics[bucketKey] || {};
    return Object?.entries(source)
      .sort((left, right) => metricCount(right[1]) - metricCount(left[1]))
      ?.slice(0, limit || 5)
      .map(([value, count]) => ({
        value,
        count: metricCount(count),
      }));
  }
 // RELATORIOS | relatorio resumo busca um valor de relatorios. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function getReportSummary() {
    const metrics = getMetrics();
    return {
      productsViewed: metricBucketTotal(metrics?.views),
      productsAdded: metricBucketTotal(metrics?.adds),
      checkoutOpened: metricCount(metrics?.checkoutOpened),
      orderPrepared: metricCount(metrics?.orderPrepared),
    };
  }
 // PRODUTOS | produto consulta identificador busca um valor de produtos. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function productLookupById() {
    const products = getStates()?.menuState?.products || [];
    return new Map(products.map((product) => [product?.id, product]));
  }
 // RELATORIOS | topo produto metrica linhas separa uma regra de relatorios. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function topProductMetricRows(source, limit) {
    const byId = productLookupById();
    return Object?.entries(source || {})
      .sort((left, right) => metricCount(right[1]) - metricCount(left[1]))
      ?.slice(0, limit || 5)
      .map(([productId, count]) => ({
        productId,
        count: metricCount(count),
        product: byId?.get(productId) || null,
      }));
  }
 // RELATORIOS | topo escolha metrica linhas separa uma regra de relatorios. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function topChoiceMetricRows(source, limit) {
    return Object?.entries(source || {})
      .sort((left, right) => metricCount(right[1]) - metricCount(left[1]))
      ?.slice(0, limit || 5)
      .map(([value, count]) => ({
        value,
        count: metricCount(count),
      }));
  }
 // NUVEM | online relatorio dados monta uma estrutura de nuvem Supabase. A logica junta partes soltas em um formato unico para renderizar, salvar ou enviar.
  function buildOnlineReportData(rows, limit) {
    const viewed = {};
    const added = {};
    const payments = {};
    const serviceChoices = {};
    const searchNoResults = {};
    let checkoutOpened = 0;
    let orderPrepared = 0;

    (Array.isArray(rows) ? rows : []).forEach(function (row) {
      const eventType = sanitizeMetricEventType(row?.event_type);
      const productId = sanitizeMetricProductId(row?.product_id);
      const value = sanitizeMetricValue(row?.value, 120);

      if (eventType === "product_view" && productId) {
        viewed[productId] = metricCount(viewed[productId]) + 1;
      } else if (eventType === "add_to_cart" && productId) {
        added[productId] = metricCount(added[productId]) + 1;
      } else if (eventType === "checkout_opened") {
        checkoutOpened += 1;
      } else if (eventType === "order_prepared") {
        orderPrepared += 1;
      } else if (eventType === "payment_selected" && value) {
        payments[value] = metricCount(payments[value]) + 1;
      } else if (eventType === "service_selected" && value) {
        serviceChoices[value] = metricCount(serviceChoices[value]) + 1;
      } else if (eventType === "search_no_result" && value) {
        searchNoResults[value] = metricCount(searchNoResults[value]) + 1;
      }
    });

    return {
      source: "online",
      loadedAt: new Date()?.toISOString(),
      rowsRead: Array.isArray(rows) ? rows.length : 0,
      summary: {
        productsViewed: metricBucketTotal(viewed),
        productsAdded: metricBucketTotal(added),
        checkoutOpened,
        orderPrepared,
      },
      topViewed: topProductMetricRows(viewed, limit || 5),
      topAdded: topProductMetricRows(added, limit || 5),
      paymentChoices: topChoiceMetricRows(payments, limit || 5),
      serviceChoices: topChoiceMetricRows(serviceChoices, limit || 5),
      searchesWithNoResult: topChoiceMetricRows(searchNoResults, limit || 5),
    };
  }
 // AVISOS | sistema status busca um valor de avisos da tela. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function getSystemStatus() {
    const states = getStates();
    const issues = buildCanonicalStates()?.issues;
    const corrupted = issues?.length > 0;

    return {
      health: corrupted ? "corrupted" : "healthy",
      issues,
      counts: {
        categories: states?.menuState?.categories?.length,
        products: states?.menuState?.products?.length,
        addOns: states?.menuState?.addOns?.length,
      },
    };
  }
 // PRODUTOS | favorito altera produtos depois de uma acao. A logica atualiza o dado principal e sincroniza a tela para o usuario ver resposta imediata.
  function toggleFavorite(productId) {
    const favorites = new Set(getFavorites());

    if (favorites?.has(productId)) {
      favorites?.delete(productId);
    } else {
      favorites?.add(productId);
    }

    saveFavorites(Array?.from(favorites));
    return getFavorites();
  }
 // NUVEM | Supabase ajustado confere uma condicao de nuvem Supabase. A logica analisa os dados atuais e devolve verdadeiro ou falso para decidir se a acao continua, espera ou para.
  function isSupabaseConfigured(cloudConfig) {
    return hasConfiguredCloudCredentials(cloudConfig);
  }
 // NUVEM | Supabase acesso token busca um valor de nuvem Supabase. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function getSupabaseAccessToken() {
    return String(window?.TemplateAdminAuth?.getSupabaseAccessToken?.() || "");
  }
 // NUVEM | Supabase usuario identificador busca um valor de nuvem Supabase. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function getSupabaseUserId() {
    return sanitizeText(window?.TemplateAdminAuth?.getSupabaseUser?.()?.id, "", 80);
  }
 // NUVEM | Supabase token de acesso conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  function resolveSupabaseBearer(cloudConfig) {
    return getSupabaseAccessToken() || String(cloudConfig?.anonKey || "");
  }
 // NUVEM | produto imagem bucket separa uma regra de nuvem Supabase. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function resolveProductImageBucket(cloudConfig) {
    return sanitizeText(cloudConfig?.storage?.bucket, PRODUCT_IMAGE_BUCKET, 120) || PRODUCT_IMAGE_BUCKET;
  }
 // NUVEM | Supabase cabecalhos conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  function supabaseHeaders(cloudConfig, extras) {
    return {
      apikey: cloudConfig?.anonKey,
      Authorization: `Bearer ${resolveSupabaseBearer(cloudConfig)}`,
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Profile": cloudConfig?.schema || "public",
      ...extras,
    };
  }
 // NUVEM | nuvem base link monta uma estrutura de nuvem Supabase. A logica junta partes soltas em um formato unico para renderizar, salvar ou enviar.
  function buildCloudBaseUrl(cloudConfig) {
    return String(cloudConfig?.url || "")?.replace(/\/+$/, "");
  }
 // NUVEM | nuvem REST link monta uma estrutura de nuvem Supabase. A logica junta partes soltas em um formato unico para renderizar, salvar ou enviar.
  function buildCloudRestUrl(cloudConfig, path) {
    const normalizedPath = String(path || "")?.replace(/^\/+/, "");
    return new URL(`/rest/v1/${normalizedPath}`, buildCloudBaseUrl(cloudConfig) + "/")?.toString();
  }
 // NUVEM | nuvem armazenamento objeto link monta uma estrutura de nuvem Supabase. A logica junta partes soltas em um formato unico para renderizar, salvar ou enviar.
  function buildCloudStorageObjectUrl(cloudConfig, bucketId, objectPath, isPublic) {
    const bucket = encodeURIComponent(String(bucketId || "").trim());
    const normalizedPath = String(objectPath || "")
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/");
    const prefix = isPublic ? "public/" : "";
    return new URL(`/storage/v1/object/${prefix}${bucket}/${normalizedPath}`, buildCloudBaseUrl(cloudConfig) + "/")?.toString();
  }
 // NUVEM | armazenamento cabecalhos busca um valor de nuvem Supabase. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function storageHeaders(cloudConfig, extras) {
    return {
      apikey: cloudConfig?.anonKey,
      Authorization: `Bearer ${resolveSupabaseBearer(cloudConfig)}`,
      ...extras,
    };
  }
 // IDIOMA | armazenamento erro mensagem busca um valor de idioma. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function storageUploadErrorMessage(status, details) {
    const normalized = String(details || "").toLowerCase();

    if (
      status === 401
      || status === 403
      || normalized.includes("row-level security")
      || normalized.includes("not authorized")
      || normalized.includes("unauthorized")
      || normalized.includes("permission")
    ) {
      return "Não foi possível enviar a imagem. Confirme o login online do Admin, o cadastro do usuário em menu_admin_users e a regra de upload de administrador no armazenamento de imagens.";
    }

    if (status === 404 || normalized.includes("bucket not found") || normalized.includes("not found")) {
      return "Não foi possível encontrar o bucket product-images no projeto Supabase configurado.";
    }

    if (status === 413 || normalized.includes("payload too large") || normalized.includes("exceeded")) {
      return "A imagem é maior que o limite permitido pelo bucket. Use uma imagem menor.";
    }

    if (
      status === 415
      || normalized.includes("mime")
      || normalized.includes("content type")
      || normalized.includes("not allowed")
    ) {
      return "O Storage aceita apenas imagens JPG, PNG ou WebP. Verifique os tipos permitidos no bucket.";
    }

    return "Não foi possível enviar a imagem do produto. Verifique a configuração do Storage do Supabase.";
  }
 // IMAGEM | armazenamento erro monta uma estrutura de imagens. A logica junta partes soltas em um formato unico para renderizar, salvar ou enviar.
  function createStorageUploadError(status, details) {
    const error = new Error("Falha ao enviar imagem do produto.");
    error.status = status;
    error.details = details;
    error.userMessage = storageUploadErrorMessage(status, details);
    return error;
  }
 // NUVEM | nuvem erro mensagem conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  function cloudRequestErrorMessage(status, details, context) {
    const normalized = String(details || "").toLowerCase();
    const target = sanitizeText(context?.target || context?.path || "online", "online", 120);

    if (
      status === 401
      || normalized.includes("jwt")
      || normalized.includes("unauthorized")
      || normalized.includes("not authenticated")
    ) {
      return "Não foi possível acessar o modo online. Entre novamente no Admin e confira se o usuário está autorizado.";
    }

    if (
      status === 403
      || normalized.includes("row-level security")
      || normalized.includes("permission denied")
      || normalized.includes("not authorized")
      || normalized.includes("42501")
    ) {
      return "Seu usuário entrou, mas não tem permissão para alterar dados online. Confira o UUID em menu_admin_users e as policies do Supabase.";
    }

    if (status === 404 || normalized.includes("not found") || normalized.includes("pgrst205")) {
      return `O recurso online ${target} não foi encontrado. Verifique se o SQL oficial foi aplicado no projeto Supabase correto.`;
    }

    if (status === 400 || status === 422 || normalized.includes("pgrst")) {
      return `O Supabase recusou os dados enviados para ${target}. Verifique nomes de tabelas, colunas e menu_settings no SQL oficial.`;
    }

    if (status === 409 || normalized.includes("duplicate") || normalized.includes("conflict")) {
      return "O Supabase encontrou conflito ao salvar. Recarregue os dados online e tente publicar novamente.";
    }

    if (status >= 500) {
      return "O Supabase retornou um erro interno. Tente novamente e confira o projeto no painel do Supabase.";
    }

    return "Não foi possível concluir a ação online. Verifique a conexão com o Supabase e tente novamente.";
  }
 // NUVEM | nuvem erro monta uma estrutura de nuvem Supabase. A logica junta partes soltas em um formato unico para renderizar, salvar ou enviar.
  function createCloudRequestError(status, details, context) {
    const error = new Error(`Falha na nuvem (${status || "sem status"}).`);
    error.status = status;
    error.details = details;
    error.context = context || null;
    error.userMessage = cloudRequestErrorMessage(status, details, context);
    return error;
  }
 // IMAGEM | extensao tipo de arquivo tipo separa uma regra de imagens. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function extensionFromMimeType(mimeType) {
    const normalized = String(mimeType || "").trim().toLowerCase();
    if (normalized === "image/png") {
      return "png";
    }
    if (normalized === "image/webp") {
      return "webp";
    }
    return "jpg";
  }
 // IMAGEM | decodificacao base64 pedaco prepara dados de imagens. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function decodeBase64Chunk(value) {
    const binary = window?.atob?.(value);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return bytes;
  }
 // IMAGEM | dados link arquivo em memoria separa uma regra de imagens. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function dataUrlToBlob(dataUrl) {
    const match = String(dataUrl || "").match(/^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i);
    if (!match) {
      return null;
    }

    try {
      return new Blob([decodeBase64Chunk(match[2])], { type: match[1] });
    } catch (error) {
      return null;
    }
  }
 // BASE | aleatorio token separa uma regra de base do sistema. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function randomToken() {
    return Math.random().toString(36).slice(2, 10);
  }
 // IMAGEM | produto imagem objeto caminho monta uma estrutura de imagens. A logica junta partes soltas em um formato unico para renderizar, salvar ou enviar.
  function buildProductImageObjectPath(productId, mimeType) {
    const productKey = slugify(productId, "produto");
    const extension = extensionFromMimeType(mimeType);
    return `products/${productKey}/${Date.now()}-${randomToken()}.${extension}`;
  }
 // NUVEM | produto imagem origem conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  async function uploadProductImageSource(cloudConfig, productId, imageSource, uploadCache) {
    const sanitized = sanitizeImageSource(imageSource);
    if (!sanitized || !isInlineImageDataUrl(sanitized)) {
      return sanitized;
    }

    if (uploadCache?.has(sanitized)) {
      return uploadCache.get(sanitized);
    }

    const blob = dataUrlToBlob(sanitized);
    if (!blob) {
      const invalidDataError = new Error("Falha ao ler a imagem escolhida.");
      invalidDataError.userMessage = "Não foi possível preparar a imagem do produto para publicar.";
      throw invalidDataError;
    }

    const objectPath = buildProductImageObjectPath(productId, blob?.type);
    const response = await fetch(
      buildCloudStorageObjectUrl(cloudConfig, resolveProductImageBucket(cloudConfig), objectPath, false),
      {
        method: "POST",
        headers: storageHeaders(cloudConfig, {
          "x-upsert": "false",
          "cache-control": "3600",
          "content-type": blob?.type || "image/jpeg",
        }),
        body: blob,
      }
    );

    if (!response?.ok) {
      const details = await response?.text()?.catch(() => "");
      console.error("Falha ao enviar imagem do produto para o Storage.", {
        productId,
        status: response?.status,
        details,
      });
      throw createStorageUploadError(response?.status, details);
    }

    const publicUrl = buildCloudStorageObjectUrl(cloudConfig, resolveProductImageBucket(cloudConfig), objectPath, true);
    uploadCache?.set(sanitized, publicUrl);
    return publicUrl;
  }
 // NUVEM | produto imagem origem publicacao conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  async function uploadProductImageSourceForPublish(cloudConfig, productId, imageSource, uploadCache, imageUploadWarnings) {
    const sanitized = sanitizeImageSource(imageSource);
    if (!sanitized || !isInlineImageDataUrl(sanitized)) {
      return sanitized;
    }

    try {
      return await uploadProductImageSource(cloudConfig, productId, sanitized, uploadCache);
    } catch (error) {
      uploadCache?.set(sanitized, "");
      imageUploadWarnings?.push({
        productId,
        message: error?.userMessage || error?.message || "Falha ao enviar imagem do produto.",
        status: error?.status || null,
      });
      console.warn("Publicacao continuou sem imagem do produto.", {
        productId,
        status: error?.status,
        message: error?.message || String(error),
      });
      return "";
    }
  }
 // NUVEM | cardapio regra nuvem publicacao monta uma estrutura de nuvem Supabase. A logica junta partes soltas em um formato unico para renderizar, salvar ou enviar.
  async function prepareMenuStateForCloudPublish(menuState, cloudConfig) {
    const nextMenuState = sanitizeMenuState(menuState)?.state || {
      categories: [],
      addOns: [],
      products: [],
    };
    const uploadCache = new Map();
    const imageUploadWarnings = [];

    for (let index = 0; index < nextMenuState?.products?.length; index += 1) {
      const product = nextMenuState.products[index];
      const existingImages = ensureImageList(product);
      const uploadedImages = [];

      for (let imageIndex = 0; imageIndex < existingImages.length; imageIndex += 1) {
        uploadedImages.push(
          await uploadProductImageSourceForPublish(
            cloudConfig,
            product?.id || `produto-${index + 1}`,
            existingImages[imageIndex],
            uploadCache,
            imageUploadWarnings
          )
        );
      }

      const currentPrimary = sanitizeImageSource(
        product?.primaryImage || product?.imageUrl || uploadedImages[0] || existingImages[0] || ""
      );
      const uploadedPrimary = currentPrimary
        ? await uploadProductImageSourceForPublish(
          cloudConfig,
          product?.id || `produto-${index + 1}`,
          currentPrimary,
          uploadCache,
          imageUploadWarnings
        )
        : uploadedImages[0] || "";
      const nextImages = ensureImageArray(uploadedPrimary ? [uploadedPrimary, ...uploadedImages] : uploadedImages);

      nextMenuState.products[index] = {
        ...product,
        images: nextImages,
        primaryImage: uploadedPrimary || nextImages[0] || "",
        imageUrl: uploadedPrimary || nextImages[0] || "",
      };
    }

    const offerCombos = Array.isArray(nextMenuState?.offers?.combos)
      ? nextMenuState.offers.combos
      : [];

    for (let index = 0; index < offerCombos.length; index += 1) {
      const combo = offerCombos[index];
      const existingImages = ensureImageArray([
        combo?.primaryImage,
        combo?.imageUrl,
        ...(Array.isArray(combo?.images) ? combo.images : []),
      ]);
      const uploadedImages = [];
      const comboUploadKey = `combo-${combo?.id || index + 1}`;

      for (let imageIndex = 0; imageIndex < existingImages.length; imageIndex += 1) {
        uploadedImages.push(
          await uploadProductImageSourceForPublish(
            cloudConfig,
            comboUploadKey,
            existingImages[imageIndex],
            uploadCache,
            imageUploadWarnings
          )
        );
      }

      const currentPrimary = sanitizeImageSource(
        combo?.primaryImage || combo?.imageUrl || uploadedImages[0] || existingImages[0] || ""
      );
      const uploadedPrimary = currentPrimary
        ? await uploadProductImageSourceForPublish(
          cloudConfig,
          comboUploadKey,
          currentPrimary,
          uploadCache,
          imageUploadWarnings
        )
        : uploadedImages[0] || "";
      const nextImages = ensureImageArray(uploadedPrimary ? [uploadedPrimary, ...uploadedImages] : uploadedImages);

      offerCombos[index] = {
        ...combo,
        images: nextImages,
        primaryImage: uploadedPrimary || nextImages[0] || "",
        imageUrl: uploadedPrimary || nextImages[0] || "",
      };
    }

    if (nextMenuState?.offers) {
      nextMenuState.offers = {
        ...nextMenuState.offers,
        combos: offerCombos,
      };
    }

    return {
      menuState: nextMenuState,
      imageUploadWarnings,
    };
  }
 // NUVEM | regra nuvem conexao conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  async function checkCloudConnection() {
    const cloudConfig = getStates()?.cloudConfig;

    if (!isSupabaseConfigured(cloudConfig)) {
      const updated = {
        ...cloudConfig,
        status: "disabled",
        lastCheckAt: new Date()?.toISOString(),
        lastError: "Supabase não configurado.",
      };
      setCloudConfig(updated, { type: "cloud-status" });
      return updated;
    }

    try {
      const params = new URLSearchParams({
        select: "slug",
        limit: "1",
      });
      const response = await fetch(
        buildCloudRestUrl(cloudConfig, `${cloudConfig?.tables?.categories}?${params?.toString()}`),
        {
          method: "GET",
          headers: supabaseHeaders(cloudConfig),
        }
      );

      const updated = {
        ...cloudConfig,
        status: response?.ok ? "connected" : "error",
        lastCheckAt: new Date()?.toISOString(),
        lastError: response?.ok ? "" : `HTTP ${response?.status}`,
      };
      setCloudConfig(updated, { type: "cloud-status" });
      return updated;
    } catch (error) {
      const updated = {
        ...cloudConfig,
        status: "error",
        lastCheckAt: new Date()?.toISOString(),
        lastError: sanitizeText(error?.message, "Falha de conexão.", 240),
      };
      setCloudConfig(updated, { type: "cloud-status" });
      return updated;
    }
  }
 // NUVEM | nuvem recurso conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  async function fetchCloudResource(tableName, selectFields) {
    const cloudConfig = getStates()?.cloudConfig;
    if (!isSupabaseConfigured(cloudConfig)) {
      throw new Error("Supabase não configurado.");
    }

    const params = new URLSearchParams({ select: selectFields });
    const response = await fetch(buildCloudRestUrl(cloudConfig, `${tableName}?${params?.toString()}`), {
      method: "GET",
      headers: supabaseHeaders(cloudConfig),
    });

    if (!response?.ok) {
      const details = await response?.text()?.catch(() => "");
      console.error("Falha ao buscar recurso da nuvem.", {
        tableName,
        status: response?.status,
        details,
      });
      throw createCloudRequestError(response?.status, details, {
        target: tableName,
        action: "select",
      });
    }

    return response?.json();
  }
 // NUVEM | alerta nuvem conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  function warnCloudSync(message, details) {
    if (typeof console?.warn === "function") {
      console.warn(message, details || {});
    }
  }
 // NUVEM | nuvem catalogo copia do estado monta uma estrutura de nuvem Supabase. A logica junta partes soltas em um formato unico para renderizar, salvar ou enviar.
  function buildCloudCatalogSnapshot(sourceStates) {
    const states = sourceStates || getStates();
    const menuState = sanitizeMenuState(states?.menuState)?.state || {
      categories: [],
      addOns: [],
      products: [],
    };
    const categories = clone(menuState?.categories || []).sort(compareCategoryOrder);
    const addOns = clone(menuState?.addOns || []).sort(compareAddOnOrder);
    const products = clone(menuState?.products || []).sort(compareProductOrder);
    const validCategoryIds = new Set(categories.map((category) => category?.slug));
    const validAddOnIds = new Set(addOns.map((addOn) => addOn?.id));
    const errors = [];
    const productRows = [];
    const productAddOnRows = [];

    if (!categories.length) {
      errors.push("Cadastre pelo menos uma categoria antes de publicar.");
    }

    products.forEach((product, index) => {
      const productId = sanitizeText(product?.id, "", 80);
      const categorySlug = sanitizeText(product?.category, "", 80);
      const active = resolveProductActiveFlag(product);
      const available = resolveProductAvailabilityFlag(product);
      const sortOrder = Number.isFinite(Number(product?.sortOrder)) ? Number(product?.sortOrder) : index;

      if (!productId) {
        errors.push(`Produto sem ID valido na posicao ${index + 1}.`);
        return;
      }

      if (!categorySlug || !validCategoryIds.has(categorySlug)) {
        errors.push(`Produto sem categoria valida: ${productId}.`);
        return;
      }

      productRows.push({
        id: productId,
        category_slug: categorySlug,
        name_translations: ensureTranslations(product?.name, `Produto ${index + 1}`),
        description_translations: ensureTranslations(product?.description, ""),
        image_url: sanitizeImageSource(product?.primaryImage || product?.imageUrl || product?.image) || "",
        price: Number.isFinite(Number(product?.price)) ? Number(product?.price) : 0,
        available,
        active,
        sort_order: sortOrder,
      });

      ensureStringArray(product?.addOns)
        .filter((addOnId) => validAddOnIds.has(addOnId))
        .forEach((addOnId, addOnIndex) => {
          productAddOnRows.push({
            product_id: productId,
            add_on_id: addOnId,
            sort_order: addOnIndex,
          });
        });
    });

    if (!productRows.length) {
      errors.push("Cadastre pelo menos um produto antes de publicar.");
    }

    return {
      valid: errors.length === 0,
      errors,
      categories: categories.map((category, index) => ({
        slug: sanitizeText(category?.slug, `categoria-${index + 1}`, 80),
        name_translations: ensureTranslations(category?.name, `Categoria ${index + 1}`),
        description_translations: ensureTranslations(category?.description, ""),
        sort_order: Number.isFinite(Number(category?.sortOrder)) ? Number(category?.sortOrder) : index,
        active: true,
      })),
      addOns: addOns.map((addOn, index) => ({
        id: sanitizeText(addOn?.id, `adicional-${index + 1}`, 80),
        name_translations: ensureTranslations(addOn?.name, `Adicional ${index + 1}`),
        price: Number.isFinite(Number(addOn?.price)) ? Number(addOn?.price) : 0,
        sort_order: Number.isFinite(Number(addOn?.sortOrder)) ? Number(addOn?.sortOrder) : index,
        active: true,
      })),
      products: productRows,
      productAddOns: productAddOnRows,
      counts: {
        categories: categories.length,
        addOns: addOns.length,
        products: productRows.length,
        productAddOns: productAddOnRows.length,
      },
    };
  }
 // NUVEM | cardapio ajustes linhas monta uma estrutura de nuvem Supabase. A logica junta partes soltas em um formato unico para renderizar, salvar ou enviar.
  function buildMenuSettingsRows(brandConfig, cloudConfig, menuState) {
    const brand = sanitizeBrandConfig(brandConfig);
    const cloud = sanitizeCloudConfig(cloudConfig);
    const menu = sanitizeMenuState(menuState || getStates()?.menuState)?.state;
    const updatedAt = new Date()?.toISOString();
    const updatedBy = getSupabaseUserId();
 // TRATAMENTO | linha monta uma estrutura de tratamento de dados. A logica junta partes soltas em um formato unico para renderizar, salvar ou enviar.
    function makeRow(key, value) {
      const row = {
        key,
        value: clone(value || {}),
        updated_at: updatedAt,
      };
      if (updatedBy) {
        row.updated_by = updatedBy;
      }
      return row;
    }

    return [
      makeRow("cloud", {
        realtime: Boolean(cloud?.realtime),
        autoReconnect: cloud?.autoReconnect !== false,
        reconnectIntervalMs: Number(cloud?.reconnectIntervalMs || SUPABASE_DEFAULTS?.reconnectIntervalMs),
      }),
      makeRow("store", {
        i18n: clone(brand?.i18n),
        brand: clone(brand?.brand),
        business: {
          pickupAddress: brand?.business?.pickupAddress || "",
          location: clone(brand?.business?.location || {}),
          waitingTime: clone(brand?.business?.waitingTime),
          locale: brand?.business?.locale || "pt-BR",
          currency: brand?.business?.currency || "BRL",
          allowOrdersOutsideHours: brand?.business?.allowOrdersOutsideHours !== false,
        },
      }),
      makeRow("whatsapp", {
        number: String(brand?.business?.whatsappNumber || ""),
      }),
      makeRow("pix", clone(brand?.pix)),
      makeRow("theme", clone(brand?.appearance)),
      makeRow("legal", clone(brand?.legal)),
      makeRow("delivery", clone(brand?.delivery)),
      makeRow("business_hours", {
        schedule: clone(brand?.schedule),
        allowOrdersOutsideHours: brand?.business?.allowOrdersOutsideHours !== false,
      }),
      makeRow("order_message", {
        destaqueInicial: clone(brand?.destaqueInicial),
      }),
      makeRow("offers", {
        offers: clone(menu?.offers || { combos: [], discounts: [] }),
      }),
    ];
  }
 // LOCALIZACAO | regra cardapio ajustes linhas monta uma estrutura de localizacao e entrega. A logica junta partes soltas em um formato unico para renderizar, salvar ou enviar.
  function mapMenuSettingsRows(rows) {
    const map = new Map();
    (Array.isArray(rows) ? rows : []).forEach((entry) => {
      const key = sanitizeText(entry?.key, "", 80);
      if (!key) {
        return;
      }
      map.set(key, entry?.value && typeof entry?.value === "object" ? clone(entry?.value) : {});
    });
    return map;
  }
 // ADMIN | cardapio ajustes marca ajuste atualiza painel Admin. A logica muda estado, classes ou dados salvos em um ponto so para a tela responder sem espalhar alteracoes.
  function applyMenuSettingsToBrandConfig(baseBrandConfig, rows) {
    const next = clone(baseBrandConfig && typeof baseBrandConfig === "object" ? baseBrandConfig : DEFAULT_BRAND);
    const settingsMap = mapMenuSettingsRows(rows);
    const store = settingsMap.get("store");
    const whatsapp = settingsMap.get("whatsapp");
    const pix = settingsMap.get("pix");
    const theme = settingsMap.get("theme");
    const legal = settingsMap.get("legal");
    const delivery = settingsMap.get("delivery");
    const businessHours = settingsMap.get("business_hours");
    const orderMessage = settingsMap.get("order_message");

    if (store?.i18n && typeof store?.i18n === "object") {
      next.i18n = {
        ...next.i18n,
        ...clone(store.i18n),
      };
    }

    if (store?.brand && typeof store?.brand === "object") {
      next.brand = {
        ...next.brand,
        ...clone(store.brand),
      };
    }

    if (store?.business && typeof store?.business === "object") {
      next.business = {
        ...next.business,
        ...clone(store.business),
      };
    }

    if (whatsapp && typeof whatsapp === "object") {
      next.business = {
        ...next.business,
        whatsappNumber: String(whatsapp?.number || whatsapp?.whatsappNumber || next?.business?.whatsappNumber || ""),
      };
    }

    if (pix && typeof pix === "object") {
      next.pix = clone(pix);
    }

    if (theme && typeof theme === "object") {
      next.appearance = {
        ...next.appearance,
        ...clone(theme),
      };
    }

    if (legal && typeof legal === "object") {
      next.legal = clone(legal);
    }

    if (delivery && typeof delivery === "object") {
      next.delivery = {
        ...next.delivery,
        ...clone(delivery),
      };
    }

    if (businessHours && typeof businessHours === "object") {
      next.schedule = clone(businessHours?.schedule || next?.schedule);
      next.business = {
        ...next.business,
        allowOrdersOutsideHours:
          businessHours?.allowOrdersOutsideHours == null
            ? next?.business?.allowOrdersOutsideHours
            : Boolean(businessHours?.allowOrdersOutsideHours),
      };
    }

    if (orderMessage?.destaqueInicial && typeof orderMessage?.destaqueInicial === "object") {
      next.destaqueInicial = {
        ...next.destaqueInicial,
        ...clone(orderMessage.destaqueInicial),
      };
    }

    return sanitizeBrandConfig(next);
  }
 // NUVEM | cardapio ajustes nuvem ajuste atualiza nuvem Supabase. A logica muda estado, classes ou dados salvos em um ponto so para a tela responder sem espalhar alteracoes.
  function applyMenuSettingsToCloudConfig(baseCloudConfig, rows) {
    const settingsMap = mapMenuSettingsRows(rows);
    return mergeOperationalCloudConfig(baseCloudConfig, settingsMap.get("cloud"));
  }
 // ADMIN | cardapio ajustes cardapio regra atualiza painel Admin. A logica muda estado, classes ou dados salvos em um ponto so para a tela responder sem espalhar alteracoes.
  function applyMenuSettingsToMenuState(baseMenuState, rows, fallbackMenuState) {
    const next = sanitizeMenuState(baseMenuState)?.state || clone(DEFAULT_MENU);
    const settingsMap = mapMenuSettingsRows(rows);
    if (settingsMap.has("offers")) {
      const offersConfig = settingsMap.get("offers");
      next.offers = sanitizeOffers(offersConfig?.offers || offersConfig);
    } else {
      next.offers = sanitizeOffers(fallbackMenuState?.offers || next?.offers);
    }
    return sanitizeMenuState(next)?.state;
  }
 // NUVEM | nuvem cardapio ajustes conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  async function fetchCloudMenuSettings() {
    const tableName = getStates()?.cloudConfig?.tables?.settings;
    if (!tableName) {
      return [];
    }

    try {
      return await fetchCloudResource(tableName, "key,value");
    } catch (error) {
      warnCloudSync("Falha ao carregar menu_settings. O catálogo local será mantido com os ajustes atuais.", {
        message: error?.message || String(error),
      });
      return [];
    }
  }
 // NUVEM | nuvem local conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  async function syncCloudToLocal() {
    const states = getStates();
    const cloudConfig = states?.cloudConfig;
    const tableConfig = cloudConfig?.tables;
    const existingById = new Map(
      states.menuState.products.map((product) => [product?.id, clone(product)])
    );

    const [categories, addOns, products, productAddOns, menuSettings] = await Promise?.all([
      fetchCloudResource(tableConfig?.categories, "slug,name_translations,description_translations,sort_order,active"),
      fetchCloudResource(tableConfig?.addOns, "id,name_translations,price,sort_order,active"),
      fetchCloudResource(tableConfig?.products, "id,category_slug,name_translations,description_translations,image_url,price,available,active,sort_order"),
      fetchCloudResource(tableConfig?.productAddOns, "product_id,add_on_id,sort_order"),
      fetchCloudMenuSettings(),
    ]);

    const nextCategories = (Array.isArray(categories) ? categories : [])
      .filter((category) => category?.active !== false)
      .map((category, index) => ({
        slug: sanitizeText(category?.slug || category?.id, `categoria-${index + 1}`, 80),
        name: ensureTranslations(category?.name_translations || category?.name, `Categoria ${index + 1}`),
        description: ensureTranslations(category?.description_translations || category?.description, ""),
        sortOrder: Number.isFinite(Number(category?.sort_order ?? category?.sortOrder))
          ? Number(category?.sort_order ?? category?.sortOrder)
          : index,
      }))
      .sort(compareCategoryOrder);

    const nextAddOns = (Array.isArray(addOns) ? addOns : [])
      .filter((addOn) => addOn?.active !== false)
      .map((addOn, index) => ({
        id: sanitizeText(addOn?.id, `adicional-${index + 1}`, 80),
        name: ensureTranslations(addOn?.name_translations || addOn?.name, `Adicional ${index + 1}`),
        price: Number.isFinite(Number(addOn?.price)) ? Number(addOn?.price) : 0,
        sortOrder: Number.isFinite(Number(addOn?.sort_order ?? addOn?.sortOrder))
          ? Number(addOn?.sort_order ?? addOn?.sortOrder)
          : index,
      }))
      .sort(compareAddOnOrder);

    const validCategoryIds = new Set(nextCategories.map((category) => category?.slug));
    const validAddOnIds = new Set(nextAddOns.map((addOn) => addOn?.id));
    const nextProducts = [];

    (Array.isArray(products) ? products : []).forEach((product, index) => {
      const productId = sanitizeText(product?.id, `produto-${index + 1}`, 80);
      const categorySlug = sanitizeText(product?.category_slug || product?.category_id || product?.category, "", 80);

      if (!productId || !categorySlug || !validCategoryIds.has(categorySlug)) {
        warnCloudSync("Produto online ignorado por categoria invalida.", {
          productId,
          categorySlug,
        });
        return;
      }

      const existing = existingById?.get(productId) || {};
      const cloudImage = sanitizeImageSource(
        product?.image_url || product?.imageUrl || product?.image || ""
      );
      const mergedImages = cloudImage ? ensureImageArray([cloudImage]) : [];
      const active = resolveProductActiveFlag(product);
      const available = resolveProductAvailabilityFlag(product);

      nextProducts.push({
        id: productId,
        category: categorySlug,
        name: ensureTranslations(product?.name_translations || product?.name, `Produto ${nextProducts.length + 1}`),
        description: ensureTranslations(product?.description_translations || product?.description, ""),
        longDescription: ensureTranslations(existing?.longDescription, ""),
        imageUrl: cloudImage,
        images: mergedImages,
        primaryImage: cloudImage,
        price: Number.isFinite(Number(product?.price)) ? Number(product?.price) : 0,
        available,
        active,
        status: resolveProductStatus(product),
        featured: Boolean(existing?.featured),
        prepTime: Number.isFinite(Number(existing?.prepTime)) ? Number(existing?.prepTime) : null,
        tags: ensureStringArray(existing?.tags),
        addOns: [],
        sortOrder: Number.isFinite(Number(product?.sort_order ?? product?.sortOrder))
          ? Number(product?.sort_order ?? product?.sortOrder)
          : nextProducts.length,
        createdAt: sanitizeText(existing?.createdAt, "", 40),
        updatedAt: new Date()?.toISOString(),
      });
    });

    nextProducts.sort(compareProductOrder);
    const validProductIds = new Set(nextProducts.map((product) => product?.id));
    const addOnMap = new Map(nextProducts.map((product) => [product?.id, []]));

    (Array.isArray(productAddOns) ? productAddOns : [])
      .slice()
      .sort((left, right) => {
        const leftOrder = Number.isFinite(Number(left?.sort_order)) ? Number(left?.sort_order) : Number.MAX_SAFE_INTEGER;
        const rightOrder = Number.isFinite(Number(right?.sort_order)) ? Number(right?.sort_order) : Number.MAX_SAFE_INTEGER;
        return leftOrder - rightOrder;
      })
      .forEach((entry) => {
        const productId = sanitizeText(entry?.product_id, "", 80);
        const addOnId = sanitizeText(entry?.add_on_id, "", 80);
        if (!validProductIds.has(productId) || !validAddOnIds.has(addOnId)) {
          return;
        }

        const nextList = addOnMap.get(productId) || [];
        if (!nextList.includes(addOnId)) {
          nextList.push(addOnId);
        }
        addOnMap.set(productId, nextList);
      });

    nextProducts.forEach((product) => {
      product.addOns = addOnMap.get(product?.id) || [];
    });

    let nextMenuState = {
      version: 1,
      locale: states?.brandConfig?.i18n?.defaultLocale,
      categories: nextCategories,
      addOns: nextAddOns,
      products: nextProducts,
      offers: clone(states?.menuState?.offers || { combos: [], discounts: [] }),
      updatedAt: new Date()?.toISOString(),
    };

    nextMenuState = applyMenuSettingsToMenuState(nextMenuState, menuSettings, states?.menuState);
    const nextBrandConfig = applyMenuSettingsToBrandConfig(states?.brandConfig, menuSettings);
    const nextCloudConfig = applyMenuSettingsToCloudConfig(cloudConfig, menuSettings);

    return updateStates(
      function (draft) {
        draft.menuState = nextMenuState;
        draft.brandConfig = nextBrandConfig;
        draft.cloudConfig = nextCloudConfig;
        return draft;
      },
      { type: "cloud-sync-to-local" }
    );
  }
 // NUVEM | nuvem catalogo conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  async function loadCloudCatalog() {
    if (!isSupabaseConfigured(getStates()?.cloudConfig)) {
      throw new Error("Supabase não configurado.");
    }

    return syncCloudToLocal();
  }
 // NUVEM | nuvem conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  async function requestCloud(path, options) {
    const cloudConfig = getStates()?.cloudConfig;
    if (!isSupabaseConfigured(cloudConfig)) {
      throw new Error("Supabase não configurado.");
    }

    const response = await fetch(buildCloudRestUrl(cloudConfig, path), {
      ...options,
      headers: supabaseHeaders(cloudConfig, options?.headers || {}),
    });

    if (!response?.ok) {
      const details = await response?.text()?.catch(() => "");
      console.error("Falha na requisição da nuvem.", {
        path,
        status: response?.status,
        details,
      });
      throw createCloudRequestError(response?.status, details, {
        target: path,
        action: options?.method || "request",
      });
    }

    return response;
  }
 // NUVEM | salvar ou atualizar nuvem linhas conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  async function upsertCloudRows(table, rows, conflictColumns) {
    if (!Array.isArray(rows) || !rows.length) {
      return;
    }

    const params = new URLSearchParams();
    if (Array.isArray(conflictColumns) && conflictColumns.length) {
      params.set("on_conflict", conflictColumns.join(","));
    }

    const path = params?.toString() ? `${table}?${params?.toString()}` : table;
    await requestCloud(path, {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON?.stringify(rows),
    });
  }
 // NUVEM | exclusao nuvem linhas conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  async function deleteCloudRows(table, field, mode, values) {
    const params = new URLSearchParams();

    if (mode === "all") {
      params.set(field, "not.is.null");
    } else {
      const list = ensureStringArray(values).filter(Boolean);
      if (!list.length) {
        return;
      }
      params.set(field, `${mode}.(${list.join(",")})`);
    }

    await requestCloud(`${table}?${params?.toString()}`, {
      method: "DELETE",
      headers: { Prefer: "return=minimal" },
    });
  }
 // NUVEM | exclusao nuvem linhas com seguranca conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  async function deleteCloudRowsSafely(table, field, mode, values) {
    try {
      await deleteCloudRows(table, field, mode, values);
      return true;
    } catch (error) {
      console.warn("Limpeza remota ignorada para manter a publicação online estável.", {
        table,
        field,
        mode,
        message: error?.message || String(error),
      });
      return false;
    }
  }
 // NUVEM | online relatorio dados conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  async function loadOnlineReportData(limit) {
    const cloudConfig = getStates()?.cloudConfig;
    if (!isSupabaseConfigured(cloudConfig)) {
      throw new Error("Supabase não configurado.");
    }

    const tableName = metricEventTableName(cloudConfig);
    if (!tableName) {
      throw new Error("Tabela de métricas online não configurada.");
    }

    const params = new URLSearchParams({
      select: "event_type,product_id,value,created_at",
      order: "created_at.desc",
      limit: String(limit || 2000),
    });
    const response = await requestCloud(`${tableName}?${params?.toString()}`, {
      method: "GET",
    });
    const rows = await response?.json();
    return buildOnlineReportData(rows, 10);
  }
 // NUVEM | online metricas limpa nuvem Supabase. A logica remove filtros, timers, avisos ou rascunhos antigos para a proxima acao comecar sem sobra.
  async function clearOnlineMetrics() {
    const cloudConfig = getStates()?.cloudConfig;
    if (!isSupabaseConfigured(cloudConfig)) {
      throw new Error("Supabase não configurado.");
    }

    const tableName = metricEventTableName(cloudConfig);
    if (!tableName) {
      throw new Error("Tabela de métricas online não configurada.");
    }

    await deleteCloudRows(tableName, "created_at", "all");
    return true;
  }
 // NUVEM | cardapio ajustes online atualiza nuvem Supabase. A logica muda estado, classes ou dados salvos em um ponto so para a tela responder sem espalhar alteracoes.
  async function saveMenuSettingsOnline(brandConfig, cloudConfig, menuState) {
    const resolvedCloud = sanitizeCloudConfig(cloudConfig || getStates()?.cloudConfig);
    const settingsTable = resolvedCloud?.tables?.settings;
    if (!settingsTable) {
      return [];
    }

    const rows = buildMenuSettingsRows(brandConfig || getStates()?.brandConfig, resolvedCloud, menuState || getStates()?.menuState);
    await upsertCloudRows(settingsTable, rows, ["key"]);
    return rows;
  }
 // NUVEM | nuvem operacional ajustes atualiza nuvem Supabase. A logica muda estado, classes ou dados salvos em um ponto so para a tela responder sem espalhar alteracoes.
  async function saveCloudOperationalSettings(nextCloudConfig) {
    const states = getStates();
    const mergedCloud = sanitizeCloudConfig(nextCloudConfig || states?.cloudConfig);
    const cloudRow = buildMenuSettingsRows(states?.brandConfig, mergedCloud, states?.menuState).find(function (entry) {
      return entry?.key === "cloud";
    });

    if (!cloudRow || !mergedCloud?.tables?.settings) {
      return setCloudConfig(mergedCloud, { type: "cloud-update" });
    }

    await upsertCloudRows(mergedCloud.tables.settings, [cloudRow], ["key"]);
    return setCloudConfig(applyMenuSettingsToCloudConfig(mergedCloud, [cloudRow]), { type: "cloud-settings-online" });
  }
 // NUVEM | regra nuvem armazenamento conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  async function checkCloudStorage() {
    const cloudConfig = getStates()?.cloudConfig;
    if (!isSupabaseConfigured(cloudConfig)) {
      throw new Error("Supabase não configurado.");
    }

    const bucket = resolveProductImageBucket(cloudConfig);
    const testPath = `products/_checks/upload-check-${Date.now()}-${randomToken()}.png`;
    const testBlob = dataUrlToBlob(
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII="
    );
    const response = await fetch(
      buildCloudStorageObjectUrl(cloudConfig, bucket, testPath, false),
      {
        method: "POST",
        headers: storageHeaders(cloudConfig, {
          "x-upsert": "false",
          "cache-control": "3600",
          "content-type": "image/png",
        }),
        body: testBlob,
      }
    );

    if (!response?.ok) {
      const details = await response?.text()?.catch(() => "");
      console.error("Falha ao verificar o Storage do Supabase.", {
        bucket,
        testPath,
        status: response?.status,
        details,
      });
      throw createStorageUploadError(response?.status, details);
    }

    return {
      bucket,
      testPath,
      ok: true,
    };
  }
 // NUVEM | substituicao nuvem catalogo conversa com nuvem Supabase. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
  async function replaceCloudCatalog(options) {
    const states = getStates();
    const cloudConfig = states?.cloudConfig;
    const tables = cloudConfig?.tables;
    const prepared = await prepareMenuStateForCloudPublish(states?.menuState, cloudConfig);
    const preparedMenuState = prepared?.menuState;
    const imageUploadWarnings = Array.isArray(prepared?.imageUploadWarnings)
      ? prepared.imageUploadWarnings
      : [];
    const snapshot = buildCloudCatalogSnapshot({
      ...states,
      menuState: preparedMenuState,
    });
    const allowEmpty = Boolean(options?.allowEmpty);

    if (!snapshot?.valid) {
      const error = new Error(snapshot?.errors?.[0] || "Snapshot de publicação inválido.");
      error.details = snapshot;
      throw error;
    }

    if (!allowEmpty && (!snapshot?.categories?.length || !snapshot?.products?.length)) {
      throw new Error("Cadastre pelo menos uma categoria e um produto antes de publicar.");
    }

    await upsertCloudRows(tables.categories, snapshot.categories, ["slug"]);
    await upsertCloudRows(tables.addOns, snapshot.addOns, ["id"]);
    await upsertCloudRows(tables.products, snapshot.products, ["id"]);

    await deleteCloudRowsSafely(
      tables.productAddOns,
      "product_id",
      "in",
      snapshot.products.map((product) => product?.id)
    );

    await upsertCloudRows(tables.productAddOns, snapshot.productAddOns, ["product_id", "add_on_id"]);

    await deleteCloudRowsSafely(
      tables.products,
      "id",
      "not.in",
      snapshot.products.map((product) => product?.id)
    );

    if (snapshot.addOns.length) {
      await deleteCloudRowsSafely(
        tables.addOns,
        "id",
        "not.in",
        snapshot.addOns.map((addOn) => addOn?.id)
      );
    } else {
      await deleteCloudRowsSafely(tables.addOns, "id", "all");
    }

    await deleteCloudRowsSafely(
      tables.categories,
      "slug",
      "not.in",
      snapshot.categories.map((category) => category?.slug)
    );

    await saveMenuSettingsOnline(states?.brandConfig, cloudConfig, preparedMenuState);
    await checkCloudConnection();
    await syncCloudToLocal();

    return {
      cloudConfig: getStates()?.cloudConfig,
      snapshot,
      imageUploadWarnings,
    };
  }
 // IMAGEM | JSON arquivo separa uma regra de imagens. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function downloadJsonFile(filename, data) {
    const blob = new Blob([JSON?.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
    const link = document?.createElement("a");
    link.href = URL?.createObjectURL(blob);
    link.download = filename;
    document?.body?.appendChild(link);
    link?.click();
    link?.remove();
    window.setTimeout(() => URL?.revokeObjectURL(link?.href), 1000);
  }

  window.TemplateProductSystem = {
    keys: STORAGE_KEYS,
    getStates,
    getMetrics,
    getFavorites,
    getClientUiState,
    saveClientUiState,
    setMenuState,
    setBrandConfig,
    setCloudConfig,
    sanitizeSystemData,
    sanitizeImageSource,
    resetSystem,
    exportBackup,
    restoreBackup,
    trackView(productId) {
      trackMetric("views", productId);
    },
    trackAdd(productId) {
      trackMetric("adds", productId);
    },
    trackCheckoutOpened() {
      trackCheckoutOpened();
    },
    trackOrderPrepared(details) {
      trackOrderPrepared(details || {});
    },
    trackSearchNoResult(query) {
      trackSearchNoResult(query);
    },
    getTopViewed(limit) {
      return getTopMetrics("views", limit || 5);
    },
    getTopAdded(limit) {
      return getTopMetrics("adds", limit || 5);
    },
    getTopPaymentChoices(limit) {
      return getTopChoiceMetrics("payments", limit || 5);
    },
    getTopServiceChoices(limit) {
      return getTopChoiceMetrics("serviceChoices", limit || 5);
    },
    getTopSearchNoResults(limit) {
      return getTopChoiceMetrics("searchNoResults", limit || 5);
    },
    getReportSummary,
    loadOnlineReportData,
    clearMetrics() {
      saveMetrics(clone(DEFAULT_METRICS), { type: "clear-metrics" });
    },
    clearOnlineMetrics,
    toggleFavorite,
    saveFavorites,
    getSystemStatus,
    checkCloudConnection,
    checkCloudStorage,
    saveCloudOperationalSettings,
    syncCloudToLocal,
    loadCloudCatalog,
    replaceCloudCatalog,
    buildCloudCatalogSnapshot,
    downloadJsonFile,
    isSupabaseConfigured(config) {
      return isSupabaseConfigured(config || getStates()?.cloudConfig);
    },
  };

  window?.addEventListener("storage", function (event) {
    if (!event || !event?.key) {
      return;
    }

    if (Object?.values(STORAGE_KEYS)?.includes(event?.key)) {
      currentStates = buildCanonicalStates();
      emitStateChange({ type: "external-storage", key: event?.key });
    }
  });
})();


