import { View, Text } from 'react-native'
import React from 'react'
import { AntDesign , Entypo } from '@expo/vector-icons'


// Now for other options you can keep copying and adding 
// but won't use this method
const LearnProfile = () => {
  return (
    <View>
              {/* Containe for Options*/}
      <View className=" bg-green-300">
        {/* View for each options  */}
        {/* optons one contains two things so create a container:  */}
        <View className="   flex-row items-center justify-between p-4 mb-3  ">
          {/*For group of icon and title  */}
          <View className=" flex-row gap-2">
            <Entypo name="star" size={28} color="yellow" />
            <Text className="  font-poppinsSemiBold text-xl">Create New Recpie</Text>
          </View>
          <AntDesign name="right" size={24} color="black" />
        </View>

        {/* View for each options  */}
        {/* optons one contains two things so create a container:  */}
        <View className="flex-row items-center justify-between p-4  ">
          {/*For group of icon and title  */}
          <View className=" flex-row gap-2">
            <Entypo name="star" size={28} color="yellow" />
            <Text className="  font-poppinsSemiBold text-xl">Create New Recpie</Text>
          </View>
          <AntDesign name="right" size={24} color="black" />
        </View>
    </View>
    </View>
  )
}

export default LearnProfile

