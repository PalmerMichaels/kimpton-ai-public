#!/usr/bin/env node
import { formatPlanAsText } from "./format";
import { buildStayPlan, listCatalog } from "./planner";

interface CliOptions {
  guest?: string;
  property?: string;
  days: number;
  format: "json" | "text";
  help: boolean;
  list: boolean;
}

function main(): void {
  try {
    const options = parseArgs(process.argv.slice(2));

    if (options.help) {
      console.log(helpText());
      return;
    }

    if (options.list) {
      console.log(JSON.stringify(listCatalog(), null, 2));
      return;
    }

    if (!options.guest || !options.property) {
      throw new Error("Both --guest and --property are required unless --list or --help is used.");
    }

    const plan = buildStayPlan({
      guestId: options.guest,
      propertyId: options.property,
      days: options.days
    });

    console.log(options.format === "json" ? JSON.stringify(plan, null, 2) : formatPlanAsText(plan));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${message}`);
    console.error("Run with --help for usage.");
    process.exitCode = 1;
  }
}

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    days: 2,
    format: "text",
    help: false,
    list: false
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    switch (arg) {
      case "--guest":
        options.guest = readValue(args, index, arg);
        index += 1;
        break;
      case "--property":
        options.property = readValue(args, index, arg);
        index += 1;
        break;
      case "--days":
        options.days = Number(readValue(args, index, arg));
        index += 1;
        break;
      case "--format": {
        const format = readValue(args, index, arg);
        if (format !== "json" && format !== "text") {
          throw new Error("--format must be either 'json' or 'text'.");
        }
        options.format = format;
        index += 1;
        break;
      }
      case "--help":
      case "-h":
        options.help = true;
        break;
      case "--list":
        options.list = true;
        break;
      default:
        throw new Error(`Unknown argument '${arg}'.`);
    }
  }

  return options;
}

function readValue(args: string[], index: number, flag: string): string {
  const value = args[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value.`);
  }

  return value;
}

function helpText(): string {
  return [
    "Boutique Stay Assistant Demo",
    "",
    "Clean-room TypeScript CLI using synthetic hospitality data and mocked planning logic.",
    "",
    "Usage:",
    "  npm run build",
    "  npm run start -- --list",
    "  npm run start -- --guest luna --property harbor --days 2 --format text",
    "  npm run start -- --guest avery --property market --days 1 --format json",
    "",
    "Options:",
    "  --guest <id>       Synthetic guest id",
    "  --property <id>    Synthetic property id",
    "  --days <1-5>       Number of itinerary days, default 2",
    "  --format <format>  text or json, default text",
    "  --list             Print available synthetic guests and properties",
    "  --help             Show this help"
  ].join("\n");
}

main();
