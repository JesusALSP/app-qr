import { CameraView } from "expo-camera";
import { Stack, useRouter } from "expo-router"; // Importa useRouter
import { useEffect, useRef } from "react";
import { AppState, Linking, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Importa Text, TouchableOpacity, View
import { Overlay } from "./Overlay";

export default function Index() {
    const qrLock = useRef(false);
    const appState = useRef(AppState.currentState);
    const router = useRouter(); // Inicializa el hook useRouter

    useEffect(() => {
        const subscription = AppState.addEventListener("change", (nextAppState) => {
            if(appState.current.match(/inactive|background/) && nextAppState === "active")
                qrLock.current = false;

            appState.current = nextAppState;
        });
        return () => { subscription.remove();};
    });

    return (
        <SafeAreaView style={StyleSheet.absoluteFillObject}>
            <Stack.Screen options={{
                title: "Escanea pues",
                headerShown: false, // Aunque el header está oculto, estas opciones no se verán
                headerStyle: { backgroundColor: '#00e' },
                headerTintColor: '#eee',
                headerTitleStyle: { fontWeight: 'bold' },
            }}
            />
            {Platform.OS === "android" ? <StatusBar hidden /> : null}

            <CameraView
                style={StyleSheet.absoluteFillObject}
                facing="back"
                onBarcodeScanned={({ data }) => {
                    if(data && !qrLock.current) {
                        qrLock.current = true;
                        setTimeout(async () => {
                            await Linking.openURL(data);
                        }, 500);
                    }
                }}
            >
            </CameraView>

            
            <Overlay/>

            {/* --- Botón para volver al menú principal --- */}
            <View style={styles.backButtonContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()} 
                >
                    <Text style={styles.backButtonText}>Volver al Menú</Text>
                </TouchableOpacity>
            </View>
            {/* ------------------------------------------- */}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // Tus estilos existentes (si los tienes)
    // ...

    backButtonContainer: {
        position: 'absolute', // Para posicionarlo sobre la cámara y el overlay
        top: Platform.OS === 'ios' ? 60 : 20, // Ajusta la posición superior para iOS (por la barra de estado) y Android
        left: 20,
        zIndex: 10, // Asegura que esté por encima de otros elementos
    },
    backButton: {
        backgroundColor: '#00e', // Fondo azul
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 25, // Botón redondeado
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Sombra para Android
    },
    backButtonText: {
        color: '#eee', // Texto blanco
        fontSize: 16,
        fontWeight: 'bold',
    },
});