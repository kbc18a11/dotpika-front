import React from "react";

type SavePixelArtProps = {
    name: string;
    onNameChange: (name:string) => void;
    onPixelArtSave: () => void;
    onDeleteColor: () => void;
    onMakeItShine:() => void;
}

const SavePixelArt = (props: SavePixelArtProps) => {
    const name = props.name;

    const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        props.onNameChange(e.target.value);
    }

    const handlePixelArtSaveW = () => {
        props.onPixelArtSave();
    }

    const handleDeleteColor = () => {
        props.onDeleteColor();
    }

    const handleMakeItShine = () => {
        props.onMakeItShine();
    }

    return(
        <div>
            <div id="savePixelArt">
                <input type="text" id="saveName" value={name} onChange={handleNameChange} placeholder="名前を付けて保存"/>
                <button type="button" id="buttonSave" name="buttonSave" value="save" onClick={handlePixelArtSaveW}>保存</button>
            </div>
            <button type="button" id="buttonShine" name="buttonShine" value="shine" onClick={handleMakeItShine}>光らせる</button>
            <button type="button" id="buttonDelete" name="buttonDelete" value="delete" onClick={handleDeleteColor}>全消し</button>
        </div>
    );
}

export default SavePixelArt;

