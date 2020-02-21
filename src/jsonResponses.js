const users = {};
const coffeeData = require('coffeeList');

// respondJSON response
const respondJSON = (request, response, status, object) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  response.writeHead(status, headers);
  response.write(JSON.stringify(object));
  response.end();
};

// respond JSON Meta response
const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.end();
};

// get users response
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };
    // 200 status code success
  respondJSON(request, response, 200, responseJSON);
};

// get users meta
const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

// function which adds a user
const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  // update name and age of user
  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }
  // return the appropriate response code
  return respondJSONMeta(request, response, responseCode);
};

// not real response
const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };
  // 404 is returned
  respondJSON(request, response, 404, responseJSON);
};

// not real meta response
const notRealMeta = (request, response) => respondJSONMeta(request, response, 404);

// not found response
const notFound = (request, response) => {
  const responseJSON = {
    message: 'Resource Not Found',
    id: notFound,
  };
  // 404 is returned
  respondJSON(request, response, 404, responseJSON);
};

// not found meta
const notFoundMeta = (request, response) => {
  // 404 is returned
  respondJSONMeta(request, response, 404);
};

//module exports
module.exports = {
  getUsers,
  getUsersMeta,
  addUser,
  notReal,
  notRealMeta,
  notFound,
  notFoundMeta,
};
