const http = require('http')
const path = require('path')
const { renderFile } = require('ejs')
const sql = require('./db')

const routes = {
  '/': 'index.ejs',
  '/student': 'student.sql',
  '/room': 'room.sql',
  '/leavepermission': 'leavePermission.sql',
  '/entranceexitlog': 'entranceExitLog.sql',
  '/staff': 'staff.sql',
  '/staffassignedtasks': 'staffAssignedTasks.sql',
  '/cleaningschedule': 'cleaningSchedule.sql',
  '/maintenancerequest': 'maintenanceRequest.sql',
  '/visitorstudent': 'visitorStudent.sql',
  '/permanentstudent': 'permanentStudent.sql',
  '/billingcycle': 'billingCycle.sql',
  '/bills': 'bills.sql',
  '/emergencycontactdetails': 'emergencyContactDetails.sql',
}

const server = http.createServer(async (req, res) => {
  const urlPath = req.url.toLowerCase()
  if (routes[urlPath]) {
    const sqlFile = routes[urlPath]
    if (sqlFile.endsWith('.sql')) {
      const queryResult = await sql.executeQueryFromFile(sqlFile)
      renderPage(res, `${urlPath.substring(1)}.ejs`, { data: queryResult })
    } else {
      renderPage(res, sqlFile)
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Sayfa bulunamadı.')
  }
})

function renderPage(res, viewName, data = {}) {
  const viewPath = path.join(__dirname, 'views', viewName)
  const fullData = { ...data, routes }
  renderFile(viewPath, fullData, (err, str) => {
    if (err) {
      console.log('err ----->', err)
      res.writeHead(500, { 'Content-Type': 'text/plain charset=utf-8' })
      res.end('Sayfa yüklenirken hata oluştu.')
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html charset=utf-8' })
      res.end(str, 'utf-8')
    }
  })
}

server.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor')
})
