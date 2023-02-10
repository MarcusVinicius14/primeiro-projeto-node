const express = require("express")
const uuid = require("uuid")

const port = 3000
const app = express()
app.use(express.json())

/* -quer params => meusite.com/users?nome=rodolfo&age=28   FILTROS
-route params => /users/2  //BUSCA, DELETAR OU ATUALIZAR ALGO ESPECIFICO 
-body params => { "name":"rodolfo", "age":}

get => buscar informacoes no back-end
post => criar informacao no back end
put/ patch => alterar/atualizar informacoes no back end
delete => deletar informacao no back end

middlewares => interceptador => tem o poder de parar ou alterar dados da requisicao
*/

const users = []

const checkUserId = (request, response, next) => {
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({error: "user not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}

app.get("/users", (request, response) => {

return response.json(users)

})

app.post("/users", (request, response) => {
    const {name, age} = request.body

    const user = {id:uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
    
    })

    app.put("/users/:id",checkUserId, (request, response) => {

        const {name,age} = request.body

        const index = request.userIndex

        const id = request.userId

        const updateUser = {id,name,age} 

        users[index] = updateUser

        return response.json(updateUser)
        
        })

        app.delete("/users/:id",checkUserId, (request, response) => {

            const index = request.userIndex

           
            users.splice(index,1)

            return response.status(204).json()
            
            })
            


/*
            ROUTE PARAMS

app.get("/users/:id", (request, response) => {

    const {id} = request.params

    return response.json({id})
})*/

/* 
                 QUERY PARAMS

    app.get("/users", (request, response) => {
    const {name, age} = request.query   // destructuring assignment
    

    return response.json( {name, age})  // quando a chave e o conteudo for o mesmo pode omitir o valor
}) */

app.listen(port, () =>{
    console.log(`server start on port ${port}`)
}) 