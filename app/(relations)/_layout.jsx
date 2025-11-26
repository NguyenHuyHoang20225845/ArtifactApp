import { Stack } from "expo-router"

export default function RelationsLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="details" 
        options={{ 
          title: "Chi tiết quan hệ Artifacts",
          headerShown: false 
        }} 
      />
    </Stack>
  )
}