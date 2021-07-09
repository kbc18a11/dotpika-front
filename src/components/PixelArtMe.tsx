import { ArtsMe } from "./ArtsMe";
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import playbutton from '../images/play.png';
import deletebutton from '../images/delete.png';

const useStyles = makeStyles({
    pixelArtName:{
        marginTop:34.5,
        marginLeft:30,
        backgroundColor: 'rgb(230, 230, 230)',
        width: 300,
        height: 35,
        color: 'rgb(0, 0, 0)',
        fontSize:20,
        float:'left',
        textTransform: 'none',
    },
    playButton: {
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 36,
      width:36,
      padding:0,
      marginTop:5,
      marginRight:5,
      marginBottom:15,
    },
    deleteButton: {
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 36,
      width:36,
      marginRight:5,
      marginBottom:5,
    },
  });
  
type PixelArtMeProps = {
    pixelArt: ArtsMe;
    onClickPlay:(id:string) =>void;
    onClickDelete:(id:string) => void;
}

const PixelArtMe = (props: PixelArtMeProps) => {
    const classes = useStyles();
    const pixelArt:ArtsMe = props.pixelArt;
    const id = String(pixelArt.id);

    const handlePlayPixelArt = () => {
        props.onClickPlay(id);
    }

   const handleDeletePixelArt = () => {
        props.onClickDelete(id);
    }
    
    const link:string = "/pixel-arts-preview/" + id;

    return(
        <div className="item">
            <Link to={link}>
                <Button className={classes.pixelArtName} id={id} variant="contained">{pixelArt.name}</Button> 
            </Link>
            <div className='buttons'>
                <Button className={classes.playButton} id={id} variant="contained" onClick={handlePlayPixelArt}><img src={playbutton}/></Button> 
                <Button className={classes.deleteButton} id={id} variant="contained" onClick={handleDeletePixelArt}><img src={deletebutton}/></Button>    
            </div>
        </div>
    );
}

export default PixelArtMe;

