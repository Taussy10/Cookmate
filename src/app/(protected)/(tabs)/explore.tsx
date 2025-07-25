import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { getAllRecipes } from '~/appwrite/appwrite';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import EmptyList from '~/components/global/Empty-list';

const Explore = () => {
  const [recipes, setrecipes] = useState([]);

  useEffect(() => {
    const allRecipes = async () => {
      const result = await getAllRecipes();
      setrecipes(result);
    };
    allRecipes();
  }, []);
  console.log('Recipes from explore.tsx :', recipes);

  return (
    <SafeAreaView className="mb-28 mt-10 flex-1 bg-white px-4  ">
      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={recipes}
        // data={[]}
        contentContainerStyle={{}}
        ListEmptyComponent={
          <EmptyList
         title={"No Items Found"}
      subTitle={"Make recipies using cookmate."}
          />
        }
        ListHeaderComponent={
          <View className=" flex-row  justify-between ">
            <AntDesign name="left" size={24} color="black" onPress={() => router.back()} />
            <Text className=" font-pBold  text-2xl text-black">Explore</Text>
            <View className=" w-6" />
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              router.push({
                pathname: '/details/[id]',
                params: {id: item.$id},
              })
            }
            className=" mx-2 my-2 ">
            <ImageBackground
              source={{
                uri: item?.aiImage,
              }}
              resizeMode="cover"
              className="h-64 w-44 overflow-hidden rounded-2xl bg-green-300 ">
              <Image
                source={require('@/assets/images/black_bg.jpg')}
                style={{
                  height: '20%',
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                  backgroundColor: 'red',
                }}
              />
              <Text
                style={{ position: 'absolute', bottom: 4, textAlign: 'center', width: '100%' }}
                numberOfLines={2}
                className="font-pSemibold text-white">
                {/* {item?.recipeName} */}
                {item?.recipeName.length < 10 ? item?.recipeName : item?.recipeName.slice(0, 15)}...
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Explore;
