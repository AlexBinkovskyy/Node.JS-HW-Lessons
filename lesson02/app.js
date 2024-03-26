import express from "express";
import fs from "fs/promises";

const app = express();
const router = express.Router();

app.use((req, res, next) => {
    console.log("Наше проміжне ПЗ");

    next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/login", async (req, res, next) => {
	try {
		 await fs.appendFile("request.log", `${JSON.stringify(req.body)}\n`);
		 const resp = await fs.readFile("request.log", { encoding: "utf8" });

		//  const resp1 = resp.split("\n").filter(Boolean).map(JSON.parse)
		//  await fs.writeFile("request1.log", `${JSON.stringify(resp1)}\n`);
		
        res.sendStatus(200);
	} catch (error) {
		 console.error(error);
		 res.sendStatus(500);
	}
});

app.get("/contact/:id/:name", (req, res) => {
    res.send(
        `<h1>Contact</h1> Параметр: ${req.params.id} від ${req.params.name} та ${req.query.text}`
    );
    //  console.log(req.params);
    //  console.log(req.query);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/contact", (req, res) => {
    res.send("<h1>Contact page</h1>");
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
