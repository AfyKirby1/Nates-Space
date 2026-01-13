import heicConvert from 'heic-convert';
import fs from 'fs';
import path from 'path';

async function convertHeicToJpg(inputPath) {
    try {
        const inputBuffer = fs.readFileSync(inputPath);
        const outputBuffer = await heicConvert({
            buffer: inputBuffer,
            format: 'JPEG',
            quality: 0.9
        });

        const outputPath = inputPath.replace('.heic', '.jpg');
        fs.writeFileSync(outputPath, outputBuffer);
        console.log(`✅ Converted: ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
        return outputPath;
    } catch (err) {
        console.error(`❌ Error converting ${inputPath}:`, err.message);
    }
}

async function main() {
    const files = [
        'IMG_20260112_194122.heic',
        'IMG_20260112_194124.heic',
        'IMG_20260112_194126.heic'
    ];

    console.log('Converting HEIC files to JPG...\n');

    for (const file of files) {
        if (fs.existsSync(file)) {
            await convertHeicToJpg(file);
        } else {
            console.log(`⚠️ File not found: ${file}`);
        }
    }

    console.log('\nDone!');
}

main();
