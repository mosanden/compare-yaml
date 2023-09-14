const { program } = require("commander");
const yaml = require("js-yaml");
const fs = require("fs");

program
  .name("compare-yaml")
  .description("Compare the structure or values of two YAML files.")
  .version("0.1.0");

program
  .command("struct")
  .description(
    "Output those keys of the first YAML document that are not contained in the second one"
  )
  .argument("<first document>", "path to first YAML file")
  .argument("<second document>", "path to second YAML file")
  .action((doc1Name, doc2Name, _) => {
    try {
      const doc1 = yaml.load(fs.readFileSync(doc1Name, "utf8"));
      const doc2 = yaml.load(fs.readFileSync(doc2Name, "utf8"));
      console.log(objectsHaveSameKeysDeep("", doc1, doc2));
    } catch (e) {
      console.log(e);
    }
  });

program
  .command("values")
  .description(
    "Output those key-value pairs of the first document that differ from the second document"
  )
  .argument("<first document>", "path to first YAML file")
  .argument("<second document>", "path to second YAML file")
  .option(
    "-c, --only-common",
    "exclude values that only appear in one of the two documents from comparison"
  )
  .action((doc1Name, doc2Name, options) => {
    const onlyCommon = options.onlyCommon ? true : false;
    try {
      const doc1 = yaml.load(fs.readFileSync(doc1Name, "utf8"));
      const doc2 = yaml.load(fs.readFileSync(doc2Name, "utf8"));
      console.log(objectsHaveSameValuesDeep("", doc1, doc2, onlyCommon));
    } catch (e) {
      console.log(e);
    }
  });

function objectsHaveSameKeysDeep(parent, a, b) {
  const aKeys = Object.keys(a).sort();
  const bKeys = Object.keys(b).sort();
  if (JSON.stringify(aKeys) !== JSON.stringify(bKeys)) {
    for (const key of aKeys) {
      if (!(key in b)) console.log(parent + "." + key);
    }
  }
  for (const key of aKeys) {
    if (
      typeof a[key] === "object" &&
      a[key] !== null &&
      typeof b[key] === "object" &&
      b[key] !== null
    )
      objectsHaveSameKeysDeep(parent + "." + key, a[key], b[key]);
  }
}

function objectsHaveSameValuesDeep(parent, a, b, onlyCommon) {
  const aKeys = Object.keys(a).sort();
  for (const key of aKeys) {
    if (
      (!onlyCommon || (onlyCommon && key in b)) &&
      a[key] !== b[key] &&
      typeof a[key] !== "object"
    ) {
      console.log(parent + "." + key + " = " + a[key]);
    }
  }

  for (const key of aKeys) {
    if (
      typeof a[key] === "object" &&
      a[key] !== null &&
      typeof b[key] === "object" &&
      b[key] !== null
    )
      objectsHaveSameValuesDeep(parent + "." + key, a[key], b[key], onlyCommon);
  }
}

program.parse();
