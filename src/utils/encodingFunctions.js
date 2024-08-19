const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror =(ero) => { reject(ero)}
    })
}

const convertText= (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsText(file)
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror =(ero) => { reject(ero)}
    })
}

export { convertBase64, convertText };
