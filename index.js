const express = require("express");
const Contenedor = require("./archivos.js");
/* se instacia la clase*/
const productos = new Contenedor("productos.txt");
/* se inicializa el servidor */
const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => {
      console.log(`Servidor http escuchando en el puerto ${server.address().port}`
      );
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

/*mensaje de pagina principal*/
app.get("/", (req, res) => {
      res.send(
            '<h1 style="color: blue">Bienvenidos al servidor   express</h1>'
      );
});
/*pagina de productos */
app.get("/productos", (req, res) => {
    const ejecutar = async () => {
          /*su usa el medo getAll para traer todos los productos */
          const arrayProductos = await productos.getAll();
      
          res.send(arrayProductos);
    };
    ejecutar();
});



/*pagina de producto random */
app.get("/productoRandom", (req, res) => {
      const random = async () => {
            /* se traen todos los productos */
            const array =  await productos.getAll();
            /* se crea un numero al azar a partir de el length de arrayProductos */
            let numero = Math.floor(
                  Math.random() * (array.length - 1 + 1)
            );
            let productoRandom = [];
            /*el numero creado al hacer se compara con el indice de arrayProductos y ese es el producto a mostrar */
            const listaProductos = array.map(
                  (item, index) => index === numero && productoRandom.push(item)
            );
           
            res.send(productoRandom);
      };
      random();
});