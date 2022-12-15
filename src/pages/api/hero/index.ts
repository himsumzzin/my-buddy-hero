import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/utils/server/dbConnect';
import { Hero } from '@/models/index';

type Data = {
  statusCode: number;
  err?: unknown;
  body: {
    success: boolean;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  if (method !== 'POST') return;

  await dbConnect();
  try {
    const hero = new Hero(req.body);
    hero.save();
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
      },
    });
  }
}
