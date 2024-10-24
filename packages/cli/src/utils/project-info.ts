import { existsSync } from "fs";
import path from "path";
import { getConfig, RawConfig, Config, resolveConfigPaths } from "./config";
import fg, { async } from 'fast-glob'
import fs, { pathExists } from 'fs-extra'
import { loadConfig } from "tsconfig-paths";

const PROJECT_TYPES = [
  "next-app",
  "next-app-src",
  "next-pages",
  "next-pages-src",
] as const

type ProjectType = (typeof PROJECT_TYPES)[number]


const PROJECT_SHARED_IGNORE = [
  "**/node_modules/**",
  ".next",
  "public",
  "dist",
  "build",
]

export const getProjectInfo = async () => {
  const info = {
    tsconfig: null,
    srcDir: false,
    appDir: false,
    srcComponentsUiDir: false,
    componentsUiDir: false,
  }
  try {
    const tsconfig = await getTsConfig()
    return {
      tsconfig,
      srcDir: existsSync(path.resolve("./src")),
      appDir: existsSync(path.resolve("./src/app")) ||
        existsSync(path.resolve("./app")),

      srcComponentsUiDir: existsSync(path.resolve("./src/components/ui")),
      componentsUiDir: existsSync(path.resolve("./components/ui")),

    }
  } catch (error) {
    return info
  }
}

export const getTsConfig = async () => {
  try {
    const tsconfigPath = path.join("tsconfig.json")
    const tsconfig = await fs.readJSON(tsconfigPath)

    if (!tsconfig) {
      throw new Error("tsconfig.json is missing")
    }

    return tsconfig
  } catch (error) {
    return null
  }
}

export const getProjectConfig = async (cwd: string): Promise<Config | null> => {
  const existingConfig = await getConfig(cwd)
  if (existingConfig) {
    return existingConfig
  }

  const projectType = await getProjectType(cwd)
  const tailwindCssFile = await getTailwindCssFile(cwd)
  const tsConfigAliasPrefix = await getTsConfigAliasPrefix(cwd)

  if (!projectType || !tailwindCssFile || !tsConfigAliasPrefix) {
    return null
  }

  const isTsx = await isTypeScriptProject(cwd)
  const config: RawConfig = {
    $schema: "https://ui.shadcn.com/schema.json",
    rsc: ["next-app", "next-app-src"].includes(projectType),
    tsx: isTsx,
    style: "new-york",
    tailwind: {
      config: isTsx ? "tailwind.config.ts" : "tailwind.config.js",
      css: tailwindCssFile,
      cssVariables: true,
      prefix: "",
      baseColor: "zinc",
    },
    aliases: {
      utils: `${tsConfigAliasPrefix}/lib/utils`,
      components: `${tsConfigAliasPrefix}/components`,
    },
    registries: [
      {
        name: "shadcn",
        baseUrl: "https://ui.shadcn.com",
      },
      {
        name: "ladddr",
        baseUrl: "https://ladddr.com",
      }
    ],
  }
  return await resolveConfigPaths(cwd, config)
}

export const getProjectType = async (cwd: string): Promise<ProjectType | null> => {
  const files = await fg.glob("**/*", {
    cwd,
    deep: 3,
    ignore: PROJECT_SHARED_IGNORE,
  })

  const isNextProject = files.find((file) => {
    file.startsWith("next.config")
  })

  if (!isNextProject) {
    return null
  }

  const isUsingSrcDir = await fs.pathExists(path.resolve(cwd, "src"))
  const isUsingAppDir = await fs.pathExists(
    path.resolve(cwd, `${isUsingSrcDir ? "src/" : ""}app`)
  )

  if (isUsingAppDir) {
    return isUsingSrcDir ? "next-app-src" : "next-app"
  }

  return isUsingSrcDir ? "next-pages-src" : "next-pages"

}

export const getTailwindCssFile = async (cwd: string) => {
  const files = await fg.glob("**/*.css", {
    cwd,
    deep: 3,
    ignore: PROJECT_SHARED_IGNORE
  })
  if (!files.length) {
    return null
  }
  for (const file of files) {
    const contents = await fs.readFile(path.resolve(cwd, file), "utf8")
    if (contents.includes("@tailwind base")) {
      return file
    }
  }
  return null
}

export async function getTsConfigAliasPrefix(cwd: string) {
  const tsConfig = await loadConfig(cwd)

  if (tsConfig?.resultType === "failed" || !tsConfig?.paths) {
    return null
  }

  for (const [alias, paths] of Object.entries(tsConfig.paths)) {
    if (paths.includes("./*") || paths.includes("./src/*")) {
      return alias.at(0)
    }
  }

  return null
}

export async function isTypeScriptProject(cwd: string) {
  return pathExists(path.resolve(cwd, "tsconfig.json"))
}

export async function preFlight(cwd: string) {
  const tailwindConfig = await fg.glob("tailwind.config.*", {
    cwd,
    deep: 3,
    ignore: PROJECT_SHARED_IGNORE,
  })

  if (!tailwindConfig.length) {
    throw new Error(
      "Tailwind CSS is not installed. Visit https://tailwindcss.com/docs/installation to get started."
    )
  }

  return true
}
