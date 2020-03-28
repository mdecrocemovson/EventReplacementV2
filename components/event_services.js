export const fetchAllEvents = () => {
  return fetch("http://localhost:3000/events", {
    credentials: "same-origin",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  });
};

export const fetchSpecificEvent = id => {
  return fetch(`http://localhost:3000/events/${id}`, {
    credentials: "same-origin",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  });
};

export const createEvent = payload => {
  return fetch('http://localhost:3000/events', {
    credentials: "same-origin",
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json'
    },
    method: "post",
    body: JSON.stringify(payload)
  });
}

export const editEvent = (payload, id) => {
  return fetch(`http://localhost:3000/events/${id}`, {
    credentials: "same-origin",
    headers: {
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/json'
    },
    method: "post",
    body: JSON.stringify(payload)
  });
}


