import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { StyleSheet } from 'react-native';

interface Transaction {
  id: number;
  name: string;
  amount: number;
}

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const API_URL = 'http://18.218.226.28/api/transactions';

  // Fetch transactions
  const getTransactions = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.log(err));
  };

  // Add a transaction
  const addTransaction = () => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, amount: parseFloat(amount) })
    })
      .then(() => {
        setName('');
        setAmount('');
        getTransactions();
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Finance Tracker</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button title="Add Transaction" color="#4CAF50" onPress={addTransaction} />
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.transaction}>
            <Text style={styles.transactionText}>{item.name}: ${item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0F8FF', // light blue background
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1E90FF', // blue title
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#FFFFFF'
  },
  buttonContainer: {
    marginVertical: 10
  },
  transaction: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#E6F7FF',
    marginVertical: 2,
    borderRadius: 5
  },
  transactionText: {
    color: '#333',
    fontSize: 16
  }
});
