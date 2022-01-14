const express = require('express');
const bodyParser = require('body-parser');

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

app.listen(PORT, () => {
  console.log('Online');
});
