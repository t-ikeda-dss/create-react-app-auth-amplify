import React from 'react';
import { Link } from 'react-router-dom';
 
class mainmenu extends React.Component {
 
    render() {
        return (
            <div>
              Main Menu!!!
              <br/>
              <Link to={`/search`}>設定</Link>
              <Link to={`/search`}>ユーザー情報</Link>
              <Link to={`/search`}>検索画面を表示</Link>
            </div>
        );
    }
}
 
export default mainmenu;
