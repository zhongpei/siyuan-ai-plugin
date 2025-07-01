/**
 * 文本处理工具类 - 负责获取和处理SiYuan中的文本内容
 */

import { fetchPost } from "siyuan";

export interface BlockInfo {
    id: string;
    content: string;
    type: string;
    parent_id?: string;
}

export class TextProcessor {
    
    /**
     * 获取当前选中的文本
     */
    static getSelectedText(): string {
        const selection = window.getSelection();
        return selection ? selection.toString().trim() : "";
    }

    /**
     * 获取当前光标所在的块ID
     */
    static getCurrentBlockId(): string | null {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return null;
        }

        let element = selection.getRangeAt(0).startContainer;
        if (element.nodeType === Node.TEXT_NODE) {
            element = element.parentElement;
        }

        while (element && element !== document.body) {
            if ((element as HTMLElement).hasAttribute && (element as HTMLElement).hasAttribute("data-node-id")) {
                return (element as HTMLElement).getAttribute("data-node-id");
            }
            element = element.parentElement;
        }

        return null;
    }

    /**
     * 根据块ID获取块内容
     */
    static async getBlockContent(blockId: string): Promise<BlockInfo | null> {
        try {
            const response = await fetchPost("/api/block/getBlockByID", {
                id: blockId
            }) as any;

            if (response?.code === 0 && response?.data) {
                return {
                    id: response.data.id,
                    content: response.data.content,
                    type: response.data.type,
                    parent_id: response.data.parent_id
                };
            }
        } catch (error) {
            console.error("获取块内容失败:", error);
        }
        return null;
    }

    /**
     * 更新块内容
     */
    static async updateBlockContent(blockId: string, content: string): Promise<boolean> {
        try {
            const response = await fetchPost("/api/block/updateBlock", {
                id: blockId,
                data: content,
                dataType: "markdown"
            }) as any;

            return response?.code === 0;
        } catch (error) {
            console.error("更新块内容失败:", error);
            return false;
        }
    }

    /**
     * 在指定块后插入新块
     */
    static async insertBlockAfter(parentId: string, content: string): Promise<string | null> {
        try {
            const response = await fetchPost("/api/block/insertBlock", {
                parentID: parentId,
                data: content,
                dataType: "markdown"
            }) as any;

            if (response?.code === 0 && response?.data) {
                return response.data[0]?.doOperations?.[0]?.id || null;
            }
        } catch (error) {
            console.error("插入块失败:", error);
        }
        return null;
    }

    /**
     * 获取表格块的内容
     */
    static async getTableContent(blockId: string): Promise<string[][] | null> {
        const blockInfo = await this.getBlockContent(blockId);
        if (!blockInfo || blockInfo.type !== "t") {
            return null;
        }

        try {
            // 解析表格Markdown内容
            const lines = blockInfo.content.split("\n").filter(line => line.trim());
            const table: string[][] = [];

            for (const line of lines) {
                if (line.includes("|")) {
                    const cells = line.split("|").map(cell => cell.trim()).filter(cell => cell);
                    if (cells.length > 0) {
                        table.push(cells);
                    }
                }
            }

            return table.length > 0 ? table : null;
        } catch (error) {
            console.error("解析表格内容失败:", error);
            return null;
        }
    }

    /**
     * 更新表格内容
     */
    static async updateTableContent(blockId: string, tableData: string[][]): Promise<boolean> {
        try {
            // 将表格数据转换为Markdown格式
            const markdown = this.tableToMarkdown(tableData);
            return await this.updateBlockContent(blockId, markdown);
        } catch (error) {
            console.error("更新表格内容失败:", error);
            return false;
        }
    }

    /**
     * 将表格数据转换为Markdown格式
     */
    static tableToMarkdown(tableData: string[][]): string {
        if (tableData.length === 0) {
            return "";
        }

        const lines: string[] = [];
        
        // 添加表头
        if (tableData.length > 0) {
            lines.push("| " + tableData[0].join(" | ") + " |");
            // 添加分隔行
            lines.push("| " + tableData[0].map(() => "---").join(" | ") + " |");
        }

        // 添加数据行
        for (let i = 1; i < tableData.length; i++) {
            lines.push("| " + tableData[i].join(" | ") + " |");
        }

        return lines.join("\n");
    }

    /**
     * 清理文本内容，移除不必要的格式
     */
    static cleanText(text: string): string {
        return text
            .replace(/\*\*(.*?)\*\*/g, "$1") // 移除粗体标记
            .replace(/\*(.*?)\*/g, "$1")     // 移除斜体标记
            .replace(/`(.*?)`/g, "$1")       // 移除代码标记
            .replace(/\[(.*?)\]\(.*?\)/g, "$1") // 移除链接标记，保留文本
            .replace(/#{1,6}\s+/g, "")       // 移除标题标记
            .replace(/^\s*[-*+]\s+/gm, "")   // 移除列表标记
            .replace(/^\s*\d+\.\s+/gm, "")   // 移除有序列表标记
            .trim();
    }

    /**
     * 替换选中的文本
     */
    static replaceSelectedText(newText: string): boolean {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return false;
        }

        try {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(newText));
            
            // 清除选择
            selection.removeAllRanges();
            
            return true;
        } catch (error) {
            console.error("替换文本失败:", error);
            return false;
        }
    }

    /**
     * 在光标位置插入文本
     */
    static insertTextAtCursor(text: string): boolean {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return false;
        }

        try {
            const range = selection.getRangeAt(0);
            range.insertNode(document.createTextNode(text));
            
            // 移动光标到插入文本的末尾
            range.setStartAfter(range.endContainer);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
            
            return true;
        } catch (error) {
            console.error("插入文本失败:", error);
            return false;
        }
    }
}
