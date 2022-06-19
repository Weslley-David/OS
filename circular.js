time_slices = 0;
str_log = ''
quantum = 20
context_swap = 0
class Processo {
    constructor(nome, execution_time) {
        this.nome = nome;
        this.execution_time = execution_time;
        this.execution_time_log = execution_time;
    }
}

function execute(p){
    p.execution_time = p.execution_time - quantum;//quantum
    console.log(p.nome," - ",p.execution_time);
    p1 = p;
    processos.splice(0, 1);
    time_slices = time_slices + quantum;//quantum
    context_swap = context_swap + 1;//conta a quantidade de troca de contexto
    if(p1.execution_time > 0){
        processos.push(p1)
        return;
    }
    else{
        time_slices = time_slices + p1.execution_time;
        str_log = str_log + `${p1.nome}   : ${time_slices + (context_swap - 1) * 5}         : ${time_slices - p1.execution_time_log  + (context_swap - 1) * 5}\n` //5 igual a troca de contexto
    }
};

processos = new Array();
processos.push(new Processo('P1', 40));
processos.push(new Processo('P2', 20));
processos.push(new Processo('P3', 50));
processos.push(new Processo('P4', 30));

//console.log(processos)
//console.log(processos.length)

i = 0
while (true) {
    execute(processos[0])
    if(processos.length == 0){
        break;
    }
}
console.log(time_slices)
console.log('nome : turnaround : await')
console.log(str_log)
console.log(context_swap)