exports.resSendStatusMessage = (res, status = 200, message = "") => {
  res.status(status);

  return res.send({
    message,
  });
};

exports.resSendBody = (res, status = 200, body) => {
  res.status(status);
  return res.send(body);
};
