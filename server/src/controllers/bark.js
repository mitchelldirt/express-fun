"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sampleBark = {
    content: "Hello world",
    likes: 0,
    comments: ["Hello", "World"],
};
const barkProperties = Object.keys({});
function validateBark(bark) {
    if (typeof bark !== "object" || bark === null) {
        return false;
    }
    for (const property of barkProperties) {
        if (property in bark === false) {
            return false;
        }
        if (typeof sampleBark[property] !==
            typeof bark[property]) {
            return false;
        }
    }
    return true;
}
function postBark(Req, res) {
    if (Req.body) {
        const bark = {
            content: Req.body.content,
            likes: Req.body.likes,
            comments: Req.body.comments,
        };
        res.send("Bark posted" + bark);
    }
}
