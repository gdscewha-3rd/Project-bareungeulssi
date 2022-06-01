import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text,
  Image, TouchableOpacity, Modal, Dimensions
} from "react-native";
   
import axios from 'axios';
import ExJson from "../assets/ExJson";
import { USER_SERVER } from '../config';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AppleAuthentication from 'expo-apple-authentication';

//캔버스
import { Canvas, DrawingTool } from '@benjeau/react-native-draw';

//스크린샷
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';

//이미지 파일들
import home from "../assets/home.png";
import pen from "../assets/pen.png";
import erase from "../assets/erase.png";
import arrow from "../assets/arrow.png";
import confirm from "../assets/confirm.png";
import loading from "../assets/loading.gif";

import Score from "../components/ExLiterature/Score";

//느낌표 모달
import markIcon from "../assets/markIcon.png";

import * as Font from "expo-font";

const SubLiter= ({navigation, id, setTitle, text, pageNum }) => {
  const [userSize,setSize] = useState(40); // 초기값을 폰트사이즈 25로 설정
  const [isReady, setReady]= useState(false);
  const [markList, setMarkList] = useState(null);
  const [fontPath,setPath] = useState("NanumJangMiCe"); // 초기 폰트 설정
  const [userId, setID] = useState(undefined); // 유저아이디 기본 설정값

  const [finish, setFinish] = useState(false);

  //모달창
  const [modalVisible, setModalVisible] = useState(false);
  const [markModal, setMarkModal] = useState(false);
  const [markModalText, setMarkModalText] = useState("빈칸");
  const [emptyWordModal, setEmpty] = useState(false);
  const [loadingModal, setLoading] = useState(false);

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  //드로잉 도구들
  const canvasRef = useRef();
  const [tool, setTool] = useState(DrawingTool.Brush);
  const handleUndo = () => { canvasRef.current?.undo(); };
  const handleToggleEraser = () => {
    setTool((prev) =>
      prev === DrawingTool.Brush ? DrawingTool.Eraser : DrawingTool.Brush
    );
  };

  //스크린샷 캡쳐 위한 코드
  const captureRef = useRef();
  const galleryRef = useRef();
  const drawerRef = useRef();
  const [photoUri, setUri] = useState(null); // 서버에 넘겨줄 스크린샷
  const [galleryUri, setGallery] = useState(null); // 내 서랍 & 유저 갤러리에 저장할 사진
  const [drawerUri, setDrawer] = useState(null); // 내 서랍 & 유저 갤러리에 저장할 사진
  const [galleryName, setName] = useState(null); // 내 서랍 & 유저 갤러리에 저장할 사진 이름
  
  // 폰트 정보 가져오기
  useEffect(async () => {
    await Font.loadAsync({
      'NanumGaRamYeonGgoc': require('../assets/fonts/NanumGaRamYeonGgoc.ttf'),
      'NanumGoDigANiGoGoDing': require('../assets/fonts/NanumGoDigANiGoGoDing.ttf'),
      'NanumGomSinCe': require('../assets/fonts/NanumGomSinCe.ttf'),
      'NanumGyuRiEuiIrGi': require('../assets/fonts/NanumGyuRiEuiIrGi.ttf'),
      'NanumGeumEunBoHwa': require('../assets/fonts/NanumGeumEunBoHwa.ttf'),
      'NanumGiBbeumBarkEum': require('../assets/fonts/NanumGiBbeumBarkEum.ttf'),
      'NanumGimYuICe': require('../assets/fonts/NanumGimYuICe.ttf'),
      'NanumNaNeunIGyeoNaenDa': require('../assets/fonts/NanumNaNeunIGyeoNaenDa.ttf'),
      'NanumDaHaengCe': require('../assets/fonts/NanumDaHaengCe.ttf'),
      'NanumDongHwaDdoBag': require('../assets/fonts/NanumDongHwaDdoBag.ttf'),
      'NanumDdarEGeEomMaGa': require('../assets/fonts/NanumDdarEGeEomMaGa.ttf'),
      'NanumMasIssNeunCe': require('../assets/fonts/NanumMasIssNeunCe.ttf'),
      'NanumMongDor': require('../assets/fonts/NanumMongDor.ttf'),
      'NanumMuGungHwa': require('../assets/fonts/NanumMuGungHwa.ttf'),
      'NanumMiNiSonGeurSsi': require('../assets/fonts/NanumMiNiSonGeurSsi.ttf'),
      'NanumYaGeunHaNeunGimJuIm': require('../assets/fonts/NanumYaGeunHaNeunGimJuIm.ttf'),
      'NanumJangMiCe': require('../assets/fonts/NanumJangMiCe.ttf'),
      'NanumHaengBogHanDoBi': require('../assets/fonts/NanumHaengBogHanDoBi.ttf'),
      'NanumHimNaeRaNeunMarBoDan': require('../assets/fonts/NanumHimNaeRaNeunMarBoDan.ttf'),
      'Pak_Yong_jun': require('../assets/fonts/Pak_Yong_jun.ttf'),
      'MaruBuri-Bold': require('../assets/fonts/MaruBuri-Bold.ttf'),
    });
    setReady(true);
  }, []);

  const isEmpty = function (value) {
    if (value === '' || value === null || value === undefined || (value !== null && typeof value === 'object' && !Object.keys(value).length)) {
      return true;
    } else {
      return false;
    }
  };

  const saveUser = async (item) => {
    try {
      await AsyncStorage.setItem('userId', String(item))
    } catch (e) {
    }
  }

  useEffect(() => {
    // 폰트 크기 가져옴
    // AsyncStorage.getItem('userSize').then((size)=>{
    //   if(size!=null){
    //     setSize(Number(size));
    //   } else setSize(25);
    // })
    // 폰트 경로 가져옴
    AsyncStorage.getItem('fontPath').then((font)=>{
      if(font!=null){
        setPath(font);
      }
    })
    // 유저 아이디 가져옴
    AsyncStorage.getItem('userId').then((getId)=>{
      if(getId!="undefined"){
        setID(getId);
      }
    })
  },[]);

  const getPhotoUri = async() => { // 스크린샷 두개 세팅 + 서버에 넘기기
    try{
     const server = await captureRef.current.capture();
     const gallery = await galleryRef.current.capture();
     const drawer = await drawerRef.current.capture();
     setUri(server);
     setGallery(gallery);
     setDrawer(drawer);

     const arr = gallery.split('/');
     const name = arr[arr.length-1];
     setName(name);

     const getFeedback = async (JsonData) => { // json 넘기고 피드백 받아오기
      try{
        await axios.post(`${USER_SERVER}/score/${name}/${id}/${pageNum+1}/${fontPath}`, JSON.stringify(JsonData), {
          headers: { "Content-Type": `application/json`}
        }
        ).then((res) => { setMarkList(res?.data); });

        console.log("백 서버에 json을 넘김!");
        setFinish(true);
      } catch(err){
        console.log("백 서버에 json을 넘기지 못함!");
        console.log(err);
      }
    }

    const postServer = async() => { // 백서버에 이미지 넘기기
      try{
        var file = {
             uri : gallery,
             type: 'multipart/form-data',
             name: name
        };
        var formData = new FormData();
        formData.append("file", file);
        
        await fetch(`${USER_SERVER}/image/s3/resource/${userId}/${id}/${pageNum+1}/${name}`, { 
          method : "POST"
          , body : formData
        })
        .then(result => result.json())
        .catch(error => console.log(`error => ${error}`));
  
        console.log("서버에 이미지를 저장함!");
        console.log(`https://albatross-backend.s3.ap-northeast-2.amazonaws.com/captured-image/${name}`);
      } catch(err){
        console.log("서버에 이미지를 저장하지 못함");
      }
    }
    // 백 서버에 이미지 넘긴 후 피드백 받을 수 있게 함.
    const mergeProcess = async (JsonData) => { 
      try{
        await postServer();
        setLoading(false);
        await getFeedback(JsonData);
      } catch(err){
        console.log(err);
      }
    }

     const postAI = async () => { // 딥러닝서버에 넘기기
      try{
        console.log("딥러닝 서버에 보낸 uri : ", server);
        var file = {
             uri : server,
             type: 'multipart/form-data',
             name: name
        };
        var formData = new FormData();
        formData.append("file", file);
        setLoading(true);
        
        await fetch('http://43.131.250.175:7012/predict', { 
           method : "POST",
           body : formData
         })
         .then((response) => response.json())
         .then((data) => {
          if ( JSON.stringify(data) === JSON.stringify(ExJson)) { // 빈 배열이 온다면
            setLoading(false);
            setEmpty(true);
          } else { // json을 반환받았다면
            mergeProcess(data);
          }
         })
         .catch(err=>{"에러 : ", err});

        console.log("딥러닝 서버에 이미지를 저장함!");
      } catch(err){
        console.log("딥러닝 서버에 이미지를 저장하지 못함!");
      }
    }

    await postAI();

    } catch(err){ 
      console.log("오류 : ", err);
    }
 };

  // 갤러리 권한 주기
  MediaLibrary.requestPermissionsAsync();

  const onCheck = async () => { // 검사버튼 눌렀을 때
    try{
      await getPhotoUri();
     } catch(err){
     }
  };

  const retry = async () => { // 다시쓰기버튼 눌렀을 때
    try{
      setFinish(false);
     } catch(err){
     }
  };

  const onSave = async () => { // 저장 버튼 눌렀을 때
    try{
      MediaLibrary.getPermissionsAsync().then((data) => {
        if (data.status === 'granted') {
          MediaLibrary.saveToLibraryAsync(galleryUri);
          console.log("갤러리에 저장한 사진 : ", galleryUri);
        }
      });
     } catch(err){
       console.log(err)
     }
  };

  const feedbackText = [
    {id : 1, text : "줄이 맞지 않습니다.\n 글자들이 기울어지지않게 작성해보세요!"},
    {id : 2, text : "글자 간격을 주의해서 \n작성해보세요!"},
    {id : 3, text : "이 글자의 전체적인 크기에 주의해서\n 작성해보세요!"},
    {id : 4, text : "이 글자의 자음에 주의해서 \n작성해 보세요!"},
    {id : 5, text : "이 글자의 모음에 주의해서 \n작성해 보세요!"},
    {id : 6, text : "이 글자의 받침에 주의해서 \n작성해 보세요!"},
  ]

  return (
    <View style={styles.container} key = {id}>
      {(!isReady || userId==undefined)?
      <>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate("MAIN")}
            style={styles.iconbutton}
          >
            <Image style={{ marginLeft: 20 }} source={home} />
          </TouchableOpacity>
        </View>
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
    </>
    : 
      (
        <>
      {/* 헤더부분 */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MAIN")}
          style={styles.iconbutton}
        >
          <Image style={{ marginLeft: 20 }} source={home} />
        </TouchableOpacity>
        
          { finish === false ?
            (<>
            <View style={styles.headerSubRow}>
               <TouchableOpacity onPress={handleToggleEraser} style={styles.iconbutton}>
                 { tool === DrawingTool.Brush ? 
                 <Image source={erase} /> : <Image source={pen}/>}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUndo} style={styles.iconbutton}>
                <Image source={arrow} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {onCheck(); setTool(null);} } style={styles.iconbutton}>
                <Image source={confirm} />
              </TouchableOpacity> 
            </View>
            </> 
            ): (
            <>
            <View style={styles.headerSubRow}>
              <TouchableOpacity
                onPress={() => {retry();}}
                style={{ height: 60 }}>
                <Text style={{ fontSize: 20, letterSpacing: 2, marginTop:20, color: "white", fontWeight: "bold", marginLeft: -10}} > 다시쓰기 </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={{ height: 60 }}>
                <Text style={{ fontSize: 20, letterSpacing: 2, marginTop:20, color: "white", fontWeight: "bold", marginLeft: 10}} > 다운로드 </Text>
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => navigation.navigate("MAIN")}
              style={{ height: 60 }}>
              <Text style={{ fontSize: 20, letterSpacing: 2, marginTop:20, color: "white", fontWeight: "bold", marginLeft: 10, marginRight: 20}} > 확인 </Text>
            </TouchableOpacity>
            </View>
          </>)
        }
        
      </View>

      {/* 다운로드 모달창 */}
      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeaderRow}> 
            <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ fontSize: 20, letterSpacing: 2,  fontWeight: "bold", textAlign: "center", marginLeft: 10}} > 취소 </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setModalVisible(false); onSave();}}>
                <Text style={{ fontSize: 20, letterSpacing: 2,  fontWeight: "bold", textAlign: "center", marginRight: 10}} > 저장 </Text>
            </TouchableOpacity>
          </View>

          <Image 
            style={{width:"95%", height:"85%", marginTop:"5%"}}
            source={{uri:drawerUri}} 
          />

        </View>
      </Modal>
      {/* 검사 멘트 모달창 */}
        <Modal animationType='slide' transparent={true} visible={markModal}>
              <View style={styles.markModalContainer}>
                  <Text style={{ fontSize: 30, letterSpacing: 2, textAlign: "center", paddingTop : "10%", fontFamily: fontPath }} > {markModalText} </Text> 
                  <TouchableOpacity onPress={() => setMarkModal(false)} style={{ width: "100%", height: "25%", backgroundColor: "#80AE92"}}>
                      <Text style={{ fontSize: 22, letterSpacing: 2, textAlign: "center", marginLeft: 10, color:"white", fontWeight:"bold", paddingTop: "1%", fontFamily: fontPath }} > 확인 </Text>
                  </TouchableOpacity>
              </View>
        </Modal>

      {/* 유저가 쓴 글씨가 없을 때 모달창 */}
      <Modal animationType='slide' transparent={true} visible={emptyWordModal}>
              <View style={styles.markModalContainer}>
                  <Text style={{ fontSize: 30, letterSpacing: 2, textAlign: "center", paddingTop : "10%", fontFamily: fontPath }} > {"검사할 수 있는 글씨가 없습니다!\n 글씨를 써 보세요"} </Text>
                  <TouchableOpacity onPress={() => setEmpty(false)} style={{ width: "100%", height: "25%", backgroundColor: "#80AE92"}}>
                      <Text style={{ fontSize: 22, letterSpacing: 2, textAlign: "center", marginLeft: 10, color:"white", fontWeight:"bold", paddingTop: "2%", fontFamily: fontPath }} > 확인 </Text>
                  </TouchableOpacity>
              </View>
      </Modal>

      {/* 로딩창 */}
      <Modal animationType='slide' transparent={true} visible={loadingModal}>
              <View style={styles.checkModalContainer}>
                  <Text style={{ fontSize: 30, letterSpacing: 2, textAlign: "center", fontFamily: fontPath, marginBottom: 20 }} > {"글씨 검사를 진행하고 있습니다..."} </Text>
                  <Image source={loading} sttle={{width: 10, height:10, marginTop: 50}}/>
              </View>
      </Modal>

      {/* 모달창 코드 끝 */}
      
      <ViewShot ref={galleryRef} options={{ format: "jpg", quality: 0.9 }} style={{marginTop: 70, width: windowWidth, height:(windowHeight*0.92-70)}}>
      <ViewShot ref={drawerRef} options={{ format: "jpg", quality: 0.9, result: "data-uri" }} style={{width: windowWidth, height:(windowHeight*0.92-70)}}> 
        { finish === false ? (
         <View style={{width: "90%", height: "10%", flexDirection: "row", justifyContent: "start", marginLeft: 30}}> 
          <View style={styles.nameContainer}>
            <Text style={{fontSize: 30, letterSpacing: 3, textAlign:"left",fontFamily: fontPath, }}> {setTitle} </Text>
            <View style={styles.line}/>
            <View style={styles.line}/>
          </View>
        </View>
       ) 
       :( 
        <View style={{width: "90%", height: "10%", flexDirection: "row", justifyContent: "start", marginLeft: 30}}> 
          <View style={styles.nameContainer}>
            <Text style={{fontSize: 30, letterSpacing: 3, textAlign:"left", fontFamily: fontPath}}> {setTitle} </Text>
            <View style={styles.line}/>
            <View style={styles.line}/>
          </View>
          <Score score={markList[markList.length-1].score}/>
        </View>
       )}
       {/* (windowHeight*0.92*0.9-70)*0.88-2 */}
      {/* 캔버스보드 부분 */}
      <ViewShot ref={captureRef} options={{ format: "jpg", quality: 0.9 }} 
        style={{marginTop: "10%", height:720}}>
          <View style={{ height: 1000, justifyContent: "center",  alignItems: "center"}} >
            <Text style={{ fontSize: userSize, letterSpacing: 7, position: "absolute", left: "7%", top: -58, lineHeight: 180, width: "85%", fontFamily: fontPath}}> {text} </Text> 
            <Text style={{ fontSize: userSize, letterSpacing: 7, position: "absolute", left: "7%", top: 0, lineHeight: 180, width: "85%", fontFamily: fontPath, color:"#C4C4C4"}}> {text} </Text> 
            <Canvas
              ref={canvasRef}
              height={720}
              // width={900}
              color="black"
              tool={tool}
              eraserSize={5}
              style={{ backgroundColor: 'transparent', width: "90%", position: "absolute", left: "5%", top: "0%"}}
            />
              {/* 가로줄 */}
              <View style={{ width: "90%", height: 1, backgroundColor: "#000000", position: "absolute", left: "5%", top: 0, }} />
              <View style={{ width: "90%", height: 1, backgroundColor: "#000000", position: "absolute", left: "5%", top: 60, }} />
              <View style={{ width: "90%", height: 1, backgroundColor: "#000000", position: "absolute", left: "5%", top: 120, }} />
              <View style={{ width: "90%", height: 1, backgroundColor: "#000000", position: "absolute", left: "5%", top: 180, }} />
              <View style={{ width: "90%", height: 1, backgroundColor: "#000000", position: "absolute", left: "5%", top: 240, }} />
              <View style={{ width: "90%", height: 1, backgroundColor: "#000000", position: "absolute", left: "5%", top: 300, }} />
              <View style={{ width: "90%", height: 1, backgroundColor: "#000000", position: "absolute", left: "5%", top: 360, }} />
              <View style={{ width: "90%", height: 1, backgroundColor: "#000000", position: "absolute", left: "5%", top: 420, }} />
              <View style={{ width: "90%", height: 1, backgroundColor: "#000000", position: "absolute", left: "5%", top: 480, }} />
              <View style={{ width: "90%", height: 1, backgroundColor: "#000000", position: "absolute", left: "5%", top: 540, }} />
              <View style={{ width: "90%", height: 1, backgroundColor: "#000000", position: "absolute", left: "5%", top: 600, }} />
              <View style={{ width: "90%", height: 1, backgroundColor: "#000000", position: "absolute", left: "5%", top: 660, }} />
              <View style={{ width: "90%", height: 1, backgroundColor: "#000000", position: "absolute", left: "5%", top: 720, }} />

              {/* 세로줄 */}
              <View style={{ height: 720, width: 1, backgroundColor: "#000000", position: "absolute", left: "5%", top: "0%"}} />
              <View style={{ height: 720, width: 1, backgroundColor: "#000000", position: "absolute", right: "5%", top: "0%" }} />

               {finish === false ? (
                <>
                </>) 
                :(<>
                  {markList.map((s, index)=>(
                    <TouchableOpacity key={index} style={styles.iconbutton}
                    onPress={() => {setMarkModal(true); setMarkModalText(feedbackText[s.fidx-1].text )}}>
                      {s.fidx===1? 
                        <Image key={index} style={{ resizeMode:"contain", height: 30, width:30, position: "absolute", left:s.x*0.5-390-60+20+10, top:30-30-360+s.line*180}} source={markIcon} />
                      : <Image key={index} style={{ resizeMode:"contain", height: 30, width:30, position: "absolute", left:s.x*0.5-390-60+20, top:-30-360+s.line*180}} source={markIcon} />
                      }
              
                    </TouchableOpacity>
                    ))}
                  </>
              )} 
            </View>
          </ViewShot>
          </ViewShot>
        </ViewShot>
        </>
        )}
    </View>
  );
};

export default SubLiter;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "95%",
    backgroundColor: "#F9F9F9",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  // 컴포넌트를 양쪽에 배치하는 컴포넌트
  headerRow: {
    width: "100%",
    height: 70,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#80AE92",
  },
  nameContainer: {
    marginTop: "7%",
    marginBottom: "-2%",
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
  name: {
    width: "100%",
    height: 70,
    position: "absolute",
    marginTop: 100,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  headerSubRow: {
    width: "25%",
    marginRight: 50,
    height: 70,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#80AE92",
  },
  modalContainer: {
    width: "80%",
    height: "80%",
    top: "11%",
    left: "10%",
    borderWidth: 0.3,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
  },
  modalHeaderRow: {
    width: "100%",
    height: "8%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  markModalContainer: {
    width: "60%",
    height: "20%",
    top: "40%",
    left: "20%",
    borderWidth: 0.5,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between"
  },
  checkModalContainer: {
    width: "60%",
    height: "30%",
    top: "35%",
    left: "20%",
    borderWidth: 0.5,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth:2,
  },
});