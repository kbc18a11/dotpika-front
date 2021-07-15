import React from "react";

type BackgroundColorprops = {
    value: string;
    index: number;
    onColorChange: (index:number) => void;
}

const BackgroundColor = React.memo((props: BackgroundColorprops) => {
    const value = props.value;
    const index = props.index;
    const handleBackgroundColor = () => {
        props.onColorChange(index);
    } 
    
    return(
        <button type="button" className='backgroundColorButton' id={"background" + value.charAt(0).toUpperCase() + value.slice(1)} name={"background" + value.charAt(0).toUpperCase() + value.slice(1)} onClick={handleBackgroundColor}/>
    );
})

export default BackgroundColor;