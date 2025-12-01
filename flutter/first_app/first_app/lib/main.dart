
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:first_app/providers/student_provider.dart';
import 'package:first_app/screens/student_list_screen.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => StudentProvider()),
      ],
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '学生管理系统',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
      ),
      home: const StudentListScreen(),
    );
  }
}