import '../css/PixelArtsTemplates.css';
import Button from '@material-ui/core/Button';
import { useEffect , useState} from 'react';



const PixelArtsTemplates = () => {
  //外部のAPIがないため、仮変数を利用
  
  const [image ,setImage] = useState("");

  function value() {
     setImage("https://cdn.wikiwiki.jp/to/w/eft/img/::ref/Cash_register_img.jpg?rev=503e6188292c6295800f06357c0e6c9c&t=20191205231800")
    
  }
  
  useEffect(() => {
    value()
  },[])

  

  return (


    

    <div className="body">
      <h2>テンプレート選択画面</h2>
      <div className="image">
        <div className="block-image">
          <img src={image} />
        </div>

        <div className="block-image">
          <img src={image} />
        </div>

        <div className="block-image">
          <img src={image} />
        </div>

        <div className="block-image">
          <img src={image} />
        </div>


        <div className="nametext">
          <div className="name">
            ＄＄＄
            <Button className="playbutton" color="inherit">
              <img src="https://media.istockphoto.com/vectors/play-icon-design-vector-template-vector-id1251367325" />
            </Button>
          </div>


          <div className="name">
            ￥￥￥
            <Button className="playbutton" color="inherit">
              <img src="https://media.istockphoto.com/vectors/play-icon-design-vector-template-vector-id1251367325" />
            </Button>
          </div>

          <div className="name">
            €　€　€
            <Button className="playbutton" color="inherit">
              <img src="https://media.istockphoto.com/vectors/play-icon-design-vector-template-vector-id1251367325" />
            </Button>
          </div>

          <div className="name">
            ＊＊＊
            <Button className="playbutton" color="inherit">
              <img src="https://media.istockphoto.com/vectors/play-icon-design-vector-template-vector-id1251367325" />
            </Button>
          </div>
        </div>









      </div>


    </div>



  );
}

export default PixelArtsTemplates;
