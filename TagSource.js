import AsyncStorage from '@react-native-community/async-storage';
import JournalDatabase from './Functions/journalDatabase';

const defaultTags = [
    { name: "False Awakening", used: 0, selected: false, color: "#f27844" },
    { name: "Flying", used: 0, selected: false, color: "#62e3dc" },
    { name: "Recurring", used: 0, selected: false, color: "#5dde68" },
    { name: "Nightmare", used: 0, selected: false, color: "#635c5c" },
    { name: "Sleep Paralysis", used: 0, selected: false, color: "#b440cf" }
]

const tagAsyncStorageKey = 'tagUsage';

class TagSource {

    // Gets all tags from a store somewhere
    static getAllTags(){
        return new Promise((resolve, reject) => {
            // Get tags user has already used from the sqlite db
            try {
                // DEBUG DEBUG DEBUG
                console.log("tag source getting tags, also trying to query from SQ lite ")
                JournalDatabase.getTags().then((data) => {
                    if(data.length === 0){
                        console.log("Tag data in SQlite was null, setting to the default tags")
                        JournalDatabase.saveTags(defaultTags).then(() => {
                            resolve(defaultTags)
                            return;
                        })
                    }

                    data.sort((a, b) => {
                        if(a.used < b.used){
                            return(-1)
                        } else if(a.used > b.used){
                            return(1)
                        } else {
                            return(0)
                        }
                    })

                    resolve(data)
                    return;
                }).catch(e => reject(e))

            } catch(e) {
                console.error(e)
                reject(e)
            }
        })
    }
}

export default TagSource;