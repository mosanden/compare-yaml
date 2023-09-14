# compare-yaml

This CLI tool can compare the values or structure of two YAML files. It will output the keys/values of the first file that differ from the second file.

## Usage

To compare the structure:

```bash
compare-yaml struct path/to/first/file path/to/second/file
```

To compare the values:

```bash
compare-yaml values path/to/first/file path/to/second/file
```

## Develop

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run compare-yaml.js
```

To build:

```bash
bun build --compile compare-yaml.js --outfile=compare-yaml
```

This project was created using `bun init` in bun v1.0.1. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
