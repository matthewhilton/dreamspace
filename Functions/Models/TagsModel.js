import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'
import db_name from "./db_details"

export default class Tag extends BaseModel {
    constructor(obj) {
      super(obj)
    }
  
    static get database() {
      return async () => SQLite.openDatabase(db_name)
    }
  
    static get tableName() {
      return "tags"
    }
  
    static get columnMapping() {
      return {
        id: { type: types.INTEGER, primary_key: true },
        name: {type: types.TEXT, not_null: true},
        color: {type: types.TEXT, not_null: true},
        used: {type: types.INTEGER, not_null: true}
      }
    }
  }