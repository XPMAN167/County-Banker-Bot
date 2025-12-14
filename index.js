const { Client, GatewayIntentBits, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
const fs = require("fs");
const path = require("path");

const licensesPath = path.join(__dirname, "licenses.json");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once("ready", () => {
  console.log("✅ License bot online");
});

client.on("interactionCreate", async interaction => {

  // DROPDOWN MENU
  if (interaction.isStringSelectMenu()) {
    if (interaction.customId === "p_247413825647677471") {
      const selected = interaction.values[0];

      // VERIFY OPTION
      if (selected === "cmTGyaKtnh") {
        const modal = new ModalBuilder()
          .setCustomId("verify_modal")
          .setTitle("Verify License");

        const input = new TextInputBuilder()
          .setCustomId("license_key")
          .setLabel("Enter your license key")
          .setStyle(TextInputStyle.Short)
          .setRequired(true);

        modal.addComponents(
          new ActionRowBuilder().addComponents(input)
        );

        await interaction.showModal(modal);
      }

      // CHECK STATUS
      if (selected === "Z8Lj5PBXw4") {
        await interaction.reply({ content: "📄 No license found.", ephemeral: true });
      }

      // OTHER
      if (selected === "tKE8MdUjtt") {
        await interaction.reply({ content: "❓ Please contact support.", ephemeral: true });
      }
    }
  }

  // MODAL SUBMIT
  if (interaction.isModalSubmit()) {
    if (interaction.customId === "verify_modal") {
      const key = interaction.fields.getTextInputValue("license_key").trim();
      const licenses = JSON.parse(fs.readFileSync(licensesPath, "utf8"));

      if (!licenses[key]) {
        return interaction.reply({ content: "❌ Invalid license key.", ephemeral: true });
      }

      if (licenses[key].used) {
        return inte
