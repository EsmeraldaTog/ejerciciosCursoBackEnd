const fs = require('fs')

class Contenedor{
    constructor(file){
        this.file= file
    }


/* Metodo para  Escribir en el archivo*/
async escribirArchivo(file, contenido) {
try {
      await fs.promises.writeFile(file,JSON.stringify(contenido, null, 2),"utf-8");
} catch (error) {
      console.log(error.message);
}
}
/* Metodo para  Leer el archivo*/
async leerArchivo(file) {
try {
      const data = await fs.promises.readFile(file ,"utf-8");
      return JSON.parse(data);
} catch (error) {
      console.log(error.message);
}
}

saberSiExiste(file) {
try {
      if (!fs.existsSync(file)) {
            throw new Error("El file no se encontro!!");
      } else {
            return true;
      }
} 
catch (error) {
      console.log(error.message);
}
}


async save(producto) {
try {
      /*Primero verifica si existe el file, si no exite crea uno nuevo */
      if (!this.saberSiExiste(this.file)) {
         console.log(`No se encontro el file ${this.file}\n creando file `);
           //crea arreglo
            let productos = [];
            /*al ser el primer propducto se le da la id 1 */
            producto["id"] = 1;
          productos.push(producto);
            console.log("se esta agregando el producto");
            /* se escribe el file*/
            await this.escribirArchivo(this.file,productos);
            console.log( `Se agrego un nuevo producto con la id ${producto["id"]}`);
            return producto["id"];
    } 
      else {
            /*Si el archivo existe  primero se verifica si esta vacio*/
            if (this.leerArchivo(this.file)) {
                  const data = await this.leerArchivo(this.file);
                  if (data.length === 0) {
                        /*si esta vacio  se le asigna la id 1 al primer producto*/
                        producto["id"] = 1;
                  } 
                  else {
                        /*Si tiene producto se le asigna la id siguente */
                        let ultimoId = data[data.length - 1].id;
                        producto["id"] = ultimoId + 1;
                  }
                data.push(producto);
              console.log("Agregando producto");
                  /*se escribe el producto */
                  await this.escribirArchivo(this.file, data);
                  console.log(`Se agrego un nuevo producto con la id ${producto["id"]}`
                  );
                  return producto["id"];
            }
      }
} 
catch (error) {
      console.log(error.message);
}
}

async getById(id) {
try {
    
      if (this.saberSiExiste(this.file)) {
            const data = await this.leerArchivo(this.file);
            /*  buscar el producto con la id ingresada */
            const dataId = data.filter(item => item.id === id);
            if (dataId.length === 0) {
                  /* si no existe se lanza un error */
                  throw new Error("No se encontro el ID");
            } else {
                  console.log(`El producto con la id ${id} :\n`,dataId);
                  return dataId;
            }
      }
} catch (error) {
      console.log(error.message);
}
}

async getAll() {
try {
     
      if (this.saberSiExiste(this.file)) {
            console.log(" leyendo el archivo");
            const data = await this.leerArchivo(this.file);
            
            if (data.length !== 0) {
                //   console.log(`Contenido del archivo ${this.file} :\n`, data);
                return data
            }
             else {
                  /*si esta vacio se lanza un error */
                  throw new Error(`el archivo ${this.file} esta vacio`);
            }
      }
} 
catch (error) {
      console.log(error.message);
}
}
/* deleteById para eliminar un producto por la id*/
async deleteById(id) {
try {
      /*Primero verifica si existe el archivo, */
      if (this.saberSiExiste(this.file)) {
            console.log(`se esta buscando el producto con la id ${id}`);
            const data = await this.leerArchivo(this.file);
            /* se verifica que la id exista */
            if (data.some((item) => item.id === id)) {
                  const data = await this.leerArchivo(this.file);
                  /*se elima el producto */
                  const datos = data.filter(item => item.id !== id);
                  this.escribirArchivo(this.file, datos);
                  console.log( `se borro el producto con la id ${id}`);
            } else {
                  /*Si la id no existe se lanza un error */
                  throw new Error(
                        `no se encontro el producto con la id ${id}`
                  );
            }
      }
} catch (error) {
      console.log(error.message);
}
}
/*Metodo deleteAll para eliminar todos los  productos */
async deleteAll() {
try {
      /*Primero verifica si existe el archivo, */
      if (this.saberSiExiste(this.file)) {
            console.log("se esta procediendo a borrar los datos");
            /*Para eliminar se escribe un objeto vacio */
            let nuevo = [];
            await this.escribirArchivo(this.file, nuevo);
            console.log(`se borraron todos los datos de el archivo ${this.file}`);
      }
} catch (error) {
      console.log(error.message);
}
}
}
module.exports = Contenedor;