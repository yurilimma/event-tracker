
import style from './Calendario.module.scss';
import ptBR from './localizacao/ptBR.json'
import Kalend, { CalendarEvent, CalendarView, OnEventDragFinish } from 'kalend'
import 'kalend/dist/styles/index.css';
import { useRecoilValue } from 'recoil';
import { listaDeEventosState } from '../../state/atom';
import { useSetRecoilState } from 'recoil'
import { IEvento } from '../../interfaces/IEvento';
import useAtualizarEvento from '../../state/hooks/useAtualizarEvento';


interface IKalendEvento {
  id?: number
  startAt: string
  endAt: string
  summary: string
  color: string
}

const Calendario: React.FC = () => {

  const eventos = useRecoilValue(listaDeEventosState)
  const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState)
  const atualizarEvento = useAtualizarEvento();



  const eventosKalend = new Map<string, IKalendEvento[]>();

  eventos.forEach(evento => {
    const chave = evento.inicio.toISOString().slice(0, 10)
    if (!eventosKalend.has(chave)) {
      eventosKalend.set(chave, [])
    }
    eventosKalend.get(chave)?.push({
      id: evento.id,
      startAt: evento.inicio.toISOString(),
      endAt: evento.fim.toISOString(),
      summary: evento.descricao,
      color: 'blue'
    })
  })

  const onEventDragFinish: OnEventDragFinish=(
    kalendEventoInalterado: CalendarEvent,
    kalendEventoAtualizado:CalendarEvent
  ) =>{
    const evento = eventos.find(evento => evento.descricao === kalendEventoAtualizado.summary)
    if(evento){
      const eventoAtualizado = {
        ...evento
      }
      eventoAtualizado.inicio = new Date(kalendEventoAtualizado.startAt)
      eventoAtualizado.fim = new Date(kalendEventoAtualizado.endAt)

      atualizarEvento(eventoAtualizado)

    }
  }

  return (
    <div className={style.Container}>
      <Kalend
        events={Object.fromEntries(eventosKalend)}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.WEEK}
        timeFormat={'24'}
        weekDayStart={'Monday'}
        calendarIDsHidden={['work']}
        language={'customLanguage'}
        customLanguage={ptBR}
        onEventDragFinish={onEventDragFinish}
      />
    </div>
  );
}

export default Calendario

function setState(events: any) {
  throw new Error('Function not implemented.');
}
