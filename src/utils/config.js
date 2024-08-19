
const backend = {
    url : "http://localhost:3005"
}

const token = {
    studentTokenKey: "s98873sRs",
    studentRefresh: "sksie98s4s5s5",
    lecturerTokenKey: "l9s87soruieu",
    lecturerRefresh: "sksiroeiskk77"

}

const convertToDateTimeLocalString = (date, offset=0) => {
    date.setMinutes(date.getMinutes() - offset)
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

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

const decodeBase64 = (data) => {
    return atob(data)
}
const getExtension = (filename) => {
    return filename.split(".").pop()
}
export {backend, token, convertToDateTimeLocalString, convertBase64, decodeBase64, getExtension}