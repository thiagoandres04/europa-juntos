# Europa juntos

Registro de gastos para un viaje en pareja, en español y adaptable a celulares.

Web: https://europa-juntos-thiago.soaringfoam1.chatgpt.site

## Funciones

- Gastos por persona, fecha, ciudad y categoría.
- Crédito, débito y efectivo.
- Gastos personales o compartidos, con reparto por mitades.
- Totales, presupuesto opcional, filtros y exportación CSV.
- Persistencia en Cloudflare D1.

## Desarrollo

Requiere Node.js >= 22.13.0 y npm.

```sh
npm ci
npm run build
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_lame_johnny_storm.sql
npm run dev
```

El servidor muestra su URL local al iniciar. La base local es independiente de producción.

```sh
npx tsc --noEmit
npm run build
```

## Hosting y datos

La aplicación usa Vinext, React, Drizzle y Cloudflare Workers. La configuración de Sites está en `.openai/hosting.json`. Publicar código en este repositorio no despliega automáticamente la web.

El sitio es público y la API actual utiliza un registro de viaje compartido: cualquier visitante puede consultar y modificar los gastos. No almacena números ni credenciales de tarjetas, solo el medio de pago. Si se necesita limitar quién puede ver o editar, hay que configurar acceso privado o implementar autenticación y autorización antes de cargar información sensible.

Este repositorio contiene el código y las migraciones, sin gastos reales, base de datos, credenciales ni archivos de ejecución local.
