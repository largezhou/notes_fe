export const vFile = value => {
  return value instanceof File
}

export const vImage = value => {
  return (value instanceof File) && (value.type.indexOf('image/') === 0)
}
