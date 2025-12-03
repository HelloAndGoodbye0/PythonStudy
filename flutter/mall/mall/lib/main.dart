import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/cart_provider.dart';
import 'providers/locale_provider.dart';
import 'widgets/products_overview_screen.dart';
import 'l10n/app_localizations.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  // 读取持久化的语言偏好（如果有）
  final prefs = await SharedPreferences.getInstance();
  final savedLang = prefs.getString('locale');

  runApp(MyApp(initialLanguageCode: savedLang));
}

class MyApp extends StatelessWidget {
  final String? initialLanguageCode;
  const MyApp({this.initialLanguageCode, super.key});

  @override
  Widget build(BuildContext context) {
    // 使用 MultiProvider 注入状态
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (ctx) => CartProvider()),
        ChangeNotifierProvider(create: (ctx) => LocaleProvider(initialLanguageCode)),
      ],
      child: Consumer<LocaleProvider>(
        builder: (ctx, localeProv, _) {
          return MaterialApp(
            localizationsDelegates: AppLocalizations.localizationsDelegates,
            supportedLocales: AppLocalizations.supportedLocales,
            // 使用 provider 中的 locale，若为 null 则默认 en
            locale: localeProv.locale ?? const Locale('en'),
            localeResolutionCallback: (Locale? locale, Iterable<Locale> supportedLocales) {
              if (locale == null) return const Locale('en');
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
          );
        },
      ),
    );
  }
}
