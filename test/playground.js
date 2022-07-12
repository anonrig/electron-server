const { app, BrowserWindow } = require("electron");
const path = require("node:path");
const { registerProtocol } = require("../dist/electron-server.umd");
const fastify = require("fastify");

const server = fastify({
  ignoreTrailingSlash: true,
});
server.get(
  "/hello-world",
  (request, reply) =>
    reply.type("text/html").send(
      '<a href="my-protocol://get-status">Get status</a>',
    ),
);
server.get("/get-status", (request, reply) => reply.send({ status: true }));

registerProtocol({
  scheme: "my-protocol",
  server,
});

app.whenReady().then(() => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadURL("my-protocol://hello-world");
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
