import { getRequests, deleteRequest, getPlumbers, saveCompletion } from "./dataAccess.js"


const convertRequestListElement = (request) => {
    const plumbers = getPlumbers()
    return `<li class= "requestHTML"> ${request.description}
    <select class="plumbers" id="plumbers">
    <option value="0">Choose</option>
    ${plumbers.map(
        plumber => {
            return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
        }
    ).join("")
        }
    </select>
    <button class="request__delete"
    id="request--${request.id}">
    Delete
    </button>
    </li>`
}


export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${requests.map(convertRequestListElement).join("")
        }
                </ul>
                `

    return html
}
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            const dateNow = Date.now()
            
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                request: requestId,
                plumber: plumberId,
                dateCreated: dateNow
            }
            saveCompletion(completion)

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */


        }
    }
)