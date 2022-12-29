export const embed = (data) => {
    return {
        title: data.PromotionName,
        description: `~~${data.OldPrice}~~ **${data.Price}** zł\n${data.PromotionGainText}`,
        url: `https://www.x-kom.pl/goracy_strzal`,
        thumbnail: {
            url: data.PromotionPhoto.ThumbnailUrl
        }
    };
};
