/**
 * [express description]
 *
 * @param   {[type]}  express  [express description]
 *
 * @return  {[type]}           [return description]
 */
const express = require('express');
const mysql = require('mysql');

const bodyParser = require('body-parser');
// puerto 3000
/**
 * [PORT description]
 *
 * @var {[type]}
 */
const PORT = process.env.PORT || 3000;
/**
 * [aplicacion description]
 *
 * @return  {[type]}  [return description]
 */
const aplicacion = express();
/**
 * [json description]
 *
 * @param   {[type]}  bodyParser  [bodyParser description]
 *
 * @return  {[type]}              [return description]
 */
aplicacion.use(bodyParser.json());

//datos de conexion a la base de datos
/**
 * [createConnection description]
 *
 * @return  {[type]}  [return description]
 */
const connection = mysql.createConnection({
    host: 'db4free.net',
    user: 'desaweb2020',
    password: 'desaweb2020',
    database: 'umg4desaweb'
  });
//ruta principal
/**
 * [aplicacion description]
 *
 * @param   {[type]}  req  [req description]
 * @param   {[type]}  res  [res description]
 *
 * @return  {[type]}       [return description]
 */
aplicacion.get('/', (req, res) => {
    res.send('Mi Primera Rest Api');
  });



/////////////////////////////////PRODUCTOS_FACTURAS/////////////////////////////////////////////////
/////////////////////////////////PRODUCTOS_FACTURAS/////////////////////////////////////////////////
/////////////////////////////////PRODUCTOS_FACTURAS/////////////////////////////////////////////////
/////////////////////////////////PRODUCTOS_FACTURAS/////////////////////////////////////////////////

//http://localhost:3000/facturas/3/productos
aplicacion.get('/facturas/:id/productos/', (req, res) => {
  const { id } = req.params;
  const consulta = `SELECT pf.id AS id_productos_factura, p.id AS producto_id, f.id AS factura_id,
  pf.cantidad, pf.subtotal, pf.creado_por AS responsable_prod_fact, p.nombre AS nombre_producto, p.precio, 
  p.creado_por AS responsable_produc, f.cliente_id, f.empleado_id, f.creado AS fecha_creacion_empleado, f.estado
   FROM productos_facturas pf INNER JOIN productos p ON pf.producto_id = p.id
  INNER JOIN facturas f ON pf.factura_id = f.id WHERE pf.id = ${id}`;
  connection.query(consulta, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('No se encuentra ');
    }
  });
});
///Inserta un nuevo registro en la tabla productos_factura 

aplicacion.post('/facturas/:factura_id/detalle', (req, res) => {
  const { factura_id } = req.params;
 
  const consulta = 'INSERT INTO productos_facturas SET ?';

  const productoObj = {
      producto_id: req.body.producto_id,
      factura_id: req.body.factura_id,
      cantidad: req.body.cantidad,
      subtotal: req.body.subtotal,
      creado_por: req.body.creado_por
  };

  connection.query(consulta, productoObj, error => {
    if (error) throw error;
    res.send('Producto Creado exitosamente!');
  });
});

aplicacion.get('/detalle_facturas', (req, res) => {
  const consulta = 'SELECT * FROM productos_facturas';

  connection.query(consulta, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('No se encuentra ningun Producto');
    }
  });
});



//// facturas/:id/detalle?id_producto
aplicacion.delete('facturas/:factura_id/detalle?producto_id', (req, res) => {
  const { factura_id, producto_id } = req.params;
  const consulta = `DELETE FROM productos_facturas WHERE factura_id= ${factura_id} 
  and producto_id= ${producto_id} `;

  connection.query(consulta, error => {
    if (error) throw error;
    res.send('Detalle Eliminado con Exito');
  });
});



aplicacion.post('/login', (req, res) => {
  const { nombre, password } = req.body;
  const consulta = `SELECT * FROM usuarios WHERE nombre = '${nombre}' AND  PASSWORD ='${password}' `;

  connection.query(consulta, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(true);
    } else {
      res.send(false);
    }
  });
});



