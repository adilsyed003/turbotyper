import "../../public/App.css";
import {generate} from "random-words";
import {useState,useEffect, useRef} from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import Finish from "./finish";
function InputArea() {
  const [words , setWords] = useState([]);
  const [currentIndex , setCurrentIndex] = useState(0);
  const [input , setInput] = useState('');
  const [colors, setColors] = useState([]);
  const score = useRef(0);
  const [timeLeft, setTimeLeft] = useState(60); 
  const [isFinished, setIsFinished] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  useEffect(() => {
    if (timerStarted && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
        console.log("thereeee")
      }, 1000);
      return () => clearTimeout(timerId);
    } else {
      const speed = score.current; // words per minute
      console.log("speeeddd"+speed);
      setIsFinished(true);
    }
  }, [timeLeft, timerStarted]);

  
  useEffect(()=>{
    const randomWords = generate({exactly : 10 , join:" ", maxLength: 8 });
    setWords(randomWords.split(' '));
    console.log(randomWords);
    setColors(new Array(randomWords.length).fill('white'));
    setInput('');
    setCurrentIndex(0);
    score.current = 0;
  },[]);

  const handleSpacePress = (e)=>{
    e.preventDefault();
    if(currentIndex === words.length - 1){
      setInput('');
      setCurrentIndex(0);
      setWords(generate({exactly : 10 , join:" " , maxLength: 8}).split(' '));
      setColors([]);
      if (input.trim() === words[currentIndex]) {
        score.current = score.current + 1;
      }else{
        //Incorrect
      }
    }else{
      if (input.trim() === words[currentIndex]) {
        //Correct
        setCurrentIndex(currentIndex + 1);
        setInput("");
        score.current = score.current + 1;
      }else{
        //Incorrect
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setInput('');
      }
    }
  }

  function handleChange(e){
    const {value} = e.target;
    setInput(value);
    if (!timerStarted && value.length > 0) {
      setTimerStarted(true);
    }
    const newColors = [...colors];
    const wordStartIndex = words.slice(0, currentIndex).join(' ').length + currentIndex;
    if (value.length < input.length) {
      newColors[wordStartIndex + value.length] = undefined;
    }

    for (let i = 0; i < value.length; i++) {
      newColors[wordStartIndex + i] = value[i] === words[currentIndex].charAt(i) ? 'green' : 'red';
    }
    setColors(newColors);
  }

  if (isFinished && timeLeft === 0) {
    return <Finish score={score.current}/>;
  }

  return (
    <div className="main">
        <div className="area">
            <div className="text"><p className="maintext">
            {words.map((word, wordIndex) => {
              const wordStartIndex = words.slice(0, wordIndex).join(' ').length + wordIndex;
              return (
                <span key={wordIndex} style={{ backgroundColor: wordIndex === currentIndex && 'grey' }}>
                  {word.split('').map((letter, letterIndex) => (
                    <span key={letterIndex} style={{ color: colors[wordStartIndex + letterIndex] || 'white'  }}>
                      {letter}
                    </span>
                  ))}{" "}
                </span>
              );
            })}
            </p></div> 
            <section className="layout">
            <div className="inp">
              <input type="text" value={input} onChange={handleChange} onKeyDown={(e) => { if (e.key === ' ') handleSpacePress(e); }} autoFocus/>
            </div>
                  <div>
                    <button className="refresh" onClick={() => window.location.reload()}>
                      <RefreshIcon fontSize="large"/>
                    </button>
                  </div>
                  <div>
                    <h2 className="timer">{timeLeft}</h2>
                  </div>
                </section>
            </div>
    </div>
  );
  
}


export default InputArea;




