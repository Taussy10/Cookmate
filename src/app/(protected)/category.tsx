import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getsCategoryBasedRecipe } from '~/appwrite/appwrite';
import images from '~/constants/images';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';

const Category = () => {
  const item = useLocalSearchParams();
  const [recipeCategory, setRecipeCategory] = useState([]);

  useEffect(() => {
    const allRecipes = async () => {
      const result = await getsCategoryBasedRecipe(item.name);
      setRecipeCategory(result);
    };
    allRecipes();
  }, []);
  console.log('Recipes from category.tsx :', recipeCategory);

  console.log('Items from home :', item);
  return (
    <SafeAreaView className="flex-1 px-4 ">
      <Text className="mt-2 text-center text-2xl font-bold">{recipeCategory[0]?.category}</Text>

      <FlatList
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={recipeCategory}
        ListEmptyComponent={
          <View className="  flex-1 items-center justify-center">
            {/* Add here category name */}
            <Text className="mb-6 mt-2 text-center font-pBold  text-2xl">
              {recipeCategory[0]?.category.length > 0
                ? recipeCategory[0]?.category
                : 'Solve it'}
            </Text>
            <Image source={images.emptyState} className="   size-96    " resizeMode="contain" />
            {/* Text things */}
            <View className=" mt-10 ">
              <Text className="  text-center font-pBold text-2xl text-gray-700">
                No Items Found
              </Text>
              <Text className="    font-pSemibold  text-gray-500">
                Try a Different Food Category
              </Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            className=" mx-2 my-2 "
            onPress={() =>
              router.push({
                pathname: '/details/[id]',
                params: item,
              })
            }>
            <ImageBackground
              source={{
                uri: item?.aiImage,
              }}
              resizeMode="cover"
              className="h-64 w-44 overflow-hidden rounded-2xl bg-green-300 ">
              <Image
                source={images.gradient}
                style={{
                  height: '20%',
                  width: '100%',
                  position: 'absolute',
                  bottom: 0,
                  backgroundColor: '#111827',
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

export default Category;
