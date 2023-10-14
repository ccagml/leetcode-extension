/*
 * Filename: https://github.com/ccagml/leetcode-extension/src/controller/EventController.ts
 * Path: https://github.com/ccagml/leetcode-extension
 * Created Date: Monday, October 31st 2022, 10:16:47 am
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { eventService } from "../service/EventService";
// 事件的控制器
/* The EventController class has a method called addEvent that calls the addEvent method on the
eventService class */
class EventContorller {
  /**
   * 监听事件
   */
  /**
   * The function `addEvent()` is a public function that calls the `addEvent()` function in the
   * `eventService` service
   */
  public addEvent() {
    eventService.addEvent();
  }
}

export const eventController: EventContorller = new EventContorller();
