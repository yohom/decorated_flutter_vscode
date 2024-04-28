import * as fs from 'fs';
import * as path from "path";
import * as vscode from "vscode";
import { workspaceDir } from "./_helper";

/// 统一添加lint规则
/// 主要解决多模块统一添加规则的问题, 如果不用这个就需要每个模块都单独添加
export async function handleAddLintRule() {
  const result = await vscode.window.showQuickPick(_kLintRules, { canPickMany: true })
  if (!result) return

  const workspace = workspaceDir()
  const lintFiles = await findFilesInWorkspace(['analysis_options.yaml'])

  const content =
    `include: package:flutter_lints/flutter.yaml

linter:
  rules:
    #__rules__#
  `

  const entries = result.map(e => `    - ${e}: true`)
  for (const file of lintFiles) {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, content.replace('#__rules__#', entries.join('\n')))
    } else {
      fs.writeFileSync(file, entries.join('\n'), { flag: 'a' })
    }
  }
}

async function findFilesInWorkspace(fileNames: string[]): Promise<string[]> {
  const files: string[] = [];

  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    vscode.window.showErrorMessage('未找到工作区文件夹');
    return files;
  }

  for (const folder of workspaceFolders) {
    const folderPath = folder.uri.fsPath;
    const subFiles = await findFilesInFolder(folderPath, fileNames);
    files.push(...subFiles);
  }

  return files;
}

async function findFilesInFolder(folderPath: string, fileNames: string[]): Promise<string[]> {
  const files: string[] = [];

  const entries = await vscode.workspace.fs.readDirectory(vscode.Uri.file(folderPath));
  for (const [name, type] of entries) {
    const filePath = path.join(folderPath, name);
    if (type === vscode.FileType.Directory) {
      const subFiles = await findFilesInFolder(filePath, fileNames);
      files.push(...subFiles);
    } else if (type === vscode.FileType.File && fileNames.includes(name)) {
      files.push(filePath);
    }
  }

  return files;
}

