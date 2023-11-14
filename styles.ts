import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#171717',
      alignItems: 'center',
      justifyContent: 'center',
      // padding: 32
    },
    header: {
      width: "100%",
      height: 90,
      backgroundColor: "#f97316",
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 18
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 8,
        marginTop: 20,
    },
    results: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
      justifyContent: "center",
      marginTop: 64
    }
  });