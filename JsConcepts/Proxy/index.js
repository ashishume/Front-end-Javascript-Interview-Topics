/**
 I have defined an object with a single property firstName and I was able to get and set 
 its value and it can be tracked, but when I added a new property blog, I was not aware of it.
 Using the Proxy object, we can build a proxy for another object that can intercept and alter its core activities.
 proxies will work as observers through which we can monitor what has changed in the object.
 */
const person = {
  firstName: "Prashant",
};

const handler = {
  set(target, prop, value) {
    console.log(`${prop} is changed from ${target[prop]} to ${value}`);
    target[prop] = value;
  },
};

const proxyPerson = new Proxy(person, handler);

proxyPerson.firstName = "Prashant 2";
// "firstName is changed from Prashant to Prashant 2"

proxyPerson.blog = "Learnersbucket";
// "blog is changed from undefined to Learnersbucket"
