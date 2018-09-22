var tablaDeVerdad;

$(document).ready(e => {
    init();
})

function init(){
    tablaDeVerdad = new tablaDeVerdadView(4,"#input-tabla-verdad");
    $("#entradas-input").change(e => {
        $("#entradas-input").removeClass("is-success is-danger");
        if($("#entradas-input").val() >= 4 && $("#entradas-input").val() <= 7){
            $($("#entradas-input").parent()).addClass("is-loading");
            tablaDeVerdad.setNumBits($("#entradas-input").val());
            $("#entradas-input").addClass("is-success");
        }else{
            $("#entradas-input").addClass("is-danger");
        }
    });
    tablaDeVerdad.createView();
}

$(".simplificar-btn").click(e => {
    window.scroll({
        top: 0, 
        behavior: 'smooth' 
    });
    
    if(tablaDeVerdad.validate()){
        $(".resultado-ly").text("Espere un momento...");
        simplificarFuncion(tablaDeVerdad.elements);
    }
});

function simplificarFuncion(els){
    tablaDeVerdad.createView();
    $(".resultado-ly").text("ABCD+CAD+B'A'");
}

function intToBinario(num, numBits){
    var bin = [];
    var bits = numBits;

    while(num > 0 && bits > 0){
        bin.push(num%2);
        num = Math.floor(num/2)
        bits --;
    }

    for(var i = 0 ; i < bits ; ++i){
        bin.push(0);
    }

    return bin.reverse();
}

function toggleCard(cardHeader){
    if($(".card-header").hasClass("expanded")){
        $($(cardHeader).parent()[0]).animate({
            marginTop: "20px",
            marginBottom: "20px"
        }, 300);
        $($($(cardHeader).parent()[0]).find(".card-content")[0]).animate({
            height: "100%",
            padding: "24px"
        }, 200);
    }else{
        $($(cardHeader).parent()[0]).animate({
            marginTop: "20px",
            marginBottom: "20px"
        }, 300);
        $($($(cardHeader).parent()[0]).find(".card-content")[0]).animate({
            height: "0px",
            padding: "0px"
        }, 200);
    }

    $(".card-header").toggleClass("expanded");
}

class tablaDeVerdadItemView{
    constructor(num, params){
        this.OPTION_0 = 0;
        this.OPTION_1 = 1;
        this.OPTION_X = 2;
        this.OPTION_INVALIDO = -1;

        this.id = num;
        this.params = params;
        this.option = this.OPTION_INVALIDO;
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
            var bitText = document.createElement("td");
            $(bitText).text(bit);
            this.bitsLayout.push(bitText);
            this.element.appendChild(bitText);
        });
        
        var buttonTd = document.createElement("td");
        this.optionNodes.forEach(el => {
            buttonTd.appendChild(el);
        });
        this.element.appendChild(buttonTd);

        $(this.optionNodes[0]).click(e => {
            this.setOption(this.OPTION_0);
        });
        $(this.optionNodes[1]).click(e => {
            this.setOption(this.OPTION_1);
        });
        $(this.optionNodes[2]).click(e => {
            this.setOption(this.OPTION_X);
        });

        this.initLayout();
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
        this.option = index;
        this.optionNodes.forEach(el => {
            $(el).removeClass("is-success");
        });
        $(this.optionNodes[index]).addClass("is-success");
    }


}

class tablaDeVerdadView{
    constructor(numBits, containerName){
        this.LETRAS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        this.numBits = numBits;
        this.maxSize = Math.pow(2, numBits);
        this.containerName = containerName;
        this.elements = [];
    }

    createHeader(){
        var html = "<thead><tr>";

        for(var i = 0 ; i < this.numBits ; ++i){
            html += "<td>"+this.LETRAS[i]+"</td>";
        }

        html += "<td>ESTADO</td>";
        html += "</tr></thead>";
       
        $(this.containerName).html(html);
    }

    createView() {
        $(this.containerName).html("");
        this.elements = [];
        this.createHeader();
        for(var i = 0 ; i < this.maxSize ; ++i){
            var newEl = new tablaDeVerdadItemView(i,{
                numBits: this.numBits
            });
            this.elements.push(newEl);
            $(this.containerName).append(newEl.element);
        }
        $($("#entradas-input").parent()).removeClass("is-loading");
    }

    validate(){
        var error = false;
        this.elements.forEach(els => {
            //console.log(els);
        });

        return !error;
    }

    setNumBits(n){
        this.numBits = n;
        this.maxSize = Math.pow(2, n);
        this.createView();
    }
}