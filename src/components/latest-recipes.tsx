import { View, Text, TouchableOpacity, FlatList, Image, ImageBackground } from 'react-native';
import React from 'react';
import images from '~/constants/images';
import { useRouter } from 'expo-router';

const LatestRecipes = ({ data }) => {
  const router = useRouter();
  return (
    <View>
          <Text className=" font-pSemibold  text-xl">Latest Recipes</Text>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        // keyExtractor={(index) => index.id  }
        renderItem={({ item }) => (
          // this is container
          <TouchableOpacity
            activeOpacity={0.7}
            className="  mx-2  my-2 "
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
              resizeMethod="auto"
              className="h-48 w-64 overflow-hidden rounded-2xl ">
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
                style={{ position: 'absolute', bottom: 4 }}
                numberOfLines={2}
                className=" font-pBold w-full text-center  text-white ">
                {item?.recipeName.length < 10 ? item?.recipeName : item?.recipeName.slice(0, 15)}
                ...
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default LatestRecipes;
