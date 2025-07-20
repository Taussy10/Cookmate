import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getsCategoryBasedRecipe } from '~/appwrite/appwrite';
import images from '~/constants/images';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import EmptyList from '~/components/global/Empty-list';

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
      <EmptyList 
      recipeCategory={recipeCategory} 
      title={"No Items Found"}
      subTitle={"Try a Different Food Category"}
      />
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
