import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../Screens/HomeScreen.jsx";
import DistrictScreen from "../Screens/DistrictScreen.jsx";
import ReportScreen from "../Screens/ReportScreen.jsx";
import UserScreen from "../Screens/UserScreen.jsx";

const Tab = createBottomTabNavigator();

const tabIcons = {
  "Real Time": "time-outline",
  District: "location-outline",
  Report: "document-text-outline",
  User: "person-outline",
};

export default function TabNavigator({ onLogout }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#0f766e",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          height: 68,
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#dbeafe",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarIcon: ({ color, size }) => (
          <Ionicons
            name={tabIcons[route.name]}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="Real Time" component={HomeScreen} />
      <Tab.Screen name="District" component={DistrictScreen} />
      <Tab.Screen name="Report" component={ReportScreen} />
      <Tab.Screen name="User">
        {(props) => <UserScreen {...props} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
