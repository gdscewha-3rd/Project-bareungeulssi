import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity,
} from "react-native";
import { Canvas, DrawingTool } from '@benjeau/react-native-draw';

//이미지 파일들
import home from "../assets/home.png";
import pen from "../assets/pen.png";
import erase from "../assets/erase.png";
import arrow from "../assets/arrow.png";

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from "expo-font";


const ExWord = ({ navigation }) => {
  //draw
  const canvasRef = useRef();
  const [tool, setTool] = useState(DrawingTool.Brush);
  const handleUndo = () => { canvasRef.current?.undo(); };
  const handleToggleEraser = () => {
    setTool((prev) =>
      prev === DrawingTool.Brush ? DrawingTool.Eraser : DrawingTool.Brush
    );
  };

  const [isReady, setReady]= useState(false);
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

  const [fontPath,setPath] = useState("NanumJangMiCe"); // 초기 폰트 설정

  //폰트 경로 가져옴
  useEffect(() => {
    AsyncStorage.getItem('fontPath').then((font)=>{
      if(font!=null){
        setPath(font);
      }
    })
  },[]);

  return (
    <View style={styles.container}>
      {isReady && (
      <>
      {/* 헤더부분 */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.navigate("MAIN")}
          style={styles.iconbutton}
        >
          <Image style={{ marginLeft: 20 }} source={home} />
        </TouchableOpacity>
        <View style={styles.headerSubRow}>
              <TouchableOpacity onPress={handleToggleEraser} style={styles.iconbutton}>
                 { tool === DrawingTool.Brush ? 
                 <Image source={erase} /> : <Image source={pen}/>}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleUndo} style={styles.iconbutton}>
                <Image source={arrow} />
              </TouchableOpacity>
        </View>
      </View>
    

      {/* 가로줄 */}
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 135,}}/>
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 200,}}/>
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 265,}}/>
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 330,}}/>
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 395,}}/>
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 460,}}/>
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 525,}}/>
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 590,}}/>
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 655,}}/>
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 720,}}/>
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 785,}}/>
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 850,}}/>
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 915,}}/>
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 980,}}/>
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 1045,}}/>
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 1110,}}/>
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 1175,}}/>
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 1240,}}/>
      <View style={{width: "100%", height: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 0, top: 1305,}}/>
      
      {/* 세로줄 */}
      <View style={{ height: 1500, width: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 65, top: 70, }} />
      <View style={{ height: 1500, width: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 130, top: 70, }} />
      <View style={{ height: 1500, width: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 195, top: 70, }} />
      <View style={{ height: 1500, width: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 260, top: 70, }} />
      <View style={{ height: 1500, width: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 325, top: 70, }} />
      <View style={{ height: 1500, width: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 390, top: 70, }} />
      <View style={{ height: 1500, width: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 455, top: 70, }} />
      <View style={{ height: 1500, width: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 520, top: 70, }} />
      <View style={{ height: 1500, width: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 585, top: 70, }} />
      <View style={{ height: 1500, width: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 650, top: 70, }} />
      <View style={{ height: 1500, width: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 715, top: 70, }} />
      <View style={{ height: 1500, width: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 780, top: 70, }} />
      <View style={{ height: 1500, width: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 845, top: 70, }} />
      <View style={{ height: 1500, width: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 910, top: 70, }} />
      <View style={{ height: 1500, width: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 975, top: 70, }} />
      <View style={{ height: 1500, width: 1, backgroundColor: "#C4C4C4", position: "absolute", left: 1030, top: 70, }} />
      
      {/* 자음 */}
      <Text style={{ position: "absolute", left: 15, top: 30, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㄱ</Text>
      <Text style={{ position: "absolute", left: 15, top: 95, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㄴ</Text>
      <Text style={{ position: "absolute", left: 15, top: 160, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㄷ</Text>
      <Text style={{ position: "absolute", left: 15, top: 225, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㄹ</Text>
      <Text style={{ position: "absolute", left: 15, top: 290, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㅁ</Text>
      <Text style={{ position: "absolute", left: 15, top: 355, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㅂ</Text>
      <Text style={{ position: "absolute", left: 15 , top: 420, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold",fontFamily: fontPath }}>ㅅ</Text>
      <Text style={{ position: "absolute", left: 15, top: 485, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㅇ</Text>
      <Text style={{ position: "absolute", left: 15, top: 550, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㅈ</Text>
      <Text style={{ position: "absolute", left: 15, top: 615, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㅊ</Text>
      <Text style={{ position: "absolute", left: 15, top: 680, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㅋ</Text>
      <Text style={{ position: "absolute", left: 15, top: 745, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㅌ</Text>
      <Text style={{ position: "absolute", left: 15, top: 810, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㅍ</Text>
      <Text style={{ position: "absolute", left: 15, top: 875, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㅎ</Text>

      <Text style={{ position: "absolute", left: 80, top: 30, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3, fontFamily: fontPath}}>ㄱ</Text>
      <Text style={{ position: "absolute", left: 80, top: 95, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㄴ</Text>
      <Text style={{ position: "absolute", left: 80, top: 160, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㄷ</Text>
      <Text style={{ position: "absolute", left: 80, top: 225, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㄹ</Text>
      <Text style={{ position: "absolute", left: 80, top: 290, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㅁ</Text>
      <Text style={{ position: "absolute", left: 80, top: 355, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㅂ</Text>
      <Text style={{ position: "absolute", left: 80, top: 420, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㅅ</Text>
      <Text style={{ position: "absolute", left: 80, top: 485, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㅇ</Text>
      <Text style={{ position: "absolute", left: 80, top: 550, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㅈ</Text>
      <Text style={{ position: "absolute", left: 80, top: 615, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㅊ</Text>
      <Text style={{ position: "absolute", left: 80, top: 680, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㅋ</Text>
      <Text style={{ position: "absolute", left: 80, top: 745, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㅌ</Text>
      <Text style={{ position: "absolute", left: 80, top: 810, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㅍ</Text>
      <Text style={{ position: "absolute", left: 80, top: 875, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㅎ</Text>

      {/* 모음 */}
      <Text style={{ position: "absolute", left: 405, top: 30, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㅏ</Text>
      <Text style={{ position: "absolute", left: 405, top: 95, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㅑ</Text>
      <Text style={{ position: "absolute", left: 405, top: 160, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㅓ</Text>
      <Text style={{ position: "absolute", left: 405, top: 225, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㅕ</Text>
      <Text style={{ position: "absolute", left: 405, top: 290, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㅗ</Text>
      <Text style={{ position: "absolute", left: 405, top: 355, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㅛ</Text>
      <Text style={{ position: "absolute", left: 405, top: 420, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath }}>ㅜ</Text>
      <Text style={{ position: "absolute", left: 405, top: 485, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㅠ</Text>
      <Text style={{ position: "absolute", left: 405, top: 550, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㅡ</Text>
      <Text style={{ position: "absolute", left: 405, top: 615, fontSize: 40, textAlign: "center", paddingTop: 50, fontWeight: "bold", fontFamily: fontPath}}>ㅣ</Text>

      <Text style={{ position: "absolute", left: 470, top: 30, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3, fontFamily: fontPath}}>ㅏ</Text>
      <Text style={{ position: "absolute", left: 470, top: 95, fontSize: 40, textAlign: "center", paddingTop: 50, opacity: 0.3,fontFamily: fontPath}}>ㅑ</Text>
      <Text style={{ position: "absolute", left: 470, top: 160, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㅓ</Text>
      <Text style={{ position: "absolute", left: 470, top: 225, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㅕ</Text>
      <Text style={{ position: "absolute", left: 470, top: 290, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㅗ</Text>
      <Text style={{ position: "absolute", left: 470, top: 355, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㅛ</Text>
      <Text style={{ position: "absolute", left: 470, top: 420, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㅜ</Text>
      <Text style={{ position: "absolute", left: 470, top: 485, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㅠ</Text>
      <Text style={{ position: "absolute", left: 470, top: 550, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㅡ</Text>
      <Text style={{ position: "absolute", left: 470, top: 615, fontSize: 40, textAlign: "center", paddingTop: 50,  opacity: 0.3,fontFamily: fontPath}}>ㅣ</Text>

      {/* 캔버스보드 부분 */}
      <View style={{ height: 1300, width: 1000, position: "absolute", left: 0, top: 70,}} >
      <Canvas
            ref={canvasRef}
            color="black"
            tool={tool}
            eraserSize={5}
            style={{ backgroundColor: 'transparent', height: 1300, width: 1000, position: "absolute" }}
          />
      </View>
      </>
      )}
    </View>
  );
};

export default ExWord;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
