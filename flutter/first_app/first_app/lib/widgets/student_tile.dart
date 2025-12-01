import 'package:flutter/material.dart';
import 'package:first_app/models/student.dart';

class StudentTile extends StatelessWidget {
  final Student student;
  final VoidCallback onEdit;
  final VoidCallback onDelete;

  const StudentTile({super.key, required this.student, required this.onEdit, required this.onDelete});

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      child: ListTile(
        leading: CircleAvatar(child: Text(student.name.isNotEmpty ? student.name.substring(0, 1) : '?')),
        title: Text(student.name),
        subtitle: Text("${student.gender} | ${student.age}岁 | ${student.major}"),
        trailing: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            IconButton(
              icon: const Icon(Icons.edit, color: Colors.blue),
              onPressed: onEdit,
            ),
            IconButton(
              icon: const Icon(Icons.delete, color: Colors.red),
              onPressed: onDelete,
            ),
          ],
        ),
      ),
    );
  }
}
