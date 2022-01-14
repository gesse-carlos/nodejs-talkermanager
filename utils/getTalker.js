const fs = require('fs/promises');
const path = require('path');

module.exports = async () => {
  try {
    return JSON.parse(await fs.readFile(path.join(__dirname, '..', 'talker.json'), 'utf-8'));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
