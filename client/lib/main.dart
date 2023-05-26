// Copyright 2019 Aleksander Woźniak
// SPDX-License-Identifier: Apache-2.0
import 'dart:convert';

import 'package:client/screens/events_display.dart';
import 'package:client/widgets/event_tile.dart';
import 'package:flutter/services.dart';

import './screens/basics_example.dart';
import 'package:flutter/material.dart';
import 'package:universal_io/io.dart';
// import 'package:intl/date_symbol_data_local.dart';

void main() {
  // initializeDateFormatting().then((_) => runApp(MyApp()));
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: EventsDisplayScreen(),
    );
  }
}
