import Cookies from "js-cookie"
import { token } from "./config"

function saveToken(key, value) {
	// `item` is an object which contains the original value
	// as well as the time when it's supposed to expire
	Cookies.set(key, value)
}


function getToken(key) {
	// if the item doesn't exist, return null
	return Cookies.get(key)
}

function logout(user) {
	if(user === "lecturer") {
		Cookies.remove(token.lecturerRefresh)
		Cookies.remove(token.lecturerTokenKey)
	} else {
		Cookies.remove(token.studentTokenKey)
		Cookies.remove(token.lecturerRefresh)
	}
}

export { getToken, logout, saveToken }

