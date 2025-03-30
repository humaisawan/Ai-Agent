const app = require('../app')


const startServer = () => {
    const server = app.listen(process.env.PORT, ()=>{
        if (process.env.NODE_ENV === "development") {
            console.log(
              `Server is running in Development mode on Port : ${process.env.PORT}`
            );
          } else if (process.env.NODE_ENV === "production") {
            console.log(
              `Server is running in Production mode on Port : ${process.env.PORT}`
            );
          }
    })

    
    return server
}





module.exports = startServer