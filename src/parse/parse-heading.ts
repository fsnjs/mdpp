export function parseHeading(headingValue: string, headingOffset: number = 0) {
    if (headingOffset === 0) return headingValue;

    let level = headingValue.substring(0, headingValue.lastIndexOf('#') + 1);
    let title = headingValue.replace(level, '');

    headingOffset = level.length + headingOffset;
    if (headingOffset > 0) return '#'.repeat(headingOffset) + title;

    return title;
}
