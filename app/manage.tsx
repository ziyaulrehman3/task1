import { useFocusEffect } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { manage } from '../store/itemSlice';

interface Item {
                       
  "id": number;
    "Item": string;
    "Price": number;
    'Image':string,
    "created_at": string;
    "updated_at": string;

  
}

export default function Manage(){

    const {id} =useLocalSearchParams()

    const dispatch=useDispatch();
                        const dataTemp=useSelector((state:any)=>state.itemSlice.list) as Item[];
                        


    const [newItem,setNewItem]=useState<Item>({
        "id":0,
    "Item": "",
    "Price": 0,
    'Image':"",
    "updated_at":"",
        "created_at": "",


    })

    useFocusEffect(
        useCallback(()=>{

            const temp=async ()=>{

                if(id){

                    const currentData=dataTemp.filter((item:Item)=>Number(item.id)==Number(id));
                    setNewItem(currentData[0])

                }

            }

            temp();
        },[id, dataTemp])

    )

  const itemList: { name: string; key: keyof Item }[] = [
  { name: "Item Name", key: "Item" },
  { name: "Price", key: "Price" },
  { name: "Image Url", key: "Image" },
];


    function addToList(){
        const listItem={
            ...newItem,
        }
  
        if(!id){
          listItem["id"]= new Date().getTime();
          listItem["updated_at"]=  String(new Date().getTime());
        };

        dispatch(manage(listItem));
        router.setParams({ id: undefined });


        setNewItem({
        "id":0,
    "Item": "",
    "Price": 0,
    'Image':"",
    "updated_at":"",
        "created_at": "",


    })



     

    }


    return (
        <SafeAreaView style={{flex:1,"backgroundColor":"#2795F5",}}>
            <View style={{"display":"flex","gap":24,"padding":4}}>
                <Text style={style.mainHeading}>
                    Add/Update Item
                </Text>
                
                <View style={style.formContainer}>
                    {
                        itemList.map((item)=>(
   <View style={style.inputContainer}>
                        <Text style={style.inputHeading}>
                            {item.name}:
                        </Text>
                        <TextInput placeholder="Enter the Name" placeholderTextColor="white" onChangeText={(text)=>setNewItem((prev)=>({
                            ...prev,
                            [item.key]:text
                        }))} value={String(newItem[item.key])} style={style.inputStyle}/>
                    </View>
                        ))
                    }
                 
                </View>

                <Pressable style={style.formButton} onPress={addToList}>
                    <Text style={style.submitButton}>Add/Update Item</Text>
                </Pressable>


            </View>
        </SafeAreaView>
    )

}

const style=StyleSheet.create({
    inputContainer:{
        width:"85%",
        marginHorizontal:'auto',
        gap:4

    },
    inputStyle:{
        borderColor:"white",
        borderWidth:1,
        borderRadius:5,
         fontSize:18,
         padding:6,
    },
    inputHeading:{
        fontSize:20,
        color:"white",

    },
    formContainer:{
        display:"flex",
        flexDirection:"column",
        gap:10,
    },

    formButton:{
        backgroundColor:"black",
        width:"85%",
        marginHorizontal:'auto',
        height:40,
        borderRadius:20,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    },
    submitButton:{
        color:"white",
        fontSize:20
    },
    mainHeading:{
        fontSize:24,
        fontWeight:"bold"
    }
})