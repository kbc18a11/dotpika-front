import '../css/PixelArtsTemplates.css';
import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PixelArt from '../components/PixelArt';
import Dot from '../components/Dot'

const PixelArtsTemplates = () => {



  var image: string[];
  

  async function value() {

   
    const [image[],setimage]=useState("");
    const url = 'http://localhost:5000/api/pixel-arts-templates';

    try {
      const res = await axios.get(url);
      console.log(res);

      for (var imagedata in res.data.example_image) {
        var i = 0
        image[i] = imagedata;
        i++;
        console.log(image[i]);
      }

    } catch (e) {
      console.error(e.response);
    }

  }

  useEffect(() => {
    value()
  }, [])



  return (




    <div className="body">
      <h2>テンプレート選択画面</h2>
      <div className="image">
        {(() => {
          const items = [];
          for (let i = 0; i < image.length; i++) {
            <div className="block-image">
              <img src={image[i]} />
            </div>
          }
        })()}


        <div className="block-image">
          <img src={image[0]} />
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
