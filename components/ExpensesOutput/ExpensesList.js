import { View, Text, FlatList } from 'react-native'
import React from 'react'
import ExpenseItem from './ExpenseItem'

const ExpensesList = ({ expenses }) => {
    return (
        <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
                return <ExpenseItem {...item}/>
            }}
        />
    )
}

export default ExpensesList