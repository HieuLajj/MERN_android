import { NavigationContainer,createAppContainer, createStackNavigator} from '@react-navigation/native';
import GlobalScreen from './GlobalScreen';
import Otherpersonal from './Otherpersonal';

const AppNavigator = createStackNavigator({
    GlobalScreen: {screen: GlobalScreen},
    Otherpersonal: {screen: Otherpersonal},
    },
    {
        // Initial Screen
        initalRoute: "GlobalScreen"
    }
);

const Demo = createAppContainer(AppNavigator);

export default Demo;