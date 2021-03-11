const express = require('express');
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

app.post("/", (request, response) => {
    const { cpf, name } = request.body;

    const customersAlreadyExists = customers.some((customer) => customer.cpf === cpf);

    if(customersAlreadyExists){
        return response.status(400).json({error: "Customer already Exists!"});
    }

    const id = uuidv4();

    customers.push({
        cpf,
        name,
        id,
        statement: []
    });

    return response.status(201).send(customers);
});

app.listen(3333);