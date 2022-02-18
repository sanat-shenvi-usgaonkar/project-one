const utils = {
  isFormValid: true,
  validateInputAndAddStyle: (inputRef) => {
    inputRef.current.style.borderColor = "black";
    utils.isFormValid = true;
    if (!inputRef.current.value.length || inputRef.current.value.length < 4 || inputRef.current.value.length > 15 || inputRef.current.value.match(/[!@#$%^&*(),.?":{}|<>]/g)) {
      inputRef.current.style.borderColor = "red";  
      utils.isFormValid = false;
    }
  },
  validateInput: () => {
    return utils.isFormValid;
  },
  sortPriority: (taskDetails) => {
    const sortedTaskDetails = [];
    ['High', 'Medium', 'Low'].forEach(prty => sortedTaskDetails.push(...taskDetails.filter(item => item.priority === prty)));
    return sortedTaskDetails;
  }
};

export default utils;
