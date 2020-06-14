import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, SafeAreaView, } from 'react-native'

const axios = require('axios');

export const Posts = ({navigation}) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [lastPage, setLastPage] = useState(false);

    const getPosts = async () => {
        try {
            const posts = await axios.get('https://yatseyko.com/wp-json/wp/v2/posts')
            setLoading(false)
            setPosts(posts.data)
            // ideas https://medium.com/swlh/creating-a-react-native-app-with-wordpress-backend-b56f8dc1d21c
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
            <Text 
                style={{
                    fontSize: 40,
                    marginBottom: 15,
                    fontWeight: '800',
                    textAlign: 'center',
                }}
            >Posts</Text>
            {!loading ? (
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={posts}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate(
                            'SinglePost', 
                            { id: item.id }
                        )}
                        // onPress={() => {
                        //     navigation.navigate('SinglePost')
                        // }}
                    >
                      <View
                        style={{
                            alignItems: 'center',
                            marginHorizontal: 40,
                        }}
                      >
                          {console.log('ID', item.id)}
                        <Image 
                            source={{
                                uri: item.better_featured_image.source_url,
                            }}
                            style={{height: 120, width: '100%', marginBottom: 10, marginTop: 30,}}
                        />
                        <Text style={{
                            fontWeight: '600',
                            fontSize: 20,
                            marginBottom: 10,
                        }}>{item.title.rendered}</Text>
                        <Text>{item.excerpt.rendered.substring(0,150)}</Text>
                      </View>
                    </TouchableOpacity>
                  )
                }
            >

            </FlatList>
            ) : (
            <Text
                style={{textAlign: 'center', fontSize: 20, marginTop: 50,}}
            >Loading...</Text>
            )}
        </View>
    )
}
