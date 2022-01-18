const fs = require('fs/promises');

module.exports = async (content) => {
  try {
    return await fs.writeFile(content, JSON.stringify(content, null, 2));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
