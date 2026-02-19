# Sorting Algorithm Package

This repository contains a simple TypeScript module used by Smarter Technology's robotic arm to sort packages into different stacks based on their volume and mass.

## Installation

```bash
npm install
```

## Usage

The primary function is `sort(width, height, length, mass)` which returns one of:

- `"STANDARD"` - normal packages
- `"SPECIAL"` - bulky **or** heavy packages
- `"REJECTED"` - both bulky and heavy packages

## Development

Compile the TypeScript:

```bash
npm run build
```

Run tests:

```bash
npm test
```
