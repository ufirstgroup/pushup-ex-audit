import { PluginConfig, PluginMeta } from '@code-pushup/models';
import { ElixirAuditPluginOptions } from './types/index.js';
export declare const pluginMeta: PluginMeta;
export declare function create(options: ElixirAuditPluginOptions): Promise<PluginConfig>;
export default create;
