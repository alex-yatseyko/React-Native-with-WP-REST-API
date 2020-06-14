import React, { useState, useEffect } from 'react'
import { View, Text, Button, ScrollView, FlatList, TouchableOpacity, Image, SafeAreaView, } from 'react-native'
// import HTML from 'react-native-render-html'; 

// https://www.npmjs.com/package/react-native-render-html - for rendering HTML in React Native

const axios = require('axios');

export const SinglePost = ({route, navigation}) => {
    const [loading, setLoading] = useState(true);
    const [singlePost, setSinglePost] = useState()

    const postId = route.params.id;

    const getPosts = async () => {
        try {
            const single = await axios.get(`https://yatseyko.com/wp-json/wp/v2/posts/${postId}/`)
            setSinglePost(single)
            setLoading(false)
        } catch (e) {
            alert("Crytical error. Please check your intertnet connection")
            console.log(e)
        }
    }

    useEffect(() => {
        getPosts()
    }, [])

    return (
        <View>
            {singlePost ? 
                (
                <ScrollView>
                    <Text style={{
                        fontWeight: '600',
                        fontSize: 20,
                        marginBottom: 15,
                        paddingHorizontal: 15,
                        marginTop: 15,
                    }}>{singlePost.data.title.rendered}</Text>
                    <Image 
                        source={{
                            uri: singlePost.data.better_featured_image.source_url,
                        }}
                        style={{height: 150, width: '100%', marginBottom: 10,}}
                    />
                    <Text
                        style={{
                            paddingHorizontal: 15,
                        }}
                    >{singlePost.data.content.rendered}</Text>
                </ScrollView>
                )  : null
            }
            {/* <Text style={{
                    fontWeight: '600',
                    fontSize: 20,
                    marginBottom: 10,
            }}>{singlePost.title.rendered}</Text>
            <Text>Single Post</Text> */}
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    )
}
