'use strict';

var obsidian = require('obsidian');

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var MyPlugin = /** @class */ (function (_super) {
    __extends(MyPlugin, _super);
    function MyPlugin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyPlugin.prototype.onInit = function () {
    };
    MyPlugin.prototype.onload = function () {
        var _this = this;
        console.log('loading plugin');
		// Huy
        this.addRibbonIcon('dice', 'Sample Plugin', function () {
            new obsidian.Notice('This is a notice!');
        });
        this.addStatusBarItem().setText('Status Bar Text');
        this.addCommand({
            id: 'open-sample-modal',
            name: 'Open Sample Modal',
            // callback: () => {
            // 	console.log('Simple Callback');
            // },
            checkCallback: function (checking) {
                var leaf = _this.app.workspace.activeLeaf;
                if (leaf) {
                    if (!checking) {
                        new SampleModal(_this.app).open();
                    }
                    return true;
                }
                return false;
            }
        });
        this.addSettingTab(new SampleSettingTab(this.app, this));
    };
    MyPlugin.prototype.onunload = function () {
        console.log('unloading plugin');
    };
    return MyPlugin;
}(obsidian.Plugin));
var SampleModal = /** @class */ (function (_super) {
    __extends(SampleModal, _super);
    function SampleModal(app) {
        return _super.call(this, app) || this;
    }
    SampleModal.prototype.onOpen = function () {
        var contentEl = this.contentEl;
        contentEl.setText('Woah!');
    };
    SampleModal.prototype.onClose = function () {
        var contentEl = this.contentEl;
        contentEl.empty();
    };
    return SampleModal;
}(obsidian.Modal));
var SampleSettingTab = /** @class */ (function (_super) {
    __extends(SampleSettingTab, _super);
    function SampleSettingTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SampleSettingTab.prototype.display = function () {
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl('h2', { text: 'Settings for my awesome plugin.' });
        new obsidian.Setting(containerEl)
            .setName('Setting #1')
            .setDesc('It\'s a secret')
            .addText(function (text) { return text.setPlaceholder('Enter your secret')
            .setValue('')
            .onChange(function (value) {
            console.log('Secret: ' + value);
        }); });
    };
    return SampleSettingTab;
}(obsidian.PluginSettingTab));

module.exports = MyPlugin;