/////////////////////////////////FIN PRODUCTOS_FACTURAS/////////////////////////////////////////////////
/////////////////////////////////FIN PRODUCTOS_FACTURAS/////////////////////////////////////////////////
/////////////////////////////////FIN PRODUCTOS_FACTURAS/////////////////////////////////////////////////
/////////////////////////////////FIN PRODUCTOS_FACTURAS/////////////////////////////////////////////////


/////////////////////////////////CLIENTES/////////////////////////////////////////////////
/////////////////////////////////CLIENTES/////////////////////////////////////////////////
/////////////////////////////////CLIENTES/////////////////////////////////////////////////
/////////////////////////////////CLIENTES/////////////////////////////////////////////////
/**
 * [aplicacion description]
 *
 * @param   {[type]}  /clientes  [/clientes description]
 * @param   {[type]}  req        [req description]
 * @param   {[type]}  res        [res description]
 *
 * @return  {[type]}             [return description]
 */
  aplicacion.get('/clientes', (req, res) => {
    const consulta = 'SELECT * FROM clientes';
  
    connection.query(consulta, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send('Ningun Cliente Agregado');
      }
    });
  });
/**
 * [aplicacion description]
 *
 * @param   {[type]}  /clientes/:id  [/clientes/:id description]
 * @param   {[type]}  req            [req description]
 * @param   {[type]}  res            [res description]
 *
 * @return  {[type]}                 [return description]
 */
  aplicacion.get('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const consulta = `SELECT * FROM clientes WHERE id = ${id}`;
    connection.query(consulta, (error, result) => {
      if (error) throw error;
  
      if (result.length > 0) {
        res.json(result);
      } else {
        res.send('El cliente no existe');
      }
    });
  });
/**
 * [post description]
 *
 * @param   {[type]}  /clientes  [/clientes description]
 * @param   {[type]}  req        [req description]
 * @param   {[type]}  res        [res description]
 *
 * @return  {[type]}             [return description]
 */
  aplicacion.post('/clientes', (req, res) => {
    const consulta = 'INSERT INTO clientes SET ?';
    /**
     * [clienteObj description]
     *
     * @var {[type]}
     */
    const clienteObj = {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        nit: req.body.nit,
        creado_por: req.body.creado_por
    };
    /**
     * [query description]
     *
     * @param   {[type]}  consulta    [consulta description]
     * @param   {[type]}  clienteObj  [clienteObj description]
     * @param   {[type]}  error       [error description]
     *
     * @return  {[type]}              [return description]
     */
    connection.query(consulta, clienteObj, error => {
      if (error) throw error;
      res.send('Cliente agregado con exito');
    });
  });
/**
 * [put description]
 *
 * @param   {[type]}  /clientes/:id  [/clientes/:id description]
 * @param   {[type]}  req            [req description]
 * @param   {[type]}  res            [res description]
 *
 * @return  {[type]}                 [return description]
 */
  aplicacion.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, nit, creado_por } = req.body;
    const consulta = `UPDATE clientes SET nombre = '${nombre}', direccion='${direccion}', nit='${nit}', creado_por='${creado_por}' WHERE id =${id}`;
  
    connection.query(consulta, error => {
      if (error) throw error;
      res.send('Cliente actualizado exitosamente!');
    });
  });
/**
 * [delete description]
 *
 * @param   {[type]}  /clientes/:id  [/clientes/:id description]
 * @param   {[type]}  req            [req description]
 * @param   {[type]}  res            [res description]
 *
 * @return  {[type]}                 [return description]
 */
  aplicacion.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const consulta = `DELETE FROM clientes WHERE id= ${id}`;
  
    connection.query(consulta, error => {
      if (error) throw error;
      res.send('Cliente Eliminado con Exito');
    });
  });

/////////////////////////////////FIN CLIENTES/////////////////////////////////////////////////
/////////////////////////////////FIN CLIENTES/////////////////////////////////////////////////
/////////////////////////////////FIN CLIENTES/////////////////////////////////////////////////
/////////////////////////////////FIN CLIENTES/////////////////////////////////////////////////



