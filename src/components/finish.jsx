import PropTypes from 'prop-types';
import "../../public/App.css";
function Finish(props) {
  return (
    <div className='finish'>
    
      <h1>Great job! </h1>
      <h1> Your speed is <span style={{color : "rgba(255, 223, 41, 0.925)", textShadow: '5px 3px 3px black, -2px -3px black, 2px -3px black, -1px 1px black' }}>{props.score} WPM </span></h1>
      <h2>You have completed the typing test.</h2>
      <button className="refresh" style={{height : "60px"}} onClick={() => window.location.reload()}>Try Again</button>
    </div>
  );
}

Finish.propTypes = {
  score: PropTypes.number.isRequired,
};

export default Finish;