import * as vscode from 'vscode';

import { pascalCase } from 'change-case';
import * as fs from 'fs';
import * as path from 'path';
import * as YAML from 'yaml';
import { modules, workspaceDir } from './_helper';

export async function handleFeatGen() {
  // 模块
  const module = await vscode.window.showQuickPick(modules());
  if (!module) return;

  // 名称
  const name = await vscode.window.showInputBox({
    prompt: '请输入页面英文名称(小写+下划线模式)',
  });
  if (!name) return;

  // 描述
  const desc = await vscode.window.showInputBox({
    prompt: '请输入页面描述',
  });
  if (!desc) return;

  _routes(module, name, desc)
  _bloc(module, name, desc)
  _exportBLoC(module, name, desc)
  _screen(module, name, desc)
  _exportScreen(module, name, desc)
  _routingList(module, name, desc)
}

function _routes(module: string, name: string, desc: string) {
  const routesFilePath = `${workspaceDir()}/components/constant/lib/src/resource/constants.dart`;

  if (!fs.existsSync(routesFilePath)) {
    fs.mkdirSync(path.dirname(routesFilePath), { recursive: true });
    fs.writeFileSync(routesFilePath, '');
    console.log(`No ${routesFilePath} file, created it.`);
  }

  const content = fs.readFileSync(routesFilePath, 'utf8');
  let injectPosition = content.indexOf('static const String');
  if (injectPosition === -1) {
    injectPosition = content.indexOf('Routes._();') + 11 /*`Routes._();`的长度*/;
  }
  const beforePart = content.substring(0, injectPosition);
  const afterPart = content.substring(injectPosition);

  const targetContent = `  static const String ${name} = '/${module}/${name}'; // ${desc}`;

  const result = `${beforePart}\n${targetContent}\n  ${afterPart}`;

  fs.writeFileSync(routesFilePath, result);
}

function _bloc(module: string, name: string, desc: string) {
  const blocFilePath = `${workspaceDir()}/modules/${module}/lib/src/bloc/local/${name}.bloc.dart`;

  if (!fs.existsSync(blocFilePath)) {
    fs.mkdirSync(path.dirname(blocFilePath), { recursive: true });
  } else {
    throw 'Cannot create duplicate module';
  }

  const camelFeatureName = name.charAt(0).toUpperCase() + name.slice(1); // Convert the name to CamelCase
  const import_ = "import 'package:module_core/module_core.dart';\n\n";
  const class_ =
    `class ${camelFeatureName}BLoC extends LocalBLoC with _ComponentMixin {\n   ${camelFeatureName}BLoC() : super('${desc} BLoC');\n}\n\n`;
  const mixin_ =
    'mixin _ComponentMixin on LocalBLoC {\n  @override\n  List<dynamic> get disposeBag => [];\n}';

  fs.writeFileSync(blocFilePath, `${import_}${class_}${mixin_}`);
}

function _exportBLoC(module: string, name: string, desc: string) {
  const exportFilePath = `${workspaceDir()}/modules/${module}/lib/src/bloc/bloc.export.dart`;

  if (!fs.existsSync(exportFilePath)) {
    fs.mkdirSync(path.dirname(exportFilePath), { recursive: true });
    console.log(`No ${exportFilePath} file, created it.`);
  }

  fs.writeFileSync(exportFilePath, `export 'local/${name}.bloc.dart';\n`, { flag: 'a' });
}

function _screen(module: string, name: string, desc: string) {
  const screenFilePath = `${workspaceDir()}/modules/${module}/lib/src/ui/screen/${name}/${name}.screen.dart`;
  const pubspecFilePath = `${workspaceDir()}/pubspec.yaml`;

  fs.mkdirSync(path.dirname(screenFilePath), { recursive: true });

  const camelFeatureName = name.charAt(0).toUpperCase() + name.slice(1); // Convert the name to CamelCase
  const pubspecContent = fs.readFileSync(pubspecFilePath, 'utf8');
  const projectName = YAML.parse(pubspecContent)['name'];

  fs.writeFileSync(
    screenFilePath,
    `import 'package:module_core/module_core.dart';
import 'package:module_${module}/src/bloc/bloc.export.dart';
import 'package:flutter/material.dart';
    
/// ${desc}
class ${camelFeatureName}Screen extends StatelessWidget {
  static Future<void> launch() async {
    return gNavigatorKey.currentState?.pushNamed<void>(Routes.${name});
  }
      
  static Route route(Map<String, dynamic> arguments) {
    return DecoratedRoute<${camelFeatureName}BLoC, void>(
      screen: const ${camelFeatureName}Screen._(),
      bloc: ${camelFeatureName}BLoC(),
      init: (bloc) {},
      routeName: Routes.${name},
    );
  }
      
  const ${camelFeatureName}Screen._();
      
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('${desc}')),
      body: Center(child: Text('${desc}')),
    );
  }
}`,
  );
}

function _exportScreen(module: string, name: string, desc: string) {
  const screenExportFilePath = `${workspaceDir()}/modules/${module}/lib/src/ui/screen/screen.export.dart`;

  if (!fs.existsSync(screenExportFilePath)) {
    fs.writeFileSync(screenExportFilePath, '', 'utf8');
  }

  fs.writeFileSync(screenExportFilePath, `export '${name}/${name}.screen.dart';\n`, {
    encoding: 'utf8',
    flag: 'a',
  });
}

function _routingList(module: string, name: string, desc: string) {
  let routeFile = fs.readFileSync(`${workspaceDir()}/modules/${module}/lib/src/router.dart`, 'utf8');

  if (!routeFile) {
    routeFile = fs.readFileSync(`${workspaceDir()}/modules/${module}/lib/src/app.dart`, 'utf8');
    if (!routeFile) {
      throw new Error('请先新建router.dart或app.dart文件');
    }
  }

  const camelFeatureName = pascalCase(name);
  const injectPosition = routeFile.indexOf('default:');
  const beforePart = routeFile.substring(0, injectPosition);
  const afterPart = routeFile.substring(injectPosition);

  const targetContent = `// ${desc}
      case Routes.${name}:
        return ${camelFeatureName}Screen.route(arguments);`;

  const result = `${beforePart}${targetContent}\n      ${afterPart}`;

  fs.writeFileSync(`${workspaceDir()}/modules/${module}/lib/src/router.dart`, result, 'utf8');
}

