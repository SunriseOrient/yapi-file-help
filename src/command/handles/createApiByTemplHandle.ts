/**
 * @Author: Sun Rising
 * @Date: 2020-12-30 10:35:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2025-03-07 16:03:35
 * @Description: 通过模版生成 Api 至剪贴板
 */
import * as vscode from "vscode";
import * as fs from "fs-extra";
import {
  resolveinApiDataByTempl,
} from "../../utils";
import * as path from "path";
import { GlobalStore } from "../../store/GlobalStore";
import { writeSync } from "clipboardy";

// 处理器
async function handle(agrs: any, command: string) {
  try {
    if (!vscode.workspace.workspaceFolders) return;
    const workspaceRootPath = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const templFullPath = path.join(
      workspaceRootPath,
      GlobalStore.getStore().getStaticValue("template")
    );
    if (!fs.existsSync(templFullPath))
      throw new Error(`模版文件${templFullPath}不存在`);

    console.log("模版数据：",agrs.data);
    let templateFullStr = await resolveinApiDataByTempl([agrs.data], templFullPath);
    writeSync(templateFullStr || "");

    vscode.window.showInformationMessage("已写入剪贴板!");
  } catch (error: any) {
    console.log(error);
    vscode.window.showErrorMessage(error.message);
  }
}

export { handle as createApiByTemplHandle };
