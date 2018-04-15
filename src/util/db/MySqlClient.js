
const SqlBase = require("./SqlBase");

class MySqlClient extends SqlBase {

    constructor(db) {
        this.db = db;
    }

    async selectQuery (query, parameters, limit, offset) {
        if(limit) {
            query += ` LIMIT ${limit}`;
            if(offset) {
                query += ` OFFSET ${offset}`;
            }
        }
        
        const [rows, fields] = await this.db.execute(query, parameters);

        return rows;
    }

    async update(options) {
        const optionsMap = ensureMap(options.data);
        const updateString = this.convertToUpdateString(optionsMap);
        const query = `UPDATE ${options.table} ${updateString}`;
        return await this.db.execute(query,  Array.toArray(optionsMap.values()));
    }

    async delete(query, parameters) {
        return await this.db.execute(query, parameters);
    }

    async insert(options) {
        this.checkInsertOptions(options);
        const optionsMap = ensureMap(options.data);

        const insertString = this.convertToInsertString(optionsMap);
        const query = `INSERT INTO ${options.table} ${insertString}`;
        return await this.db.execute(query, Array.toArray(optionsMap.values()));
    }

    bulkInsert(options) {
        assert(Array.isArray(options.columns));
        assert(Array.isArray(options.data));
        const placeHolders = options.data.map(row => {
            return rowValues
                .map(key => "?")
                .join(",")+")";
        }).join(",");
        const columnString = options.columns.join(",");
        const query = `INSERT INTO ${options.table} (${columnString}) ${placeHolders}`;
        const parameters = [].concat.apply([], options.data);
        return await this.db.execute(query, parameters);
    }

    insertOrIgnore(options) {
        this.checkInsertOptions(options);
        const optionsMap = ensureMap(options.data);

        const insertString = this.convertToInsertString(optionsMap);
        const query = `INSERT IGNORE INTO ${options.table} ${insertString}`;
        
        return await this.db.execute(query, Array.toArray(optionsMap.values()));
    }

    bulkInsertOrIgnore(options) {
        assert(Array.isArray(options.columns));
        assert(Array.isArray(options.data));
        const placeHolders = options.data.map(row => {
            return rowValues
                .map(key => "?")
                .join(",")+")";
        }).join(",");
        const columnString = options.columns.join(",");
        const query = `INSERT IGNORE INTO ${options.table} (${columnString}) ${placeHolders}`;
        const parameters = [].concat.apply([], options.data);
        return await this.db.execute(query, parameters);
    }
}

module.exports = MySqlClient;