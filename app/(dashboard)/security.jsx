import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedCard from '../../components/ThemedCard'

const recentIssues = [
  { title: "Unauthorized access", level: "Critical", color: "#EF4444", icon: "warning" },
  { title: "SQL injection vulnerability", level: "High", color: "#F59E42", icon: "warning" },
  { title: "Insecure deserialization", level: "High", color: "#F59E42", icon: "warning" },
  { title: "Cross-site scripting", level: "Medium", color: "#10B981", icon: "warning" },
]

const Security = () => {
  return (
    <ThemedView style={styles.container} safe>
      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Security
      </ThemedText>

      <View style={styles.row}>
        <ThemedCard style={styles.card}>
          <ThemedText style={styles.label}>Số điểm yếu</ThemedText>
          <ThemedText style={styles.value}>8</ThemedText>
        </ThemedCard>
        <ThemedCard style={styles.card}>
          <ThemedText style={styles.label}>CVSS trung bình</ThemedText>
          <ThemedText style={styles.value}>7,1</ThemedText>
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