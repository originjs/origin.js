import { buildTestProject } from './buildTestProject'
import { createTestProject } from './createTestProject'
import { createTestProjectServer } from './createTestProjectServer'
import { getConfigs, defaultOptionsForTest } from './getPluginConfig'
import { runSync, CLI_PATH, DEMO_PATH, SPAWN_OPTION } from './execCommands'

export default {
    buildTestProject,
    createTestProject,
    createTestProjectServer,
    getConfigs,
    defaultOptionsForTest,
    runSync,
    CLI_PATH,
    DEMO_PATH,
    SPAWN_OPTION,
}
