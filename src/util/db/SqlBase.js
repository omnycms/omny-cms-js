
class SqlBase {

    constructor() {
        this.queryCache = {};
    }

    checkInsertOptions(options) {
        assert(typeof options.table === "string");
        assert(typeof options.data === "object");
    }

    convertToUpdateString(parameterMap) {
        const updateString = Array.from(parameterMap.keys())
            .map(key => `${key}=?`)
            .join(",");
        return updateString;
    }

    convertToInsertString(parameterMap) {
        const columnString = Array.from(parameterMap.keys())
        .join(",");
        const valuesString = this.getPlaceholders(Array.from(parameterMap.keys()));
        
        const insertString = `(${columnString}) VALUES (${valueString})`
        return insertString;
    }

    getPlaceholders(arr) {
        return arr.map(key => '?').join(",");
    }

    ensureMap(obj) {
        if(obj instanceof Map) {
            return obj;
        }
        let mapObject = new Map();
        for(let key of Object.keys(obj)) {
            mapObject.set(key, obj[key]);
        }

        return mapObject;
    }
}

module.exports = SqlBase;