class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }

 
}

const hello = new ErrorHandler("Hello Bangladesh", 1000);

console.log(hello)