(function () {
  const shared = window.TemplateShared;

  if (!shared) {
    return;
  }

  const REMOTE_SESSION_KEY = "template-cardapio-supabase-session-v1";

  function buildAuthBaseUrl(cloudConfig) {
    return String(cloudConfig?.url || "").replace(/\/+$/, "");
  }

  function buildAuthUrl(cloudConfig, path) {
    const normalizedPath = String(path || "").replace(/^\/+/, "");
    return new URL(`/auth/v1/${normalizedPath}`, buildAuthBaseUrl(cloudConfig) + "/").toString();
  }

  function normalizeRemoteSession(payload) {
    const session = payload?.session || payload;
    if (!session?.access_token) {
      return null;
    }

    const expiresAtMs = Number.isFinite(Number(session?.expires_at))
      ? Number(session.expires_at) * 1000
      : Date.now() + Math.max(Number(session?.expires_in || 0), 0) * 1000;

    return {
      access_token: String(session.access_token || ""),
      token_type: String(session.token_type || "bearer"),
      expires_at: expiresAtMs,
      user: session?.user || payload?.user || null,
    };
  }

  function loadRemoteSession() {
    const session = shared.loadStorageValue(REMOTE_SESSION_KEY, null, "session");
    return session && typeof session === "object" ? session : null;
  }

  function saveRemoteSession(session) {
    shared.saveStorageValue(REMOTE_SESSION_KEY, session, "session");
    return session;
  }

  function clearRemoteSession() {
    shared.removeStorageValue(REMOTE_SESSION_KEY, "session");
  }

  function isRemoteSessionValid(session) {
    return Boolean(session?.access_token && Number(session?.expires_at) > Date.now() + 5000);
  }

  async function requestSupabaseAuth(cloudConfig, path, options) {
    if (!cloudConfig?.url || !cloudConfig?.anonKey) {
      throw new Error("Supabase não está configurado. Confira a URL e a chave pública do projeto.");
    }

    const response = await fetch(buildAuthUrl(cloudConfig, path), {
      ...options,
      headers: {
        apikey: String(cloudConfig?.anonKey || ""),
        ...(options?.headers || {}),
      },
    });

    const raw = await response.text().catch(function () {
      return "";
    });

    let payload = null;
    try {
      payload = raw ? JSON.parse(raw) : null;
    } catch (error) {
      payload = null;
    }

    if (!response?.ok) {
      const message =
        payload?.msg ||
        payload?.error_description ||
        payload?.error ||
        `Não foi possível autenticar no Supabase (${response?.status}).`;
      const authError = new Error(String(message || "Não foi possível autenticar no Supabase."));
      authError.status = response?.status;
      throw authError;
    }

    return payload;
  }

  async function signInWithSupabase(cloudConfig, email, password) {
    const payload = await requestSupabaseAuth(cloudConfig, "token?grant_type=password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: String(email || "").trim(),
        password: String(password || ""),
      }),
    });

    const session = normalizeRemoteSession(payload);
    if (!session) {
      throw new Error("Sessão do Supabase inválida.");
    }

    return saveRemoteSession(session);
  }

  async function verifySupabaseSession(cloudConfig) {
    const session = loadRemoteSession();
    if (!isRemoteSessionValid(session)) {
      clearRemoteSession();
      throw new Error("Sessão do Supabase ausente ou expirada.");
    }

    const user = await requestSupabaseAuth(cloudConfig, "user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    return saveRemoteSession({
      ...session,
      user: user || session?.user || null,
    });
  }

  function getSupabaseSession() {
    const session = loadRemoteSession();
    return isRemoteSessionValid(session) ? session : null;
  }

  function getSupabaseAccessToken() {
    return getSupabaseSession()?.access_token || "";
  }

  function getSupabaseUser() {
    return getSupabaseSession()?.user || null;
  }

  function isSupabaseAuthenticated() {
    return Boolean(getSupabaseSession()?.access_token);
  }

  function createAuthHelpers(config) {
    const keys = {
      passwordHash: "template-cardapio-admin-password-hash-v1",
      session: "template-cardapio-admin-session-v1",
      ...(config?.keys || {}),
    };
    const sessionDurationMs = Number(config?.sessionDurationMs || 30 * 60 * 1000);

    function hasPassword() {
      return Boolean(shared.loadStorageValue(keys.passwordHash, "", "local"));
    }

    async function savePassword(password) {
      const hash = await shared.sha256(password);
      shared.saveStorageValue(keys.passwordHash, hash, "local");
      return hash;
    }

    async function validatePassword(password) {
      const stored = String(shared.loadStorageValue(keys.passwordHash, "", "local") || "");
      if (!stored) {
        return false;
      }
      return (await shared.sha256(password)) === stored;
    }

    function createSession() {
      const payload = {
        authenticated: true,
        expiresAt: Date.now() + sessionDurationMs,
      };
      shared.saveStorageValue(keys.session, payload, "session");
      return payload;
    }

    function getSession() {
      return shared.loadStorageValue(keys.session, null, "session");
    }

    function isAuthenticated() {
      const session = getSession();
      return Boolean(session?.authenticated && Number(session.expiresAt) > Date.now());
    }

    function renewSession() {
      return isAuthenticated() ? createSession() : null;
    }

    function logout() {
      shared.removeStorageValue(keys.session, "session");
      clearRemoteSession();
    }

    return {
      hasPassword,
      savePassword,
      validatePassword,
      createSession,
      getSession,
      isAuthenticated,
      renewSession,
      logout,
      signInWithSupabase,
      verifySupabaseSession,
      getSupabaseSession,
      getSupabaseAccessToken,
      getSupabaseUser,
      isSupabaseAuthenticated,
      clearSupabaseSession: clearRemoteSession,
    };
  }

  window.TemplateAdminAuth = {
    createAuthHelpers,
    getSupabaseSession,
    getSupabaseAccessToken,
    getSupabaseUser,
    isSupabaseAuthenticated,
    clearSupabaseSession: clearRemoteSession,
  };
})();
