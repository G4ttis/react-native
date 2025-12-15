import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from './src/components/Button';
import { Input } from './src/components/Input';
import { styles } from './App.styles';
import { currencies } from './src/constants/currencies';

export default function App() {
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <StatusBar style="light" />
          <View style={styles.header}>
            <Text style={styles.title}>Conversor de Moedas</Text>
            <Text style={styles.subTitle}>Converta valores entre diferentes moedas</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>De:</Text>
            <View style={styles.currencyGrid}>
             {currencies.map(currency => (
              <Button variant='primary' key={currency.code} currency={currency}></Button>
             ))}
            </View>
            <Input label="Valor: "></Input>
            <TouchableOpacity style={styles.swapButton}>
              <Text style={styles.swapButtonText}>
                ↑↓
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Para: </Text>
            <View style={styles.currencyGrid}>
             {currencies.map(currency => (
              <Button variant='secondary' key={currency.code} currency={currency}></Button>
             ))}
            </View>
          </View>
          <TouchableOpacity style={styles.convertButton}>
            <Text style={styles.swapButtonText}>
              Converter
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView> 
  );
}
