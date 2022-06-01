import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Button,
  Text,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
} from "react-native";
import SignatureScreen from "react-native-signature-canvas";

//스크린샷
import ViewShot, { captureScreen } from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";

const CaptureSign = ({ onOK }) => {
  const ref = useRef();

  const handleOK = (signature) => {
    onOK(signature);
  };
  const handleClear = () => {
    ref.current.clearSignature();
  };
  const handleUndo = () => {
    ref.current.undo();
  };
  const handleRedo = () => {
    ref.current.redo();
  };
  const handleDraw = () => {
    ref.current.draw();
  };
  const handleErase = () => {
    ref.current.erase();
  };

  const style = `.m-signature-pad { border: none; 
    margin-left: 10px; margin-right: 20px;
    margin-top: 10px;
    height: 800px;} 
  .m-signature-pad--footer {display: none; margin: 0px;}`;

  //스크린샷 캡쳐 위한 코드
  const captureRef = useRef();

  const getPhotoUri = async (): Promise<string> => {
    const uri = await captureRef.current.capture();
    console.log("👂👂 Image saved to", uri);
    return uri;
  };

  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === "granted";
  };

  const onSave = async () => {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      toast("갤러리 접근 권한이 없어요");
      return;
    }
    const uri = await getPhotoUri();
    const result = await CameraRoll.save(uri);
    console.log("🐤result", result);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button title="Draw" onPress={handleDraw} />
        <Button title="Erase" onPress={handleErase} />
        <Button title="Undo" onPress={handleUndo} />
        <Button title="Redo" onPress={handleRedo} />
        <Button title="갤러리에 저장" onPress={onSave} />
      </View>
      <ViewShot ref={captureRef} options={{ format: "jpg", quality: 0.9 }}>
        <View
          style={{
            marginTop: 10,
            height: 1000,
            width: 1000,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SignatureScreen ref={ref} onOK={handleOK} webStyle={style} />
          <Text>이 박스가 캡쳐됩니다</Text>
        </View>
      </ViewShot>
    </View>
  );
};

export default CaptureSign;

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
