import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'
import db_name from "./db_details"

export default class Drawing extends BaseModel {
    constructor(obj) {
      super(obj)
    }
  
    static get database() {
      return async () => SQLite.openDatabase(db_name)
    }
  
    static get tableName() {
      return "drawings"
    }
  
    static get columnMapping() {
      return {
        id: { type: types.INTEGER, primary_key: true },
        height: {type: types.INTEGER, not_null: true},
        width: {type: types.INTEGER, not_null: true},
        uri: {type: types.TEXT, not_null: true},
        entry_id: {type: types.INTEGER, not_null: true}
      }
    }
  }