class tablaImplicantes{
    constructor(implicantes){
        this.implicantes = implicantes;
        this.matrizImplicantes = [];
        console.log(implicantes);
    }

    createView(elemName, minterms){
        let minsCol = [];
        for (let i = 0; i < this.implicantes.length; i++) {
            for (let e = 0; e < this.implicantes[i].arr.mintId.length; e++) {
                for (let j = 0; j < minterms.length; j++) {
                    if(this.implicantes[i].arr.mintId[e] == minterms[j].id){
                        if(minterms[j].option != OPTION_X){
                            minsCol.push(minterms[j].id);
                        }
                        break;
                    }
                }   
            }
        }

        for (let i = 0; i < minsCol.length; i++) {
            if(!this.onlyUnique(minsCol[i],i,minsCol)){
                minsCol.splice(i,1);
                i--;
            }
        }

        minsCol.sort((num1,num2) => {
            return num1-num2;
        });

        console.log(minsCol);

        let html = '<table class="table is-bordered">'+
                '<thead>'+
                    '<tr>'+
                        '<th>Minterminos</th>';

        for (let i = 0; i < minsCol.length; i++) {
            html+='<th>'+minsCol[i]+'</th>'
        }     
        
                        html+='<th>Representación binaria</th>'+
                    '</tr>'+
                '</thead>';

        
        for (let i = 0; i < this.implicantes.length; i++) {
            html += '<tr>';
            html += '<td>'+this.implicantes[i].arr.mintId+'</td>';
            let el = [];
            for (let e = 0; e < minsCol.length; e++) {
                let hasImplicante = false;
                html+='<td>';
                for (let j = 0; j < this.implicantes[i].arr.mintId.length; j++) {
                    if (this.implicantes[i].arr.mintId[j] == minsCol[e]) {
                        html+='X';
                        el.push(true);
                        hasImplicante = true;
                        break;
                    }else if(j == this.implicantes[i].arr.mintId.length-1 && !hasImplicante){
                        html+='-';
                        el.push(false);
                    }
                }
                html += '</td>';
            }
            this.matrizImplicantes.push(el);
            html += '<td>'+this.arrayToBin(this.implicantes[i].arr.arr)+'</td>';
            html += '</tr>';
        }

        html += '</table>';
        $(elemName).html($(elemName).html()+html);
    }

    arrayToBin(arr){
        var s = "";
        for (let i = 0; i < arr.length; i++) {
            if(arr[i] == OPTION_X){
                s+="-";
            }else{
                s+=arr[i];
            }
        }
        return s;
    }

    getResultado(){
        let completar = new Array(this.matrizImplicantes[0].length);
        
        for (let i = 0; i < this.matrizImplicantes[0].length; i++) {
            let cambios = 0;
            for (let e = 0; e < this.matrizImplicantes.length; e++) {
                if(this.matrizImplicantes[e][i]){
                    cambios++;
                }
            }
            if(cambios == 1){
                for (let e = 0; e < this.matrizImplicantes.length; e++) {
                    if(this.matrizImplicantes[e][i]){
                        for (let j = 0; j < this.matrizImplicantes[e].length; j++) {
                            if(this.matrizImplicantes[e][j]){
                                completar[j] = e;
                            }
                        }
                        break;
                    }
                }       
            }
        }

        while(this.hasEmpty(completar)){
            const indexEmpty = this.emptyIndex(completar);

            for (let e = 0; e < this.matrizImplicantes.length; e++) {
                if(this.matrizImplicantes[e][indexEmpty]){
                    for (let j = 0; j < this.matrizImplicantes[e].length; j++) {
                        if(this.matrizImplicantes[e][j]){
                            if(completar[j] == undefined){
                                completar[j] = e;
                            }
                        }
                    }
                    break;
                }
            }
        }

        for (let i = 0; i < completar.length; i++) {
            if(!this.onlyUnique(completar[i],i,completar)){
                completar.splice(i,1);
                i--;
            }
        }

        completar.sort((a,b) => {
            return a-b;
        });
        
        let exp = "";
        for(let i = 0 ; i < completar.length ; ++i){
            exp += this.bitsToExp(this.implicantes[completar[i]].arr.arr)+(i < completar.length-1?" + ":""); //Se genera una cadena para la interfaz de usuario con los minterminos en formato LATEX
        }

        exp = "}="+exp;
        for(let i = tablaDeVerdad.numBits-1 ; i >= 0  ; --i){   //Esta parte añade el nombre a la funcion canonica a la cadena
            exp = LETRAS[i]+exp;                                //Ejemplo para 4 bits seria f(ABCD) =
        }                                                       //Ejemplo para 6 bits seria f(ABCDEF) =
        exp = "f_{"+exp;

        return "$"+exp+"$";
    }

    hasEmpty(arr){
        for (let i = 0; i < arr.length; i++) {
            if(arr[i] == undefined){
                return true;
            }
        }
        return false;
    }

    bitsToExp(bitArray){ //Funcion que convierte un arreglo de Bits a una cadena con formato LATEX
        let exp = "";
        let hasNeg = false; //Variable que almacena si se encontro un bit 0
    
        for(let i = 0 ; i < bitArray.length ; ++i){ //Por cada bit en el arreglo
            if(bitArray[i] == OPTION_0 && !hasNeg){ //Si el bit es 0 y ademas no tiene otro Bit en 0 anteriormente entonces concatena la linea superior (negacion) de la entrada
                exp += "\\overline{"; //Inicializacion de la linea superior en formato LATEX
                hasNeg = true; //Se tiene un 0
            }else if(bitArray[i] == OPTION_1 && hasNeg){ //Si el bit es 1 y ademas el bit anterior es 0
                exp += "}"; //Se cierra la negacion de las otras entradas
                hasNeg = false; //No se tiene 0
            }
            if(bitArray != OPTION_INVALIDO && bitArray[i] != OPTION_X){ //Si el bit existe
                exp += LETRAS[i]; //Concatena la entrada en letra (como A para representar la entrada 1)
            }
        }
    
        if(hasNeg){ //Si el ultimo bit es 0 se cierra la negacion en LATEX
            exp += "}";
        }

        console.log(bitArray, exp);

        return exp; //regresa la cadena en formato LATEX. Ejemplo A'BCD' la retorna \overline{A}BC\overline{D}
    }

    emptyIndex(arr){
        for (let i = 0; i < arr.length; i++) {
            if(arr[i] == undefined){
                return i;
            }
        }
        return -1;
    }

    onlyUnique(val, index, arr) { 
        for (let e = index+1; e < arr.length; e++) {
            if(val == arr[e]){
                return false;
            }
        }
    
        return true;
    } 
}