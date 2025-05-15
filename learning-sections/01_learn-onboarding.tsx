import { Alert, Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import { Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Marquee } from '@animatereactnative/marquee';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { createUser } from '../appwrite/appwrite';
import { allImages, exploreData } from '../data/data';
import { useAuthContext } from '../contexts/auth-provider';

const Index = () => {
  const { loggedIn, user } = useAuthContext();
  // if (!loggedIn && user) {
  // It's very bad code cause when loggedIn true then it doesn't let naviage to home screen
  // instead if loggedIn is false then don't navigate
  // if user is falsey value and user is also falsey value
  // then don't redirect it otherwise redirect it
  if (loggedIn && user) {
    return <Redirect href="/home" />;
  }

  // This fun will login the user
  const loginUser = async () => {
    try {
      // will call the createUser function
      // and store the return value in user variable
      const user = await createUser();
      // Then push the user to home screeen
      router.push('/home');
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
      <View className=" mb-6 mt-3">
        {/* By marquee componet let the items animate from right to left 
for 3 horizontal items  */}
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

      {/* App Info and Login container*/}
      <View className=" mt-4  h-56 items-center  justify-center rounded-xl  bg-secondary  p-5 "
      elevation={2}
      >
        <Text className="  font-poppinsBold  text-custom-green  text-2xl  text-action"
        >Cookmate AI</Text>
        <Text className="   font-semibold ">Generate delicious recipes in seconds</Text>
        <Text className="   font-semibold text-gray-600">with the power of AI</Text>

        <TouchableOpacity
          onPress={loginUser}
          activeOpacity={0.7}
          className="   bg-custom-green w-full flex-row items-center justify-center gap-2 rounded-xl p-2  p-3 ">
          <AntDesign name="google" size={24} color="black" />
          <Text className="  text-base   font-semibold">Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;
// Now it's time to manage user so that user can be accessible all over the app
