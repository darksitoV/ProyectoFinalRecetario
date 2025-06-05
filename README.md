# Proyecto Recetario y Costeos
Proyecto Final DEIS, Elaboracion de un sistema de recetas y costeos 

## Índice

## 📚 Índice de Contenidos

🔗 **[URL del sistema](#url-del-sistema-click-al-enlace-para-ir-al-sistema)**

📄 **[Documentación Técnica](#documentacion-tecnica)**
- 🗂️ Casos de Uso
- 📑 Análisis del Proyecto

🎥 **[Guía de Uso (Video)](#guia-de-uso-video)**

👥 **[Equipo de Trabajo](#--equipo-de-trabajo--)**

🚀 **[Guía de Uso Rápida](#guia-de-uso-rapida)**
- 🏠 [Página Principal](#pagina-principal)
- 📝 [Página Registro](#pagina-registro)
- 🔐 [Página Iniciar Sesión](#pagina-iniciar-sesion)
- 🍽️ [Página Menú](#pagina-menu)
- 🧺 [Gestión de Ingredientes](#gestion-de-ingredientes)
- 👨‍🍳 [Crear Receta](#crear-receta)
- 📋 [Consultar Receta](#consultar-receta)
- 🧾 [Consultar Ingrediente](#consultar-ingrediente)
- ⚙️ [Editar Información de Usuario](#editar-informacion-de-usuario)

🛠️ **[Tecnologías Utilizadas](#tecnologias-utilizadas)**

🌐 **[Servidores + Hosts](#servidores--hosts)**


### URL DEL SISTEMA (CLICK AL ENLACE PARA IR AL SISTEMA)
## https://proyectofinalrecetario-2-3.web.app/


## Documentacion Tecnica 
* ![Análisis del negocio casos de uso (⚠CLICK PARA VER PDF⚠)](imgs/casos_uso.pdf)
* ![Análisis del negocio proyecto (⚠CLICK PARA VER PDF⚠)](imgs/analisis.pdf)

## Guia de uso (Video)
* https://drive.google.com/file/d/1N_TFwwpKlz_qFMea56u3Elr_uXDj302U/view?usp=drive_link
  
## - Equipo de trabajo -
* Cárdenas Soto Genaro Isaac (Tester)
* Guerrero Romero José Miguel (Desarrollador)
* Pacheco trujillo jesus martin (Lider de proyecto)
* Zaragoza Cervantes Javier Esau (Analista)
* Palafox Espinoza Miguel Angel (Arquitecto)

![rock](imgs/rock.jpg)

# GUIA DE USO RAPIDA

## Pagina Principal
Se cuentan con 2 apartados si no tienes una cuenta tendras que registrarte, en caso de tenerla seleccionar iniciar sesion 
![main](imgs/main.jpg)

## Pagina Registro
Es colocar tus datos personales, tus datos de usuario, y por ultimo tu ocupacion ya sea ama de casa o cheft esto es para determinar para que proposito quieres el sistema. 
![registro](imgs/registro.jpg)

## Pagina Iniciar Sesion
Colocar tu nombre de usuario y tu contrasena e ingresar :D.
![login](imgs/login.jpg)

## Pagina Menu 
* Anadir Ingredientes 
* Crear Receta 
* Consultar mis recetas 
* Consultar Ingredientes

![menu](imgs/menu.jpg)

## Gestion de ingredientes
En este apartado se puede crear un stock de ingredientes para utilizar en las recetas
* Paso 1.- Rellenar la siguiente informacion en el formulario y presionar agregar a la tabla.
  * Nombre del ingrediente
  * Cantidad
  * Unidad
  * Precio por Unidad
* Paso 2.- Si estas seguro de que la informacion es correcta puedes presionar el boton verde **"Guardar en base de datos"** y ya quedaria registrado.
* Paso Alternativo.- Botones Eliminar o Editar

![gestion_ingredientes](imgs/gestion_ingredientes.jpg)

## Crear Receta
En este apartado se pueden crear nuevas recetas
Se tiene que rellenar la siguient informacion
  * Nombre de la receta:
  * Tiempo de preparación (min):
  * Ingredientes.
para buscar ingrediente, se busca por su nombre y se presiona anadir de esta forma queda guardado y se agrega tambien el coste.

**Restriccion:** Para crear una receta es obligatorio que haya  por lo menos 1 ingrediente creado anteriormente.
![crear_receta](imgs/crear_receta.jpg)

## Consultar Receta
En este apartado se puede verfiicar cuales son las recetas que tengo almacenadas, al presionar en la receta te dara informacion mas detallada como ingredientes etc, ademas de eso hay  un boton para eliminar la receta si se desea.
![consultar_receta](imgs/consultar_receta.jpg)

## Consultar Ingrediente 
Este apartado te permite verficar los ingredientes que tienes almacenados, asi como poder actualizarlos desde el boton editar y el boton eliminar para poder eliminar ese ingrediente de la BD.
![consultar_ingrediente](imgs/consultar_ingrediente.jpg)

## Editar informacion de usuario
Al presionar en tu nombre de usario que aparece en la esquina podras cambiar tanto tu nombre de usuario como correo como contrasena las veces que quieras.
**Restriccion:** No puede haber nombre de usaurio repetidos y correos.
![editar](imgs/editar.jpg)


## Tecnologias Utilizadas 

* **React** (FrontEnd)
* **NodeJS** (BackEnd)

* **Vite** (Generar proyecto FrontEnd)
* **Express** (Generar Proyecto BackEnd)
* **Sequelize** (ORM para la base de datos)
* **PostgreSql** (Base de datos)

## Servidores + Hosts
* **Aiven.io** (Servidor de base de datos)
* **Firebase Host** (Host FrontEnd)
* **Render** (Host BackEnd)
* **UptimeRobot** (Mantener Alive la api)
