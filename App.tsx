import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  TouchableOpacity, ActivityIndicator, Platform
} from 'react-native';
import {useEffect, useRef, useState} from "react";
import {BasketIcon} from "./src/SvgIcons/BasketIcon";
import {PADDING, WIDTH} from "./src/constants/contants";
import {BurgerIcon} from "./src/SvgIcons/BurgerIcon";

const titles = [
    'Apple iPhone 13 \n128GB Blue',
    'Apple iPhone 14 Pro 128GB Space Black',
    'Apple iPhone 12 128GB Purple',
    'Apple iPhone SE 128GB 2022 Midnight',
    'Apple iPhone 13 512GB Midnight',
    'Apple iPhone 14 Pro Max 256GB Purple'
]
const prices = [999, 1199, 799, 599, 899, 1199]

const images = [
    require('./assets/image1.png'),
    require('./assets/image2.png'),
    require('./assets/image3.png'),
    require('./assets/image4.png'),
    require('./assets/image5.png'),
    require('./assets/image6.png'),
]

type ItemType = {
    id: number
    title: string
    price: number
    image: any
}

export default function App() {

    const [fakeData, setFakeData] = useState<ItemType[]>(() => [...Array(12)].map((_, index) => ({
        id: index + 1,
        title: titles[index % titles.length],
        price: prices[index % prices.length],
        image: images[index % images.length],
    })))
    const flatListRef = useRef<FlatList>(null)
    const [contentVerticalOffset, setContentVerticalOffset] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [page, setPage] = useState(1)
    const renderItem: ListRenderItem<ItemType> = ({item}) => {
        return <View style={styles.itemPhone}>
            <Image
                style={styles.phoneImage}
                resizeMode={'contain'}
                source={item.image}
            />
            <View style={styles.infoPhone}>
                <Text style={styles.phoneName}>{item.title}</Text>
                <View style={styles.containerPhonePrice}>
                    <Text style={styles.phonePrice}>$ {item.price}</Text>
                    <Pressable>
                        <BasketIcon/>
                    </Pressable>
                </View>
            </View>
        </View>
    }
    const onEndReached = () => {
        if (isLoading || page >= 3) return
        setIsLoading((prev) => !prev)
        setPage((prev) => prev + 1)
    }
    useEffect(() => {
        const newFakeData = [...Array(6)].map((_, index) => ({
            id: page * (index + 1) + index + 1,
            title: titles[index % titles.length],
            price: prices[index % prices.length],
            image: images[index % images.length],
        }))
        setTimeout(() => {
            setFakeData((prev) => [...prev, ...newFakeData])
            setIsLoading(false)
        }, 3000)
    }, [page])

    useEffect(() => {
        if (isRefreshing) {
            setTimeout(() => {
                setFakeData([...Array(12)].map((_, index) => ({
                    id: index + 1,
                    title: titles[index % titles.length],
                    price: prices[index % prices.length],
                    image: images[index % images.length],
                })))
                setIsRefreshing(false)
                setPage(1)
            }, 3000)

        }
    }, [isRefreshing])

    const onRefresh = () => {
        setIsRefreshing(true)
    }
    return (
        <View style={styles.container}>
            <StatusBar style={'light'}/>
            <FlatList
                ref={flatListRef}
                data={fakeData}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={{paddingHorizontal: PADDING, flexGrow: 1}}
                columnWrapperStyle={{justifyContent: 'space-between'}}
                ListHeaderComponent={Header}
                ListHeaderComponentStyle={styles.header}
                stickyHeaderIndices={[0]}
                ListFooterComponent={() => <Footer isLoading={isLoading}/>}
                ListFooterComponentStyle={styles.footer}
                ListEmptyComponent={Empty}
                onEndReachedThreshold={0.2}
                onEndReached={onEndReached}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                    />
                }
                onScroll={(event) => {
                    setContentVerticalOffset(event.nativeEvent.contentOffset.y)
                }}
            />
            {contentVerticalOffset > 400 && <TouchableOpacity style={styles.scrollToTop} onPress={() => {
                flatListRef.current?.scrollToOffset({animated: true, offset: 0})
            }}>
                <Text>TOP</Text>
            </TouchableOpacity>}
        </View>
    );
}
const Header = () => {
    return (
        <View style={styles.headerContent}>
            <Pressable>
                <BurgerIcon/>
            </Pressable>
            <Pressable>
                <BasketIcon colorFill={'#FFF'}/>
            </Pressable>
        </View>
    )
}

const Footer = ({isLoading}: { isLoading: boolean }) => {
    return (
        <View style={styles.footerContent}>
            {isLoading && <ActivityIndicator/>}
            {!isLoading && <>
                <Text style={styles.footerText}>
                    © 2022 It-Incubator.io. All rights reserved
                </Text></>}
        </View>
    )
}

const Empty = () => {
    return <View style={styles.emptyContent}>
        <Text style={styles.emptyTitle}>Oops! This place looks empty</Text>
        <Text style={styles.emptySubTitle}>Refresh page or clear filter</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cecece',
    },
    itemPhone: {
        backgroundColor: '#fff',
        width: (WIDTH - PADDING * 2) / 2 - 8,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.4)',
        borderRadius: 5,
        paddingTop: 12,
    },
    phoneImage: {
        width: (WIDTH - PADDING * 2) / 2 - 8,
        height: (WIDTH - PADDING * 2) / 2 - 8,
    },
    infoPhone: {
        marginTop: 19,
        marginBottom: 22,
        paddingLeft: 12,
        paddingRight: 15,
    },
    phoneName: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 16,
    },
    containerPhonePrice: {
        marginTop: 17,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    phonePrice: {
        fontWeight: '400',
        lineHeight: 12,
        fontSize: 12,
    },
    header: {
        marginHorizontal: -PADDING,
        paddingTop: Platform.OS === 'ios' ? 50 : 20,
        backgroundColor: '#21201E',
        marginBottom: 19,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    footer: {
        marginHorizontal: -PADDING,
        backgroundColor: '#21201E',
    },
    footerContent: {
        paddingTop: 15,
        paddingBottom: 25,
        alignItems: 'center'
    },
    footerText: {
        color: '#FFF'
    },
    emptyContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyTitle: {
        fontWeight: '500',
        fontSize: 20,
        lineHeight: 24,
    },
    emptySubTitle: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 24,
    },
    scrollToTop: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 50 / 2,
        backgroundColor: '#a85454',
        justifyContent: 'center',
        alignItems: 'center',
    },
});


//
// export default function App() {
//   return (
//       <View style={styles.container}>
//         <Text>Open up App.tsx to start working on your app!</Text>
//         <StatusBar style="auto" />
//       </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


//export default function App() {
// //     return (
// //         <NavigationContainer>
// //             <StatusBar style={'light'}/>
// //             <Main/>
// //         </NavigationContainer>
// //     );
// // }
