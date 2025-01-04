const express = require('express')
const app = express()

// HTML içerik oluşturma fonksiyonu
function generateHtmlContent(size) {
  let content = '<html><head><title>Response</title></head><body>'
  while (content.length < size) {
    content += 'a '
  }
  content += '</body></html>'
  return content.slice(0, size) // İstenen boyutta kırp
}

// HTTP GET isteği işleyicisi
app.get('/:size', (req, res) => {
  const size = parseInt(req.params.size, 10)

  if (isNaN(size) || size < 100 || size > 20000) {
    return res.status(400).send('<h1>400 Bad Request</h1>')
  }

  const content = generateHtmlContent(size)
  res.set('Content-Type', 'text/html')
  res.set('Content-Length', Buffer.byteLength(content))
  res.status(200).send(content)
})

// 501 Not Implemented hatası
app.all('*', (req, res) => {
  res.status(501).send('<h1>501 Not Implemented</h1>')
})

// Sunucu başlatma
const port = process.argv[2] || 8080
app.listen(port, () => {
  console.log(`HTTP Server running on port ${port}`)
})
