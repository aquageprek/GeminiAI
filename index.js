const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, ActivityType } = require('discord.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Inisialisasi Client Discord
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

const config = {
  channels: {
    allowed: ['CHANNEL_ID1', 'CHANNEL_ID2'],  // Ganti dengan channel ID untuk auto respons
  }
};

// Fungsi untuk mendapatkan respons dari Google Gemini API
async function getGoogleGeminiResponse(messageContent) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" }); // Ganti dengan model yang diinginkan (lihat di https://ai.google.dev/gemini-api/docs/models/gemini)

    const chatSession = model.startChat({
      generationConfig: {},
      history: [
        {
          role: "user",
          parts: [
            {
              text: "A Chatbot That Likes to Chat" // Ganti dengan Prompt yang diinginkan
            },
          ],
        },
      ],
    });

    const result = await chatSession.sendMessage(messageContent);
    return result.response.text();
  } catch (error) {
    console.error('Error with Google Gemini API request:', error);
    throw error;
  }
}

// Mengatur Slash Command /ask
const commands = [
  new SlashCommandBuilder()
    .setName('ask')
    .setDescription('Tanya sesuatu ke bot!')
    .addStringOption(option => 
      option.setName('question')
        .setDescription('Apa yang ingin kamu tanyakan?')
        .setRequired(true))
].map(command => command.toJSON());

// Event ketika bot sudah siap (ready)
client.once('ready', async () => {
  console.log(`✅ | Login Sebagai ${client.user.tag}`);

  // Mengatur status bot 
  client.user.setActivity('With Logic', { type: ActivityType.Playing });

  // Auto deploy slash commands saat bot sudah siap
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

  try {
    console.log('Memulai proses load (dan refresh) slash commands...');
    await rest.put(
      Routes.applicationCommands(client.user.id),  // Deploy commands setelah bot siap
      { body: commands }
    );
    console.log('Slash commands berhasil di-load!');
  } catch (error) {
    console.error('Gagal memuat slash commands:', error);
  }
});

// Event ketika bot menerima perintah /ask
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ask') {
    const question = interaction.options.getString('question');

    try {
      await interaction.deferReply(); // Defer the reply

      const response = await getGoogleGeminiResponse(question);

      // Balasan ke pengguna dengan note tambahan
      const replyContent = `${response}-# Harap dicatat bahwa informasi ini mungkin tidak benar | Gemini`;
      await interaction.editReply(replyContent); // Edit the deferred reply
    } catch (error) {
      console.error('Error processing interaction:', error);
      await interaction.editReply('Hmm, Sepertinya Aku lagi Kebingungan..... ~_~');  // Pesan fallback
    }
  }
});

// Event ketika bot menerima mention atau reply
client.on('messageCreate', async message => {
  if (message.author.bot) return;  // Abaikan pesan dari bot

  const allowedChannels = config.channels.allowed;
  const isAllowedChannel = allowedChannels.includes(message.channel.id);

  const botMentioned = message.mentions.has(client.user) || message.reference;

  // Jika bot di-mention atau membalas pesan, atau berada di channel yang diizinkan
  if (isAllowedChannel || botMentioned) {
    try {
      const response = await getGoogleGeminiResponse(message.content);

      // Balasan ke pengguna dengan note tambahan
      const replyContent = `${response}-# Harap dicatat bahwa informasi ini mungkin tidak benar | Gemini`;
      await message.reply(replyContent);
    } catch (error) {
      console.error('Error processing message:', error);
      await message.reply('Hmm, Sepertinya Aku lagi Kebingungan..... ~_~');  // Pesan fallback
    }
  }
});

// Login bot ke Discord
client.login(process.env.DISCORD_TOKEN);
