import express from "express";
import mongoose, { syncIndexes } from "mongoose";

import HtmlTemplate from "./models/htmlTemplateModel.js";

const app = express();

app.use(express.json());

// Routes

app.get("/html_template", async (req, res) => {
    try {
        const htmlTemplates = await HtmlTemplate.find({});
        res.status(200).json(htmlTemplates);
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
})

app.get("/html_template/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const htmlTemplate = await HtmlTemplate.findById(id);
        res.status(200).json(htmlTemplate);
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
})

app.post("/html_template", async (req, res) => {
  try {
    const htmlTemplate = await HtmlTemplate.create(req.body);
    res.status(200).json(htmlTemplate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/html_template/:id", async (req, res) =>{
    try {
        const {id} = req.params;
        const htmlTemplate = await HtmlTemplate.findByIdAndUpdate(id, req.body);
        if (!htmlTemplate) {
            return res.status(404).json({message: "No se encuentra la plantilla con el ID ingresado"})
        }
        const updateHtmlTemplate = await HtmlTemplate.findById(id)
        res.status(200).json(updateHtmlTemplate)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.delete("/html_template/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const htmlTemplate = await HtmlTemplate.findByIdAndDelete(id)
        if (!htmlTemplate) {
            return res.status(404).json({message: "No se encuentra la plantilla con el ID ingresado"})
        }
        res.status(200).json(htmlTemplate)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get("/html_template/mostrar/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const htmlTemplate = await HtmlTemplate.findById(id)
        if (!htmlTemplate) {
            return res.status(404).json({message: "No se encuentra la plantilla con el ID ingresado"})
        }
        res.status(200).send(htmlTemplate.html_code)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})



// Connnection MongoDB

mongoose
  .connect("mongodb://127.0.0.1:27017/local")
  .then(() => {
    console.log("Connected");
    app.listen(3000);
    console.log("Server on port: ", 3000);
  })
  .catch((error) => {
    console.log(error);
  });


