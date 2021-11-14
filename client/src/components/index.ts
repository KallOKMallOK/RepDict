import Header from "./Header"
import { Deck } from "./Deck"
import Currsection from "./Currsection"
import Notification from "./Notification"

const Components = {
	Header,
	Deck,
	Currsection,
	Notification,
}

const loader = document.querySelector('.loader__wrapper') || document.body;

// if you want to show the loader when React loads data again
export const showLoader = () => {
	loader.classList.remove('loader__wrapper--hide')
	// document.body.style.overflowY = "hidden"
};

export const hideLoader = () => {
	loader.classList.add('loader__wrapper--hide')
	// document.body.style.overflowY = "scroll"
}


export default Components