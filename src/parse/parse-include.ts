// import { dirname, join } from 'path';
// import { Include } from '../directive.js';
// import { readFileSync } from 'fs';
// import { parseDocument } from '../parse-doc.js';

// export function parseInclude(
//     path: string,
//     { url, args }: { url: string; args: Include },
//     parentOffset: number
// ) {
//     path = dirname(path);
//     url = join(path, url);

//     const childSrc = readFileSync(url, 'utf-8');
//     let child = parseDocument(childSrc, url, {
//         headingOffset: (args.offset ?? 0) + parentOffset
//     });

//     if (args.range) {
//         const [start, end] = args.range.split(',');

//         let startIndex = 0;
//         let endIndex = child.length - 1;

//         if (/[0-9]/.test(start)) startIndex = Number(start) - 1;
//         if (/[0-9]/.test(end)) endIndex = Number(end) - 1;

//         child = child.split(/\n/g).slice(startIndex, endIndex).join('\n');
//     }

//     if (args.collapse) {
//         return [
//             '<details>',
//             '',
//             `<summary>${args.collapse}</summary>`,
//             '',
//             child,
//             '',
//             '</details>'
//         ].join('\n');
//     }

//     return child;
// }
