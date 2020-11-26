import React, {useState, useEffect} from 'react';
// import {Link} from 'react-router-dom';
import Axios from 'axios'
import M from 'materialize-css';
import correct from '../audio/success-sound-effect.mp3'
import wrongSound from '../audio/losing-bell-game-show-sound.mp3'
import '../index.css'


 

const Round3 = (props)=> {
    let [score, setScore] = useState(0);
    let [isEnd, setisEnd] = useState(false) 
    let [currQuestion , setCurrQuestion]= useState(0)
    let [diff, setDiff]= useState( "easy")
      
     let degrees = ['easy', 'medium', 'hard']
let url2= `https://opentdb.com/api.php?amount=10&category=23&difficulty=${diff}&type=multiple`
let url1 =`https://opentdb.com/api.php?amount=10&category=27&difficulty=${diff}&type=multiple`
let url3 = `https://opentdb.com/api.php?amount=10&category=20&difficulty=${diff}&type=multiple`
let GeoUrl = `https://opentdb.com/api.php?amount=10&category=22&difficulty=${diff}&type=multiple`
let SNurl = `https://opentdb.com/api.php?amount=10&category=17&difficulty=${diff}&type=multiple`
let filmUrl = `https://opentdb.com/api.php?amount=10&category=11&difficulty=${diff}&type=multiple`
let musicUrl = `https://opentdb.com/api.php?amount=10&category=12&difficulty=${diff}&type=multiple`
let genUrl = `https://opentdb.com/api.php?amount=10&category=9&difficulty=${diff}&type=multiple`
let mathUrl = `https://opentdb.com/api.php?amount=10&category=19&difficulty=${diff}&type=multiple`
let comUrl = `https://opentdb.com/api.php?amount=10&category=18&difficulty=${diff}&type=multiple`
//SET THE URL
let [url, setUrl]= useState(null)
console.log("URL", url)   

 
const next = ()=> {
    if(currQuestion !== q.length-1){
     setCurrQuestion(currQuestion +1)
    }
     else{
     setisEnd(true)
   }
 }
 const gameOver =()=> {
     setisEnd(true)
 }
   
 const back =(e)=> {
     setUrl(null)
     setisEnd(false)
     setCurrQuestion(0)
 }

   const nextRound = ()=>{
       setisEnd(false)
       setCurrQuestion(0)
       if (diff === 'easy'){
           setDiff('medium')
       }
       else if (diff === 'medium'){
           setDiff('hard')
       }
       else{
           console.log('You have completed this round!')
       }
   }



    
    
    const submitD = (e)=> {
        e.preventDefault()
        setDiff(  e.target.value)
        console.log("DIFF from function", diff)
    }
    const [q,setQ]= useState( [])

    const check = (option)=> {
     
   
        if (option === q[currQuestion].correct_answer){
          console.log ("CORRECTAMUNDO !!")
           setScore( score +=1)
           M.toast({
            html: "Correct!",
            classes :'correct',
            duration: 1500
          })
          document.getElementById('correct').play()
           next()
            
        }
        else{
          console.log("WRONG!")
          M.toast({
            html: "Wrong!",
            classes: 'wrong'
          })
          document.getElementById('wrongSound').play()
      
       
      }
      }

 

     useEffect(()=> {
         setCurrQuestion(0)
        Axios.get(url)
        .then(res=> setQ(res.data.results))
        .catch(err => {
            console.log(err)
        })


    }, [diff, url])
    console.log(q)

 
    // if(url === null) return <div>Choose a Category</div>
    if(!q[currQuestion]) return <div className = 'categories'>
        <h1 className = 'header'>Welcome to the Trivia App!</h1>
        
        
        <p className = 'category' onClick ={()=> setUrl(genUrl) }>General Knowledge</p>

        <p className = 'category' onClick ={()=> setUrl(url2) }>History</p>
        <p className = 'category' onClick = {()=> setUrl(mathUrl)}>Mathematics</p>
        <p className = 'category' onClick = {()=> setUrl(comUrl)}>Computers</p>


        <p className = 'category' onClick = {()=> setUrl(url1)}>Animals</p>
        <p className = 'category' onClick = {()=> setUrl(url3)}>Mythology</p>
        <p className = 'category' onClick = {()=> setUrl(GeoUrl)}>Geography</p>
        <p className = 'category' onClick = {()=> setUrl(SNurl)}>Science and Nature</p>
        <p className = 'category' onClick = {()=> setUrl(filmUrl)}>Film</p>
        <p className = 'category' onClick = {()=> setUrl(musicUrl)}>Music</p>


        
 
        
        
        </div>
    let stuff = Array.from(q[currQuestion].incorrect_answers)
    stuff.push(q[currQuestion].correct_answer)
    const shuffle = (arr)=> {
        let curId = arr.length;
        while(0 !== curId){
            let randId = Math.floor(Math.random()* curId);
            curId -=1
            let tmp = arr[curId];
            arr[curId]= arr[randId]
            arr[randId]= tmp
        }
        return arr;
  
    }
   
    let answers = shuffle(stuff)

    if(isEnd){
        return(
            <div className = 'game-over-div'>
                <h1 className = 'game-over'>Game Over</h1>
                <h3 className = 'score'> You Scored {score} points!</h3>
                <button className = 'option'onClick = {()=> back()}>Try Again</button>
                <button className = "option"onClick= {()=>setCurrQuestion(null)}>Back to Categories</button>

               {diff !=='hard' &&  (
                   
                      
                   <button className = 'next' onClick = {nextRound}>Next Round ?</button>
                     
                  )}
             </div>
        )
    }
    
    
    
   else return(

<div>
<div>
           <button className = "category"onClick= {()=>setCurrQuestion(null)}>Back to Categories</button>

        <form type="submit" onSubmit={submitD}
         className ='dropdown'
        
        >
          <label htmlFor="set difficulty">
            Set Difficulty
            <select
              id="type"
              value={diff}
              onChange={e => setDiff(e.target.value)}
              onBlur={submitD}
            >
               {degrees.map(degree => (
                <option key={degree} value={degree}>
                  {degree}
                </option>
              ))}
            </select>
          </label>
         </form>
  
         
   
       



  </div>

  <div className = 'game-div'> 
  <h3 className= "score">Score:{score}</h3>
   <audio id = 'audio' src = {wrongSound}id = "wrongSound"></audio>
      <audio id = 'audio'   src = {correct}id = "correct"></audio>


      <div className = 'q-div'> 
     <h2 className = 'question'>{q[currQuestion].question}</h2>
     </div>
      {answers.map(e=> {
          return(
              <div className = 'options'>
                  <p className = 'option' onClick = {()=>check(e)}>{e}</p>

                  </div>
          )

      })}
      
      <div className = 'button-div'>
          
          <button onClick ={next}>Next</button>
          </div>
           
  
          {currQuestion === q.length -1 && (
            <button className = 'finish-him' onClick={gameOver}>Finish</button>
          )}
        </div>


</div>


 



)

}
export default Round3