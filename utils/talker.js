const fs = require('fs/promises');
const path = require('path');

const getTalker = async () => {
  fs.readFile(path.join(__dirname, '..', 'talker.json'), 'utf-8')
    .then((content) => content)
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};

module.exports = { getTalker };
