import { View, Text } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const NotFound = () => {
  return (
    <SafeAreaView className=" flex-1 items-center justify-center  bg-primary px-4">
      <Text className="text-action font-pBold text-4xl">Screen is not found</Text>
    </SafeAreaView>
  );
};

export default NotFound;
