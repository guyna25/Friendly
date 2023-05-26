import 'package:client/utils.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class EventTile extends StatefulWidget {
  final String eventTitle;
  final List<String> friendNames;
  final String location;
  final DateTime date;
  final String? notes;

  const EventTile({
    super.key,
    required this.eventTitle,
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
      title: Text(widget.eventTitle),
      subtitle: Text(widget.friendNames.toString()),
      leading: Text(widget.location),
      trailing: Text(formattedDate),
      children: widget.notes == null
          ? []
          : <Widget>[
              ListTile(title: Text(widget.notes!)),
            ],
    );
  }
}
