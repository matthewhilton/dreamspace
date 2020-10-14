import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'
import db_name from "./db_details"

export default class Recording extends BaseModel {
    constructor(obj) {
      super(obj)
    }
  
    static get database() {
      return async () => SQLite.openDatabase(db_name)
    }
  
    static get tableName() {
      return "recordings"
    }
  
    static get columnMapping() {
      return {
        id: { type: types.INTEGER, primary_key: true },
        uri: {type: types.TEXT, not_null: true},
        entry_id: {type: types.INTEGER, not_null: true}
      }
    }
  }