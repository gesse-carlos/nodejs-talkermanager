const fs = require('fs/promises');
const path = require('path');

module.exports = async (content) => {
  try {
    return await fs.writeFile(
      path.join(__dirname, '..', 'talker.json'),
      JSON.stringify(content, null, 2),
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
