import { useEffect, useState, memo } from "react";
import {Image} from 'expo-image';
import utils from "../../utils";

const  ImageUI = ({source, fallbackSrc= utils.images.default, ...rest}) =>{
    const [imgSource, setImgSource] = useState(source || fallbackSrc);

    useEffect(() => {
        setImgSource(source || fallbackSrc);
    }, [source]);


    return(
        <Image
            cachePolicy={'memory-disk'}
            source={imgSource}
            {...rest}
            onError={() => {
                setImgSource(fallbackSrc);
            }}
        />
    )
}

export default memo(ImageUI)