//this file establishes the node server's connection to the postgres database

const { Pool } = require('pg');

//replace this with your own postGres URI string
const PG_URI = 'postgres://crszorok:K1D4F4tJ9EFp-FW2HXOLsVobjnyzWj4Y@queenie.db.elephantsql.com:5432/crszorok';


// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
})


// We export an object that contains a property called query,
// which is a function that returns the invocation of pool.query() after logging the query
// This will be required in the controllers to be the access point to the database
module.exports = {
  query: (text, params, callback) => {
    console.log('sqlConnection EXECUTED QUERY');
    return pool.query(text, params, callback);
  }
}