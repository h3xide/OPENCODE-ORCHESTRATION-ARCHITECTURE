import fs from "node:fs"
import path from "node:path"

const root = process.cwd()
const pluginPath = path.join(root, ".opencode", "plugins", "picker-glm-architecture.js")
const plugin = fs.readFileSync(pluginPath, "utf8")
const workers = [
  "general",
  "explore",
  "scout",
  "glm-researcher",
  "glm-ui-qa",
  "test-engineer",
  "glm-tester",
  "glm-reviewer",
  "glm-quick",
  "glm-implementer",
  "glm-explorer",
  "glm-context-curator",
  "debugger",
  "code-reviewer",
  "architect",
]

const missing = workers.filter(
  (name) => !["general", "explore"].includes(name) &&
    !fs.existsSync(path.join(root, ".opencode", "agents", `${name}.md`)),
)

if (missing.length > 0) {
  throw new Error(`Missing worker definitions: ${missing.join(", ")}`)
}

const boundedWorkers = workers.filter((name) => !["general", "explore"].includes(name))
for (const name of boundedWorkers) {
  const content = fs.readFileSync(path.join(root, ".opencode", "agents", `${name}.md`), "utf8")
  if (!/^steps:\s*\d+$/m.test(content)) {
    throw new Error(`Worker ${name} must retain an explicit step ceiling`)
  }
  if (!content.includes("LIMIT_REACHED")) {
    throw new Error(`Worker ${name} must define LIMIT_REACHED continuation semantics`)
  }
  if (!/^permission:$/m.test(content) || !/^\s+task:\s+deny$/m.test(content)) {
    throw new Error(`Worker ${name} must enforce a permission boundary and deny nested task delegation`)
  }
}

const orchestrator = fs.readFileSync(
  path.join(root, ".opencode", "agents", "orchestrator.md"),
  "utf8",
)
if (/^steps:/m.test(orchestrator)) {
  throw new Error("The primary orchestrator must not have a low worker-style step ceiling")
}

if (plugin.includes("config.model") || plugin.includes("orchestrator.model")) {
  throw new Error("The architecture plugin must not rewrite the selected orchestrator model")
}

const requiredFiles = [
  "README.md",
  "AGENTS.md",
  "SECURITY.md",
  "opencode.example.jsonc",
  "docs/architecture/architecture.md",
  "docs/architecture/security-model.md",
  "docs/architecture/measurement.md",
  "docs/examples/agent/tasks/EXAMPLE-Q02.md",
  "docs/examples/agent/specs/post-upgrade-visual-qa.md",
  "docs/examples/agent/domains/selector.md",
]

const missingRequired = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)))
if (missingRequired.length > 0) {
  throw new Error(`Missing required reference files: ${missingRequired.join(", ")}`)
}

console.log("Reference structure validation passed")
