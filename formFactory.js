const inputFactory = (type, id, className, ariaDescribedby) => {
	const input = document.createElement("input")
	input.type = type
	input.id = id
	input.classList.add(className)
	input.ariaDescribedby = ariaDescribedby
	return input
}

const labelFactory = (text, htmlFor) => {
	const label = document.createElement("label")
	label.htmlFor = htmlFor
	label.classList.add("form-label")
	label.textContent = text
	return label
}
export const formFactory = () => {
	const form = document.createElement("form")

	const nameInput = inputFactory("text", "userName", "form-control", "namelHelp")
    const nameLabel = labelFactory("userName", "form-label", "User's Name")
    const ageInput = inputFactory("number", "userAge", "form-control", "ageHelp")
    const ageLabel = labelFactory("userAge", "form-label", "User's Age")
    const imageInput = inputFactory("url", "UserImage", "form-control", "imageHelp")
    const imageLabel = labelFactory("image", "form-label", "User's Image")
    const genderInput = inputFactory("gender", "UserGender", "form-control", "genderHelp")
    const genderLabel = labelFactory("gender", "form-label", "User's gender")

    const appendNodeElement = (parentNode, childNode) => {
	parentNode.appendChild(childNode)
}

    appendNodeElement(form, nameLabel)
    appendNodeElement(form, nameInput)
    appendNodeElement(form, ageLabel)
    appendNodeElement(form, ageInput)
    appendNodeElement(form, imageLabel)
    appendNodeElement(form, imageInput)
    appendNodeElement(form, genderLabel)
    appendNodeElement(form, genderInput)


	document.querySelector(".modal-body").appendChild(form)

	return form
}