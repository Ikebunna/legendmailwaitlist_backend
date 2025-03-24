
// helper functions to handle responses
export const handleError = (res, error, message = "An unexpected error occurred", statusCode = 500) => {
    const errorMessage = error instanceof Error
      ? error.message
      : typeof error === "string"
        ? error
        : message;
  
    console.log(error);
  
    const response = {
      error: true,
      message: errorMessage
    };
  
    return res.status(statusCode).json(response);
  };

  export const handleSuccess = (res, statusCode, message, data = null) => {
    if (typeof statusCode !== "number") {
        console.error("❌ Invalid status code:", statusCode);
        statusCode = 200; // Default to 200
    }

    const response = {
        error: false,
        message: message,
        data
    };

    return res.status(statusCode).json(response); // Use `.json()`
};

