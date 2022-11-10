/*
 * Filename: /home/cc/vscode-leetcode-problem-rating/src/controller/EventController.ts
 * Path: /home/cc/vscode-leetcode-problem-rating
 * Created Date: Monday, October 31st 2022, 10:16:47 am
 * Author: ccagml
 *
 * Copyright (c) 2022 ccagml . All rights reserved.
 */


import { EventEmitter } from "events";
import { eventService } from "../service/EventService";
class EventContorller extends EventEmitter {

    constructor() {
        super();
    }
    /**
     * 监听事件
     */
    public add_event() {
        eventService.add_event()
    }
}

export const eventContorller: EventContorller = new EventContorller();
