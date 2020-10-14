import * as SQLite from 'expo-sqlite';
import Entry from './Models/EntriesModel.js';
import Drawing from './Models/DrawingsModel.js';
import Recording from "./Models/RecordingModel.js"

let db_name = "journalStore";

class JournalDatabase {
    static async saveEntry(data){
        console.log(data)

        // First save the main entry data
        Entry.createTable();
        const db_entry = new Entry({dateRecorded: new Date(data.date).toISOString(), ...data})
        let main_entry = await db_entry.save()

        // Now save each of the drawings
        Drawing.createTable();
        for(const drawing_data of data.drawings){
            // Save each one and link with the main entry ID
            const drawing_entry = new Drawing({entry_id: main_entry.id,...drawing_data})
            await drawing_entry.save()
        }

        // Save each of the recordings in a similar way too
        Recording.createTable();
        for(const recording_data of data.audioRecordings){
            // Save each one and link with the main entry ID
            const recording_entry = new Recording({entry_id: main_entry.id,...recording_data})
            await recording_entry.save()
        }

        // TODO save tags!!
        return(main_entry.id)
    }

    // TODO CRUD tags
}

export default JournalDatabase;