import crypto from 'crypto';
import { TurnRecord, TurnStates, CanchasDisponibles } from '../types';

export const generateTurnosDemo = (fecha: string, cancha: string): TurnRecord[] | Error => {
  const isCanchaValid = Object.values(CanchasDisponibles).includes(cancha as CanchasDisponibles);

  if (!isCanchaValid) throw new Error(`El parámetro cancha='${cancha}' no es válido.`, { cause: 'invalidCancha' });

  return [
    { id: crypto.randomUUID(), cancha: cancha, fecha, inicio: '14:00', fin: '15:00', estado: TurnStates.Disponible, solicitadoPor: null, confirmadoPor: null  },
    { id: crypto.randomUUID(), cancha: cancha, fecha, inicio: '13:00', fin: '14:00', estado: TurnStates.Disponible, solicitadoPor: null, confirmadoPor: null  },
    { id: crypto.randomUUID(), cancha: cancha, fecha, inicio: '15:00', fin: '16:00', estado: TurnStates.Disponible, solicitadoPor: null, confirmadoPor: null  },
    { id: crypto.randomUUID(), cancha: cancha, fecha, inicio: '16:00', fin: '17:00', estado: TurnStates.Disponible, solicitadoPor: null, confirmadoPor: null  },
    { id: crypto.randomUUID(), cancha: cancha, fecha, inicio: '17:00', fin: '18:00', estado: TurnStates.Disponible, solicitadoPor: null, confirmadoPor: null  },
    { id: crypto.randomUUID(), cancha: cancha, fecha, inicio: '18:00', fin: '19:00', estado: TurnStates.Disponible, solicitadoPor: null, confirmadoPor: null  },
    { id: crypto.randomUUID(), cancha: cancha, fecha, inicio: '19:00', fin: '20:00', estado: TurnStates.Disponible, solicitadoPor: null, confirmadoPor: null  },
    { id: crypto.randomUUID(), cancha: cancha, fecha, inicio: '20:00', fin: '21:00', estado: TurnStates.Disponible, solicitadoPor: null, confirmadoPor: null  },
    { id: crypto.randomUUID(), cancha: cancha, fecha, inicio: '21:00', fin: '22:00', estado: TurnStates.Disponible, solicitadoPor: null, confirmadoPor: null  },
    { id: crypto.randomUUID(), cancha: cancha, fecha, inicio: '22:00', fin: '23:00', estado: TurnStates.Disponible, solicitadoPor: null, confirmadoPor: null  },  
  ];
};