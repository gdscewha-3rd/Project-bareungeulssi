import React, { useState, Component, useRef } from "react";
import {
  StyleSheet,
  View, Image, Text,
  TouchableOpacity,
} from "react-native";

//이미지 파일들
import home from "../assets/home.png";
import drawer from "../assets/MainPage/apps_white2.png";
import Score from "../components/ExLiterature/Score";

const DrawerPicture = ({ navigation, route }) => {
    const url = route.params.url;
    const score = route.params.score;
  return (
      <>
        <View style={styles.container}>
        {/* 헤더부분 */}
        <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate("MAIN")}
              style={styles.iconbutton}
            >
              <Image style={{ marginLeft: 10 }} source={home} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("DRAWER")}> 
                <Image source={drawer} style={{width: 70, height: 70, marginTop:10}} />
            </TouchableOpacity>
        </View>

        <Image source={{uri : url}} 
        style={{height: "85%", width: "95%", top:100, position: "absolute", right: "2.5%"}}/>

        <View style={styles.scoreContainer}>
          <Text style={{fontSize: 20, letterSpacing: 3, fontWeight:"bold", fontStyle:"italic", marginLeft: 20}}> 총 점수 </Text>
          <Text style={{fontSize: 64, color: "#006540", fontWeight:"bold", fontStyle:"italic"}}> {score} </Text>
          <View style={styles.line}/>
          <View style={styles.line}/>
        </View>

        </View>
    </>
);
};

export default DrawerPicture;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    // flexDirection: "column",
    // justifyContent: "flex-start",
    // alignItems: "center",
    position: "absolute",
  },
  scoreContainer: {
    marginTop: 120,
    position: "absolute",
    right: "7%",
    height: "10%",
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
  // 컴포넌트를 양쪽에 배치하는 컴포넌트
  headerRow: {
    width: "100%",
    height: 80,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#80AE92",
  },
  headerSubRow: {
    width: "15%",
    marginRight: 20,
    height: 70,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#80AE92",
  },
});
