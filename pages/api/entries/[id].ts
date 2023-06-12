import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../database";
import { Entry, IEntry } from "../../../models";

type Data =
  | {
      message: string;
    }
  | IEntry[]
  | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getEntry(req, res);
    case "PUT":
      return updateEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);
    default:
      return res.status(400).json({ message: "Endpoint no existe" });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const entry = await Entry.findById(req.query.id);
  await db.disconnect();

  if (entry) res.status(200).json(entry);
};

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const entry = await Entry.findById(req.query.id);
    if (!entry) return res.status(400).json({ message: "No existe" });
    const updated = await Entry.findByIdAndUpdate(
      req.query.id,
      {
        description: req.body.description ?? entry.description,
        status: req.body.status ?? entry.status,
      },
      { new: true, runValidators: true }
    );
    await db.disconnect();
    return res.status(200).json(updated!);
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(500).json({ message: "Hubo un error" });
  }
};

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const entry = await Entry.findById(req.query.id);
    if (!entry) return res.status(400).json({ message: "No existe" });
    await Entry.findByIdAndDelete(req.query.id);
    await db.disconnect();
    return res.status(200).json({ message: "deleted " });
  } catch (error) {
    console.log(error);
    await db.disconnect();
    return res.status(500).json({ message: "Hubo un error" });
  }
};
