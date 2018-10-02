class minterminoStruct{
    constructor(bin){
        this.bin = bin;
        this.sinComplementar = this.getSinComplementar(bin);
        this.complementados = this.getComplementados(bin);
    }

    getSinComplementar(bin){
        let newBin = [];
        for (let i = 0; i < bin.length; i++) {
            if(bin[i] == 1){
                newBin.push(1);
            }else{
                newBin.push(0);
            }
        }
        return newBin;
    }

    getComplementados(bin){
        let newBin = [];
        for (let i = 0; i < bin.length; i++) {
            if(bin[i] == 0){
                newBin.push(1);
            }else{
                newBin.push(0);
            }
        }
        return newBin;
    }

    copy(sin, com){
        this.sinComplementar = sin;
        this.complementados = com;
    }

    sonCombinables(min2){
        let newSin = [];
        let newCom = [];

        for (let i = 0; i < this.sinComplementar.length; i++) {
            if(this.sinComplementar[i] == min2.sinComplementar[i]){
                newSin.push(0);
            }else{
                newSin.push(1);
            }
        }

        for (let i = 0; i < this.complementados.length; i++) {
            if(this.complementados[i] == min2.complementados[i]){
                newCom.push(0);
            }else{
                newCom.push(1);
            }
        }


        
        return newStruct;
    }

    AND(min2){

    }

    println(){
        console.log("STRUCT",this.sinComplementar, this.complementados);
    }
}