import * as vscode from 'vscode';
import { handleFeatGen } from './feat_gen';
import { handleFeatRemove } from './feat_remove';
import { handleFeatRename } from './feat_rename';
import { handleResGen } from './res_gen';

export function activate(context: vscode.ExtensionContext) {
	// feature生成
	let featGen = vscode.commands.registerCommand('decorated-flutter.feat_gen', handleFeatGen);
	// feature重命名
	let featRename = vscode.commands.registerCommand('decorated-flutter.feat_rename', handleFeatRename);
	// feature删除
	let featRemove = vscode.commands.registerCommand('decorated-flutter.feat_remove', handleFeatRemove);
	// 资源生成
	let resGen = vscode.commands.registerCommand('decorated-flutter.res_gen', handleResGen);

	context.subscriptions.push(featGen);
	context.subscriptions.push(featRename);
	context.subscriptions.push(featRemove);
	context.subscriptions.push(resGen);
}

export function deactivate() { }
