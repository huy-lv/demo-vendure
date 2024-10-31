import * as path from 'path';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import { PluginCommonModule, Type, VendurePlugin } from '@vendure/core';

import { ADMIN_UI_PLUGI_PLUGIN_OPTIONS } from './constants';
import { PluginInitOptions } from './types';
@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [{ provide: ADMIN_UI_PLUGI_PLUGIN_OPTIONS, useFactory: () => AdminUiPlugiPlugin.options }],
    configuration: config => {
        // Plugin-specific configuration
        // such as custom fields, custom permissions,
        // strategies etc. can be configured here by
        // modifying the `config` object.
        return config;
    },
    compatibility: '^3.0.0',
})
export class AdminUiPlugiPlugin {
    static options: PluginInitOptions;

    static init(options: PluginInitOptions): Type<AdminUiPlugiPlugin> {
        this.options = options;
        return AdminUiPlugiPlugin;
    }

    static ui: AdminUiExtension = {
        id: 'admin-ui-plugi-ui',
        extensionPath: path.join(__dirname, 'ui'),
        routes: [{ route: 'admin-ui-plugi', filePath: 'routes.ts' }],
        providers: ['providers.ts'],
    };
}
