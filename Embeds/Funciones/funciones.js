function mensajes (message) {
    const user = message.author.globalName; 
    const username = message.author.username;
    const tag = message.author.tag;
    const id = message.author.id;
    return {user, tag, id, username};
} 
function interacciones (interaction) {
    const user = interaction.user; return user;
}

