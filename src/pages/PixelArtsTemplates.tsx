import React from 'react';
import '../css/PixelArtsTemplates.css';
import Button from '@material-ui/core/Button';


const PixelArtsTemplates = () => {
  var arg = "https://cdn.wikiwiki.jp/to/w/eft/img/::ref/Cash_register_img.jpg?rev=503e6188292c6295800f06357c0e6c9c&t=20191205231800";
  var image;
  //外部のAPIがないため、value関数が実行しない。
  //代わりにargをimageに直接代入する。
  image = arg;
  function value(arg: any) {
    image = arg;
  }


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
