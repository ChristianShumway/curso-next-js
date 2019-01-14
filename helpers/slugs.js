import slugify from 'slugify'

export default function slug(name) {
  //regresa la funcion de slugify, le pasamos el nombre, con lower lo convertimos a minusculas y con el regex todo lo que no sea ese caracter lo convertimos en espacio
  return slugify(name, { lower: true }).replace(/[^\w\-]+/g, '')
}