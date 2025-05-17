import { StyleSheet, Text} from 'react-native'
import { Link } from 'expo-router'


// theme components
import ThemedView from '../../components/ThemedView'
import ThemedLogo from '../../components/ThemedLogo'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'

const Home = () => {
  return (
    <ThemedView style={styles.container} >
      <ThemedLogo />
      <Spacer height={20}/>

      <ThemedText style={styles.title} title = {true}>The Number 1</ThemedText>

    <Spacer height={10}/>
      <ThemedText>Reading List App</ThemedText>
      <Spacer />

      <Link href="/about" style={styles.link}>
      <ThemedText>About Page</ThemedText>
      </Link>
      <Link href="/contact" style={styles.link}>
      <ThemedText>Contact Page</ThemedText>
      </Link>
    </ThemedView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1
  }
})