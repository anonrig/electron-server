## Electron Server

A super-fast and easy-to-use library to use Fastify, and it's ecosystem inside an Electron application without the need of exposing (and consuming) a port.

### Use-cases

- Running GraphQL in your Electron application.
- Running Next.js using `fastify-nextjs` to create `chrome://extensions` like pages for your Electron app
- Communication between main and renderer process using HTTP methods
- Static file (assets) sharing between renderer process and the main process


### Install

To install `electron-server` in an existing project as a dependency:

Install with npm:
```sh
npm i electron-server
```
Install with pnpm:
```sh
pnpm add electron-server
```

### Example

```js
// Require fastify and instantiate it.
const Fastify = require('fastify')
const server = Fastify({ ignoreTrailingSlash: true })
server.get('/hello-world', () => ({ hello: 'world' }))

// Require registerProtocol and call it on your root file.
const { registerProtocol } = require('electron-server')

// Register custom scheme to Electron
registerProtocol({
  scheme: 'my-scheme',
  server,
})

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });
  
  // Visit the custom scheme
  win.loadURL("my-protocol://hello-world");
});
```

Do you want to run the example? Head to the <a
href="./test/playground.js"><code><b>Playground</b></code></a>.
