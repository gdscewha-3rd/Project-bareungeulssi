import React, { Component, useState } from "react";
import {
  Text, View, Button, StyleSheet, Image,
  TouchableOpacity,
} from "react-native";

const LogModal = ({navigation, className, visible, children}) => {
  const [OnOff, setOnOff] = useState(true);
    return (
      <View style={styles.container} visible={visible}>
        <Text> 로그아웃 하시겠습니까?</Text>
        <View style={styles.ButtonBox}> 
        <TouchableOpacity
            onPress={() => navigation.navigate("PROFILE_LOGOUT")}
            style={{ height: 50, width: 200, marginRight:40, }} >
            <Text style={{ fontSize: 25, letterSpacing: 2, color: "white", fontWeight: "bold", textAlign: "center", lineHeight: 50, // 버튼 높이와 똑같이 설정하면 수직정렬이 됨.
              }} >YES</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PROFILE_LOGIN")}
            style={{ height: 50, width: 200, marginRight:40, }} >
            <Text style={{ fontSize: 25, letterSpacing: 2, color: "white", fontWeight: "bold", textAlign: "center", lineHeight: 50, // 버튼 높이와 똑같이 설정하면 수직정렬이 됨.
              }} >NO</Text>
          </TouchableOpacity></View>
      </View>
    );
  };

export default LogModal;

const styles = StyleSheet.create({
  // 배경색 넣은 컨테이너
  container: {
    width: "60%",
    height: 200,
    backgroundColor: "#80AE92",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonBox: {
    width: "60%",
    height: "15%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
