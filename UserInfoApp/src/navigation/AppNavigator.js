import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import UserScreen from '../screens/UserScreen';
import axios from 'axios';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Fetching users...");
        const response = await axios.get('https://random-data-api.com/api/users/random_user?size=80');

        if (response.status === 200 && Array.isArray(response.data)) {
          console.log("Fetched Users:", response.data);
          setUsers(response.data);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err) {
        console.error('Error fetching users:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>⚠ Error: {error}</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserScreen">
        {props => <UserScreen {...props} users={users} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default AppNavigator;
