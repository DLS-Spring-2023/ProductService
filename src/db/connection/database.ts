import mysql from 'mysql2/promise';

// Initialize the connection pool. The pool-specific settings are the defaults
export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Simple wrapper to use a database connection in a reusable async function
export async function query(sql: string, values?: any[]) {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(sql, values);
    return result;
  } finally {
    conn.release();
  }
}

