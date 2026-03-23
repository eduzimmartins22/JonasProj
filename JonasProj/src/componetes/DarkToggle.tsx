import { useColorScheme } from "nativewind"
import { TouchableOpacity } from "react-native"
import { Text } from "nativewind/components"
import { styled } from "nativewind"

const StyledTouchableOpacity = styled(TouchableOpacity)

export default function DarkToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme()

  return (
    <StyledTouchableOpacity
      onPress={toggleColorScheme}
      className="absolute top-10 right-5 bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-full"
    >
      <Text className="text-black dark:text-white">
        {colorScheme === "dark" ? "☀ Light" : "🌙 Dark"}
      </Text>
    </StyledTouchableOpacity>
  )
}