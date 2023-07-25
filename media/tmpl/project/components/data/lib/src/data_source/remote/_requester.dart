// part of 'api.dart';

// typedef _Mapper<T> = T Function(Map<String, dynamic> map);

// final _alice = Alice(navigatorKey: gNavigatorKey);
// final _cancelToken = CancelToken();
// const _uuid = Uuid();
// final _dio = Dio(
//   BaseOptions(
//     connectTimeout: const Duration(seconds: 60),
//     receiveTimeout: const Duration(seconds: 60),
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//       'X-PLATFORM': () {
//         if (UniversalPlatform.isAndroid) {
//           return 'android';
//         } else if (UniversalPlatform.isIOS) {
//           return 'ios';
//         } else if (UniversalPlatform.isWeb) {
//           return 'web';
//         }
//       }(),
//       'X-CLIENT-ID': DataSource.devices.deviceId,
//       'X-APP-VERSION': DataSource.package.versionName,
//     },
//   ),
// )
//   ..interceptors.add(_AuthInterceptor())
//   ..interceptors.add(kReleaseMode
//       ? const Interceptor()
//       : LogInterceptor(
//           requestHeader: true,
//           requestBody: true,
//           responseHeader: true,
//           responseBody: true,
//           logPrint: (o) {
//             final pattern = RegExp('.{1,800}'); // 800 is the size of each chunk
//             pattern
//                 .allMatches(o.toString())
//                 .forEach((match) => debugPrint(match.group(0)));
//           },
//         ))
//   ..interceptors.add(_alice.getDioInterceptor());

// class GlobalHttpOverrides extends HttpOverrides {
//   @override
//   HttpClient createHttpClient(SecurityContext? context) {
//     return super.createHttpClient(context)
//       ..badCertificateCallback = (cert, host, port) => true;
//   }
// }

// class _Requester {
//   _Requester() {
//     HttpOverrides.global = GlobalHttpOverrides();
//   }

//   VoidCallback? _userExpiredCallback;

//   /// 以List的形式获取网络资源
//   Future<List<String>> postAsStringList(
//     String path, {
//     Map<String, dynamic> data = const {},
//     Duration cacheMaxAge = Duration.zero,
//     bool isForm = false,
//     bool forceRefresh = false,
//   }) async {
//     return _dio
//         .post(
//           path,
//           data: isForm
//               ? await _universalFormData(data)
//               : (Map.of(data)..removeWhere((key, value) => value == null)),
//           cancelToken: _cancelToken,
//         )
//         .then(_decode)
//         .then(_stringList);
//   }

//   /// 以Bean的形式获取网络资源
//   Future<Bean> postAsBean(
//     String path, {
//     Map<String, dynamic> data = const {},
//     bool isForm = false,
//     Duration cacheMaxAge = Duration.zero,
//     bool forceRefresh = false,
//   }) async {
//     return _dio
//         .post(
//           path,
//           data: isForm
//               ? await _universalFormData(data)
//               : (Map.of(data)..removeWhere((key, value) => value == null)),
//           cancelToken: _cancelToken,
//         )
//         .then(_decodeBean);
//   }

//   /// 以Single的形式获取网络资源
//   Future<T> postAsSingle<T>(
//     String path,
//     _Mapper<T> mapper, {
//     Map<String, dynamic> data = const {},
//     bool isForm = false,
//     Duration cacheMaxAge = Duration.zero,
//     bool forceRefresh = false,
//   }) async {
//     return _dio
//         .post(
//           path,
//           data: isForm
//               ? await _universalFormData(data)
//               : (Map.of(data)..removeWhere((key, value) => value == null)),
//           cancelToken: _cancelToken,
//         )
//         .then(_decode)
//         .then(_single)
//         .then(mapper);
//   }

//   /// 以List的形式获取网络资源
//   Future<List<T>> postAsList<T>(
//     String path,
//     _Mapper<T> mapper, {
//     Map<String, dynamic> data = const {},
//     bool isForm = false,
//     Duration cacheMaxAge = Duration.zero,
//     bool forceRefresh = false,
//   }) async {
//     return _dio
//         .post(
//           path,
//           data: isForm
//               ? await _universalFormData(data)
//               : (Map.of(data)..removeWhere((key, value) => value == null)),
//           cancelToken: _cancelToken,
//         )
//         .then(_decode)
//         .then(_list)
//         .then((list) => list.map<T>((item) => mapper(item)).toList());
//   }

