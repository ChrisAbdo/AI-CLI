# iforget AI CLI Assistant

iforget is a command-line interface tool that uses OpenAI's GPT-4 to convert user instructions into executable terminal commands. Who remembers every command anyway?

## Prerequisites

- [Bun](https://bun.sh) as the JavaScript runtime.
- An OpenAI API key.

## Installation

To install dependencies, run:

```bash
bun install
```

## Configuration

Before using CLI-AI, you need to provide your OpenAI API key. The key will be requested upon your first run and stored locally at `~/.your_script_api_key`.

## Usage

To run CLI-AI, use the following command with your instruction:

```bash
bun run index.ts "your instruction here"
```

The tool will generate a terminal command based on your instruction and execute it.

## Example

```bash
bun run index.ts "list all files in the current directory"
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Please submit a pull request if you would like to contribute to this project.
