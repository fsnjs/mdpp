import ora, { Ora } from 'ora';
import { DocumentParser } from './parse-document.js';
import { dirname, join } from 'path';
import { glob } from 'glob';
import { readFile } from '@fsnjs/fs';
import { watch as watcher } from 'chokidar';
import { writeFileSync } from 'fs';
import { ProjectConfig } from './bin.js';
import { exit } from 'process';
import { findProjectConfig } from './read-project-config.js';

function build(
    spinner: Ora,
    root: string,
    output: string,
    startMsg: string,
    successMsg: string
) {
    spinner.start(startMsg);
    setTimeout(() => {
        const content = new DocumentParser(root).tokenize().parse().content;
        writeFileSync(output, content, 'utf-8');
        spinner.succeed(successMsg);
    }, 500);
}

export async function buildProject(watch = false) {
    const configPath = findProjectConfig();

    let { output, root, include, exclude } = readFile<ProjectConfig>(
        configPath,
        {
            existsMsg:
                'This command must be run in a directory that contains a mdconfig.json file.'
        }
    );

    const projectRoot = dirname(configPath);

    root = join(projectRoot, root);
    output = join(projectRoot, output);

    let startMsg = 'Building documentation...\n';
    let successMsg = 'Build complete.\n';

    if (watch) {
        startMsg = 'Starting build in watch mode...\n';
        successMsg += ' Watching for file changes.\n';
        console.clear();
    }

    const spinner = ora();
    build(spinner, root, output, startMsg, successMsg);

    let files = include ? await glob(include, { ignore: exclude }) : [root];

    if (!watch) exit();

    watcher(files, {
        ignoreInitial: true,
        depth: -1
    }).on('change', async () => {
        console.clear();
        // spinner.start('File change detected. Rebuilding...');
        // setTimeout(() => {
        //     const content = new DocumentParser(root).tokenize().parse().content;
        //     writeFileSync(output, content, 'utf-8');
        //     spinner.succeed(successMsg);
        // }, 500);
        build(spinner, root, output, startMsg, successMsg);
    });
}
