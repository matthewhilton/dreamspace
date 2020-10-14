import AsyncStorage from '@react-native-community/async-storage';

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
            // Get tags user has already used from async storage
            try {
                AsyncStorage.getItem(tagAsyncStorageKey).then((data) => {
                    console.log("tag data: ", data);
                    // Sort all tags by their most used



                    if(data == null){
                        dataArray = defaultTags;
                        console.log("tag data was null, setting to default tags")
                        AsyncStorage.setItem(tagAsyncStorageKey, JSON.stringify(defaultTags))
                        resolve(dataArray)
                        return;
                    }

                    let dataArray = JSON.parse(data)

                    dataArray.sort((a, b) => {
                        if(a.used < b.used){
                            return(-1)
                        } else if(a.used > b.used){
                            return(1)
                        } else {
                            return(0)
                        }
                    })
                    resolve(dataArray)
                    return;
                }).catch((e) => {
                    reject(e)
                    return;
                })
            } catch(e) {
                console.error(e)
                reject(e)
            }
        })
    }
}

export default TagSource;