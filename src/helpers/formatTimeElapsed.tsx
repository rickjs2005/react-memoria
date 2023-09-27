export const formatTimeElapsed = (second:number)=>{
    // Converte os segundos para minutos e segundos
    let minute = Math.floor(second / 60);
    second -= (minute * 60);

    // Formata os segundos e minutos como strings
    let secString = `${second < 10 ?  '0' + second : second}`;
    let minString = `${minute < 10 ?  '0' + minute : minute}`;

    // Retorna a string formatada no formato "mm:ss"
    return `${minString} : ${secString}`;
}
