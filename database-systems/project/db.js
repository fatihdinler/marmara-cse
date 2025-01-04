const fs = require('fs').promises;
const path = require('path');
const sql = require('mssql');

const connectionString = 'Server=localhost,1433;User Id=SA;Password=Fedfedfed159357456458*;TrustServerCertificate=True;';

async function connectDB() {
  try {
    await sql.connect(connectionString);
    console.log('Veritabanına bağlantı başarılı.');
    await sql.query('USE YURTSYS')
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

connectDB();

module.exports = {
  executeQueryFromFile,
};
