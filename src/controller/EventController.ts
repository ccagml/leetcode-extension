/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/controller/EventController.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Monday, October 31st 2022, 10:16:47 am
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { eventService } from "../service/EventService";
// 事件的控制器
/* The EventController class has a method called add_event that calls the add_event method on the
eventService class */
class EventContorller {
  /**
   * 监听事件
   */
  /**
   * The function `add_event()` is a public function that calls the `add_event()` function in the
   * `eventService` service
   */
  public add_event() {
    eventService.add_event();
  }
}

export const eventController: EventContorller = new EventContorller();
