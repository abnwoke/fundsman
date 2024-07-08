import Accordion from 'react-native-collapsible/Accordion';
import React, {Fragment, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from "react-native";

const Accordion = () =>{
    const [activeSections, setActiveSections] = useState([]);

    const BACON_IPSUM =
        'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

    const CONTENT = [
        {
            title: 'First',
            content: BACON_IPSUM,
        },
        {
            title: 'Second',
            content: BACON_IPSUM,
        },

    ];

    const renderHeader = (section) => {
        return (
            <View
                style={{
                    backgroundColor: '#F5FCFF',
                    padding: 10,
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: '500',
                    }}
                >{section.title}</Text>
            </View>
        );
    };

    const renderContent = (section) => {
        return (
            <View
                style={{
                    padding: 20,
                    backgroundColor: '#fff',
                }}
            >
                <Text>{section.content}</Text>
            </View>
        );
    };

    const updateSections = (activeSections) => {
        setActiveSections(activeSections)
    };

    return(
        <Accordion
            sections={CONTENT}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={updateSections}
            sectionContainerStyle={{
                marginBottom: 10
            }}
        />
    )
}



export default Accordion