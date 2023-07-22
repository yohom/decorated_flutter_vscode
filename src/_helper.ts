import * as fs from 'fs';
import * as vscode from 'vscode';

/// 获取工作区路径
export function workspaceDir(): string {
  return vscode.workspace.workspaceFolders![0].uri.fsPath
}

/// 获取所有的模块名称 
export function modules(): string[] {
  const workspace = workspaceDir()
  return fs.readdirSync(`${workspace}/modules`)
}

/// 格式化指定路径的文件
export async function formatFile(path: string) {
  const document = await vscode.workspace.openTextDocument(path);
  const text = document.getText();
  const formattedText = await vscode.commands.executeCommand<string>('vscode.executeFormatDocumentProvider', document.uri, { tabSize: 2, insertSpaces: true });
  if (formattedText) {
    const workspaceEdit = new vscode.WorkspaceEdit();
    workspaceEdit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), formattedText);
    await vscode.workspace.applyEdit(workspaceEdit);
  }
}