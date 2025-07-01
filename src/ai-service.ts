/**
 * AI服务类 - 负责与AI API交互
 */

interface AIConfig {
    apiKey: string;
    baseUrl: string;
    model: string;
    maxTokens: number;
    temperature: number;
}

interface AIResponse {
    success: boolean;
    data?: string;
    error?: string;
}

export class AIService {
    private config: AIConfig;

    constructor(config: Partial<AIConfig> = {}) {
        this.config = {
            apiKey: config.apiKey || "",
            baseUrl: config.baseUrl || "https://api.openai.com/v1",
            model: config.model || "gpt-3.5-turbo",
            maxTokens: config.maxTokens || 1000,
            temperature: config.temperature || 0.7
        };
    }

    /**
     * 更新配置
     */
    updateConfig(config: Partial<AIConfig>) {
        this.config = { ...this.config, ...config };
    }

    /**
     * 改进写作
     */
    async improveWriting(text: string): Promise<AIResponse> {
        const prompt = `Please improve the following text to make it more clear, professional, and well-structured. Keep the original meaning but enhance the writing quality:

${text}`;
        
        return this.callAI(prompt);
    }

    /**
     * 语法检查
     */
    async fixGrammar(text: string): Promise<AIResponse> {
        const prompt = `Please fix any grammar, spelling, and punctuation errors in the following text. Only correct errors without changing the meaning or style:

${text}`;
        
        return this.callAI(prompt);
    }

    /**
     * 续写内容
     */
    async continueWriting(text: string): Promise<AIResponse> {
        const prompt = `Please continue writing the following text. Maintain the same tone, style, and topic. Add 2-3 more sentences that naturally flow from the existing content:

${text}`;
        
        return this.callAI(prompt);
    }

    /**
     * 文本摘要
     */
    async summarizeText(text: string): Promise<AIResponse> {
        const prompt = `Please provide a concise summary of the following text, capturing the main points and key information:

${text}`;
        
        return this.callAI(prompt);
    }

    /**
     * 翻译文本
     */
    async translateText(text: string, targetLanguage: string): Promise<AIResponse> {
        const prompt = `Please translate the following text to ${targetLanguage}:

${text}`;
        
        return this.callAI(prompt);
    }

    /**
     * 语气转换
     */
    async changeTone(text: string, tone: string): Promise<AIResponse> {
        const prompt = `Please rewrite the following text in a ${tone} tone while keeping the same meaning:

${text}`;
        
        return this.callAI(prompt);
    }

    /**
     * 简化文本
     */
    async simplifyText(text: string): Promise<AIResponse> {
        const prompt = `Please simplify the following text to make it easier to understand, using simpler words and shorter sentences:

${text}`;
        
        return this.callAI(prompt);
    }

    /**
     * 头脑风暴
     */
    async brainstorm(topic: string): Promise<AIResponse> {
        const prompt = `Please generate 5-7 creative ideas related to the following topic. Provide brief descriptions for each idea:

Topic: ${topic}`;
        
        return this.callAI(prompt);
    }

    /**
     * 调用AI API
     */
    private async callAI(prompt: string): Promise<AIResponse> {
        if (!this.config.apiKey) {
            return {
                success: false,
                error: "API密钥未配置，请在设置中配置API密钥"
            };
        }

        try {
            const response = await fetch(`${this.config.baseUrl}/chat/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.config.apiKey}`
                },
                body: JSON.stringify({
                    model: this.config.model,
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    max_tokens: this.config.maxTokens,
                    temperature: this.config.temperature
                })
            });

            if (!response.ok) {
                throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.choices && data.choices.length > 0) {
                return {
                    success: true,
                    data: data.choices[0].message.content.trim()
                };
            } else {
                throw new Error("API返回的数据格式异常");
            }
        } catch (error) {
            console.error("AI API调用错误:", error);
            return {
                success: false,
                error: error instanceof Error ? error.message : "未知错误"
            };
        }
    }

    /**
     * 测试API连接
     */
    async testConnection(): Promise<AIResponse> {
        return this.callAI("请回复\"连接成功\"");
    }
}
