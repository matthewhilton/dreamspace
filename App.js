import * as React from 'react';
import { Button, DefaultTheme, withTheme, Provider as PaperProvider, configureFonts} from 'react-native-paper';
import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from "./Redux/store"
import SpaceWalk from './Components/Pages/DreamSpaceExplorePage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import JournalLibrary from "./Components/Pages/JournalLibrary"
import useDispatch from "react-redux"
import JournalEntryView from './Components/Pages/JournalEntryView';
import SettingsPage from "./Components/Pages/SettingsPage"
import DrawingModalPreview from "./Components/Journal/Drawing/DrawingModalPreview"
import JournalEditor from './Components/Pages/JournalEditor';
import * as Sentry from 'sentry-expo';
import TagListPage from './Components/Pages/TagListPage';
import TagDetailPage from './Components/Pages/TagDetailPage';

/*Sentry.init({
  dsn: 'https://4e5375445d0445acbf0086a7876e7f4e@o286831.ingest.sentry.io/5522741',
  enableInExpoDevelopment: true,
  debug: true, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
});*/

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
        journalCarouselItem: "#292929",
        journalListDivider: "#141414",
        journalViewCard: "#242424",
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
        <Stack.Screen name="JournalEntryView" component={JournalEntryView} />
        <Stack.Screen name="JournalImageView" options={{title: "Drawing Preview"}} component={DrawingModalPreview} />
        <Stack.Screen name="JournalEditor" component={JournalEditor} />
    </Stack.Navigator>
)

const TagNavigator = () => (
  <Stack.Navigator initialRouteName="TagOverview">
      <Stack.Screen name="TagOverview" component={TagListPage} options={{title: "Tags", headerShown: false}} />
      <Stack.Screen name="TagDetailView" component={TagDetailPage} options={{title: "Tags", headerShown: false}} />
  </Stack.Navigator>
)

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

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
                                    <Drawer.Screen name="Tags" component={TagNavigator} />
                                    <Drawer.Screen name="Settings" component={SettingsPage} />
                                </Drawer.Navigator>
                            </NavigationContainer>
                        </PaperProvider>
                    </ActionSheetProvider>
                </PersistGate>
            </Provider>
        </>
    );
}
