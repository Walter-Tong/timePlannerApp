function getType(eventTypes, name) {
    for (let i = 0; i < eventTypes.length; i++) {
        if (eventTypes[i].type === name) {
            return eventTypes[i]
        }
    }
}

export default getType;