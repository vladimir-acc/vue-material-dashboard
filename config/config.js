let api;
if (process.env.NODE_ENV === "development") {
  api = {
    port: 3003,
    host: "127.0.0.1",
  };
} else {
  api = {
    port: 3004,
    host: "admin_inosvita.devweb.pp.ua",
  };
}

module.exports = api;
