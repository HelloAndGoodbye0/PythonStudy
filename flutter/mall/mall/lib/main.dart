import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/cart_provider.dart';
import 'widgets/products_overview_screen.dart';
import 'l10n/app_localizations.dart';
void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    // 使用 MultiProvider 注入状态
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (ctx) => CartProvider()),
      ],
      child: MaterialApp(
        localizationsDelegates: AppLocalizations.localizationsDelegates,
        supportedLocales: AppLocalizations.supportedLocales,
        // 强制默认语言为英语（初始化时使用 en），可去除以遵循系统语言
        locale: const Locale('en'),
        localeResolutionCallback: (Locale? locale, Iterable<Locale> supportedLocales) {
          if (locale == null) return const Locale('en');
          // Match only on languageCode; fall back to English if unsupported
          for (var supported in supportedLocales) {
            if (supported.languageCode == locale.languageCode) return supported;
          }
          return const Locale('en');
        },
        title: 'Flutter Mall',
        theme: ThemeData(
          primarySwatch: Colors.blue,
          colorScheme: ColorScheme.fromSwatch(primarySwatch: Colors.blue).copyWith(secondary: Colors.deepOrange),
          fontFamily: 'Lato',
        ),
        home: ProductsOverviewScreen(),
        debugShowCheckedModeBanner: false,
      ),
    );
  }
}
