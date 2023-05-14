import { MusicActions } from "../../config/music";
import { Player } from "discord-player";
import { SlashCommandBuilder } from "discord.js";
import { Reply, command } from "../../utils";

const meta = new SlashCommandBuilder()
  .setName("stop")
  .setDescription("Leaves the channel and clears the queue");

export default command(meta, async ({ interaction, client }) => {
  const player = Player.singleton(client);

  const wasStoped = await MusicActions.stop(player, interaction);

  if (!wasStoped)
    return interaction.reply(Reply.error("The Queue is already empty."));

  return interaction.reply(Reply.success("Bye 👋"));
});
