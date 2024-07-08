import {useNavigation, useTheme} from "@react-navigation/native";
import {Text, TouchableOpacity, View} from "react-native";
import utils from "../../utils";
const AuthNav = ({active, containerStyle}) => {
    const navigation = useNavigation();
    const {colors, sizes, fonts} = useTheme();

    const Menu = ({label, active, onPress, }) => {

        return (
            <TouchableOpacity
                activeOpacity={active? 1 : 0.5}
                onPress={active? undefined : onPress}
                style={{
                    marginRight: 20,
                    borderBottomWidth: active ? 1 : 0,
                    borderBottomColor: colors.white,
                    paddingBottom: 6
                }}
            >
                <Text
                    style={{
                        color: active ? colors.white : colors.transparentWhite4,
                        fontFamily: fonts.kronaOneRegular,
                        fontSize: 18
                    }}
                >{label}</Text>
            </TouchableOpacity>
        )
    }


    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 0,
                ...containerStyle
            }}
        >
            <Menu
                label={"Login"}
                active={active === 'login'}
                onPress={()=> navigation.navigate(utils.screens.login)}
            />

            <Menu
                label={"Sign up"}
                active={active === 'signup'}
                onPress={()=> navigation.navigate(utils.screens.register)}
            />

        </View>
    )
}

export default AuthNav