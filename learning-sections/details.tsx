import { FlatList, Image, Text, View } from 'react-native';
import {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '~/constants/images';
import { Entypo, Feather } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';

const Details = () => {
  const item = useLocalSearchParams();

  console.log('Items from explore in details screen :', item);


  return (
    <SafeAreaView className="bg-white-300 flex-1 px-4 ">
{/* Image */}


 <Image  source={images.img1}
   className='  w-full h-52  mt-8 mb-3 rounded-2xl'
   resizeMode= 'cover'
   />

      {/* For title and bookmark */}
      <View className=" flex-row items-center mb-3 justify-between">
        <Text className=" font-poppinsBold text-xl">Palak Paneer</Text>
        <Feather name= "bookmark" size={28} color={'black'} />
      </View>

{/* For desciptions */}
<View className='mb-3'>
      <Text className=" font-poppinsBold text-lg  mb-1 ">Desciption</Text>
      <Text className="  font-poppinsSemiBold">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima, mollitia! Dicta quae
        pariatur accusantium consectetur maiores impedit, ipsam ullam modi harum dolores odio ut.
        Natus, eos recusandae. Repellat, delectus illum!
      </Text>
</View>

      {/* to create this we need nested layout 
three divs: 1. For container 
2. for leaf 
3. for texts
*/}
      {/* Container */}
      <View className=" flex-row items-center mb-3  gap-1">
        <Image source={images.star} className="  h-7 w-7" />

        {/* Here you don't need to flex-col cause by default cols are flex-col */}
        <View className='  bg-green-400'>
          <Text>35000 Cal</Text>
          <Text>Calories</Text>
        </View>
      </View>

{/* Ingrdient list */}
<View className=' flex-row justify-between items-center mb-6'>
  <Text className='  font-poppinsBold text-lg'>Ingredient</Text>
  <Text className='   font-poppinsSemiBold     text-base'>15 Items</Text>
</View>








      {/* Container For Recipe Steps */}
      <View>
        <Text className='font-poppinsBold text-lg'>Recipe Steps</Text>

        <View className=" flex-row   items-center gap-2 rounded-xl border bg-orange-300 p-4">
          <View className=" h-10 w-10 flex-col items-center justify-start rounded-xl bg-green-400">
            <Text className=" text-center font-poppinsSemiBold  text-2xl">1</Text>
          </View>

          <Text
            // Why flex-1 ? for filling avaible space
            className=" flex-1  font-poppinsRegular">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum repellat Lorem ipsum
            dolor sit amet, co. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla debitis rerum corporis. Ad, sequi itaque praesentium, explicabo modi perspiciatis a totam ipsum obcaecati necessitatibus minus corrupti 
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Details;