///////////////////////////////// EMPLEADOS/////////////////////////////////////////////////
///////////////////////////////// EMPLEADOS/////////////////////////////////////////////////
///////////////////////////////// EMPLEADOS/////////////////////////////////////////////////
///////////////////////////////// EMPLEADOS/////////////////////////////////////////////////

/**
 * [aplicacion description]
 *
 * @param   {[type]}  /empleados  [/empleados description]
 * @param   {[type]}  req         [req description]
 * @param   {[type]}  res         [res description]
 *
 * @return  {[type]}              [return description]
 */
  aplicacion.get('/empleados', (req, res) => {
    const consulta = 'SELECT * FROM empleados';
  
    connection.query(consulta, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send('Ningun Empleado Encontrado');
      }
    });
  });
  /**
   * [aplicacion description]
   *
   * @param   {[type]}  /empleados/:id  [/empleados/:id description]
   * @param   {[type]}  req             [req description]
   * @param   {[type]}  res             [res description]
   *
   * @return  {[type]}                  [return description]
   */
  aplicacion.get('/empleados/:id', (req, res) => {
    const { id } = req.params;
    const consulta = `SELECT * FROM empleados WHERE id = ${id}`;
    connection.query(consulta, (error, result) => {
      if (error) throw error;
  
      if (result.length > 0) {
        res.json(result);
      } else {
        res.send('El empleado no se encuentra');
      }
    });
  });
/**
 * [post description]
 *
 * @param   {[type]}  /empleados  [/empleados description]
 * @param   {[type]}  req         [req description]
 * @param   {[type]}  res         [res description]
 *
 * @return  {[type]}              [return description]
 */
  aplicacion.post('/empleados', (req, res) => {
    const consulta = 'INSERT INTO empleados SET ?';
  
    const empleadoObj = {
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        salario: req.body.salario,
        creado_por: req.body.creado_por
    };
  
    connection.query(consulta, empleadoObj, error => {
      if (error) throw error;
      res.send('Empleado Creado con exito!');
    });
  });
/**
 * [put description]
 *
 * @param   {[type]}  /empleados/:id  [/empleados/:id description]
 * @param   {[type]}  req             [req description]
 * @param   {[type]}  res             [res description]
 *
 * @return  {[type]}                  [return description]
 */
  aplicacion.put('/empleados/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, codigo, salario, creado_por } = req.body;
    const consulta = `UPDATE empleados SET nombre = '${nombre}', codigo='${codigo}', salario='${salario}', creado_por='${creado_por}' WHERE id =${id}`;
  
    connection.query(consulta, error => {
      if (error) throw error;
      res.send('Empleado Actualizado con exito!');
    });
  });
/**
 * [delete description]
 *
 * @param   {[type]}  /empleados/:id  [/empleados/:id description]
 * @param   {[type]}  req             [req description]
 * @param   {[type]}  res             [res description]
 *
 * @return  {[type]}                  [return description]
 */
  aplicacion.delete('/empleados/:id', (req, res) => {
    const { id } = req.params;
    const consulta = `DELETE FROM empleados WHERE id= ${id}`;
  
    connection.query(consulta, error => {
      if (error) throw error;
      res.send('Empleado Eliminado con Exito');
    });
  });
/////////////////////////////////FIN EMPLEADOS/////////////////////////////////////////////////
/////////////////////////////////FIN EMPLEADOS/////////////////////////////////////////////////
/////////////////////////////////FIN EMPLEADOS/////////////////////////////////////////////////
/////////////////////////////////FIN EMPLEADOS/////////////////////////////////////////////////

///////////////////////////////// PRODUCTOS/////////////////////////////////////////////////
///////////////////////////////// PRODUCTOS/////////////////////////////////////////////////
///////////////////////////////// PRODUCTOS/////////////////////////////////////////////////
///////////////////////////////// PRODUCTOS/////////////////////////////////////////////////
/**
 * [aplicacion description]
 *
 * @param   {[type]}  /productos  [/productos description]
 * @param   {[type]}  req         [req description]
 * @param   {[type]}  res         [res description]
 *
 * @return  {[type]}              [return description]
 */
