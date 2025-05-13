import { Stack } from "expo-router";

const ProtectedLayout = () => {
    return (
<Stack>
<Stack.Screen name= 'home' />
<Stack.Screen name='category' />
</Stack>
    )
}

export default ProtectedLayout;