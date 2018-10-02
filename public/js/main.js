let tablaDeVerdad;
let stateIsResultado = false;
const LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //Letras para la cantidad de entradas

$(document).ready(e => {
    init(); //Iniciar todos los objetos y variables
});

async function init(){// Se inicializa de manera asincrona
    tablaDeVerdad = new tablaDeVerdadView($("#entradas-input").attr("value"),"#input-tabla-verdad"); //Se crea la tabla de verdad

    $("#entradas-input").change(e => {
        $("#entradas-input").removeClass("is-success is-danger"); //Se remueven los estados de los botones
        if($("#entradas-input").val() >= $("#entradas-input").attr("min")
                && $("#entradas-input").val() <= $("#entradas-input").attr("max")){ // Se evalua si el numero bits que se va a trabajar es valido

            $($("#entradas-input").parent()).addClass("is-loading");
            tablaDeVerdad.setNumBits($("#entradas-input").val()); //La cantidad de bits es valida y se le da esa cantidad de bits a la tabla
            $("#entradas-input").addClass("is-success");

        }else{
            $("#entradas-input").addClass("is-danger"); //La cantidad de bits es invalido
        }
    });

    await tablaDeVerdad.createView(); //Se crea la tabla en la interfaz
}

$(".simplificar-btn").click(e => { //Boton del resultado
    asyncInitSimplificacion();
});

async function asyncInitSimplificacion(){// Se hace de manera asincrona
    if(tablaDeVerdad.validate()){ //Se evalua si todos los elementos de la tabla de verdad tienen valor
        if(!stateIsResultado){ //Se evalua si el usuario esta viendo el resultado o no. En este caso NO lo esta viendo
            $(".simplificar-btn").text("Más detalles");
            stateIsResultado = true;
            window.scroll({ //Se va de manera suave hacia la parte superior de la pantalla donde se muestra el resultado
                top: 0, 
                behavior: 'smooth' 
            });
            
            $(".resultado-ly").text("Espere un momento...");
            await simplificarFuncion(tablaDeVerdad.elements); // Se llama a la funcion que simplifica la funcion
        }else{ //El usuario SI esta viendo el resultado
            $(".simplificar-btn").text("Simplificar");
            stateIsResultado = false;
            
            window.scroll({ //Se va de manera suave hacia la seccion donde se muestra el desarrollo del resultado.
                top: $("#detalles-section")[0].getBoundingClientRect().top, 
                behavior: 'smooth' 
            });
        }
    }
}

function bitsToExpresion(bitArray){ //Funcion que convierte un arreglo de Bits a una cadena con formato LATEX
    let exp = "";
    let hasNeg = false; //Variable que almacena si se encontro un bit 0

    for(let i = 0 ; i < bitArray.length ; ++i){ //Por cada bit en el arreglo
        if(bitArray[i] == 0 && !hasNeg){ //Si el bit es 0 y ademas no tiene otro Bit en 0 anteriormente entonces concatena la linea superior (negacion) de la entrada
            exp += "\\overline{"; //Inicializacion de la linea superior en formato LATEX
            hasNeg = true; //Se tiene un 0
        }else if(bitArray[i] == 1 && hasNeg){ //Si el bit es 1 y ademas el bit anterior es 0
            exp += "}"; //Se cierra la negacion de las otras entradas
            hasNeg = false; //No se tiene 0
        }
        if(bitArray != -1){ //Si el bit existe
            exp += LETRAS[i]; //Concatena la entrada en letra (como A para representar la entrada 1)
        }
    }

    if(hasNeg){ //Si el ultimo bit es 0 se cierra la negacion en LATEX
        exp += "}";
    }
    return exp; //regresa la cadena en formato LATEX. Ejemplo A'BCD' la retorna \overline{A}BC\overline{D}
}

