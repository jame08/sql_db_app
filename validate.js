function validateStr(data){
  
    return typeof(data) === "string" || "This should be a String";
  
  }
  
  function validateNumber(data){
    var isValid = ! isNaN(parseInt(data));
    return isValid || "This should be a number";
  }
  

  module.exports.validateNumber = validateNumber;
  module.exports.validateStr = validateStr;