import {Text, Image, TouchableOpacity, View} from 'react-native';
import {useTheme} from "@react-navigation/native";
import utils from "../../utils";

const ModalHeader = ({label, onClose, textStyle}) => {
    const {colors, sizes, fonts} = useTheme();

    return (
        <View
            style={{
                flexDirection: 'row',
                borderBottomWidth: 1,
                borderBottomColor: colors.gray4,
                paddingHorizontal: 15,
                paddingVertical: 15,
                alignItems: 'center',
                justifyContent: 'space-between'
            }}
        >
            <Text
                style={{
                    color: colors.black,
                    fontFamily: fonts.poppinsSemiBold,
                    marginBottom: -2,
                    lineHeight:16,
                    flex: 1,
                    ...textStyle
                }}
            >{label}</Text>

            <TouchableOpacity
                activeOpacity={0.5}
                onPress={onClose}
                style={{
                    width: 20,
                    height: 20,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={utils.icons.cancel}
                    style={{
                        width: 25,
                        height: 25,
                        tintColor: colors.danger
                    }}
                />
            </TouchableOpacity>

        </View>
    )
}

export default ModalHeader