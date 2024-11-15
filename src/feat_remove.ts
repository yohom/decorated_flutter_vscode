import { pascalCase } from "change-case";
import * as fs from "fs";
import * as vscode from "vscode";
import { modules, screensOf, workspaceDir } from "./_helper";

export async function handleFeatRemove() {
  let module = "";
  if (modules().length > 1) {
    module = (await vscode.window.showQuickPick(modules())) ?? "";
    if (!module) {
      return;
    }
  }

  const name = await vscode.window.showQuickPick(screensOf(module));
  if (!name) {
    return;
  }

  const workspace = workspaceDir();
  const modulePath =
    module !== "" ? `${workspace}/modules/${module}` : `${workspace}`;

  const blocFilePath = `${modulePath}/lib/src/bloc/local/${name}.bloc.dart`;
  if (fs.existsSync(blocFilePath)) {
    fs.unlinkSync(blocFilePath);
  }

  const screenFilePath = `${modulePath}/lib/src/ui/screen/${name}/${name}.screen.dart`;
  if (fs.existsSync(screenFilePath)) {
    fs.unlinkSync(screenFilePath);
  }

  // 删除引用
  _removeForFile(
    module !== ""
      ? `${workspace}/components/constant/lib/src/resource/constants.dart`
      : `${workspace}/lib/src/resource/constants.dart`,
    name
  );
  _removeForFile(`${modulePath}/lib/src/bloc/bloc.export.dart`, name);
  _removeForFile(`${modulePath}/lib/src/ui/screen/screen.export.dart`, name);
  _removeForFile(`${modulePath}/lib/src/router.dart`, name);
}

function _removeForFile(path: string, name: string) {
  const file = fs.readFileSync(path, "utf8");
  const lines = file.split("\n");
  const newContent = lines.map((item) => {
    if (item.includes(name) || item.includes(pascalCase(name))) {
      return "";
    } else {
      return item;
    }
  });

  fs.writeFileSync(path, newContent.join("\n"));
}
