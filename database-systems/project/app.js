const http = require('http')
const path = require('path')
const { renderFile } = require('ejs')
const { connectDB, sql,
  executeCleaningScheduleProcedure,
  executeQueryFromFile,
} = require('./db')

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

  if (urlPath === '/create-cleaning-schedule' && req.method === 'POST') {
    let body = ''
    req.on('data', (chunk) => (body += chunk))
    req.on('end', async () => {
      const formData = new URLSearchParams(body)
      const RoomNumber = parseInt(formData.get('RoomNumber'))
      const TaskDescription = formData.get('TaskDescription')
      const Frequency = formData.get('Frequency')

      try {
        await executeCleaningScheduleProcedure({
          RoomNumber,
          TaskDescription,
          Frequency,
        })
        res.writeHead(302, { Location: '/cleaningschedule' })
        res.end()
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain charset=utf-8' })
        res.end('Cleaning Schedule oluşturulurken hata oluştu.')
      }
    })
  }

  if (urlPath === '/execute-maintenance-sp' && req.method === 'POST') {
    let body = ''
    req.on('data', (chunk) => (body += chunk))
    req.on('end', async () => {
      const { RoomNumber, IssueDescription } = JSON.parse(body)

      try {
        const pool = await connectDB()
        const request = new sql.Request(pool)

        request.input('RoomNumber', sql.Int, RoomNumber)
        request.input('IssueDescription', sql.NVarChar(200), IssueDescription)

        await request.execute('spCreateMaintenanceRequest')

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: true }))
      } catch (err) {
        console.error('Maintenance Request SP çalıştırılırken hata:', err)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, message: err.message }))
      }
    })
  }

  if (urlPath === '/execute-billing-sp' && req.method === 'POST') {
    let body = ''
    req.on('data', (chunk) => (body += chunk))
    req.on('end', async () => {
      const { StudentID } = JSON.parse(body)

      try {
        const pool = await connectDB()
        const request = new sql.Request(pool)
        request.input('StudentID', sql.Int, StudentID)

        await request.execute('spCreateBillingCycle')

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: true }))
      } catch (err) {
        console.error('Billing Cycle SP çalıştırılırken hata:', err)
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: false, message: err.message }))
      }
    })
  }

  else if (routes[urlPath]) {
    const sqlFile = routes[urlPath]
    if (sqlFile.endsWith('.sql')) {
      const queryResult = await executeQueryFromFile(sqlFile)
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
  connectDB()
  console.log('Sunucu 3000 portunda çalışıyor')
})
