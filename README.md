[Kliknij aby zaprosić mnie na swój serwer 🥰](https://discord.com/oauth2/authorize?client_id=1057682359383765062&permissions=2048&scope=bot%20applications.commands)

### Storing secrets
```
$ wrangler secret put DISCORD_TOKEN
$ wrangler secret put DISCORD_PUBLIC_KEY
$ wrangler secret put DISCORD_APPLICATION_ID
```

//Register commands from commands.js, first time and every file change
$ curl http://localhost:8787/register