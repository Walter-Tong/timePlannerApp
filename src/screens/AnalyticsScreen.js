import { Text } from "react-native";
import { View } from "react-native";
import style from "../style";
import { ScrollView } from "react-native";
import PieChart from "react-native-pie-chart";
import { useContext, useState } from "react";
import EventContext from "../context/EventContext";
import { MaterialIcons } from '@expo/vector-icons';
import getIcon from "../function/getIcon";
import { icons } from "../enum";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { VictoryBar, VictoryGroup } from "victory-native";

function calculateDateDifference(date1, date2) {
    const differenceInMilliseconds = Math.abs(date2 - date1);
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    return differenceInDays;
}

function AnalyticsScreen() {
    const { eventTypes, events } = useContext(EventContext)

    const [daysBefore, setDaysBefore] = useState(0);

    const [lineChartIndex, setLineChartIndex] = useState(0);

    const dateArray = [0, 1, 3, 7, 14, 30, 90];

    const now = new Date();

    const screenWidth = Dimensions.get("window").width;

    const chartConfig = {
        backgroundGradientFrom: "#CCC",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#CCC",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        barPercentage: 0.5,
    };

    now.setUTCHours(0);
    now.setUTCMinutes(0);
    now.setUTCSeconds(0);
    now.setUTCMilliseconds(0);

    const pieChartContent = eventTypes.map(() => 0)

    const pieChartColor = eventTypes.map((item) => item.color)

    for (let i = 0; i < events.length; i++) {
        if (calculateDateDifference(now, new Date(events[i].date)) <= dateArray[daysBefore]) {
            for (let j = 0; j < events[i].event.length; j++) {
                const index = eventTypes.findIndex((item) => item.type === events[i].event[j].type)
                if (index !== -1) {
                    pieChartContent[index] += (new Date(events[i].event[j].endTime) - new Date(events[i].event[j].startTime))
                }
            }
        } else {
            continue;
        }
    }

    const lineChartContent = events.map((item) => {
        const typeTimes = eventTypes.map(() => 0)

        item.event.forEach((record) => {
            const index = eventTypes.findIndex((type) => type.type === record.type)
            if (index !== -1) {
                typeTimes[index] += (new Date(record.endTime) - new Date(record.startTime))
            }
        })

        return { date: item.date, typeTimes }
    })

    console.log(lineChartContent)

    const types = eventTypes.map((item, index) => {
        return <Text key={index} style={{ marginRight: 5 }}>
            {getIcon.call(icons, item)} {item.type}
        </Text>
    })

    const lineCharts = [];

    for (let i = 0; i < eventTypes.length; i++) {
        const data = {
            labels: lineChartContent.map((item) => item.date.substring(5)),
            datasets: [
                {
                    data: lineChartContent.map((item) => item.typeTimes[i] / (1000 * 3600))
                }
            ],
            legend: ["Hours"]
        }
        lineCharts.push((
            <View key={i} style={style.itemBox}>
                {types[i]}
                <LineChart data={data} width={screenWidth} height={220} chartConfig={chartConfig} />
            </View>
        ))
    }

    const barChartData = [];

    console.log(pieChartColor);

    let counter = pieChartContent.filter(item => item).length;

    for (let i = 0; i < pieChartColor.length; i++) {
        if (pieChartContent[i]) {
            barChartData.push({ x: counter--, y: pieChartContent[i] / (1000 * 3600), label: (pieChartContent[i] / (1000 * 3600)).toFixed(2), fill: pieChartColor[i] })
        }
    }

    console.log(barChartData)

    return (
        <View style={style.page}>
            <View style={style.pageTitleBox}>
                <Text style={style.pageTitleText}>
                    Analytics
                </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "1%", marginTop: 10, borderStyle: "solid", borderColor: "#000", backgroundColor: "#CCC", borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
                {daysBefore > 0 ? <MaterialIcons name="keyboard-arrow-left" size={24} color="black" onPress={() => setDaysBefore(daysBefore - 1)} /> : <MaterialIcons name="keyboard-arrow-left" size={24} color="#CCC" />}
                <Text style={{ alignSelf: "center" }}>
                    {dateArray[daysBefore]} days before today
                </Text>
                {(daysBefore < dateArray.length - 1) ? <MaterialIcons name="keyboard-arrow-right" size={24} color="black" onPress={() => setDaysBefore(daysBefore + 1)} /> : <MaterialIcons name="keyboard-arrow-right" size={24} color="#CCC" />}
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ padding: 5, marginTop: 10 }}>
                    {pieChartContent.reduce((sum, a) => sum + a) === 0 ? <Text>No Event</Text> : <PieChart widthAndHeight={250} series={pieChartContent} sliceColor={pieChartColor} coverFill={null} coverRadius={0.7} />}
                </View>
                <View >
                    <VictoryGroup colorScale={pieChartColor} animate={{ duration: 2000 }} domain={{y: [-0.1, Math.max(...pieChartContent.map(item => item/(1000*3600)))*1.5]}}>
                        <VictoryBar data={barChartData} horizontal barWidth={15} barRatio={0.1} style={{data: {fill: ({datum}) => datum.fill}}} />
                    </VictoryGroup>
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                    {pieChartContent.reduce((sum, a) => sum + a) !== 0 && types}
                </View>
            </ScrollView>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: "1%", marginTop: 10, borderStyle: "solid", borderColor: "#000", backgroundColor: "#CCC", borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 }}>
                {lineChartIndex > 0 ? <MaterialIcons name="keyboard-arrow-left" size={24} color="black" onPress={() => setLineChartIndex(lineChartIndex - 1)} /> : <MaterialIcons name="keyboard-arrow-left" size={24} color="#CCC" />}
                <Text style={{ alignSelf: "center" }}>
                    {getIcon.call(icons, eventTypes[lineChartIndex])} {eventTypes[lineChartIndex].type}
                </Text>
                {(lineChartIndex < eventTypes.length - 1) ? <MaterialIcons name="keyboard-arrow-right" size={24} color="black" onPress={() => setLineChartIndex(lineChartIndex + 1)} /> : <MaterialIcons name="keyboard-arrow-right" size={24} color="#CCC" />}
            </View>
            <ScrollView style={{ flex: 1 }}>
                <View>
                    {events.length !== 0 && lineCharts[lineChartIndex]}
                </View>
            </ScrollView>
        </View>
    )
}

export default AnalyticsScreen;