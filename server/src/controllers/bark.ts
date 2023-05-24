import { Request, Response } from "express";

type Bark = {
  content: string;
  likes: number;
  comments: string[];
};

const sampleBark: Bark = {
  content: "Hello world",
  likes: 0,
  comments: ["Hello", "World"],
};

const barkProperties = Object.keys({} as Bark);

function validateBark(bark: unknown): bark is Bark {
  if (typeof bark !== "object" || bark === null) {
    return false;
  }

  for (const property of barkProperties) {
    if (property in bark === false) {
      return false;
    }

    if (
      typeof (sampleBark as Record<string, unknown>)[property] !==
      typeof (bark as Record<string, unknown>)[property]
    ) {
      return false;
    }
  }

  return true;
}

function postBark(Req: Request, res: Response) {
  if (Req.body) {
    const bark: Bark = {
      content: Req.body.content,
      likes: Req.body.likes,
      comments: Req.body.comments,
    };

    res.send("Bark posted" + bark);
  }
}
