const fs = require('fs/promises');
const path = require('path');

const getTalker = async (req, res) => {
  try {
    const result = await fs.readFile(path.join(__dirname, '..', 'talker.json'), 'utf-8');
    res.status(200).json(JSON.parse(result));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = { getTalker };