const _kLintRules = [
  'always_use_package_imports',
  'avoid_dynamic_calls',
  'avoid_empty_else',
  'avoid_print',
  'avoid_relative_lib_imports',
  'avoid_returning_null_for_future',
  'avoid_slow_async_io',
  'avoid_type_to_string',
  'avoid_types_as_parameter_names',
  'avoid_web_libraries_in_flutter',
  'cancel_subscriptions',
  'close_sinks',
  'collection_methods_unrelated_type',
  'comment_references',
  'control_flow_in_finally',
  'deprecated_member_use_from_same_package',
  'diagnostic_describe_all_properties',
  'discarded_futures',
  'empty_statements',
  'hash_and_equals',
  'implicit_reopen',
  'invalid_case_patterns',
  'iterable_contains_unrelated_type',
  'list_remove_unrelated_type',
  'literal_only_boolean_expressions',
  'no_adjacent_strings_in_list',
  'no_duplicate_case_values',
  'no_logic_in_create_state',
  'no_self_assignments',
  'no_wildcard_variable_uses',
  'prefer_relative_imports',
  'prefer_void_to_null',
  'test_types_in_equals',
  'throw_in_finally',
  'unnecessary_statements',
  'unrelated_type_equality_checks',
  'unsafe_html',
  'use_build_context_synchronously',
  'use_key_in_widget_constructors',
  'valid_regexps',
  'depend_on_referenced_packages',
  'package_names',
  'secure_pubspec_urls',
  'sort_pub_dependencies',
  'always_declare_return_types',
  'always_put_control_body_on_new_line',
  'always_put_required_named_parameters_first',
  'always_require_non_null_named_parameters',
  'always_specify_types',
  'annotate_overrides',
  'avoid_annotating_with_dynamic',
  'avoid_bool_literals_in_conditional_expressions',
  'avoid_catches_without_on_clauses',
  'avoid_catching_errors',
  'avoid_classes_with_only_static_members',
  'avoid_double_and_int_checks',
  'avoid_equals_and_hash_code_on_mutable_classes',
  'avoid_escaping_inner_quotes',
  'avoid_field_initializers_in_const_classes',
  'avoid_final_parameters',
  'avoid_function_literals_in_foreach_calls',
  'avoid_implementing_value_types',
  'avoid_init_to_null',
  'avoid_js_rounded_ints',
  'avoid_multiple_declarations_per_line',
  'avoid_null_checks_in_equality_operators',
  'avoid_positional_boolean_parameters',
  'avoid_private_typedef_functions',
  'avoid_redundant_argument_values',
  'avoid_renaming_method_parameters',
  'avoid_return_types_on_setters',
  'avoid_returning_null',
  'avoid_returning_null_for_void',
  'avoid_returning_this',
  'avoid_setters_without_getters',
  'avoid_shadowing_type_parameters',
  'avoid_single_cascade_in_expression_statements',
  'avoid_types_on_closure_parameters',
  'avoid_unnecessary_containers',
  'avoid_unused_constructor_parameters',
  'avoid_void_async',
  'await_only_futures',
  'camel_case_extensions',
  'camel_case_types',
  'cascade_invocations',
  'cast_nullable_to_non_nullable',
  'combinators_ordering',
  'conditional_uri_does_not_exist',
  'constant_identifier_names',
  'curly_braces_in_flow_control_structures',
  'dangling_library_doc_comments',
  'deprecated_consistency',
  'directives_ordering',
  'do_not_use_environment',
  'empty_catches',
  'empty_constructor_bodies',
  'eol_at_end_of_file',
  'exhaustive_cases',
  'file_names',
  'flutter_style_todos',
  'implementation_imports',
  'implicit_call_tearoffs',
  'join_return_with_assignment',
  'leading_newlines_in_multiline_strings',
  'library_annotations',
  'library_names',
  'library_prefixes',
  'library_private_types_in_public_api',
  'lines_longer_than_80_chars',
  'matching_super_parameters',
  'missing_whitespace_between_adjacent_strings',
  'no_default_cases',
  'no_leading_underscores_for_library_prefixes',
  'no_leading_underscores_for_local_identifiers',
  'no_literal_bool_comparisons',
  'no_runtimeType_toString',
  'non_constant_identifier_names',
  'noop_primitive_operations',
  'null_check_on_nullable_type_parameter',
  'null_closures',
  'omit_local_variable_types',
  'one_member_abstracts',
  'only_throw_errors',
  'overridden_fields',
  'package_api_docs',
  'package_prefixed_library_names',
  'parameter_assignments',
  'prefer_adjacent_string_concatenation',
  'prefer_asserts_in_initializer_lists',
  'prefer_asserts_with_message',
  'prefer_collection_literals',
  'prefer_conditional_assignment',
  'prefer_const_constructors',
  'prefer_const_constructors_in_immutables',
  'prefer_const_declarations',
  'prefer_const_literals_to_create_immutables',
  'prefer_constructors_over_static_methods',
  'prefer_contains',
  'prefer_double_quotes',
  'prefer_expression_function_bodies',
  'prefer_final_fields',
  'prefer_final_in_for_each',
  'prefer_final_locals',
  'prefer_final_parameters',
  'prefer_for_elements_to_map_fromIterable',
  'prefer_foreach',
  'prefer_function_declarations_over_variables',
  'prefer_generic_function_type_aliases',
  'prefer_if_elements_to_conditional_expressions',
  'prefer_if_null_operators',
  'prefer_initializing_formals',
  'prefer_inlined_adds',
  'prefer_int_literals',
  'prefer_interpolation_to_compose_strings',
  'prefer_is_empty',
  'prefer_is_not_empty',
  'prefer_is_not_operator',
  'prefer_iterable_whereType',
  'prefer_mixin',
  'prefer_null_aware_method_calls',
  'prefer_null_aware_operators',
  'prefer_single_quotes',
  'prefer_spread_collections',
  'prefer_typing_uninitialized_variables',
  'provide_deprecation_message',
  'public_member_api_docs',
  'recursive_getters',
  'require_trailing_commas',
  'sized_box_for_whitespace',
  'sized_box_shrink_expand',
  'slash_for_doc_comments',
  'sort_child_properties_last',
  'sort_constructors_first',
  'sort_unnamed_constructors_first',
  'tighten_type_of_initializing_formals',
  'type_annotate_public_apis',
  'type_init_formals',
  'type_literal_in_constant_pattern',
  'unawaited_futures',
  'unnecessary_await_in_return',
  'unnecessary_brace_in_string_interps',
  'unnecessary_breaks',
  'unnecessary_const',
  'unnecessary_constructor_name',
  'unnecessary_final',
  'unnecessary_getters_setters',
  'unnecessary_lambdas',
  'unnecessary_late',
  'unnecessary_library_directive',
  'unnecessary_new',
  'unnecessary_null_aware_assignments',
  'unnecessary_null_aware_operator_on_extension_on_nullable',
  'unnecessary_null_checks',
  'unnecessary_null_in_if_null_operators',
  'unnecessary_nullable_for_final_variable_declarations',
  'unnecessary_overrides',
  'unnecessary_parenthesis',
  'unnecessary_raw_strings',
  'unnecessary_string_escapes',
  'unnecessary_string_interpolations',
  'unnecessary_this',
  'unnecessary_to_list_in_spreads',
  'unreachable_from_main',
  'use_colored_box',
  'use_decorated_box',
  'use_enums',
  'use_full_hex_values_for_flutter_colors',
  'use_function_type_syntax_for_parameters',
  'use_if_null_to_convert_nulls_to_bools',
  'use_is_even_rather_than_modulo',
  'use_late_for_private_fields_and_variables',
  'use_named_constants',
  'use_raw_strings',
  'use_rethrow_when_possible',
  'use_setters_to_change_properties',
  'use_string_buffers',
  'use_string_in_part_of_directives',
  'use_super_parameters',
  'use_test_throws_matchers',
  'use_to_and_as_if_applicable',
  'void_checks',
]