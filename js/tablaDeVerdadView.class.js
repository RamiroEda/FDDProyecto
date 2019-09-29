class tablaDeVerdadView{
    constructor(numBits, containerName){
        this.LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        this.numBits = numBits;
        this.maxSize = Math.pow(2, numBits);
        this.containerName = containerName;
        this.elements = [];
    }

    createHeader(){
        let html = "<thead><tr>";

        for(let i = 0 ; i < this.numBits ; ++i){
            html += "<td>"+this.LETRAS[i]+"</td>";
        }

        html += "<td>f</td>";
        html += "</tr></thead>";
       
        $(this.containerName).html(html);
    }

    createView() {
        $(this.containerName).html("");
        this.elements = [];
        this.createHeader();
        for(let i = 0 ; i < this.maxSize ; ++i){
            let newEl = new tablaDeVerdadItemView(i,{
                numBits: this.numBits
            });
            this.elements.push(newEl);
            $(this.containerName).append(newEl.element);
        }
        $($("#entradas-input").parent()).removeClass("is-loading");
    }

    validate(){
        let valid = true;
        for (let i = 0; i < this.elements.length; i++) {
            if(!this.elements[i].validate()){
                valid = false;
            }
        }

        return valid;
    }

    setNumBits(n){
        this.numBits = n;
        this.maxSize = Math.pow(2, n);
        this.createView();
    }
}