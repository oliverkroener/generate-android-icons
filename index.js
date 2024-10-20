/**
 * (C) 2024 Oliver Kroener
 * https://www.oliver-kroener.de
 * Licence: MIT
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Input image (XXXHDPI - 192x192)
const inputImage = './mipmap-xxxhdpi/ic_launcher.png';
const inputImageRound = './mipmap-xxxhdpi/ic_launcher_round.png';

// Android Icon Sizes and target directories
const targets = {
    mdpi: { size: 48, dir: './mipmap-mdpi/' },
    hdpi: { size: 72, dir: './mipmap-hdpi/' },
    xhdpi: { size: 96, dir: './mipmap-xhdpi/' },
    xxhdpi: { size: 144, dir: './mipmap-xxhdpi/' },
};

// Function to resize and save the image
const generateIcons = async () => {
    try {
        for (const [name, { size, dir }] of Object.entries(targets)) {
            const outputPath = path.join(dir, 'ic_launcher.png');
            await sharp(inputImage)
                .resize(size, size)
                .toFile(outputPath);
            const outputPathRound = path.join(dir, 'ic_launcher_round.png');
            await sharp(inputImageRound)
                .resize(size, size)
                .toFile(outputPathRound);
            console.log(`Generated icons for ${name}: ${size}x${size}px in ${dir}`);
        }
        console.log('All icons generated successfully.');
    } catch (err) {
        console.error('Error generating icons:', err);
    }
};

// Start the icon generation
generateIcons();
