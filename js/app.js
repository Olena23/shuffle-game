window.onload = function () {
  //uinitiating initial values
  var openedList = [];
  var guessed = 0;
  var timer = 0;
  var movesNum = document.getElementsByClassName('moves')[0];
  var restart = document.getElementsByClassName('restart')[0];
  var displayedTime = document.getElementById('displayedTime');
  var starDysplayed = document.getElementById('starDysplayed');
  var popUp = document.getElementsByClassName('b-popup')[0];
  var popUpmoves = document.getElementById('popUpmoves');
  var gameSeconds = document.getElementById('gameSeconds');
  var leave = document.getElementById('leave');
  var popUpReplay = document.getElementById('replay');
  var numberOfMoves = 0;
  var lis = Array.prototype.slice.call(document.getElementsByClassName('card'));
  var stars = Array.prototype.slice.call(document.getElementsByClassName('fa fa-star'));
  var starStatistics = 3;
  var box = document.getElementsByClassName("deck")[0];
  box.innerHTML = "";
  //shuffle and re-add all cards to the page
  lis = shuffle(lis);
  for (let i = 0; i < lis.length; i++){
    lis[i].addEventListener("click",check);
    box.appendChild(lis[i])
  }

//Timer handling
  var refreshIntervalId = setInterval(function () {timerCounter()}, 1000);

  function timerCounter(){
    timer+=1;
    displayedTime.innerHTML = timer;
  }
  function stopTimer() {
    clearInterval(refreshIntervalId)
  }

  //Resetting the game
  function replay() {
    openedList = [];
    guessed = 0;
    timer = 0;
    stopTimer();
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
    starStatistics = 3;
    refreshIntervalId = setInterval(function () {timerCounter()}, 1000);
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

  //Checking id the guess was right
  function check(){
    if((this.className === 'card match') || (this.className === 'card open show')){
    } else {
      this.className = 'card open show';
      openedList.push(this);
      setTimeout(isMatch, 1000)
    }
  }

  //Compares two cards in the array
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

  //Checks if ALL cards are guessed
  function isWin() {
    if(guessed===16){
      popUpmoves.innerHTML = movesNum.innerHTML;
      gameSeconds.innerHTML = timer;
      starDysplayed.innerHTML = starStatistics;
      stopTimer();
      popUp.style.display = 'block';
    }
  }

  // Controls the number of star displayed
  function starHandler() {
    if (numberOfMoves > 30) {
      stars[1].className = '';
      starStatistics = 1;
    } else if (numberOfMoves > 18) {
      stars[2].className = '';
      starStatistics = 2;
    }
  }

//Shuffles an array
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
