import { app, protocol } from "electron";
import type { FastifyInstance, HTTPMethods } from "fastify";

export type RegisterProtocolOptions = {
  scheme: string;
  server: FastifyInstance;
};

export async function registerProtocol(
  { scheme, server }: RegisterProtocolOptions,
) {
  await app.whenReady();

  if (protocol.isProtocolRegistered(scheme)) {
    return;
  }

  protocol.registerBufferProtocol(scheme, async function (request, callback) {
    const url = request.url.replace(`${scheme}://`, "");
    const response = await server.inject({
      method: request.method as HTTPMethods,
      url,
      headers: request.headers,
      payload: request.uploadData,
    });

    callback({
      url,
      data: response.rawPayload,
      headers: response.headers as Record<string, string | string[]>,
      statusCode: response.statusCode,
      referrer: request.referrer,
    });
  });
}
