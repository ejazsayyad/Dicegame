/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let score,activeplayer,roundscore,limit,playing;

var newgamefunction=()=>{
    score=[0,0];
    activeplayer=0;
    roundscore=0;//score of current round
    limit=20;
    playing=true;

    //starting initialization
    document.getElementById("score-0").textCotent="0";//faster than quesryselecter:))))
    document.getElementById("score-1").textContent="0";
    document.getElementById("current-0").textContent="0";
    document.getElementById("current-1").textContent="0";

    const dice=document.querySelector('.dice').style.display= 'none';// '.' is used to access css property

    document.querySelector("#name-0").textContent="Player 1";
    document.querySelector("#name-1").textContent="Player 2";

    document.querySelector(".player-0-panel").classList.remove("winner");//removing winner class for reset
    document.querySelector(".player-1-panel").classList.remove("winner");

    document.querySelector(".player-0-panel").classList.remove("active");//removing active class
    document.querySelector(".player-1-panel").classList.remove("active");

    document.querySelector(".player-0-panel").classList.add("active");//adding active class //setting active player1



}
newgamefunction();





function roll(current){

    if(playing)
    {
        const di= Math.floor( (Math.random() * 6))  +1;
        //document.querySelector('#current-'+ activeplayer).textContent=di;//it will bo more dynamic as js will covert it into a string
        
        const diceDOM=document.querySelector(".dice");
        diceDOM.style.display='block'; //none block read w3docs
        diceDOM.src='dice-'+ di +'.png';
    
        if(di !== 1)//doesnot do coercion(type casting) rather it checks type
        {
           // console.log(di)
            roundscore = roundscore + di;
            //console.log((roundscore))
            //console.log(document.querySelector("#current-0"));
            document.querySelector('#current-'+ activeplayer).textContent= roundscore;
        }
        else
        {
               changeplayer(); 
        }

    }

   


    
}

const changeplayer= ()=>{//es6
    if(activeplayer===0)
    {
        activeplayer=1;
    }
    else
    {
        activeplayer=0;
    }
    roundscore=0;//resets to 0 as player is changed
    
    //also to change this in ui to zero
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';

    //also to modify who is active we have to change the dot
    //we have to use classlist method and its attributes i.e add remove etc.
    //but there is better way of doing this using toggle it removes it when is present
    //and adds it when absent so ignore 2lines
    //document.querySelector(".player-0-panel").classList.remove('active');
    //document.querySelector(".player-1-panel").classList.add('active');
    document.querySelector(".player-0-panel").classList.toggle('active');
    document.querySelector(".player-1-panel").classList.toggle('active');

    //also for disappearing after transition of players we do
    document.querySelector(".dice").style.display="none";  
}

const hold=()=>{
    if(playing)
    {
        //add to global score
        score[activeplayer]= score[activeplayer]+roundscore;
        //update ui
        document.querySelector("#score-"+ activeplayer).textContent=score[activeplayer];
    

        //now to set the upper limits for deciding winner
        if(score[activeplayer]>=limit)
        {
            document.querySelector("#name-"+ activeplayer).textContent= "Winner!!!";
            document.querySelector(".dice").style.display="none";
            document.querySelector(".player-"+ activeplayer +"-panel").classList.add("winner");
            document.querySelector(".player-"+ activeplayer +"-panel").classList.remove("active");
            playing=false;
        }
        else
        {
            //now remaining code would be same as change till end comment->
            //i have handled it using do not repaet yourself function
            changeplayer(); 
            //end
        }
    }
     
}



const newgame= document.querySelector(".btn-new");
newgame.addEventListener("click",newgamefunction,false);


const rollele=document.querySelector("#roll");
rollele.addEventListener("click",roll,false);


const holdele=document.querySelector("#hold");
holdele.addEventListener("click",hold,false);