import React, { useRef } from "react";
import { StyleSheet, View, Button, Text,
  SafeAreaView, PermissionsAndroid, Platform } from "react-native";
import SignatureScreen from "react-native-signature-canvas";

const Sign = ({ onOK }) => {
  const ref = useRef();

  const handleOK = (signature) => { onOK(signature); };
  const handleClear = () => { ref.current.clearSignature(); };
  const handleUndo = () => { ref.current.undo(); };
  const handleRedo = () => { ref.current.redo(); };
  const handleDraw = () => { ref.current.draw(); };
  const handleErase = () => { ref.current.erase(); };

  const style = `.m-signature-pad { border: none; 
    margin-left: 10px; margin-right: 20px;
    margin-top: 10px;
    height: 800px;} 
  .m-signature-pad--footer {display: none; margin: 0px;}`;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button title="Draw" onPress={handleDraw} />
        <Button title="Erase" onPress={handleErase} />
        <Button title="Undo" onPress={handleUndo} />
        <Button title="Redo" onPress={handleRedo} />
      </View>
      <SignatureScreen ref={ref} onOK={handleOK} webStyle={style} />
    </View>
    
  );
};

export default Sign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 250,
    // padding: 10,
  },
  row: {
    marginTop: 70,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    alignItems: "center",
  },
});