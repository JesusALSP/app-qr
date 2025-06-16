import { useCameraPermissions } from "expo-camera";
import { Link, Stack } from "expo-router";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native"; // Asegúrate de que 'View' esté importado

export default function Index() {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Escaner Unyte", headerShown: true }} />

      {/* Nuevo View para el fondo del texto */}
      <View style={styles.tituloBackground}>
        <Text style={styles.titulo}>Escanea un QR</Text>
      </View>

      <View style={{ gap: 20 }}>
        <Pressable onPress={requestPermission}>
          <Text style={[styles.boton, { opacity: !isPermissionGranted ? 1 : 0.5 }]}>
            Solicitar permiso
          </Text>
        </Pressable>
        <Link href={"../scanner"} asChild>
          <Pressable disabled={!isPermissionGranted}>
            <Text style={[styles.boton, { opacity: !isPermissionGranted ? 0.5 : 1 }]}>
              Escanear código
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#4e5e80",
    justifyContent: "space-around",
    paddingVertical: 80,
  },
  
  tituloBackground: {
    backgroundColor: "#000", 
    paddingVertical: 10,     
    paddingHorizontal: 20,   
    borderRadius: 10,        
  },
  titulo: {
    color: "#eee",   
    fontSize: 45,
     
  },
  boton: {
    color: "#eee",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#00e",
    alignContent: "center",
    textAlign: "center",
    fontSize: 20,
    margin: 5,
  },
});