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

if (/config\.model\s*=|agent\.orchestrator\.model\s*=/.test(plugin)) {
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
