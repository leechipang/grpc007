import { spread } from '@/api/user.js'
import Cache from '@/utils/cache'

const shareScence = function(spid,islogin) {
    if(spid)Cache.set("spread", spid || 0);
	if(spid && islogin){
		spread(spid).then(res=>{
		}) 
	} 
}
export default shareScence

