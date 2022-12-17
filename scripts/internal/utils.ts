import { PATHS } from "./constants"

/**
 * 获取通用包名
 * @param pkgName
 * @returns
 */
export function getProjectName(pkgName: string): string {
  if (['anyscript'].includes(pkgName)) {
    return pkgName
  } else {
    return `@anyscript/data-father-${pkgName}`
  }
}

/**
 * 获取当前整体版本号
 */
export function getVersion(): string {
  return require(PATHS.VERSION_CONFIG).version
}
