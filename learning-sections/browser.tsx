import { View, Text, StyleSheet, Button } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';

const Browser = () => {
  const [result, setResult] = useState(null);

  const handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://expo.dev');
    setResult(result);
  };
  const dismiss = () => {
      WebBrowser.openAuthSessionAsync("https://docs.expo.dev/",)
    //   .dismissBrowser()
  }
  console.log("Result :",typeof result);
//   Stringfy converts in Object into string
  console.log("Result JSON:", typeof JSON.stringify(result));
  
  return (
    <SafeAreaView style={styles.container} className=" bg-dark flex-1 items-center px-4">
      <Text>browser</Text>
      <Button title="Open WebBrowser" onPress={handlePressButtonAsync} />
      <Button title="Dismiss WebBrowser" onPress={dismiss} />
      <Text>{result && JSON.stringify(result)}</Text>
    </SafeAreaView>
  );
};

export default Browser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});
