import * as SQLite from 'expo-sqlite'
import { BaseModel, types } from 'expo-sqlite-orm'
import db_name from "./db_details"

export default class Entry extends BaseModel {
    constructor(obj) {
      super(obj)
    }
  
    static get database() {
      return async () => SQLite.openDatabase(db_name)
    }
  
    static get tableName() {
      return "entries"
    }
  
    static get columnMapping() {
      return {
        id: { type: types.INTEGER, primary_key: true },
        title: { type: types.TEXT, not_null: true },
        description: { type: types.TEXT, default: () => "" },
        dateRecorded: {type: types.TEXT, not_null: true},
        lucidity: {type: types.INTEGER, default: () => 0},
        vividness: {type: types.INTEGER, default: () => 0},
      }
    }
  }