import { EditorState, basicSetup } from "@codemirror/basic-setup"
import { defaultTabBinding } from "@codemirror/commands"
import { EditorView, keymap } from "@codemirror/view"
import { json } from "@codemirror/lang-json"

export default function setupEditors() {
    const jsonRequestBody = document.querySelector("[data-json-request-body]")
    const jsonResponseBody = document.querySelector("[data-json-response-body]")

    const basicExtensions = [
        basicSetup,
        keymap.of([defaultTabBinding]),
        json(),
        EditorState.tabSize.of(2),
    ]

    const requestEditor = new EditorView({
        state: EditorState.create({
            doc: "{\n\t\n}",
            extensions: basicExtensions,
        }),
        parent: jsonRequestBody,
    })

    return {requestEditor};
}