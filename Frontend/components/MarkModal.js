import React,  {useState} from "react";
import { StyleSheet, View, Text,
  Image, TouchableOpacity, Modal
} from "react-native";

import markList from "./markList";

//mark: first, second,,,,
const MarkModal = (mark) => {
    const [markModal, setMarkModal] = useState(true);
    return (
        <View style={styles.container}>
                <Modal animationType='slide' transparent={true} visible={markModal}>
                <View style={styles.markModalContainer}>
                    <View style={styles.markModalText}> 
                    <Text style={{ fontSize: 20, letterSpacing: 2, textAlign: "center", marginTop:"13%"}} > {markList.mark.text} </Text> 
                    </View>
                    <TouchableOpacity onPress={() => setMarkModal(false)} style={{marginBottom: 1, width: "100%", height: "20%", backgroundColor: "#80AE92", borderRadius: 10,}}>
                        <Text style={{ fontSize: 20, letterSpacing: 2, textAlign: "center", marginLeft: 10, color:"white", fontWeight:"bold", paddingTop: "1%", }} > 확인 </Text>
                    </TouchableOpacity>
                </View>
                </Modal>
        </View>
    );
  };
  
  export default MarkModal;
  
  const styles = StyleSheet.create({
      markModalContainer: {
        width: "60%",
        height: "15%",
        top: "42.5%",
        left: "20%",
        borderWidth: 0.5,
        borderRadius: 10,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
      },
      markModalText: {
        width: "100%",
        height: "80%",
        flexDirection: "column",
        alignItems: "center",
      },
  });