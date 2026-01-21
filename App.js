import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from './src/components/Button';
import { Input } from './src/components/Input';
import { styles } from './App.styles';
import { currencies } from './src/constants/currencies';
import { ResultCard } from './src/components/ResultCard';
import { exchangeRateApi } from './src/services/api';
import { convertCurrency } from './src/utils/convertCurrency';
import { useState } from 'react';

export default function App() {
  const [amount, setAmount] = useState('')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('BRL')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [exchangeRate, setExchangeRate] = useState(null)

  async function fetchExchangeRate() {
    const data = await exchangeRateApi(fromCurrency)
    const rate = data.rates[toCurrency]
    const convertedAmount = convertCurrency(amount, rate)
    setResult(convertedAmount)
  } 

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
              <Button variant='primary' 
                key={currency.code}
                currency={currency}
                onPress={() => setFromCurrency(currency.code)}
                isSelected = {fromCurrency === currency.code}
                ></Button>
             ))}
            </View>

            <Input label="Valor: " value={amount} onChangeText={setAmount}></Input>

            <TouchableOpacity style={styles.swapButton}>
              <Text style={styles.swapButtonText}>
                ↑↓
              </Text>
            </TouchableOpacity>

            <Text style={styles.label}>Para: </Text>
            <View style={styles.currencyGrid}>
             {currencies.map(currency => (
              <Button variant='primary'
                key={currency.code}
                currency={currency}
                onPress={() => setToCurrency(currency.code)}
                isSelected = {toCurrency === currency.code}
              ></Button>
             ))}
            </View>
          </View>
          <TouchableOpacity style={styles.convertButton} onPress={fetchExchangeRate}>
            <Text style={styles.swapButtonText}>
              Converter
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView> 
  );
}
