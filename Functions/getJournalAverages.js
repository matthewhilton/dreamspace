const getJournalAverages = (allJournalEntries) =>{
    const entries = [...allJournalEntries];

    const memory = entries.reduce((a,b) => a + b.memory, 0)
    const averageMemory = Math.round(memory / entries.length);

    const vividness = entries.reduce((a,b) => a + b.vividness, 0)
    const averageVividness = Math.round(vividness / entries.length);

    const lucidity = entries.reduce((a,b) => a + b.lucidity, 0)
    const averageLucidity = Math.round(lucidity / entries.length)

    return({
        memory: averageMemory,
        vividness: averageVividness,
        lucidity: averageLucidity
    })
}

export default getJournalAverages;