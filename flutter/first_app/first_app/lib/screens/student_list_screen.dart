import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:first_app/providers/student_provider.dart';
import 'package:first_app/screens/add_edit_student_screen.dart';

class StudentListScreen extends StatelessWidget {
  const StudentListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('学生列表'),
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
      ),
      body: Consumer<StudentProvider>(
        builder: (context, provider, child) {
          if (provider.students.isEmpty) return const Center(child: Text("暂无学生数据"));
          return ListView.builder(
            itemCount: provider.students.length,
            itemBuilder: (context, index) {
              final student = provider.students[index];
              return Card(
                margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                child: ListTile(
                  leading: CircleAvatar(child: Text(student.name.substring(0, 1))),
                  title: Text(student.name),
                  subtitle: Text("${student.gender} | ${student.age}岁 | ${student.major}"),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        icon: const Icon(Icons.edit, color: Colors.blue),
                        onPressed: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => AddEditStudentScreen(student: student)),
                          );
                        },
                      ),
                      IconButton(
                        icon: const Icon(Icons.delete, color: Colors.red),
                        onPressed: () {
                          showDialog(
                            context: context,
                            builder: (ctx) => AlertDialog(
                              title: const Text("确认删除"),
                              content: Text("确定要删除学生 ${student.name} 吗？"),
                              actions: [
                                TextButton(onPressed: () => Navigator.of(ctx).pop(), child: const Text("取消")),
                                TextButton(
                                  onPressed: () {
                                    provider.deleteStudent(student.id);
                                    Navigator.of(ctx).pop();
                                  },
                                  child: const Text("删除", style: TextStyle(color: Colors.red)),
                                ),
                              ],
                            ),
                          );
                        },
                      ),
                    ],
                  ),
                ),
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(context, MaterialPageRoute(builder: (context) => const AddEditStudentScreen()));
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
