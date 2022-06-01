import React, { Component, useState } from "react";
import {
  Text, View, StyleSheet, Image, 
  TextInput,
  TouchableOpacity,
} from "react-native";

import Checkbox from 'expo-checkbox';

import home from "../../assets/home.png";
import back from "../../assets/back.png";
import literature from "../../assets/literature.png";

import SwitchToggle from "react-native-switch-toggle";
import ToggleSwitch from 'toggle-switch-react-native'

const Login = ({navigation}) => {
    const [id, onChangeId] = React.useState(null);
    const [pw, onChangePW] = React.useState(null);
    const [isChecked, setChecked] = useState(false);

    return (
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate("MAIN")}
            style={styles.iconbutton}
          >
            <Image style={{ marginLeft: 10, marginTop: 10}} source={home} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("PROFILE_LOGOUT")}
            style={styles.iconbutton}
          >
            <Image style={{ marginRight: 10, marginTop: 10 }} source={back} />
          </TouchableOpacity>
        </View>

        <View style={styles.boxContainer}>
            <TextInput
            style={styles.box}
            onChangeText={onChangeId}
            value={id}
            placeholder="아이디"
            placeholderTextColor={'#80AE92'}
            placeholderTextSize
        />
            <TextInput
            style={styles.box}
            onChangeText={onChangePW}
            value={pw}
            placeholderTextColor={'#80AE92'}
            placeholder="비밀번호"
        />
        </View>


        <View style={styles.ButtonBox}>
          <TouchableOpacity
            onPress={() => navigation.navigate("PROFILE_LOGIN")}
            style={{ height: 50, width: 200, backgroundColor: "#80AE92", borderRadius: 5, marginRight: 40, }} >
            <Text
              style={{ fontSize: 25, letterSpacing: 2, color: "white", fontWeight: "bold", textAlign: "center", lineHeight: 50, // 버튼 높이와 똑같이 설정하면 수직정렬이 됨.
              }} >로그인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SIGNIN")}
            style={{ height: 50, width: 200, backgroundColor: "#80AE92", borderRadius: 5, marginLeft: 40, }} >
            <Text
              style={{ fontSize: 25, letterSpacing: 2, color: "white", fontWeight: "bold", textAlign: "center", lineHeight: 50, // 버튼 높이와 똑같이 설정하면 수직정렬이 됨.
              }} >회원가입</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.CheckBox}>
        <Checkbox style={styles.check} color={isChecked ? '#80AE92' : undefined} value={isChecked} onValueChange={setChecked} />
            <Text style={{fontSize: 25, letterSpacing: 2, color: "#80AE92", textAlign: "center",}}>로그인 상태 유지</Text>
        </View>

      </View>
    );
  };

export default Login;

const styles = StyleSheet.create({
  // 배경색 넣은 컨테이너
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F7F8F7",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  // 컴포넌트를 양쪽에 배치하는 컴포넌트
  headerRow: {
    width: "100%",
    height: 90,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#80AE92",
  },

  // 배경색 넣은 컨테이너
  boxContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "35%",
  },

  box: {
    width: "60%",
    height: 60,
    marginTop: 25,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1,
    borderColor:"#80AE92", 
    fontSize: 22,
  },

  textBox: {
    width: "65%",
    height: 60,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#80AE92",
  },
  ButtonBox: {
    width: "100%",
    height: "15%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  check: {
    marginRight: 10,
  },
  CheckBox: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
