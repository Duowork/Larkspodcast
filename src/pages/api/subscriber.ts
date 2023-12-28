// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const serverRes = await fetch("https://api.mailjet.com/v3/REST/contact", {
      method: req.method,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Authorization": req.headers.authorization as string,
      },
      body: JSON.stringify(req.body),
    });


    if (serverRes.status ===201) {
      res.status(serverRes.status).json({
        data: {
          status: serverRes.status,
          statusText: serverRes.statusText,
        },
      });
    }

    if (serverRes.status !== 201) {
      res.status(serverRes.status).json({
        data: {
          status: serverRes.status,
          statusText: serverRes.statusText,
        },
      });
    }

  } catch (error) {
    res.json({ error });
  }
}
