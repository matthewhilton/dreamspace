import * as React from 'react';
import { Button, DefaultTheme, withTheme, Provider as PaperProvider, configureFonts} from 'react-native-paper';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from "./Redux/store"
import SpaceWalk from './Components/SpaceWalk';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import JournalLibrary from "./Components/JournalLibrary"
import useDispatch from "react-redux"
import JournalEntryView from './Components/JournalEntryView';
const theme = {

    ...DefaultTheme,
    dark: true,
    colors: {
        ...DefaultTheme,
        mainScreenBackground: "#0A0A0A",
        journalFormBackground: "#141414",
        text: "#D5CBA8",
        subtext: "#918b73",
        background: "#141414",
        disabled: "#78686B",
        placeholder: "#595959",
        error: "#db6143",
        primary: "#e2856e",
        accent: "#E2856E",
        accent2: "#F39C6B",
        recordingButton: "#db5a44",
        orbit: "rgba(255,255,255,0.1)",
        statisticPoint: {
            up: "#4dbd5c",
            same: "#7a7a7a",
            down: "#c74668"
        }
    }
}

const fontConfig = {
    default: {
      regular: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Helvetica Neue',
        fontWeight: 'normal',
      },
    },
  };

  fontConfig.ios = fontConfig.default;
  fontConfig.android = fontConfig.default;

const CombinedDarkTheme = {
    ...theme,
    ...DarkTheme,
    colors: { ...DarkTheme.colors, ...theme.colors },
    fonts: configureFonts(fontConfig)
  };

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const JournalLibraryNavigator = () => (
    <Stack.Navigator initialRouteName="JournalLibrary">
        <Stack.Screen name="JournalLibrary" component={JournalLibrary} options={{title: "Journal Library", headerShown: false}} />
        <Stack.Screen name="JournalEntryView" component={JournalEntryView}/>
    </Stack.Navigator>
)

export default function App() {

    return (
        <>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ActionSheetProvider>
                        <PaperProvider theme={CombinedDarkTheme}>
                            <NavigationContainer theme={CombinedDarkTheme}>
                                <Drawer.Navigator initialRouteName="Home">
                                    <Drawer.Screen name="Home" component={SpaceWalk} />
                                    <Drawer.Screen name="Journal" component={JournalLibraryNavigator} />
                                </Drawer.Navigator>

                            </NavigationContainer>
                        </PaperProvider>
                    </ActionSheetProvider>
                </PersistGate>
            </Provider>
        </>
    );
}
