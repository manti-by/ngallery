"use strict"


class Upload {
    constructor() {
        this.dropZone = document.getElementById("drop-zone")
        this.uploadFile = document.getElementById("upload-file")

        this.bind()
    }

    bind() {
        this.dropZone.addEventListener("click", (event) => {
            event.preventDefault()
            this.uploadFile.click()
        })

        this.uploadFile.addEventListener("change", (event) => {
            event.preventDefault()
            this.startUpload(this.uploadFile.files)
        })

        this.dropZone.ondrop = (event) => {
            event.preventDefault()
            event.currentTarget.className = "drop-zone"
            this.startUpload(event.dataTransfer.files)
        }

        this.dropZone.ondragover = (event) => {
            event.preventDefault()
            event.currentTarget.className = "drop-zone drop"
        }

        this.dropZone.ondragleave = (event) => {
            event.preventDefault()
            event.currentTarget.className = "drop-zone"
        }
    }

    startUpload(files) {
        console.log(files)
    }
}

document.addEventListener("DOMContentLoaded", () => {
  window.upload = new Upload()
})