import { findBack } from '@fsnjs/node/path';

export function findProjectConfig(
    filename: string = 'mdconfig.json',
    path?: string
) {
    return findBack(filename, path);
}
