
export const getPortraitPhoto = (images) => {
    if (!images?.length) {
        return null
    }

    return images.find(image => {
        return image?.is_portrait})?.uri || images[0].url;
}