"use strict"

const diccionario = {
    "0": "habitants",
    "1": "continent",
    "2": "costa",
    "3": "AAAAA",
    "4": "inicial"
}

$(document).ready(()=>{

    function generateRandomNum(){
        let inicio = 0;
        let fin = 6;
        return inicio + Math.floor(Math.random()*fin);
    }

    var enteroAleatorio = generateRandomNum();
    var nTry = 0;
    const hints = $(".hints");
    
    $('.hints').hide();
    $('#hint0').show();
    $("#pregunta"+nTry).text(auxiliar["Preguntas"][nTry] + auxiliar[enteroAleatorio][diccionario[nTry]]);

    function correctAnswer(){
        alert("a");
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
        if(answer ==auxiliar[enteroAleatorio]['country'] || answer == auxiliar[enteroAleatorio]['country'].toLowerCase()){
            correctAnswer(nTry);
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

});

