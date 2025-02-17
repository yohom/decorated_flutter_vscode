import * as fs from "fs";
import * as vscode from "vscode";

/// 获取工作区路径
export function workspaceDir(): string {
  return vscode.workspace.workspaceFolders![0].uri.fsPath;
}

/// 获取所有的模块名称
export function modules(): string[] {
  const workspace = workspaceDir();
  return fs.existsSync(`${workspace}/modules`)
    ? fs.readdirSync(`${workspace}/modules`)
    : [];
}

/// 获取模块下所有的页面名称
export function screensOf(module: string): string[] {
  const workspace = workspaceDir();
  return module !== ""
    ? fs.readdirSync(`${workspace}/modules/${module}/lib/src/ui/screen`)
    : fs.readdirSync(`${workspace}/lib/src/ui/screen`);
}

/// 格式化指定路径的文件
export async function formatFile(path: string) {
  const document = await vscode.workspace.openTextDocument(path);
  const text = document.getText();
  const formattedText = await vscode.commands.executeCommand<string>(
    "vscode.executeFormatDocumentProvider",
    document.uri,
    { tabSize: 2, insertSpaces: true }
  );
  if (formattedText) {
    const workspaceEdit = new vscode.WorkspaceEdit();
    workspaceEdit.replace(
      document.uri,
      new vscode.Range(0, 0, document.lineCount, 0),
      formattedText
    );
    await vscode.workspace.applyEdit(workspaceEdit);
  }
}

/// 插入指定内容到文件
export async function insertTextInFile(
  filePath: string,
  searchText: string,
  insertText: string
) {
  const document = await vscode.workspace.openTextDocument(filePath);
  const text = document.getText();
  const index = text.indexOf(searchText);
  if (index === -1) {
    vscode.window.showErrorMessage("未找到指定的文本");
    return;
  }
  const position = document.positionAt(index + searchText.length);
  const edit = new vscode.WorkspaceEdit();
  edit.insert(vscode.Uri.file(filePath), position, insertText);
  await vscode.workspace.applyEdit(edit);
}
