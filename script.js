import "bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from "axios"

// selecting the required components
const form = document.querySelector("[data-form]")
const queryParamsContainer = document.querySelector("[data-query-params]")
const requestHeadersContainer = document.querySelector("[data-request-headers]")
const keyValueTemplate = document.querySelector("[data-key-value-template]")

// add keyValueTemplate on Query Params tab
document
    .querySelector("[data-add-query-param-btn]")
    .addEventListener("click", () => {
        queryParamsContainer.append(createKeyValuePair())
    })

// add keyValueTemplate on Request Headers tab
document
    .querySelector("[data-add-request-header-btn]")
    .addEventListener("click", () => {
        requestHeadersContainer.append(createKeyValuePair())
    })

queryParamsContainer.append(createKeyValuePair())
requestHeadersContainer.append(createKeyValuePair())

// Handling the form submission 
form.addEventListener("submit", e => {
    e.preventDefault();

    axios({
        url: document.querySelector("[data-url]").value,
        method: document.querySelector("[data-method]").value,
        params: keyValuePairsToObjects(queryParamsContainer),
        headers: keyValuePairsToObjects(requestHeadersContainer),
    }).then(response => {
        document
            .querySelector("[data-response-section]")
            .classList.remove("d-none");
        updateResponseDetails(response);
        updateResponseEditor(response.data);
        updateResponseHeaders(response.headers);
        console.log(response);
    })
        .catch(e => e);
})

// cloning and removing the key value template
function createKeyValuePair() {
    const element = keyValueTemplate.content.cloneNode(true)
    element.querySelector("[data-remove-btn]").addEventListener("click", e => {
        e.target.closest("[data-key-value-pair]").remove();
    })
    return element;
}

// Converting all key-value pairs into a single object
function keyValuePairsToObjects(container) {
    const pairs = container.querySelectorAll("[data-key-value-pair]");
    return [...pairs].reduce((data, pair) => {
        const key = pair.querySelector("[data-key]").value;
        const value = pair.querySelector("[data-value]").value;

        if (key === "") return data;
        return { ...data, [key]: value }
    }, {})
}




console.log("JS working")

