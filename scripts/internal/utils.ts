import type { SpawnSyncOptions, SpawnSyncReturns } from 'child_process'
import spawn from 'cross-spawn'
import { PATHS } from './constants'
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

/**
 * 执行 script
 * @param cmd
 * @param opts
 * @returns
 */
export function spawnSync(
  cmd: string,
  opts: SpawnSyncOptions,
): SpawnSyncReturns<any> {
  const result = spawn.sync(cmd, {
    shell: true,
    stdio: 'inherit',
    ...opts,
  })
  if (result.status !== 0) {
    console.error(`Execute command error (${cmd})`)
    process.exit(1)
  }
  return result
}
