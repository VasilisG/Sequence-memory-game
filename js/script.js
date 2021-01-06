$(function(){

    gameStarted = false;
    canClick = false;
    score = 0;
    tileNumber = 1;
    currentIndex = 0;
    seq = [];

    $('.grid-box').on('click', function(){
        if(gameStarted && canClick && tileNumber <= 25){
            id = $(this).attr('id').split('-')[1];
            if(id == seq[currentIndex]){
                $(this).addClass('active-grid-box');
                $('.tone')[0].currentTime = 0;
                $('.tone')[0].play();

                if(currentIndex == tileNumber-1){
                    setTimeout(function(){
                        score++;
                        $('.game-status').text('Score: ' + score);
                        $('.grid-box').removeClass('active-grid-box');
                        tileNumber++;
                        currentIndex = 0;
                        canClick = false;
                        playSequence(seq, tileNumber);
                    }, 300);
                }
                else currentIndex++;
            }
            else {
                $('.tone')[1].play();
                $(this).addClass('wrong-grid-box');
                $('#play-again').removeClass('button-disabled');
                canClick = false;
            }
        }
    });

    $('#start-game').on('click', function(){
        if(!gameStarted){
            $(this).addClass('button-disabled');
            startGame();
        }
    });

    $('#play-again').on('click', function(){
        $('.grid-box').removeClass('active-grid-box');
        $('.grid-box').removeClass('wrong-grid-box');
        $('.game-status').text('Score: 0');
        $(this).addClass('button-disabled');
        resetGame();
        startGame();
    });

    function startGame() {
        seq = createRandomSequence();
        playSequence(seq, tileNumber);
        gameStarted = true;
        canClick = true;
    }

    function resetGame() {
        gameStarted = false;
        canClick = false;
        score = 0;
        tileNumber = 1;
        currentIndex = 0;
    }

    function createRandomSequence(){
        seq = [];
        while(seq.length < 25){
            sequenceValue = Math.floor(Math.random() * 25) + 1;
            if(seq.indexOf(sequenceValue) === -1){
                seq.push(sequenceValue);
            }
        }
        return seq;
    }
    
    function playSequence(seq, n){
        canClick = false;
        current = 0;
        var seqInterval = setInterval(function(){
            if(current == n){
                $('.grid-box').removeClass('active-grid-box');
                canClick = true;
                clearInterval(seqInterval);
            }
            else{
                $('#box-' + seq[current]).addClass('active-grid-box');
                $('.tone')[0].play();
            }
            current++;
        }, 500);
    }
});