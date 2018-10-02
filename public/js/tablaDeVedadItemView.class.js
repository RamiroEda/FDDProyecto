const OPTION_0 = 0;
const OPTION_1 = 1;
const OPTION_X = 2;
const OPTION_INVALIDO = -1;

class tablaDeVerdadItemView{
    constructor(num, params){
        this.id = num;
        this.params = params;
        this.option = OPTION_INVALIDO;
        this.binaryArray = intToBinario(num, params.numBits);

        this.createView();
    }

    createView(){
        this.element = document.createElement("tr");

        this.bitsLayout = [];
        this.optionNodes = [document.createElement("a"),
                            document.createElement("a"),
                            document.createElement("a")]
        
        this.binaryArray.forEach(bit => {
            let bitText = document.createElement("td");
            $(bitText).text(bit);
            this.bitsLayout.push(bitText);
            this.element.appendChild(bitText);
        });
        
        let buttonTd = document.createElement("td");
        this.optionNodes.forEach(el => {
            buttonTd.appendChild(el);
        });
        this.element.appendChild(buttonTd);

        $(this.optionNodes[0]).click(e => {
            this.setOption(OPTION_0);
        });
        $(this.optionNodes[1]).click(e => {
            this.setOption(OPTION_1);
        });
        $(this.optionNodes[2]).click(e => {
            this.setOption(OPTION_X);
        });

        this.initLayout();
    }

    validate(){
        if(this.option == OPTION_INVALIDO){
            this.optionNodes.forEach(el => {
                $(el).addClass("is-danger");
            });
            return false;
        }else{
            return true;
        }
    }

    removeInvalid(){
        this.optionNodes.forEach(el => {
            $(el).removeClass("is-danger");
        });
    }

    initLayout(){
        this.optionNodes.forEach(el => {
            $(el).addClass("radio-form-out button is-info");
        });
        
        $(this.optionNodes[0]).text("0");
        $(this.optionNodes[1]).text("1");
        $(this.optionNodes[2]).text("X");

        $(this.title).text(this.titleText);
    }

    setOption(index){
        this.removeInvalid();
        this.option = index;
        this.optionNodes.forEach(el => {
            $(el).removeClass("is-success");
        });
        $(this.optionNodes[index]).addClass("is-success");
    }


}