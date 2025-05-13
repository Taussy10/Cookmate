// import {useState } from 'react';
import { AntDesign, Entypo } from '@expo/vector-icons/';
import { useRouter } from 'expo-router';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { profileOptions } from '../../../data/data';
import { useAuthContext } from '../..//contexts/auth-provider';

interface propsType  {
  id: number
  title: string
  press: () => void
}

const Profile = () => {
  const router = useRouter();
    const { loggedIn, user } = useAuthContext();
  console.log("LoggedIn :",loggedIn);
  console.log("user :",user);
  
  

  return (
    <SafeAreaView
      // This is design requriements
      className="flex-1 bg-blue-300 px-4 ">
      {/* Creating 2 sections in screen: name-PFP and options: */}

      <ScrollView>
        {/* name-pfp: profile image and name */}
        <View className=" mb-6 mt-3 items-center justify-center">
          <Image source={require('assets/icon.png')} className="mb-3 h-28 w-28 rounded-full" />
          <Text className="font-poppinsRegular text-3xl font-bold">Tausif</Text>
        </View>

        {/* Containe for Options*/}
        <View 
        // className=" bg-green-300"
        >
          {profileOptions.map(({ id, icon, title , press}) => {
            return (
              // {/* View for each options  */}
              // {/* optons one contains two things so create a container:  */}
              <TouchableOpacity
                key={id}
                activeOpacity={0.7}
                onPress={() => {
                  // checkin if press exist or not 
                  if (press) {
                    router.push(press);
                  }}
                }
                className="  rounded-xl  mb-3 flex-row items-center justify-between bg-white p-4 ">
                  
                {/*For group of icon and title  */}
                <View className=" flex-row gap-2">
                  
                  <Image source={icon} className=" h-8 w-8" />
                  <Text className="  font-poppinsSemiBold text-xl">{title}</Text>
                </View>
                <AntDesign name="right" size={24} color="black" />
              </TouchableOpacity>
            );
          })}
          
         

          {/* View for each options  */}
          {/* optons one contains two things so create a container:  */}
          <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            
            router.push("/home")}
          className="flex-row items-center justify-between p-4  bg-green-500">
            {/*For group of icon and title  */}
            <View className=" flex-row gap-2">
              <Entypo name="star" size={28} color="yellow" />
              <Text className="  font-poppinsSemiBold text-xl">This button is for testing</Text>
            </View>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
