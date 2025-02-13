
Nombre de la aplicación: ECHO asistente virtual


Objetivo General
Desarrollar un asistente personal virtual basado en inteligencia artificial que ayude a los usuarios a organizar sus tareas, gestionar su tiempo y proporcionar recordatorios personalizados, además de brindar información en tiempo real como el clima y asistencia en la realización de tareas.


Descripción de la Aplicación
La aplicación es un asistente personal que utiliza procesamiento de lenguaje natural (NLP) e inteligencia artificial para interactuar con los usuarios. Puede responder preguntas, establecer recordatorios, gestionar eventos y sincronizarse con otros servicios para mejorar la productividad del usuario. Además, proporciona información en tiempo real como el clima, asistencia en tareas escolares y recomendaciones basadas en las preferencias del usuario.

Tipo de Arquitectura y Justificación

Elección de la Arquitectura
Se ha optado por la arquitectura de microservicios debido a las siguientes razones:

Escalabilidad: La aplicación puede crecer de forma modular, permitiendo escalar de manera independiente cada componente según la demanda.

Mantenimiento y Despliegue Independiente: Cada microservicio se encarga de una funcionalidad específica, lo que facilita su actualización y mantenimiento sin afectar al resto de la aplicación.

Resiliencia: Al estar los microservicios desacoplados, la caída de uno no afecta a los demás, lo que mejora la estabilidad general del sistema.

Integración con tecnologías avanzadas: La arquitectura de microservicios facilita la integración de módulos dedicados a procesamiento de lenguaje natural, inteligencia artificial y otras tecnologías especializadas, como las interacciones por voz.

Componentes Principales de la Arquitectura
Frontend (Aplicación Móvil/Web):
La interfaz de usuario será la parte frontal de la aplicación, desarrollada en React Native para las versiones móviles (iOS y Android) y en Expo para facilitar el desarrollo multiplataforma.
La interfaz permitirá que el usuario interactúe con el asistente virtual, haciendo consultas y gestionando tareas, recordatorios, entre otros.

Microservicios (Backend):
Autenticación y Autorización: Un microservicio que gestiona el inicio de sesión, el registro de usuarios y su autenticación mediante token .

Procesamiento de Lenguaje Natural (NLP): Un microservicio dedicado a comprender las consultas del usuario. Este módulo se puede integrar con servicios como Dialogflow o Rasa para la interpretación de lenguaje natural.

Gestión de Tareas: Un microservicio que organiza y gestiona las tareas o recordatorios que el asistente virtual debe llevar a cabo en función de las solicitudes del usuario.
Integración con Servicios Externos: Un servicio para acceder a información externa como clima, tráfico, noticias, entre otros, a través de APIs.

Base de Datos:
Base de Datos Relacional o NoSQL: Se utilizará una base de datos para almacenar la información del usuario, las tareas pendientes y otros datos relacionados con la actividad del asistente.
Se optará por bases de datos como MongoDB (NoSQL) o MySQL (relacional), dependiendo de los requisitos específicos del proyecto.

Justificación de la Arquitectura de Microservicios

Escalabilidad: La división de la aplicación en microservicios permite escalar partes del sistema sin necesidad de escalar toda la aplicación. Por ejemplo, si el servicio de procesamiento de lenguaje natural experimenta una mayor demanda, se puede escalar únicamente esa parte del sistema.

Mantenimiento Independiente: Los microservicios están desacoplados, lo que permite desarrollar y mantener cada uno de ellos de manera independiente, sin afectar a los demás. Esto facilita las actualizaciones y correcciones de errores sin interrumpir el servicio.

Resiliencia y Tolerancia a Fallos: En una arquitectura de microservicios, si uno de los componentes falla, los demás siguen funcionando sin problemas. Esto garantiza una mayor estabilidad de la aplicación en general.

Futuras Integraciones y Expansiones: Con la arquitectura de microservicios, es fácil integrar nuevos servicios conforme la aplicación crece. Si se decide incorporar funcionalidades adicionales, como integración con dispositivos inteligentes, asistentes por voz, o módulos de análisis de datos, se puede hacer de manera modular sin impactar en la arquitectura existente.
Posibles Alternativas Consideradas
Aunque la arquitectura de microservicios se considera la más adecuada para este proyecto, se evaluaron otras alternativas como:

Arquitectura en Capas (Monolítica): Si bien esta arquitectura es más sencilla de implementar y es adecuada para aplicaciones más pequeñas, se descartó debido a la limitación en escalabilidad y la dificultad para integrar nuevas funcionalidades sin afectar al sistema global.

Arquitectura Basada en Eventos: Esta arquitectura fue considerada, ya que permite que el sistema reaccione en tiempo real a los eventos generados por el usuario. Sin embargo, debido a la complejidad de implementación y el enfoque principal en microservicios, esta opción fue relegada a un futuro posible si se requiere un procesamiento en tiempo real más avanzado.

Framework Seleccionado para Desarrollo
React native, React y Expo 
   
APIs Utilizadas
Para el funcionamiento del asistente virtual, se integrarán diversas APIs:
-OpenWeather API: Para proporcionar información meteorológica en tiempo real.
-Google Search API: Para responder preguntas generales de los usuarios.
-Wikipedia API: Para obtener definiciones y datos educativos.
-Google Calendar API: Para gestionar eventos y recordatorios.
-Dialogflow API: Para el procesamiento de lenguaje natural y comunicación con el asistente.

Estrategia de Versionamiento
Se usará GitHub para el control de versiones, siguiendo la estrategia de versionamiento.

Wireframes/Mockups de la Aplicación

Diagrama de Flujo de la Aplicación
Se incluye el diagrama de flujo que representa el funcionamiento general de la aplicación:

