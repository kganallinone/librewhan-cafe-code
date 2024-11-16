import { Application } from "express";
import createProxyMiddleware from "http-proxy-middleware";

export default function (app: Application) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://ap-southeast-1.aws.data.mongodb-api.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // Remove /api from the path
      },
    })
  );
}
