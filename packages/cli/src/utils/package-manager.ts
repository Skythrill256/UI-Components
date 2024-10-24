import { detect } from '@antfu/ni'

export const getPackageManager = async (
  targetDir: string
): Promise<"yarn" | "pnpm" | "npm" | "bun"> => {
  const packageManager = await detect({ programmatic: true, cwd: targetDir })

  return packageManager === 'yarn@berry' ? "yarn" :
    packageManager === 'pnpm@6' ? "pnpm" :
      packageManager === 'bun' ? "bun" :
        packageManager ?? "npm";
}
