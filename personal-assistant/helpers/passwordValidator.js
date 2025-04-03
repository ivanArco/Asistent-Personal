export function passwordValidator(password) {
  if (!password) return 'El campo de contraseña no puede estar vacio'
  if (password.length < 5) return 'La contraseña no puede tener menos de 5 caracteres'
  return ''
}
