Mini HTTP Framework — Node.js nativo
Framework HTTP construido desde cero sin dependencias externas, con routing dinámico, controladores y persistencia en memoria.

Node.js v22 ESModules sin Express
¿Qué hace este proyecto?
Implementa un servidor HTTP con las mismas ideas de Express — rutas, parámetros dinámicos (:id), controladores separados — pero usando únicamente el módulo http nativo de Node.js. El objetivo es entender cómo funcionan los frameworks por dentro antes de depender de ellos.
Arquitectura
src/
├── index.js → servidor HTTP, parseo de body, fallback 404
├── miniRouter.js → registro de rutas GET/POST y matching con parámetros
├── routes/
│ └── userRoutes.js → declara las rutas del recurso users
├── controllers/
│ └── userController.js → lógica de negocio: getUsers, getUserById, createUser
└── data/
└── users.js → persistencia en memoria (array) ## Endpoints

| Método | Ruta         | Descripción                                     |
| ------ | ------------ | ----------------------------------------------- |
| GET    | `/users`     | Lista todos los usuarios                        |
| GET    | `/users/:id` | Obtiene un usuario por ID                       |
| POST   | `/users`     | Crea un usuario — requiere `{ "name": string }` |

## Cómo correrlo

```bash
git clone git@github.com:melendezfer/proyecto-git-demo.git
cd proyecto-git-demo
npm install
npm start
```

El servidor queda disponible en `http://localhost:3000`.

### Ejemplos con curl

```bash
# Listar usuarios
curl http://localhost:3000/users

# Obtener usuario por ID
curl http://localhost:3000/users/1

# Crear usuario
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Fernando"}'
```

## Decisiones técnicas

- Sin Express ni Fastify — routing implementado manualmente para entender el núcleo
- ESModules (`type: "module"`) en lugar de CommonJS
- Separación en capas: rutas → controladores → datos
- Validación de body con respuestas de error explícitas (400/404)
- ESLint configurado para Node.js moderno

## Próximas mejoras

- Soporte para PUT y DELETE
- Persistencia real con SQLite o archivo JSON
- Middleware de logging por request
- Tests con Node Test Runner nativo
  EOF
