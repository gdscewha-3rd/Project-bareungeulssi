import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Liter_name = ({name}) => {

  return (
    <View style={styles.container}>
        <Text style={{fontSize: 24, letterSpacing: 3, textAlign:"left", }}> {name} </Text>
      <View style={styles.line}/>
      <View style={styles.line}/>
    </View>
  );
};

export default Liter_name;

const styles = StyleSheet.create({
    container: {
        marginTop: "7%",
        width:"50%",
        backgroundColor: "transparent",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent:"flex-start",
    },
    line:{
        width: '80%', 
        height: 1, 
        marginTop: 7,
        backgroundColor: "#000000",
    },
});

