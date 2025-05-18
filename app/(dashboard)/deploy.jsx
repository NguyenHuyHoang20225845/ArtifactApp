import { StyleSheet, View } from 'react-native'

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedCard from "../../components/ThemedCard"

const Deploy = () => {
  return (
    <ThemedView style={styles.container} safe>
      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Deployment
      </ThemedText>

      <ThemedCard style={styles.card}>
        <ThemedText style={styles.label}>Environment</ThemedText>
      </ThemedCard>

      <ThemedCard style={styles.card}>
        <ThemedText style={styles.label}>Infrastructure as Code</ThemedText>
        <ThemedText style={styles.subLabel}>Enabled</ThemedText>
      </ThemedCard>

      <ThemedCard style={styles.card}>
        <ThemedText style={styles.label}>Number of Libraries</ThemedText>
        <ThemedText style={styles.value}>18</ThemedText>
      </ThemedCard>

      <ThemedCard style={styles.card}>
        <ThemedText style={styles.label}>Security Configuration</ThemedText>
        <ThemedText style={styles.subLabel}>High</ThemedText>
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