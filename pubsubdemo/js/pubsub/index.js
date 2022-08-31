export const pubsub = {
  events: {},
  subscribe: function(eventName, func) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(func)
  },
  publish: function(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => {
        fn(data);
      })
    }
  }
}