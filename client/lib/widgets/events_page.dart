import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class EventTile extends StatefulWidget {
  final String eventName;
  final List<String> friendNames;
  final String location;
  final DateTime date;
  final String? notes;

  const EventTile({
    super.key,
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
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    String formattedDate = DateFormat('dd-MM kk:mm').format(widget.date);
    return ExpansionTile(
      title: Text(widget.eventName),
      subtitle: Text(widget.friendNames.toString()),
      leading: Text(widget.location),
      trailing: Text(formattedDate),
      children: widget.notes != null
          ? [
              ListTile(
                title: Text(widget.notes!),
              )
            ]
          : [],
    );
  }
}
