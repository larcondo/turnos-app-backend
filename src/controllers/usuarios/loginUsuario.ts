import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import userService from '@services/usuarios';
import { UserRecord, TokenPayload } from 'types';
import { generateTokens } from '@utils/usuarios';

const loginUsuario: RequestHandler<
  unknown,
  unknown,
  { email: string, password: string },
  unknown
> = async (req, res) => {
  const { email, password } = req.body;

  try {
    const row = await userService.getByEmail(email) as UserRecord;
    
    if (!row) return res.status(404).send({ message: `El usuario ${email} no existe.` });

    const passValid = await bcrypt.compare(password, row.password);

    if (!passValid) return res.status(403).send({ message: 'La contraseña es incorrecta.' });

    const payload: TokenPayload = { id: row.id, email };
    const token = generateTokens(payload);

    return res.status(200).send({ accessToken: token, email: row.email, nombre: row.nombre });

  } catch(err) {
    console.log(err);
    return res.status(500).send({ message: 'Hubo un error en el login' });
  }
};

export default loginUsuario;