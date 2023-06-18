import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import LoginScreen from './pages/Login';
import HomeScreen from './pages/HomeScreen'; // Your main app screen
import BodyPartSelectionScreen from './pages/BodyPartSelectionScreen';
import CameraScreen from "./pages/Camera";
import ImageScreen from './pages/ImageScreen';
import { PhotoProvider } from './contexts/PhotoProvider';
import { TattooProvider } from './contexts/TattooProvider';

const Stack = createStackNavigator();

const App = () => {
  return (
    <TattooProvider>
      <PhotoProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              gestureEnabled: false,
              gestureDirection: 'vertical',
              cardStyleInterpolator: CardStyleInterpolators.forModalSlideFromBottomCard
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="BodyPartSelection"
              component={BodyPartSelectionScreen}
              initialParams={{ setX: () => null, setY: () => null }}
            />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Image" component={ImageScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PhotoProvider>
    </TattooProvider>
  );
}

export default App;
