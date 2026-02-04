import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const car = require("@/assets/images/car.png");

const DOWN_PAYMENT = [5, 10, 15, 20, 25, 30, 35];
const MONTH_OPTION = [24, 36, 48, 60, 72, 84];

export default function Input() {
  //สร้าง State เพื่อทำงานกับค่าข้อมูล
  const [carPrice, setCarPrice] = useState("");
  const [carDownPayment, setCarDownPayment] = useState("");
  const [carMonth, setCarMonth] = useState("");
  const [carInterest, setCarInterest] = useState("");
  const [carInstallment, setCarInstallment] = useState("");

  //คำนวณค่างวดรถ และส่งไปแสดงผลที่ /result
  const handleCalClick = () => {
    // Validate
    if (
      carPrice === "" ||
      carDownPayment === "" ||
      carMonth === "" ||
      carInterest === ""
    ) {
      Alert.alert("คำเตือน", "กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    //คำนวณ
    //เงินดาวน์
    let downPayment = (Number(carPrice) * Number(carDownPayment)) / 100;
    //ยอดจัด
    let carPayment = Number(carPrice) - downPayment;
    //คำนวณดอกเบี้ยทั้งหมด
    let totalInterest =
      ((carPayment * Number(carInterest)) / 100) * (Number(carMonth) / 12);
    //คำนวณยอดผ่อนต่อเดือน
    let installmentPay = (carPayment + totalInterest) / Number(carMonth);

    //ส่งผลไปแสดงที่ /result
    router.push({
      pathname: "/result",
      params: {
        downPayment: downPayment.toFixed(2),
        carPayment: carPayment.toFixed(2),
        carPrice: Number(carPrice).toFixed(2),
        installmentPay: installmentPay.toFixed(2),
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* ส่วนของการแสดงรูป */}
        <Image source={car} style={styles.car} />

        {/* ส่วนของการป้อนข้อมูล */}
        <View style={styles.inputContainer}>
          <Text
            style={{
              fontFamily: "Kanit_700Bold",
              fontSize: 26,
            }}
          >
            คำนวณค่างวดรถ
          </Text>

          {/* ป้อนราคารถ */}
          <Text style={styles.inputTitle}>ราคารถ (บาท)</Text>
          <TextInput
            placeholder="เช่น 850000"
            keyboardType="numeric"
            style={styles.inputValue}
            value={carPrice}
            onChangeText={setCarPrice}
          />

          {/* เลือกเงินดาวน์ */}
          <Text style={styles.inputTitle}>เลือกเงินดาวน์ (%)</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {DOWN_PAYMENT.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.downPayment,
                  carDownPayment === item.toString() &&
                    styles.downPaymentSelect,
                ]}
                onPress={() => setCarDownPayment(item.toString())}
              >
                <Text
                  style={[
                    styles.downLabel,
                    carDownPayment === item.toString() &&
                      styles.downLabelSelect,
                  ]}
                >
                  {item}%
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* เลือกระยะเวลาผ่อน */}
          <Text style={styles.inputTitle}>ระยะเวลาผ่อน (งวด)</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {MONTH_OPTION.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.monthOption,
                  carMonth === item.toString() && styles.monthOptionSelect,
                ]}
                onPress={() => setCarMonth(item.toString())}
              >
                <Text
                  style={[
                    styles.monthLabel,
                    carMonth === item.toString() && styles.monthLabelSelect,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ป้อนดอกเบี้ย */}
          <Text style={styles.inputTitle}>ดอกเบี้ย (% ต่อปี)</Text>
          <TextInput
            placeholder="เช่น 2.59"
            keyboardType="numeric"
            style={styles.inputValue}
            value={carInterest}
            onChangeText={setCarInterest}
          />

          {/* ปุ่มคำนวณค่างวด */}
          <TouchableOpacity onPress={handleCalClick} style={styles.btnCal}>
            <Text style={styles.labelCal}>คํานวณค่างวด</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  btnCal: {
    backgroundColor: "#064dc0",
    padding: 20,
    marginTop: 25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  labelCal: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 20,
    color: "#ffffff",
  },
  downPayment: {
    backgroundColor: "#f1f5f9",
    padding: 20,
    margin: 5,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  downPaymentSelect: {
    backgroundColor: "#23292e",
  },
  downLabel: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 16,
    color: "#474646",
  },
  downLabelSelect: {
    color: "#ffffff",
  },
  monthOption: {
    backgroundColor: "#f1f5f9",
    padding: 20,
    margin: 5,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  monthOptionSelect: {
    backgroundColor: "#23292e",
  },
  monthLabel: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 16,
    color: "#474646",
  },
  monthLabelSelect: {
    color: "#ffffff",
  },
  inputValue: {
    fontFamily: "Kanit_400Regular",
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#cbd5e1",
    backgroundColor: "#f8fafc",
  },
  inputTitle: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 18,
    color: "#474646",
    marginTop: 18,
  },
  inputContainer: {
    backgroundColor: "#ffffff",
    // height: "100%",
    marginTop: -30,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
  },
  car: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
});
