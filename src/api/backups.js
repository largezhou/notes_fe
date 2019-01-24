import axios from '@/plugins/axios'

export function postBackup() {
  return axios({
    url: 'backups',
    method: 'post',
  })
}
