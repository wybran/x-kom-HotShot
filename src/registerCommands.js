import { Routes, RouteBases } from "discord-api-types/v10";
import commands from "./commands";

export async function registerCommands(env) {
    const url = `${RouteBases.api}${Routes.applicationCommands(
        env.DISCORD_APPLICATION_ID
    )}`;
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bot ${env.DISCORD_TOKEN}`
    };
    const response = await fetch(url, {
        headers,
        method: "PUT",
        body: JSON.stringify(commands)
    });
    const data = await response.json();
    return data;
}
