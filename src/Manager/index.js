import CONSTANTS from '../CONSTANTS'
import File from './File'

class Manager {
    #el
    #files = {}
    #counter = 0
    #repeatEnable = false
    #limit = 0
    #showName = true
    #onFileClick = null
    #onFileRemove = null
    #onLimit = null
    #beforeFileRemove = null
    get el() {
        return this.#el
    }
    get files() {
        return Object.assign({}, this.#files)
    }
    get fileList() {
        return Object.values(this.files)
    }
    get repeatEnable() {
        return this.#repeatEnable
    }
    get limit() {
        return this.#limit
    }
    get onFileClick() {
        return this.#onFileClick
    }
    set onFileClick(value) {
        if (value instanceof Function) {
            this.#onFileClick = value
        }
    }
    get onFileRemove() {
        return this.#onFileRemove
    }
    set onFileRemove(value) {
        if (value instanceof Function) {
            this.#onFileRemove = value
        }
    }
    get onLimit() {
        return this.#onLimit
    }
    set onLimit(value) {
        if (value instanceof Function) {
            this.#onLimit = value
        }
    }
    get beforeFileRemove() {
        return this.#beforeFileRemove
    }
    set beforeFileRemove(value) {
        if (value instanceof Function) {
            this.#beforeFileRemove = value
        }
    }
    constructor(el, options) {
        if (typeof el === 'string') {
            this.#el = document.querySelector(el)
        }
        if (el instanceof HTMLElement) {
            this.#el = el
        }
        if (!this.el) {
            throw new Error(`实例化失败：错误的容器`)
        }
        this.el.className += ` ${CONSTANTS.CLASS_NAME.CONTAINER}`
        if (typeof options === 'object') {
            let { repeatEnable = false, onFileClick, onFileRemove, onLimit, beforeFileRemove, limit = 0, showName = true } = options
            this.#repeatEnable = repeatEnable
            this.#limit = limit
            this.#showName = showName
            this.onFileClick = onFileClick
            this.onFileRemove = onFileRemove
            this.onLimit = onLimit
            this.beforeFileRemove = beforeFileRemove
        }
    }
    #createId() {
        return 'file-' + ++this.#counter
    }
    #removeFileById(id) {
        let file = this.files[id],
            preventRemove = false

        if (!file) return

        if (this.beforeFileRemove) {
            preventRemove = this.beforeFileRemove(file.url)
        }
        if (preventRemove) return

        this.onFileRemove && this.onFileRemove(file.url)

        this.el.removeChild(file.el)
        delete this.#files[file.id]
    }
    addFile(url, removeEnable) {
        if (this.limit && this.fileList.length >= this.limit) {
            this.onLimit && this.onLimit()
            return
        }
        if (!url || typeof url !== 'string') {
            throw new Error('创建file失败：错误的url')
        }
        let id = this.#createId(),
            file = new File({ id, url, removeEnable, showName: this.#showName })
        this.#files[id] = file

        file.onClick = () => {
            this.onFileClick && this.onFileClick(file.url)
        }
        file.onClose = () => {
            this.#removeFileById(file.id)
        }
        this.el.appendChild(file.el)
    }
    addFiles(urlList, removeEnable) {
        if (!urlList || !(urlList instanceof Array)) {
            throw new Error('批量创建file失败：错误的url数组')
        }
        urlList.forEach((url) => {
            this.addFile(url, removeEnable)
        })
    }
    removeFile(url, isForce = false) {
        if (!url || typeof url !== 'string') {
            throw new Error('删除file失败：错误的url')
        }
        let fileList = this.fileList.filter((file) => {
            return file.url === url
        })
        fileList.forEach((file) => {
            if (file.removeEnable || isForce) {
                this.#removeFileById(file.id)
            }
        })
    }
    getFiles() {
        return this.fileList.map((file) => file.url)
    }
    cleanFiles() {
        this.fileList.forEach((file) => {
            this.el.removeChild(file.el)
            delete this.#files[file.id]
        })
    }
}

export default Manager
