const { EmbedBuilder } = require("discord.js");
/*
const Main = new EmbedBuilder()
    .setTitle(`Genshin Natsumi Registration`)
    .setDescription(`**${interaction.user.globalName} register your genshin account in Genshin Natsumi.** `)
    .setAuthor({
        name: "Requested by " + interaction.user.globalName,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
    }).setColor("#C9A0DC")
    .addFields(
        { name: '\u200A', value: '\u200A' },
        { name: 'Bound UID', value: `❌ Not linked`, inline: true },
        { name: 'Wish history', value: `❌ Not linked`, inline: true },
        { name: 'HoYoLAB', value: `❌ Not linked`, inline: true },)
    .setFooter({ text: `© Nia`, iconURL: "https://i.redd.it/fi4oa3o2w7t51.png" })
*/


const Whishes = new EmbedBuilder()
    .setTitle(`Genshin Kinako | Wish history log`)
    .setDescription(
        `Welcome to Genshin Wizard's Registration system.\n` +
        `\n` +
        `**Linking Features:**\n` +
        `> **1.** Keep track of your wish history.\n` +
        `> **2.** View in-depth wish history statistics along with your banner pities.\n` +
        `> **3.** View whether you're on your guaranteed limited pity or not.\n` +
        `> **4.** Full Genshin Wizard profile capabilities.\n` +
        `> **5.** Access to all commands that are accessible by **[Linking UID](https://docs.genshinwizard.com/wishing-centre/getting-started#linking-genshin-uid-partial-registration)**.\n`
    )
    .setColor("#C9A0DC")
    .setFooter({ text: `Which platform do you use to play Genshin Impact?` })

const PC = new EmbedBuilder()
    .setTitle(`PC`)
    .setDescription(
        "Check out our [Github Documentation](https://github.com/Genshin-Wizard/historyLink) for detailed steps with pictures.\n" +
        `\n` +
        "**1**. Open `Genshin Impact Game` on your `PC`\n" +
        "**2**. Go to the `wish history page` and wait for it to load\n" +
        "**3**. Go back to `Windows/Desktop`\n" +
        "**4**. In the start `menu` search for `PowerShell` and open `Windows PowerShell`\n" +
        "**5**. Then copy the `following code` and paste it in the `Powershell window`.\n" +
        `\`\`\`powershell\nSet-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex "&{$((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/Genshin-Wizard/historyLink/master/historykey.ps1'))%7D global"\`\`\`\n\n` +
        "**6**. Hit `ENTER` to have the link copied to your clipboard\n" +
        "**7**. Click the `button` below and paste the link in the input field\n"
    )
    .setColor("#C9A0DC")

const PC_Method2 = new EmbedBuilder()
    .setTitle(`Wish History Registration | Method 2`)
    .setDescription(
        `1. In the start menu search for "PowerShell" and open "Windows PowerShell"\n` +
        `2. Then copy the following code and paste it in the Powershell window\n` +
        `\`\`\`powershell\niex('Write-Host "Copy the wish history table!";while(1) { $c = Get-Clipboard -TextFormatType Html; if ($c -match "^SourceURL:https:/.+log") { break; }; for($i=5; $i -gt 0; $i--) { Write-Host "\`rChecking in $i" - NoNewline; Sleep 1; }; };  Write-Host " OK"; $m=(((Get-Clipboard -TextFormatType Html) | Select-String " (https:/.+log)").Matches[0].Value);$m; Set-Clipboard -Value $m;')\n\`\`\`\n\n` +
        `3. Go to the Genshin Impact game and open the wish history page\n` +
        "4. Hit `ENTER`" + "to have the link copied to your clipboard\n" +
        `5. Click the button below and paste the link in the input field`
    )
    .setColor("#C9A0DC")

const PC_Method3 = new EmbedBuilder()
    .setTitle(`Wish History Registration | Method 3`)
    .setDescription(
        `1. In the start menu search for "PowerShell" and open "Windows PowerShell"\n` +
        `2. Then copy the following code and paste it in the Powershell window\n` +
        `\`\`\`powershell\nSet-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://gist.githubusercontent.com/MadeBaruna/bf36bad751dc9221067ca1e31ab08255/raw/cb73a9f46f08fad6f27581ebb1a6249ba086af13/read.ps1'))\n\`\`\`\n\n` +
        `3. Go to the Genshin Impact game and open the wish history page\n` +
        "4. Hit `ENTER`" + "to have the link copied to your clipboard\n" +
        `5. Click the button below and paste the link in the input field`
    )
    .setColor("#C9A0DC")

const PC_MethodM = new EmbedBuilder()
    .setTitle(`Wish History Registration | Manual Method`)
    .setDescription(
        `1. Open Genshin Impact Game on your PC (Make sure you restart the game if you use multiple accounts/share computers)\n` +
        `2. Go to the wish history page and wait for it to load\n` +
        `3. Open the installation folder for Genshin Impact (i.e. C:\`Games\`Genshin Impact\`Genshin Impact game)\n` +
        `Open folders "GenshinImpact_Data" > "webCaches" > "2.13.0.1" > "Cache" > "Cache_Data"`+
        `5. Right click "data_2" file then click "Open with" then select Notepad (If you get error like "The process cannot access the file because it is being used by another process" please exit the game first)`+
        `6. Press CTRL+F, check Wrap around, and select direction Up then in the input box search for "e20190909gacha-v2" (without the quote). Finally, click Find Next`+
        "7. Copy the link from `https://webstatic` to game_biz=hk4e_global the url looks like this: `https://webstatic-sea.hoyoverse.com/genshin/event/e20190909gacha-v2/index.html?.......&game_biz=hk4e_global`" 
    )
    .setColor("#C9A0DC")

const Androide = new EmbedBuilder()
    .setTitle(`Androide`)
    .setDescription(
        `Después de la actualización 3.0, ya no se puede copiar y pegar simplemente el enlace del historial en los dispositivos Android.\n` +
        `\n` +
        `Actualmente estamos buscando una forma de recuperar el enlace del historial en los dispositivos Android. Por favor, vuelva a comprobar más tarde.\n`
    )
    .setColor("#C9A0DC")

const iOS = new EmbedBuilder()
    .setTitle(`iOS (Stream application method)`)
    .setDescription(
        `Check out the App Guide [Stream de Kaizer](https://drive.google.com/file/d/14Q_6v60qLPunrpmA9Bf1KlvsKhaRyPzz/view?usp=sharing) for detailed steps with pictures.\n\n1. Open Genshin Impact and go to the Wish screen\n2. While Genshin Impact is still open, go to the Stream app and tap Sniff Now\n3. Return to Genshin Impact and open your wish history\n4. When your wishlist loads, return to the Stream app and tap Stop sniffing\n5. Then tap on Sniff History and choose the first item in the list\n6. Tap the request that starts with \`GET https://hk4e-api-os/...\`\n7. Tap the request tab\n8. Tap the long text that starts with \`GET /event/gacha_info...\`\n9. Finally, tap Copy URL\n10. Click the button below and paste the link in the input field.`
    )
    .setColor("#C9A0DC")


const Consola = new EmbedBuilder()
    .setTitle(`Console`)
    .setDescription(
        `After the 2.3 update event, the links no longer work. Even so, it is still possible to obtain the key by linking your Playstation account with a Mihoyo account and using the PC/mobile method instead.`
    )
    .setColor("#C9A0DC")


module.exports = { Whishes, PC, PC_Method2, PC_Method3, PC_MethodM, Androide, iOS, Consola }
