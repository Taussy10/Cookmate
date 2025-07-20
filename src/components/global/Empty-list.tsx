import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import images from '~/constants/images';

interface PropsType {
  // how to make ke prop optional
  // Add ?(optional sign) in front of props
  recipeCategory?: String;
  title: String;
  subTitle: String;
}

const EmptyList = ({ recipeCategory, title, subTitle }: PropsType) => {
  // Make variable optional by ? 
  const categoryText =
    recipeCategory && recipeCategory?.length > 0 && recipeCategory[0]?.category
      ? recipeCategory[0]?.category
      : ' ';
  return (
    <View className="  flex-1 items-center justify-center">
      {/* Add here category name */}
      <Text className="mb-6 mt-2 text-center font-pBold  text-2xl">{categoryText}</Text>
      <Image source={images.emptyState} className="   size-96    " resizeMode="contain" />
      {/* Text things */}
      <View className=" mt-10 ">
        <Text className="  text-center font-pBold text-2xl text-gray-700">{title}</Text>
        <Text className="    font-pSemibold  text-gray-500">{subTitle}</Text>
      </View>
    </View>
  );
};

export default EmptyList;
