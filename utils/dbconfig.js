const config = {
    server: "ANDIEZS-LAP",
    user: "sa",
    password: "123456",
    database: "db-project",
    driver: "msnodesqlv8",
    port: 62617, // make sure to change port
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