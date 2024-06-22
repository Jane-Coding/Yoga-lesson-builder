const getImageURL = (name) => {
    return new URL(`../assets/poses/${name}.png`, import.meta.url).href
}

const getSoundURL = (name) => {
    return new URL(`../assets/sound/${name}.mp3`, import.meta.url).href
}

export { getImageURL, getSoundURL }