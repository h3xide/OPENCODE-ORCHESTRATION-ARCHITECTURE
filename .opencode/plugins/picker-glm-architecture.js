import { existsSync } from "node:fs"
import { join } from "node:path"

const GLM_MODEL = "zai-coding-plan/glm-5.3-flash"
const OPT_OUT_FILE = join(".opencode", "picker-glm-opt-out")

const workerAgents = [
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

export default async function pickerGlmArchitecture({ worktree, directory }) {
  const projectRoots = [...new Set([directory, worktree].filter(Boolean))]

  return {
    config(config) {
      if (projectRoots.some((root) => existsSync(join(root, OPT_OUT_FILE)))) return

      // Preserve explicit project choices. Add only the safety default.
      config.small_model ??= GLM_MODEL
      config.default_agent ??= "orchestrator"
      config.disabled_providers = [
        ...new Set([...(config.disabled_providers ?? []), "opencode-go"]),
      ]

      for (const name of workerAgents) {
        config.agent ??= {}
        config.agent[name] ??= {}
        config.agent[name].model ??= GLM_MODEL
      }

      config.agent ??= {}
      config.agent.orchestrator ??= {}
      config.agent.orchestrator.mode ??= "primary"
      config.agent.orchestrator.disable ??= false
    },
  }
}
