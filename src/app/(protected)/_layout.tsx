import { Stack } from "expo-router";

const ProtectedLayout = () => {
    return (
<Stack screenOptions={{
    headerShown:false
}}>
    
<Stack.Screen name='category' />
<Stack.Screen name='details/id' />
</Stack>
    )
}

export default ProtectedLayout;