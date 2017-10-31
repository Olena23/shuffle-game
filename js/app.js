window.onload = function () {
  var openedList = [];
  var guessed = 0;
  var timer = 0;
  var movesNum = document.getElementsByClassName('moves')[0];
  var restart = document.getElementsByClassName('restart')[0];
  var displayedTime = document.getElementById('displayedTime');
  var popUp = document.getElementsByClassName('b-popup')[0];
  var popUpmoves = document.getElementById('popUpmoves');
  var gameSeconds = document.getElementById('gameSeconds');
  var leave = document.getElementById('leave');
  var popUpReplay = document.getElementById('replay');
  var numberOfMoves = 0;
  var lis = Array.prototype.slice.call(document.getElementsByClassName('card'));
  var stars = Array.prototype.slice.call(document.getElementsByClassName('fa fa-star'));
  var box = document.getElementsByClassName("deck")[0];
  box.innerHTML = "";
  lis = shuffle(lis);
  for (let i = 0; i < lis.length; i++){
    lis[i].addEventListener("click",check);
    box.appendChild(lis[i])
  }

  function timerCounter(){
    timer+=1;
    displayedTime.innerHTML = timer;
  }

  setInterval(timerCounter, 1000);

  function replay() {
    openedList = [];
    guessed = 0;
    timer = 0;
    movesNum.innerHTML = "0";
    numberOfMoves = 0;
    var lis2 = Array.prototype.slice.call(document.getElementsByClassName('card'));
    lis2.forEach(function (el) {
      el.className = "card"
    });
    box.innerHTML = "";
    lis2 = shuffle(lis2);
    for (let i = 0; i < lis2.length; i++){
      lis2[i].addEventListener("click",check);
      box.appendChild(lis2[i])
    }
    stars.forEach(function (el) {
      el.className = 'fa fa-star'
    })
  }

  restart.addEventListener("click", replay);

//popUp buttons
  leave.addEventListener("click", function () {
    popUp.style.display = 'none';
  });

  popUpReplay.addEventListener("click", function () {
    popUp.style.display = 'none';
    replay()
  });

  function check(){
    if((this.className === 'card match') || (this.className === 'card open show')){
    } else {
      this.className = 'card open show';
      openedList.push(this);
      setTimeout(isMatch, 1000)
    }
  }

  function isMatch() {
    if (openedList.length === 2) {
      if (openedList[0].firstElementChild.className === openedList[1].firstElementChild.className) {
        openedList[0].className = "card match";
        openedList[1].className = "card match";
        guessed += 2;
      } else {
        openedList[0].className = "card";
        openedList[1].className = "card";
      }
      openedList = [];
    } else if (openedList.length > 2){
      openedList.forEach(function (el) {
        el.className = 'card'
      })
      openedList = [];
    }
    numberOfMoves += 1;
    starHandler()
    if (numberOfMoves%2 === 0) {
      movesNum.innerHTML = numberOfMoves / 2;
      isWin();
    }
  }

  function isWin() {
    if(guessed===16){
      popUpmoves.innerHTML = movesNum.innerHTML;
      gameSeconds.innerHTML = timer;
      popUp.style.display = 'block';
    }
  }

  function starHandler() {
    console.log(stars)
    if(numberOfMoves > 40){
      stars[0].className = ''
    } else if (numberOfMoves > 30) {
      stars[1].className = ''
    } else if (numberOfMoves > 18) {
      stars[2].className = ''
    }
  }


  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

};
