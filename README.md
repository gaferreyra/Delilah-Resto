Delilah resto
APP para delivery de comidas.

Instalaciones requeridas:
NodeJs 
XAMPP (MySQL)
Postman
Visual Studio Code
HeidiSQL (sugerido)

Pasos a seguir:

1 - Copiar el contenido del archivo SqlDelilahDB.sql que está en la carpeta Delilah-Resto\src\database\ y ejecutarlo en HeidiSQL. 

2 - Clonar el proyecto y ejecutar el siguiente comando en una terminal de Visual Studio Code :
	
	node index.js

3- Desde Postman importar el archivo Delilah-Resto.postman_collection.json que esta en la carpeta Delilah-Resto\postman donde estan los diferentes endpoints (GET, POST, PUT, DELETE).

Se requiere enviar los token recibidos en el login a través de la pestaña Authorization, seleccionando el type "Bearer Token" y escribiendo solo el token que ha sido recibido en el campo Authorization del header

Rutas:

******Login******
  POST /login

  BODY:

  {
      "user": "admin",
      "password": "admin"
  }
  Nota: el usuario admin es el que pude usar todas la apis los demas usuarios precargados no tienen privilegios de admin

  Otro usuario de prueba:

  {
      "user": "pedro",
      "password": "321"
  }

******Usuarios******
  - Obtener todos los usuarios
    (api solo para usuarios admin)

    GET usuarios/all

    Body vacio. Se puede consultar todos los usuario con la palabra all o un usuario en particular sustituyendo all por el id del usuario que se quiere consultar 

  - Inserta un usuario
    (api solo para usuarios admin)
  
    POST /usuarios

    BODY:
    {
        "nombre": "Marina",
        "apellido": "Robles",
        "email": "rb@hotmail.com",
        "telefono": "0303456",
        "direccion": "San Martin 155",
        "user": "mr",
        "password": "987"
    }

  - Borrar un usuario

    DELETE /usuarios/5

    Body vacio. Se debe enviar el ID de usuario que se quiere borrar

- Modificar un usuario
  (api solo para usuarios admin)
  
    PUT /usuarios/5
    Se debe enviar el ID de usuario que se quiere modificar

    BODY:
    {
        "nombre": "Marina",
        "apellido": "Robles",
        "email": "rb@hotmail.com",
        "telefono": "0303456",
        "direccion": "San Martin 155",
        "user": "mr",
        "password": "987"
    }

******Productos******
  - Obtener todos los productos
    (api para todos los usuarios)

    GET productos/all

    Body vacio. Se puede consultar todos los productos con la palabra all o un producto en particular sustituyendo all por el id del producto que se quiere consultar 

  - Inserta un producto
    (api solo para usuarios admin)
  
    POST /productos

    BODY:
    {
        "descripcion": "Papas",
        "precio": 50,
        "imagen": "imagen 1"
    }

  - Borrar un Producto
  (api solo para usuarios admin)

    DELETE /productos/6

    Body vacio. Se debe enviar el ID de producto que se quiere borrar

  - Modificar un producto
    (api solo para usuarios admin)
    
      PUT /productos/5
      Se debe enviar el ID de producto que se quiere modificar

      BODY:
      {
          "descripcion": "Papas",
          "precio": 50,
          "imagen": "imagen 1"
      }

******Pedidos******
  - Obtener todos los Pedidos
    (api solo para usuarios admin)

    GET /pedidos

    Body vacio. 

- Obtener un Pedido en particular
    (api para todos los usuarios)

    GET /pedidos/5

    Body vacio.

  - Inserta un pedido
    (api para todos los usuarios)
  
    POST pedidos/2/1/1
    > El primer ID corresponde al usuario
    > El segundo ID corresponde a la forma de pago
    > El tercer ID corresponde al estado
    
    BODY:
    [
        {
            "id_producto": 3,
            "cantidad": 1
        },
        {
            "id_producto": 1,
            "cantidad": 2
        },
        {
            "id_producto": 2,
            "cantidad": 4
        }
    ]

  - Borrar un Pedido
  (api solo para usuarios admin)

    DELETE /pedidos/10

    Body vacio. Se debe enviar el ID de pedido que se quiere borrar

  - Modificar un pedido
    (api solo para usuarios admin)
    
      PUT /pedidos/102/3
      Se debe enviar el ID de pedido que se quiere modificar y el estado.
      Nota: con esta api solo se puede modificar el estado del pedido

******Favoritos******
  - Obtener todos los favoritos para un usuario en particular
    (api para todos los usuarios)

    GET /favoritos/1

    Body vacio.

  - Inserta un favorito
    (api para todos los usuarios)
  
    POST /favoritos/2/2
    > El primer ID corresponde al usuario
    > El segundo ID corresponde al producto
    > Body vacio

  - Borrar un Favorito
  (api para todos los usuarios)

    DELETE /favoritos/2/2
    > El primer ID corresponde al usuario
    > El segundo ID corresponde al producto
    > Body vacio

******Estados******
  - Obtener todos los estados
    (api para todos los usuarios)

    GET /estados

    Body vacio.

******Forma de pago******
  - Obtener todas las formas de pago
    (api para todos los usuarios)

    GET /formaPagos

    Body vacio.    