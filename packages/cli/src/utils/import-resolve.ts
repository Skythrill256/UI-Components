import { createMatchPath, type ConfigLoaderSuccessResult } from 'tsconfig-paths'

export const resolveImport = (
  importPath: string,
  config: Pick<ConfigLoaderSuccessResult, "absoluteBaseUrl" | "paths">
) => {
  return createMatchPath(config.absoluteBaseUrl, config.paths)(
    importPath,
    undefined,
    () => true,
    [".ts", ".tsx"]
  )
}
