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
                newBin.push(OPTION_1);
            }else{
                newBin.push(OPTION_0);
            }
        }
        return newBin;
    }

    getComplementados(bin){
        let newBin = [];
        for (let i = 0; i < bin.length; i++) {
            if(bin[i] == 0){
                newBin.push(OPTION_1);
            }else{
                newBin.push(OPTION_0);
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
                newSin.push(OPTION_0);
            }else{
                newSin.push(OPTION_1);
            }
        }

        for (let i = 0; i < this.complementados.length; i++) {
            if(this.complementados[i] == min2.complementados[i]){
                newCom.push(OPTION_0);
            }else{
                newCom.push(OPTION_1);
            }
        }
   
        return this.equals(newSin, newCom) && this.countUnos(newSin) == 1;
    }

    countUnos(arr){
        let tmp = 0;
        arr.forEach(el => {
            if(el == 1) tmp++;
        });
        return tmp;
    }

    equals(arr1,arr2){
        for (let i = 0; i < arr1.length; i++) {
            if(arr1[i] != arr2[i]) return false;
        }
        return true;
    }

    AND(min2){
        let newCom = [];

        console.log();

        for (let i = 0; i < this.complementados.length; i++) {
            if(this.bin[i] != OPTION_X){
                if(this.complementados[i] != min2.complementados[i]){
                    newCom.push(OPTION_X);
                }else{
                    newCom.push(this.sinComplementar[i]);
                }
            }else{
                newCom.push(OPTION_X);
            }
        }

        return newCom;
    }

    println(){
        console.log("STRUCT",this.sinComplementar, this.complementados);
    }
}