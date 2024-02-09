import { api } from '@/stores/core'
import { useRoute } from 'vue-router'
import axios from 'axios'

var page_visited = 0;
var page_last = "xxx";
var route = null;

export function ga (payloadOriginal) {

  route = useRoute();

  // console.log(route, payloadOriginal);

  var payload = null;

  if (typeof payloadOriginal === "undefined") {
    payload = {
      title: 'Eurovolby 2024 - Programy do voleb',
      path: route.path
    }
    document.title = 'Eurovolby 2024 - Programy do voleb';
  } else if (typeof payloadOriginal === "string") {
    payload = {
      title: payloadOriginal,
      path: route.path
    }
    document.title = payload.title + ' - Eurovolby 2024 - Programy do voleb';
  } else {
    payload = payloadOriginal
    document.title = payload.title + ' - Eurovolby 2024 - Programy do voleb';
  }

  if (page_last != payload.path) {

    page_last = payload.path;
    page_visited++;

    var query = JSON.stringify(payload.query || (route ? route.query : '{}'));

    if (query === '{}') query = null;

    axios.post(api + 'tracker/page?c=' + (new Date().getTime()), {
      n: page_visited,
      t: payload.title,
      p: payload.path,
      q: query,
      d: window.location.hostname
    });
  }
};

export function ge (payload) {

  axios.post(api + 'tracker/event?c=' + (new Date().getTime()), {
    p: window.location.pathname,
    e: payload.event,
    v: payload.value,
    d: window.location.hostname
  });
};

