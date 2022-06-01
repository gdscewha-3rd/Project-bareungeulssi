import React, {useState} from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import SubLiter from "./SubLiter";

const ExLiterature = ({navigation, route}) => {
  const id = route.params.id;
  const title = route.params.title;
  const text = route.params.text;
  
  var textArr = [];
  var cnt=0, last=-1;
  var i, pageSize=0;

  for(i=0 ; i<text.length; i++){
    if(text[i]=='\n') { // \n을 만났을 때
      cnt++; 
      if(cnt%4==0 && cnt!=0){ // 5단위로 끊어서 배열 저장
        pageSize++;
        textArr.push(text.substring(last+1, i));
        last = i; // i까지 저장했음을 알려줌
        cnt=0;
      }
    }
  }

  if(cnt>0) {
    pageSize++;
    textArr.push(text.substring(last+1, i));
  }

  const [visible, setVisible] = useState([
    true, false, false, false, false, false, false, false, false, false
  ]);

  var pageArr = [];
  for(var j=0 ; j<pageSize ; j++) pageArr.push({
    id : j,
    num : j
  }); 

  return (
    <>
      {pageArr.map((s)=>(
          visible[s.num] && (
            <SubLiter
            key = {s.id}
            pageNum = {s.num}
            navigation={navigation} 
            id={id}
            setTitle={title}
            text={textArr[s.num]}
            />
          )
      ))}
      <View style={styles.container}> 
        {pageArr.map((s)=>(
          <TouchableOpacity
            key={s.id}
            onPress={() => {
              var newPagearr = [];

              for(var i=0 ; i<s.num ; i++) newPagearr.push(false); 
              newPagearr.push(true);
              for(var i=s.num+1 ; i<10 ; i++) newPagearr.push(false); 
              
              setVisible({...newPagearr})
            }}
            style={styles.roundButton}>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default ExLiterature;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "5%",
    backgroundColor: "#F9F9F9",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  roundButton: {
    width: 25,
    height: 25,
    borderRadius: 100,
    backgroundColor: '#80AE92',
    marginLeft : 5,
    marginRight: 5
  },
})