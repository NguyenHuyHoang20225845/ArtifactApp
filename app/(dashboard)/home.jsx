import { StyleSheet, View } from 'react-native'
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons'

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedCard from '../../components/ThemedCard' 
import Spacer from '../../components/Spacer'

const metrics = [
  {
    icon: <Ionicons name="git-branch-outline" size={36} color="#7FB3FF" />,
    label: "Commits / Tuần",
    value: "128",
  },
  {
    icon: <Feather name="clock" size={36} color="#7FB3FF" />,
    label: "Dòng code / Ngày",
    value: "5,432",
  },
  {
    icon: <MaterialCommunityIcons name="layers-outline" size={36} color="#7FB3FF" />,
    label: "Artifacts",
    value: "76",
  },
  {
    icon: <Feather name="cloud" size={36} color="#7FB3FF" />,
    label: "Triển khai",
    value: "23",
  },
]

const Home = () => {
  return (
    <ThemedView style={styles.container} safe>
      <Spacer />
      <View style={styles.headerRow}>
        <ThemedText style={styles.title} title={true}>DevOps Dashboard</ThemedText>
        <Ionicons name="notifications-outline" size={28} color="#B6C6E3" />
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
    color: "#B6C6E3",
    fontSize: 15,
    marginTop: 10,
    marginBottom: 6,
    textAlign: "center",
  },
  cardValue: {
    color: "#7FB3FF",
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
  },
})