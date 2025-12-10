import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, Text, View, ScrollView } from 'react-native';
import { Button } from './src/components/Button';
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
            <View>
             {currencies.map(currency => (
              <Button variant='primary' key={currency.code} currency={currency}></Button>
             ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView> 
  );
}