aplicacion.get('/productos', (req, res) => {
    const consulta = 'SELECT * FROM productos';
  
    connection.query(consulta, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send('No se encuentra ningun Producto');
      }
    });
  });
  /**
   * [aplicacion description]
   *
   * @param   {[type]}  /productos/:id  [/productos/:id description]
   * @param   {[type]}  req             [req description]
   * @param   {[type]}  res             [res description]
   *
   * @return  {[type]}                  [return description]
   */
  aplicacion.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    const consulta = `SELECT * FROM productos WHERE id = ${id}`;
    connection.query(consulta, (error, result) => {
      if (error) throw error;
  
      if (result.length > 0) {
        res.json(result);
      } else {
        res.send('No se encuentra el Producto');
      }
    });
  });
  /**
   * [post description]
   *
   * @param   {[type]}  /productos  [/productos description]
   * @param   {[type]}  req         [req description]
   * @param   {[type]}  res         [res description]
   *
   * @return  {[type]}              [return description]
   */
  aplicacion.post('/productos', (req, res) => {
    const consulta = 'INSERT INTO productos SET ?';
  
    const productoObj = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        creado_por: req.body.creado_por
    };
  
    connection.query(consulta, productoObj, error => {
      if (error) throw error;
      res.send('Producto Creado exitosamente!');
    });
  });
  /**
   * [put description]
   *
   * @param   {[type]}  /productos/:id  [/productos/:id description]
   * @param   {[type]}  req             [req description]
   * @param   {[type]}  res             [res description]
   *
   * @return  {[type]}                  [return description]
   */
  aplicacion.put('/productos/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, precio, creado_por } = req.body;
    const consulta = `UPDATE productos SET nombre = '${nombre}', precio='${precio}', creado_por='${creado_por}' WHERE id =${id}`;
  
    connection.query(consulta, error => {
      if (error) throw error;
      res.send('Producto Actualizado exitosamente!');
    });
  });
  /**
   * [delete description]
   *
   * @param   {[type]}  /productos/:id  [/productos/:id description]
   * @param   {[type]}  req             [req description]
   * @param   {[type]}  res             [res description]
   *
   * @return  {[type]}                  [return description]
   */
  aplicacion.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    const consulta = `DELETE FROM productos WHERE id= ${id}`;
  
    connection.query(consulta, error => {
      if (error) throw error;
      res.send('producto Eliminado con Exito');
    });
  });
/////////////////////////////////FIN PRODUCTOS/////////////////////////////////////////////////
/////////////////////////////////FIN PRODUCTOS/////////////////////////////////////////////////
/////////////////////////////////FIN PRODUCTOS/////////////////////////////////////////////////
/////////////////////////////////FIN PRODUCTOS/////////////////////////////////////////////////

/////////////////////////////////FACTURAS/////////////////////////////////////////////////
/////////////////////////////////FACTURAS/////////////////////////////////////////////////
/////////////////////////////////FACTURAS/////////////////////////////////////////////////
/////////////////////////////////FACTURAS/////////////////////////////////////////////////

/**
 * [aplicacion description]
 *
 * @param   {[type]}  /facturas  [/facturas description]
 * @param   {[type]}  req        [req description]
 * @param   {[type]}  res        [res description]
 *
 * @return  {[type]}             [return description]
 */
aplicacion.get('/facturas', (req, res) => {
    const consulta = 'SELECT * FROM facturas';
  
    connection.query(consulta, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send('No hay Facturas');
      }
    });
  });

//http://localhost:3000/clientes/3/facturas

