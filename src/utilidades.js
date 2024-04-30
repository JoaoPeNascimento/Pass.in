

export function salvarLocalStorage(chave, informação, quantidadeProduto){
    localStorage.setItem(chave, JSON.stringify(informação));
}
export function lerLocalStorage(chave){
    return JSON.parse(localStorage.getItem(chave));
}
export function apagarDoLocalStorage(chave){
    localStorage.removeItem(chave);
}