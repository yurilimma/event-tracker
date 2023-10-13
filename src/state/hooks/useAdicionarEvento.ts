import { useSetRecoilState } from "recoil"
import { IEvento } from "../../interfaces/IEvento"
import { listaDeEventosState } from "../atom"
import { obterId } from "../../util"


const useAdicionarEvento = () => {

    const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState)
    return(evento: IEvento) => {
        const hoje = new Date()
        if(evento.inicio < hoje){
            throw Error("Eventos não podem ser cadastrado com data menor do que a atual")
        }

        evento.id = obterId()
        return setListaDeEventos(listaAntiga => [...listaAntiga, evento])
    }
}