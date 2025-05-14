import { StyleSheet, Text, View, Image, FlatList, ImageBackground } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { categoryData, exploreData } from '~/data/data';

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-blue-300 px-4 ">
      {/* So , in this we have three sections:
1. Name and pfp(don't care about veg option)
2. Input fiedl 
3. Category 
4. Latest Recipies
*/}

      {/* name-pfp: profile image and name */}
      <View className=" mb-6 mt-3 flex-row items-center gap-2 ">
        <Image source={require('assets/icon.png')} className="mb-3 h-14 w-14 rounded-full" />
        <Text className="font-poppinsRegular text-3xl font-bold">Tausif</Text>
      </View>

      {/* For creating category*/}
      <FlatList
        data={categoryData}
        numColumns={3}
        //  contentContainerClassName='  bg-green-500'
         ListFooterComponent={(
          <View>
              {/* For creating category*/}
      <FlatList
        data={exploreData}
         horizontal
         showsHorizontalScrollIndicator={true}
        //  contentContainerClassName=' flex-row bg-green-500'
        renderItem={({ item }) => (
          // this is container
              <View className=" mx-2 my-2  bg-green-500">
                   <ImageBackground
                     source={item.img}
                     resizeMode="cover"
                     className="  h-48 w-64 overflow-hidden rounded-2xl    ">
                     <Text
                       style={{ position: 'absolute', bottom: 4 }}
                       numberOfLines={2}
                       className=" font-poppinsBold text-white">
                       {item.name}
                     </Text>
                   </ImageBackground>
                 </View> )}/>
      </View>
      
         )}
        renderItem={({ item }) => (
          // this is container
          <View className="  flex-row bg-orange-500 ">
            {/* For item */}
            <View className="   mr-20 justify-center  text-center  ">
              <Image
                source={item.img}
                resizeMode="cover"
                className="  h-16 w-16 overflow-hidden rounded-full   "
              />
              <Text className=" text-center   font-poppinsSemiBold">{item.name}</Text>
            </View>
            
          </View>
        )}
      />

   {/* Latest recipie */}
   <View>
              {/* For creating category*/}
      <FlatList
        data={exploreData}
         horizontal
         showsHorizontalScrollIndicator={true}
        //  contentContainerClassName=' flex-row bg-green-500'
        renderItem={({ item }) => (
          // this is container
              <View className=" mx-2 my-2  bg-green-500">
                   <ImageBackground
                     source={item.img}
                     resizeMode="cover"
                     className="  h-48 w-64 overflow-hidden rounded-2xl    ">
                     <Text
                       style={{ position: 'absolute', bottom: 4 }}
                       numberOfLines={2}
                       className=" font-poppinsBold text-white">
                       {item.name}
                     </Text>
                   </ImageBackground>
                 </View> )}/>
      </View>
      
    </SafeAreaView>
  );
};

export default Home;
