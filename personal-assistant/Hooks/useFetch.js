export const useFetch = () => {

    // Función que consume datos usando el método GET
    const getData = async(url) => {
      const request = await fetch(url, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Acccess-Control-Allow-Origin': '*'
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
          'Acccess-Control-Allow-Origin': '*'
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
          'Acccess-Control-Allow-Origin': '*'
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
    const deleteData = async(url) => {
      const request = await fetch(url, {
        method: 'DELETE',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Acccess-Control-Allow-Origin': '*'
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
          message: 'Datos eliminados',
          data: await request.json()
        }
      }
    }
  
    return {
      getData,
      setData,
      updateData,
      deleteData
    }
  
  }