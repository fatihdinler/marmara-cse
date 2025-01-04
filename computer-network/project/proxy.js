const express = require('express')
const axios = require('axios') // HTTP isteklerini yönlendirmek için

const app = express()
const proxyPort = 8888
const webServerHost = 'http://localhost:8080' // Web sunucusunun adresi

// Proxy GET isteği
app.get('/:size', async (req, res) => {
  const size = parseInt(req.params.size, 10)

  if (isNaN(size)) {
    return res.status(400).send('<h1>400 Bad Request</h1>')
  }

  if (size > 9999) {
    return res.status(414).send('<h1>414 Request-URI Too Long</h1>')
  }

  try {
    const response = await axios.get(`${webServerHost}/${size}`)
    res.set(response.headers)
    res.status(response.status).send(response.data)
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).send('<h1>404 Not Found</h1>')
    } else {
      res.status(500).send('<h1>500 Internal Server Error</h1>')
    }
  }
})

// Proxy dışındaki tüm istekler
app.all('*', (req, res) => {
  res.status(400).send('<h1>400 Bad Request</h1>')
})

// Proxy sunucuyu başlatma
app.listen(proxyPort, () => {
  console.log(`Proxy server running on port ${proxyPort}`)
})
