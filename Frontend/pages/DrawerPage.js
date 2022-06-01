import React, {useState, useEffect} from "react";
import {
  Text, View, StyleSheet, Image,
  TouchableOpacity, ScrollView,
  Dimensions
} from "react-native";

import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AppleAuthentication from 'expo-apple-authentication';
import { USER_SERVER } from '../config';
import axios from 'axios';

import home from "../assets/home.png";
import myLiter from "../components/myLiter";

import { LineChart } from "react-native-chart-kit";

import * as Font from "expo-font";

const DrawerPage = ({navigation}) => {
  const [userId, setID] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [scoreReady, setScoreReady] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [SecondScore, setSecondScore] = useState(null);
  var arr=[];
  
  const saveUser = async (item) => {
    try {
      await AsyncStorage.setItem('userId', String(item))
    } catch (e) {
    }
  }

  useEffect(async () => {
    await Font.loadAsync({
        'SeoulHangangL': require('../assets/fonts/SeoulHangangL.ttf'),
    });
    setIsReady(true);
  }, []);

  // 유저아이디 가져오기
  useEffect(() => {
    AsyncStorage.getItem('userId').then((userId)=>{
      if(userId!="undefined"){
        setID(userId);
        axios.get(`${USER_SERVER}/record/${userId}`)
        .then(response => {
          setUserInfo(response.data);
          var data = response.data;
   
          arr=[];
          for(var i=0 ; i<data.length; i++){
            arr[i] = data[i].score
          }

          score = {
            datasets: [
              {
                data: arr,
                color: (opacity = 1) => `rgba(0, 70, 42, ${opacity})`,
                strokeWidth: 5 
              }
            ],
            legend: ["내 점수"] // optional
          };
          setSecondScore(score);
        })
      } else {
        setID(null);
      }
      console.log(userId);
    })

    setSecondScore(score);
    setScoreReady(true);
  },[]);

  var score = {
    datasets: [
      {
        data: myLiter.first.map(s=>( s.score )),
        color: (opacity = 1) => `rgba(0, 70, 42, ${opacity})`,
        strokeWidth: 5 // optional
      }
    ],
    legend: ["내 점수"] // optional
  };

  const fontPath = "SeoulHangangL"; // 초기 폰트 설정
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: "#80AE92",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#80AE92",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 5) => `rgba(0, 70, 42, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 1,
    useShadowColorFromDataset: false // optional
  };

    return (
      <View style={styles.container}>
        {(isReady && userId!=null)?
          <>
            <View style={styles.headerRow}>
              <TouchableOpacity
                onPress={() => navigation.navigate("MAIN")}
                style={styles.iconbutton}
              >
                <Image style={{ marginLeft: 10, marginTop: 10 }} source={home} />
              </TouchableOpacity>
            </View>
             {scoreReady? 
              <LineChart
              data={SecondScore}
              width={screenWidth-200}
              height={200}
              chartConfig={chartConfig}
            />
            : null} 
           
            <TouchableOpacity
              onPress={() => {
                console.log(score);
                console.log(SecondScore);
                }}> 
            <Text style={{ fontSize: 30, marginTop: 45, marginBottom: 45, marginLeft: 15, letterSpacing: 10, fontFamily : fontPath }} > 
            내 서랍 </Text>
            </TouchableOpacity> 
            
              <FlatList
              data={userInfo}
              columnWrapperStyle={{ 
                marginBottom: 20,
              }}
              indicatorStyle={"white"}
              nestedScrollEnabled ={true}
              renderItem={(array) => (
                  <TouchableOpacity key={array.id}
                  onPress={() => navigation.navigate("DRAWERPICTURE",{
                    url: `https://albatross-backend.s3.ap-northeast-2.amazonaws.com/captured-image/${array?.item?.imageName}`,
                    score :array?.item?.score
                  })}
                    style={styles.iconbutton} >
                    <Image source={{uri : `https://albatross-backend.s3.ap-northeast-2.amazonaws.com/captured-image/${array?.item?.imageName}`}} 
                    style={{marginLeft: 20, marginRight: 20, height: 250, width: 220, borderWidth: 0.5}} /> 
                  </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index}
              numColumns={3}
            /> 
          </>
          :
          <>
          <View style={styles.headerRow}>
            <TouchableOpacity
              onPress={() => navigation.navigate("MAIN")}
              style={styles.iconbutton}
            >
              <Image style={{ marginLeft: 10 }} source={home} />
            </TouchableOpacity>
            </View>

            {userId!=null? null :
            // ID가 null 일 때 애플 로그인
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
              cornerRadius={5}
              style={{ height: 50, width: 200, backgroundColor: "#80AE92", borderRadius: 5, marginTop: "50%" }}
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
          }
          </>
          }
      </View>
    );
}

export default DrawerPage;

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

  // 컴포넌트를 양쪽에 배치하는 컴포넌트
  headerRow: {
    width: "100%",
    height: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#80AE92",
    marginBottom: 45,
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
});