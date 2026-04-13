const fs = require('fs/promises');

function isJpeg(buffer) {
  return buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
}

function isPng(buffer) {
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  return buffer.length >= sig.length && sig.every((byte, index) => buffer[index] === byte);
}

function isWebp(buffer) {
  if (buffer.length < 12) {
    return false;
  }

  const riff = buffer.toString('ascii', 0, 4);
  const webp = buffer.toString('ascii', 8, 12);
  return riff === 'RIFF' && webp === 'WEBP';
}

async function isValidImageFile(filePath) {
  const fileBuffer = await fs.readFile(filePath);
  return isJpeg(fileBuffer) || isPng(fileBuffer) || isWebp(fileBuffer);
}

module.exports = {
  isValidImageFile
};
