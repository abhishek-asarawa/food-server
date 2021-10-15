const response = (res, data, msg, isError = false, statusCode = 200) => {
  res.status(statusCode).json({
    msg,
    isError,
    data,
  });
};

export default response;
