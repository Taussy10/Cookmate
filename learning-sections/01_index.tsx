import { StyleSheet, Text, View, TouchableOpacity , Alert, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Redirect, router } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { useLogto } from '@logto/rn';
import { createUser } from '~/appwrite/appwrite';
import { useAuth , useSSO } from '@clerk/clerk-expo';


const onBoarding = () => {
const {isSignedIn} = useAuth()

if (isSignedIn) {
  return <Redirect href={"/home"} />
  }

  // const Login = async () => {
  //   const response = await createUser();
  //   if (response) {
  //     router.replace('/home');
  //   } else {
  //     Alert.alert('Error', 'Not authorize');
  //   }
  //   try {
  //     // await createUser()
  //     router.replace('/home');
  //   } catch (error) {
  //     console.log(error);
  //     return;
  //   }
  // };
  return (
    <SafeAreaView className="flex-1 bg-blue-300 px-4 ">
      {/* The screen will divided between two parts 
      // 1. Animation 
      // 2. App info
      */}



      {/* App Info container*/}
      <View className="  items-center justify-center bg-orange-400">
        <Text className=" font-pBold  text-2xl">Cookmate AI</Text>

        <Text className="   font-semibold text-gray-600">
          Generate delicious recipes in seconds
        </Text>
        <Text className="   font-semibold text-gray-600">with the power of AI</Text>

        <TouchableOpacity
        // here we are gonna use replace so that if user 
        // goes back then it shouldn't go to index just move out of the app
        // onPress={() => Login()}
          activeOpacity={0.6}
          className=" w-full flex-row items-center justify-center rounded-2xl bg-green-500 p-5">
          <Text className="    font-pSemibold text-lg text-white ">Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default onBoarding;
