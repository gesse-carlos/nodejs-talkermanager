const express = require('express');
const bodyParser = require('body-parser');
const randToken = require('rand-token');

const getTalker = require('./utils/getTalker');

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

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email) res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (!(/\S+@\S+\.\S+/.test(email))) {
    res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }

  if (!password) res.status(400).json({ message: 'O campo "password" é obrigatório' });

  if (password.length < 6) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  const token = randToken.generate(16);
  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
