import { View, Text, Modal, ActivityIndicator } from 'react-native';

interface propsType {
visible: boolean
text: string
}
const Loading = ({ visible, text }: propsType) => {
  // visible: false,
  // text: "loading... "
  return (
    <Modal transparent 
     
    visible={visible}
    >
      <View
        className=" flex-1 items-center justify-center
           bg-[#00000070]
           ">
        <View className=" w-36  items-center    rounded-xl bg-green-600 p-6 ">
          <ActivityIndicator color={'white'} size={'large'} />
          <Text className="  mt-4  font-poppinsBold text-white ">{text}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Loading;
