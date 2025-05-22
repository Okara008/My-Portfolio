const candidateName = document.getElementById("candidate-name")
const question = document.querySelector("main")
const result = document.querySelector("article")
const errorMessage = document.getElementById("error")
const score = document.getElementById("score")
const total = document.querySelectorAll("li")
const radioBtns = document.querySelectorAll('input[type = radio]')

let A = 0;
let B = 1;
let C = 2;
let D = 3;

let answer = ['Cheat Code', 'c', 'd', 'a', 'a', 'a', 'b', 'a', 'a', 'b', 'c'];
let countScore = 0;
let options = [C, D, A, A, A, B, A, A, B, C]

function submitScore(){
    if (window.confirm("Are you sure you want to submit")) {
        countScore = 0;

        for (let i = 0; i < radioBtns.length; i += 4) {        
            if (radioBtns[i + (options[i/4])].checked) {
                countScore++;
            }
        }
    
        if(candidateName.value.length > 1){
            let scored = countScore;
            window.sessionStorage.setItem("candidateName", candidateName.value);
            window.sessionStorage.setItem("scored", scored);
            window.sessionStorage.setItem("total", total.length);
    
            window.location.href = "view score.html"
    
        }
    
        else{
            errorMessage.textContent = "Please type in your name"
    
            alert("Please type in your name")
            errorMessage.style.display = "inline"
    
            setTimeout(() => {
                errorMessage.style.display = "none"
            }, 5000);
        }    
    }
}