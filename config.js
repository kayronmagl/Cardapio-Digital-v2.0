window.PUBLIC_CLOUD_CONFIG = {
  enabled: true,
  provider: "supabase",
  realtime: true,
  url: "https://ffnurwfuwjsyzrmyjskv.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmbnVyd2Z1d2pzeXpybXlqc2t2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NjU4ODAsImV4cCI6MjA4OTA0MTg4MH0.AMgL0tlaQZOK4HyBXAEMHG46XaTNw1eopLX-2GFtDCA",
  schema: "public",
  tables: {
    categories: "menu_categories",
    products: "menu_products",
    addOns: "menu_add_ons",
    productAddOns: "menu_product_add_ons",
    settings: "menu_settings",
  },
  storage: {
    bucket: "product-images",
  },
};
