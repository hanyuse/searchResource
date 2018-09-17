
const baseUrl = "http://dev.jdywl.cn:8081";

export { baseUrl };

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    throw error;
}



 export default  function  request(url, options) {
    const defaultOptions = {
        
    };
    const newOptions = { ...defaultOptions, ...options };
    if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
        if (!(newOptions.body instanceof FormData)) {
            newOptions.headers = {
                Accept: 'application/json',
                mode: "cors",
                'Content-Type': 'application/json; charset=utf-8',
                ...newOptions.headers
            };
            newOptions.body = JSON.stringify(newOptions.body);
        } else {
            // newOptions.body is FormData
            newOptions.headers = {
                Accept: 'application/json',
                mode: "cors",
              //  'Content-Type': 'multipart/form-data',
                ...newOptions.headers
            };
        }
    }

    return fetch(url, newOptions)
    .then(checkStatus)
    .then((response) => {
      if (newOptions.method === 'DELETE' || response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .catch((e) => {
        console.log("出错了，请联系管理员！")
        return -1;
    });
} 

function updateArray(item,arr,action){
    var newArr = [];
    for(let i=0;i<arr.length;i++){
        if(arr[i]["id"]==item.id){
            if(action==="UPDATE"){
                newArr.push({...item});
            }
        }else{
            newArr.push(arr[i])
        }
    }
    return newArr;
}

export {updateArray};