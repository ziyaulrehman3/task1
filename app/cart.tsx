import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

interface Item {
                       
    "id": number;
    "Item": string;
    "Price": number;
    'Image':string,
    "created_at": string;
    "updated_at": string;
  
}

export default function Index(){


    const data=useSelector((state:any)=>state.itemSlice.list) as Item[];

    const [cart,setCart]=useState<number[]>([])

    useFocusEffect(
         useCallback(()=>{

         const temp=async ()=>{
            const list=await AsyncStorage.getItem("list");
            let cart:number[]=list?JSON.parse(list):[];
             setCart(cart)
         }

         temp();

    },[])

    )

   

    const AddToCart=async (id:number)=>{
        try{

            const list=await AsyncStorage.getItem("list");
            let cart:number[]=list?JSON.parse(list):[];
            if(cart.includes(id)){
               cart= cart.filter((item:number)=>item!=id)
            }else{
            cart.push(id)

            }

            await AsyncStorage.setItem('list',JSON.stringify(cart))
            setCart(cart)
        }catch(err){
            console.log(err)
        }

    }

    return (
        <SafeAreaView style={{flex:1}}>
            <View>

                <FlatList
                data={data.filter((item)=>cart.includes(item.id))}
                keyExtractor={(item)=>item.id.toString()}
                renderItem={({item})=>(
                    <View style={style.itemContainer}>
                        <Image style={style.itemImage} source={{"uri":item.Image || "" }}/>
                        <Text style={style.itemHeading}>{item.Item}</Text>
                        <View style={style.itemContant}>
                            <View style={style.itemGlassEffect}>
                                <Text>₹{item.Price}</Text>
                            </View>

                            <Pressable style={style.itemGlassEffect} onPress={()=>AddToCart(item.id)}>
                                <Text style={{"color":cart.includes(item.id)?"#DB2727":""}}>
                                    {
                                        cart.includes(item.id)?"Remove from Cart":"Add to Cart"
                                    }
                                    
                                </Text>
                            </Pressable>

                        </View>
                    </View>
                )}
                
                />
            </View>
        </SafeAreaView>
    )
}


const style=StyleSheet.create({
    itemContainer:{
       "backgroundColor":"#2795F5",
        width:"90%",
        borderRadius:20,
        display:"flex",
        marginHorizontal:"auto",
        padding:10,
        
    },
    itemImage:{
        width:"100%",
        aspectRatio:"2/1",
        borderRadius:10,

    },
    itemHeading:{
        color:"white",
        fontSize:20,
        fontWeight:'bold',
        fontFamily:"Arial",
        marginVertical:5,
        
    },
    itemContant:{
        width:"100%",
        paddingHorizontal:10,
        display:'flex',
        flexDirection:"row",
        justifyContent:"space-between"
    },
    itemGlassEffect:{
        backgroundColor:"rgba(232,227,227,0.4)",
        padding:5,
        borderRadius:10,
    }
})