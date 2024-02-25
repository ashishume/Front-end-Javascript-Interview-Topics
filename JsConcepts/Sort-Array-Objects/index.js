const person = {
  firstName: 'Prashant'
}

const handler = {
set(target, prop, value) {
  console.log(target);
  console.log(prop);
  console.log(value);
  // console.log(`${prop} is changed from ${target[prop]} to ${value}`);
  target[prop] = value;
},
};

const proxyPerson = new Proxy(person, handler);

proxyPerson.firstName = "Prashant 2"; 
// "firstName is changed from Prashant to Prashant 2"

// proxyPerson.blog = "Learnersbucket";
// "blog is changed from undefined to Learnersbucket"