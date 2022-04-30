"use strict"

const diccionario = {
    "0": "residents",
    "1": "continent",
    "2": "coast",
    "3": "flag",
    "4": "initial"
}

$(document).ready(()=>{

    var ct = 0;
    var counter = setInterval(function(){
        ct++;
        console.log(ct);
    },1000);

    function generateRandomNum(){
        let inicio = 0;
        let fin = 16;
        return inicio + Math.floor(Math.random()*fin);
    }

    var enteroAleatorio = generateRandomNum();
    var nTry = 0;
    const hints = $(".hints");
    $(".fireworks").hide();
    $("#winHtml").hide();
    $('.hints').hide();
    $('#hint0').show();
    $("#loseHtml").hide();
    $("#pregunta"+nTry).text(auxiliar["Preguntas"][nTry] + auxiliar[enteroAleatorio][diccionario[nTry]]);

    function correctAnswer(){
        $("#texto"+nTry).prop("disabled", true);
        $("#texto"+nTry).css("color", "green");
        $("#texto"+nTry).css("border-bottom", "2px solid green");
        $("#container").html($("#winHtml"));
        $("#winHtml").show();
        $(".fireworks").show();
        clearInterval(counter);
        var puntFinal = scoreCalculation(nTry,counter,true);
        $("#yourScore").html("<h3>Your score is: " + puntFinal+"</h3>");
        $("#countryReveal").html("<h3>The country was "+auxiliar[enteroAleatorio]['country']);
        $("#winHtml button").click(()=>{
            location.reload();
        });
    }
    function incorrectAnswer(){
        $("#texto"+nTry).prop("disabled", true);
        $("#texto"+nTry).css("color", "red");
        $("#texto"+nTry).css("border-bottom", "2px solid red");
        $("#texto"+nTry).addClass("error");
        nTry++;
        $("#hint"+nTry).show();
        
        if(nTry ==2){
            if (auxiliar[enteroAleatorio][diccionario[nTry]] == 0){
                $("#pregunta"+nTry).text(auxiliar["Preguntas"][nTry][0]);
            }else{
                $("#pregunta"+nTry).text(auxiliar["Preguntas"][nTry][1]);
            }
        }else{
            $("#pregunta"+nTry).text(auxiliar["Preguntas"][nTry] + auxiliar[enteroAleatorio][diccionario[nTry]]);
        }
    }

    hints.submit(function(event){
        event.preventDefault();
        let answer = $("#texto"+nTry).val();
        if(nTry == 4){
            $("#container").html($("#loseHtml"));
            $("#loseHtml").show();
            clearInterval(counter);
            var puntFinal = scoreCalculation(nTry,counter,false);
            $("#yourScore").html("<h3>Your score is: " + puntFinal+"</h3>");
            $("#countryReveal").html("<h3>The country was "+auxiliar[enteroAleatorio]['country'])
            $("#loseHtml button").click(()=>{
                location.reload();
            });
        }
        if(answer ==auxiliar[enteroAleatorio]['country'] || answer == auxiliar[enteroAleatorio]['country'].toLowerCase()){
            correctAnswer();
        }else{
            incorrectAnswer();
        }
    });
    
    $(".answer").focus(function(){
        $(this).css("border-bottom", "2px solid #303F9F");
    });
    
    $(".answer").blur(function(){
        $(this).css("border-bottom", "2px solid #BBDEFB");
        if($(".answer").val()<=0){
            $(this).css("border-bottom", "2px solid red");
        }
    });

    

    function scoreCalculation(tries,cont,isCorrect){
        if(isCorrect){
            var varTiempo;
            if (cont < 40) {
                varTiempo = 12;
            } else if(cont < 80) {
                varTiempo = 24;
            } else if(cont < 120) {
                varTiempo = 39;
            } else {
                varTiempo = 67;
            }

            var puntInicial;
        
            switch(tries) {
                case 0:
                    puntInicial = 500;
                    break;
                case 1:
                    puntInicial = 400; 
                    break;
                case 2:
                    puntInicial = 300;
                    break;
                case 3:
                    puntInicial = 200;
                    break;
                case 4:
                    puntInicial = 100;
                    break;
                default:
                    puntInicial = 0; 
                    break;
        }
            return puntInicial - varTiempo;
        }else{
            return 0;
        }
    }

    
});


