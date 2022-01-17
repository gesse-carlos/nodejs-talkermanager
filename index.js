const express = require('express');
const fs = require('fs/promises');
const bodyParser = require('body-parser');

const token = require('./utils/token');
const getTalker = require('./utils/getTalker');
const loginAuthMiddleware = require('./middlewares/loginAuthMiddleware');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkKeys,
} = require('./middlewares/createTalkerMiddleware');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  res.status(200).json(await getTalker());
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const talkers = await getTalker();

  const result = talkers.find((talker) => String(talker.id) === id);

  if (!result) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(result);
});

app.post('/login', loginAuthMiddleware, (req, res) => {
  res.status(200).json({ token });
});

app.post('/talker',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkKeys,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await getTalker();
    const id = talkers[talkers.length - 1].id + 1;

    talkers.push({ id, name, age, talk });

    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#space_argument
    await fs.writeFile('./talker.json', JSON.stringify(talkers, null, 2));
    return res.status(201).json({ id, name, age, talk });
});

app.listen(PORT, () => {
  console.log('Online');
});
