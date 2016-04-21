'use strict';"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var di_1 = require('angular2/src/core/di');
var message_bus_1 = require('angular2/src/web_workers/shared/message_bus');
var serializer_1 = require('angular2/src/web_workers/shared/serializer');
var api_1 = require('angular2/src/core/render/api');
var messaging_api_1 = require('angular2/src/web_workers/shared/messaging_api');
var bind_1 = require('./bind');
var event_dispatcher_1 = require('angular2/src/web_workers/ui/event_dispatcher');
var render_store_1 = require('angular2/src/web_workers/shared/render_store');
var service_message_broker_1 = require('angular2/src/web_workers/shared/service_message_broker');
var MessageBasedRenderer = (function () {
    function MessageBasedRenderer(_brokerFactory, _bus, _serializer, _renderStore, _rootRenderer) {
        this._brokerFactory = _brokerFactory;
        this._bus = _bus;
        this._serializer = _serializer;
        this._renderStore = _renderStore;
        this._rootRenderer = _rootRenderer;
    }
    MessageBasedRenderer.prototype.start = function () {
        var broker = this._brokerFactory.createMessageBroker(messaging_api_1.RENDERER_CHANNEL);
        this._bus.initChannel(messaging_api_1.EVENT_CHANNEL);
        this._eventDispatcher = new event_dispatcher_1.EventDispatcher(this._bus.to(messaging_api_1.EVENT_CHANNEL), this._serializer);
        broker.registerMethod("renderComponent", [api_1.RenderComponentType, serializer_1.PRIMITIVE], bind_1.bind(this._renderComponent, this));
        broker.registerMethod("selectRootElement", [serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._selectRootElement, this));
        broker.registerMethod("createElement", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._createElement, this));
        broker.registerMethod("createViewRoot", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE], bind_1.bind(this._createViewRoot, this));
        broker.registerMethod("createTemplateAnchor", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE], bind_1.bind(this._createTemplateAnchor, this));
        broker.registerMethod("createText", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._createText, this));
        broker.registerMethod("projectNodes", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._projectNodes, this));
        broker.registerMethod("attachViewAfter", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._attachViewAfter, this));
        broker.registerMethod("detachView", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._detachView, this));
        broker.registerMethod("destroyView", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._destroyView, this));
        broker.registerMethod("setElementProperty", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setElementProperty, this));
        broker.registerMethod("setElementAttribute", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setElementAttribute, this));
        broker.registerMethod("setBindingDebugInfo", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setBindingDebugInfo, this));
        broker.registerMethod("setElementClass", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setElementClass, this));
        broker.registerMethod("setElementStyle", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setElementStyle, this));
        broker.registerMethod("invokeElementMethod", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._invokeElementMethod, this));
        broker.registerMethod("setText", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE], bind_1.bind(this._setText, this));
        broker.registerMethod("listen", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._listen, this));
        broker.registerMethod("listenGlobal", [serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._listenGlobal, this));
        broker.registerMethod("listenDone", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._listenDone, this));
    };
    MessageBasedRenderer.prototype._renderComponent = function (renderComponentType, rendererId) {
        var renderer = this._rootRenderer.renderComponent(renderComponentType);
        this._renderStore.store(renderer, rendererId);
    };
    MessageBasedRenderer.prototype._selectRootElement = function (renderer, selector, elId) {
        this._renderStore.store(renderer.selectRootElement(selector, null), elId);
    };
    MessageBasedRenderer.prototype._createElement = function (renderer, parentElement, name, elId) {
        this._renderStore.store(renderer.createElement(parentElement, name, null), elId);
    };
    MessageBasedRenderer.prototype._createViewRoot = function (renderer, hostElement, elId) {
        var viewRoot = renderer.createViewRoot(hostElement);
        if (this._renderStore.serialize(hostElement) !== elId) {
            this._renderStore.store(viewRoot, elId);
        }
    };
    MessageBasedRenderer.prototype._createTemplateAnchor = function (renderer, parentElement, elId) {
        this._renderStore.store(renderer.createTemplateAnchor(parentElement, null), elId);
    };
    MessageBasedRenderer.prototype._createText = function (renderer, parentElement, value, elId) {
        this._renderStore.store(renderer.createText(parentElement, value, null), elId);
    };
    MessageBasedRenderer.prototype._projectNodes = function (renderer, parentElement, nodes) {
        renderer.projectNodes(parentElement, nodes);
    };
    MessageBasedRenderer.prototype._attachViewAfter = function (renderer, node, viewRootNodes) {
        renderer.attachViewAfter(node, viewRootNodes);
    };
    MessageBasedRenderer.prototype._detachView = function (renderer, viewRootNodes) {
        renderer.detachView(viewRootNodes);
    };
    MessageBasedRenderer.prototype._destroyView = function (renderer, hostElement, viewAllNodes) {
        renderer.destroyView(hostElement, viewAllNodes);
        for (var i = 0; i < viewAllNodes.length; i++) {
            this._renderStore.remove(viewAllNodes[i]);
        }
    };
    MessageBasedRenderer.prototype._setElementProperty = function (renderer, renderElement, propertyName, propertyValue) {
        renderer.setElementProperty(renderElement, propertyName, propertyValue);
    };
    MessageBasedRenderer.prototype._setElementAttribute = function (renderer, renderElement, attributeName, attributeValue) {
        renderer.setElementAttribute(renderElement, attributeName, attributeValue);
    };
    MessageBasedRenderer.prototype._setBindingDebugInfo = function (renderer, renderElement, propertyName, propertyValue) {
        renderer.setBindingDebugInfo(renderElement, propertyName, propertyValue);
    };
    MessageBasedRenderer.prototype._setElementClass = function (renderer, renderElement, className, isAdd) {
        renderer.setElementClass(renderElement, className, isAdd);
    };
    MessageBasedRenderer.prototype._setElementStyle = function (renderer, renderElement, styleName, styleValue) {
        renderer.setElementStyle(renderElement, styleName, styleValue);
    };
    MessageBasedRenderer.prototype._invokeElementMethod = function (renderer, renderElement, methodName, args) {
        renderer.invokeElementMethod(renderElement, methodName, args);
    };
    MessageBasedRenderer.prototype._setText = function (renderer, renderNode, text) {
        renderer.setText(renderNode, text);
    };
    MessageBasedRenderer.prototype._listen = function (renderer, renderElement, eventName, unlistenId) {
        var _this = this;
        var unregisterCallback = renderer.listen(renderElement, eventName, function (event) { return _this._eventDispatcher.dispatchRenderEvent(renderElement, null, eventName, event); });
        this._renderStore.store(unregisterCallback, unlistenId);
    };
    MessageBasedRenderer.prototype._listenGlobal = function (renderer, eventTarget, eventName, unlistenId) {
        var _this = this;
        var unregisterCallback = renderer.listenGlobal(eventTarget, eventName, function (event) { return _this._eventDispatcher.dispatchRenderEvent(null, eventTarget, eventName, event); });
        this._renderStore.store(unregisterCallback, unlistenId);
    };
    MessageBasedRenderer.prototype._listenDone = function (renderer, unlistenCallback) { unlistenCallback(); };
    MessageBasedRenderer = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [service_message_broker_1.ServiceMessageBrokerFactory, message_bus_1.MessageBus, serializer_1.Serializer, render_store_1.RenderStore, api_1.RootRenderer])
    ], MessageBasedRenderer);
    return MessageBasedRenderer;
}());
exports.MessageBasedRenderer = MessageBasedRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLXFuYk9aZFVuLnRtcC9hbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvdWkvcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLG1CQUF5QixzQkFBc0IsQ0FBQyxDQUFBO0FBQ2hELDRCQUF5Qiw2Q0FBNkMsQ0FBQyxDQUFBO0FBQ3ZFLDJCQUF1RCw0Q0FBNEMsQ0FBQyxDQUFBO0FBQ3BHLG9CQUEwRCw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3pGLDhCQUE4QywrQ0FBK0MsQ0FBQyxDQUFBO0FBRTlGLHFCQUFtQixRQUFRLENBQUMsQ0FBQTtBQUM1QixpQ0FBOEIsOENBQThDLENBQUMsQ0FBQTtBQUM3RSw2QkFBMEIsOENBQThDLENBQUMsQ0FBQTtBQUN6RSx1Q0FBMEMsd0RBQXdELENBQUMsQ0FBQTtBQUduRztJQUdFLDhCQUFvQixjQUEyQyxFQUFVLElBQWdCLEVBQ3JFLFdBQXVCLEVBQVUsWUFBeUIsRUFDMUQsYUFBMkI7UUFGM0IsbUJBQWMsR0FBZCxjQUFjLENBQTZCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNyRSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQzFELGtCQUFhLEdBQWIsYUFBYSxDQUFjO0lBQUcsQ0FBQztJQUVuRCxvQ0FBSyxHQUFMO1FBQ0UsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxnQ0FBZ0IsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLDZCQUFhLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLDZCQUFhLENBQUMsRUFBRSxJQUFJLENB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cG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvZGknO1xuaW1wb3J0IHtNZXNzYWdlQnVzfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2VfYnVzJztcbmltcG9ydCB7U2VyaWFsaXplciwgUFJJTUlUSVZFLCBSZW5kZXJTdG9yZU9iamVjdH0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9zZXJpYWxpemVyJztcbmltcG9ydCB7Um9vdFJlbmRlcmVyLCBSZW5kZXJlciwgUmVuZGVyQ29tcG9uZW50VHlwZX0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVuZGVyL2FwaSc7XG5pbXBvcnQge0VWRU5UX0NIQU5ORUwsIFJFTkRFUkVSX0NIQU5ORUx9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvbWVzc2FnaW5nX2FwaSc7XG5pbXBvcnQge1R5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZyc7XG5pbXBvcnQge2JpbmR9IGZyb20gJy4vYmluZCc7XG5pbXBvcnQge0V2ZW50RGlzcGF0Y2hlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3VpL2V2ZW50X2Rpc3BhdGNoZXInO1xuaW1wb3J0IHtSZW5kZXJTdG9yZX0gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9yZW5kZXJfc3RvcmUnO1xuaW1wb3J0IHtTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3Rvcnl9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VydmljZV9tZXNzYWdlX2Jyb2tlcic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBNZXNzYWdlQmFzZWRSZW5kZXJlciB7XG4gIHByaXZhdGUgX2V2ZW50RGlzcGF0Y2hlcjogRXZlbnREaXNwYXRjaGVyO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2Jyb2tlckZhY3Rvcnk6IFNlcnZpY2VNZXNzYWdlQnJva2VyRmFjdG9yeSwgcHJpdmF0ZSBfYnVzOiBNZXNzYWdlQnVzLFxuICAgICAgICAgICAgICBwcml2YXRlIF9zZXJpYWxpemVyOiBTZXJpYWxpemVyLCBwcml2YXRlIF9yZW5kZXJTdG9yZTogUmVuZGVyU3RvcmUsXG4gICAgICAgICAgICAgIHByaXZhdGUgX3Jvb3RSZW5kZXJlcjogUm9vdFJlbmRlcmVyKSB7fVxuXG4gIHN0YXJ0KCk6IHZvaWQge1xuICAgIHZhciBicm9rZXIgPSB0aGlzLl9icm9rZXJGYWN0b3J5LmNyZWF0ZU1lc3NhZ2VCcm9rZXIoUkVOREVSRVJfQ0hBTk5FTCk7XG4gICAgdGhpcy5fYnVzLmluaXRDaGFubmVsKEVWRU5UX0NIQU5ORUwpO1xuICAgIHRoaXMuX2V2ZW50RGlzcGF0Y2hlciA9IG5ldyBFdmVudERpc3BhdGNoZXIodGhpcy5fYnVzLnRvKEVWRU5UX0NIQU5ORUwpLCB0aGlzLl9zZXJpYWxpemVyKTtcblxuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcInJlbmRlckNvbXBvbmVudFwiLCBbUmVuZGVyQ29tcG9uZW50VHlwZSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9yZW5kZXJDb21wb25lbnQsIHRoaXMpKTtcblxuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcInNlbGVjdFJvb3RFbGVtZW50XCIsIFtSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX3NlbGVjdFJvb3RFbGVtZW50LCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwiY3JlYXRlRWxlbWVudFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fY3JlYXRlRWxlbWVudCwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImNyZWF0ZVZpZXdSb290XCIsIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fY3JlYXRlVmlld1Jvb3QsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJjcmVhdGVUZW1wbGF0ZUFuY2hvclwiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2NyZWF0ZVRlbXBsYXRlQW5jaG9yLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwiY3JlYXRlVGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fY3JlYXRlVGV4dCwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcInByb2plY3ROb2Rlc1wiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fcHJvamVjdE5vZGVzLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwiYXR0YWNoVmlld0FmdGVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9hdHRhY2hWaWV3QWZ0ZXIsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJkZXRhY2hWaWV3XCIsIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3RdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2RldGFjaFZpZXcsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJkZXN0cm95Vmlld1wiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fZGVzdHJveVZpZXcsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJzZXRFbGVtZW50UHJvcGVydHlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX3NldEVsZW1lbnRQcm9wZXJ0eSwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcInNldEVsZW1lbnRBdHRyaWJ1dGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX3NldEVsZW1lbnRBdHRyaWJ1dGUsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJzZXRCaW5kaW5nRGVidWdJbmZvXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9zZXRCaW5kaW5nRGVidWdJbmZvLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwic2V0RWxlbWVudENsYXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9zZXRFbGVtZW50Q2xhc3MsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJzZXRFbGVtZW50U3R5bGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX3NldEVsZW1lbnRTdHlsZSwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImludm9rZUVsZW1lbnRNZXRob2RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2ludm9rZUVsZW1lbnRNZXRob2QsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJzZXRUZXh0XCIsIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fc2V0VGV4dCwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImxpc3RlblwiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fbGlzdGVuLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwibGlzdGVuR2xvYmFsXCIsIFtSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fbGlzdGVuR2xvYmFsLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwibGlzdGVuRG9uZVwiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9saXN0ZW5Eb25lLCB0aGlzKSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW5kZXJDb21wb25lbnQocmVuZGVyQ29tcG9uZW50VHlwZTogUmVuZGVyQ29tcG9uZW50VHlwZSwgcmVuZGVyZXJJZDogbnVtYmVyKSB7XG4gICAgdmFyIHJlbmRlcmVyID0gdGhpcy5fcm9vdFJlbmRlcmVyLnJlbmRlckNvbXBvbmVudChyZW5kZXJDb21wb25lbnRUeXBlKTtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyZW5kZXJlciwgcmVuZGVyZXJJZCk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3RSb290RWxlbWVudChyZW5kZXJlcjogUmVuZGVyZXIsIHNlbGVjdG9yOiBzdHJpbmcsIGVsSWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHJlbmRlcmVyLnNlbGVjdFJvb3RFbGVtZW50KHNlbGVjdG9yLCBudWxsKSwgZWxJZCk7XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVFbGVtZW50KHJlbmRlcmVyOiBSZW5kZXJlciwgcGFyZW50RWxlbWVudDogYW55LCBuYW1lOiBzdHJpbmcsIGVsSWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQocGFyZW50RWxlbWVudCwgbmFtZSwgbnVsbCksIGVsSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlVmlld1Jvb3QocmVuZGVyZXI6IFJlbmRlcmVyLCBob3N0RWxlbWVudDogYW55LCBlbElkOiBudW1iZXIpIHtcbiAgICB2YXIgdmlld1Jvb3QgPSByZW5kZXJlci5jcmVhdGVWaWV3Um9vdChob3N0RWxlbWVudCk7XG4gICAgaWYgKHRoaXMuX3JlbmRlclN0b3JlLnNlcmlhbGl6ZShob3N0RWxlbWVudCkgIT09IGVsSWQpIHtcbiAgICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHZpZXdSb290LCBlbElkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVUZW1wbGF0ZUFuY2hvcihyZW5kZXJlcjogUmVuZGVyZXIsIHBhcmVudEVsZW1lbnQ6IGFueSwgZWxJZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUocmVuZGVyZXIuY3JlYXRlVGVtcGxhdGVBbmNob3IocGFyZW50RWxlbWVudCwgbnVsbCksIGVsSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlVGV4dChyZW5kZXJlcjogUmVuZGVyZXIsIHBhcmVudEVsZW1lbnQ6IGFueSwgdmFsdWU6IHN0cmluZywgZWxJZDogbnVtYmVyKSB7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUocmVuZGVyZXIuY3JlYXRlVGV4dChwYXJlbnRFbGVtZW50LCB2YWx1ZSwgbnVsbCksIGVsSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvamVjdE5vZGVzKHJlbmRlcmVyOiBSZW5kZXJlciwgcGFyZW50RWxlbWVudDogYW55LCBub2RlczogYW55W10pIHtcbiAgICByZW5kZXJlci5wcm9qZWN0Tm9kZXMocGFyZW50RWxlbWVudCwgbm9kZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYXR0YWNoVmlld0FmdGVyKHJlbmRlcmVyOiBSZW5kZXJlciwgbm9kZTogYW55LCB2aWV3Um9vdE5vZGVzOiBhbnlbXSkge1xuICAgIHJlbmRlcmVyLmF0dGFjaFZpZXdBZnRlcihub2RlLCB2aWV3Um9vdE5vZGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2RldGFjaFZpZXcocmVuZGVyZXI6IFJlbmRlcmVyLCB2aWV3Um9vdE5vZGVzOiBhbnlbXSkge1xuICAgIHJlbmRlcmVyLmRldGFjaFZpZXcodmlld1Jvb3ROb2Rlcyk7XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95VmlldyhyZW5kZXJlcjogUmVuZGVyZXIsIGhvc3RFbGVtZW50OiBhbnksIHZpZXdBbGxOb2RlczogYW55W10pIHtcbiAgICByZW5kZXJlci5kZXN0cm95Vmlldyhob3N0RWxlbWVudCwgdmlld0FsbE5vZGVzKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXdBbGxOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5fcmVuZGVyU3RvcmUucmVtb3ZlKHZpZXdBbGxOb2Rlc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0RWxlbWVudFByb3BlcnR5KHJlbmRlcmVyOiBSZW5kZXJlciwgcmVuZGVyRWxlbWVudDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5VmFsdWU6IGFueSkge1xuICAgIHJlbmRlcmVyLnNldEVsZW1lbnRQcm9wZXJ0eShyZW5kZXJFbGVtZW50LCBwcm9wZXJ0eU5hbWUsIHByb3BlcnR5VmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0RWxlbWVudEF0dHJpYnV0ZShyZW5kZXJlcjogUmVuZGVyZXIsIHJlbmRlckVsZW1lbnQ6IGFueSwgYXR0cmlidXRlTmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF0dHJpYnV0ZVZhbHVlOiBzdHJpbmcpIHtcbiAgICByZW5kZXJlci5zZXRFbGVtZW50QXR0cmlidXRlKHJlbmRlckVsZW1lbnQsIGF0dHJpYnV0ZU5hbWUsIGF0dHJpYnV0ZVZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEJpbmRpbmdEZWJ1Z0luZm8ocmVuZGVyZXI6IFJlbmRlcmVyLCByZW5kZXJFbGVtZW50OiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5VmFsdWU6IHN0cmluZykge1xuICAgIHJlbmRlcmVyLnNldEJpbmRpbmdEZWJ1Z0luZm8ocmVuZGVyRWxlbWVudCwgcHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEVsZW1lbnRDbGFzcyhyZW5kZXJlcjogUmVuZGVyZXIsIHJlbmRlckVsZW1lbnQ6IGFueSwgY2xhc3NOYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBpc0FkZDogYm9vbGVhbikge1xuICAgIHJlbmRlcmVyLnNldEVsZW1lbnRDbGFzcyhyZW5kZXJFbGVtZW50LCBjbGFzc05hbWUsIGlzQWRkKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEVsZW1lbnRTdHlsZShyZW5kZXJlcjogUmVuZGVyZXIsIHJlbmRlckVsZW1lbnQ6IGFueSwgc3R5bGVOYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZVZhbHVlOiBzdHJpbmcpIHtcbiAgICByZW5kZXJlci5zZXRFbGVtZW50U3R5bGUocmVuZGVyRWxlbWVudCwgc3R5bGVOYW1lLCBzdHlsZVZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ludm9rZUVsZW1lbnRNZXRob2QocmVuZGVyZXI6IFJlbmRlcmVyLCByZW5kZXJFbGVtZW50OiBhbnksIG1ldGhvZE5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmdzOiBhbnlbXSkge1xuICAgIHJlbmRlcmVyLmludm9rZUVsZW1lbnRNZXRob2QocmVuZGVyRWxlbWVudCwgbWV0aG9kTmFtZSwgYXJncyk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRUZXh0KHJlbmRlcmVyOiBSZW5kZXJlciwgcmVuZGVyTm9kZTogYW55LCB0ZXh0OiBzdHJpbmcpIHtcbiAgICByZW5kZXJlci5zZXRUZXh0KHJlbmRlck5vZGUsIHRleHQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuKHJlbmRlcmVyOiBSZW5kZXJlciwgcmVuZGVyRWxlbWVudDogYW55LCBldmVudE5hbWU6IHN0cmluZywgdW5saXN0ZW5JZDogbnVtYmVyKSB7XG4gICAgdmFyIHVucmVnaXN0ZXJDYWxsYmFjayA9IHJlbmRlcmVyLmxpc3RlbihyZW5kZXJFbGVtZW50LCBldmVudE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZXZlbnQpID0+IHRoaXMuX2V2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaFJlbmRlckV2ZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlckVsZW1lbnQsIG51bGwsIGV2ZW50TmFtZSwgZXZlbnQpKTtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZSh1bnJlZ2lzdGVyQ2FsbGJhY2ssIHVubGlzdGVuSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuR2xvYmFsKHJlbmRlcmVyOiBSZW5kZXJlciwgZXZlbnRUYXJnZXQ6IHN0cmluZywgZXZlbnROYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmxpc3RlbklkOiBudW1iZXIpIHtcbiAgICB2YXIgdW5yZWdpc3RlckNhbGxiYWNrID0gcmVuZGVyZXIubGlzdGVuR2xvYmFsKFxuICAgICAgICBldmVudFRhcmdldCwgZXZlbnROYW1lLFxuICAgICAgICAoZXZlbnQpID0+IHRoaXMuX2V2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaFJlbmRlckV2ZW50KG51bGwsIGV2ZW50VGFyZ2V0LCBldmVudE5hbWUsIGV2ZW50KSk7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUodW5yZWdpc3RlckNhbGxiYWNrLCB1bmxpc3RlbklkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RlbkRvbmUocmVuZGVyZXI6IFJlbmRlcmVyLCB1bmxpc3RlbkNhbGxiYWNrOiBGdW5jdGlvbikgeyB1bmxpc3RlbkNhbGxiYWNrKCk7IH1cbn1cbiJdfQ==