function getMinterminos(){ //Esta funcion obtiene los minterminos ingresados por el usuario en la tabla de verdad
    let minter = [];
    for(let i = 0 ; i < tablaDeVerdad.elements.length; ++i){//Por cada elemento en la tabla de verdad
        if(tablaDeVerdad.elements[i].option == OPTION_1){ //Si el resultado del elemento es un bit 1
            minter.push(tablaDeVerdad.elements[i]); //Se añade el elemento a los minterminos
        }
    }
    
    let exp = "";
    for(let i = 0 ; i < minter.length ; ++i){
        exp += bitsToExpresion(minter[i].binaryArray)+(i < minter.length-1?" + ":""); //Se genera una cadena para la interfaz de usuario con los minterminos en formato LATEX
    }

    exp = "}="+exp;
    for(let i = tablaDeVerdad.numBits-1 ; i >= 0  ; --i){   //Esta parte añade el nombre a la funcion canonica a la cadena
        exp = LETRAS[i]+exp;                                //Ejemplo para 4 bits seria f(ABCD) =
    }                                                       //Ejemplo para 6 bits seria f(ABCDEF) =
    exp = "f_{"+exp;

    $("#mintermin-latex").text("$"+exp+"$"); //imprime la expresion canonica en la interfaz
    return minter; //Debuelve los terminos en su expresion canonica como suma de productos
}

function combinarMinterminos(mintClass){
    let arrCombinaciones = mintClass.minterminosAgrup;
    let hasChanges = false;
    let loopIt = 0;

    do{
        console.log("GRUPOS: ",arrCombinaciones);
        hasChanges = false;
        let newCombinada = [];
        for (let i = 0; i < arrCombinaciones.length-1; i++) {
            let grupo = [];
            for (let e = 0; e < arrCombinaciones[i].length; e++) {
                const elG1 = new minterminoStruct(arrCombinaciones[i][e]);
                elG1.println();
                for (let j = 0; j < arrCombinaciones[i+1].length; j++) {
                    const elG2 = new minterminoStruct(arrCombinaciones[i+1][j]);
                }
            }
            newCombinada.push(grupo);
        }
        if(hasChanges){
            arrCombinaciones = newCombinada;
        }

        let num = 0;
        arrCombinaciones.forEach(els => {
            console.log(num,"-",num+1,els);
            num++;
        });
    }while(hasChanges);
}

function countDiferencias(arr, arr2){
    let cont = 0;
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] != arr2[i] && arr[i] != 2 && arr2[i] != 2){
            cont++;
            index = i;
        }
    }
    return [cont, index];
}

function simplificarFuncion(els){ //Funcion que miniza la expresion
    $(".simplificar-btn").attr("disabled","");
    let mint = getMinterminos(); //Se obtienen los minterminos
    let mintClass = new tablaMinterminos(mint); //Se crea un objeto que agrupa los minterminos por la cantidad de Bits 1 que contienen
    mintClass.createView("#mintermin-table"); //Se crea la tabla de la agrupacion anterior para mostrarlo en el desarrollo en la intergaz de usuario
    let res = combinarMinterminos(mintClass);
    updateLatex(); //Se actualizan las cadenas en formato LATEX
    $(".simplificar-btn").removeAttr("disabled");
}

function updateLatex(){ //Funcion que actualiza todas las cadenas en LATEX
    let math = document.getElementById("MathExample");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);
}

function intToBinario(num, numBits){ //Funcion que convierte un entero a un arreglo de Bits con determinado tamaño de bits
    let bin = [];

    while(num > 0 && numBits > 0){ //Mientras el numero sea mayor que 0 y aun haya bits disponibles
        bin.push(num%2); //Se agrega el bit al arreglo
        num = Math.floor(num/2); //Se rendondea la divicion hacia su entero correspondiente. Por ejemplo 1.75 a 1 y 3.99 a 3
        numBits --;
    }

    for(let i = 0 ; i < numBits ; ++i){ //Los bits que sobren se rellenan con 0
        bin.push(0);
    }

    return bin.reverse(); //Se invierten los bits para tenerlos en el formato correcto
}