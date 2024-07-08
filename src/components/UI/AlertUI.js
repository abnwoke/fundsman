import React from "react"
import {
    Alert,
    Collapse,
    VStack,
    HStack,
    IconButton,
    CloseIcon,
    Box,
    Text,
} from "native-base"
import {SIZES} from "../../constants";

const AlertUI = (props) =>{
    const {title, status, onClose, message, show } = props

    return(
        <Collapse isOpen={show} style={{marginVertical: 10,  marginHorizontal: SIZES.padding}}>
            <Alert
                w="100%"
                status={status}
               style={{
                   paddingTop: 7,
                   paddingBottom: 7,
                   paddingLeft: 8,
                   paddingRight: 8,
               }}
            >
                <VStack space={1} flexShrink={1} w="100%">
                    <HStack
                        flexShrink={1}
                        space={2}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <HStack flexShrink={1} space={2} alignItems="center">
                            <Alert.Icon />
                            <Text
                                fontSize="md"
                                fontWeight="medium"
                                _dark={{
                                    color: "coolGray.800",
                                }}
                            >
                                {title}
                            </Text>
                        </HStack>
                        <IconButton
                            variant="unstyled"
                            icon={<CloseIcon size="3" color="coolGray.600" />}
                            onPress={onClose}
                        />
                    </HStack>
                    {message?
                        <Box
                            pl="6"
                            _dark={{
                                _text: {
                                    color: "coolGray.600",
                                },
                            }}
                            style={{
                                marginTop: -4
                            }}
                        >
                            {message}
                        </Box> : null
                    }
                </VStack>
            </Alert>
        </Collapse>
    )
}

export default AlertUI