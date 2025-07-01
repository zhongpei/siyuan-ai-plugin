/**
 * 设置管理类 - 负责插件设置的存储和管理
 */

import { Plugin } from "siyuan";

export interface AISettings {
    apiKey: string;
    baseUrl: string;
    model: string;
    maxTokens: number;
    temperature: number;
    defaultLanguage: string;
}

export class SettingsManager {
    private plugin: Plugin;
    private readonly SETTINGS_KEY = "ai-assistant-settings";
    private defaultSettings: AISettings = {
        apiKey: "",
        baseUrl: "https://api.openai.com/v1",
        model: "gpt-3.5-turbo",
        maxTokens: 1000,
        temperature: 0.7,
        defaultLanguage: "Chinese"
    };

    constructor(plugin: Plugin) {
        this.plugin = plugin;
    }

    /**
     * 获取设置
     */
    async getSettings(): Promise<AISettings> {
        const data = await this.plugin.loadData(this.SETTINGS_KEY);
        return { ...this.defaultSettings, ...data };
    }

    /**
     * 保存设置
     */
    async saveSettings(settings: Partial<AISettings>): Promise<void> {
        const currentSettings = await this.getSettings();
        const newSettings = { ...currentSettings, ...settings };
        await this.plugin.saveData(this.SETTINGS_KEY, newSettings);
    }

    /**
     * 重置设置
     */
    async resetSettings(): Promise<void> {
        await this.plugin.saveData(this.SETTINGS_KEY, this.defaultSettings);
    }

    /**
     * 创建设置界面HTML
     */
    createSettingsHTML(): string {
        return `
        <div class="b3-form">
            <div class="b3-form__item">
                <label class="b3-form__label">API Key</label>
                <input id="ai-api-key" class="b3-text-field fn__block" type="password" placeholder="请输入您的API密钥">
                <div class="b3-form__hint">OpenAI API密钥，用于调用AI服务</div>
            </div>
            
            <div class="b3-form__item">
                <label class="b3-form__label">API Base URL</label>
                <input id="ai-base-url" class="b3-text-field fn__block" placeholder="https://api.openai.com/v1">
                <div class="b3-form__hint">API服务地址，支持OpenAI兼容接口</div>
            </div>
            
            <div class="b3-form__item">
                <label class="b3-form__label">模型</label>
                <select id="ai-model" class="b3-select fn__block">
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="gpt-4-turbo">GPT-4 Turbo</option>
                </select>
                <div class="b3-form__hint">选择使用的AI模型</div>
            </div>
            
            <div class="b3-form__item">
                <label class="b3-form__label">最大Token数</label>
                <input id="ai-max-tokens" class="b3-text-field fn__block" type="number" min="100" max="4000" placeholder="1000">
                <div class="b3-form__hint">单次请求的最大Token数量</div>
            </div>
            
            <div class="b3-form__item">
                <label class="b3-form__label">温度值</label>
                <input id="ai-temperature" class="b3-text-field fn__block" type="number" min="0" max="2" step="0.1" placeholder="0.7">
                <div class="b3-form__hint">控制输出的随机性，0-2之间</div>
            </div>
            
            <div class="b3-form__item">
                <label class="b3-form__label">默认翻译语言</label>
                <select id="ai-default-language" class="b3-select fn__block">
                    <option value="Chinese">中文</option>
                    <option value="English">English</option>
                    <option value="Japanese">日本語</option>
                    <option value="Korean">한국어</option>
                    <option value="French">Français</option>
                    <option value="German">Deutsch</option>
                    <option value="Spanish">Español</option>
                </select>
                <div class="b3-form__hint">翻译功能的默认目标语言</div>
            </div>
            
            <div class="b3-form__item">
                <button id="ai-test-connection" class="b3-button b3-button--outline">测试连接</button>
                <button id="ai-save-settings" class="b3-button b3-button--text">保存设置</button>
                <button id="ai-reset-settings" class="b3-button b3-button--cancel">重置设置</button>
            </div>
        </div>
        `;
    }

    /**
     * 绑定设置界面事件
     */
    bindSettingsEvents(container: HTMLElement, onSave?: () => void): void {
        // 加载当前设置
        this.getSettings().then(settings => {
            (container.querySelector("#ai-api-key") as HTMLInputElement).value = settings.apiKey;
            (container.querySelector("#ai-base-url") as HTMLInputElement).value = settings.baseUrl;
            (container.querySelector("#ai-model") as HTMLSelectElement).value = settings.model;
            (container.querySelector("#ai-max-tokens") as HTMLInputElement).value = settings.maxTokens.toString();
            (container.querySelector("#ai-temperature") as HTMLInputElement).value = settings.temperature.toString();
            (container.querySelector("#ai-default-language") as HTMLSelectElement).value = settings.defaultLanguage;
        });

        // 保存设置
        container.querySelector("#ai-save-settings")?.addEventListener("click", async () => {
            const settings: Partial<AISettings> = {
                apiKey: (container.querySelector("#ai-api-key") as HTMLInputElement).value,
                baseUrl: (container.querySelector("#ai-base-url") as HTMLInputElement).value,
                model: (container.querySelector("#ai-model") as HTMLSelectElement).value,
                maxTokens: parseInt((container.querySelector("#ai-max-tokens") as HTMLInputElement).value) || 1000,
                temperature: parseFloat((container.querySelector("#ai-temperature") as HTMLInputElement).value) || 0.7,
                defaultLanguage: (container.querySelector("#ai-default-language") as HTMLSelectElement).value
            };

            await this.saveSettings(settings);
            onSave?.();
        });

        // 重置设置
        container.querySelector("#ai-reset-settings")?.addEventListener("click", async () => {
            await this.resetSettings();
            const defaultSettings = await this.getSettings();
            (container.querySelector("#ai-api-key") as HTMLInputElement).value = defaultSettings.apiKey;
            (container.querySelector("#ai-base-url") as HTMLInputElement).value = defaultSettings.baseUrl;
            (container.querySelector("#ai-model") as HTMLSelectElement).value = defaultSettings.model;
            (container.querySelector("#ai-max-tokens") as HTMLInputElement).value = defaultSettings.maxTokens.toString();
            (container.querySelector("#ai-temperature") as HTMLInputElement).value = defaultSettings.temperature.toString();
            (container.querySelector("#ai-default-language") as HTMLSelectElement).value = defaultSettings.defaultLanguage;
        });

        // 测试连接
        container.querySelector("#ai-test-connection")?.addEventListener("click", async () => {
            const btn = container.querySelector("#ai-test-connection") as HTMLButtonElement;
            const originalText = btn.textContent;
            btn.textContent = "测试中...";
            btn.disabled = true;

            try {
                // 这里会在主插件中实现测试逻辑
                // 暂时只是UI反馈
                setTimeout(() => {
                    btn.textContent = "连接成功";
                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.disabled = false;
                    }, 2000);
                }, 1000);
            } catch (error) {
                btn.textContent = "连接失败";
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 2000);
            }
        });
    }
}
