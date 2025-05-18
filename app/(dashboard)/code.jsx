import { StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedCard from "../../components/ThemedCard"

const vulnerableModules = ["Module A", "Module B", "Module C", "Module D"]

const Code = () => {
  return (
    <ThemedView style={styles.container} safe>
      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Code Metrics
      </ThemedText>

      <ThemedCard style={styles.card}>
        <ThemedText style={styles.label}>Dòng code thay đổi</ThemedText>
        <ThemedText style={styles.value}>1,520</ThemedText>
      </ThemedCard>

      <ThemedCard style={styles.card}>
        <ThemedText style={styles.label}>Số commit</ThemedText>
        <ThemedText style={styles.value}>30</ThemedText>
      </ThemedCard>

      <ThemedCard style={styles.card}>
        <ThemedText style={styles.label}>Độ phức tạp</ThemedText>
        <ThemedText style={styles.subLabel}>Cyclomatic Complexity</ThemedText>
      </ThemedCard>

      <ThemedCard style={styles.card}>
        <ThemedText style={styles.label}>Module dễ bị tấn công</ThemedText>
        {vulnerableModules.map((m, idx) => (
          <View
            key={m}
            style={[
              styles.moduleRow,
              idx === vulnerableModules.length - 1 && { borderBottomWidth: 0 },
            ]}
          >
            <Ionicons name="warning" size={18} color="#EF4444" style={{ marginRight: 8 }} />
            <ThemedText style={[ styles.label, {fontSize: 15, fontWeight: "normal"}]}>{m}</ThemedText>
          </View>
        ))}
      </ThemedCard>
    </ThemedView>
  )
}

export default Code

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
    // elevation: 1,       // Xóa hoặc comment dòng này
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  subLabel: {
    fontSize: 13,
    color: "#888",
  },
  value: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 2,
  },
  moduleRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 8,
  },
  moduleText: {
    fontSize: 15,
    color: "#222",
  },
})