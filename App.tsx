import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

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
    <View style={{ padding: 20 }}>
      <Text>Finance Tracker</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ borderWidth: 1, marginVertical: 5, padding: 5 }} />
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" style={{ borderWidth: 1, marginVertical: 5, padding: 5 }} />
      <Button title="Add Transaction" onPress={addTransaction} />
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}: ${item.amount}</Text>}
      />
    </View>
  );
}
