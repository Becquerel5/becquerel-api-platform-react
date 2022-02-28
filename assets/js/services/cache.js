import React from 'react';
const cache = {};

function set(key,data) {
    cache[key]={
        data:data,
        cacheAt: new Date().getTime()
    };
    
}

function get(key) {
    return new Promise((resolve)=>{
        resolve(cache[key] ? cache[key].data : null); 
    });
    
}
export default {
    set,get
};