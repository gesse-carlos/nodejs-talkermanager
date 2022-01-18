const express = require('express');
const bodyParser = require('body-parser');

const token = require('./utils/token');
const getTalker = require('./utils/getTalker');
const setTalker = require('./utils/setTalker');
const loginAuthMiddleware = require('./middlewares/loginAuthMiddleware');
const {
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkKeys,
} = require('./middlewares/talkerMiddleware');

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

app.post(
  '/talker',
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
    await setTalker(talkers);
    res.status(201).json({ id, name, age, talk });
  },
);

app.put(
  '/talker/:id',
  validateToken,
  validateName,
  validateAge,
  validateTalk,
  validateTalkKeys,
  async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;

    const talkers = await getTalker();

    const talkerIndex = talkers.findIndex((person) => +(person.id) === +id);
    talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };

    await setTalker(talkers);

    res.status(200).json({ id: +id, name, age, talk });
  },
);

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const talkers = await getTalker();
  const filteredTalkers = talkers.filter((talker) => +(talker.id) !== +id);

  await setTalker(filteredTalkers);
  res.status(204).json({ });
});

app.listen(PORT, () => {
  console.log('Online');
});
