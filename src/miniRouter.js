const routes = [];

export function get(path, handler) {
  routes.push({ method: "GET", path, handler });
}

export function post(path, handler) {
  routes.push({ method: "POST", path, handler });
}

// compara rutas tipo /users/:id
function matchRoute(routePath, urlPath) {
  const routeParts = routePath.split("/");
  const urlParts = urlPath.split("/");

  if (routeParts.length !== urlParts.length) return null;

  const params = {};

  for (let i = 0; i < routeParts.length; i++) {
    if (routeParts[i].startsWith(":")) {
      const key = routeParts[i].slice(1);
      params[key] = urlParts[i];
    } else if (routeParts[i] !== urlParts[i]) {
      return null;
    }
  }

  return params;
}

export function handleRoutes(req, res, body) {
  const urlPath = req.url.split("?")[0];

  for (const route of routes) {
    if (route.method !== req.method) continue;

    const params = matchRoute(route.path, urlPath);

    if (params) {
      req.params = params;

      route.handler(req, res, body); // ejecuta la ruta

      return true; // 👈 IMPORTANTE: después de ejecutar
    }
  }

  return false;
}
