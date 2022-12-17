import { join } from 'path';

const ROOT = join(__dirname, '../../');
export const PATHS = {
  ROOT,
  PACKAGES: join(ROOT, './packages'),
  VERSION_CONFIG: join(ROOT, './version.json'),
} as const;

export const SCRIPTS = {
  DEV: 'data-father-script father dev',
  BUILD: 'data-father-script father build',
} as const;
