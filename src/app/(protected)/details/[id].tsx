import { FlatList, Image, Text, View } from 'react-native';
import {useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '../../../constants/images';
import {Ionicons} from '@expo/vector-icons';
import {useLocalSearchParams} from 'expo-router';
import {addBookmark} from '../../../appwrite/appwrite';
import { jsonrepair } from 'jsonrepair';
import { useAuthContext } from '../../../contexts/auth-provider';

const Details = () => {
  const [bookmark, setBookmark] = useState(false)
  const item = useLocalSearchParams();
    const {user} = useAuthContext()
  console.log('Items from explore in details screen :', item);
  // console.log('Ingredients:', jsonrepair(item.ingredients.name));
  console.log('extraInfo:',jsonrepair(item.extraInfo))
  console.log('ID:', item.$id);

  // let unps =  jsonrepair(item)
  // console.log(unps.UserName, unps.Rolename);
  // console.log("UNUMS :",unps.$id);
  
  return (
    <SafeAreaView className="bg-white-300 flex-1 px-4 ">
{/* Image */}


 <Image  source={{uri: item.aiImage}}
   className='  w-full h-52  mt-8 mb-3 rounded-2xl'
   resizeMode= 'cover'
   />

      {/* For title and bookmark */}
      <View className=" flex-row items-center mb-3 justify-between">
        <Text className=" font-poppinsBold text-xl">{item.recipeName.slice(0,23)}..</Text>
        {
          bookmark === false? 
          (  <Ionicons name= "bookmark-outline" size={28} color={'black'} 
            onPress={() => {addBookmark(item?.$id, user?.email); setBookmark(false)}} />):
           ( <Ionicons name= "bookmark" size={28} color={'black'} 
          onPress={() => {addBookmark(item?.$id, user?.email); setBookmark(true)}} />)
        }
      </View>

{/* For desciptions */}
<View className='mb-3'>
      <Text className=" font-poppinsBold text-lg  mb-1 ">Desciption</Text>
      <Text className="  font-poppinsSemiBold">
      {item.description}
      </Text>
</View>

      {/* to create this we need nested layout 
three divs: 1. For container 
2. for leaf 
3. for texts
*/}
      {/* Container */}
      <View className="  flex-row items-center mb-3  ">
        
        <View className=' flex-row items-center gap-1 bg-green-300 p-1 w-32 rounded-2xl h-20'>
        <Image source={images.star} className="  h-7 w-7" />

        {/* Here you don't need to flex-col cause by default cols are flex-col */}
        <View className='  flex-col '>
          <Text className=' text-green-700 font-poppinsBold'>350 Cal</Text>
          <Text className='   font-poppinsSemiBold text-gray-700'>Calories</Text>
        </View>

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

{
          console.log("Item :",item.ingredients)
          // console.log("Steps :",item.ingredients.map(({item, index})=> {
          //   console.log("Items",item)
          // }))
          
}
{/* 
{
  
  // item?.steps.map(({item, index})=>{
  //   console.log("item",item);
    
  //   return(
  //     <Text>Hello</Text>
  //   )
  // })
} */}
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
