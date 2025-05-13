import { Alert, Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Marquee } from '@animatereactnative/marquee';
import { SafeAreaView } from 'react-native-safe-area-context';
import {createUser} from "appwrite/appwrite"
import { AntDesign } from '@expo/vector-icons';
import { allImages, exploreData } from '~/data/data';
import { colors } from '~/constants/colors';
import { useAuthContext } from '~/contexts/auth-provider';

const Index = () => {
  const { loggedIn, user } = useAuthContext();

  // useAuthContenxt function returns these things
  // {"loading": false, "loggedIn": true, }

  //  only few wrote gives 10,20 things
  //  So we need to destructure it

  // Why need cause if next time user come then he won't go thorug process of login
  // so store the user's data and send

  if (loggedIn) {
    return <Redirect href="/home" />;
  }

  const login = async () => {
    try {
      const result = await createUser();

      if (result) {
        console.log('Login successful');
        router.replace('/home');
      } else {
        Alert.alert('Error', 'Failed to Login');
      }
    } catch (error) {
      console.log('Error from join fun in index.tsx', error);
      Alert.alert('Error', 'Failed to Login');
    }
  };

  const loginUser = async () => {
    try {
      const user = await createUser();
      console.log('user :', user);

      //  if (user) {
      // router.push("/home")
      //  }else{
      //   router.push("/")
      //  }
    } catch (error) {
      console.log('Error from loginUser fun in index.tsx', error);
      Alert.alert('Auth Error', 'Authization failure');
    }
  };

  // const login = async () => {
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
    // bg-green-300
    <SafeAreaView className="flex-1     bg-blue-300 px-4 ">
      <StatusBar backgroundColor="white" />
      <View className=" mb-6 mt-3">
        <Marquee
          spacing={10}
          speed={0.9}
          style={{
            transform: [{ rotate: '-4deg' }],
          }}>
          <View className="flex flex-row gap-6">
            {allImages.map((item, index) => (
              <Image key={index} source={item} className=" h-40 w-40 rounded-xl" />
            ))}
          </View>
        </Marquee>

        <Marquee
          spacing={10}
          speed={0.7}
          style={{
            transform: [{ rotate: '-4deg' }],
            marginTop: 10,
          }}>
          <View className="flex flex-row gap-6">
            {allImages.map((item, index) => (
              <Image key={index} source={item} className=" h-40 w-40 rounded-xl" />
            ))}
          </View>
        </Marquee>
        <Marquee
          spacing={10}
          speed={0.5}
          style={{
            transform: [{ rotate: '-4deg' }],
            marginTop: 10,
          }}>
          <View className="flex flex-row gap-6">
            {allImages.map((item, index) => (
              <Image key={index} source={item} className=" h-40 w-40 rounded-xl" />
            ))}
          </View>
        </Marquee>
      </View>

      {/* App Info container*/}
      <View className="  h-56 items-center  justify-center rounded-xl bg-green-500   p-5 ">
        <Text className="  font-poppinsBold  text-2xl  text-custom-green">Cookmate AI</Text>
        <Text className="   font-semibold ">Generate delicious recipes in seconds</Text>
        <Text className="   font-semibold text-gray-600">with the power of AI</Text>

        <TouchableOpacity
          // why in arrow functin ? cause we want to provide params in it
          // onPress={() => handleSignIn('oauth_google')}
          // Replace push with replace cause we if user have accesed home screen the shouldn't go again onboarding screen
          // onPress={() => router.push("/home")}
          onPress={() => createUser()}
          activeOpacity={0.7}
          className="   w-full flex-row items-center justify-center gap-2 rounded-xl bg-custom-green p-2  p-3 ">
          <AntDesign name="google" size={24} color="black" />
          <Text className="  text-base   font-semibold">Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;
