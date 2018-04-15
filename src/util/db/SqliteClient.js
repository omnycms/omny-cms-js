class SqlitClient extends SqlBase {

    constructor(db) {
        this.db = db;
    }

    selectQuery (query, parameters, limit, offset) {
        return new Promise((fulfill, reject) => {
            if(limit) {
                query += ` LIMIT ${limit}`;
                if(offset) {
                    query += ` OFFSET ${offset}`;
                }
            }

            const [rows, fields] = await this.db.all(query, parameters);
            
            return rows;
        });
    }

    update(options) {
        const updateString = this.convertToUpdateString(this.ensureMap(options.data));
        const query = `UPDATE ${options.table} ${updateString}`;

        return new Promise((fulfill, reject) => {
            this.db.run(sql, languages, function(err) {
                if (err) {
                    return reject(err);
                } 

                fulfill();
            });
        });
    }

    async delete(query, parameters) {
        return new Promise((fulfill, reject) => {
            this.db.run(sql, languages, function(err) {
                if (err) {
                    return reject(err);
                } 

                fulfill();
            });
        });
    }

    async insert(options) {
        this.checkInsertOptions(options);
        const optionsMap = ensureMap(options.data);

        const insertString = this.convertToInsertString(optionsMap);
        const query = `INSERT INTO ${options.table} ${insertString}`;
        return await this.db.execute(query);
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
        return await this.db.execute(query);
    }

    insertOrIgnore(options) {
        this.checkInsertOptions(options);
        const optionsMap = ensureMap(options.data);

        const insertString = this.convertToInsertString(optionsMap);
        const query = `INSERT IGNORE INTO ${options.table} ${insertString}`;
        return await this.db.execute(query);
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
        return await this.db.execute(query);
    }
}

module.exports = SqlitClient;