#!/usr/bin/env bun

import OpenAI from "openai";
import { $ } from "bun";
import chalk from "chalk";
import path from "path";
import { unlink } from "node:fs/promises";
import os from "os";

type MessageFunction = (path: string) => string;

interface Messages {
  resetSuccess: string;
  apiKeyDeleted: MessageFunction;
  noApiKey: string;
  invalidApiKey: string;
  enterApiKey: string;
  apiKeySaved: MessageFunction;
  invalidInput: string;
}

// Constants for configuration and messages
const HOME_DIR = os.homedir();
const API_KEY_FILE_PATH = path.join(HOME_DIR, ".your_script_api_key");
const API_KEY_PATTERN = /^sk-\w{48}$/; // Updated for clarity and security
const MESSAGES: Messages = {
  resetSuccess: chalk.green(
    "API key reset successfully. Please restart the script with a new instruction to enter a new API key."
  ),
  apiKeyDeleted: (path: string) =>
    chalk.yellow(`Note: The API key file was deleted from ${path}`),
  noApiKey: chalk.yellow("No API key to reset."),
  invalidApiKey: chalk.red(
    "The existing API key is invalid. Please enter a valid API key."
  ),
  enterApiKey: chalk.yellow(
    "Please enter your OpenAI API key (THIS GETS STORED LOCALLY):"
  ),
  apiKeySaved: (path: string) =>
    chalk.green(`API key saved to ${path}. You won't need to enter it again.`),
  invalidInput: chalk.red("Invalid API key. Please try again."),
};
const HELP_MESSAGE =
  chalk.yellowBright("\niforget AI CLI\n") +
  chalk.white(
    'Usage: npx iforget "instruction"' +
      "\nReset API key: npx iforget reset\n\n" +
      "-- This CLI tool uses OpenAI's GPT-4 to convert user instructions into executable terminal commands.\n" +
      "-- The tool will prompt you to enter your OpenAI API key the first time you run it, and then store it locally.\n" +
      "-- You can reset the API key by running `npx iforget reset`.\n" +
      "-- The tool will execute the command generated by GPT-4, so use it with caution.\n" +
      "-- For more information, DM @chrisjabdo on Twitter / X.\n"
  );
const ASCII_ART = `
 _  __                      _   
(_)/ _| ___  _ __ __ _  ___| |_ 
| | |_ / _ \\| '__/ _\` |/ _ \\ __|
| |  _| (_) | | | (_| |  __/ |_ 
|_|_|  \\___/|_|  \\__, |\\___|\\__|
                 |___/          `;

async function deleteApiKeyFile() {
  if (await Bun.file(API_KEY_FILE_PATH).exists()) {
    await unlink(API_KEY_FILE_PATH);
    console.log(MESSAGES.resetSuccess);
    console.log(MESSAGES.apiKeyDeleted(API_KEY_FILE_PATH));
    process.exit(0);
  } else {
    console.log(MESSAGES.noApiKey);
  }
}

async function getOrRequestApiKey(): Promise<string> {
  if (await Bun.file(API_KEY_FILE_PATH).exists()) {
    const apiKey = await Bun.file(API_KEY_FILE_PATH).text();
    if (API_KEY_PATTERN.test(apiKey)) {
      return apiKey;
    } else {
      console.log(MESSAGES.invalidApiKey);
    }
  }
  console.log(ASCII_ART);
  console.log(
    "WARNING: This script will automatically execute generated commands. Use with caution."
  );
  console.log(
    chalk.magentaBright(
      "Welcome to the IForget CLI! Please follow the instructions.\n"
    )
  );
  return requestApiKey();
}

async function requestApiKey(): Promise<string> {
  console.log(MESSAGES.enterApiKey);
  let apiKey = "";
  while (true) {
    apiKey = await new Promise<string>((resolve) => {
      const stdin = process.openStdin();
      stdin.addListener("data", function (d) {
        resolve(d.toString().trim());
        stdin.pause();
      });
    });

    if (API_KEY_PATTERN.test(apiKey)) {
      Bun.write(API_KEY_FILE_PATH, apiKey);
      console.log(MESSAGES.apiKeySaved(API_KEY_FILE_PATH));
      return apiKey;
    } else {
      console.log(MESSAGES.invalidInput);
    }
  }
}

async function generateCommand(instruction: string): Promise<string> {
  const apiKey = await getOrRequestApiKey();
  const openai = new OpenAI({ apiKey });
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that converts user instructions into executable terminal commands. Output only the terminal command corresponding to the instruction. Make sure you DO NOT include ANY markdown formatting such as code blocks. DO NOT specify the programming language, or explain the command's purpose. Pay close attention to the user's instructions.",
      },
      {
        role: "user",
        content: instruction,
      },
    ],
    model: "gpt-4-1106-preview",
  });

  if (completion.choices?.[0]?.message?.content) {
    console.log(chalk.cyan("AI responded successfully!"));
    return completion.choices[0].message.content;
  } else {
    throw new Error("Failed to generate command from AI.");
  }
}

async function executeUserCommand(instruction: string) {
  try {
    const command = await generateCommand(instruction);
    console.log(chalk.green(`> ${command}`));
    // Execute the command using Bun's $ shell utility
    const scriptPath = "./tempScript.sh";
    await Bun.write(scriptPath, `#!/bin/bash\n${command}`);
    await $`chmod +x ${scriptPath}`;
    await $`./${scriptPath}`;
    await $`rm ${scriptPath}`;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(chalk.red(`Error executing command: ${error.message}`));
    } else {
      console.error(chalk.red(`An unknown error occurred.`));
    }
  }
}

async function main() {
  if (process.argv.includes("reset")) {
    await deleteApiKeyFile();
  } else if (process.argv.includes("help")) {
    console.log(HELP_MESSAGE);
  } else {
    const instruction = process.argv[2];
    if (!instruction) {
      console.error(chalk.red("Please provide an instruction."));
      console.error(
        chalk.yellow('For more information, run "npx iforget help"')
      );
      process.exit(1);
    }
    await executeUserCommand(instruction);
  }
}

main().catch((error) => {
  console.error(chalk.red(`Unexpected error: ${error.message}`));
  process.exit(1);
});
