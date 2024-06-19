

const defaultStyle = {
    "&.MuiInputLabel-root": {
        transform: "translate(14px, 92px)"
    },
}

const focusedStyle = {
    '&.Mui-focused': {
        transform: "translate(14px, 67px) scale(0.75)",
        color: '#9c27b0'
    },
    '&.MuiInputLabel-root:not(.Mui-focused) ~ .MuiInputBase-root .MuiOutlinedInput-notchedOutline legend': {
        maxWidth: 0
    }
}

const focusedWithPasswordStyle = {
    "&.MuiInputLabel-root": {
        transform: "translate(14px, 67px) scale(0.75)",
        color: 'rgba(0, 0, 0, 0.6)'
    },
    '&.Mui-focused': {
        color: '#9c27b0'
    }
} 

export { defaultStyle, focusedStyle, focusedWithPasswordStyle }