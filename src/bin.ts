import chalk from 'chalk';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { argv, exit } from 'process';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { buildProject } from './watch.js';

const cli_args = hideBin(argv);

export declare interface ProjectConfig {
    output: string;
    root: string;
    include?: string[];
    exclude?: string[];
}

if (cli_args.length === 0 || cli_args.length === 1) {
    buildProject(cli_args.includes('--watch'));
}

yargs(hideBin(argv))
    .command(
        'build path',
        'Build a document, given the path to a root file.',
        (yargs) => {
            return yargs.positional('path', {
                coerce: (path) => {
                    path = resolve(path);
                    if (!existsSync(path)) {
                        console.error(
                            chalk.red(
                                `File at ${path} could not be resolved. Please point to a valid path.`
                            )
                        );
                        exit();
                    }
                    return {
                        path,
                        source: readFileSync(path, 'utf-8')
                    };
                },
                demandOption: true
            });
        },
        ({ path: input }) => {
            // @ts-ignore
            const { path, source } = input;
            // preParseDocument(path, source);
            // const doc = parseDocument(source, path);
            // console.log(doc);
        }
    )
    .parse();
