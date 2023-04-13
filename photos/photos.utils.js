export const processHashtags = (caption) => {
    const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g)
    console.log(hashtags)
    return hashtags?.map(hashtag => ({
        where: { hashtag },
        create: { hashtag }
    }))
}