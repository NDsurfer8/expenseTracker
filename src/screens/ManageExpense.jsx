import { View, Text, StyleSheet } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import { GlobalStyles } from '../../constants/styles';
import IconButton from '../../components/UI/IconButton'
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/UI/Button';
import { ExpensesContext } from '../../store/expenses-context';

const ManageExpense = ({ route, navigation }) => {
  const expenseCtx = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEdititng = !!editedExpenseId

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEdititng ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEdititng])

  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(editedExpenseId)
    navigation.goBack();
    
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if(isEdititng){
      expenseCtx.updateExpense(editedExpenseId,{description:'test', amount: 1999, date: new Date('2022-05-20')});

    }else{
      expenseCtx.addExpense({description:'test', amount: 1999, date: new Date('2022-05-19')});
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={cancelHandler}>cancel</Button>
        <Button style={styles.button} onPress={confirmHandler}>{isEdititng ? 'Update' : 'Add'}</Button>
        </View>
          {isEdititng && (
            <View style={styles.deleteContainer}>
              <Ionicons
                name="trash"
                color={GlobalStyles.colors.error500}
                size={36}
                onPress={deleteExpenseHandler} />
            </View>)}
    </View>
  )
}

export default ManageExpense
const styles = StyleSheet.create({
  deleteContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button:{
    minWidth: 120,
    marginHorizontal: 8
  }
})