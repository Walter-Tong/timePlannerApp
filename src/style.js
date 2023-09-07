import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    page: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: "#DDD",
        height: "100%"
    },
    pageTitleBox: {
        flexDirection: "row",
        alignItems: "left",
        justifyContent: "space-between",
        padding: 5,
        marginTop: 10,
        borderStyle: "solid",
        borderColor: "#000",
        backgroundColor: "#AAA",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    pageTitleText: {
        fontSize: 24,
        fontWeight: "600"
    },
    eventListItem: {
        padding: 5,
        marginTop: 10,
        borderStyle: "solid",
        borderColor: "#000",
        backgroundColor: "#BBB",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    eventListItemForm: { 
        flexDirection: "row", 
        justifyContent: "space-between", 
        padding: 5, 
        borderStyle: "solid", 
        borderColor: "#000", 
        backgroundColor: "#CCC", 
        borderRadius: 10 
    },
    itemBox: { 
        padding: 5, 
        marginTop: 10, 
        borderStyle: "solid", 
        borderColor: "#000", 
        backgroundColor: "#CCC", 
        borderRadius: 10, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.25, 
        shadowRadius: 4, 
        elevation: 5 
    },
    flexRow: {
        flexDirection: "row", 
        justifyContent: "space-between", 
    },
    currentEventTime: {
        fontFamily: "monospace",
        fontSize: 24,
        textAlignVertical: "center"
    }
})

export default style;