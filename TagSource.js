import AsyncStorage from '@react-native-community/async-storage';

const defaultTags = [
    { name: "False Awakening", used: 0 },
    { name: "Flying", used: 0 },
    { name: "Recurring", used: 0 },
    { name: "Nightmare", used: 0 },
    { name: "Sleep Paralysis", used: 0 }
]

const tagAsyncStorageKey = 'tagUsage';

class TagSource {

    // Takes a list of every tag, and determines what tags are "suggested" vs just in the "all" category
    static getSuggestedTags(allTags){
        return new Promise((resolve, reject) => {

            // First clean the array by setting every tag that is suggested to "all" (ignoring "current" ones)
            let tagsWithSuggestions = [...allTags];

            tagsWithSuggestions.sort((a, b) => {
                if(a.used < b.used){
                    return(-1)
                } else if(a.used > b.used){
                    return(1)
                } else {
                    return(0)
                }
            })

            for(let i = 0; i < tagsWithSuggestions.length; i++){
                if(tagsWithSuggestions[i].grouping != "current"){
                    tagsWithSuggestions[i].grouping = "all";

                    // Run other checks

                    // If first 4 when sorted by used property
                    if(i < 4){
                        tagsWithSuggestions[i].grouping = "suggested";
                    }
                }
            }

            // Return the list of all tags
            resolve(tagsWithSuggestions)
        })
    }

    // Gets all tags from a store somewhere
    static getAllTags(){
        return new Promise((resolve, reject) => {

            // Get tags user has already used from async storage
            try {
                AsyncStorage.getItem(tagAsyncStorageKey).then((data) => {

                    // Sort all tags by their most used
                    let dataArray = JSON.parse(data)

                    if(data == null){
                        dataArray = defaultTags;
                        AsyncStorage.setItem(tagAsyncStorageKey, dataArray)
                    }

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
                }).catch((e) => {
                    reject(e)
                })
            } catch(e) {
                console.error(e)
                reject(e)
            }
        })
    }

    static modifyTagGrouping(tagName, allTags, newGrouping){
        let modifiedTags = [...allTags];

        for(let i = 0; i < modifiedTags.length; i++){
            if(modifiedTags[i].name == tagName){
                modifiedTags[i].grouping = newGrouping;
                break;
            }
        }

        return allTags;
    }
}

export default TagSource;