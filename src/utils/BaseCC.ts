// https://github.com/PureMVC/puremvc-typescript-multicore-framework

export namespace BaseCC {
  // 开始的头
  export class Facade {
    static MULTITON_MSG = "重复创建 Facade";
    static instanceMap = {};
    model;
    view;
    controller;
    facade_init_key;
    constructor(key: string) {
      this.model = null;
      this.view = null;
      this.controller = null;
      this.facade_init_key = null;
      if (Facade.instanceMap[key]) throw Error(Facade.MULTITON_MSG);
      this.initializeNotifier(key);
      Facade.instanceMap[key] = this;
      this.initializeFacade();
    }
    initializeFacade() {
      this.initializeModel();
      this.initializeController();
      this.initializeView();
    }
    initializeModel() {
      if (!this.model) {
        this.model = Model.getInstance(this.facade_init_key);
      }
    }
    initializeController() {
      if (!this.controller) this.controller = Controller.getInstance(this.facade_init_key);
    }
    initializeView() {
      if (!this.view) this.view = View.getInstance(this.facade_init_key);
    }
    registerCommand(notificationName, commandClassRef) {
      this.controller.registerCommand(notificationName, commandClassRef);
    }
    removeCommand(notificationName) {
      this.controller.removeCommand(notificationName);
    }
    hasCommand(notificationName) {
      return this.controller.hasCommand(notificationName);
    }
    registerProxy(proxy) {
      this.model.registerProxy(proxy);
    }
    retrieveProxy(proxyName) {
      return this.model.retrieveProxy(proxyName);
    }
    removeProxy(proxyName) {
      let proxy;
      if (this.model) proxy = this.model.removeProxy(proxyName);
      return proxy;
    }
    hasProxy(proxyName) {
      return this.model.hasProxy(proxyName);
    }
    registerMediator(mediator) {
      if (this.view) this.view.registerMediator(mediator);
    }
    retrieveMediator(mediatorName) {
      return this.view.retrieveMediator(mediatorName);
    }
    removeMediator(mediatorName) {
      let mediator;
      if (this.view) mediator = this.view.removeMediator(mediatorName);
      return mediator;
    }
    hasMediator(mediatorName) {
      return this.view.hasMediator(mediatorName);
    }
    notifyObservers(notification) {
      if (this.view) this.view.notifyObservers(notification);
    }
    sendNotification(name, body?, type?) {
      if (typeof body === "undefined") {
        body = null;
      }
      if (typeof type === "undefined") {
        type = null;
      }
      this.notifyObservers(new Notification(name, body, type));
    }
    initializeNotifier(key: string) {
      this.facade_init_key = key;
    }
    static getInstance(key: string) {
      if (!Facade.instanceMap[key]) Facade.instanceMap[key] = new Facade(key);
      return Facade.instanceMap[key];
    }

    static hasCore(key) {
      return Facade.instanceMap[key] ? true : false;
    }
    static removeCore(key) {
      if (!Facade.instanceMap[key]) return;
      Model.removeModel(key);
      View.removeView(key);
      Controller.removeController(key);
      delete Facade.instanceMap[key];
    }
  }

  export class Model implements IModel {
    static MULTITON_MSG = "重复创建 Model";
    static instanceMap = {};
    proxyMap;
    facade_init_key;
    constructor(key) {
      this.proxyMap = null;
      this.facade_init_key = key;
      if (Model.instanceMap[key]) throw Error(Model.MULTITON_MSG);
      Model.instanceMap[key] = this;
      this.facade_init_key = key;
      this.proxyMap = {};
      this.initializeModel();
    }
    initializeModel() {}
    registerProxy(proxy) {
      proxy.initializeNotifier(this.facade_init_key);
      this.proxyMap[proxy.getProxyName()] = proxy;
      proxy.onRegister();
    }
    removeProxy(proxyName) {
      let proxy = this.proxyMap[proxyName];
      if (proxy) {
        delete this.proxyMap[proxyName];
        proxy.onRemove();
      }
      return proxy;
    }
    retrieveProxy(proxyName) {
      return this.proxyMap[proxyName] || null;
    }
    hasProxy(proxyName) {
      return this.proxyMap[proxyName] != null;
    }
    static getInstance(key) {
      if (!Model.instanceMap[key]) Model.instanceMap[key] = new Model(key);
      return Model.instanceMap[key];
    }
    static removeModel(key) {
      delete Model.instanceMap[key];
    }
  }

