class tablaMinterminos{ //Clase para crear un objeto que tenga los minterminos agrupados por su cantidad de 1's
    constructor(mins){ //Se crean las variables del objeto
        this.minterminos = mins;
        this.minterminosAgrup = [];
    }

    createView(elemName){ //Crea una tabla en la interfaz de usuario y agrupa los minterminos
        for (let i = 0; i <= this.minterminos[0].binaryArray.length; i++) { //Para todos la cantidad de Bits disponibles
            let arr = [];
            for (let e = 0; e < this.minterminos.length; e++) {
                if(this.count(this.minterminos[e].binaryArray) == i){
                    arr.push(this.minterminos[e].binaryArray);
                }
            }
            this.minterminosAgrup.push(arr);
        }

        let html = '<table class="table is-bordered">'+
                '<thead>'+
                    '<tr>'+
                        '<th>Cantidad de 1\'s</th>'+
                        '<th>Representación binaria</th>'+
                    '</tr>'+
                '</thead>';

        for (let i = 0; i < this.minterminosAgrup.length; i++) {
            if(this.minterminosAgrup[i].length > 0){
                html += "<tr><td>"+i+"</td>";
                html += "<td>";
                for (let e = 0; e < this.minterminosAgrup[i].length; e++) {
                    html+= "<p>"+this.minterminosAgrup[i][e].join("")+"</p>";
                }
                html += "</td>";
                html += "</tr>";
            }
        }
    
        html += '</table>';

        $(elemName).html(html);
    }

    count(arr){
        let cont = 0;
        for (let i = 0; i < arr.length; i++) {
            if(arr[i] == 1){
                cont++;
            }
        }
        return cont;
    }
}