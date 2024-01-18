import { pascalCase } from 'change-case';
import * as fs from 'fs';
import * as vscode from 'vscode';
import { insertTextInFile, workspaceDir } from './_helper';

/// 生成模块
export async function handleModuleGen() {
  // 名称
  const name = await vscode.window.showInputBox({
    prompt: '请输入模块英文名称(小写+下划线模式)',
  });
  if (!name) return;

  // 描述
  const desc = await vscode.window.showInputBox({
    prompt: '请输入模块描述',
  });
  if (!desc) return;

  const extensionDir = vscode.extensions
    .getExtension('decoratedflutter.decorated-flutter-vscode')
    ?.extensionUri;
  const moduleDir = `${workspaceDir()}/modules/${name}`;

  const tmplDir = extensionDir?.path + '/media/tmpl/module/example';
  await vscode.workspace.fs.copy(
    vscode.Uri.file(tmplDir),
    vscode.Uri.file(`${workspaceDir()}/modules/${name}`),
  );

  const pubspecFile = `${moduleDir}/pubspec.yaml`;
  const appPubspecFile = `${workspaceDir()}/modules/app/pubspec.yaml`;
  const indexFile = `${moduleDir}/lib/module_example.dart`;
  const routerFile = `${moduleDir}/lib/src/router.dart`;
  const appFile = `${workspaceDir()}/modules/app/lib/src/app.dart`;

  await _replacePlaceholder(pubspecFile, '#__name__#', name);
  await _replacePlaceholder(indexFile, '#__name__#', pascalCase(name));
  await _replacePlaceholder(routerFile, '#__name__#', pascalCase(name));

  fs.renameSync(indexFile, indexFile.replace('example', name))

  // 把路由注册到app模块
  await insertTextInFile(
    appFile,
    'IndexRouter.instance.onGenerateRoute(redirection);',
    `\n      } else if (path.startsWith('/${name}')) {\n    return ${pascalCase(name)}Router.instance.onGenerateRoute(redirection);`,
  );
  await insertTextInFile(
    appFile,
    "import 'package:module_index/module_index.dart';",
    `\nimport 'package:module_${name}/module_${name}.dart';`,
  );
  await insertTextInFile(
    appPubspecFile,
    "path: ../index",
    `\n  module_${name}:\n    path: ../${name}`,
  );

  // 更新依赖
  await vscode.commands.executeCommand('pub.get');
}

/// 替换文本内容
async function _replacePlaceholder(filePath: string, placeholder: string, replacement: string) {
  // 读取文件内容
  const fileContent = await fs.promises.readFile(filePath, 'utf-8');

  // 替换占位符
  const newFileContent = fileContent.replace(new RegExp(placeholder, 'g'), replacement);

  // 写入文件
  await fs.promises.writeFile(filePath, newFileContent, 'utf-8');
}
