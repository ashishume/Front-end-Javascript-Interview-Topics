/*
when same method is being used for different implementation with modification based on user input and default values
Example: shopping cart logic will remain same but payment gateway can be different using same customerinfo data and
can be modified if user changes the payment info
*/

class PaymentMethodStrategy {
  static BankAccount(customerInfo) {
    const { name, accountNumber, routingNumber } = customerInfo;
    // do stuff to get payment
  }

  static BitCoin(customerInfo) {
    const { emailAddress, accountNumber } = customerInfo;
    // do stuff to get payment
  }

  static CreditCard(customerInfo) {
    const { name, cardNumber, emailAddress } = customerInfo;
    // do stuff to get payment
  }

  static MailIn(customerInfo) {
    const { name, address, city, state, country } = customerInfo;
    // do stuff to get payment
  }

  static PayPal(customerInfo) {
    const { emailAddress } = customerInfo;
    // do stuff to get payment
  }
}

const PaymentMethodStrategy = require("./PaymentMethodStrategy");
const config = require("./config");

class Checkout {
  constructor(strategy = "CreditCard") {
    this.strategy = PaymentMethodStrategy[strategy];
  }

  // do some fancy code here and get user input and payment method

  changeStrategy(newStrategy) {
    this.strategy = PaymentMethodStrategy[newStrategy];
  }

  userInput = {
    name: "Malcolm",
    cardNumber: 3910000034581941,
    emailAddress: "mac@gmailer.com",
    country: "US",
  };

  selectedStrategy = "Bitcoin";

  //call this method
  //commented for duplication but this code will be present in the class
  //    changeStrategy(selectedStrategy)

  postPayment(userInput) {
    this.strategy(userInput);
  }
}

module.exports = new Checkout(config.paymentMethod.strategy);
