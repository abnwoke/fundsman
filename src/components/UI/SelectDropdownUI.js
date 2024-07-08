import {Card} from "react-native-ui-lib";
import {Text, View} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import React from "react";
import {useTheme} from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SelectDropdownUI = ({data, label, value, onSelect, search = false, customButton=null, dropdownStyle}) => {
    const {colors, sizes, fonts} = useTheme();

    const SearchProps = search ? {
        search,
        searchInputStyle: {
            backgroundColor: colors.white,
            borderRadius: 0,
            borderBottomWidth: 1,
            borderBottomColor: colors.gray5,
        },
        searchInputTxtColor: colors.gray9,
        searchPlaceHolder: 'Search here',
        searchPlaceHolderColor: colors.gray9,
        renderSearchInputLeftIcon: () => {
            return <FontAwesome name={'search'} color={colors.gray5} size={18}/>;
        }
    } : {}

    return (
        <SelectDropdown
            //defaultValueByIndex={0} // use default value by index or default value
            defaultValue={value} // use default value by index or default value
            value={value} // use default value by index or default value
            showsVerticalScrollIndicator={false}
            data={data}
            onSelect={(selectedItem, index) => {
                onSelect(selectedItem)
            }}

            renderButton={customButton? customButton : (selectedItem, isOpen) => {
                return (
                    <Card
                        style={{
                            //overflow: 'hidden',
                            borderRadius: 10,
                            elevation: 2,
                            shadowColor: '#000000',
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.11,
                            shadowRadius: 2,
                            backgroundColor: 'white',
                            height: 40,
                            marginTop: 8,
                            marginHorizontal: 5,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                fontFamily: fonts.poppinsMedium,
                            }}
                        >
                            {(selectedItem && selectedItem.label) || `Select ${label}`}
                        </Text>
                        <Icon
                            name={isOpen ? 'chevron-up' : 'chevron-down'}
                            style={{
                                fontSize: 20,
                                marginRight: 8,
                                //color: '#FFFFFF',
                            }}
                        />
                    </Card>
                );
            }}

            dropdownStyle={{
                backgroundColor: '#E9ECEF',
                borderRadius: 8,
                ...dropdownStyle
            }}
            renderItem={(item, index, isSelected) => {
                return (
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            paddingHorizontal: 12,
                            //justifyContent: 'center',
                            //alignItems: 'center',
                            paddingVertical: 11,
                            borderTopWidth: index === 0 ? 0 : 1,
                            borderTopColor: colors.gray5
                        }}
                    >

                        <Text
                            style={{
                                flex: 1,
                                fontSize: 15,
                                fontWeight: '500',
                                color: '#151E26',
                            }}
                        >{item.label}</Text>
                    </View>
                );
            }}

            {...SearchProps}
        />
    )
}

export default SelectDropdownUI