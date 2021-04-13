import React from 'react';
import { Link } from 'react-router-dom';
 
class mainmenu extends React.Component {

    onLoad = () => {
      alert("call onLoad");
    }

    render() {
        return (
          <body onload="this.onLoad"> 　
            <div>
              Main Menu!!!
              <br/>
              <input id="lastword" value={sessionStorage.getItem("api-search-keyword")} type="text"></input>
              <Link to={`/search`}>検索画面を表示</Link>
              <p>{this.props.location.state.text}</p>
            </div>
          </body>
        );
    }
}
 
export default mainmenu;
