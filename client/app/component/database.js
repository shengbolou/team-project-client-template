import React from 'react';
// import ReactDOM from 'react-dom';

/**
* Reset database button.
*/
export class ResetDatabase extends React.Component {
  render() {
    return (
      <button style={{marginTop:'70'}} className="btn btn-default" type="button" onClick={() => {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', '/resetdb');
          xhr.addEventListener('load', function() {
            window.alert("Database reset! Refreshing the page now...");
            document.location.reload(false);
          });
          xhr.send();
        }}>Reset Mock DB</button>
      );
    }
  }

// ReactDOM.render(
//   <ResetDatabase />,
//   document.getElementById('db-reset')
// );