  export class Controller {
    static MULTITON_MSG = "重复创建 Controller";
    static instanceMap = {};
    view;
    commandMap;
    facade_init_key;
    constructor(key) {
      this.view = null;
      this.commandMap = null;
      this.facade_init_key = null;
      if (Controller.instanceMap[key]) throw Error(Controller.MULTITON_MSG);
      Controller.instanceMap[key] = this;
      this.facade_init_key = key;
      this.commandMap = {};
      this.initializeController();
    }
    initializeController() {
      this.view = View.getInstance(this.facade_init_key);
    }
    executeCommand(notification) {
      let commandClassRef = this.commandMap[notification.getName()];
      if (commandClassRef) {
        let command = new commandClassRef();
        command.initializeNotifier(this.facade_init_key);
        command.execute(notification);
      }
    }
    registerCommand(notificationName, commandClassRef) {
      if (!this.commandMap[notificationName])
        this.view.registerObserver(notificationName, new Observer(this.executeCommand, this));
      this.commandMap[notificationName] = commandClassRef;
    }
    hasCommand(notificationName) {
      return this.commandMap[notificationName] != null;
    }
    removeCommand(notificationName) {
      if (this.hasCommand(notificationName)) {
        this.view.removeObserver(notificationName, this);
        delete this.commandMap[notificationName];
      }
    }
    static getInstance(key) {
      if (!Controller.instanceMap[key]) Controller.instanceMap[key] = new Controller(key);
      return Controller.instanceMap[key];
    }
    static removeController(key) {
      delete Controller.instanceMap[key];
    }
  }

  export class View {
    static instanceMap = {};
    static MULTITON_MSG = "重复创建View";
    mediatorMap;
    observerMap;
    facade_init_key;
    constructor(key) {
      this.mediatorMap = null;
      this.observerMap = null;
      this.facade_init_key = null;
      if (View.instanceMap[key]) throw Error(View.MULTITON_MSG);
      View.instanceMap[key] = this;
      this.facade_init_key = key;
      this.mediatorMap = {};
      this.observerMap = {};
      this.initializeView();
    }
    initializeView() {}
    registerObserver(notificationName, observer) {
      let observers = this.observerMap[notificationName];
      if (observers) observers.push(observer);
      else this.observerMap[notificationName] = [observer];
    }
    removeObserver(notificationName, notifyContext) {
      let observers = this.observerMap[notificationName];
      let i = observers.length;
      while (i--) {
        let observer = observers[i];
        if (observer.compareNotifyContext(notifyContext)) {
          observers.splice(i, 1);
          break;
        }
      }
      if (observers.length == 0) delete this.observerMap[notificationName];
    }
    notifyObservers(notification) {
      let notificationName = notification.getName();
      let observersRef = this.observerMap[notificationName];
      if (observersRef) {
        let observers = observersRef.slice(0);
        let len = observers.length;
        for (let i = 0; i < len; i++) {
          let observer = observers[i];
          observer.notifyObserver(notification);
        }
      }
    }
    registerMediator(mediator) {
      let name = mediator.getMediatorName();
      if (this.mediatorMap[name]) return;
      mediator.initializeNotifier(this.facade_init_key);
      this.mediatorMap[name] = mediator;
      let interests = mediator.listNotificationInterests();
      let len = interests.length;
      if (len > 0) {
        let observer = new Observer(mediator.handleNotification, mediator);
        for (let i = 0; i < len; i++) this.registerObserver(interests[i], observer);
      }
      mediator.onRegister();
    }
    retrieveMediator(mediatorName) {
      return this.mediatorMap[mediatorName] || null;
    }
    removeMediator(mediatorName) {
      let mediator = this.mediatorMap[mediatorName];
      if (!mediator) return null;
      let interests = mediator.listNotificationInterests();
      let i = interests.length;
      while (i--) this.removeObserver(interests[i], mediator);
      delete this.mediatorMap[mediatorName];
      mediator.onRemove();
      return mediator;
    }
    hasMediator(mediatorName) {
      return this.mediatorMap[mediatorName] != null;
    }
    static getInstance(key) {
      if (!View.instanceMap[key]) View.instanceMap[key] = new View(key);
      return View.instanceMap[key];
    }
    static removeView(key) {
      delete View.instanceMap[key];
    }
  }

