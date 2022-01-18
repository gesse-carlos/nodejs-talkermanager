const fs = require('fs/promises');

module.exports = async (content) => {
  try {
    return await fs.writeFile('./talker.json', JSON.stringify(content, null, 2));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
