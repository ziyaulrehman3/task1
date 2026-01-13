import { createSlice } from '@reduxjs/toolkit';

export const itemsSlice=createSlice({
    name:"itemsList",
    initialState:{
        list:[
            {
                  
    "id": 165,
    "Item": "Chicken TIkka",
    "Price": 58,
    "Image":"https://imgs.search.brave.com/l530GSH7WDmR0W5l4K70XKsMnCV7H4btKbfqFBcsKZU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDkv/MzQwLzQyNy9zbWFs/bC9wbGFuZXQtZWFy/dGgtd2l0aC1jbG91/ZHMtaXNvbGF0ZWQt/b24td2hpdGUtYmFj/a2dyb3VuZC1jb250/aW5lbnRzLW9mLWFz/aWEtZWxlbWVudHMt/b2YtdGhpcy1pbWFn/ZS1mdXJuaXNoZWQt/YnktbmFzYS0zZC1y/ZW5kZXJpbmctcGhv/dG8uanBn",
    "created_at": "2026-01-10T10:47:28.239671+00:00",
    "updated_at": "2026-01-10T10:47:28.239671+00:00"
  },
            
        ]
    },
    reducers:{
           manage:(state,action)=>{
              if(state.list.some((item) => item.id === action.payload.id)){

                state.list =state.list.map((item)=>{
                    if(item.id==action.payload.id){
                        return {
                            ...item,
                            ...action.payload
                        }
                    }else{
                        return item
                    }
                })

              }else{
state.list.push(action.payload)
              }
              
           }
    }
})

export const {manage}=itemsSlice.actions;
export default itemsSlice.reducer;
