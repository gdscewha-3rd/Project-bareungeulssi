// import React, { useState, useEffect } from 'react';

// import {
//     Text, View, Button, StyleSheet, Image,
//     TouchableOpacity,
//   } from "react-native";

// import NotoSansKR_Light from './NotoSansKR-Light.ttf';
// import NotoSansKR_Regular from './NotoSansKR-Regular.ttf';

// import { Font } from 'expo';


// const FontsList = ({navigation}) => {
//     const fonts = {
//         first: [
//             { id: 1, name: 'NotoSans_Light', file: NotoSansKR_Light },
//             { id: 2, name: 'NotoSans_Regular', file: NotoSansKR_Regular },
//             { id: 3, name: 'NotoSans_Light', file: NotoSansKR_Light },
//             { id: 4, name: 'NotoSans_Regular', file: NotoSansKR_Regular },
//             { id: 5, name: 'NotoSans_Light', file: NotoSansKR_Light },
//             { id: 6, name: 'NotoSans_Regular', file: NotoSansKR_Regular },
//         ]
//     }

//     const [isReady, setIsReady] = useState(true);
 
//     useEffect(async () => {
//         await Font.loadAsync({
//             'NotoSansKR_Light': require('./NotoSansKR-Light.ttf'),
//             'NotoSansKR_Regular': require('./NotoSansKR-Regular.ttf'),
//         });
//         setIsReady(true);
//     }, []);
//     return (
//         <View style={styles.FontBlock}>
//             {isReady && ( <>
//             {members.first.map(s => (
//                 <View style={styles.Font} key={s.id}>
//                     <TouchableOpacity onPress={() => navigation.navigate("PROFILE_LOGIN")}
//                         style={{ height: 130, width: "45%"}} >
//                         <Text style={{ fontSize: 20, letterSpacing: 15, fontWeight: "bold", textAlign: "center", paddingTop: 50,
//                     fontFamily: file }} > {s.name}</Text>
//                     </TouchableOpacity>
//                 </View>
//             ))}
//             </>
//         )}
//         </View>
//     );
// };

// export default FontsList;

// const styles = StyleSheet.create({
//     // 배경색 넣은 컨테이너
//     FontBlock: {
//         flex: 1,
//         width:"100%",
//         borderWidth: 1,
//     },
//     // 컴포넌트를 양쪽에 배치하는 컴포넌트
//     Font: {
//         flexDirection:"row",
//         flexWrap:"wrap",
//         paddingHorizontal:16,
//         paddingTop:10,
//         justifyContent:"space-between",
//         paddingBottom:80,
//     },
//   });
  
