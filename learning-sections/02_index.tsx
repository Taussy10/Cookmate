import { Alert, Image, Text, TouchableOpacity, View , LogBox} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState, useEffect } from 'react';
import { useSSO ,  SignedIn} from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
// For ignoring all logs
LogBox.ignoreLogs([ `Clerk: Clerk has been loaded with development keys. Development instances have strict usage limits and should not be used when deploying your application to production. Learn more: https://clerk.com/docs/deployments/overview [Component Stack]`])

// This is for just performances issues
export const useWarmUpBrowser = () => {
  useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

// Handle any pending authentication sessions
WebBrowser.maybeCompleteAuthSession();

const Login = () => {
  // When componet mount imporve the performance
  useWarmUpBrowser();

  const router = useRouter();

  const { startSSOFlow } = useSSO();

  // Created a funciton for handling signIn

  const handleSignIn = async (strategy: string) => {
    try {
      // why strategy in curly ? cause we want to breaek
      // it and why await ? cause it return promise so have to use await

      const { createdSessionId, setActive, signUp, signIn } = await startSSOFlow({ strategy });

      if (!createdSessionId) {
        throw new Error('Error aa reha hai bhai ');
      }

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      }

      

      if (signIn) {
        router.push('/home'); // Use router.push if using expo-router
      } else {
        router.push('/browser');
      }
      signIn?.userData
    } catch (error: unknown) {
      // console.log('error :',error);
      // throw new Error('Error while trying to sign-in ');
      console.log(error);
      Alert.alert('Sign-in Failed', 'Something went wrong');
    }
  };

  
  // console.log("component :", SignedIn("Hello"));
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-blue-300 px-4 ">
      {/* The screen will divided between two parts 
    // 1. Animation 
    // 2. App info
    */}

      <StatusBar style="light" backgroundColor={'red'} />

      {/* App Info container*/}
      {/* <View className="  items-center justify-center bg-orange-400"> */}
      <View className="  items-center justify-center ">

        <Text className=" mb-5 text-3xl font-bold  text-white">Your Journey starts here</Text>

        <Text className="   font-pBold  text-2xl text-white">Cookmate AI</Text>

        <Text className="   font-semibold text-gray-600">
          Generate delicious recipes in seconds
        </Text>
        <Text className="   font-semibold text-gray-600">with the power of AI</Text>

        <TouchableOpacity
        
          // why in arrow functin ? cause we want to provide params in it
          onPress={() => handleSignIn('oauth_google')}
          activeOpacity={0.7}
          // className=" w-full p-2 flex-row items-center justify-center gap-2 rounded-xl  bg-white p-3 ">
          className=" w-full flex-row items-center justify-center  gap-2 rounded-xl  bg-white p-3 ">
          <AntDesign name="google" size={24} color="black" />
          <Text className="  text-base   font-semibold">Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
