export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return 'El campo de usuario no puede estar vacio'
  if (!re.test(email)) return 'No es un correo valido'
  return ''
}