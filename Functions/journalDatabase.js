import * as SQLite from 'expo-sqlite';

let db_name = "journalStore";

class JournalDatabase {
    static get(){
        return SQLite.openDatabase(db_name, "1")
    }

    static saveEntry(data, formVersion){
        console.log(data)

        if(formVersion == "v1"){
            // Do something...
        }
    }
}

export default JournalDatabase;