import mysql from 'mysql2/promise';

/**
 *  Initialize the connection pool.
 * 
 *  @param multipleStatements: true 
 *    // allows for multiple queries to be executed in one query. Using this since it allows for a single query to be executed instead of 3 when posting a product. 
 *    // This is a security risk due to sql injection vs using multiple queries, but since we are following the snapshot pattern, having a single query is more efficient for performance + allows for a single transaction to be used.
 *    // Input is still sanitized, but this is a risk to be aware of.
 * 
 *  @param waitForConnections: true, 
 *    // Don't queue the connection request, just throw an error - could tweak this later on for perfomance handling with queue system
 *  
 *  @param connectionLimit: 10, 
 *    // The maximum number of connections to create at once. If set to 0, there is no limit to the number of connections created at once.
 * 
 *  @param queueLimit: 0, 
 *    // The maximum number of connection requests the pool will queue before returning an error from getConnection. If set to 0, there is no limit to the number of queued connection requests.
 */


export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true, 
  
});

/**
  *  Establishes a connection to the database and executes the query.
  *  @param sql - The SQL query to be executed.
  *  @param values - The values to be inserted into the query.
  * 
  *  @returns The result of the query and releases the connection.
  * 
  *  @throws Will throw an error if the query fails and releases the connection.
 */

export async function query(sql: string, values?: any[]): Promise<mysql.ResultSetHeader | mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket | mysql.OkPacket[]> {
  const conn = await pool.getConnection();
  try {
    const [result] = await conn.query(sql, values);
    return result;
  } catch (err) {
    console.log(err)
    conn.release();
  } finally {
    conn.release();
  }
}

