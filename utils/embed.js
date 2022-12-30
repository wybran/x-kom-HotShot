export const embed = (data) => {
    return {
        title: "Gorrrący strzał! 🔥🥵",
        description: `Zdobądź **${data.PromotionName}** w obniżonej cenie - tylko przez najbliższe 12 godzin (lub do wyczerpania zapasów).`,
        url: `https://www.x-kom.pl/goracy_strzal`,
        color: 1037054,
        footer: {
            icon_url: "https://cdn.discordapp.com/avatars/1057682359383765062/8d8f7bd366698e702a47584e46b1e54c.png",
            text: "Gorący Strzał x-kom by wybran"
        },
        image: {
            url: data.PromotionPhoto.ThumbnailUrl
        },
        author: {
            name: "x-kom.pl",
            url: "https://x-kom.pl",
            icon_url: "https://cdn.discordapp.com/avatars/1057682359383765062/8d8f7bd366698e702a47584e46b1e54c.png"
        },
        fields: [
            {
                name: data.PromotionGainText,
                value: `~~${data.OldPrice}~~ **${data.Price}** zł`
            }
        ]
    };
};
