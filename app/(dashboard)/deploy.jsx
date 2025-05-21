import { StyleSheet, View, useColorScheme } from 'react-native'
import { BarChart } from 'react-native-chart-kit'
import { Colors } from '../../constants/Colors'
import { Dimensions } from 'react-native'
import deployMock from '../../assets/data/mock.deployment.json'



import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedCard from "../../components/ThemedCard"

const deployData = {
  labels: deployMock.map(d => d.month),
  datasets: [
    { data: deployMock.map(d => d.deployments) }
  ]
}

const latest = deployMock[deployMock.length - 1]
const numberOfLibraries = latest.libraries
const securityConfig = latest.securityConfig
const environment = latest.environment
const screenWidth = Dimensions.get('window').width



const Deploy = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  const backgroundColor = theme.background
  return (
    <ThemedView style={styles.container} safe>
      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Deployment
      </ThemedText>

      <ThemedCard style={styles.card}>
  <ThemedText style={styles.label}>Environment</ThemedText>
  <ThemedText style={styles.subLabel}>{environment}</ThemedText>
</ThemedCard>

      <ThemedCard style={styles.card}>
        <ThemedText style={styles.label}>Infrastructure as Code</ThemedText>
        <ThemedText style={styles.subLabel}>Enabled</ThemedText>
      </ThemedCard>

      <ThemedCard style={styles.card}>
  <ThemedText style={styles.label}>Number of Libraries</ThemedText>
  <ThemedText style={styles.value}>{numberOfLibraries}</ThemedText>
</ThemedCard>
<ThemedCard style={styles.card}>
  <ThemedText style={styles.label}>Security Configuration</ThemedText>
  <ThemedText style={styles.subLabel}>{securityConfig}</ThemedText>
</ThemedCard>

      <ThemedCard style={styles.chartCard}>
  <ThemedText style={styles.cardLabel}>Deployment Size</ThemedText>
  <BarChart
    data={deployData}
    width={screenWidth - 54}
    height={180}
    fromZero
    chartConfig={{
      backgroundColor: backgroundColor,
      backgroundGradientFrom: backgroundColor,
      backgroundGradientTo: backgroundColor,
      decimalPlaces: 0,
      color: () => "#7FB3FF",
      labelColor: () => "#B6C6E3",
      barPercentage: 0.5,
      propsForBackgroundLines: {
        stroke: "#e5e7eb",
      },
    }}
    style={{ borderRadius: 18, marginTop: 8 }}
    withInnerLines={true}
    withHorizontalLabels={true}
    showBarTops={false}
  />
</ThemedCard>
    </ThemedView>
  )
}

export default Deploy

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#000",
  },
  chartCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    marginTop: 4,
    alignItems: "center",
    alignSelf: "center",
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  subLabel: {
    fontSize: 14,
    color: "#888",
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 2,
  },
})