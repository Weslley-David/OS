const input = require('prompt-sync')();
time_slices = 0;
str_log = '';
med_turnaround = 0;
med_await = 0
num_processos = 0;
//quantum = 20;
const quantum = Number(input('quantum: '));
const context_swap_time = Number(input('troca de contexto: '));
context_swap = 0;

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
        med_turnaround = med_turnaround + time_slices + (context_swap - 1) * context_swap_time;
        med_await = med_await + time_slices - p1.execution_time_log  + (context_swap - 1) * context_swap_time;
        str_log = str_log + `${p1.nome}   : ${time_slices + (context_swap - 1) * context_swap_time}         : ${time_slices - p1.execution_time_log  + (context_swap - 1) * context_swap_time}\n` //5 igual a troca de contexto
    }
};

processos = new Array();

while(true){
    process_name = input('nome do processo: ')
    process_execution_time = Number(input('tempo de execução: '))
    processos.push(new Processo(process_name, process_execution_time));
    continue_insert = input('continue? (s/n)')
    if(continue_insert != 's' && continue_insert != 'S'){
        break;
    }
}

/*
processos.push(new Processo('P1', 40));
processos.push(new Processo('P2', 20));
processos.push(new Processo('P3', 50));
processos.push(new Processo('P4', 30));
*/
//console.log(processos)
//console.log(processos.length)
num_processos = processos.length

while (true) {
    execute(processos[0])
    if(processos.length == 0){
        break;
    }
}
console.log(time_slices)
console.log('nome : turnaround : await')
console.log(str_log)
console.log('media Turn Around: ',med_turnaround/num_processos)
console.log('media Await: ',med_await/num_processos)