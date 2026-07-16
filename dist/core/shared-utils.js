(function () {
 // ESTADO | armazenamento busca um valor de estado salvo. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function getStorage(mode) {
    try {
      return mode === "session" ? window.sessionStorage : window.localStorage;
    } catch (error) {
      return null;
    }
  }
 // TRATAMENTO | regra prepara dados de tratamento de dados. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function clone(value) {
    if (value === undefined) {
      return undefined;
    }
    return JSON.parse(JSON.stringify(value));
  }
 // ESTADO | armazenamento regra conversa com estado salvo. A logica monta a requisicao, interpreta resposta e mantem fallback local quando a parte externa falha.
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
 // ESTADO | armazenamento regra atualiza estado salvo. A logica muda estado, classes ou dados salvos em um ponto so para a tela responder sem espalhar alteracoes.
  function saveStorageValue(key, value, mode) {
    try {
      const raw = typeof value === "string" ? value : JSON.stringify(value);
      getStorage(mode)?.setItem(key, raw);
      return true;
    } catch (error) {
      return false;
    }
  }
 // ESTADO | remocao de valor salvo apaga uma chave do armazenamento escolhido. A logica tenta sessionStorage ou localStorage e devolve falha sem quebrar a tela.
  function removeStorageValue(key, mode) {
    try {
      getStorage(mode)?.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }
 // TRATAMENTO | protecao de texto HTML prepara dados de tratamento de dados. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
 // BASE | identificador separa uma regra de base do sistema. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function byId(id) {
    return document.getElementById(id);
  }
 // TRATAMENTO | telefone prepara dados de tratamento de dados. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function normalizePhone(phone) {
    return String(phone || "").replace(/\D/g, "");
  }
 // TRATAMENTO | codigo curto transforma texto em identificador de URL ou categoria. A logica remove acentos, limpa simbolos e usa fallback se faltar nome.
  function slugify(value, fallback) {
    const source = String(value || fallback || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    return source || String(fallback || "item");
  }
 // TRATAMENTO | unico linhas prepara dados de tratamento de dados. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
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
 // NUVEM | hash da senha separa uma regra de nuvem Supabase. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
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
 // ADMIN | moeda prepara dados de painel Admin. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function formatCurrency(value, options) {
    const locale = options?.locale || "pt-BR";
    const currency = options?.currency || "BRL";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(Number(value) || 0);
  }

  const PAGE_TRANSITION_KEY = "template-cardapio-page-transition-v1";
 // BASE | preferencia reduzido movimento separa uma regra de base do sistema. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function prefersReducedMotion() {
    return Boolean(window?.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches);
  }
 // TRATAMENTO | opcao texto separa uma regra de tratamento de dados. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function optionText(value, fallback) {
    try {
      const resolved = typeof value === "function" ? value() : value;
      return String(resolved || fallback || "").trim();
    } catch (error) {
      return String(fallback || "").trim();
    }
  }
 // EVENTOS | transicao link confere uma condicao de eventos da tela. A logica analisa os dados atuais e devolve verdadeiro ou falso para decidir se a acao continua, espera ou para.
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
 // MODAL | pagina transicao camada busca um valor de modal. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
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
      '<span class="page-transition-loader" aria-hidden="true"><span></span></span>' +
      "</div>";
    document?.body?.appendChild(overlay);
    return overlay;
  }
 // MODAL | pagina transicao camada orienta o usuario em modal. A logica decide quando focar, rolar, destacar ou avisar para deixar claro o que mudou.
  function hidePageTransitionOverlay() {
    document?.body?.classList?.remove("page-transition-active");
    const overlay = document?.getElementById("templatePageTransition");
    if (!overlay) {
      return;
    }
    overlay.setAttribute("aria-hidden", "true");
    overlay?.classList?.remove("page-transition-overlay--show");
  }
 // BASE | pagina transicao chegada atualiza base do sistema. A logica muda estado, classes ou dados salvos em um ponto so para a tela responder sem espalhar alteracoes.
  function markPageTransitionArrival() {
    let pending = false;

    try {
      pending = getStorage("session")?.getItem(PAGE_TRANSITION_KEY) === "1";
      getStorage("session")?.removeItem(PAGE_TRANSITION_KEY);
    } catch (error) {
      pending = false;
    }

    if (!pending || !document?.body) {
      return;
    }

    document.body.classList.add("page-transition-arrive");
    const clearArrival = function () {
      document?.body?.classList?.remove("page-transition-arrive");
    };

    if (prefersReducedMotion()) {
      clearArrival();
      return;
    }

    window?.setTimeout(clearArrival, 260);
  }
 // BASE | pagina transicao atualiza base do sistema. A logica muda estado, classes ou dados salvos em um ponto so para a tela responder sem espalhar alteracoes.
  function setupPageTransition(options) {
    const selector = String(options?.selector || "").trim();
    if (!selector || !document?.body) {
      return;
    }

    markPageTransitionArrival();

    window?.addEventListener("pageshow", function () {
      hidePageTransitionOverlay();
    });

    document?.addEventListener("click", function (event) {
      const anchor = event?.target?.closest?.(selector);
      if (!canTransitionLink(event, anchor)) {
        return;
      }

      event.preventDefault();
      const overlay = getPageTransitionOverlay();
      const brand = optionText(options?.brand, "");
      const message = optionText(options?.message, "Carregando...");
      const brandElement = overlay?.querySelector("[data-page-transition-brand]");
      const messageElement = overlay?.querySelector("[data-page-transition-message]");

      if (brandElement) {
        brandElement.textContent = brand;
        brandElement.hidden = !brand;
      }
      if (messageElement) {
        messageElement.textContent = message;
      }

      try {
        getStorage("session")?.setItem(PAGE_TRANSITION_KEY, "1");
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
    },
    {
      key: "dark-premium",
      theme: "dark",
      palette: "gold",
      swatches: ["#0f172a", "#111827", "#1f2937", "#f4b903"],
    },
    {
      key: "light-clean",
      theme: "light",
      palette: "orange",
      swatches: ["#f7f8f6", "#ffffff", "#edf1ef", "#4f7892"],
    },
    {
      key: "burger-red",
      theme: "dark",
      palette: "orange",
      swatches: ["#1b1110", "#271715", "#34201d", "#c76d48"],
    },
    {
      key: "fresh-green",
      theme: "dark",
      palette: "green",
      swatches: ["#0d1f17", "#162c21", "#20382a", "#768f46"],
    },
    {
      key: "acai-purple",
      theme: "dark",
      palette: "purple",
      swatches: ["#241033", "#32164a", "#4a1d6f", "#c084fc"],
    },
    {
      key: "coffee-brown",
      theme: "dark",
      palette: "brown",
      swatches: ["#120b07", "#21140d", "#3a2416", "#d09a61"],
    },
    {
      key: "ocean-blue",
      theme: "dark",
      palette: "sky",
      swatches: ["#0d1a21", "#162a34", "#1f3742", "#5688a2"],
    },
    {
      key: "pizza-orange",
      theme: "dark",
      palette: "orange",
      swatches: ["#241407", "#39200d", "#593416", "#df9144"],
    },
    {
      key: "bakery-cream",
      theme: "light",
      palette: "brown",
      swatches: ["#f6f1e8", "#fbf8f2", "#f1e8da", "#b88a56"],
    },
    {
      key: "minimal-black",
      theme: "dark",
      palette: "gold",
      swatches: ["#0a0b0d", "#16171a", "#212328", "#cfd6d5"],
    },
    {
      key: "tropical-yellow",
      theme: "dark",
      palette: "gold",
      swatches: ["#1f1a0a", "#30260d", "#45350f", "#facc15"],
    },
    {
      key: "neutral-gray",
      theme: "light",
      palette: "blue",
      swatches: ["#edf0f1", "#f9faf9", "#e1e5e7", "#5e6872"],
    },
    {
      key: "pastel-soft",
      theme: "light",
      palette: "purple",
      swatches: ["#f4f0fa", "#fffaff", "#ebe4f5", "#8b7bb5"],
    },
    {
      key: "ice-cream-pink",
      theme: "light",
      palette: "red",
      swatches: ["#fcf3f4", "#fffdfd", "#faecee", "#c37792"],
    },
    {
      key: "rustic-wood",
      theme: "dark",
      palette: "brown",
      swatches: ["#19180f", "#272417", "#3d3820", "#9a8b59"],
    },
    {
      key: "colorblind-safe",
      theme: "dark",
      palette: "sky",
      swatches: ["#111827", "#1f2937", "#374151", "#38bdf8"],
    },
    {
      key: "high-contrast",
      theme: "dark",
      palette: "gold",
      swatches: ["#000000", "#111111", "#1f1f1f", "#facc15"],
    },
  ]);

  const THEME_PRESET_KEYS = new Set(
    THEME_PRESETS.map(function (preset) {
      return preset.key;
    })
  );
 // TEMA | tema preset prepara dados de tema visual. A logica remove valor vazio, formato estranho ou texto perigoso antes de salvar, comparar ou mostrar.
  function normalizeThemePreset(value) {
    const candidate = String(value || "").trim().toLowerCase();
    return THEME_PRESET_KEYS.has(candidate) ? candidate : "";
  }
 // TEMA | tema preset ajuste busca um valor de tema visual. A logica tenta o dado salvo, usa um fallback quando falta informacao e entrega algo seguro para tela ou outra regra.
  function getThemePresetConfig(value) {
    const key = normalizeThemePreset(value);
    return (
      THEME_PRESETS.find(function (preset) {
        return preset.key === key;
      }) || null
    );
  }
 // TEMA | sugestao tema preset separa uma regra de tema visual. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
  function suggestThemePreset(appearance) {
    const explicitPreset = normalizeThemePreset(appearance?.preset);
    if (explicitPreset) {
      return explicitPreset;
    }

    const theme = appearance?.theme === "light" ? "light" : "dark";
    const palette = String(appearance?.palette || "gold").trim().toLowerCase();

    if (theme !== "dark") {
      return "light-clean";
    }

    if (palette === "green") {
      return "fresh-green";
    }

    if (palette === "red") {
      return "burger-red";
    }

    if (palette === "purple") {
      return "acai-purple";
    }

    if (palette === "brown" || palette === "orange") {
      return "coffee-brown";
    }

    if (palette === "sky" || palette === "cyan") {
      return "ocean-blue";
    }

    return "tobias-lanches";
  }
 // BASE | aplicado aparencia separa uma regra de base do sistema. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
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
 // IDIOMA | idioma ferramentas monta uma estrutura de idioma. A logica junta partes soltas em um formato unico para renderizar, salvar ou enviar.
  function createLocaleTools(config) {
    const messages = config?.messages || {};
    const getSupportedLocales = config?.getSupportedLocales || function () { return {}; };
    const getDefaultLocale = config?.getDefaultLocale || function () { return "pt-BR"; };
    const getCurrentLocale = config?.getCurrentLocale || getDefaultLocale;
 // IDIOMA | idioma separa uma regra de idioma. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
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
 // IDIOMA | original mensagem separa uma regra de idioma. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
    function rawMessage(key) {
      const locale = resolveLocale(getCurrentLocale());
      return (
        messages[locale]?.[key] ??
        messages[locale.split("-")[0]]?.[key] ??
        messages["pt-BR"]?.[key] ??
        key
      );
    }
 // IDIOMA | traducao separa uma regra de idioma. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
    function translate(key, params) {
      const template = rawMessage(key);
      if (Array.isArray(template)) {
        return template;
      }

      return String(template).replace(/\{\{(\w+)\}\}/g, function (_, token) {
        return params && params[token] != null ? String(params[token]) : "";
      });
    }
 // IDIOMA | texto regra separa uma regra de idioma. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
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
 // IDIOMA | lista regra separa uma regra de idioma. A logica deixa esse comportamento isolado para outras partes chamarem sem repetir codigo.
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
    setupPageTransition,
    sha256,
    slugify,
    suggestThemePreset,
    uniqueLines,
  };
})();
