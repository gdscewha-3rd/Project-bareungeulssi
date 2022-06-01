import React, { Component, useEffect, useState } from "react";
import { Text, View, Button, StyleSheet, Image,
  TouchableOpacity, ScrollView,
} from "react-native";

import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import { USER_SERVER } from '../config';

import drawer from "../assets/MainPage/apps.png";
import profile from "../assets/MainPage/profile.png";

import new1 from "../assets/MainPage/new1.png";
import new2 from "../assets/MainPage/new2.png";
import new3 from "../assets/MainPage/new3.png";
import new4 from "../assets/MainPage/new4.png";

import best1 from "../assets/MainPage/best1.png";
import best2 from "../assets/MainPage/best2.png";
import best3 from "../assets/MainPage/best3.png";
import best4 from "../assets/MainPage/best4.png";

import literList from "../components/ExLiterature/literList";

import * as Font from "expo-font";

const MainPage = ({navigation}) => {
  const img = [new1, new2, new3, new4, best1, best2, best3, best4];

  const [userId, setID] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const saveUser = async (item) => {
    try {
      await AsyncStorage.setItem('userId', String(item))
    } catch (e) {
    }
  }

  useEffect(async () => {
    AsyncStorage.getItem('userId').then((userId)=>{
      if(userId!="undefined"){
        setID(userId);
      }
    })

    await Font.loadAsync({
        'SeoulHangangL': require('../assets/fonts/SeoulHangangL.ttf'),
    });
    setIsReady(true);
}, []);

  const fontPath = "SeoulHangangL"; // 초기 폰트 설정
  
  return (
    <View style={styles.container}>
      {(!isReady || userId==null)?
        <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={{ height: 50, width: 200, backgroundColor: "#80AE92", borderRadius: 5, marginTop: "60%" }}
        onPress={async () => {
          try {
            const identity = (
              await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              })
            );
            setID(String(identity.user));
            saveUser(String(identity.user));
            // signed in
          } catch (error) {
            if (e.code === 'ERR_CANCELED') {
              console.info("The user cancelled in the sign in.", error);
            } else {
              console.info("An error occurred signing in.", error);
            }
          }
        }}
      />
      : (
          <>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => {navigation.navigate("PROFILE"); 
            // confirmScore();
          }}
          >
            <Image source={profile} style={{width: 60, height: 60}} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("DRAWER")}
          >
            <Image source={drawer} style={{width: 90, height: 90}} />
          </TouchableOpacity>
        </View>

        <Text style={{
            fontSize: 30,
            marginTop: 20,
            marginLeft: 30,
            marginBottom: 80,
            letterSpacing: 15,
            fontFamily : fontPath,
          }} >바른글씨</Text>

        <View style={styles.practiceRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate("LINE")}
            style={{
              height: 130,
              width: "45%",
              backgroundColor: "#80AE92",
              borderRadius: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                letterSpacing: 15,
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                paddingTop: 50,
                fontFamily: fontPath,
              }}>
              {" "}
              줄 긋기 연습{" "}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("WORD")}
            style={{
              height: 130,
              width: "45%",
              backgroundColor: "#80AE92",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                letterSpacing: 15,
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                paddingTop: 50,
                fontFamily: fontPath,
              }}
            >
              {" "}
              자음모음 연습{" "}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.wordRow}>
          <View style={styles.line}></View>
        </View>

        <ScrollView style={styles.scrollView} indicatorStyle={"white"}> 
        <View style={styles.literatureRow}>
        {literList.new.map(s=>(
            <TouchableOpacity key={s.id}
              onPress={() => navigation.navigate("LITER",{
                category: "new",
                id: s.id,
                title: s.title,
                text: s.text,
              })}
              style={styles.iconbutton} >
              <Image key={s.id} source={img[s.id-1]} style={{marginLeft: 10, marginRight: 10, width: 194, height: 257}} />
            </TouchableOpacity>
          ))}
        </View>
        </ScrollView>

        <View style={styles.wordRow}>
          <View style={styles.line}></View>
        </View>

        <ScrollView style={styles.scrollView} indicatorStyle={"white"}> 
        <View style={styles.literatureRow}>
        {literList.best.map(s=>(
            <TouchableOpacity key={s.id}
              onPress={() => navigation.navigate("LITER",{
                category: "best",
                id: s.id,
                title: s.title,
                text: s.text,
              })}
              style={styles.iconbutton} >
              <Image key={s.id} source={img[s.id-1]} style={{marginLeft: 10, marginRight: 10, width: 194, height: 257}} />
            </TouchableOpacity>
          ))}
        </View>
        </ScrollView>
        </>
        )}
      </View>
    );
}

export default MainPage;

const styles = StyleSheet.create({
  // 배경색 넣은 컨테이너
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F9F9F9",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  // 세로줄 컴포넌트
  column: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  // 컴포넌트를 양쪽에 배치하는 컴포넌트
  headerRow: {
    marginTop: 30,
    width: "95%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  practiceRow: {
    marginBottom: 30,
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wordRow: {
    marginBottom: 5,
    marginTop: 5,
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#C4C4C4",
  },
  literatureRow: {
    marginTop: 10,
    marginBottom: 10,
    width: "85%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollView: {
    marginTop: 10,
    marginBottom: 10,
    width: "85%",
    display: "flex",
    flexDirection: "row",
  },
});
