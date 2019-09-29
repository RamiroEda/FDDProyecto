class simplificacionTabla{
    constructor(simpl){
        this.minterminosAgrup = simpl;
    }

    createView(elemName){
        let html = '<table class="table is-bordered">'+
                '<thead>'+
                    '<tr>'+
                        '<th>Grupos</th>'+
                        '<th>Representación binaria</th>'+
                    '</tr>'+
                '</thead>';

        for (let i = 0; i < this.minterminosAgrup.length; i++) {
            if(this.minterminosAgrup[i].arr.length > 0){
                html += "<tr><td>"+this.minterminosAgrup[i].index.join(" - ")+"</td>";
                html += "<td>";
                for (let e = 0; e < this.minterminosAgrup[i].arr.length; e++) {
                    html+= "<p>";
                    for (let j = 0; j < this.minterminosAgrup[i].arr[e].arr.length; j++) {
                        if(this.minterminosAgrup[i].arr[e].arr[j] == OPTION_X){
                            html += "-";
                        }else{
                            html += this.minterminosAgrup[i].arr[e].arr[j];
                        }
                    }
                    html+="</p>";
                }
                html += "</td>";
                html += "</tr>";
            }
        }
    
        html += '</table>';
        $(elemName).html($(elemName).html()+html);
    }
}