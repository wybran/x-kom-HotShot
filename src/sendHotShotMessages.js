import { Routes, RouteBases } from "discord-api-types/v10";
import { embed } from "../utils/embed";
import { getHotShot } from "./xkomAPI";

export async function sendHotShotMessages(env) {
    const hotShot = await getHotShot();
    const list = await env.KV.list();
    for (const guildId of list.keys) {
        const channelId = await env.KV.get(guildId.name);
        const url = `${RouteBases.api}${Routes.channelMessages(channelId)}`;
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ embeds: [embed(hotShot)] }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bot ${env.DISCORD_TOKEN}`
            }
        });
        if (response.status !== 200) {
            console.log(response.status);
            console.log(`Kanał nie istnieje: ${channelId}`);
            await env.KV.delete(guildId.name);
        }
    }
}
