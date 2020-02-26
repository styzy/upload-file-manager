const NAME_SPACE = `upload-file-manager`
const FILE_TYPE = {
    IMAGE: `image`,
    PDF: `pdf`,
    WORD: `word`,
    EXCEL: `excel`,
    PPT: `ppt`,
    ZIP: `zip`,
    TXT: `txt`,
    EXE: `exe`,
    UNKNOWN: `unknown`
}
const FILE_TYPE_SUFFIX_MAP = new Map([
    [FILE_TYPE.IMAGE, [`jpg`, `jpeg`, `png`, `gif`]],
    [FILE_TYPE.PDF, [`pdf`]],
    [FILE_TYPE.WORD, [`doc`, `docx`]],
    [FILE_TYPE.EXCEL, [`xls`, `xlsx`]],
    [FILE_TYPE.PPT, [`ppt`, `pptx`]],
    [FILE_TYPE.ZIP, [`zip`, `rar`, `tar`, `7z`, `gz`, `tgz`, `bz`, `bz2`, `tbz`]],
    [FILE_TYPE.TXT, [`txt`]],
    [FILE_TYPE.EXE, [`exe`]]
])
const CONSTANTS = {
    CLASS_NAME: {
        CONTAINER: `${NAME_SPACE}-container`,
        FILE: {
            WRAPPER: `${NAME_SPACE}-file-wrapper`,
            PREVIEW: {
                ORIGIN: `${NAME_SPACE}-file-preview`,
                IMAGE: `${NAME_SPACE}-file-preview-${FILE_TYPE.IMAGE}`,
                PDF: `${NAME_SPACE}-file-preview--${FILE_TYPE.PDF}`,
                WORD: `${NAME_SPACE}-file-preview--${FILE_TYPE.WORD}`,
                EXCEL: `${NAME_SPACE}-file-preview--${FILE_TYPE.EXCEL}`,
                PPT: `${NAME_SPACE}-file-preview--${FILE_TYPE.PPT}`,
                TXT: `${NAME_SPACE}-file-preview--${FILE_TYPE.TXT}`,
                UNKNOWN: `${NAME_SPACE}-file-preview--${FILE_TYPE.UNKNOWN}`
            },
            NAME: `${NAME_SPACE}-file-name`,
            CLOSE: `${NAME_SPACE}-file-close`
        }
    },
    FILE_TYPE: FILE_TYPE,
    FILE_TYPE_SUFFIX_MAP: FILE_TYPE_SUFFIX_MAP
}

export default CONSTANTS
