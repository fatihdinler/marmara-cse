const path = require('path');
const sql = require('mssql');
const fs = require('fs').promises;

let pool
const connectionString = 'Server=localhost,1433;User Id=SA;Password=Fedfedfed159357456458*;TrustServerCertificate=True;';

async function connectDB() {
  try {
    pool = await sql.connect(connectionString);
    console.log('Veritabanına bağlantı başarılı.');
    await sql.query('USE YURTSYS')
    return pool
  } catch (err) {
    console.error('Veritabanı bağlantı hatası:', err);
  }
}

async function executeQueryFromFile(fileName) {
  try {
    const filePath = path.join(__dirname, 'sql', fileName);
    const query = await fs.readFile(filePath, 'utf-8');
    const result = await sql.query(query);
    return result.recordset;
  } catch (err) {
    console.error(`SQL sorgusu çalıştırılırken hata: ${fileName}`, err);
    return [];
  }
}

async function executeCleaningScheduleProcedure(params) {
  try {
    const request = new sql.Request();
    request.input('RoomNumber', sql.Int, params.RoomNumber);
    request.input('TaskDescription', sql.NVarChar(200), params.TaskDescription);
    request.input('Frequency', sql.NVarChar(50), params.Frequency);

    const result = await request.execute('spAddCleaningSchedule');
    console.log('result --->', result)
    console.log('Stored Procedure çalıştırıldı:', result);
    return result.recordset;
  } catch (err) {
    console.error(`Stored Procedure çalıştırılırken hata: ${err}`);
    throw err;
  }
}

async function executeMaintenanceRequestProcedure(params) {
  try {
    const request = new sql.Request();
    request.input('RoomNumber', sql.Int, params.RoomNumber);
    request.input('IssueDescription', sql.NVarChar(200), params.IssueDescription);

    const result = await request.execute('spCreateMaintenanceRequest');
    console.log('Maintenance Request SP çalıştırıldı:', result);
    return result.recordset;
  } catch (err) {
    console.error(`Stored Procedure çalıştırılırken hata: ${err}`);
    throw err;
  }
}


module.exports = {
  sql,
  connectDB,
  executeQueryFromFile,
  executeCleaningScheduleProcedure,
  executeMaintenanceRequestProcedure,
};
