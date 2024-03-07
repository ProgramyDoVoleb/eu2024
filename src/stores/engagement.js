import { ref } from 'vue'
import { defineStore } from 'pinia'
import { api } from '@/stores/core'
import { useNotifications } from '@/stores/notifications'
import axios from 'axios'

export const useEngagement = defineStore('engagement', () => {
    const start = ref(new Date().getTime());
    const list = ref([]);
    const notify = useNotifications();
  
    function add (path, hash, value, msg, cb) {
        var now = new Date().getTime();
        var ttc = Math.floor((now - start.value) / 1000);
        var note = notify.add(msg || 'Odesílám reakci');

        axios.post(api + 'engagement/add?c=' + new Date().getTime(), {
            domain: window.location.hostname,
            path,
            hash,
            value,
            ttc
        }).then((response) => {

            if (response.data.code === 200) {
                list.value.push({
                    path,
                    hash,
                    value,
                    now,
                    ttc,
                    response: response.data
                })

                notify.update(note, 'Uloženo', 'green');
    
                if (cb) cb(response.data.token);
            } else {
                notify.update(note, 'Chyba při ukládání', 'red');
            }
        });

    }

    function used (path, hash) {
        return !!list.value.find(x => x.path === path && hash === hash);
    }
  
    return { add, used, list, start }
  })