import Paho from "paho-mqtt";
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const options = {
  host: 'logix.useletric.com.br',
  port: 1883,
  path: 'weather/app',
  id: 'id_' + parseInt(Math.random()*100000)
}

const client = new Paho.Client(
  "logix.useletric.com.br",
  Number(1883),
  `${parseInt(Math.random()*100)}`
);

//client = new Paho.Client(options.host, options.port, options.path);
export default function App() {

  const [value, setValue] = useState(0);

  function onMessage(message){
    if(message.destinationName === "weather/app")
      setValue(parseInt(message.payloadString));
  }

  useEffect(() =>{
    client.connect({
      onSuccess: () => {
        console.log("Connected!");
        client.subscribe("weather/app");
        client.onMessageArrived = onMessage;
      },
      onFailure: () =>{
        console.log("Failed to connected!")
      }
    });
  },[])

  return (
    <View style={styles.container}>
      <Text>Value is: {value}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
