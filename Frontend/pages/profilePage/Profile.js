import React, { useState, useEffect } from "react";                           
import {
  Text, View, StyleSheet, Image,
  TouchableOpacity, Modal,  ScrollView, TextInput
} from "react-native";
import * as Font from "expo-font";

import * as AppleAuthentication from 'expo-apple-authentication';

//텍스트 슬라이더
import Slider from '@react-native-community/slider';
import AsyncStorage from '@react-native-async-storage/async-storage';

import home from "../../assets/home.png";

const Profile_login = ({navigation}) => {
  const [fontVisible, setFontVisible] = useState(false)
  const [userId, setID] = useState(null); // false면 로그아웃, true면 로그인
  const [userSize,setSize] = useState(40); // 초기값을 폰트사이즈 25로 설정

  const [isReady, setReady]= useState(false);

  const fontArr = [
    {id: 2, fontName: "고딕 아니고 고딩", fontpath:"NanumGoDigANiGoGoDing"},
    {id: 11, fontName: "딸에게 엄마가", fontpath:"NanumDdarEGeEomMaGa"},
    {id: 17, fontName: "장미체", fontpath:"NanumJangMiCe"},
    ];
  
    const [userFont,setFont] = useState("장미체"); // 초기 폰트 설정
    const [fontPath,setPath] = useState("NanumJangMiCe"); // 초기 폰트 설정

    useEffect(async () => {
      await Font.loadAsync({
        'NanumGaRamYeonGgoc': require('../../assets/fonts/NanumGaRamYeonGgoc.ttf'),
        'NanumGoDigANiGoGoDing': require('../../assets/fonts/NanumGoDigANiGoGoDing.ttf'),
        'NanumGomSinCe': require('../../assets/fonts/NanumGomSinCe.ttf'),
        'NanumGyuRiEuiIrGi': require('../../assets/fonts/NanumGyuRiEuiIrGi.ttf'),
        'NanumGeumEunBoHwa': require('../../assets/fonts/NanumGeumEunBoHwa.ttf'),
        'NanumGiBbeumBarkEum': require('../../assets/fonts/NanumGiBbeumBarkEum.ttf'),
        'NanumGimYuICe': require('../../assets/fonts/NanumGimYuICe.ttf'),
        'NanumNaNeunIGyeoNaenDa': require('../../assets/fonts/NanumNaNeunIGyeoNaenDa.ttf'),
        'NanumDaHaengCe': require('../../assets/fonts/NanumDaHaengCe.ttf'),
        'NanumDongHwaDdoBag': require('../../assets/fonts/NanumDongHwaDdoBag.ttf'),
        'NanumDdarEGeEomMaGa': require('../../assets/fonts/NanumDdarEGeEomMaGa.ttf'),
        'NanumMasIssNeunCe': require('../../assets/fonts/NanumMasIssNeunCe.ttf'),
        'NanumMongDor': require('../../assets/fonts/NanumMongDor.ttf'),
        'NanumMuGungHwa': require('../../assets/fonts/NanumMuGungHwa.ttf'),
        'NanumMiNiSonGeurSsi': require('../../assets/fonts/NanumMiNiSonGeurSsi.ttf'),
        'NanumYaGeunHaNeunGimJuIm': require('../../assets/fonts/NanumYaGeunHaNeunGimJuIm.ttf'),
        'NanumJangMiCe': require('../../assets/fonts/NanumJangMiCe.ttf'),
        'NanumHaengBogHanDoBi': require('../../assets/fonts/NanumHaengBogHanDoBi.ttf'),
        'NanumHimNaeRaNeunMarBoDan': require('../../assets/fonts/NanumHimNaeRaNeunMarBoDan.ttf'),
        'Pak_Yong_jun': require('../../assets/fonts/Pak_Yong_jun.ttf'),
        'MaruBuri-Bold': require('../../assets/fonts/MaruBuri-Bold.ttf'),
      });
      setReady(true);
  }, []);

  const saveUser = async (inputId) => {
    try {
      await AsyncStorage.setItem('userId', String(inputId))
    } catch (e) {
    }
  }

  // const saveSize= async (userSize) => {
  //   try {
  //     await AsyncStorage.setItem('userSize', String(userSize))
  //   } catch (e) {
  //   }
  // }

  const saveFont = async (userFont) => {
    try {
    await AsyncStorage.setItem('userFont', userFont)
    } catch (e) {
    // saving error
    }
}
// 폰트 경로 저장
const savePath = async (fontPath) => {
    try {
    await AsyncStorage.setItem('fontPath', fontPath)
    } catch (e) {
    // saving error
    }
}

  useEffect(() => {
    AsyncStorage.getItem('userId').then((userId)=>{
      if(userId!="undefined"){
        setID(userId);
      } else {
        setID(null);
      }
      console.log(userId);
    })

    // AsyncStorage.getItem('userSize').then((size)=>{
    //   if(size!=null){ setSize(Number(size)); } 
    // })

    AsyncStorage.getItem('userFont').then((font)=>{
      if(font!=null){ setFont(font); }
    })

    AsyncStorage.getItem('fontPath').then((font)=>{
      if(font!=null){ setPath(font); }
    })
  },[]);

    return (
      <View style={styles.container}>
         {isReady && (
        <>
        {/* 폰트설정창 */}
        <Modal
        animationType='slide'
        transparent={true}
        visible={fontVisible}
        closeOnTouchOutside={true}>
          
          <View style={styles.FontContainer}>
            <ScrollView contentContainerStyle={{justifyContent: "center", alignItems: "center"}}
              centerContent={true} indicatorStyle={"white"}>
                {fontArr.map((s)=>(
                  <TouchableOpacity key={s.id} onPress={() => {setFontVisible(false); setFont(s.fontName); setPath(s.fontpath);}}> 
                    <Text style={{ fontSize: 30, fontFamily: s.fontpath, marginBottom: 30}}>{s.fontName}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
          
        </Modal>
        
      {/* 모달창 코드 끝 */}

        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate("MAIN")}
            style={styles.iconbutton}
          >
            <Image style={{ marginLeft: 10 }} source={home} />
          </TouchableOpacity>
        </View>

        

        {/* 기본값설정 상자 */}
        <View style={styles.subTitleBox}>
          <Text style={{color: "#808080",fontSize: 20,marginTop: 30, marginBottom: 10, }} > 기본 값 설정 </Text>
        </View>
        <View style={styles.informBox}>
          {/* <View style={styles.settingText}> 
            <Text style={{ fontSize: 22, letterSpacing: 2, marginLeft: "3%",
              lineHeight: 60, // 버튼 높이와 똑같이 설정하면 수직정렬이 됨.
              }} > 글자 크기 </Text>
              <Text style={{ fontSize: 20, letterSpacing: 2, marginLeft: "3%", marginRight: "1%"}}> A </Text>
              <Slider
                style={{width: 200, height: 40}}
                minimumValue={30}
                maximumValue={40}
                value={userSize}
                onValueChange={(value)=>setSize(value)} // 슬라이더 움직일 때 출력값 반환
                minimumTrackTintColor="#80AE92"
                maximumTrackTintColor="#80AE92"
              />
              <Text style={{ fontSize: 30, letterSpacing: 2, marginLeft: "1%",}}> A </Text>
          </View>
          <View style={styles.line}></View> */}
          <View style={styles.settingText}> 
            <Text
              style={{ fontSize: 22, letterSpacing: 2, marginLeft: "3%",
              lineHeight: 60, // 버튼 높이와 똑같이 설정하면 수직정렬이 됨.
              }} > 폰트 종류 </Text>
            <TouchableOpacity
            onPress={() => {setFontVisible(true);}}
            style={{ marginLeft: "3%", lineHeight: 60, }}>
            <Text style={{ fontSize: 30, letterSpacing: 2, marginLeft: "3%", lineHeight: 60, fontFamily: fontPath }} > {userFont}</Text>                                                      
          </TouchableOpacity>
          </View>
        </View>

        {/* 미리보기상자 */}
        <View style={styles.previewBox}>
          <Text style={{fontSize: userSize, fontFamily: fontPath}}> 가나다라마바사아자차카타파하 </Text>
        </View>

        {/* 확인, 로그아웃 상자 */}
        <View style={styles.ButtonBox}>
          <TouchableOpacity
            onPress={() => {navigation.navigate("MAIN"); saveFont(userFont); savePath(fontPath);}}
            style={{ height: 50, width: 200, backgroundColor: "#80AE92", borderRadius: 5, marginRight:40, }} >
            <Text
              style={{ fontSize: 25, letterSpacing: 2, color: "white", fontWeight: "bold", textAlign: "center", lineHeight: 50, // 버튼 높이와 똑같이 설정하면 수직정렬이 됨.
              }} >저장</Text>
          </TouchableOpacity>

          {userId!=null? null :
            // ID가 null 일 때 애플 로그인
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
              buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
              cornerRadius={5}
              style={{ height: 50, width: 200, backgroundColor: "#80AE92", borderRadius: 5, marginLeft: 40 }}
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
        </View>
        </>
        )}
      </View>
    );
  };

export default Profile_login;

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
    height: 70,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#80AE92",
  },
  subTitleBox: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  subTitle: {
    color: "#808080",
    fontSize: 18,
    marginTop: 60,
    marginBottom: 20,
  },
  informBox: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C4C4C4",
  },
  settingText: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  previewBox: {
    width: "85%",
    height: "17%",
    marginTop: 50,
    backgroundColor: "#FFFFFF",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C4C4C4",
  },
  ButtonBox: {
    width: "100%",
    height: "15%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: "94%",
    height: 1,
    backgroundColor: "#C4C4C4",
    marginLeft: "3%",
  },
  modalContainer: {
    marginTop: "50%",
    width: "60%",
    marginLeft:"20%",
    height: 200,
    opacity: 0.9,
    backgroundColor: "#80AE92",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonBox: {
    width: "100%",
    height: "15%",
    marginTop: "5%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  FontContainer: {
    marginTop: "25%",
    paddingTop:"5%", 
    width: "50%",
    marginLeft:"25%",
    height: "50%",
    opacity: 1,
    backgroundColor: "#F9F9F9",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C4C4C4"
  },
  buttonBox: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  rowBox: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  box: {
    width: "60%",
    height: 40,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight:"1%",
    borderWidth: 1,
    borderColor:"#80AE92", 
    fontSize: 22,
  },
});
