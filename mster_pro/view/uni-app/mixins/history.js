import { history } from '@/api/public.js'
export default {
  data() {
    return {
      
    };
  },
  methods: {
    getHistory() {
			console.log(this.$util.getNowUrl(),'page')
      history({
				page:this.$util.getNowUrl()
			}).then(res=>{})
    },
  }
};