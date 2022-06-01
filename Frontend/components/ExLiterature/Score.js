import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Score = ({score}) => {

  return (
    <View style={styles.container}>
        <Text style={{fontSize: 20, letterSpacing: 3, fontWeight:"bold", fontStyle:"italic", marginLeft: 20}}> 총 점수 </Text>
        <Text style={{fontSize: 64, color: "#006540", fontWeight:"bold", fontStyle:"italic"}}> {score} </Text>
        <View style={styles.line}/>
        <View style={styles.line}/>
    </View>
  );
};

export default Score;

const styles = StyleSheet.create({
    container: {
        marginTop: "5%",
        width:"18%",
        marginLeft:"32%",
        height: "100%",
        backgroundColor: "transparent",
        flexDirection: "column",
        justifyContent:"center",
        alignContent:"center",
    },
    line:{
        width: 120, 
        height: 1, 
        marginTop: 7,
        backgroundColor: "#006540",
    },
});

