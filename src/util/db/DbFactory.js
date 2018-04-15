function makeDb(configSource, clientHost) {
    switch((configSource.DB_TYPE && configSource.DB_TYPE.toUpperCase())) {
        case "MYSQL":
            const mysql = require('mysql2-promise')();
            const pool = mysql.createPool({
                "connectionLimit": (config.MYSQL_POOL_CONNECTION_LIMIT && parseInt(config.MYSQL_POOL_CONNECTION_LIMIT)) || 10,
                "host": clientHost || configSource.MYSQL_HOST || "localhost",
                "user": configSource.MYSQL_USER || "root",
                "password": configSource.MYSQL_PASSWORD || "root",
                "database": configSource.MYSQL_DB || "main"
            });
            const MySqlClient = require('./MySqlClient');
            const mysqlDb = new MysqlClient(pool);

            this.db = mysqlDb;

            break;
        default:
            const sqlite3  = require("sqlite3").verbose();
            let clientDb = (clientHost && `${clientHost}-client.db3`);
            const dbName = clientDb || configSource.SQLITE_LOCATION || 'db.db3';
            const dbPath = (config.DB_LOCATION || './') + dbName;
            const sqlite = new sqlite3.Database(dbPath);

            const SqliteClient = require('./SqliteClient');
            const sqliteClient = new SqliteClient(sqlite);

            this.db = sqliteClient
            break;
    }
}

class DbFactory {
    constructor(configSource) {
        this.configSource = configSource;
        this.db = makeDb(configSource);
    }

    getDb() {
        return this.db;
    }

    getClientDb(clientInfo) {
        return makeDb(this.configSource, clientInfo);
    }

    getClientDbForHost(host) {
        const rows = this.db.query('SELECT db_host FROM site_hostnames WHERE site_hostname=?', [host]);
        if(rows.length == 0){
            return null;
        }
        
        return this.getClientDb(rows['db_host']);
    }

}

module.exports = DbFactory;