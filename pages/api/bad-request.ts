import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { message = "Bad request" } = req.query;

  res.status(400).json({
    ok: false,
    message,
  });
}
