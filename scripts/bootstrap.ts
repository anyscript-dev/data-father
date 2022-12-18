import chalk from 'chalk'
import fsExtra from 'fs-extra'
import path from 'path'
import { PATHS, SCRIPTS } from './internal/constants'
import { getProjectName, getVersion } from './internal/utils'

async function bootstrap() {
  const args = process.argv.slice(2)

  const force = args.includes('force') || args.includes('--force')

  const root = PATHS.ROOT
  const pkgDir = path.join(root, 'packages')
  const pkgs = await fsExtra.readdir(pkgDir)
  for (const pkg of pkgs) {
    if (pkg.charAt(0) === '.') continue
    if (!(await fsExtra.stat(path.join(pkgDir, pkg))).isDirectory()) continue
    await bootstrapPkg({
      pkgDir,
      pkg,
    })
  }

  async function bootstrapPkg({
    pkgDir,
    pkg,
  }: {
    pkgDir: string
    pkg: string
  }) {
    const targetPkgDir = path.join(pkgDir, pkg)
    if (!force && fsExtra.existsSync(path.join(targetPkgDir, 'package.json'))) {
      console.log(`${pkg} exists`)
    } else {
      const projectName = getProjectName(pkg)
      // package.json
      const pkgPkgJSONPath = path.join(targetPkgDir, 'package.json')
      const hasPkgJSON = fsExtra.existsSync(pkgPkgJSONPath)
      const pkgPkgJSON = hasPkgJSON ? require(pkgPkgJSONPath) : {}
      await fsExtra.writeJSON(
        pkgPkgJSONPath,
        Object.assign(
          {
            name: projectName,
            version: getVersion(),
            description: projectName,
            main: 'dist/index.js',
            types: 'dist/index.d.ts',
            files: ['dist'],
            scripts: {
              build: SCRIPTS.BUILD,
              dev: SCRIPTS.DEV,
            },
            repository: {
              type: 'git',
              url: 'https://github.com/anyscript-dev/data-father',
            },
            authors: ['ahwgs <ah_wgs@126.com> (https://github.com/ahwgs)'],
            license: 'MIT',
            bugs: 'https://github.com/anyscript-dev/data-father/issues',
            homepage: `https://github.com/anyscript-dev/data-father/tree/master/packages/${pkg}#readme`,
            publishConfig: {
              access: 'public',
            },
          },
          {
            ...(hasPkgJSON
              ? {
                  authors: pkgPkgJSON.authors,
                  bin: pkgPkgJSON.bin,
                  files: pkgPkgJSON.files,
                  scripts: pkgPkgJSON.scripts,
                  description: pkgPkgJSON.description,
                  dependencies: pkgPkgJSON.dependencies,
                  devDependencies: pkgPkgJSON.devDependencies,
                  compiledConfig: pkgPkgJSON.compiledConfig,
                }
              : {}),
          },
        ),
        { spaces: '  ' },
      )

      // README.md
      await fsExtra.writeFile(
        path.join(targetPkgDir, 'README.md'),
        `# ${projectName}\n\nSee our website [data-father](https://github.com/anyscript-dev/data-father) for more information.`,
        'utf-8',
      )

      // tsconfig.json
      await fsExtra.writeJSON(
        path.join(targetPkgDir, 'tsconfig.json'),
        Object.assign({
          extends: '../../tsconfig.base.json',
          compilerOptions: {
            outDir: './dist',
            rootDir: './src',
          },
          include: ['src'],
        }),
        { spaces: '  ' },
      )

      // .fatherrc.ts
      await fsExtra.writeFile(
        path.join(targetPkgDir, '.fatherrc.ts'),
        `import { defineConfig } from 'father';
    
    export default defineConfig({
      extends: '../../.fatherrc.base.ts',
    });\n`,
        'utf-8',
      )

      // src/index.ts
      const srcDir = path.join(targetPkgDir, 'src')
      if (!fsExtra.existsSync(srcDir)) {
        await fsExtra.mkdir(srcDir)
      }

      if (!fsExtra.existsSync(path.join(targetPkgDir, 'src', 'index.ts'))) {
        await fsExtra.writeFile(
          path.join(targetPkgDir, 'src', 'index.ts'),
          `
export default (): string => {
  return '${projectName}';
};\n`.trimLeft(),
          'utf-8',
        )

        await fsExtra.writeFile(
          path.join(targetPkgDir, 'src', 'index.test.ts'),
          `
import index from './index';

test('normal', () => {
  expect(index()).toEqual('${projectName}');
});\n`.trimLeft(),
          'utf-8',
        )
      }

      console.log(chalk.green(`${pkg} bootstrapped`))
    }
  }
}

bootstrap()
