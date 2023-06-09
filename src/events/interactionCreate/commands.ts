import commands from "../../commands";
import { ICommand } from "../../types";
import { EditReply, Reply, event } from "../../utils";
import { Events } from "discord.js";

const allCommands = commands.map(({ commands }) => commands).flat();

const allCommandsMap = new Map<string, ICommand>(
  allCommands.map((command) => [command.meta.name, command])
);

export default event(
  Events.InteractionCreate,
  async ({ log, client }, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    try {
      const commandName = interaction.commandName;
      const command = allCommandsMap.get(commandName);

      if (!command) throw new Error(`Unknown command: ${commandName}`);

      await command.exec({
        client,
        interaction,
        log(...args) {
          log(`[${command.meta.name}]`, ...args);
        },
      });
    } catch (error) {
      log(["[Command Error]", error]);

      if (interaction.deferred)
        return EditReply.error(interaction, "Something went wrong 😔");

      return Reply.error(interaction, "Something went wrong 😔", false);
    }
  }
);