  export interface ICommand extends INotifier {
    execute(notification: INotification): void;
  }

  export interface IController {
    executeCommand(notification: INotification): void;
    registerCommand(notificationName: string, commandClassRef: Function): void;
    hasCommand(notificationName: string): boolean;
    removeCommand(notificationName: string): void;
  }

  export interface IFacade extends INotifier {
    registerCommand(notificationName: string, commandClassRef: Function): void;
    removeCommand(notificationName: string): void;
    hasCommand(notificationName: string): boolean;
    registerProxy(proxy: IProxy): void;
    retrieveProxy(proxyName: string): IProxy;
    removeProxy(proxyName: string): IProxy;
    hasProxy(proxyName: string): boolean;
    registerMediator(mediator: IMediator): void;
    retrieveMediator(mediatorName: string): IMediator;
    removeMediator(mediatorName: string): IMediator;
    hasMediator(mediatorName: string): boolean;
    notifyObservers(notification: INotification): void;
  }

  export interface IMediator extends INotifier {
    getMediatorName(): string;
    getViewComponent(): any;
    setViewComponent(viewComponent: any): void;
    listNotificationInterests(): string[];
    handleNotification(notification: INotification): void;
    onRegister(): void;
    onRemove(): void;
  }

  export interface IModel {
    registerProxy(proxy: IProxy): void;
    removeProxy(proxyName: string): IProxy;
    retrieveProxy(proxyName: string): IProxy;
    hasProxy(proxyName: string): boolean;
  }

  export interface INotification {
    getName(): string;
    setBody(body: any): void;
    getBody(): any;
    setType(type: string): void;
    getType(): string;
    toString(): string;
  }

  export interface INotifier {
    sendNotification(name: string, body?: any, type?: string): void;
    initializeNotifier(key: string): void;
  }

  export interface IObserver {
    setNotifyMethod(notifyMethod: Function): void;
    setNotifyContext(notifyContext: any): void;
    notifyObserver(notification: INotification): void;
    compareNotifyContext(object: any): boolean;
  }

  export interface IProxy extends INotifier {
    getProxyName(): string;
    setData(data: any): void;
    getData(): any;
    onRegister(): void;
    onRemove(): void;
  }

  export interface IView {
    registerObserver(notificationName: string, observer: IObserver): void;
    removeObserver(notificationName: string, notifyContext: any): void;
    notifyObservers(notification: INotification): void;
    registerMediator(mediator: IMediator): void;
    retrieveMediator(mediatorName: string): IMediator;
    removeMediator(mediatorName: string): IMediator;
    hasMediator(mediatorName: string): boolean;
  }

  export class Observer {
    notify;
    context;
    constructor(notifyMethod, notifyContext) {
      this.notify = null;
      this.context = null;
      this.setNotifyMethod(notifyMethod);
      this.setNotifyContext(notifyContext);
    }
    getNotifyMethod() {
      return this.notify;
    }
    setNotifyMethod(notifyMethod) {
      this.notify = notifyMethod;
    }
    getNotifyContext() {
      return this.context;
    }
    setNotifyContext(notifyContext) {
      this.context = notifyContext;
    }
    notifyObserver(notification) {
      this.getNotifyMethod().call(this.getNotifyContext(), notification);
    }
    compareNotifyContext(object) {
      return object === this.context;
    }
  }

