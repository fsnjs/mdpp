import chalk from 'chalk';

export function parseLink(headers: string[], link: string) {
    const ref = headers.find((text) => link === text);
    if (!ref) {
        console.warn(chalk.yellow(`Failed to resolve link ${link}.`));
        return '';
    }

    let href = '#';

    const refChars = [...ref];
    let char: string | undefined;
    while ((char = refChars.shift())) {
        if (/[a-z]|[0-9]/.test(char)) {
            href += char.toLowerCase();
            continue;
        }

        if (char === ' ') {
            href += '-';
            continue;
        }
    }

    return `[${link}](${href})`;
}
