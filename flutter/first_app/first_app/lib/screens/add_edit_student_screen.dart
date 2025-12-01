import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:first_app/models/student.dart';
import 'package:first_app/providers/student_provider.dart';

class AddEditStudentScreen extends StatefulWidget {
  final Student? student;
  const AddEditStudentScreen({super.key, this.student});

  @override
  State<AddEditStudentScreen> createState() => _AddEditStudentScreenState();
}

class _AddEditStudentScreenState extends State<AddEditStudentScreen> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _nameController;
  late TextEditingController _ageController;
  late TextEditingController _majorController;
  String _gender = '男';

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController(text: widget.student?.name ?? '');
    _ageController = TextEditingController(text: widget.student?.age.toString() ?? '');
    _majorController = TextEditingController(text: widget.student?.major ?? '');
    if (widget.student != null) _gender = widget.student!.gender;
  }

  @override
  void dispose() {
    _nameController.dispose();
    _ageController.dispose();
    _majorController.dispose();
    super.dispose();
  }

  void _saveForm() {
    if (_formKey.currentState!.validate()) {
      final provider = Provider.of<StudentProvider>(context, listen: false);
      final String name = _nameController.text;
      final int age = int.parse(_ageController.text);
      final String major = _majorController.text;

      if (widget.student == null) {
        final newStudent = Student(
          id: DateTime.now().toString(),
          name: name,
          age: age,
          gender: _gender,
          major: major,
        );
        provider.addStudent(newStudent);
      } else {
        final updatedStudent = Student(
          id: widget.student!.id,
          name: name,
          age: age,
          gender: _gender,
          major: major,
        );
        provider.updateStudent(updatedStudent);
      }

      Navigator.pop(context);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isEditing = widget.student != null;

    return Scaffold(
      appBar: AppBar(title: Text(isEditing ? '编辑学生' : '添加学生')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: SingleChildScrollView(
            child: Column(
              children: [
                TextFormField(
                  controller: _nameController,
                  decoration: const InputDecoration(labelText: '姓名', border: OutlineInputBorder()),
                  validator: (value) {
                    if (value == null || value.isEmpty) return '请输入姓名';
                    return null;
                  },
                ),
                const SizedBox(height: 15),
                TextFormField(
                  controller: _ageController,
                  decoration: const InputDecoration(labelText: '年龄', border: OutlineInputBorder()),
                  keyboardType: TextInputType.number,
                  validator: (value) {
                    if (value == null || value.isEmpty) return '请输入年龄';
                    if (int.tryParse(value) == null) return '请输入有效的数字';
                    return null;
                  },
                ),
                const SizedBox(height: 15),
                Row(
                  children: [
                    const Text("性别: ", style: TextStyle(fontSize: 16)),
                    const SizedBox(width: 10),
                    DropdownButton<String>(
                      value: _gender,
                      items: ['男', '女'].map((String value) {
                        return DropdownMenuItem<String>(value: value, child: Text(value));
                      }).toList(),
                      onChanged: (newValue) => setState(() => _gender = newValue!),
                    ),
                  ],
                ),
                const SizedBox(height: 15),
                TextFormField(
                  controller: _majorController,
                  decoration: const InputDecoration(labelText: '专业', border: OutlineInputBorder()),
                  validator: (value) => value!.isEmpty ? '请输入专业' : null,
                ),
                const SizedBox(height: 30),
                SizedBox(
                  width: double.infinity,
                  height: 50,
                  child: ElevatedButton(
                    onPressed: _saveForm,
                    style: ElevatedButton.styleFrom(backgroundColor: Colors.blue, foregroundColor: Colors.white),
                    child: const Text('保存', style: TextStyle(fontSize: 18)),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
