import type { NextApiRequest, NextApiResponse } from 'next';
import { hashPassword } from '@/utils/server/auth';
import dbConnect from '@/utils/server/dbConnect';
import { User } from '@/models/index';

type Data = {
  statusCode: number;
  err?: unknown;
  body: {
    success: boolean;
    type?: string;
  };
};

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { method } = req;
  if (method !== 'POST') return;
  await dbConnect();

  try {
    const existingUser = await User.findOne({ id: req.body.id }).exec();
    if (existingUser) {
      return res.status(422).json({
        statusCode: 422,
        body: {
          success: false,
          type: 'id-duplication',
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
      },
    });
  } catch (err) {
    return res.status(500).json({
      statusCode: 500,
      err,
      body: {
        success: false,
        type: 'signup-fail',
      },
    });
  }
}

export default handler;
