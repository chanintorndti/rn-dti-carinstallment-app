import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const carkey = require("@/assets/images/carkey.png");

export default function Result() {
  //เอาค่าพารามิเตอร์ที่ส่งมา เก็บในตัวแปรเพื่อจะได้เอาไปใช้ใน Component
  const params = useLocalSearchParams();
  const { downPayment, carPayment, carPrice, installmentPay } = params;

  // ฟังก์ชันใส่ , คั่นตัวเลข
  const formatCurrency = (amount: string | number) => {
    return Number(amount).toLocaleString("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={carkey} style={styles.icon} />
        <Text style={styles.headerTitle}>สรุปยอดผ่อนชำระ</Text>
      </View>

      {/* Card แสดงยอดผ่อนต่อเดือน (Highlight) */}
      <View style={styles.highlightCard}>
        <Text style={styles.highlightLabel}>ผ่อนเริ่มต้นเพียง</Text>
        <Text style={styles.highlightValue}>
          {formatCurrency(Number(installmentPay))}
        </Text>
        <Text style={styles.highlightUnit}>บาท / เดือน </Text>
      </View>

      {/* Detail List */}
      <View style={styles.detailContainer}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}> ราคารถยนต์</Text>
          <Text style={[styles.rowValue]}>
            {formatCurrency(Number(carPrice))} บาท
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}> เงินดาวน์</Text>
          <Text style={[styles.rowValue]}>
            {formatCurrency(Number(downPayment))} บาท
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}> ยอดจัด</Text>
          <Text style={[styles.rowValue]}>
            {formatCurrency(Number(carPayment))} บาท
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => router.navigate("/input")}
      >
        <Text style={styles.btnText}>คำนวณใหม่</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1E293B", padding: 20 },
  header: { alignItems: "center", marginTop: 40, marginBottom: 20 },
  icon: { width: 80, height: 80, marginBottom: 10 },
  headerTitle: { fontFamily: "Kanit_700Bold", fontSize: 24, color: "#FFF" },

  highlightCard: {
    backgroundColor: "#2563EB",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    elevation: 5,
  },
  highlightLabel: {
    fontFamily: "Kanit_400Regular",
    color: "#BFDBFE",
    fontSize: 16,
  },
  highlightValue: {
    fontFamily: "Kanit_700Bold",
    color: "#FFF",
    fontSize: 48,
    marginVertical: 5,
  },
  highlightUnit: {
    fontFamily: "Kanit_400Regular",
    color: "#FFF",
    fontSize: 14,
  },

  detailContainer: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 24,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  rowLabel: { fontFamily: "Kanit_400Regular", color: "#64748B", fontSize: 16 },
  rowValue: { fontFamily: "Kanit_600SemiBold", fontSize: 18 },
  divider: { height: 1, backgroundColor: "#E2E8F0", marginVertical: 10 },
  note: {
    fontFamily: "Kanit_400Regular",
    color: "#94A3B8",
    fontSize: 12,
    textAlign: "center",
  },

  homeBtn: {
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
  },
  btnText: { fontFamily: "Kanit_600SemiBold", color: "#FFF", fontSize: 16 },
});
