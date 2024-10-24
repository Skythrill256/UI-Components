import path from "path";
import { Config } from "../config";
import {
  registryBaseColorSchema,
  registryIndexSchema,
  registryItemWithContentSchema,
  registryWithContentSchema,
  stylesSchema,
} from "./schema"
import { HttpsProxyAgent } from "https-proxy-agent"
import fetch from "node-fetch"


