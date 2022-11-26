/*
 * Filename: https://github.com/ccagml/vscode-leetcode-problem-rating/src/controller/EventController.ts
 * Path: https://github.com/ccagml/vscode-leetcode-problem-rating
 * Created Date: Monday, October 31st 2022, 10:16:47 am
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */

import { eventService } from "../service/EventService";
import { statusBarTimeService } from "../service/StatusBarTimeService";
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

  public every_second() {
    statusBarTimeService.updateSecond();
  }
}

export const eventController: EventContorller = new EventContorller();
