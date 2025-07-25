import { Alert, Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Marquee } from '@animatereactnative/marquee';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { createUser } from '../appwrite/appwrite';
import { allImages, exploreData } from '../data/data';
import { useAuthContext } from '../contexts/auth-provider';
import images from '~/constants/images';

const Onboarding = () => {
  const { loggedIn, user } = useAuthContext();
  // if (!loggedIn && user) {
  // It's very bad code cause when loggedIn true then it doesn't let naviage to home screen
  // instead if loggedIn is false then don't navigate
  // if user is falsey value and user is also falsey value
  // then don't redirect it otherwise redirect it
  if (loggedIn && user) {
    // As such writing this much doesn't matter but stil let me write it.
    // so from which and which screen it goes.
    // return <Redirect href="/(protected)/(tabs)/home" />;
  }

  // This fun will login the user
  const loginUser = async () => {
    try {
      // will call the createUser function
      // and store the return value in user variable
      const user = await createUser();
      // Then push the user to home screeen
    } catch (error) {
      // using here log cause I don't want on
      // user-end get a model for showing error information
      console.log('Error in loginUser fun from index.tsx :', error);

      Alert.alert('Auth Error', 'Failed to Authorize');

      throw new Error('Failed to Authorize');
    }
  };

  return (
    <SafeAreaView className="flex-1   bg-primary px-4 ">
      <StatusBar backgroundColor="white" />

      {/* Container for animations */}
      <Image source={images.chef} className=" mb-2  h-[480px] w-full" resizeMode="cover" />

      {/* App Info and Login container*/}
      <View
        className="     h-56 items-center     rounded-xl  bg-secondary  p-5 "
        style={{
          elevation: 2,
        }}>
        <View>
          <Text className="   text-custom-green  mb-2 font-pBold  text-2xl  text-green-800">
            Cookmate AI
          </Text>
        </View>

        <View className=" mb-8">
          {/* Ditch takeouts and create delicious meals at home, Cookmate AI will guide you in every step */}
          <Text className="    font-pSemibold  text-base text-gray-600  ">
            Generate delicious recipes in seconds
          </Text>
          <Text className="  text-center font-pSemibold text-[20px] text-gray-600">
            with the power of AI
          </Text>
        </View>

        <TouchableOpacity
          // onPress={loginUser}
          onPress={() => router.push('/(protected)/(tabs)/home')}
          activeOpacity={0.7}
          className=" w-full flex-row 
          items-center justify-center 
          gap-2 rounded-2xl bg-green-700 p-3
          
          ">
          <AntDesign name="google" size={24} color="white" />
          <Text className="    font-pSemibold text-[16px]   text-white">Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
