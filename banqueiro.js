const input = require('prompt-sync')()
loop_counter = 0; //usado para saber quando ocorre um dead lock
class Recursos {
    constructor(dvdrw, plotter, impressora, blueray) {
        //recursos disponíveis
        this.dvdrw = dvdrw;
        this.plotter = plotter;
        this.impressora = impressora;
        this.blueray = blueray;
    }
}

class Processo {
    constructor(nome, dvdrw, plotter, impressora, blueray, dvdrw_necessario, plotter_necessario, impressora_necessario, blueray_necessario) {
        //teste para ver se a alocação prévia é superior ao número de recursos
        if (dvdrw > disponiveis.dvdrw || plotter > disponiveis.plotter || impressora > disponiveis.impressora || blueray > disponiveis.blueray) {
            console.log('recursos indisponíveis para alocação prévia')
            return null;
        }
        //recursos já alocados
        this.nome = nome;
        this.dvdrw = dvdrw;
        disponiveis.dvdrw = disponiveis.dvdrw - dvdrw;
        this.plotter = plotter;
        disponiveis.plotter = disponiveis.plotter - plotter;
        this.impressora = impressora;
        disponiveis.impressora = disponiveis.impressora - impressora;
        this.blueray = blueray;
        disponiveis.blueray = disponiveis.blueray - blueray;

        //recursos necessários
        this.dvdrw_necessario = dvdrw_necessario;
        this.plotter_necessario = plotter_necessario;
        this.impressora_necessario = impressora_necessario;
        this.blueray_necessario = blueray_necessario;
    }

}

disponiveis = new Recursos(4, 2, 3, 1)

processos = new Array();

processos.push(new Processo('P1', 0, 0, 1, 0, 2, 0, 0, 1));//nome do processo | recursos previamente alocados | recursos necessários
processos.push(new Processo('P2', 2, 0, 0, 1, 1, 0, 1, 0));
processos.push(new Processo('P3', 0, 1, 2, 0, 2, 1, 0, 0));

console.log(processos.length)
console.log(disponiveis)

function execute(p) {
    if ((p.dvdrw_necessario <= p.dvdrw + disponiveis.dvdrw) && (p.plotter_necessario <= p.plotter + disponiveis.plotter) && (p.impressora_necessario <= p.impressora + disponiveis.impressora) && (p.blueray_necessario <= p.blueray + disponiveis.blueray)) {
        disponiveis.dvdrw = disponiveis.dvdrw + p.dvdrw;
        disponiveis.plotter = disponiveis.plotter + p.plotter;
        disponiveis.impressora = disponiveis.impressora + p.impressora;
        disponiveis.blueray = disponiveis.blueray + p.blueray;
        console.log('executed ', p.nome)
        processos.splice(0, 1);
        loop_counter = 0
        return;
    } else {
        p1 = p;
        processos.splice(0, 1);
        processos.push(p1);
        //console.log('failed', p.nome)
        loop_counter = loop_counter + 1;
        return;
    }
}

while (true) {
    execute(processos[0])
    if (processos.length == 0) {
        break;
    }
    if (processos.length <= loop_counter) {
        console.log('DEAD LOCK')
        break;
    }
}

console.log(disponiveis)