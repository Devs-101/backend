const express = require('express')
const app = express()

const router = express.Router()
const APP_PORT = 8000

app.use(express.json());
app.use('/', router);

router.get('/', async function (req, res, next) {
  console.log('///')
  res.status(200).json({
    data: 'Hello World Devs 101',
    success: true
  });
})

app.listen(APP_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening http://localhost:${APP_PORT}`)
})