import { StyleSheet, View, useColorScheme } from 'react-native'
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { Colors } from '../../constants/Colors'


import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedCard from '../../components/ThemedCard' 
import Spacer from '../../components/Spacer'

const metrics = [
  {
    icon: <Ionicons name="git-branch-outline" size={36}  />,
    label: "Commits / Tuần",
    value: "128",
  },
  {
    icon: <Feather name="clock" size={36}  />,
    label: "Dòng code / Ngày",
    value: "5,432",
  },
  {
    icon: <MaterialCommunityIcons name="layers-outline" size={36}  />,
    label: "Artifacts",
    value: "76",
  },
  {
    icon: <Feather name="cloud" size={36}  />,
    label: "Triển khai",
    value: "23",
  },
]

const chartData = {
  labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
  datasets: [
    {
      data: [70, 95, 85, 110, 150, 130, 90], // Thêm giá trị cho T3 ở vị trí thứ 2
      color: () => '#7FB3FF',
      strokeWidth: 2,
    },
  ],
}

const screenWidth = Dimensions.get('window').width

const Home = () => {

  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  const backgroundColor = theme.background

  return (
    <ThemedView style={styles.container} safe>
      <Spacer />
      <View style={styles.headerRow}>
        <ThemedText style={styles.heading} title={true}>DevOps Dashboard</ThemedText>
        <Ionicons name="notifications-outline" size={28}  />
      </View>

      <View style={styles.grid}>
        {metrics.map((item, idx) => (
          <ThemedCard key={idx} style={styles.card}>
            {item.icon}
            <ThemedText style={styles.cardLabel}>{item.label}</ThemedText>
            <ThemedText style={styles.cardValue}>{item.value}</ThemedText>
          </ThemedCard>
        ))}
      </View>

      {/* Biểu đồ */}
      <ThemedCard style={styles.chartCard}>
        <ThemedText style={styles.cardLabel}>Commit / Ngày</ThemedText>
        <LineChart
          data={chartData}
          width={screenWidth - 54}
          height={180}
          chartConfig={{
            backgroundColor: backgroundColor,
            backgroundGradientFrom: backgroundColor,
            backgroundGradientTo: backgroundColor,
            decimalPlaces: 0,
            color: () => "#7FB3FF",
            labelColor: () => "#B6C6E3",
            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: "#7FB3FF",
            },
          }}
          bezier
          style={{ borderRadius: 18 }}
        />
      </ThemedCard>
    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 36,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    color: "#fff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 18,
  },
  card: {
    width: "48%",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    alignItems: "center",
  },
  cardLabel: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 6,
    textAlign: "center",
  },
  cardValue: {
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
  },
  chartCard: {
  borderRadius: 18,
  padding: 16,
  marginBottom: 18,
  marginTop: 4,
  alignItems: "center",      // Thêm dòng này để căn giữa nội dung trong card
  alignSelf: "center",       // Thêm dòng này để căn giữa chính card
},
})