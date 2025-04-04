export const useFetch = () => {

  // Función que consume datos usando el método GET
  const getData = async(url) => {
    const request = await fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'  // Corregido el nombre del header
      })
    });
    if( !request.ok ){
      return {
        error: true,
        message: 'Ocurrió un error'
      }
    }
    else {
      return {
        error: false,
        message: 'Datos recuperados',
        data: await request.json()
      }
    }
  }

  // Función que registra datos usando el método POST
  const setData = async(url, obj) => {
    const request = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'  // Corregido el nombre del header
      }),
      body: JSON.stringify( obj )
    });
    if( !request.ok ){
      return {
        error: true,
        message: 'Ocurrió un error'
      }
    }
    else {
      return {
        error: false,
        message: 'Datos agregados',
        data: await request.json()
      }
    }
  }

  // Función que actualiza datos usando el método PUT
  const updateData = async(url, obj) => {
    const request = await fetch(url, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'  // Corregido el nombre del header
      }),
      body: JSON.stringify( obj )
    });
    if( !request.ok ){
      return {
        error: true,
        message: 'Ocurrió un error'
      }
    }
    else {
      return {
        error: false,
        message: 'Datos actualizados',
        data: await request.json()
      }
    }
  }

  // Función que elimina datos usando el método DELETE
// Función para eliminar datos (DELETE)
// Función para eliminar datos (DELETE)
const deleteData = async (url) => {
  try {
    const request = await fetch(url, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    });
    
    if (!request.ok) {
      // Intentar obtener mensaje de error del backend
      try {
        const errorData = await request.json();
        return {
          error: true,
          message: errorData.message || 'Ocurrió un error al eliminar'
        };
      } catch (parseError) {
        // Si no se puede parsear el error, devolver un mensaje genérico
        return {
          error: true,
          message: 'Ocurrió un error al eliminar'
        };
      }
    } else {
      // Intentar parsear la respuesta
      try {
        const data = await request.json();
        return {
          error: false,
          message: 'Datos eliminados correctamente',
          data: data
        };
      } catch (parseError) {
        // Si no hay contenido para parsear (204 No Content), devolver éxito
        return {
          error: false,
          message: 'Datos eliminados correctamente'
        };
      }
    }
  } catch (networkError) {
    // Capturar errores de red
    return {
      error: true,
      message: networkError.message || 'Error de red al eliminar'
    };
  }
};

  return {
    getData,
    setData,
    updateData,
    deleteData
  }
}