/**
 * [aplicacion description]
 *
 * @param   {[type]}  /clientes/:id/facturas  [/clientes/:id/facturas description]
 * @param   {[type]}  req                     [req description]
 * @param   {[type]}  res                     [res description]
 *
 * @return  {[type]}                          [return description]
 */
  aplicacion.get('/clientes/:id/facturas', (req, res) => {
    const { id } = req.params;
    const consulta = `SELECT * FROM facturas WHERE cliente_id = ${id}`;
    connection.query(consulta, (error, result) => {
      if (error) throw error;
  
      if (result.length > 0) {
        res.json(result);
      } else {
        res.send('El cliente no tiene facturas');
      }
    });
  });

  //http://localhost:3000/empleados/22/facturas
  aplicacion.get('/empleados/:id/facturas', (req, res) => {
    const { id } = req.params;
    const consulta = `SELECT * FROM facturas WHERE empleado_id = ${id}`;
    connection.query(consulta, (error, result) => {
      if (error) throw error;
  
      if (result.length > 0) {
        res.json(result);
      } else {
        res.send('El empleado no tiene facturas');
      }
    });
  });


    //http://localhost:3000/facturas/id
    aplicacion.get('/facturas/:id', (req, res) => {
      const { id } = req.params;
      const consulta = `SELECT * FROM facturas WHERE id = ${id}`;
      connection.query(consulta, (error, result) => {
        if (error) throw error;
    
        if (result.length > 0) {
          res.json(result);
        } else {
          res.send('Factura no encontrada');
        }
      });
    });

  /**
   * [post description]
   *
   * @param   {[type]}  /facturas  [/facturas description]
   * @param   {[type]}  req        [req description]
   * @param   {[type]}  res        [res description]
   *
   * @return  {[type]}             [return description]
   */
  aplicacion.post('/facturas', (req, res) => {
    const consulta = 'INSERT INTO facturas SET ?';
  
    const facturaObj = {
        cliente_id: req.body.cliente_id,
        empleado_id: req.body.empleado_id,
        creado: req.body.creado,
        estado: req.body.estado
    };
  
    connection.query(consulta, facturaObj, error => {
      if (error) throw error;
      res.send('Factura Creada con Exito!');
    });
  });
  /**
   * [put description]
   *
   * @param   {[type]}  /facturas/:id  [/facturas/:id description]
   * @param   {[type]}  req            [req description]
   * @param   {[type]}  res            [res description]
   *
   * @return  {[type]}                 [return description]
   */
  aplicacion.put('/facturas/:id', (req, res) => {
    const { id } = req.params;
    const { cliente_id, empleado_id, creado, estado } = req.body;
    const consulta = `UPDATE facturas SET cliente_id = '${cliente_id}', empleado_id='${empleado_id}', creado='${creado}',estado='${estado}' WHERE id =${id}`;
  
    connection.query(consulta, error => {
      if (error) throw error;
      res.send('Factura Actualizada con Exito!');
    });
  });

//http://localhost:3000/facturas/1
  aplicacion.patch('/facturas/:id', (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    const consulta = `UPDATE facturas SET estado = '${estado}' WHERE id =${id}`;
  
    connection.query(consulta, error => {
      if (error) throw error;
      res.send('Estado Actualizado!');
    });
  });


  /**
   * [delete description]
   *
   * @param   {[type]}  /facturas/:id  [/facturas/:id description]
   * @param   {[type]}  req            [req description]
   * @param   {[type]}  res            [res description]
   *
   * @return  {[type]}                 [return description]
   */
  aplicacion.delete('/facturas/:id', (req, res) => {
    const { id } = req.params;
    const consulta = `DELETE FROM facturas WHERE id= ${id}`;
  
    connection.query(consulta, error => {
      if (error) throw error;
      res.send('factura Eliminada con Exito');
    });
  });

/////////////////////////////////FIN FACTURAS/////////////////////////////////////////////////
/////////////////////////////////FIN FACTURAS/////////////////////////////////////////////////
/////////////////////////////////FIN FACTURAS/////////////////////////////////////////////////
/////////////////////////////////FIN FACTURAS/////////////////////////////////////////////////





/**
 * [connect description]
 *
 * @param   {[type]}  error  [error description]
 *
 * @return  {[type]}         [return description]
 */
  connection.connect(error => {
    if (error) throw error;
    console.log('CONEXION EXITOSA!');
  });


  /**
   * [log description]
   *
   * @param   {[type]}  PORT                     [PORT description]
   * @param   {[type]}  CORRIENDO EN EL PUERTO   [CORRIENDO EN EL PUERTO  description]
   * @param   {[type]}  PORT                     [PORT description]
   *
   * @return  {[type]}                           [return description]
   */
  aplicacion.listen(PORT, () => console.log(`CORRIENDO EN EL PUERTO ${PORT}`));