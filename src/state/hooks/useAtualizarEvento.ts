import { IEvento } from "../../interfaces/IEvento"
import { listaDeEventosState } from "../atom"
import { useSetRecoilState } from 'recoil'

const useAtualizarEvento = () => {
    const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState)
    return(evento: IEvento) => {
        return setListaDeEventos(listaAntiga => {
            //pega o indice do elemento a ser alterado
            const indice =  listaAntiga.findIndex(e=> e.id === evento.id)
            //coloca o 'evento' com o valor novo na lista(utilizamos o slice para saber a posição exata do evento que foi alterado)
            return [...listaAntiga.slice(0, indice), evento, ...listaAntiga.slice(indice +1)]
          })
    }

}

export default useAtualizarEvento