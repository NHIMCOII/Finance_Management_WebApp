const config = {
    server: "localhost",
    // DESKTOP-62N9FIC port: 54568
    // ANDIEZS-LAP port: 62617
    // DESKTOP-0C831A9: 56542
    user: "sa",
    password: "Docker@123",
    database: "db_project",
    driver: "msnodesqlv8",
    port: 1433, // make sure to change port
    dialect: "mssql",
    options: {
        trustedconnection: true,
        enableArithAbort: false,
        trustServerCertificate: true,
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        },
        encrypt: false
    },
    pool: {
        min: 1, 
        max: 100, 
        idleTimeoutMillis: 30000
    },
    //resave: true,
	//saveUninitialized: true
}

module.exports = config