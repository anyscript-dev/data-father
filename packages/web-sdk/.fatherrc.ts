import { defineConfig } from 'father'

export default defineConfig({
  extends: '../../.fatherrc.base.ts',
  esm: {
    input: 'src',
    platform: 'browser',
    transformer: 'babel',
  },
})
