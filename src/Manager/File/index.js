import CONSTANTS from '../../CONSTANTS'

class File {
    #id = null
    #url = ''
    #el = null
    #removeEnable
    #showName
    onClick = null
    onClose = null
    get id() {
        return this.#id
    }
    get url() {
        return this.#url
    }
    get el() {
        return this.#el
    }
    get removeEnable() {
        return this.#removeEnable
    }
    get suffix() {
        return this.url.split('.')[this.url.split('.').length - 1] || ''
    }
    get name() {
        let url = this.url,
            arr = url.split('/'),
            name = ''
        if (arr.length > 1) {
            name = arr[arr.length - 1]
        } else {
            name = url
        }
        return name
    }
    get type() {
        let targetType = CONSTANTS.FILE_TYPE.UNKNOWN,
            typeSuffixMap = CONSTANTS.FILE_TYPE_SUFFIX_MAP
        for (const [type, suffixList] of typeSuffixMap) {
            if (suffixList.some((suffix) => suffix === this.suffix.toLowerCase())) {
                targetType = type
                break
            }
        }
        return targetType
    }
    constructor({ id, url, removeEnable = true, showName = true }) {
        this.#id = id
        this.#url = url
        this.#removeEnable = removeEnable
        this.#showName = showName
        this.#el = this.#createElement()
    }
    #createElement() {
        let el = document.createElement('div'),
            el_preview = this.#createPreviewElement()

        el.className = CONSTANTS.CLASS_NAME.FILE.WRAPPER
        el.title = this.name

        el.appendChild(el_preview)

        if (this.#showName) {
            var el_name = document.createElement('div')
            el_name.className = CONSTANTS.CLASS_NAME.FILE.NAME
            el_name.innerText = this.name
            el.appendChild(el_name)
        }

        if (this.removeEnable) {
            let el_close = document.createElement('div')
            el_close.className = CONSTANTS.CLASS_NAME.FILE.CLOSE
            el_close.title = '移除'
            el_close.addEventListener('click', () => {
                this.onClose && this.onClose()
            })
            el.appendChild(el_close)
        }
        return el
    }
    #createPreviewElement() {
        let el
        if (this.type === CONSTANTS.FILE_TYPE.IMAGE) {
            el = document.createElement('img')
            el.className = `${CONSTANTS.CLASS_NAME.FILE.PREVIEW.ORIGIN} ${CONSTANTS.CLASS_NAME.FILE.PREVIEW.IMAGE}`
            el.src = this.url
        } else {
            el = document.createElement('div')
            el.className = `${CONSTANTS.CLASS_NAME.FILE.PREVIEW.ORIGIN} ${CONSTANTS.CLASS_NAME.FILE.PREVIEW.ORIGIN}-${this.type}`
        }

        el.addEventListener('click', () => {
            this.onClick && this.onClick()
        })

        return el
    }
}

export default File
