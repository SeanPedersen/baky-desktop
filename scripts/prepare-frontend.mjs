/** Stage desktop configuration and browser runtime assets for the Cinny frontend. */

import { copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const frontendDirectory = path.resolve("cinny");
const wasmFileName = "matrix_sdk_crypto_wasm_bg.wasm";

function copyDesktopConfig() {
  copyFileSync(path.resolve("config.json"), path.join(frontendDirectory, "config.json"));
}

function copyMatrixCryptoWasm() {
  const packageEntry = require.resolve("@matrix-org/matrix-sdk-crypto-wasm");
  const packageDirectory = path.dirname(packageEntry);
  const sourcePath = path.join(packageDirectory, "pkg", wasmFileName);
  const destinationPath = path.join(
    frontendDirectory,
    "node_modules",
    "@matrix-org",
    "matrix-sdk-crypto-wasm",
    "pkg",
    wasmFileName
  );

  mkdirSync(path.dirname(destinationPath), { recursive: true });
  copyFileSync(sourcePath, destinationPath);
}

copyDesktopConfig();
copyMatrixCryptoWasm();
