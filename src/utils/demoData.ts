import crypto from 'crypto';
import { TurnRecord, TurnStates, CanchasDisponibles, UserRecord } from '../types';

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

interface DemoUserBasic {
  id: string;
  first_name: string;
  last_name: string;
}

const fakeUsers: Array<DemoUserBasic> = [
  {
    id: "1",
    first_name: "Trey",
    last_name: "Nurny",
  },
  {
    id: "2",
    first_name: "Elaina",
    last_name: "Cushelly",
  },
  {
    id: "3",
    first_name: "Flemming",
    last_name: "Shilstone",
  },
  {
    id: "4",
    first_name: "Merola",
    last_name: "Croad",
  },
  {
    id: "5",
    first_name: "Elysee",
    last_name: "Pontain",
  },
  {
    id: "6",
    first_name: "Celina",
    last_name: "Downes",
  },
  {
    id: "7",
    first_name: "Dannel",
    last_name: "Janway",
  },
  {
    id: "8",
    first_name: "Desmond",
    last_name: "Cregan",
  },
  {
    id: "9",
    first_name: "Ernaline",
    last_name: "Martinyuk",
  },
  {
    id: "10",
    first_name: "Mareah",
    last_name: "Belcham",
  },
  {
    id: "11",
    first_name: "Krispin",
    last_name: "Linke",
  },
  {
    id: "12",
    first_name: "Lilah",
    last_name: "Hachette",
  },
  {
    id: "13",
    first_name: "Sterne",
    last_name: "Casley",
  },
  {
    id: "14",
    first_name: "Heath",
    last_name: "Coal",
  },
  {
    id: "15",
    first_name: "Lesly",
    last_name: "Befroy",
  }
];

export const generateUsuariosDemo = (basicUsers: DemoUserBasic[] = fakeUsers): UserRecord[] => {
  return basicUsers.map( u => {
    return {
      id: crypto.randomUUID(),
      password: crypto.randomBytes(6).toString('base64url'),
      email: createEmail(u),
      nombre: `${u.first_name} ${u.last_name}`
    };
  });
};

const createEmail = (user: DemoUserBasic): string => {
  const sufix = 'gmail.com';
  const prefix = user.first_name.toLowerCase().charAt(0);

  return `${prefix}.${user.last_name.toLowerCase()}@${sufix}`;
};