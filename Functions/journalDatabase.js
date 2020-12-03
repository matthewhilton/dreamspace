import Entry from './Models/EntriesModel.js';
import Drawing from './Models/DrawingsModel.js';
import Recording from "./Models/RecordingModel.js"
import Tag from './Models/TagsModel.js';
import TagEntryAssociation from './Models/TagEntryAssociationModel.js';

let db_name = "journalStore2";

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

        // Save the tag linkings (tags themselves are not saved by this function, the saving/editing of them is done elsewhere)
        TagEntryAssociation.createTable();
        for(const tag_on_entry of data.tags){
            const tag_association = new TagEntryAssociation({entry_id: main_entry.id, tag_name: tag_on_entry.name})
            await tag_association.save()
        }

        return(main_entry.id)
    }

    static async getAllEntryies(){
        Entry.createTable();
        TagEntryAssociation.createTable();
        Drawing.createTable();
        Recording.createTable();
        Tag.createTable();

        let allEntries = await Entry.query();

        // Now attach drawings to these
        for(let i = 0; i < allEntries.length; i++){
            allEntries[i].drawings = [];
            allEntries[i].recordings = [];
        }

        for(const drawing of await Drawing.query()){
            // Find the index of the entry associated with this drawing
            indexOfCorrespondingEntry = allEntries.findIndex(el => el.id == drawing.entry_id)
            let currentDrawings = allEntries[indexOfCorrespondingEntry].drawings;
            allEntries[indexOfCorrespondingEntry].drawings = [...currentDrawings, drawing];
        }

        for(const recording of await Recording.query()){
             // Find the index of the entry associated with this drawing
             indexOfCorrespondingEntry = allEntries.findIndex(el => el.id == recording.entry_id)
             let currentRecordings = allEntries[indexOfCorrespondingEntry].recordings;
             allEntries[indexOfCorrespondingEntry].recordings = [...currentRecordings, recording];
        }

        // And now attach the tags using the tag associations 
        const allTags = await Tag.query();
        //TODO 
        
        return(allEntries);
    }

    static async saveTags(tagArray){
        for(const tagElement of tagArray){
            await this.saveTag(tagElement)
        }
    }

    static async saveTag(data){
        Tag.createTable();
        const tag_entry = new Tag({...data})
        const tag_data = await tag_entry.save();
        return tag_data;
    }

    static async getTags(){
        Tag.createTable();
        const tag_data = await Tag.query();
        return(tag_data);
    }
}

export default JournalDatabase;