import * as fs from "fs";
import * as path from "path";
import { workspaceDir } from "./_helper";

export async function handleResGen() {
  const workspace = workspaceDir();
  const rFile = `${workspace}/components/constant/lib/src/resource/drawables.dart`;

  const result = ["part of 'r.dart';\n\n"];

  result.push("// ignore_for_file: non_constant_identifier_names");
  result.push("class _DrawableReference {");
  result.push("  _DrawableReference();\n");

  const allImages: string[] = [];
  for (const dir of ["assets/images", "assets/fonts"]) {
    if (dir.startsWith("-")) {
      continue;
    }

    for (const file of fs.readdirSync(`${workspace}/${dir}`)) {
      const ext = path.extname(file);
      let nameWithoutExt = path.basename(file, ext);
      let name = path.basename(file);
      if (!allowedFileType.includes(ext)) {
        continue;
      }

      if (reserved.includes(nameWithoutExt)) {
        nameWithoutExt = `${nameWithoutExt}_`;
      }
      result.push(`  /// ![preview](file://${workspace}/${dir}/${file})`);

      var folder = "images";
      if (
        ext.endsWith("png") ||
        ext.endsWith("jpg") ||
        ext.endsWith("webp") ||
        ext.endsWith("gif")
      ) {
        folder = "images";
      } else if (ext.endsWith("ttf") || ext.endsWith("svg")) {
        folder = "fonts";
      } else {
        folder = "raw";
      }
      const varName = toUnderscore(nameWithoutExt);
      result.push(`  final ${varName} = 'assets/${folder}/${name}';\n`);
      allImages.push(`assets/${folder}/${name}`);
    }
  }

  result.push("}");
  fs.writeFileSync(rFile, result.join("\n"));
}

function toUnderscore(str: string): string {
  return str
    .replace(/([A-Z])/g, "_$1")
    .replace(/-/g, "_")
    .toLowerCase();
}

const reserved = [
  "abstract",
  "dynamic",
  "implements",
  "show",
  "as",
  "else",
  "import",
  "static",
  "assert",
  "enum",
  "in",
  "super",
  "async",
  "export",
  "interface",
  "switch",
  "await",
  "extends",
  "is",
  "sync",
  "break",
  "external",
  "library",
  "this",
  "case",
  "factory",
  "mixin",
  "throw",
  "catch",
  "false",
  "new",
  "true",
  "class",
  "final",
  "null",
  "try",
  "const",
  "finally",
  "on",
  "typedef",
  "continue",
  "for",
  "operator",
  "var",
  "covariant",
  "Function",
  "part",
  "void",
  "default",
  "get",
  "rethrow",
  "while",
  "deferred",
  "hide",
  "return",
  "with",
  "do",
  "if",
  "set",
  "yield",
];

const allowedFileType = [".png", ".svg", ".jpg", ".webp", ".gif", ".json"];
