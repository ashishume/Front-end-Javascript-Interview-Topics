Function.prototype.myBind = function (obj, ...args) {
  let func = this;
  return function (...newArgs) {
    func.apply(obj, [...args, ...newArgs]);
  };
};
