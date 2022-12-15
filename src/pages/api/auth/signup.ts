import type { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '@/utils/server/auth';
import dbConnect from '@/utils/server/dbConnect';
import { User } from '@/models/index';

type Data = {
  statusCode: number;
  err?: unknown;
  body: {
    success: boolean;
    message?: string;
  };
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method } = req;
  if (method !== 'POST') return;
  await dbConnect();

  try {
    const existingUser = await User.findOne({ id: req.body.id }).exec();
    if (existingUser) {
      console.log('existingUser : ', existingUser);
      return res.status(422).json({
        statusCode: 422,
        body: {
          success: false,
          message: '이미 있는 아이디입니다.',
        },
      });
    }

    const hashedPassword = await hashPassword(req.body.password);
    const user = new User({ ...req.body, password: hashedPassword });
    user.save();

    return res.status(201).json({
      statusCode: 201,
      body: {
        success: true,
        message: '회원가입 성공',
      },
    });
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      err,
      body: {
        success: false,
        message: '회원가입 실패',
      },
    });
  }
}

export default handler;
