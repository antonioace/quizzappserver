export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
    if (!file) return callback(new Error("El archivo esta vacio"), false)
    const fileExtension = file.mimetype.split("/")[1]
    const validExtensions = ["png", "jpg", "jpeg", "gif"]
    if (!validExtensions.includes(fileExtension)) return callback(new Error("El archivo no es una imagen"), false)
    callback(null, true)
}