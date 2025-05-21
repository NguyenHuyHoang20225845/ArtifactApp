import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { PieChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import dashboard from '../../assets/data/mock.dashboard.json'


import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedCard from '../../components/ThemedCard'
function getIssueProps(level) {
  switch (level) {
    case "Critical":
      return { icon: "alert-circle", color: "#EF4444" }
    case "High":
      return { icon: "alert", color: "#F59E42" }
    case "Medium":
      return { icon: "warning", color: "#10B981" }
    default:
      return { icon: "information-circle", color: "#64748b" }
  }
}
const screenWidth = Dimensions.get('window').width

const securityData = dashboard.security
const totalIssues = securityData.length
const avgCvss = (securityData.reduce((sum, i) => sum + i.cvss, 0) / totalIssues).toFixed(1)
const countByLevel = level => securityData.filter(i => i.level === level).length
const recentIssues = securityData
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 4)
  .map(item => ({
    ...item,
    ...getIssueProps(item.level)
  }))

const pieData = [
  {
    name: 'Critical',
    population: countByLevel('Critical'),
    color: '#EF4444',
    legendFontColor: '#EF4444',
    legendFontSize: 15,
  },
  {
    name: 'High',
    population: countByLevel('High'),
    color: '#F59E42',
    legendFontColor: '#F59E42',
    legendFontSize: 15,
  },
  {
    name: 'Medium',
    population: countByLevel('Medium'),
    color: '#10B981',
    legendFontColor: '#10B981',
    legendFontSize: 15,
  },
]



const Security = () => {
  return (
    <ThemedView style={styles.container} safe>
      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Security
      </ThemedText>

      <ThemedCard style={[styles.card, { alignItems: "center", paddingBottom: 0 }]}>
  <View style={{ flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "center" }}>
    <PieChart
      data={pieData}
      width={140}
      height={140}
      chartConfig={{
        color: () => "#000",
      }}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="25"
      hasLegend={false}
      center={[0, 0]}
      absolute
    />
    <View style={{ marginLeft: 18, justifyContent: "center" }}>
  {pieData.map((item, idx) => (
    <View
      key={item.name}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: idx < pieData.length - 1 ? 8 : 0,
      }}
    >
      <View
        style={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: item.color,
          marginRight: 8,
        }}
      />
      <ThemedText style={{ fontSize: 16, marginRight: 8 }}>{item.name}</ThemedText>
      <ThemedText style={{ fontSize: 16 }}>
        {totalIssues > 0 ? Math.round((item.population / totalIssues) * 100) : 0}%
      </ThemedText>
    </View>
  ))}
</View>
  </View>
</ThemedCard>

      <View style={styles.row}>
  <ThemedCard style={styles.card}>
    <ThemedText style={styles.label}>Số điểm yếu</ThemedText>
    <ThemedText style={styles.value}>{totalIssues}</ThemedText>
  </ThemedCard>
  <ThemedCard style={styles.card}>
    <ThemedText style={styles.label}>CVSS trung bình</ThemedText>
    <ThemedText style={styles.value}>{avgCvss}</ThemedText>
  </ThemedCard>
</View>

      <ThemedCard style={styles.card}>
        <ThemedText style={styles.subHeading}>Lỗi gần đây</ThemedText>
        {recentIssues.map((item, idx) => (
          <View
            key={item.title}
            style={[
              styles.issueRow,
              idx === recentIssues.length - 1 && { borderBottomWidth: 0 },
            ]}
          >
            <Ionicons name={item.icon} size={18} color={item.color} style={{ marginRight: 8 }} />
            <ThemedText style={styles.issueTitle}>{item.title}</ThemedText>
            <ThemedText style={[styles.issueLevel, { color: item.color }]}>{item.level}</ThemedText>
          </View>
        ))}
      </ThemedCard>
    </ThemedView>
  )
}

export default Security

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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    marginHorizontal: 4,
    borderWidth: 1,
    
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  value: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 2,
  },
  subHeading: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 8,
  },
  issueRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#F1F5F9",
    paddingVertical: 10,
  },
  issueTitle: {
    flex: 1,
    fontSize: 15,
  },
  issueLevel: {
    fontWeight: "bold",
    fontSize: 15,
    minWidth: 70,
    textAlign: "right",
  },
})