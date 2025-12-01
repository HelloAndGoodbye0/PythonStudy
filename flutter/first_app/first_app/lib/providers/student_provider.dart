import 'package:flutter/material.dart';
import 'package:first_app/models/student.dart';

class StudentProvider with ChangeNotifier {
  final List<Student> _students = [
    Student(id: '1', name: '张三', age: 20, gender: '男', major: '计算机科学'),
    Student(id: '2', name: '李四', age: 19, gender: '女', major: '软件工程'),
  ];

  List<Student> get students => _students;

  void addStudent(Student student) {
    _students.add(student);
    notifyListeners();
  }

  void deleteStudent(String id) {
    _students.removeWhere((item) => item.id == id);
    notifyListeners();
  }

  void updateStudent(Student newData) {
    final index = _students.indexWhere((item) => item.id == newData.id);
    if (index != -1) {
      _students[index] = newData;
      notifyListeners();
    }
  }
}