  export class Notification {
    name;
    body;
    type;
    constructor(name, body, type) {
      if (typeof body === "undefined") {
        body = null;
      }
      if (typeof type === "undefined") {
        type = null;
      }
      this.name = name;
      this.body = body;
      this.type = type;
    }
    getName() {
      return this.name;
    }
    setBody(body) {
      this.body = body;
    }
    getBody() {
      return this.body;
    }
    setType(type) {
      this.type = type;
    }
    getType() {
      return this.type;
    }
    toString() {
      let msg = "Notification Name: " + this.getName();
      msg += "\nBody:" + (this.getBody() == null ? "null" : this.getBody().toString());
      msg += "\nType:" + (this.getType() == null ? "null" : this.getType());
      return msg;
    }
  }

  export class Notifier {
    static MULTITON_MSG = "facade_init_key for this Notifier not yet initialized!";
    facade_init_key;
    constructor() {
      this.facade_init_key = null;
    }
    initializeNotifier(key) {
      this.facade_init_key = key;
    }
    sendNotification(name, body?, type?) {
      if (typeof body === "undefined") {
        body = null;
      }
      if (typeof type === "undefined") {
        type = null;
      }
      if (this.facade()) this.facade().sendNotification(name, body, type);
    }
    facade() {
      if (this.facade_init_key === null) throw Error(Notifier.MULTITON_MSG);
      return Facade.getInstance(this.facade_init_key);
    }
  }

  export class MacroCommand extends Notifier implements ICommand, INotifier {
    subCommands: Function[];
    constructor() {
      super();
      this.subCommands = [];
      this.initializeMacroCommand();
    }
    initializeMacroCommand() {}
    addSubCommand(commandClassRef) {
      this.subCommands.push(commandClassRef);
    }
    execute(notification) {
      let subCommands = this.subCommands.slice(0);
      let len = this.subCommands.length;
      for (let i = 0; i < len; i++) {
        let commandClassRef = subCommands[i];
        let commandInstance = new (commandClassRef as any)();
        commandInstance.initializeNotifier(this.facade_init_key);
        commandInstance.execute(notification);
      }
      this.subCommands.splice(0);
    }
  }

  export class SimpleCommand extends Notifier implements ICommand, INotifier {
    constructor() {
      super();
    }
    execute(_notification) {}
  }

  export class Mediator extends Notifier implements IMediator, INotifier {
    static NAME = "Mediator";
    mediatorName;
    viewComponent;
    constructor(mediatorName, viewComponent?) {
      super();
      if (typeof mediatorName === "undefined") {
        mediatorName = null;
      }
      if (typeof viewComponent === "undefined") {
        viewComponent = null;
      }
      this.mediatorName = mediatorName != null ? mediatorName : Mediator.NAME;
      this.viewComponent = viewComponent;
    }
    getMediatorName() {
      return this.mediatorName;
    }
    getViewComponent() {
      return this.viewComponent;
    }
    setViewComponent(viewComponent) {
      this.viewComponent = viewComponent;
    }
    listNotificationInterests(): string[] {
      return [];
    }
    handleNotification(_notification: INotification) {}
    onRegister() {}
    onRemove() {}
  }

  export class Proxy extends Notifier implements IProxy, INotifier {
    static NAME = "Proxy";
    proxyName;
    data;
    constructor(proxyName, data?) {
      super();
      if (typeof proxyName === "undefined") {
        proxyName = null;
      }
      if (typeof data === "undefined") {
        data = null;
      }
      this.proxyName = proxyName != null ? proxyName : Proxy.NAME;
      if (data != null) this.setData(data);
    }
    getProxyName() {
      return this.proxyName;
    }
    setData(data) {
      this.data = data;
    }
    getData() {
      return this.data;
    }
    onRegister() {}
    onRemove() {}
  }
}
