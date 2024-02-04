#!/usr/bin/env bun

import OpenAI from "openai";
import { $ } from "bun";
import chalk from "chalk";
import os from "os";
import path from "path";

const iforget = `
 _  __                      _   
(_)/ _| ___  _ __ __ _  ___| |_ 
| | |_ / _ \\| '__/ _\` |/ _ \\ __|
| |  _| (_) | | | (_| |  __/ |_ 
|_|_|  \\___/|_|  \\__, |\\___|\\__|
                 |___/          `;

const apiKeyFilePath = path.join(os.homedir(), ".your_script_api_key");

async function getOrRequestApiKey(): Promise<string> {
  if (await Bun.file(apiKeyFilePath).exists()) {
    const apiKey = await Bun.file(apiKeyFilePath).text();
    if (apiKey.startsWith("sk-") && apiKey.length === 51) {
      return apiKey;
    } else {
      console.log(
        chalk.red(
          "The existing API key is invalid. Please enter a valid API key."
        )
      );
    }
  }

  console.log(chalk.magentaBright(iforget));
  console.log(
    chalk.yellow("Please enter your OpenAI API key (THIS GETS STORED LOCALLY):")
  );

  let apiKey = "";
  while (true) {
    apiKey = await new Promise<string>((resolve) => {
      const stdin = process.openStdin();
      stdin.addListener("data", function (d) {
        resolve(d.toString().trim());
        stdin.pause(); // Close the stdin stream to avoid keeping the process open
      });
    });

    if (apiKey.startsWith("sk-") && apiKey.length === 51) {
      break;
    } else {
      console.log(chalk.red("Invalid API key. Please try again."));
    }
  }

  Bun.write(apiKeyFilePath, apiKey);
  console.log(
    chalk.green(
      `API key saved to ${apiKeyFilePath}. You won't need to enter it again.`
    )
  );
  return apiKey;
}

(async () => {
  const apiKey = await getOrRequestApiKey();

  const openai = new OpenAI({
    apiKey: apiKey, // Use the loaded or input API key
  });

  async function generateCommand(instruction: string) {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that converts user instructions into executable terminal commands. Output only the terminal command corresponding to the instruction. Make sure you DO NOT include ANY markdown formatting such as code blocks. DO NOT specify the programming language, or explain the command's purpose. Pay close attention to the user's instructions.",
        },
        { role: "user", content: instruction }, // Use the instruction from the command line
      ],
      model: "gpt-4-1106-preview",
    });

    console.log(chalk.cyan("AI responsed successfully!"));
    console.log(chalk.green(`> ${completion.choices[0].message.content}`));
    return completion.choices[0].message.content;
  }

  // Access the user's command instruction from the command line arguments
  const userInstruction = process.argv[2]; // The third element in process.argv will be the user's instruction

  if (!userInstruction) {
    console.error(chalk.red("Please provide a command instruction."));
    process.exit(1);
  }

  // Generate and execute the command based on the user's instruction
  async function executeUserCommand() {
    let aiGeneratedCommand = await generateCommand(userInstruction);

    // Write the command to a temporary shell script
    const scriptContent = `#!/bin/bash\n${aiGeneratedCommand}`;
    const scriptPath = "./tempScript.sh";
    await Bun.write(scriptPath, scriptContent);

    // Make the script executable
    await $`chmod +x ${scriptPath}`;

    // Execute the script
    await $`./${scriptPath}`;

    // Remove the script after execution (optional)
    await $`rm ${scriptPath}`;
  }

  executeUserCommand().catch((error) => console.error(chalk.red(error)));
})();
