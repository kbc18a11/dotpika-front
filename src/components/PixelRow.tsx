import React from "react";
import {Pixel} from "../components/Pixel";

type PixelRowProps = {
    pixel: Pixel;
    onMouseDown: () => void;
    onMouseUp: () => void;
    onPixelOver: (x:number,y:number,red:number,green:number,blue:number) => void;
    onPixelClick: (x:number,y:number,red:number,green:number,blue:number) => void;
}

const PixelRow = (props: PixelRowProps) => {
    const {x,y,red,green,blue} = props.pixel;

    const handleMouseDown = () => {
        props.onMouseDown();
    }

    const handleMouseup = () => {
        props.onMouseUp();
    }

   const handlePixelOver = () => {
        props.onPixelOver(x,y,red,green,blue);
    }

    const handlePixelClick = () => {
        props.onPixelClick(x,y,red,green,blue);
    }
    
    
    const id = (x < 10 ? "0" + x : x) + "" + (y < 10 ? "0" + y : y)


    return(
        <td className="thPixel" id={id} onMouseDown={handleMouseDown} onMouseUp={handleMouseup} onClick={handlePixelClick} onMouseMove={handlePixelOver}></td>
    );
}

export default PixelRow;

