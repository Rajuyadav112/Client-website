const fs = require('fs');
const path = require('path');

const stylePath = path.join(process.cwd(), 'style.css');
const newStylesPath = path.join(process.cwd(), 'services_styles.css');

try {
    // Read as buffer to avoid encoding issues initially
    const buffer = fs.readFileSync(stylePath);

    // Convert to string to find the marker index
    // The beginning of the file is definitely valid UTF-8
    const contentStr = buffer.toString('utf8');

    const marker = '.service-title';
    const markerIndex = contentStr.lastIndexOf(marker);

    if (markerIndex === -1) {
        throw new Error('Marker .service-title not found');
    }

    // Find the closing brace after the marker
    const closingBraceIndex = contentStr.indexOf('}', markerIndex);

    if (closingBraceIndex === -1) {
        throw new Error('Closing brace not found');
    }

    // Determine the byte offset.
    // Since the top part of the file is standard ASCII/UTF-8, character index should match byte index roughly,
    // but to be safe, we slice the Buffer.
    // Actually, safest is to substring the STRING (assuming the garbage hasn't messed up the string conversion of the early part)
    // and then write that string back.

    const cleanContent = contentStr.substring(0, closingBraceIndex + 1);
    const newCss = fs.readFileSync(newStylesPath, 'utf8');

    const finalCss = cleanContent + '\n\n' + newCss;

    fs.writeFileSync(stylePath, finalCss, 'utf8');
    console.log('Fixed style.css');

} catch (err) {
    console.error(err);
    process.exit(1);
}
