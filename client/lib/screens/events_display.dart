import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:client/utils.dart';

import '../widgets/event_tile.dart';

class EventsDisplayScreen extends StatefulWidget {
  Map<String, Map<String, dynamic>> eventList =
      <String, Map<String, dynamic>>{};
  static const routeName = "/";
  static const stubPath = 'lib/assets/event_stubs.json';

  EventsDisplayScreen({
    Key? key,
  });

  @override
  State<EventsDisplayScreen> createState() => _EventsDisplayScreenState();
}

class _EventsDisplayScreenState extends State<EventsDisplayScreen> {
  Future<Map<String, Map<String, dynamic>>> readEventsFromDisk() async {
    String jsonString =
        await rootBundle.loadString(EventsDisplayScreen.stubPath);
    return parseJson(jsonString: jsonString);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Friendly - meet your friends'),
      ),
      body: FutureBuilder<Map<String, Map<String, dynamic>>>(
        future: readEventsFromDisk(),
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else {
            widget.eventList = snapshot.data!;
            // enclosedPrint(toPrint: snapshot.data!);
            return ListView.builder(
              itemCount: widget.eventList.length,
              itemBuilder: (BuildContext context, int i) {
                Map<String, dynamic> temp = widget.eventList.values.toList()[i];
                List<String> friendNames =
                    List<String>.from(temp['friendNames']);
                return EventTile(
                  eventTitle: temp['eventTitle'],
                  friendNames: friendNames,
                  location: temp['location'],
                  date: DateTime.parse(temp['date']),
                  notes: temp['notes'],
                );
              },
            );
          }
        },
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.calendar_month),
            label: 'Calender',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.people_alt_outlined),
            label: 'Appointments',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.settings),
            label: 'Settings',
          ),
        ],
      ),
    );
  }
}
