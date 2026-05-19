import { Hono } from "hono"

const os = new Hono()

os.get("/", (c) => c.json({ message: "OS root" }))
os.get("/status", (c) => c.json({ ok: true }))

export default os
