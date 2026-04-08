import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix Turbopack workspace root detection when a parent package-lock.json exists
  turbopack: {
    root: __dirname,
  },
}

export default nextConfig
