import * as vscode from 'vscode';

export async function handleFeatRename() {
  // 弹出第一个编辑框并获取参数1
  const module = await vscode.window.showInputBox({
    prompt: '请输入模块名称(若是单模块应用, 则跳过)',
  });

  // 弹出第二个编辑框并获取参数2
  const name = await vscode.window.showInputBox({
    prompt: '请输入页面英文名称(小写+下划线模式)',
  });

  // 弹出第三个编辑框并获取参数3
  const desc = await vscode.window.showInputBox({
    prompt: '请输入页面描述',
  });

  vscode.window.showInformationMessage("模块名称: " + module + ", 页面英文名称: " + name + ", 页面描述: " + desc);
}