import express from "express";
import { downloadResume } from "../bot/experience";
import Environment from "../config/environment";

export default (env: Environment["experience"]) =>
  express.Router().get("/:id", async (req, res, next) => {
    const id = req.params.id;

    const { data, headers } = await downloadResume(id, env);

    res.writeHead(200, headers);
    data.on("error", next).pipe(res);
  });
