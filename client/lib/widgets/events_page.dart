import 'package:flutter/material.dart';

class EventTile extends StatefulWidget {
  final String eventName;
  final List<String> friendNames;
  final String location;
  final DateTime date;
  final String? notes;

  EventTile({
    required this.eventName,
    required this.friendNames,
    required this.location,
    required this.date,
    this.notes,
  });

  @override
  _EventTileState createState() => _EventTileState();
}

class _EventTileState extends State<EventTile> {
  int _counter = 0;

  @override
  void initState() {
    super.initState();
    _counter = widget.count;
  }

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return ExpansionTile(
      title: Text(widget.eventName),
    );
  }
}
