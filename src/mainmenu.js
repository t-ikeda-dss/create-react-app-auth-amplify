import React from 'react';              //Reactを読み込んでいる
import { Link } from 'react-router-dom';// 追加 Linkタブを読み込む
 
class mainmenu extends React.Component {   //page1クラスにReact.Componentを継承する
 
    render() {                          //画面表示の為のrenderメソッドを定義する
        return (
            <div>
                Main Menu!!!
                <br/>
                <Link to={`/search`}>Go To Search</Link>
            </div>
        );
    }
}
 
export default mainmenu;
