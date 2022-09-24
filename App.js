import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import ExpensesContextProvider from './store/expenses-context';

export default function App() {
  return (
    <ExpensesContextProvider>
      <AppNavigator />
    </ExpensesContextProvider>
  );
}