//   Future<Response<dynamic>> post(
//     String path, {
//     data,
//     Map<String, dynamic>? params,
//     Options? options,
//     CancelToken? cancelToken,
//     ProgressCallback? onSendProgress,
//     ProgressCallback? onReceiveProgress,
//   }) {
//     return _dio.post(
//       path,
//       queryParameters: params?..removeWhere((_, value) => value == null),
//       options: options,
//       cancelToken: cancelToken,
//       onSendProgress: onSendProgress,
//       onReceiveProgress: onReceiveProgress,
//     );
//   }

//   /// 响应中反序列化json
//   Map<String, dynamic> _decode(Response response) {
//     final data = response.data;
//     final code = data['code'] as int?;
//     var message = (data['msg'] ?? data['message']) as String?;
//     if (code == 200 || code == 0) {
//       return data as Map<String, dynamic>? ?? {};
//     } else {
//       // web端由于会直接跳到一些需要登录的页面, 这里先不对web端判断
//       // 如果是登录过期, 就不要再往外面抛异常了, 防止一些界面出错
//       if ([1006, 1007].contains(code) && !kIsWeb) {
//         _userExpiredCallback?.call();
//         toast(message);
//         return data as Map<String, dynamic>;
//       }
//       message = kDebugMode
//           ? '路径: ${response.requestOptions.path}, $message'
//           : message;
//       throw BizException(code.toString(), message!);
//     }
//   }

//   /// 响应中反序列化json
//   Bean _decodeBean(Response response) {
//     final data = response.data;
//     final code = data['code'] as int?;
//     var message = (data['msg'] ?? data['message']) as String?;
//     if (code == 200 || code == 0) {
//       return Bean.fromJson(data);
//     } else {
//       // web端不处理登录过期
//       if (code == 1006 && !kIsWeb) {
//         _userExpiredCallback?.call();
//         toast(message);
//       }
//       message = kDebugMode
//           ? '路径: ${response.requestOptions.path}, $message'
//           : message;
//       throw BizException(code.toString(), message!);
//     }
//   }

//   /// 以单个对象抽取
//   Map<String, dynamic> _single(Map<String, dynamic> response) {
//     // fixed 防止在获取对象的时候,接口返回[] 导致转化失败
//     if (response['data'] is List && response['data'].length == 0) {
//       return {};
//     }
//     return response['data'] as Map<String, dynamic>? ?? {};
//   }

//   /// 以列表对象抽取
//   List<Map<String, dynamic>> _list(Map<String, dynamic> response) {
//     final rawData = response['data'];
//     if (rawData is List) {
//       return rawData.cast<Map<String, dynamic>>();
//     } else {
//       return ((rawData?['list'] ?? []) as List).cast<Map<String, dynamic>>();
//     }
//   }

//   /// 以列表对象抽取
//   List<String> _stringList(Map<String, dynamic> response) {
//     final rawData = response['data'];
//     if (rawData is List) {
//       return rawData.cast<String>();
//     } else {
//       return ((rawData?['list'] ?? []) as List).cast<String>();
//     }
//   }

//   /// 统一的表单
//   ///
//   /// 主要区分处理一下XFile, 兼容web和移动端
//   Future<FormData> _universalFormData(Map<String, dynamic> data) async {
//     return FormData.fromMap({
//       for (final entry in data.entries)
//         // io File
//         if (entry.value is File)
//           entry.key: (entry.value as File).let((self) {
//             return MultipartFile.fromFileSync(self.path, filename: self.name);
//           })
//         // XFile
//         else if (entry.value is XFile)
//           entry.key: MultipartFile.fromBytes(
//             await (entry.value as XFile).readAsBytes(),
//             filename: (entry.value as XFile).name,
//           )
//         // 二进制数据
//         else if (entry.value is Uint8List)
//           entry.key: MultipartFile.fromBytes(entry.value, filename: _uuid.v4())
//         // 多个XFile
//         else if (entry.value is List<XFile>)
//           entry.key: [
//             for (final item in entry.value as List<XFile>)
//               MultipartFile.fromBytes(
//                 await item.readAsBytes(),
//                 filename: item.name,
//               )
//           ]
//         else
//           entry.key: entry.value,
//     });
//   }
// }
