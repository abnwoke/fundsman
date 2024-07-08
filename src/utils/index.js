import {
    Dimensions, Platform
} from "react-native";

const moment = require('moment');

import {light_theme, dark_theme, sizes, fonts, font_files, styles} from "./theme"
import images from "./images";
import icons from "./icons";
import screens from "./screen_names";
import videos from "./videos";
import data from "./data";


const formatDate = (newDate) => {
    const year = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(new Date(newDate))
    const month = new Intl.DateTimeFormat('en', {month: 'short'}).format(new Date(newDate))
    const monthLong = new Intl.DateTimeFormat('en', {month: 'long'}).format(new Date(newDate))
    const day = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(new Date(newDate))

    return {
        nth: moment(new Date(newDate), "MM/DD/YYYY").format("Do"),
        day: day,
        // dayShort: moment(new Date(newDate), "MM/DD/YYYY").format("Do MMM, YYYY"),
        month: month,
        year: year,
        monthLong: monthLong,
        time: new Date(newDate).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: false}),
        date1: moment(new Date(newDate), "MM/DD/YYYY").format("Do MMM, YYYY"),
        date2: moment(new Date(newDate)).format("MMMM Do, YYYY"),
    }
}


const uniqueSlug = (items) => {
    const uniqueSlugs = new Set();
    const filteredItems = items.filter(obj => {
        if (!uniqueSlugs.has(obj.slug)) {
            uniqueSlugs.add(obj.slug);
            return true;
        }
        return false;
    });
    return filteredItems
}

const isEmpty = (value) => {
    return value === null || value === undefined || value === "" ||  !(Object.keys(value) || value).length;
}


const getDateTimeMoment = (date) => {
    return value === null || value === undefined || value === "" ||  !(Object.keys(value) || value).length;
}


const truncateString = (string, number) => {
    return string.length > number ? string.slice(0, number > 3 ? number - 3 : number) + '...' : string;
}


const getTenureLabel = (tenure) => {
    let label = null;
    if(tenure){
        if(tenure === 1){
            label = '1 Month'
        } else if(tenure === 6){
            label = '6 Months'
        } else if(tenure === 12) {
            label = '1 Year'
        } else if(tenure > 12) {
            label = tenure/12 + ' Years'
        }
    }
    return label
}


export default {
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
    light_theme,
    dark_theme,
    sizes,
    fonts,
    font_files,
    images,
    videos,
    icons,
    screens,
    style:styles,
    data,
    formatDate,
    uniqueSlug,
    isEmpty,
    getDateTimeMoment,
    truncateString,
    getTenureLabel
}