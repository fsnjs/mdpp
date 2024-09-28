import { findBack } from '@fsnjs/fs';

export function findProjectConfig(
    filename: string = 'mdconfig.json',
    path?: string
) {
    return findBack(filename, path);
}
