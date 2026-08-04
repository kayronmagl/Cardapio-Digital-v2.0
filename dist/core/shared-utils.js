(function () {
  // COMPARTILHADO | Funções pequenas usadas pelo público, Admin e estado para evitar regras duplicadas entre arquivos.
  // ARMAZENAMENTO | Centraliza leitura e gravacao local para os outros arquivos nao repetirem try/catch do navegador.
  function getStorage(mode) {
    try {
      return mode === "session" ? window.sessionStorage : window.localStorage;
    } catch (error) {
      return null;
    }
  }
  function clone(value) {
    if (value === undefined) {
      return undefined;
    }
    return JSON.parse(JSON.stringify(value));
  }
  function loadStorageValue(key, fallback, mode) {
    try {
      const raw = getStorage(mode)?.getItem(key);
      if (raw == null) {
        return clone(fallback);
      }

      try {
        return JSON.parse(raw);
      } catch (error) {
        return typeof fallback === "string" ? raw : clone(fallback);
      }
    } catch (error) {
      return clone(fallback);
    }
  }
  function saveStorageValue(key, value, mode) {
    try {
      const raw = typeof value === "string" ? value : JSON.stringify(value);
      getStorage(mode)?.setItem(key, raw);
      return true;
    } catch (error) {
      return false;
    }
  }
  // ESTADO | Remove uma chave do armazenamento escolhido sem quebrar a tela se o navegador bloquear acesso local.
  function removeStorageValue(key, mode) {
    try {
      getStorage(mode)?.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }
  // SEGURANCA | Escapa textos antes de montar HTML para impedir que nomes e descricoes quebrem a tela.
  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
  function byId(id) {
    return document.getElementById(id);
  }
  function normalizePhone(phone) {
    return String(phone || "").replace(/\D/g, "");
  }
  // TRATAMENTO | Transforma nomes em códigos curtos para URL, categoria ou produto, usando fallback quando o texto fica vazio.
  function slugify(value, fallback) {
    const source = String(value || fallback || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return source || String(fallback || "item");
  }
  // TEXTO | Limpa listas escritas em linhas para selos, observacoes e campos parecidos nao salvarem repetidos.
  function uniqueLines(value) {
    return Array.from(
      new Set(
        String(value || "")
          .split(/\r?\n/)
          .map(function (line) {
            return String(line || "").trim();
          })
          .filter(Boolean)
      )
    );
  }
  async function sha256(value) {
    const subtle = globalThis.crypto?.subtle;
    if (!subtle || typeof subtle.digest !== "function") {
      const error = new Error("CRYPTO_UNAVAILABLE");
      error.code = "CRYPTO_UNAVAILABLE";
      throw error;
    }

    const bytes = new TextEncoder().encode(String(value || ""));
    const buffer = await subtle.digest("SHA-256", bytes);
    return Array.from(new Uint8Array(buffer))
      .map(function (chunk) {
        return chunk.toString(16).padStart(2, "0");
      })
      .join("");
  }
  // MOEDA | Formata valores com o idioma ativo para cardapio, carrinho e Admin mostrarem o mesmo preco.
  function formatCurrency(value, options) {
    const locale = options?.locale || "pt-BR";
    const currency = options?.currency || "BRL";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(Number(value) || 0);
  }

  const PAGE_TRANSITION_KEY = "template-cardapio-page-transition-v1";
  let pageTransitionArrivalActive = false;
  let pageTransitionShownAt = 0;
  // TRANSIÇÃO | Anima apenas navegação interna comum e respeita preferências de movimento reduzido.
  function prefersReducedMotion() {
    return Boolean(window?.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches);
  }
  function optionText(value, fallback) {
    try {
      const resolved = typeof value === "function" ? value() : value;
      return String(resolved || fallback || "").trim();
    } catch (error) {
      return String(fallback || "").trim();
    }
  }
  function canTransitionLink(event, anchor) {
    if (!anchor || event?.defaultPrevented) {
      return false;
    }

    if (event?.button != null && event.button !== 0) {
      return false;
    }

    if (event?.metaKey || event?.ctrlKey || event?.shiftKey || event?.altKey) {
      return false;
    }

    if (anchor?.target && anchor.target !== "_self") {
      return false;
    }

    if (anchor?.hasAttribute?.("download")) {
      return false;
    }

    const href = anchor?.getAttribute?.("href") || "";
    if (!href || href.startsWith("#")) {
      return false;
    }

    try {
      const url = new URL(href, window.location.href);
      const current = new URL(window.location.href);
      if (url.protocol !== current.protocol) {
        return false;
      }
      if (url.protocol !== "file:" && url.origin !== current.origin) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  }
  // CARREGAMENTO | Cria a tela de transicao se a pagina ainda nao trouxe uma pronta no HTML.
  function getPageTransitionOverlay() {
    let overlay = document?.getElementById("templatePageTransition");
    if (overlay) {
      return overlay;
    }

    overlay = document?.createElement("div");
    overlay.id = "templatePageTransition";
    overlay.className = "page-transition-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.innerHTML =
      '<div class="page-transition-card" role="status" aria-live="polite">' +
      '<span class="page-transition-kicker" data-page-transition-brand></span>' +
      '<strong class="page-transition-title" data-page-transition-message></strong>' +
      '<span class="page-transition-loader" aria-hidden="true">' +
      '<img class="page-transition-logo" src="./assets/NovaLogoTobias.png" alt="" decoding="async">' +
      "<span></span>" +
      "</span>" +
      "</div>";
    document?.body?.appendChild(overlay);
    return overlay;
  }
  function updatePageTransitionOverlay(overlay, options) {
    const brand = optionText(options?.brand, "");
    const message = optionText(options?.arrivalMessage || options?.message, "Carregando...");
    const brandElement = overlay?.querySelector("[data-page-transition-brand]");
    const messageElement = overlay?.querySelector("[data-page-transition-message]");

    if (brandElement) {
      brandElement.textContent = brand;
      brandElement.hidden = !brand;
    }
    if (messageElement) {
      messageElement.textContent = message;
    }
  }
  function pageTransitionPayload(options) {
    return {
      brand: optionText(options?.brand, ""),
      message: optionText(options?.message, "Carregando..."),
      arrivalBrand: optionText(options?.arrivalBrand, ""),
      arrivalMessage: optionText(options?.arrivalMessage, ""),
    };
  }
  function parsePageTransitionPayload(raw) {
    if (!raw || raw === "1") {
      return null;
    }

    try {
      const payload = JSON.parse(raw);
      return {
        brand: optionText(payload?.brand, ""),
        message: optionText(payload?.message, ""),
        arrivalBrand: optionText(payload?.arrivalBrand, ""),
        arrivalMessage: optionText(payload?.arrivalMessage, ""),
      };
    } catch (error) {
      return null;
    }
  }
  function hidePageTransitionOverlay() {
    document?.body?.classList?.remove("page-transition-active");
    pageTransitionArrivalActive = false;
    pageTransitionShownAt = 0;
    const overlay = document?.getElementById("templatePageTransition");
    if (!overlay) {
      return;
    }
    overlay.setAttribute("aria-hidden", "true");
    overlay?.classList?.remove("page-transition-overlay--show");
  }
  function revealPageAfterTransition(className, options) {
    const revealClass = optionText(className, "");
    if (!revealClass || !document?.body || prefersReducedMotion()) {
      return;
    }

    document.body.classList.add(revealClass);
    window?.setTimeout?.(function () {
      document?.body?.classList?.remove(revealClass);
    }, Math.max(240, Math.min(Number(options?.revealDurationMs ?? 760), 1600)));
  }
  function showPageTransitionLoading(options) {
    if (pageTransitionArrivalActive || !document?.body) {
      return false;
    }

    const overlay = getPageTransitionOverlay();
    updatePageTransitionOverlay(overlay, options);
    pageTransitionArrivalActive = true;
    pageTransitionShownAt = Date.now();
    document?.body?.classList?.add("page-transition-active");
    overlay?.setAttribute("aria-hidden", "false");
    overlay?.classList?.add("page-transition-overlay--show");
    return true;
  }
  function markPageTransitionArrival(options) {
    let pending = false;
    let payload = null;

    try {
      const raw = getStorage("session")?.getItem(PAGE_TRANSITION_KEY);
      pending = Boolean(raw);
      payload = parsePageTransitionPayload(raw);
      getStorage("session")?.removeItem(PAGE_TRANSITION_KEY);
    } catch (error) {
      pending = false;
    }

    if (!pending || !document?.body) {
      return false;
    }

    if (payload?.arrivalMessage || payload?.arrivalBrand) {
      const overlay = getPageTransitionOverlay();
      updatePageTransitionOverlay(overlay, {
        ...options,
        brand: payload?.arrivalBrand || payload?.brand,
        message: payload?.arrivalMessage,
      });
      pageTransitionArrivalActive = true;
      pageTransitionShownAt = Date.now();
      document?.body?.classList?.add("page-transition-active");
      overlay?.setAttribute("aria-hidden", "false");
      overlay?.classList?.add("page-transition-overlay--show");
    }

    document.body.classList.add("page-transition-arrive");
    const clearArrival = function () {
      document?.body?.classList?.remove("page-transition-arrive");
    };

    if (prefersReducedMotion()) {
      clearArrival();
      return true;
    }

    window?.setTimeout(clearArrival, 260);
    return true;
  }
  // CARREGAMENTO | Espera fontes, imagens e uma janela minima antes de esconder a tela inicial.
  function waitForVisualReady(options) {
    const timeoutMs = Math.max(320, Math.min(Number(options?.timeoutMs ?? 2400), 5000));
    const waitFrame = new Promise(function (resolve) {
      const schedule = typeof window?.requestAnimationFrame === "function"
        ? window.requestAnimationFrame.bind(window)
        : function (callback) { window?.setTimeout?.(callback, 16); };
      schedule(function () {
        schedule(resolve);
      });
    });
    const waitFonts = document?.fonts?.ready?.catch?.(function () {}) || Promise.resolve();
    const imagePromises = Array.from(document?.images || [])
      .filter(function (image) {
        return image && !image.complete && image.loading !== "lazy";
      })
      .slice(0, 16)
      .map(function (image) {
        return new Promise(function (resolve) {
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        });
      });
    const timeout = new Promise(function (resolve) {
      window?.setTimeout?.(resolve, timeoutMs);
    });

    return Promise.race([
      Promise.all([waitFrame, waitFonts, Promise.all(imagePromises)]),
      timeout,
    ]);
  }
  function waitForMinimumTransition(options) {
    const minDurationMs = Math.max(0, Math.min(Number(options?.minDurationMs ?? 0), 3200));
    const elapsed = pageTransitionShownAt ? Date.now() - pageTransitionShownAt : minDurationMs;
    const remaining = Math.max(0, minDurationMs - elapsed);
    if (!remaining) {
      return Promise.resolve();
    }

    return new Promise(function (resolve) {
      window?.setTimeout?.(resolve, remaining);
    });
  }
  function finishPageTransitionAfterVisualReady(options) {
    if (!pageTransitionArrivalActive) {
      return Promise.resolve(false);
    }

    return Promise.all([
      waitForVisualReady(options),
      waitForMinimumTransition(options),
      Promise.resolve(options?.waitFor)?.catch?.(function () {}),
    ])?.then(function () {
      if (pageTransitionArrivalActive) {
        hidePageTransitionOverlay();
        revealPageAfterTransition(options?.revealClass, options);
      }
      return true;
    });
  }
  function setupPageTransition(options) {
    const selector = String(options?.selector || "").trim();
    if (!selector || !document?.body) {
      return;
    }

    markPageTransitionArrival(options);

    window?.addEventListener("pageshow", function (event) {
      if (event?.persisted) {
        hidePageTransitionOverlay();
      }
    });

    document?.addEventListener("click", function (event) {
      const anchor = event?.target?.closest?.(selector);
      if (!canTransitionLink(event, anchor)) {
        return;
      }

      event.preventDefault();
      const overlay = getPageTransitionOverlay();
      updatePageTransitionOverlay(overlay, options);

      try {
        getStorage("session")?.setItem(PAGE_TRANSITION_KEY, JSON.stringify(pageTransitionPayload(options)));
      } catch (error) {
      }

      document?.body?.classList?.add("page-transition-active");
      overlay?.setAttribute("aria-hidden", "false");
      overlay?.classList?.add("page-transition-overlay--show");

      const delay = prefersReducedMotion() ? 0 : Number(options?.durationMs ?? 220);
      window?.setTimeout(function () {
        window.location.href = anchor.href;
      }, Math.max(0, Math.min(delay, 320)));
    });
  }

  const THEME_PRESETS = Object.freeze([
    {
      key: "tobias-lanches",
      theme: "dark",
      palette: "gold",
      swatches: ["#050505", "#12100a", "#ffffff", "#ffc400"],
      preview: {
        badge: { "pt-BR": "Mais pedido", "en-US": "Top order" },
        product: { "pt-BR": "X-Bacon do Tobia", "en-US": "Tobia's bacon burger" },
        action: { "pt-BR": "Adicionar", "en-US": "Add" },
        price: 24.9,
        accentText: "#111827",
      },
    },
    {
      key: "dark-premium",
      theme: "dark",
      palette: "gold",
      swatches: ["#030303", "#11100c", "#211b0b", "#d4ad54"],
      preview: {
        badge: { "pt-BR": "Especial", "en-US": "Special" },
        product: { "pt-BR": "Combo artesanal", "en-US": "Craft combo" },
        action: { "pt-BR": "Escolher", "en-US": "Choose" },
        price: 34.9,
        accentText: "#111827",
      },
    },
    {
      key: "carnaval",
      theme: "dark",
      palette: "purple",
      swatches: ["#090407", "#221025", "#ffc000", "#e94b7b"],
      preview: {
        badge: { "pt-BR": "Folia", "en-US": "Carnival" },
        product: { "pt-BR": "Combo folião", "en-US": "Party combo" },
        action: { "pt-BR": "Pedir", "en-US": "Order" },
        price: 29.9,
        accentText: "#ffffff",
      },
    },
    {
      key: "sao-joao-nordeste",
      theme: "dark",
      palette: "orange",
      swatches: ["#120805", "#2a1608", "#ffc000", "#d75028"],
      preview: {
        badge: { "pt-BR": "Arraiá", "en-US": "June party" },
        product: { "pt-BR": "Combo São João", "en-US": "Sao Joao combo" },
        action: { "pt-BR": "Pedir", "en-US": "Order" },
        price: 31.9,
        accentText: "#ffffff",
      },
    },
    {
      key: "dia-das-maes",
      theme: "dark",
      palette: "red",
      swatches: ["#100609", "#281019", "#f5d7c8", "#d87a8a"],
      preview: {
        badge: { "pt-BR": "Família", "en-US": "Family" },
        product: { "pt-BR": "Combo da mãe", "en-US": "Mother's combo" },
        action: { "pt-BR": "Presentear", "en-US": "Treat her" },
        price: 36.9,
        accentText: "#ffffff",
      },
    },
    {
      key: "dia-dos-pais",
      theme: "dark",
      palette: "sky",
      swatches: ["#06090d", "#111923", "#ffc000", "#4f87ad"],
      preview: {
        badge: { "pt-BR": "Especial", "en-US": "Special" },
        product: { "pt-BR": "Combo do pai", "en-US": "Father's combo" },
        action: { "pt-BR": "Pedir", "en-US": "Order" },
        price: 38.9,
        accentText: "#ffffff",
      },
    },
    {
      key: "dia-dos-namorados",
      theme: "dark",
      palette: "red",
      swatches: ["#120408", "#2a0d14", "#ffc000", "#d9445f"],
      preview: {
        badge: { "pt-BR": "A dois", "en-US": "For two" },
        product: { "pt-BR": "Combo casal", "en-US": "Couple combo" },
        action: { "pt-BR": "Compartilhar", "en-US": "Share" },
        price: 42.9,
        accentText: "#ffffff",
      },
    },
    {
      key: "dia-das-criancas",
      theme: "dark",
      palette: "orange",
      swatches: ["#090806", "#18140b", "#ffc000", "#2fa7b8"],
      preview: {
        badge: { "pt-BR": "Kids", "en-US": "Kids" },
        product: { "pt-BR": "Combo criança", "en-US": "Kids combo" },
        action: { "pt-BR": "Adicionar", "en-US": "Add" },
        price: 24.9,
        accentText: "#ffffff",
      },
    },
    {
      key: "natal-fim-de-ano",
      theme: "dark",
      palette: "gold",
      swatches: ["#050906", "#102016", "#ffc000", "#c73d2b"],
      preview: {
        badge: { "pt-BR": "Fim de ano", "en-US": "Year end" },
        product: { "pt-BR": "Combo celebração", "en-US": "Holiday combo" },
        action: { "pt-BR": "Reservar", "en-US": "Reserve" },
        price: 44.9,
        accentText: "#ffffff",
      },
    },
  ]);

  // TEMA | Converte valores antigos salvos para os novos temas oficiais sem mostrar temas genericos no Admin.
  const LEGACY_THEME_PRESET_MAP = Object.freeze({
    "light-clean": "tobias-lanches",
    "burger-red": "sao-joao-nordeste",
    "fresh-green": "natal-fim-de-ano",
    "acai-purple": "carnaval",
    "coffee-brown": "sao-joao-nordeste",
    "ocean-blue": "dia-dos-pais",
    "pizza-orange": "sao-joao-nordeste",
    "bakery-cream": "dia-das-maes",
    "minimal-black": "dark-premium",
    "tropical-yellow": "sao-joao-nordeste",
    "neutral-gray": "tobias-lanches",
    "pastel-soft": "dia-das-maes",
    "ice-cream-pink": "dia-das-maes",
    "rustic-wood": "sao-joao-nordeste",
    "colorblind-safe": "dia-dos-pais",
    "high-contrast": "dark-premium",
  });

  const THEME_PRESET_KEYS = new Set(
    THEME_PRESETS.map(function (preset) {
      return preset.key;
    })
  );
  function normalizeThemePreset(value) {
    const candidate = String(value || "").trim().toLowerCase();
    const compatibleCandidate = LEGACY_THEME_PRESET_MAP[candidate] || candidate;
    return THEME_PRESET_KEYS.has(compatibleCandidate) ? compatibleCandidate : "";
  }
  function getThemePresetConfig(value) {
    const key = normalizeThemePreset(value);
    return (
      THEME_PRESETS.find(function (preset) {
        return preset.key === key;
      }) || null
    );
  }
  function suggestThemePreset(appearance) {
    const explicitPreset = normalizeThemePreset(appearance?.preset);
    if (explicitPreset) {
      return explicitPreset;
    }

    const theme = appearance?.theme === "light" ? "light" : "dark";
    const palette = String(appearance?.palette || "gold").trim().toLowerCase();

    if (theme !== "dark") {
      return "tobias-lanches";
    }

    if (palette === "green") {
      return "natal-fim-de-ano";
    }

    if (palette === "red") {
      return "dia-dos-namorados";
    }

    if (palette === "purple") {
      return "carnaval";
    }

    if (palette === "brown" || palette === "orange") {
      return "sao-joao-nordeste";
    }

    if (palette === "sky" || palette === "cyan") {
      return "dia-dos-pais";
    }

    return "tobias-lanches";
  }
  function resolveAppliedAppearance(appearance) {
    const explicitPreset = getThemePresetConfig(appearance?.preset);
    if (explicitPreset) {
      return {
        preset: explicitPreset.key,
        theme: explicitPreset.theme,
        palette: explicitPreset.palette,
      };
    }

    const theme = appearance?.theme === "light" ? "light" : "dark";
    const palette = String(appearance?.palette || "gold").trim().toLowerCase() || "gold";

    if (theme === "dark" && palette === "gold") {
      return {
        preset: "tobias-lanches",
        theme,
        palette,
      };
    }

    return {
      preset: "",
      theme,
      palette,
    };
  }
  // IDIOMA | Entrega traducao, fallback e leitura de textos por localidade para publico e Admin usarem igual.
  function createLocaleTools(config) {
    const messages = config?.messages || {};
    const getSupportedLocales = config?.getSupportedLocales || function () { return {}; };
    const getDefaultLocale = config?.getDefaultLocale || function () { return "pt-BR"; };
    const getCurrentLocale = config?.getCurrentLocale || getDefaultLocale;
    function resolveLocale(locale) {
      const supported = getSupportedLocales();
      const candidate = String(locale || "").trim();
      if (candidate && supported[candidate]) {
        return candidate;
      }

      const prefix = candidate.split("-")[0];
      return (
        Object.keys(supported).find(function (key) {
          return key.split("-")[0] === prefix;
        }) || getDefaultLocale()
      );
    }
    function rawMessage(key) {
      const locale = resolveLocale(getCurrentLocale());
      return (
        messages[locale]?.[key] ??
        messages[locale.split("-")[0]]?.[key] ??
        messages["pt-BR"]?.[key] ??
        key
      );
    }
    function translate(key, params) {
      const template = rawMessage(key);
      if (Array.isArray(template)) {
        return template;
      }

      return String(template).replace(/\{\{(\w+)\}\}/g, function (_, token) {
        return params && params[token] != null ? String(params[token]) : "";
      });
    }
    function textValue(value, locale) {
      if (value == null) {
        return "";
      }

      if (typeof value !== "object" || Array.isArray(value)) {
        return String(value);
      }

      const activeLocale = resolveLocale(locale || getCurrentLocale());
      const fallbackLocale = resolveLocale(getDefaultLocale());
      const variants = [
        activeLocale,
        activeLocale.split("-")[0],
        fallbackLocale,
        fallbackLocale.split("-")[0],
      ];

      for (let index = 0; index < variants.length; index += 1) {
        const key = variants[index];
        if (key && Object.prototype.hasOwnProperty.call(value, key)) {
          return String(value[key] || "");
        }
      }

      return String(Object.values(value)[0] || "");
    }
    function listValue(value, locale) {
      if (Array.isArray(value)) {
        return value.map(function (item) {
          return String(item || "");
        });
      }

      if (value && typeof value === "object") {
        const activeLocale = resolveLocale(locale || getCurrentLocale());
        const fallbackLocale = resolveLocale(getDefaultLocale());
        const variants = [
          activeLocale,
          activeLocale.split("-")[0],
          fallbackLocale,
          fallbackLocale.split("-")[0],
        ];

        for (let index = 0; index < variants.length; index += 1) {
          const key = variants[index];
          if (key && Array.isArray(value[key])) {
            return value[key].map(function (item) {
              return String(item || "");
            });
          }
        }
      }

      return [];
    }

    return {
      resolveLocale,
      rawMessage,
      translate,
      textValue,
      listValue,
    };
  }

  window.TemplateShared = {
    byId,
    clone,
    createLocaleTools,
    escapeHtml,
    formatCurrency,
    getThemePresetConfig,
    getThemePresets: function () {
      return clone(THEME_PRESETS);
    },
    loadStorageValue,
    normalizePhone,
    normalizeThemePreset,
    removeStorageValue,
    resolveAppliedAppearance,
    saveStorageValue,
    showPageTransitionLoading,
    finishPageTransitionAfterVisualReady,
    setupPageTransition,
    sha256,
    slugify,
    suggestThemePreset,
    uniqueLines,
  };
})();
