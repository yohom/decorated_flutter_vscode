// part of 'api.dart';

// class _AuthInterceptor extends Interceptor {
//   @override
//   void onRequest(
//     RequestOptions options,
//     RequestInterceptorHandler handler,
//   ) async {
//     // 设置默认域名
//     options.baseUrl = DataSource.prefs.getPreferredBackend();
//     L.i('当前请求域名: ${options.baseUrl}');
//     final token = DataSource.prefs.getToken()?.token;
//     if (token != null) {
//       options.headers['authorization'] = token;
//     }
//     // apifox mock地址
//     if (!kProduction) {
//       options.headers['apifoxToken'] = 'jugxKe3PfcOCj1TkPq3kbeSd91GE0ggV';
//     }
//     handler.next(options);
//   }
// }
