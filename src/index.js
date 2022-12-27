import { Router } from 'itty-router';
import { getHotShot } from './xkomAPI.js';
import { embed } from '../utils/embed.js';
import { verifyKey } from 'discord-interactions';
import {
  InteractionType,
  InteractionResponseType,
  MessageFlags
} from 'discord-api-types/v10';
import { respond } from '../utils/respond';
import commands from './commands';
import { registerCommands } from './registerCommands.js';
import { sendHotShotMessages } from './sendHotShotMessages.js';

const router = Router();

router.get('/', (request, env) => {
  return new Response(`👋 ${env.DISCORD_APPLICATION_ID} use this endpoint to keep bot alive.`);
});

router.get('/register', async (request, env) => {
  return respond(await registerCommands(env));
});


router.post('/', async (request, env) => {
  const interaction = await request.json();
  if (interaction.type === InteractionType.Ping) {
    console.log('Handling Ping request');
    return respond({
      type: InteractionResponseType.Pong,
    });
  }

  if (interaction.type === InteractionType.ApplicationCommand) {
        if (interaction.data.name === 'invite') {
          const botId = env.DISCORD_APPLICATION_ID;
          return respond({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
              content: `[Click to use bot 🥳](https://discord.com/oauth2/authorize?client_id=${botId}&permissions=3072&scope=applications.commands%20bot)`,
              flags: MessageFlags.Ephemeral
            }
          })
        }

        if (interaction.data.name === 'promka') {
          const hotShot = await getHotShot();
          return respond({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
              embeds: [embed(hotShot)]
            },
            flags: MessageFlags.Ephemeral
          })
        }

        if (interaction.data.name === 'powiadomienia') {
          const guildId = interaction.guild_id;
          const channelId = interaction.channel_id;
          await env.KV.put(guildId, channelId);
          
          const value = await env.KV.get(guildId);
          
          return respond({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
              content: `Ustawiono powiadomienia gorący strzał na <#${value}>`,
              flags: MessageFlags.Ephemeral
            }
          })

        }

        if (interaction.data.name === 'pomoc') {
          const commandsSort = [];
          commands.map((command, index) => {
            commandsSort.push(`**/${command.name}** - ${command.description}`)
          })
          return respond({
            type: InteractionResponseType.ChannelMessageWithSource,
            data: {
              content: `👋 Lista moich komend:\n${commandsSort.join("\n")}`,
              flags: MessageFlags.Ephemeral
            }
          })
        }

        console.error('Unknown Command');
        return respond({ error: 'Unknown Type' }, { status: 400 });
    }
  }
);

router.all('*', () => new Response('Not Found.', { status: 404 }));

export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      const signature = request.headers.get('x-signature-ed25519');
      const timestamp = request.headers.get('x-signature-timestamp');
      const body = await request.clone().arrayBuffer();
      const isValidRequest = verifyKey(
        body,
        signature,
        timestamp,
        env.DISCORD_PUBLIC_KEY
      );
      if (!isValidRequest) {
        return new Response('Bad request signature.', { status: 401 });
      }
    }

    return router.handle(request, env);
  },

  async scheduled(event, env, ctx) {
   await sendHotShotMessages(env);
	},
};