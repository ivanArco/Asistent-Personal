# 📱 Nombre de la aplicación: ECHO asistente virtual

## 🎯 Objetivo General
Desarrollar un asistente personal virtual basado en inteligencia artificial que ayude a los usuarios a organizar sus tareas, gestionar su tiempo y proporcionar recordatorios personalizados, además de brindar información en tiempo real como el clima y asistencia en la realización de tareas.

## 📖 Descripción de la Aplicación
La aplicación es un asistente personal que utiliza procesamiento de lenguaje natural (NLP) e inteligencia artificial para interactuar con los usuarios. Puede responder preguntas, establecer recordatorios, gestionar eventos y sincronizarse con otros servicios para mejorar la productividad del usuario. Además, proporciona información en tiempo real como el clima, asistencia en tareas escolares y recomendaciones basadas en las preferencias del usuario.

## 🏗️ Tipo de Arquitectura y Justificación

### ⚙️ Elección de la Arquitectura
Se ha optado por la arquitectura de microservicios debido a las siguientes razones:

- 📈 **Escalabilidad:** La aplicación puede crecer de forma modular, permitiendo escalar de manera independiente cada componente según la demanda.
- 🛠️ **Mantenimiento y Despliegue Independiente:** Cada microservicio se encarga de una funcionalidad específica, lo que facilita su actualización y mantenimiento sin afectar al resto de la aplicación.
- 🔄 **Resiliencia:** Al estar los microservicios desacoplados, la caída de uno no afecta a los demás, lo que mejora la estabilidad general del sistema.
- 🤖 **Integración con tecnologías avanzadas:** La arquitectura de microservicios facilita la integración de módulos dedicados a procesamiento de lenguaje natural, inteligencia artificial y otras tecnologías especializadas, como las interacciones por voz.

### 🏗️ Componentes Principales de la Arquitectura

#### **🎨 Frontend (Aplicación Móvil/Web)**
- La interfaz de usuario será la parte frontal de la aplicación, desarrollada en **React Native** para las versiones móviles (iOS y Android) y en **Expo** para facilitar el desarrollo multiplataforma.
- La interfaz permitirá que el usuario interactúe con el asistente virtual, haciendo consultas y gestionando tareas, recordatorios, entre otros.

#### **🔗 Microservicios (Backend)**
- 🔐 **Autenticación y Autorización:** Un microservicio que gestiona el inicio de sesión, el registro de usuarios y su autenticación mediante token.
- 🗣️ **Procesamiento de Lenguaje Natural (NLP):** Un microservicio dedicado a comprender las consultas del usuario. Este módulo se puede integrar con servicios como **Dialogflow** o **Rasa** para la interpretación de lenguaje natural.
- 📅 **Gestión de Tareas:** Un microservicio que organiza y gestiona las tareas o recordatorios que el asistente virtual debe llevar a cabo en función de las solicitudes del usuario.
- 🌍 **Integración con Servicios Externos:** Un servicio para acceder a información externa como clima, tráfico, noticias, entre otros, a través de APIs.

#### **🗄️ Base de Datos**
- **Base de Datos Relacional o NoSQL:** Se utilizará una base de datos para almacenar la información del usuario, las tareas pendientes y otros datos relacionados con la actividad del asistente.
- Se optará por bases de datos como **MongoDB (NoSQL)** o **MySQL (relacional)**, dependiendo de los requisitos específicos del proyecto.

## 💡 Justificación de la Arquitectura de Microservicios

- 📊 **Escalabilidad:** La división de la aplicación en microservicios permite escalar partes del sistema sin necesidad de escalar toda la aplicación.
- 🔄 **Mantenimiento Independiente:** Los microservicios están desacoplados, lo que permite desarrollar y mantener cada uno de ellos de manera independiente, sin afectar a los demás.
- 🛡️ **Resiliencia y Tolerancia a Fallos:** En una arquitectura de microservicios, si uno de los componentes falla, los demás siguen funcionando sin problemas.
- 🚀 **Futuras Integraciones y Expansiones:** Con la arquitectura de microservicios, es fácil integrar nuevos servicios conforme la aplicación crece.

## ⚖️ Posibles Alternativas Consideradas

- 🏗️ **Arquitectura en Capas (Monolítica):** Se descartó debido a la limitación en escalabilidad y la dificultad para integrar nuevas funcionalidades.
- ⚡ **Arquitectura Basada en Eventos:** Fue considerada por su capacidad de reacción en tiempo real, pero se descartó debido a la complejidad de implementación.

## 🛠️ Framework Seleccionado para Desarrollo
- **React Native, React y Expo**

## 🔗 APIs Utilizadas
Para el funcionamiento del asistente virtual, se integrarán diversas APIs:

- ☁️ **OpenWeather API:** Para proporcionar información meteorológica en tiempo real.
- 🔍 **Google Search API:** Para responder preguntas generales de los usuarios.
- 📚 **Wikipedia API:** Para obtener definiciones y datos educativos.
- 📆 **Google Calendar API:** Para gestionar eventos y recordatorios.
- 🗣️ **Dialogflow API:** Para el procesamiento de lenguaje natural y comunicación con el asistente.

## 🔄 Estrategia de Versionamiento
Se usará **GitHub** para el control de versiones, siguiendo la estrategia de versionamiento.

## 🖌️ Wireframes/Mockups de la Aplicación
- Aqui se pordra ver el maquetado de una forma mas detallada:
-Puedes ver el wireframe aquí: [Ver Wireframes](https://miro.com/welcomeonboard/NkJMd2VpTVNmVVdQV1dVVXR2SmZmRnF2cmJoNThCVkNPYlpmV0dJc1lnTlVZb2lQN2ZkLzZDZXJDNVFpQUxSTlh4aWpnYTlCWmlrSTh5SmNzMndIRHFzVjJKcWRMS1h1VGdnY0RGUUVQVU1xVjZJV05DZ1NJUjZBanBtM3BsTlVBS2NFMDFkcUNFSnM0d3FEN050ekl3PT0hdjE=?share_link_id=467137938215)
## 📜 Diagrama de Flujo de la Aplicación
Se incluye el diagrama de flujo que representa el funcionamiento general de la aplicación con iconos y títulos en formato .md.


